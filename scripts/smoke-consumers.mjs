#!/usr/bin/env node
/**
 * Consumer smoke test: the guard for issues #7 and #13.
 *
 * Packs the library, installs the tarball into throwaway apps that have `vue` and nothing else (in
 * particular no `lucide-vue-next` and no Font Awesome package), and builds them with the bundlers
 * people actually use. A build that exits non-zero, a build that never bundled the component, or
 * output that still mentions `lucide-vue-next` fails the run.
 *
 * Why a script and not a unit test: bundlers resolve literal `import('x')` specifiers while they
 * build the module graph, before any code runs, so a runtime mock cannot tell you whether a
 * dependency is really optional. `tests/consumer-build.spec.ts` covers the fast Vite case offline;
 * this covers the rest and needs the network (it installs the bundlers from npm).
 *
 * It installs and runs third-party build tools. Their majors are pinned below, install scripts are
 * disabled, and variables that look like secrets are removed from their environment; CI runs it in a
 * job without secrets. Run it somewhere you trust the same way you would trust `npm install`.
 *
 * Usage: node scripts/smoke-consumers.mjs [--only vite-6,webpack-5] [--tarball path/to.tgz] [--latest] [--keep]
 *   Build first (`pnpm build`): without --tarball the repo is packed as it is, and the script refuses
 *   to run when dist/ is older than src/.
 *   --latest  install the newest release of every bundler instead of the pinned majors (a canary for
 *             new bundler versions, not something to gate pull requests on).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(import.meta.url), '..', '..');

const USAGE = 'usage: node scripts/smoke-consumers.mjs [--only name,name] [--tarball file.tgz] [--latest] [--keep]';
const usageError = (message) => {
  console.error(`${message}\n${USAGE}`);
  process.exit(2);
};

const args = process.argv.slice(2);
const FLAGS_WITH_VALUE = ['--only', '--tarball'];
const FLAGS = [...FLAGS_WITH_VALUE, '--latest', '--keep'];
const unknownFlag = args.find((arg) => arg.startsWith('-') && !FLAGS.includes(arg));
if (unknownFlag) usageError(`unknown option ${unknownFlag}`);

/** The value of `--name value`; exits with a usage error when the value is missing. */
const flagValue = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const value = args[i + 1];
  if (!value || value.startsWith('--')) usageError(`${name} needs a value`);
  return value;
};
const only = flagValue('--only')?.split(',').map((name) => name.trim()).filter(Boolean);
const tarballFlag = flagValue('--tarball');
const keep = args.includes('--keep');
const latest = args.includes('--latest');

const ENTRY = `import { createApp, h } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';
createApp({ render: () => h(VueStarRate, { modelValue: 3, iconProvider: 'fontawesome' }) }).mount('#app');
`;
// For the bundlers that run without a CSS loader.
const ENTRY_NO_CSS = ENTRY.replace("import 'vue-js-star-rating/dist/style.css';\n", '');
const HTML = '<!doctype html><html><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>\n';

// Every bundler is pinned to a major (esbuild, which is 0.x, to a minor), so a new major shows up as a
// deliberate bump here instead of as a surprise failure on somebody's pull request.
const CONSUMERS = [
  {
    name: 'vite-6',
    deps: { vite: '^6' },
    files: { 'index.html': HTML, 'main.js': ENTRY },
    build: ['vite', 'build'],
    out: 'dist',
  },
  {
    name: 'vite-8',
    pm: 'pnpm', // npm 10.8 crashes on Vite 8's dependency tree ("Cannot read properties of null (reading 'edgesOut')")
    deps: { vite: '^8' },
    files: { 'index.html': HTML, 'main.js': ENTRY },
    build: ['vite', 'build'],
    out: 'dist',
  },
  {
    name: 'webpack-5',
    deps: { webpack: '^5', 'webpack-cli': '^7' },
    files: {
      'main.js': ENTRY_NO_CSS,
      'webpack.config.js':
        "module.exports = { mode: 'production', entry: './main.js', externals: { vue: 'Vue' }, output: { path: __dirname + '/dist', filename: 'bundle.js' } };\n",
    },
    build: ['webpack'],
    out: 'dist',
  },
  {
    name: 'esbuild',
    deps: { esbuild: '^0.28.2' },
    files: { 'main.js': ENTRY_NO_CSS },
    build: ['esbuild', 'main.js', '--bundle', '--format=esm', '--splitting', '--outdir=out', '--platform=browser'],
    out: 'out',
  },
  {
    name: 'rollup-4',
    deps: { rollup: '^4', '@rollup/plugin-node-resolve': '^16' },
    files: {
      'main.js': ENTRY_NO_CSS,
      'rollup.config.mjs': `import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
  input: 'main.js',
  external: ['vue'],
  plugins: [nodeResolve()],
  output: { dir: 'dist', format: 'esm' },
  // Rollup only *warns* about an unresolvable import and externalises it; consumers then break at runtime.
  onwarn(warning) {
    if (warning.code === 'UNRESOLVED_IMPORT') throw new Error(warning.message);
    console.warn(warning.message);
  },
};
`,
    },
    build: ['rollup', '-c'],
    out: 'dist',
  },
];

