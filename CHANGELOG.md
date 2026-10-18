# Changelog

All notable changes to this project will be documented in this file.

---

## [3.1.1] — 2026-10-18

### Fixes
- **Issue [#13](https://github.com/pooyagolchian/vue-star-rate/issues/13) (and the earlier, unfixed [#7](https://github.com/pooyagolchian/vue-star-rate/issues/7)) — builds no longer need `lucide-vue-next`.** The Lucide provider now draws Lucide's own `star` geometry inline, so the published entry files import nothing but `vue`. The path data is identical to `lucide-vue-next`'s, and the `<svg>` carries the class list and `aria-hidden="true"` that `lucide-vue-next` 0.563 and later render; compared with 0.469, the version this package used to be built against, it gains the `lucide-star` class and `aria-hidden`. `lucide-vue-next` is gone from `rollupOptions.external`, `globals`, `peerDependenciesMeta` and `devDependencies`. Clean apps now build with Vite 6 and 8, webpack 5, esbuild and Rollup (checked on every pull request by `pnpm smoke:consumers`) and with Nuxt and Storybook (checked by hand). Lucide is ISC-licensed, so its copyright and permission notice now ships with the path data, in `dist/` and in the new `THIRD-PARTY-NOTICES.md`, which also covers the Feather star used by the default icon.
- **`allowHalf`: Enter, Space and `el.click()` on a star now select the whole star.** They selected N − 0.5, because a keyboard click carries no pointer position. Mouse and touch behave as before.
- **Keyboard: only rating keys change the value, and browser shortcuts pass through.** `Tab`, `Shift`, `Escape`, letters and digits above `maxStars` no longer validate and emit (with a value below `minRating`, pressing `Tab` inside the widget could emit a change nobody asked for). `Ctrl`, `Alt` and `Cmd` combinations (Alt+← is Back, Ctrl+digit switches tab) are no longer swallowed.
- **Half stars no longer share colours between ratings.** The gradient id is now `vsr-half-` plus Vue's `useId()` instead of being built from the star index, so two half-star ratings in one Vue app do not borrow each other's colour, and the id cannot collide with the ids other components get from `useId()` (for example `<label for>` targets). Every `createApp()` restarts Vue's id counter, so a page that mounts several separate Vue apps needs a distinct `app.config.idPrefix` for each of them.
- **`step`: clean values that stay in range.** Values are snapped to the step grid without floating-point noise (`0.30000000000000004` is now `0.3`) and always stay within `minRating`…`maxStars`. `minRating` and `maxStars` are always selectable, and a step that is 0, negative or not finite falls back to 1. `setRating(NaN)` commits `minRating` instead of `NaN`.
- **The Lucide provider applies `iconSize: { width, height }`.** It used the width for both sides; the default and Font Awesome providers already used both.
- **Keyboard focus is visible on the stars.** The star buttons no longer suppress the browser's focus ring.
- **Removed the invalid `aria-readonly` from the `role="group"` root.** axe reported `aria-allowed-attr` (critical) on every instance. Read-only is still conveyed by the disabled star buttons.

### Tests and tooling
- `tests/consumer-build.spec.ts` bundles an app that has `vue` but not `lucide-vue-next`; it fails on 3.1.0 with the #13 error. It also checks that the built files carry Lucide's license notice, that the build does not touch the repository's `dist/`, and that the built stylesheet does not take the keyboard focus ring away from the star buttons (`tests/focusRingGuard.spec.ts` proves that checker against fixtures).
- `pnpm smoke:consumers` (`scripts/smoke-consumers.mjs`) packs the tarball and builds clean apps with Vite 6, Vite 8, webpack 5, esbuild and Rollup 4. The bundlers are pinned to majors (`--latest` tries the newest releases), the script refuses to run on a `dist/` that is older than `src/`, rejects unknown `--only` names, and only counts the component as bundled when it is in the JavaScript output.
- New `.github/workflows/ci.yml`: typecheck, tests and build on Node 20 and 22, plus the consumer smoke test, on every pull request and push to `main`. Nothing ran on pull requests before. Jobs have timeouts, checkouts do not persist credentials, and the smoke job does not share the pnpm cache.
- 94 → 245 tests: axe-core accessibility checks (7 variants; undecided results count as failures), server rendering in Node and hydration, half-star pointer, hover and focus wiring, keyboard events (including on read-only and disabled ratings), step bounds, gradient ids (also across Vue apps), provider rendering.
- Removed `tests/lazyIcons.spec.ts`: it mocked `lucide-vue-next` at runtime, could not see bundler resolution, and stayed green while builds failed.
- devDependencies: removed `lucide-vue-next`, added `axe-core`.

### Documentation
- Removed claims the build did not support: WCAG 2.2 "compliant" / "accessible" / Level AA (and the `wcag`, `wcag2`, `wcag2.2` keywords), lazy icon chunks, an optional `lucide-vue-next` peer, "~3 KB gzipped" (measured: about 4.6 KB JavaScript plus 0.75 KB CSS, gzipped) and comparison-table rows that could not be verified.
- README: an Accessibility section with the known gaps; the Font Awesome stylesheet requirement; event, `colors.half`, `reset()` and `setRating()` descriptions now match the code; `customIcon` and `inline` are marked as not implemented; RTL and animation limits are noted.
- JSDoc on the public types now states defaults and real behaviour. The docs site and `llms*.txt` were corrected the same way, and a fresh build of the docs site no longer contains the 806 kB `lucide-vue-next` chunk.
- New `THIRD-PARTY-NOTICES.md` (shipped in the package) with the Lucide (ISC) and Feather (MIT) license texts. The README explains that several Vue apps on one page need distinct `app.config.idPrefix` values. The false "Options API → Composition API" row was removed from the v2 → v3 migration table (2.0.0 was already `<script setup>`).
- `package.json`: description and keywords no longer claim WCAG conformance; the no-op `peerDependenciesMeta` entry was removed (the package has no optional peers).

### Corrections to earlier entries
- **3.1.0:** icon providers were never split into async chunks and `lucide-vue-next` never became optional: the entry file was a single file containing `import("lucide-vue-next")`, which bundlers resolve at build time. Nothing was "SVG-only", and the size was never ~3 KB. The default `iconProvider` is `custom` (not `svg`). The default colour objects live inside `<script setup>`, so they are allocated per instance, not per module. The publish workflow runs on `v*` tags (or a manual dispatch), not on pushes to `main`.
- **3.0.0:** `role="group"` is not a "WCAG 2.2 pattern" (WCAG defines success criteria, not widget patterns). The package makes no WCAG conformance claim.
- **2.0.0 – 3.0.1:** these releases imported `lucide-vue-next` statically, so it was required at build time.

---

## [3.1.0] — 2026-05-11

> **Correction:** several statements in this entry were wrong; see *Corrections to earlier entries* under [3.1.1].

### Fixes
- **Issue [#7](https://github.com/pooyagolchian/vue-star-rate/issues/7) — `lucide-vue-next` no longer forced on consumers.** Previously, importing `VueStarRate` pulled `lucide-vue-next` into every consumer bundle even when `iconProvider` was set to `fontawesome` or `custom` (or left at the default `svg`). Icon providers are now loaded via `defineAsyncComponent`, so the optional peer is only fetched — and only required — when the matching provider is actually rendered.

### Performance
- **Lazy-loaded icon providers** — `LucideIcon` and `FontAwesomeIcon` are now async chunks, split out of the main bundle. Default-bundle footprint drops to the SVG-only path.
- **Cached half-star geometry** — the per-star `DOMRect` is captured on `mouseenter` instead of being re-measured on every `mousemove`, eliminating layout thrash during hover-drag on rating widgets.
- **Hoisted defaults** — `defaultColors`, `defaultAnimation`, and `sizePresets` moved to module scope; one allocation per module instead of one per component instance.
- **Reduced-motion guard** — hover scale / bounce / pulse animations are now wrapped in `@media (prefers-reduced-motion: no-preference)`, honouring the OS accessibility setting and skipping unnecessary GPU work for users who opt out.

### Documentation
- New README sections: **Bundle size & optional peers**, **FAQ** (SSR, Nuxt, bundle size, optional peers), **Comparison** vs other Vue star-rating libs.
- Demo site (`docs/`) extended with `FAQPage`, `HowTo`, and `SoftwareApplication` JSON-LD for SEO + Answer Engine Optimization (Google AI Overviews, Bing Copilot, Perplexity, ChatGPT browsing).
- `docs/public/robots.txt` and `docs/public/sitemap.xml` added.
- `docs/public/llms.txt` rewritten per the [llmstxt.org](https://llmstxt.org) spec and `docs/public/llms-full.txt` added for long-context LLM consumers.

### Meta
- Package `description` calls out tree-shakeable lazy icons, SSR, and Nuxt support.
- Keywords expanded: `tree-shakeable`, `zero-dependency`, `zero-dep`, `ssr`, `nuxt`, `nuxt3`, `vue-3.5`, `wcag2.2`, `keyboard-navigation`, `accessible-rating`.
- Publish workflow trigger updated from `master` to `main`.

---

## [3.0.1] — 2026-02-28

### Fixes
- **readme: stray Options API code removed** — orphaned `return { rating: 0 }` / `</script>` fragment after the Global Plugin Registration block is gone.
- **`docs:*` npm scripts fixed** — `npx vite` replaced with `pnpm run dev/build/preview` so the docs sub-package's own vite version is used.

### Documentation
- Rewrote hero tagline to be more concise and descriptive.
- Expanded Features table with icon-provider and slots rows; sharpened all descriptions.
- Improved Installation section: links to `defineModel` / `useTemplateRef` Vue docs; explicit "zero runtime dependencies" callout.
- `StarColors` and `AnimationConfig` documented as named interfaces with field-level comments.
- Migration table extended with Options API → Composition API row.
- Section headings de-duplicated ("Vue 3 Examples" → "Examples", "Vue 3 Props API" → "Props API").

### Meta
- Package `description` updated to include "zero-dependency", "WCAG 2.2", "TypeScript-first".
- Keywords expanded: `vue3.5`, `wcag`, `wcag2`, `a11y`, `aria`, `v-model`, `composition-api`, `define-model`, `vue-plugin`, `star-rating-component` added.

---

## [3.0.0] — 2026-02-28

### Breaking Changes
- **Vue peer dep raised to `^3.5.0`** — v3 uses `defineModel`, `useTemplateRef`, and `MaybeRefOrGetter` which require Vue 3.5+.
- **`modelValue` is no longer a prop** — it is now managed internally by `defineModel`. Template usage of `v-model` is unchanged.
- **`lucideIcons` prop removed** — was declared but never consumed. `iconProvider="lucide"` continues to work using the `Star` icon.
- **ARIA: `role="slider"` → `role="group"`** — follows WCAG 2.2 pattern for grouped interactive buttons. Star buttons now carry `aria-pressed`.
- **Animation `scale` key removed** — `AnimationConfig` never had a numeric `scale` key; the correct field is `type: 'scale' | 'bounce' | 'pulse' | 'none'`.
- **`@testing-library/vue` removed** from devDependencies (was unused).
- **`build:types` npm script removed** — `vite-plugin-dts` handles type generation during `build`.
- **`window.Vue` auto-registration removed** from `src/index.ts` — Vue 2 UMD pattern no longer needed.

### New Features
- **`useTemplateRef`** — container ref now uses the Vue 3.5 `useTemplateRef` API.
- **Reactive composable options** — `useStarRating` options are now typed as `MaybeRefOrGetter<T>` and resolved via `toValue()`, so prop changes after mount (e.g. flipping `readonly`, `disabled`, `step`) are correctly reflected without re-mounting.
- **Double-emit fix** — external `v-model` parent updates no longer fire a spurious `change` event.
- **Typed emit bridge** — removed `// @ts-ignore` hack; all composable → component events are now fully typed.
- **`aria-live="polite"` on counter** — screen readers announce live rating changes.
- **`aria-pressed`** on each star button — assistive technology can read per-star selection state.

### Toolchain
- TypeScript `~5.7.x`
- Vite `^6.0`
- Vitest `^2.1`
- `vite-plugin-dts` `^4`
- `vue-tsc` `^2.1`
- `happy-dom` `^14`
- `lucide-vue-next` `^0.469`
- TypeScript config: `target: ES2022`, `verbatimModuleSyntax: true`
- `package.json` exports: `types` condition now correctly placed before `import`/`require`

### Tests
- 74 → **92 tests** across 3 test files
- New: `LucideIcon` icon suite (gradient injection, size, filled state)
- New: `VueStarRate` — slot API (`icon`, `counter`, `clear`), `aria-pressed`, `aria-live`, `allowReset=false`, plugin `install()` with default and custom component name
- New: `useStarRating` — reactive options (refs toggling `readonly`/`disabled` after setup), external model sync without `change` emission

---

## [2.0.0]

- Vue 3 rewrite
- Full TypeScript support
- Lucide, FontAwesome, and custom SVG icon providers
- Half-star support, keyboard navigation, RTL, tooltips, animations, clearable, counter
- `useStarRating` composable
- Vitest test suite

---

## [1.1.5]

- Update readme
- Add Github action CI
- Add gif

## [1.1.2]

- Add event
- Update readme
- Merge event PR

## [1.1.1]

- Update readme
- Test package with vue-cli2,3
- Bug FIXING in readme and components

## [1.0.9]

- Update package
- Update rating with fontawesome icons
- Customize color, hover, icons
