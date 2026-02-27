<h1 align="center">⭐ Vue Star Rate</h1>

<p align="center">
  <strong>A highly customizable, accessible star rating component for Vue</strong>
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

| Feature                    | Description                                  |
| -------------------------- | -------------------------------------------- |
| 🎯 **Half-star ratings**   | Support for precise 0.5 increment ratings    |
| 📐 **Size presets**        | Built-in `xs`, `sm`, `md`, `lg`, `xl` sizes  |
| 🎨 **Custom colors**       | Fully customizable empty/filled/hover colors |
| ⌨️ **Keyboard navigation** | Full accessibility with arrow keys           |
| 🔒 **Read-only mode**      | Display-only ratings for reviews             |
| 📱 **Responsive**          | Mobile-first, works on all screen sizes      |
| 🔷 **TypeScript**          | Full type definitions included               |
| ⚡ **Lightweight**         | Zero dependencies, tiny bundle               |
| 🌐 **RTL Support**         | Right-to-left layout compatibility           |
| ♿ **Accessible**          | WCAG 2.1 compliant                           |

---

## 📦 Installation

### Vue 3 (Recommended)

```bash
# pnpm (recommended)
pnpm add vue-js-star-rating

# npm
npm install vue-js-star-rating

# yarn
yarn add vue-js-star-rating
```

### Vue 2 (Legacy)

> ⚠️ **Note**: Vue 2 reached End of Life on December 31, 2023. Consider upgrading to Vue 3.

```bash
npm install vue-star-rate@^1.0.0
```

---

## 🚀 Quick Start

### Vue 3

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

### Vue 2

```vue
<template>
  <star-rate :value="rating" @input="rating = $event" :star-count="5" />
</template>

<script>
import StarRate from 'vue-star-rate';

export default {
  components: { StarRate },
  data() {
    return { rating: 0 };
  },
};
</script>
```

---

## 📖 Vue 3 Examples

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

### Custom Star Count

```vue
<VueStarRate v-model="rating" :max-stars="10" />
```

### Counter & Tooltips

```vue
<!-- Show counter -->
<VueStarRate v-model="rating" :show-counter="true" />

<!-- Show tooltips on hover -->
<VueStarRate v-model="rating" :show-tooltip="true" />
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
    scale: 1.15,
  }"
  @change="(val, old) => console.log(val, old)"
  @hover="(val) => console.log('hover:', val)"
/>
```

---

## 📋 Vue 3 Props API

| Prop          | Type                                   | Default | Description              |
| ------------- | -------------------------------------- | ------- | ------------------------ |
| `modelValue`  | `number`                               | `0`     | Rating value (v-model)   |
| `maxStars`    | `number`                               | `5`     | Maximum number of stars  |
| `allowHalf`   | `boolean`                              | `false` | Enable half-star ratings |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Size preset              |
| `iconSize`    | `number \| { width, height }`          | `auto`  | Custom pixel size        |
| `colors`      | `object`                               | `{...}` | Color configuration      |
| `readonly`    | `boolean`                              | `false` | Disable user interaction |
| `showCounter` | `boolean`                              | `false` | Show rating number       |
| `showTooltip` | `boolean`                              | `false` | Show hover tooltips      |
| `animation`   | `object`                               | `{...}` | Animation configuration  |

### Colors Object

```typescript
{
  empty: '#d1d5db',    // Empty star color
  filled: '#fbbf24',   // Filled star color
  hover: '#fcd34d',    // Hover state color
  half: '#fbbf24'      // Half-star color
}
```

### Animation Object

```typescript
{
  enabled: true,       // Enable animations
  duration: 200,       // Animation duration in ms
  scale: 1.15          // Scale factor on hover
}
```

---

## 📡 Events

| Event               | Payload             | Description                 |
| ------------------- | ------------------- | --------------------------- |
| `update:modelValue` | `number`            | Emitted when rating changes |
| `change`            | `(value, oldValue)` | Emitted with previous value |
| `hover`             | `number \| null`    | Emitted on star hover/leave |

---

## ⌨️ Keyboard Navigation

| Key     | Action                 |
| ------- | ---------------------- |
| `→` `↑` | Increase rating        |
| `←` `↓` | Decrease rating        |
| `Home`  | Set to minimum (0)     |
| `End`   | Set to maximum         |
| `1-9`   | Jump to specific value |
| `0`     | Reset to zero          |

---

## 🔄 Vue 2 to Vue 3 Migration

### Breaking Changes

| Vue 2 (v1.x)                    | Vue 3 (v2.x)             |
| ------------------------------- | ------------------------ |
| `:value` + `@input`             | `v-model`                |
| `:star-count`                   | `:max-stars`             |
| `:half-star`                    | `:allow-half`            |
| `activeColor` / `inactiveColor` | `:colors` object         |
| Component: `star-rate`          | Component: `VueStarRate` |

### Migration Example

```vue
<!-- Vue 2 -->
<star-rate
  :value="rating"
  @input="rating = $event"
  :star-count="5"
  :half-star="true"
  active-color="#fbbf24"
  inactive-color="#d1d5db"
/>

<!-- Vue 3 -->
<VueStarRate
  v-model="rating"
  :max-stars="5"
  :allow-half="true"
  :colors="{
    filled: '#fbbf24',
    empty: '#d1d5db',
  }"
/>
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
