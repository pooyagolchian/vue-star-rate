// @vitest-environment node
/**
 * Consumer-build contract for https://github.com/pooyagolchian/vue-star-rate/issues/7 and /13.
 *
 * Bundlers resolve literal `import('x')` specifiers while they build the module graph, before
 * tree-shaking and before any code runs, so a runtime module mock can never prove that an
 * optional peer is optional. This test does what a consumer does: it builds the library with the
 * project's own Vite config, puts the output into a throwaway project that has no
 * `lucide-vue-next` (and supplies `vue` from outside, as a host app does), and bundles that project.
 */
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, type Plugin } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import libConfig from '../vite.config';
import { findFocusRingRemovals, hasRootFocusRing, parseRules } from './helpers/focusRing';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

let sandbox: string;
let repoDistBefore: Record<string, number>;

/** Files of the repository's own tracked dist/ that a test build must never touch. */
const TRACKED_DIST = ['vue-star-rate.js', 'style.css', 'types/index.d.ts'];

async function trackedDistMtimes(): Promise<Record<string, number>> {
  const mtimes: Record<string, number> = {};
  for (const file of TRACKED_DIST) {
    mtimes[file] = await stat(join(repoRoot, 'dist', file)).then(
      (info) => info.mtimeMs,
      () => -1,
    );
  }
  return mtimes;
}

/** The library's own Vite plugins, minus declaration output (which would write into the repo's dist/types). */
function libraryPlugins(): Plugin[] {
  const plugins: Plugin[] = [];
  const collect = (option: unknown): void => {
    if (Array.isArray(option)) option.forEach(collect);
    else if (option && typeof option === 'object' && !/dts/i.test((option as Plugin).name)) {
      plugins.push(option as Plugin);
    }
  };
  collect(libConfig.plugins);
  return plugins;
}

/** Bundle `entry` the way an application would, with `vue` supplied by the host app. */
function bundleConsumer(entry: string) {
  return build({
    root: sandbox,
    configFile: false,
    logLevel: 'silent',
    build: { write: false, minify: false, rollupOptions: { input: entry, external: ['vue'] } },
  });
}

beforeAll(async () => {
  repoDistBefore = await trackedDistMtimes();
  sandbox = await mkdtemp(join(tmpdir(), 'vsr-consumer-'));
  const pkgDir = join(sandbox, 'node_modules', 'vue-js-star-rating');

  await build({
    ...libConfig,
    root: repoRoot,
    configFile: false,
    logLevel: 'silent',
    plugins: libraryPlugins(),
    build: { ...libConfig.build, outDir: join(pkgDir, 'dist'), emptyOutDir: true, sourcemap: false },
  });
  await cp(join(repoRoot, 'package.json'), join(pkgDir, 'package.json'));

  await writeFile(
    join(sandbox, 'entry.js'),
    [
      "import { createApp, h } from 'vue';",
      "import { VueStarRate } from 'vue-js-star-rating';",
      "createApp({ render: () => h(VueStarRate, { modelValue: 3 }) }).mount('#app');",
      '',
    ].join('\n'),
  );
}, 120_000);

afterAll(async () => {
  if (sandbox) await rm(sandbox, { recursive: true, force: true });
});

describe('consumer build without lucide-vue-next (issues #7, #13)', () => {
  it('harness self-check: an unresolvable import() inside a dependency fails the consumer build', async () => {
    const broken = join(sandbox, 'node_modules', 'broken-pkg');
    await mkdir(broken, { recursive: true });
    await writeFile(
      join(broken, 'package.json'),
      JSON.stringify({ name: 'broken-pkg', version: '1.0.0', type: 'module', exports: './index.js' }),
    );
    await writeFile(join(broken, 'index.js'), "export const load = () => import('this-package-is-not-installed');\n");
    await writeFile(join(sandbox, 'broken-entry.js'), "import { load } from 'broken-pkg';\nload();\n");

    await expect(bundleConsumer(join(sandbox, 'broken-entry.js'))).rejects.toThrow(/this-package-is-not-installed/);
  });

  it('bundles an app that imports VueStarRate when lucide-vue-next is not installed', async () => {
    await expect(bundleConsumer(join(sandbox, 'entry.js'))).resolves.toBeDefined();
  }, 30_000);

  it('does not write into the repository dist/ (the dts plugin is filtered out of the test build)', async () => {
    expect(await trackedDistMtimes()).toEqual(repoDistBefore);
  });
});

describe('built files', () => {
  const builtFile = (name: string) => readFile(join(sandbox, 'node_modules', 'vue-js-star-rating', 'dist', name), 'utf8');

  // The inlined Lucide star path is ISC-licensed: the copyright and permission notice has to appear in
  // every copy. A `/*!` comment should survive minification; if a tooling change ever strips it, this
  // fails instead of the package quietly shipping the path without its notice.
  it.each(['vue-star-rate.js', 'vue-star-rate.umd.cjs'])("%s carries Lucide's ISC notice", async (file) => {
    const code = await builtFile(file);
    expect(code).toContain('Lucide Contributors');
    expect(code).toContain('Permission to use, copy, modify, and/or distribute this software');
  });

  it.each(['vue-star-rate.js', 'vue-star-rate.umd.cjs'])('%s does not mention lucide-vue-next', async (file) => {
    expect(await builtFile(file)).not.toContain('lucide-vue-next');
  });
});

describe('built stylesheet', () => {
  // happy-dom has no layout and does not apply the component's CSS, so a rule that hides the keyboard
  // focus ring (WCAG 2.4.7) is invisible to every component test. Inspect what is actually shipped.
  // tests/focusRingGuard.spec.ts proves that the checker goes red on each way of hiding the ring.
  it('does not take the keyboard focus indicator away from the star buttons', async () => {
    const css = await readFile(join(sandbox, 'node_modules', 'vue-js-star-rating', 'dist', 'style.css'), 'utf8');

    expect(parseRules(css).length).toBeGreaterThan(0); // the stylesheet was actually parsed
    expect(hasRootFocusRing(css)).toBe(true); // ...and it still draws the root's own focus ring
    expect(findFocusRingRemovals(css)).toEqual([]);
  });
});
