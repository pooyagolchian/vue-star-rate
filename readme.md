<p align="center">
  <img src="https://raw.githubusercontent.com/nickvujakin/img/master/vue-star-rating.svg" width="120" alt="Vue Star Rate">
</p>

<h1 align="center">Vue Star Rate</h1>

<p align="center">
  <strong>A flexible, customizable star rating component for Vue 3</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-star-rate">
    <img src="https://img.shields.io/npm/v/vue-star-rate.svg?style=flat-square&color=000" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/vue-star-rate">
    <img src="https://img.shields.io/npm/dm/vue-star-rate.svg?style=flat-square&color=000" alt="npm downloads">
  </a>
  <a href="https://github.com/nickvujakin/vue-star-rate/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/vue-star-rate.svg?style=flat-square&color=000" alt="license">
  </a>
  <a href="https://github.com/nickvujakin/vue-star-rate">
    <img src="https://img.shields.io/github/stars/nickvujakin/vue-star-rate?style=flat-square&color=000" alt="GitHub stars">
  </a>
</p>

<p align="center">
  <a href="https://pooyagolchian.github.io/vue-star-rate/"><strong>📖 View Documentation →</strong></a>
</p>

---

## ✨ Features

| Feature                    | Description                               |
| -------------------------- | ----------------------------------------- |
| 🎯 **Half-star ratings**   | Support for precise 0.5 increment ratings |
| 📐 **Size presets**        | Built-in `sm`, `md`, `lg`, `xl` sizes     |
| 🎨 **Custom colors**       | Fully customizable active/inactive colors |
| ⌨️ **Keyboard navigation** | Full accessibility with arrow keys        |
| 🔒 **Read-only mode**      | Display-only ratings for reviews          |
| 📱 **Responsive**          | Works perfectly on all screen sizes       |
| 🔷 **TypeScript**          | Full type definitions included            |
| ⚡ **Lightweight**         | Zero dependencies, tiny bundle            |

## 📦 Installation

```bash
# npm
npm install vue-star-rate

# yarn
yarn add vue-star-rate

# pnpm
pnpm add vue-star-rate
```

## 🚀 Quick Start

### Global Registration

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import VueStarRate from 'vue-star-rate';

const app = createApp(App);
app.component('VueStarRate', VueStarRate);
app.mount('#app');
```

### Local Registration

```vue
<script setup lang="ts">
import { ref } from 'vue';
import VueStarRate from 'vue-star-rate';

const rating = ref(3.5);
</script>

<template>
  <VueStarRate v-model="rating" />
</template>
```

## 📖 Examples

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import VueStarRate from 'vue-star-rate';

const rating = ref(3);
</script>

<template>
  <VueStarRate v-model="rating" />
</template>
```

### Half-Star Ratings

```vue
<VueStarRate v-model="rating" :isHalfStar="true" />
```

### Size Presets

```vue
<!-- Small -->
<VueStarRate v-model="rating" size="sm" />

<!-- Medium (default) -->
<VueStarRate v-model="rating" size="md" />

<!-- Large -->
<VueStarRate v-model="rating" size="lg" />

<!-- Extra Large -->
<VueStarRate v-model="rating" size="xl" />
```

### Custom Colors

```vue
<VueStarRate v-model="rating" activeColor="#10b981" inactiveColor="#374151" />
```

### Read-only Display

```vue
<VueStarRate :modelValue="4.5" :isReadonly="true" />
```

### Custom Star Count

```vue
<VueStarRate v-model="rating" :count="10" />
```

## 📋 Props API

| Prop            | Type                                     | Default     | Description                            |
| --------------- | ---------------------------------------- | ----------- | -------------------------------------- |
| `modelValue`    | `number`                                 | `0`         | Current rating value (v-model)         |
| `count`         | `number`                                 | `5`         | Total number of stars                  |
| `size`          | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'`      | Star size preset or custom pixel value |
| `activeColor`   | `string`                                 | `'#fbbf24'` | Color of filled stars                  |
| `inactiveColor` | `string`                                 | `'#d1d5db'` | Color of empty stars                   |
| `isHalfStar`    | `boolean`                                | `false`     | Enable half-star ratings               |
| `isReadonly`    | `boolean`                                | `false`     | Disable user interaction               |

### Size Reference

| Preset | Size |
| ------ | ---- |
| `sm`   | 16px |
| `md`   | 24px |
| `lg`   | 32px |
| `xl`   | 48px |

## 📡 Events

| Event               | Payload  | Description                 |
| ------------------- | -------- | --------------------------- |
| `update:modelValue` | `number` | Emitted when rating changes |

## ⌨️ Keyboard Navigation

The component supports full keyboard accessibility:

| Key     | Action             |
| ------- | ------------------ |
| `←` `↓` | Decrease rating    |
| `→` `↑` | Increase rating    |
| `Home`  | Set to minimum (0) |
| `End`   | Set to maximum     |

## 🔧 Composable API

For advanced use cases, you can use the composable directly:

```typescript
import { useStarRate } from 'vue-star-rate';

const { rating, setRating, increment, decrement } = useStarRate({
  initialValue: 3,
  max: 5,
  allowHalf: true,
  readonly: false,
});
```

## 📝 TypeScript

Full TypeScript support with exported types:

```typescript
import type { StarRateProps, StarRateEmits, StarRateSize } from 'vue-star-rate';
```

## 🔄 Migration from Vue 2

### Breaking Changes from v1.x

1. **Vue 3 Required**: This version requires Vue 3.x
2. **v-model syntax**: Changed from `:value` to `v-model`
3. **Size prop**: Now accepts presets (`sm`, `md`, `lg`, `xl`) in addition to numbers
4. **Props renamed**: `isHalfStar` and `isReadonly` (consistent naming)

### Migration Example

```vue
<!-- Vue 2 (v1.x) -->
<star-rate :value="rating" @input="rating = $event" :half-star="true" />

<!-- Vue 3 (v2.x) -->
<VueStarRate v-model="rating" :isHalfStar="true" />
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/nickvujakin/vue-star-rate.git
cd vue-star-rate

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run docs development server
pnpm docs:dev

# Build docs for production
pnpm docs:build
```

## 📄 License

[MIT](./LICENSE) © [Nick Vujakin](https://github.com/nickvujakin)

---

<p align="center">
  <sub>Built with ❤️ for the Vue.js community</sub>
</p>
