/**
 * Vue Star Rate - TypeScript Type Definitions
 */
import type { MaybeRefOrGetter, VNode } from 'vue';

/**
 * Icon provider.
 *
 * - `'custom'` (the default): the built-in SVG star, or the content of the `#icon` slot when one is
 *   given.
 * - `'lucide'`: Lucide's own star geometry, drawn inline as an SVG. Nothing to install.
 * - `'fontawesome'`: renders `<i>` elements with Font Awesome class names. Your app must load Font
 *   Awesome's stylesheet, for example `import '@fortawesome/fontawesome-free/css/all.min.css'`;
 *   without it the stars are invisible.
 */
export type IconProvider = 'lucide' | 'fontawesome' | 'custom';

/** Star rating value type */
export type RatingValue = number;

/** Icon size configuration */
export interface IconSize {
  width: number;
  height: number;
}

/** Color configuration for stars */
export interface StarColors {
  /**
   * Color for empty/inactive stars
   * @default '#d1d5db'
   */
  empty: string;
  /**
   * Color for filled/active stars
   * @default '#fbbf24'
   */
  filled: string;
  /**
   * Color on hover
   * @default '#f59e0b'
   */
  hover: string;
  /**
   * Color for half-filled stars. It has its own default and does not follow `filled`, so set both
   * when you change the filled color.
   * @default '#fbbf24'
   */
  half?: string;
}

/** Animation configuration */
export interface AnimationConfig {
  /**
   * Enable/disable the effect chosen by `type` (scale, bounce or pulse). This is not a complete
   * off-switch: the base hover transition stays on, so interactive stars still scale to 1.1 on
   * hover, unless the user prefers reduced motion. Read-only and disabled stars have no base
   * hover scale, so for them `enabled: false` does switch the effect off.
   * @default true
   */
  enabled: boolean;
  /**
   * Animation duration in milliseconds
   * @default 200
   */
  duration: number;
  /**
   * Animation type. `'none'` selects no effect; the base hover transition described under
   * `enabled` still applies. Because interactive stars always get that base hover scale (1.1),
   * `'scale'` (1.2) only differs from `'none'` on read-only and disabled stars; `'bounce'` and
   * `'pulse'` play on hover for every star.
   * @default 'scale'
   */
  type: 'scale' | 'bounce' | 'pulse' | 'none';
}

/**
 * Custom icon renderer function.
 *
 * Not implemented: only the `customIcon` prop would take it, and nothing reads that prop.
 */
export type CustomIconRenderer = (props: {
  filled: boolean;
  half: boolean;
  size: IconSize;
  color: string;
  index: number;
}) => VNode | string | null;

/** Star rating props */
export interface StarRateProps {
  /**
   * Maximum number of stars
   * @default 5
   */
  maxStars?: number;
  /**
   * Allow half-star ratings
   * @default false
   */
  allowHalf?: boolean;
  /**
   * Read-only mode
   * @default false
   */
  readonly?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Show rating counter
   * @default false
   */
  showCounter?: boolean;
  /**
   * Counter format template
   * @default '{value} / {max}'
   */
  counterTemplate?: string;
  /**
   * Icon provider: `'custom'` (the built-in SVG star, or the `#icon` slot), `'lucide'` or
   * `'fontawesome'`. See `IconProvider`.
   * @default 'custom'
   */
  iconProvider?: IconProvider;
  /**
   * Icon size in pixels, or an explicit `{ width, height }`. When omitted, the size comes from the
   * `size` preset.
   */
  iconSize?: number | IconSize;
  /**
   * Star colors configuration. Merged over the built-in defaults, so pass only the keys you want
   * to change (see `StarColors` for the defaults).
   */
  colors?: Partial<StarColors>;
  /**
   * Gap between stars in pixels
   * @default 4
   */
  gap?: number;
  /**
   * Animation configuration. Merged over the built-in defaults (see `AnimationConfig`).
   */
  animation?: Partial<AnimationConfig>;
  /**
   * Custom icon renderer.
   *
   * Not implemented: the prop is accepted but nothing reads it, so it has no effect. To draw
   * your own icon, use the `#icon` slot (with the default `iconProvider="custom"`); it receives
   * `filled`, `half`, `size`, `color` and `index`.
   */
  customIcon?: CustomIconRenderer;
  /**
   * Show tooltip on hover
   * @default false
   */
  showTooltip?: boolean;
  /** Tooltip labels */
  tooltipLabels?: string[];
  /**
   * Enable reset: clicking the star that matches the current rating sets the rating back to
   * `minRating`. The clear button (`clearable`) does not depend on this prop.
   * @default true
   */
  allowReset?: boolean;
  /**
   * Minimum rating value
   * @default 0
   */
  minRating?: number;
  /**
   * Step value for rating increments. Ignored with `allowHalf` (the step is then 0.5). A step that
   * is 0, negative or not finite falls back to 1.
   * @default 1
   */
  step?: number;
  /**
   * Font Awesome class names for the `<i>` element of each star state. Only used when
   * `iconProvider` is `'fontawesome'`.
   */
  faIcons?: {
    /** @default 'fa-regular fa-star' */
    empty?: string;
    /** @default 'fa-solid fa-star' */
    filled?: string;
    /** @default 'fa-solid fa-star-half-stroke' */
    half?: string;
  };
  /**
   * RTL (right-to-left) support: the stars are laid out right to left and a pointer click on the
   * half of a star is mirrored. Known gap: the half-star fill is still painted on the left side of
   * the star, and `ArrowLeft` / `ArrowRight` are not mirrored.
   * @default false
   */
  rtl?: boolean;
  /**
   * Clearable - show clear button
   * @default false
   */
  clearable?: boolean;
  /**
   * Inline mode.
   *
   * Not implemented: this only adds the `vue-star-rate--inline` class, and the root is already
   * `display: inline-flex`, so it currently changes nothing visually.
   * @default false
   */
  inline?: boolean;
  /**
   * Size preset
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Custom CSS class */
  className?: string;
  /**
   * `aria-label` of the root element (`role="group"`)
   * @default 'Star rating'
   */
  ariaLabel?: string;
}

