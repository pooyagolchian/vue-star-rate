# Vue Star Rate ⭐

A highly customizable, accessible star rating component for Vue 3 with TypeScript support.

[![npm version](https://badge.fury.io/js/vue-js-star-rating.svg)](https://badge.fury.io/js/vue-js-star-rating)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Multiple Icon Providers** - Built-in SVG, Lucide, and FontAwesome support
- ⭐ **Half-Star Support** - Allow precise half-star ratings
- ⌨️ **Keyboard Navigation** - Full keyboard accessibility with arrow keys
- 🎯 **TypeScript** - Full type definitions included
- 🎭 **Animations** - Scale, bounce, and pulse animations
- 🌍 **RTL Support** - Right-to-left language support
- ♿ **Accessible** - ARIA compliant with screen reader support
- 🎨 **Customizable** - Colors, sizes, icons, and more

## Installation

```bash
npm install vue-js-star-rating
# or
yarn add vue-js-star-rating
# or
pnpm add vue-js-star-rating
```

### Optional Peer Dependencies

For icon providers:

```bash
# For Lucide icons
npm install lucide-vue-next

# For FontAwesome icons
npm install @fortawesome/fontawesome-free
```

## Quick Start

### Global Registration

```typescript
import { createApp } from 'vue';
import VueStarRatePlugin from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

const app = createApp(App);
app.use(VueStarRatePlugin);
app.mount('#app');
```

### Local Registration

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

const rating = ref(3);
</script>

<template>
  <VueStarRate v-model="rating" />
</template>
```

## Usage Examples

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';

const rating = ref(0);
</script>

<template>
  <VueStarRate v-model="rating" :show-counter="true" />
</template>
```

### Half-Star Ratings

```vue
<VueStarRate v-model="rating" :allow-half="true" :show-counter="true" />
```

### Custom Colors

```vue
<VueStarRate
  v-model="rating"
  :colors="{
    empty: '#e5e7eb',
    filled: '#ef4444',
    hover: '#dc2626',
  }"
/>
```

### FontAwesome Icons

```vue
<VueStarRate
  v-model="rating"
  icon-provider="fontawesome"
  :fa-icons="{
    empty: 'fa-regular fa-star',
    filled: 'fa-solid fa-star',
    half: 'fa-solid fa-star-half-stroke',
  }"
/>
```

### Lucide Icons

```vue
<VueStarRate v-model="rating" icon-provider="lucide" />
```

### Size Presets

```vue
<VueStarRate v-model="rating" size="xs" />
<!-- 16px -->
<VueStarRate v-model="rating" size="sm" />
<!-- 20px -->
<VueStarRate v-model="rating" size="md" />
<!-- 24px (default) -->
<VueStarRate v-model="rating" size="lg" />
<!-- 32px -->
<VueStarRate v-model="rating" size="xl" />
<!-- 40px -->
```

### Custom Icon Size

```vue
<VueStarRate v-model="rating" :icon-size="48" />

<!-- Or with different width/height -->
<VueStarRate v-model="rating" :icon-size="{ width: 32, height: 28 }" />
```

### Animations

```vue
<VueStarRate
  v-model="rating"
  :animation="{
    enabled: true,
    type: 'bounce', // 'scale' | 'bounce' | 'pulse' | 'none'
    duration: 300,
  }"
/>
```

### Read-Only & Disabled States

```vue
<!-- Read-only (no interaction, pointer cursor) -->
<VueStarRate v-model="rating" :readonly="true" />

<!-- Disabled (no interaction, reduced opacity) -->
<VueStarRate v-model="rating" :disabled="true" />
```

### With Tooltips

```vue
<VueStarRate
  v-model="rating"
  :show-tooltip="true"
  :tooltip-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']"
/>
```

### Clearable with Clear Button

```vue
<VueStarRate v-model="rating" :clearable="true" />
```

### Custom Max Stars

```vue
<VueStarRate v-model="rating" :max-stars="10" />
```

### RTL Support

```vue
<VueStarRate v-model="rating" :rtl="true" />
```

### Custom Counter Template

```vue
<VueStarRate
  v-model="rating"
  :show-counter="true"
  counter-template="{value} out of {max} stars"
/>
```

### Events

```vue
<script setup lang="ts">
import { ref } from 'vue';

const rating = ref(3);

const handleChange = (value: number, oldValue: number) => {
  console.log(`Changed from ${oldValue} to ${value}`);
};

const handleHover = (value: number | null) => {
  console.log(`Hovering: ${value}`);
};
</script>

<template>
  <VueStarRate
    v-model="rating"
    @change="handleChange"
    @hover="handleHover"
    @focus="() => console.log('Focused')"
    @blur="() => console.log('Blurred')"
  />
</template>
```

### Exposed Methods

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { StarRateExpose } from 'vue-js-star-rating';

const starRateRef = ref<StarRateExpose | null>(null);

const resetRating = () => {
  starRateRef.value?.reset();
};

const setToFive = () => {
  starRateRef.value?.setRating(5);
};

const getCurrentRating = () => {
  console.log(starRateRef.value?.getRating());
};
</script>

<template>
  <VueStarRate ref="starRateRef" :model-value="3" />
  <button @click="resetRating">Reset</button>
  <button @click="setToFive">Set to 5</button>
</template>
```

## Props

| Prop              | Type                                          | Default             | Description                        |
| ----------------- | --------------------------------------------- | ------------------- | ---------------------------------- |
| `modelValue`      | `number`                                      | `0`                 | The current rating value (v-model) |
| `maxStars`        | `number`                                      | `5`                 | Maximum number of stars            |
| `allowHalf`       | `boolean`                                     | `false`             | Allow half-star ratings            |
| `readonly`        | `boolean`                                     | `false`             | Make the component read-only       |
| `disabled`        | `boolean`                                     | `false`             | Disable the component              |
| `showCounter`     | `boolean`                                     | `false`             | Show rating counter                |
| `counterTemplate` | `string`                                      | `'{value} / {max}'` | Counter display template           |
| `iconProvider`    | `'lucide' \| 'fontawesome' \| 'custom'`       | `'custom'`          | Icon provider to use               |
| `iconSize`        | `number \| { width: number, height: number }` | `24`                | Icon size                          |
| `colors`          | `object`                                      | See below           | Color configuration                |
| `gap`             | `number`                                      | `4`                 | Gap between stars in pixels        |
| `animation`       | `object`                                      | See below           | Animation configuration            |
| `showTooltip`     | `boolean`                                     | `false`             | Show tooltips on hover             |
| `tooltipLabels`   | `string[]`                                    | `undefined`         | Custom tooltip labels              |
| `allowReset`      | `boolean`                                     | `true`              | Allow clicking same star to reset  |
| `minRating`       | `number`                                      | `0`                 | Minimum allowed rating             |
| `step`            | `number`                                      | `1`                 | Step value for rating increments   |
| `rtl`             | `boolean`                                     | `false`             | Right-to-left support              |
| `clearable`       | `boolean`                                     | `false`             | Show clear button                  |
| `inline`          | `boolean`                                     | `false`             | Inline display mode                |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`        | `'md'`              | Size preset                        |
| `className`       | `string`                                      | `undefined`         | Custom CSS class                   |
| `ariaLabel`       | `string`                                      | `'Star rating'`     | Accessible label                   |

### Colors Object

```typescript
{
  empty: '#d1d5db',   // Color for empty stars
  filled: '#fbbf24',  // Color for filled stars
  hover: '#f59e0b',   // Color on hover
  half: '#fbbf24'     // Color for half-filled stars
}
```

### Animation Object

```typescript
{
  enabled: true,       // Enable/disable animations
  duration: 200,       // Duration in milliseconds
  type: 'scale'        // 'scale' | 'bounce' | 'pulse' | 'none'
}
```

## Events

| Event               | Parameters                          | Description                            |
| ------------------- | ----------------------------------- | -------------------------------------- |
| `update:modelValue` | `(value: number)`                   | Emitted when rating changes            |
| `change`            | `(value: number, oldValue: number)` | Emitted with both old and new values   |
| `hover`             | `(value: number \| null)`           | Emitted on hover (null on mouse leave) |
| `focus`             | `()`                                | Emitted when component gains focus     |
| `blur`              | `()`                                | Emitted when component loses focus     |

## Keyboard Navigation

| Key       | Action                                       |
| --------- | -------------------------------------------- |
| `→` / `↑` | Increase rating by 1 (or 0.5 if `allowHalf`) |
| `←` / `↓` | Decrease rating by 1 (or 0.5 if `allowHalf`) |
| `Home`    | Set to minimum rating                        |
| `End`     | Set to maximum rating                        |
| `1-9`     | Set specific rating value                    |
| `0`       | Set to minimum rating                        |

## Composable

You can also use the `useStarRating` composable for custom implementations:

```typescript
import { useStarRating } from 'vue-js-star-rating';

const {
  stars,
  displayRating,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  handleKeyDown,
  reset,
  setRating,
  getRating,
} = useStarRating(options, emit);
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type {
  StarRateProps,
  StarRateEmits,
  StarRateExpose,
  RatingValue,
  IconProvider,
  StarColors,
  AnimationConfig,
} from 'vue-js-star-rating';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Migration from v1.x

### Breaking Changes

1. **Vue 3 Required** - This version requires Vue 3.3+
2. **TypeScript** - Full TypeScript support added
3. **Props renamed**:
   - `rateRange` → `modelValue` (v-model)
   - `maxIcon` → `maxStars`
   - `iconHeight/iconWidth` → `iconSize`
   - `hasCounter` → `showCounter`
   - `iconColor` → `colors.filled`
   - `iconColorHover` → `colors.hover`
4. **Events renamed**:
   - `ratingSet` → `update:modelValue` and `change`
5. **vue-awesome removed** - Now supports Lucide, FontAwesome, or custom SVG

### Migration Example

**Before (v1.x):**

```vue
<vue-star-rate
  :rate-range="3"
  :max-icon="5"
  :icon-height="25"
  :icon-width="25"
  :has-counter="true"
  :icon-color="#f3d23e"
  @ratingSet="onRating"
/>
```

**After (v2.x):**

```vue
<VueStarRate
  v-model="rating"
  :max-stars="5"
  :icon-size="25"
  :show-counter="true"
  :colors="{ filled: '#f3d23e' }"
  @change="onRating"
/>
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build library
npm run build
```

## License

MIT © [Pooya Golchian](https://github.com/pooyagolchian)

## Support

- ⭐ Star this repo if you find it useful
- 🐛 [Report bugs](https://github.com/pooyagolchian/vue-star-rate/issues)
- 💡 [Request features](https://github.com/pooyagolchian/vue-star-rate/issues)