// Validate the selection before doing any work: an empty or mistyped --only would otherwise select
// nothing and report "all consumers built".
const names = CONSUMERS.map((consumer) => consumer.name);
const unknown = only?.filter((name) => !names.includes(name)) ?? [];
if (unknown.length) usageError(`--only: unknown consumer(s) ${unknown.join(', ')}; valid: ${names.join(', ')}`);
if (only?.length === 0) usageError(`--only: no consumer given; valid: ${names.join(', ')}`);
const selected = only ? CONSUMERS.filter((consumer) => only.includes(consumer.name)) : CONSUMERS;

// Third-party build tools run with the caller's environment minus anything that looks like a secret.
const SECRET_NAME = /token|secret|password|passwd|credential|api_?key|private_?key|auth/i;
const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !SECRET_NAME.test(name)));

const MINUTE = 60_000;
const run = (cmd, cmdArgs, cwd, timeout = 10 * MINUTE) => {
  const result = spawnSync(cmd, cmdArgs, { cwd, env, timeout, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  // Ctrl-C reaches the child as well; stop here so `finally` can remove the work directory. A child that
  // caught SIGINT and exited with the shell's 130 counts too. A timeout also ends the child with SIGTERM,
  // but that is a failure of this consumer (reported by failure()), not an interrupt of the whole run.
  const timedOut = result.error?.code === 'ETIMEDOUT';
  if (!timedOut && (result.signal === 'SIGINT' || result.signal === 'SIGTERM' || result.status === 130)) {
    throw new Error(`interrupted (${result.signal ?? 'exit 130'})`);
  }
  return result;
};

/** The lines that explain a failure (ANSI stripped); falls back to the end of the output. */
function excerpt(text, max = 10) {
  const lines = text.replace(/\x1b\[[0-9;]*m/g, '').split('\n').filter((line) => line.trim());
  const relevant = lines.filter((line) => /lucide|could not resolve|can't resolve|failed to resolve|unresolved|error/i.test(line));
  return (relevant.length ? relevant : lines.slice(-max)).slice(0, max).join('\n');
}

const failure = (step, result) => ({
  ok: false,
  why: `${step} failed (${result.error ? result.error.message : `exit ${result.status}`})`,
  detail: excerpt(`${result.stdout ?? ''}\n${result.stderr ?? ''}`),
});

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** The newest modification time under `dir` (ms), or 0 when it does not exist. */
const newestMtime = (dir) => (existsSync(dir) ? Math.max(...[...walk(dir)].map((file) => statSync(file).mtimeMs)) : 0);

function pack(work) {
  if (tarballFlag) return resolve(tarballFlag);
  const built = join(root, 'dist', 'vue-star-rate.js');
  if (!existsSync(built)) throw new Error('dist/ is missing: run `pnpm build` first (or pass --tarball).');
  // dist/ is tracked in git, so it always exists; without this check a source change that nobody built
  // yet would be tested as the previous build and pass. (2 s of slack: a checkout writes files in a row.)
  const sources = Math.max(newestMtime(join(root, 'src')), statSync(join(root, 'vite.config.ts')).mtimeMs);
  if (sources > statSync(built).mtimeMs + 2000) {
    throw new Error('dist/ is older than src/ or vite.config.ts: run `pnpm build` first (or pass --tarball).');
  }
  const packed = run('npm', ['pack', '--pack-destination', work, '--silent', '--ignore-scripts'], root);
  if (packed.status !== 0) throw new Error(`npm pack failed:\n${packed.stderr}`);
  return join(work, packed.stdout.trim().split('\n').pop());
}

function check(consumer, work, tarball) {
  const dir = join(work, consumer.name);
  mkdirSync(dir, { recursive: true });
  const deps = latest ? Object.fromEntries(Object.keys(consumer.deps).map((name) => [name, 'latest'])) : consumer.deps;
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify(
      { name: `smoke-${consumer.name}`, private: true, dependencies: { vue: '^3.5.0', 'vue-js-star-rating': `file:${tarball}`, ...deps } },
      null,
      2,
    ),
  );
  for (const [file, content] of Object.entries(consumer.files)) writeFileSync(join(dir, file), content);

  const pm = consumer.pm ?? 'npm';
  const installArgs =
    pm === 'pnpm'
      ? ['install', '--ignore-scripts', '--no-frozen-lockfile']
      : ['install', '--no-audit', '--no-fund', '--ignore-scripts', '--no-package-lock'];
  const install = run(pm, installArgs, dir);
  if (install.error?.code === 'ENOENT') return { ok: false, why: `cannot run ${pm}: ${install.error.message}`, detail: '' };
  if (install.status !== 0) return failure(`${pm} install`, install);
  // Precondition: if lucide-vue-next slipped in, a green build proves nothing.
  if (existsSync(join(dir, 'node_modules', 'lucide-vue-next'))) {
    return { ok: false, why: 'invalid smoke test: lucide-vue-next got installed', detail: '' };
  }

  const build = run(join(dir, 'node_modules', '.bin', consumer.build[0]), consumer.build.slice(1), dir);
  if (build.status !== 0) return failure('build', build);

  const outDir = join(dir, consumer.out);
  if (!existsSync(outDir)) return { ok: false, why: `no output in ${consumer.out}/`, detail: '' };
  let bundled = false;
  for (const file of walk(outDir)) {
    const text = readFileSync(file, 'utf8');
    if (text.includes('lucide-vue-next')) {
      return { ok: false, why: `output still references lucide-vue-next (${file.slice(dir.length + 1)})`, detail: '' };
    }
    // The class name is also in the stylesheet, so only JavaScript counts as proof that the component was bundled.
    if (/\.[cm]?js$/.test(file) && text.includes('vue-star-rate__star')) bundled = true;
  }
  if (!bundled) return { ok: false, why: 'build passed but the component is not in the JavaScript output (vacuous run)', detail: '' };
  return { ok: true };
}

// spawnSync blocks the event loop, so a signal handler never runs while a child is busy; registering
// one only keeps Node from dying on the spot, so that `run()` can notice the child's signal and unwind.
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {});

const work = mkdtempSync(join(tmpdir(), 'vsr-smoke-'));
let failures = 0;
let aborted = false;
let interrupted = false;
try {
  const tarball = pack(work);
  console.log(`tarball: ${tarball}\nwork dir: ${work}${latest ? '\nusing the latest release of every bundler (--latest)' : ''}\n`);
  for (const consumer of selected) {
    const started = Date.now();
    const result = check(consumer, work, tarball);
    const seconds = ((Date.now() - started) / 1000).toFixed(1);
    if (result.ok) {
      console.log(`PASS  ${consumer.name}  (${seconds}s)`);
    } else {
      failures++;
      console.log(`FAIL  ${consumer.name}  (${seconds}s)  ${result.why}`);
      if (result.detail) console.log(result.detail.replace(/^/gm, '        '));
    }
  }
} catch (error) {
  // pack() and run() throw for things that make the whole run meaningless: report them, then clean up.
  console.error(`\n${error instanceof Error ? error.message : error}`);
  aborted = true;
  interrupted = error instanceof Error && error.message.startsWith('interrupted');
} finally {
  if (keep) console.log(`\nkept ${work}`);
  else rmSync(work, { recursive: true, force: true });
}

if (interrupted) process.exit(130);
if (aborted) process.exit(1);
console.log(failures ? `\n${failures} consumer(s) failed` : `\nall ${selected.length} consumer(s) built`);
process.exit(failures ? 1 : 0);
