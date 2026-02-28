<h1 align="center">⭐ vue-js-star-rating</h1>

<p align="center">
  <strong>Zero-dependency Vue 3.5+ star rating — WCAG 2.2 accessible, TypeScript-first, half-star precision, Lucide / FontAwesome / custom icons</strong>
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

---

## ✨ Features

| Feature                    | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| 🎯 **Half-star ratings**   | Precise 0.5-step ratings with visual half-fill support            |
| 📐 **Size presets**        | Five built-in sizes — `xs` · `sm` · `md` · `lg` · `xl`           |
| 🎨 **Custom colors**       | Per-state color tokens: empty, filled, hover, half                |
| 🔌 **Icon providers**      | Lucide, FontAwesome, or bring your own via scoped slot/render fn  |
| ⌨️ **Keyboard navigation** | Arrow keys, `Home`, `End`, `0–9` — fully operable without mouse   |
| 🔒 **Read-only mode**      | Display-only ratings for reviews and dashboards                   |
| ♿ **WCAG 2.2 accessible** | `role="group"`, `aria-pressed` per star, `aria-live` counter      |
| 🔷 **TypeScript-first**    | Full generics, `MaybeRefOrGetter<T>` reactive options             |
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

### Icon Providers

```vue
<!-- Lucide icons (requires lucide-vue-next) -->
<VueStarRate v-model="rating" icon-provider="lucide" />

<!-- FontAwesome (requires @fortawesome/fontawesome-free CSS) -->
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
| `clearable`        | `boolean`                                  | `false`               | Show a clear button when rating > 0      |
| `allowReset`       | `boolean`                                  | `true`                | Click active star again to reset         |
| `showCounter`      | `boolean`                                  | `false`               | Show rating counter                      |
| `counterTemplate`  | `string`                                   | `'{value} / {max}'`   | Counter format template                  |
| `showTooltip`      | `boolean`                                  | `false`               | Show tooltips on star hover              |
| `tooltipLabels`    | `string[]`                                 | —                     | Custom tooltip labels per star           |
| `minRating`        | `number`                                   | `0`                   | Minimum selectable value                 |
| `step`             | `number`                                   | `1`                   | Increment step (overridden by allowHalf) |
| `rtl`              | `boolean`                                  | `false`               | Right-to-left layout                     |
| `inline`           | `boolean`                                  | `false`               | Inline layout mode                       |
| `gap`              | `number`                                   | `4`                   | Gap between stars in pixels              |
| `ariaLabel`        | `string`                                   | `'Star rating'`       | Accessible group label                   |
| `className`        | `string`                                   | —                     | Extra CSS class on root element          |
| `faIcons`          | `{ empty?, filled?, half? }`               | —                     | FontAwesome class overrides              |
| `customIcon`       | `CustomIconRenderer`                       | —                     | Programmatic icon render function        |

### `StarColors` type

```typescript
interface StarColors {
  empty:   string  // default '#d1d5db' — unfilled star
  filled:  string  // default '#fbbf24' — filled star
  hover:   string  // default '#f59e0b' — hovered star
  half?:   string  // default = filled  — half-filled star
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

---

## 🎰 Slots

| Slot      | Scoped props                           | Description                 |
| --------- | -------------------------------------- | --------------------------- |
| `icon`    | `{ filled, half, size, color, index }` | Custom icon per star        |
| `counter` | `{ value, max }`                       | Custom counter content      |
| `clear`   | —                                      | Custom clear button content |

---

## 📡 Events

| Event    | Payload             | Description                        |
| -------- | ------------------- | ---------------------------------- |
| `change` | `(value, oldValue)` | Rating changed by user interaction |
| `hover`  | `number \| null`    | Hover enters / leaves a star       |
| `focus`  | —                   | Component received keyboard focus  |
| `blur`   | —                   | Component lost focus               |

> `update:modelValue` is handled automatically by `v-model` / `defineModel`.

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

---

## 🖥️ Exposed Methods

```typescript
const ratingRef = ref<InstanceType<typeof VueStarRate>>();

ratingRef.value?.reset();          // Reset to initial value
ratingRef.value?.setRating(3.5);   // Set programmatically
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
| `role="slider"` on container      | `role="group"` — WCAG 2.2 compliant                       |
| `animation: { scale: 1.15 }`      | `animation: { type: 'scale' }` — no numeric scale key    |
| `peerDependencies: vue ^3.3.0`    | `peerDependencies: vue ^3.5.0`                            |
| Options API `data()`/`methods`    | Composition API + `<script setup>` / `defineModel`       |

### Animation Migration

```vue
<!-- v2 — scale was never a valid AnimationConfig key -->
:animation="{ enabled: true, duration: 200, scale: 1.15 }"

<!-- v3 — use type instead -->
:animation="{ enabled: true, duration: 200, type: 'scale' }"
```

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

---

<p align="center">
  <sub>Built with ❤️ for the Vue.js community</sub>
</p>