/**
 * Emitted events (Vue 3.5 object-literal style).
 * `update:modelValue` is handled automatically by `defineModel` and is not listed here.
 * Whenever the committed rating changes through the component, `update:modelValue` is emitted
 * first and `change` right after it.
 */
export interface StarRateEmits {
  /**
   * The committed rating changed through the component: a click, the keyboard, `setRating()` or
   * `reset()`. Emitted right after `update:modelValue`, with the new and the previous value. It is
   * not emitted when the parent changes `v-model` itself.
   */
  change: [value: RatingValue, previousValue: RatingValue];
  /** The value being previewed while the pointer is over the stars, or `null` when it leaves */
  hover: [value: RatingValue | null];
  /** The root element (role="group") received focus. Not emitted when focus lands directly on a star button. */
  focus: [];
  /** The root element lost focus. Also emitted when focus moves from the root onto a star button inside the widget. */
  blur: [];
}

/** Exposed component methods */
export interface StarRateExpose {
  /**
   * Reset rating to the value the component had when it was mounted. This does not clear the
   * rating: use `setRating(0)` for that (it clamps to `minRating`). Emits `update:modelValue` and
   * `change` if the rating differs.
   */
  reset: () => void;
  /**
   * Set rating programmatically. The value is clamped to `minRating`..`maxStars` and snapped to
   * the step (0.5 with `allowHalf`); `update:modelValue` and `change` are emitted if the rating
   * changes.
   */
  setRating: (value: RatingValue) => void;
  /** Get current rating */
  getRating: () => RatingValue;
  /** Focus the component */
  focus: () => void;
  /** Blur the root element. Does nothing while a star button has focus. */
  blur: () => void;
}

/**
 * Plugin options.
 * Only `componentName` has an effect today; `defaultIconProvider`, `defaultColors` and
 * `defaultAnimation` are not implemented.
 */
export interface VueStarRateOptions {
  /**
   * Default icon provider.
   *
   * Not implemented: the options are provided to the app under `vueStarRateOptions`, but
   * nothing reads them, so this has no effect. Set `iconProvider` on the component instead.
   */
  defaultIconProvider?: IconProvider;
  /**
   * Default colors.
   *
   * Not implemented: the options are provided to the app under `vueStarRateOptions`, but
   * nothing reads them, so this has no effect. Set `colors` on the component instead.
   */
  defaultColors?: Partial<StarColors>;
  /**
   * Default animation.
   *
   * Not implemented: the options are provided to the app under `vueStarRateOptions`, but
   * nothing reads them, so this has no effect. Set `animation` on the component instead.
   */
  defaultAnimation?: Partial<AnimationConfig>;
  /**
   * Global component name
   * @default 'VueStarRate'
   */
  componentName?: string;
}

/** Star item data structure */
export interface StarItem {
  index: number;
  value: number;
  filled: boolean;
  half: boolean;
  /** Convenience alias: true when filled or half */
  active: boolean;
}

/** Options for the `useStarRating` composable.
 *  All option fields accept a plain value, a `Ref`, or a getter `() => T`
 *  so reactive prop bindings are tracked correctly.
 */
export interface UseStarRatingOptions {
  modelValue?: MaybeRefOrGetter<RatingValue>;
  maxStars: MaybeRefOrGetter<number>;
  allowHalf: MaybeRefOrGetter<boolean>;
  readonly: MaybeRefOrGetter<boolean>;
  disabled: MaybeRefOrGetter<boolean>;
  allowReset: MaybeRefOrGetter<boolean>;
  minRating: MaybeRefOrGetter<number>;
  step: MaybeRefOrGetter<number>;
}

export default {};
