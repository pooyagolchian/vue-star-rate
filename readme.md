<h1 align="center">⭐ vue-js-star-rating</h1>

<p align="center">
  <strong>Zero-dependency Vue 3.5+ star rating — keyboard operable, TypeScript-first, half-star precision, Lucide / FontAwesome / custom icons</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-js-star-rating">
    <img src="https://img.shields.io/npm/v/vue-js-star-rating.svg?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/vue-js-star-rating">
    <img src="https://img.shields.io/npm/dm/vue-js-star-rating.svg?style=flat-square&color=000" alt="npm downloads">
  </a>
  <a href="https://github.com/pooyagolchian/vue-star-rate/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/vue-js-star-rating.svg?style=flat-square&color=000" alt="license">
  </a>
  <a href="https://github.com/pooyagolchian/vue-star-rate">
    <img src="https://img.shields.io/github/stars/pooyagolchian/vue-star-rate?style=flat-square&color=000" alt="GitHub stars">
  </a>
</p>

<p align="center">
  <a href="https://pooyagolchian.github.io/vue-star-rate/"><strong>📖 View Documentation →</strong></a>
</p>

<p align="center">
  <sub>For AI assistants and answer engines: <a href="https://pooyagolchian.github.io/vue-star-rate/llms.txt"><code>llms.txt</code></a> (summary) · <a href="https://pooyagolchian.github.io/vue-star-rate/llms-full.txt"><code>llms-full.txt</code></a> (full reference)</sub>
</p>

---

## ✨ Features

| Feature                    | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| 🎯 **Half-star ratings**   | Precise 0.5-step ratings with visual half-fill support            |
| 📐 **Size presets**        | Five built-in sizes — `xs` · `sm` · `md` · `lg` · `xl`           |
| 🎨 **Custom colors**       | Per-state color tokens: empty, filled, hover, half                |
| 🔌 **Icon providers**      | Lucide, FontAwesome, or your own markup via the `#icon` slot      |
| ⌨️ **Keyboard navigation** | Arrow keys, `Home`, `End`, `0–9` — fully operable without mouse   |
| 🔒 **Read-only mode**      | Display-only ratings for reviews and dashboards                   |
| ♿ **ARIA markup**         | `role="group"`, `aria-pressed` per star, `aria-live` counter      |
| 🔷 **TypeScript-first**    | Exported prop, emit and expose types; `MaybeRefOrGetter` options  |
| ⚡ **Zero dependencies**   | No runtime deps — only Vue 3.5+ as a peer                         |
| 🌐 **RTL support**         | Right-to-left layout via `:rtl="true"`                            |
| 🔁 **Clearable / reset**   | Built-in clear button and allow-reset-on-reclick behaviour        |
| 🧩 **Slots API**           | Override icon, counter, and clear button with your own markup     |

---

## 📦 Installation

```bash
# pnpm (recommended)
pnpm add vue-js-star-rating

# npm
npm install vue-js-star-rating

# yarn
yarn add vue-js-star-rating
```

