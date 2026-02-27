/**
 * Vue Star Rate - TypeScript Type Definitions
 */
/** Icon provider type */
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
    /** Color for empty/inactive stars */
    empty: string;
    /** Color for filled/active stars */
    filled: string;
    /** Color on hover */
    hover: string;
    /** Color for half-filled stars */
    half?: string;
}
/** Animation configuration */
export interface AnimationConfig {
    /** Enable/disable animations */
    enabled: boolean;
    /** Animation duration in milliseconds */
    duration: number;
    /** Animation type */
    type: 'scale' | 'bounce' | 'pulse' | 'none';
}
/** Custom icon renderer function */
export type CustomIconRenderer = (props: {
    filled: boolean;
    half: boolean;
    size: IconSize;
    color: string;
    index: number;
}) => any;
/** Star rating props */
export interface StarRateProps {
    /** Current rating value (v-model) */
    modelValue?: RatingValue;
    /** Maximum number of stars */
    maxStars?: number;
    /** Allow half-star ratings */
    allowHalf?: boolean;
    /** Read-only mode */
    readonly?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Show rating counter */
    showCounter?: boolean;
    /** Counter format template */
    counterTemplate?: string;
    /** Icon provider */
    iconProvider?: IconProvider;
    /** Icon size */
    iconSize?: number | IconSize;
    /** Star colors configuration */
    colors?: Partial<StarColors>;
    /** Gap between stars in pixels */
    gap?: number;
    /** Animation configuration */
    animation?: Partial<AnimationConfig>;
    /** Custom icon renderer */
    customIcon?: CustomIconRenderer;
    /** Show tooltip on hover */
    showTooltip?: boolean;
    /** Tooltip labels */
    tooltipLabels?: string[];
    /** Enable reset (click same star to reset) */
    allowReset?: boolean;
    /** Minimum rating value */
    minRating?: number;
    /** Step value for rating increments */
    step?: number;
    /** FontAwesome icon names */
    faIcons?: {
        empty?: string;
        filled?: string;
        half?: string;
    };
    /** Lucide icon names */
    lucideIcons?: {
        empty?: string;
        filled?: string;
        half?: string;
    };
    /** RTL (right-to-left) support */
    rtl?: boolean;
    /** Clearable - show clear button */
    clearable?: boolean;
    /** Inline mode */
    inline?: boolean;
    /** Size preset */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Custom CSS class */
    className?: string;
    /** Accessible label */
    ariaLabel?: string;
}
/** Emitted events */
export interface StarRateEmits {
    /** Update model value */
    (e: 'update:modelValue', value: RatingValue): void;
    /** Rating changed event */
    (e: 'change', value: RatingValue, previousValue: RatingValue): void;
    /** Hover event */
    (e: 'hover', value: RatingValue | null): void;
    /** Focus event */
    (e: 'focus'): void;
    /** Blur event */
    (e: 'blur'): void;
}
/** Exposed component methods */
export interface StarRateExpose {
    /** Reset rating to initial value */
    reset: () => void;
    /** Set rating programmatically */
    setRating: (value: RatingValue) => void;
    /** Get current rating */
    getRating: () => RatingValue;
    /** Focus the component */
    focus: () => void;
    /** Blur the component */
    blur: () => void;
}
/** Plugin options */
export interface VueStarRateOptions {
    /** Default icon provider */
    defaultIconProvider?: IconProvider;
    /** Default colors */
    defaultColors?: Partial<StarColors>;
    /** Default animation */
    defaultAnimation?: Partial<AnimationConfig>;
    /** Global component name */
    componentName?: string;
}
/** Star item data structure */
export interface StarItem {
    index: number;
    value: number;
    filled: boolean;
    half: boolean;
    active: boolean;
}
declare const _default: {};
export default _default;
