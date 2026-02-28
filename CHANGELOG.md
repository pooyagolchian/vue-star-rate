# Changelog

All notable changes to this project will be documented in this file.

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