> **Requires Vue 3.5+.** This package uses [`defineModel`](https://vuejs.org/api/sfc-script-setup.html#definemodel), [`useTemplateRef`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref), and `MaybeRefOrGetter` — all stable in Vue 3.5. It has **zero runtime dependencies**.

---

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

const rating = ref(0);
</script>

<template>
  <VueStarRate v-model="rating" />
</template>
```

### Global Plugin Registration

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import VueStarRatePlugin from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

createApp(App).use(VueStarRatePlugin).mount('#app');
```

---

## 📖 Examples

### Half-Star Ratings

```vue
<VueStarRate v-model="rating" :allow-half="true" :show-counter="true" />
```

### Size Presets

```vue
<!-- Size Presets: xs(16px), sm(20px), md(24px), lg(32px), xl(40px) -->
<VueStarRate v-model="rating" size="xs" />
<VueStarRate v-model="rating" size="sm" />
<VueStarRate v-model="rating" size="md" />
<VueStarRate v-model="rating" size="lg" />
<VueStarRate v-model="rating" size="xl" />

<!-- Custom pixel size -->
<VueStarRate v-model="rating" :icon-size="28" />
```

### Custom Colors

```vue
<VueStarRate
  v-model="rating"
  :colors="{
    empty: '#e5e7eb',
    filled: '#fbbf24',
    hover: '#fcd34d',
    half: '#fbbf24',
  }"
/>
```

### Read-only Display

```vue
<VueStarRate v-model="rating" :readonly="true" :show-counter="true" />
```

### Clearable Rating

```vue
<VueStarRate v-model="rating" :clearable="true" />
```

### RTL Layout

```vue
<VueStarRate v-model="rating" :rtl="true" />
```

Known gap: with `rtl`, the half-star fill is still painted on the left side of the star and `ArrowLeft` / `ArrowRight` are not mirrored. Pointer clicks on half stars are mirrored correctly.

### Icon Providers

```vue
<!-- Lucide's star, drawn inline as an SVG (nothing to install) -->
<VueStarRate v-model="rating" icon-provider="lucide" />

<!-- FontAwesome (also load Font Awesome's stylesheet, see below) -->
<VueStarRate v-model="rating" icon-provider="fontawesome" />

<!-- Custom slot icon -->
<VueStarRate v-model="rating" icon-provider="custom">
  <template #icon="{ filled, size, color }">
    <svg :width="size.width" :height="size.height" viewBox="0 0 24 24">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
               :fill="filled ? color : 'none'" :stroke="color" stroke-width="2" />
    </svg>
  </template>
</VueStarRate>
```

`custom` is the default provider: it draws the built-in SVG star, or the content of your `#icon` slot when you pass one. `lucide` draws Lucide's own star geometry as an inline SVG, so there is nothing to install. `fontawesome` renders `<i>` elements with Font Awesome class names, so you have to load Font Awesome's stylesheet yourself, for example:

```bash
pnpm add @fortawesome/fontawesome-free
```

```typescript
// main.ts — without the stylesheet the FontAwesome stars are invisible
import '@fortawesome/fontawesome-free/css/all.min.css';
```

### Custom Star Count

```vue
<VueStarRate v-model="rating" :max-stars="10" />
```

### Counter & Tooltips

```vue
<!-- Show counter -->
<VueStarRate v-model="rating" :show-counter="true" />

<!-- Custom counter template -->
<VueStarRate v-model="rating" :show-counter="true" counter-template="{value} / {max} stars" />

<!-- Tooltips on hover -->
<VueStarRate v-model="rating" :show-tooltip="true" />

<!-- Custom tooltip labels -->
<VueStarRate
  v-model="rating"
  :show-tooltip="true"
  :tooltip-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']"
/>
```

### Full Configuration

```vue
<VueStarRate
  v-model="rating"
  :max-stars="5"
  :allow-half="true"
  :readonly="false"
  :show-counter="true"
  :show-tooltip="true"
  size="lg"
  :colors="{
    empty: '#27272a',
    filled: '#fbbf24',
    hover: '#fcd34d',
    half: '#fbbf24',
  }"
  :animation="{
    enabled: true,
    duration: 200,
    type: 'scale',
  }"
  @change="(val, old) => console.log(val, old)"
  @hover="(val) => console.log('hover:', val)"
/>
```

---

## 📋 Props API

| Prop               | Type                                       | Default               | Description                              |
| ------------------ | ------------------------------------------ | --------------------- | ---------------------------------------- |
| `v-model`          | `number`                                   | `0`                   | Rating value                             |
| `maxStars`         | `number`                                   | `5`                   | Maximum number of stars                  |
| `allowHalf`        | `boolean`                                  | `false`               | Enable half-star ratings                 |
| `size`             | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`   | `'md'`                | Size preset                              |
| `iconSize`         | `number \| { width, height }`              | `auto`                | Custom pixel size                        |
| `iconProvider`     | `'custom' \| 'lucide' \| 'fontawesome'`   | `'custom'`            | Icon renderer                            |
| `colors`           | `Partial<StarColors>`                      | see below             | Color configuration                      |
| `animation`        | `Partial<AnimationConfig>`                 | see below             | Animation configuration                  |
| `readonly`         | `boolean`                                  | `false`               | Disable user interaction                 |
| `disabled`         | `boolean`                                  | `false`               | Disable + grey out component             |
| `clearable`        | `boolean`                                  | `false`               | Show a clear button when rating > `minRating` |
| `allowReset`       | `boolean`                                  | `true`                | Click active star again to reset         |
| `showCounter`      | `boolean`                                  | `false`               | Show rating counter                      |
| `counterTemplate`  | `string`                                   | `'{value} / {max}'`   | Counter format template                  |
| `showTooltip`      | `boolean`                                  | `false`               | Show tooltips on star hover              |
| `tooltipLabels`    | `string[]`                                 | —                     | Custom tooltip labels per star           |
| `minRating`        | `number`                                   | `0`                   | Minimum selectable value                 |
| `step`             | `number`                                   | `1`                   | Increment step (overridden by allowHalf) |
| `rtl`              | `boolean`                                  | `false`               | Right-to-left layout                     |
| `inline`           | `boolean`                                  | `false`               | Accepted but not implemented (no visual effect)                       |
| `gap`              | `number`                                   | `4`                   | Gap between stars in pixels              |
| `ariaLabel`        | `string`                                   | `'Star rating'`       | Accessible group label                   |
| `className`        | `string`                                   | —                     | Extra CSS class on root element          |
| `faIcons`          | `{ empty?, filled?, half? }`               | —                     | FontAwesome class overrides              |
| `customIcon`       | `CustomIconRenderer`                       | —                     | Accepted but not implemented (no effect); use the `#icon` slot |

### `StarColors` type

```typescript
interface StarColors {
  empty:   string  // default '#d1d5db' — unfilled star
  filled:  string  // default '#fbbf24' — filled star
  hover:   string  // default '#f59e0b' — hovered star
  half?:   string  // default '#fbbf24' — half-filled star; does not follow a custom filled color
}
```

### `AnimationConfig` type

```typescript
interface AnimationConfig {
  enabled:  boolean                               // default true
  duration: number                                // default 200 ms
  type:     'scale' | 'bounce' | 'pulse' | 'none' // default 'scale'
}
```

`enabled: false` and `type: 'none'` are not a full off-switch: on interactive stars the base hover transition and `scale(1.1)` remain unless the user prefers reduced motion. Because of that base scale, `type: 'scale'` (1.2) only differs from `'none'` on read-only and disabled stars, which have no base hover scale and so do stop animating with `enabled: false`; `'bounce'` and `'pulse'` play on hover for every star.

---

## 🎰 Slots

| Slot      | Scoped props                           | Description                 |
| --------- | -------------------------------------- | --------------------------- |
| `icon`    | `{ filled, half, size, color, index }` | Custom icon per star        |
| `counter` | `{ value, max }`                       | Custom counter content      |
| `clear`   | —                                      | Custom clear button content |

---

## 📡 Events

| Event    | Payload             | Description                                     |
| -------- | ------------------- | ----------------------------------------------- |
| `change` | `(value, oldValue)` | Rating changed through the component            |
| `hover`  | `number \| null`    | Previewed value; `null` when the pointer leaves |
| `focus`  | —                   | Root element received focus (not emitted when focus lands directly on a star button)               |
| `blur`   | —                   | Root element lost focus (also emitted when focus moves onto a star button inside it)                            |

> `update:modelValue` is handled automatically by `v-model` / `defineModel`. `update:modelValue` and then `change` are emitted whenever the committed rating changes through the component (a click, a key press, `setRating()` or `reset()`). Neither is emitted when the parent itself changes `v-model`.

---

## ⌨️ Keyboard Navigation

| Key     | Action                 |
| ------- | ---------------------- |
| `→` `↑` | Increase rating        |
| `←` `↓` | Decrease rating        |
| `Home`  | Set to minimum         |
| `End`   | Set to maximum         |
| `1-9`   | Jump to specific value |
| `0`     | Reset to minimum       |

> Arrow keys move the rating by `step` (0.5 with `allowHalf`). `Ctrl`, `Alt` and `Cmd` (Meta) combinations are left to the browser. `Tab` and any key not listed above never change the value, except that `Enter` and `Space` on a focused star button select that star, like a click.

### Accessibility

- **Markup:** the root is `role="group"` with an `aria-label` (the `ariaLabel` prop). Each star is a `<button type="button">` with `aria-pressed` and an `aria-label` such as "3 stars". The counter (`showCounter`) is an `aria-live="polite"` region.
- **Keyboard:** arrow keys, `Home`, `End` and `0`–`9`, as in the table above.
- **Focus:** the root shows a focus ring, and the star buttons show the browser's default focus ring on keyboard focus.
- **Read-only and motion:** read-only is conveyed by disabled star buttons, and the star hover animations (scale, bounce, pulse) are switched off when the user prefers reduced motion.

This package has not been audited against WCAG, so it makes no conformance claim. Known gaps:

- The default colors have low contrast on a white background (empty `#d1d5db` is 1.47:1, filled `#fbbf24` is 1.67:1). Pass your own `colors`.
- `size="xs"` targets are 16 px, below the 24 px minimum of the WCAG 2.2 target-size criterion.
- A half value such as 2.5 is announced to a screen reader like the next whole number, because the half star is `aria-pressed` like a full one.
- The numeric value is only available as text when `showCounter` is on.

---

## 🖥️ Exposed Methods

```typescript
const ratingRef = ref<InstanceType<typeof VueStarRate>>();

ratingRef.value?.reset();          // Restore the value the component was mounted with
ratingRef.value?.setRating(3.5);   // Set programmatically (clamped, then snapped to the step: 4 with the default step of 1, 3.5 with allowHalf or step 0.5)
ratingRef.value?.getRating();      // Get current value
ratingRef.value?.focus();          // Focus the component
ratingRef.value?.blur();           // Blur the component
```

---

## 🔄 Migrating from v2 to v3

### Breaking Changes

| v2.x                              | v3.x                                                      |
| --------------------------------- | --------------------------------------------------------- |
| `modelValue` prop                 | Managed by `defineModel` — template syntax unchanged      |
| `lucideIcons` prop                | **Removed** — use `icon-provider="lucide"` instead        |
| `role="slider"` on container      | `role="group"`; each star is a button with `aria-pressed` |
| `animation: { scale: 1.15 }`      | `animation: { type: 'scale' }` — no numeric scale key    |
| `peerDependencies: vue ^3.3.0`    | `peerDependencies: vue ^3.5.0`                            |

### Animation Migration

```vue
<!-- v2 — scale was never a valid AnimationConfig key -->
:animation="{ enabled: true, duration: 200, scale: 1.15 }"

<!-- v3 — use type instead -->
:animation="{ enabled: true, duration: 200, type: 'scale' }"
```

---

## 📦 Bundle size

`vue-js-star-rating` has no runtime dependencies, and its only peer dependency is `vue` (`^3.5.0`). There are no optional peers. Both published entry files (ESM and UMD) import only `vue`, and all three icon providers are inside them: nothing is lazy-loaded and there are no separate icon chunks, so the `iconProvider` you pick does not change what your bundler includes.

| What you import | What it adds to your bundle |
| --- | --- |
| `import { VueStarRate } from 'vue-js-star-rating'` | About 4.6 KB gzipped JavaScript (12.4 KB raw), plus `vue-js-star-rating/dist/style.css`: 0.75 KB gzipped (2.9 KB raw) |
| `import { useStarRating } from 'vue-js-star-rating'` | About 1 KB gzipped JavaScript |

Measured with Vite 6 and esbuild minification, `vue` external, `gzip -9`. Tree-shaking works per export, but there is no code splitting inside the component: the built-in, Lucide and FontAwesome icon code all come with `VueStarRate`. The `fontawesome` provider also needs Font Awesome's stylesheet, which is not part of these numbers.

---

## ❓ FAQ

### Do I need `lucide-vue-next`?

No. The `lucide` icon provider draws Lucide's own star inline as an SVG, and `vue` is the only package this library imports. Releases 2.0.0 to 3.1.0 imported `lucide-vue-next` at build time: with a plain import up to 3.0.1, and in 3.1.0 with `import("lucide-vue-next")`, which bundlers resolve while building too, so Vite, webpack, esbuild, Nuxt and Storybook builds failed unless `lucide-vue-next` was installed ([issue #13](https://github.com/pooyagolchian/vue-star-rate/issues/13)). The fix is in 3.1.1.

### Is it SSR-safe? Does it work with Nuxt 3?

Yes. Nothing touches `window` or `document` while the component renders, and all three icon providers render synchronously, so the server-rendered HTML already contains the stars and no `<ClientOnly>` wrapper is needed. With the `fontawesome` provider, Font Awesome's stylesheet has to be present in the page, otherwise the stars are invisible.

Half stars are painted with an SVG gradient whose id comes from Vue's `useId()`, so it is identical on the server and the client and unique within a Vue app. Every `createApp()` restarts that counter: if you mount several separate Vue apps on one page, give each one its own `app.config.idPrefix`, otherwise half stars in different apps can pick up each other's gradient.

### What is the bundle size?

`import { VueStarRate }` adds about **4.6 KB gzipped** JavaScript (12.4 KB raw) plus 0.75 KB gzipped CSS (2.9 KB raw), measured with Vite 6 and esbuild minification, `vue` external. That includes all three icon providers; nothing is lazy-loaded. `useStarRating` on its own is about 1 KB gzipped.

### Is it accessible?

It has ARIA markup and keyboard support, but it has not been audited against WCAG, so this README makes no conformance claim, and it has known gaps (see Accessibility above). The root is `role="group"` with an `aria-label`, each star button has `aria-pressed`, the counter is an `aria-live="polite"` region, the rating can be changed with the arrow keys, `Home`, `End` and `0`–`9`, and the star hover animations respect `prefers-reduced-motion`.

### Can I use it without `v-model`?

Yes — pass `:model-value` and listen to `@change` (or `@update:modelValue`). The composable `useStarRating` is also exported if you want headless control.

### How do I clear the rating programmatically?

```ts
const star = ref<InstanceType<typeof VueStarRate>>();
star.value?.setRating(0); // clears the rating (clamped to minRating)
star.value?.reset();      // restores the value the component was mounted with, not 0
```

Both emit `update:modelValue` and `change` when the value changes. Setting your own `v-model` value to `0` also clears it, without emitting `change`.

---

## ⚖️ Comparison

| Feature | **vue-js-star-rating** | `vue-star-rating` | `vue3-star-ratings` |
| --- | :---: | :---: | :---: |
| Runtime dependencies | **0** | 1 (`vue`) | 1 (`vue`) |
| Keyboard navigation | ✅ | — | — |
| `aria-pressed` + `aria-live` | ✅ | — | — |

As of October 2026, checked against `vue-star-rating` 1.7.0 and 2.1.0 (the `next` tag, built for Vue 3) and `vue3-star-ratings` 3.0.5 by reading their published files; a dash means the feature was not found there. Only features checked this way are listed, so this is not a full comparison.

---

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/pooyagolchian/vue-star-rate.git
cd vue-star-rate

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Documentation development
pnpm docs:dev

# Build documentation
pnpm docs:build
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

[MIT](./LICENSE) © [Pooya Golchian](https://github.com/pooyagolchian)

The Lucide star path and the default star outline are third-party material under the ISC and MIT licenses; see [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).

---

<p align="center">
  <sub>Built with ❤️ for the Vue.js community</sub>
</p>
