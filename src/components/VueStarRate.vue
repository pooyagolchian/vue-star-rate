<script setup lang="ts">
/**
 * Vue Star Rate Component
 * A highly customizable star rating component for Vue 3
 * Supports Lucide, FontAwesome, and custom icons
 */
import { computed, useTemplateRef } from 'vue';
import { useStarRating } from '../composables/useStarRating';
import type {
    AnimationConfig,
    IconSize,
    RatingValue,
    StarColors,
    StarRateEmits,
    StarRateProps,
} from '../types';
import FontAwesomeIcon from './icons/FontAwesomeIcon.vue';
import LucideIcon from './icons/LucideIcon.vue';
import SvgIcon from './icons/SvgIcon.vue';

// v-model binding — defineModel replaces the modelValue prop + update:modelValue emit
const modelValue = defineModel<number>({ default: 0 });

// Props with defaults (modelValue is handled by defineModel above)
const props = withDefaults(defineProps<StarRateProps>(), {
    maxStars: 5,
    allowHalf: false,
    readonly: false,
    disabled: false,
    showCounter: false,
    counterTemplate: '{value} / {max}',
    iconProvider: 'custom',
    iconSize: undefined,
    gap: 4,
    showTooltip: false,
    allowReset: true,
    minRating: 0,
    step: 1,
    rtl: false,
    clearable: false,
    inline: false,
    size: 'md',
    ariaLabel: 'Star rating',
});

// Emits — update:modelValue is emitted automatically by defineModel
const emit = defineEmits<StarRateEmits>();

// Default colors
const defaultColors: StarColors = {
    empty: '#d1d5db',
    filled: '#fbbf24',
    hover: '#f59e0b',
    half: '#fbbf24',
};

// Default animation
const defaultAnimation: AnimationConfig = {
    enabled: true,
    duration: 200,
    type: 'scale',
};

// Merged colors
const mergedColors = computed<StarColors>(() => ({
    ...defaultColors,
    ...props.colors,
}));

// Merged animation
const mergedAnimation = computed<AnimationConfig>(() => ({
    ...defaultAnimation,
    ...props.animation,
}));

// Icon size based on size preset
const sizePresets: Record<string, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
};

const computedIconSize = computed<IconSize>(() => {
    if (typeof props.iconSize === 'number') {
        return { width: props.iconSize, height: props.iconSize };
    }
    if (typeof props.iconSize === 'object') {
        return props.iconSize;
    }
    const size = sizePresets[props.size] ?? 24;
    return { width: size, height: size };
});

// Typed emit bridge — routes composable events to the correct defineEmits / defineModel
// No @ts-ignore needed: each branch is fully typed
const emitBridge = (
    event: 'update:modelValue' | 'change' | 'hover' | 'focus' | 'blur',
    ...args: unknown[]
): void => {
    if (event === 'update:modelValue') {
        modelValue.value = args[0] as RatingValue;
    } else if (event === 'change') {
        emit('change', args[0] as RatingValue, args[1] as RatingValue);
    } else if (event === 'hover') {
        emit('hover', args[0] as RatingValue | null);
    } else if (event === 'focus') {
        emit('focus');
    } else if (event === 'blur') {
        emit('blur');
    }
};

// Use star rating composable — options are passed as reactive getters
// so that changes to props after mount are tracked correctly inside the composable
const {
    stars,
    displayRating,
    isHovering,
    isFocused,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
    reset,
    setRating,
    getRating,
    setFocused,
} = useStarRating(
    {
        modelValue,                          // Ref<number> from defineModel — fully reactive
        maxStars: () => props.maxStars,
        allowHalf: () => props.allowHalf,
        readonly: () => props.readonly,
        disabled: () => props.disabled,
        allowReset: () => props.allowReset,
        minRating: () => props.minRating,
        step: () => props.step,
    },
    emitBridge,
);

// Container ref — Vue 3.5 useTemplateRef (matches ref="container" in template)
const containerRef = useTemplateRef<HTMLElement>('container');

// Counter text
const counterText = computed(() => {
    return props.counterTemplate
        .replace('{value}', displayRating.value.toString())
        .replace('{max}', props.maxStars.toString());
});

// Tooltip labels
const getTooltipLabel = (index: number): string => {
    if (props.tooltipLabels && props.tooltipLabels[index]) {
        return props.tooltipLabels[index];
    }
    return `${index + 1} star${index === 0 ? '' : 's'}`;
};

// Get current icon color
const getIconColor = (filled: boolean, half: boolean): string => {
    if (isHovering.value) {
        return mergedColors.value.hover;
    }
    if (filled) {
        return mergedColors.value.filled;
    }
    if (half) {
        return mergedColors.value.half || mergedColors.value.filled;
    }
    return mergedColors.value.empty;
};

// Handle star click with half support
const onStarClick = (starValue: number, event: MouseEvent): void => {
    if (props.readonly || props.disabled) return;

    let value = starValue;

    if (props.allowHalf) {
        const target = event.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const isLeftHalf = props.rtl
            ? event.clientX > rect.left + rect.width / 2
            : event.clientX < rect.left + rect.width / 2;

        if (isLeftHalf) {
            value = starValue - 0.5;
        }
    }

    handleClick(value);
};

// Handle mouse move for half-star hover
const onStarMouseMove = (starValue: number, event: MouseEvent): void => {
    if (props.readonly || props.disabled) return;

    let value = starValue;

    if (props.allowHalf) {
        const target = event.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const isLeftHalf = props.rtl
            ? event.clientX > rect.left + rect.width / 2
            : event.clientX < rect.left + rect.width / 2;

        if (isLeftHalf) {
            value = starValue - 0.5;
        }
    }

    handleMouseEnter(value);
};

// Clear rating - respects allowReset prop
const clearRating = (): void => {
    if (props.allowReset || props.clearable) {
        setRating(props.minRating);
    }
};

// Focus management
const focusComponent = (): void => {
    containerRef.value?.focus();
};

const blurComponent = (): void => {
    containerRef.value?.blur();
};

// Expose methods
defineExpose({
    reset,
    setRating,
    getRating,
    focus: focusComponent,
    blur: blurComponent,
});

// CSS classes
const containerClasses = computed(() => [
    'vue-star-rate',
    `vue-star-rate--${props.size}`,
    {
        'vue-star-rate--readonly': props.readonly,
        'vue-star-rate--disabled': props.disabled,
        'vue-star-rate--hovering': isHovering.value,
        'vue-star-rate--focused': isFocused.value,
        'vue-star-rate--inline': props.inline,
        'vue-star-rate--rtl': props.rtl,
        'vue-star-rate--animated': mergedAnimation.value.enabled,
    },
    props.className,
]);

// CSS variables for styling
const cssVars = computed(() => ({
    '--star-gap': `${props.gap}px`,
    '--star-color-empty': mergedColors.value.empty,
    '--star-color-filled': mergedColors.value.filled,
    '--star-color-hover': mergedColors.value.hover,
    '--animation-duration': `${mergedAnimation.value.duration}ms`,
}));
</script>

<template>
    <div ref="container" :class="containerClasses" :style="cssVars" role="group" :aria-label="ariaLabel"
        :aria-readonly="readonly" :aria-disabled="disabled" :tabindex="disabled ? -1 : 0" @keydown="handleKeyDown"
        @focus="setFocused(true)" @blur="setFocused(false)">
        <div class="vue-star-rate__stars" @mouseleave="handleMouseLeave">
            <button v-for="star in stars" :key="star.index" type="button" class="vue-star-rate__star" :class="{
                'vue-star-rate__star--filled': star.filled,
                'vue-star-rate__star--half': star.half,
                'vue-star-rate__star--active': star.active,
                [`vue-star-rate__star--animation-${mergedAnimation.type}`]: mergedAnimation.enabled,
            }" :disabled="disabled || readonly" :aria-label="getTooltipLabel(star.index)"
                :aria-pressed="star.active" :title="showTooltip ? getTooltipLabel(star.index) : undefined"
                @click="onStarClick(star.value, $event)" @mousemove="onStarMouseMove(star.value, $event)">
                <!-- Lucide Icons -->
                <LucideIcon v-if="iconProvider === 'lucide'"
                    :filled="star.filled || (isHovering && star.value <= displayRating)" :half="star.half"
                    :size="computedIconSize" :color="getIconColor(star.filled, star.half)"
                    :empty-color="mergedColors.empty" :index="star.index" />

                <!-- FontAwesome Icons -->
                <FontAwesomeIcon v-else-if="iconProvider === 'fontawesome'"
                    :filled="star.filled || (isHovering && star.value <= displayRating)" :half="star.half"
                    :size="computedIconSize" :color="getIconColor(star.filled, star.half)"
                    :empty-color="mergedColors.empty" :icon-empty="faIcons?.empty" :icon-filled="faIcons?.filled"
                    :icon-half="faIcons?.half" />

                <!-- Custom Icon via slot -->
                <slot v-else-if="iconProvider === 'custom' && $slots.icon" name="icon" :filled="star.filled"
                    :half="star.half" :size="computedIconSize" :color="getIconColor(star.filled, star.half)"
                    :index="star.index" />

                <!-- Default SVG Icon -->
                <SvgIcon v-else :filled="star.filled || (isHovering && star.value <= displayRating)" :half="star.half"
                    :size="computedIconSize" :color="getIconColor(star.filled, star.half)"
                    :empty-color="mergedColors.empty" :index="star.index" />

            </button>
        </div>

        <!-- Counter -->
        <span v-if="showCounter" class="vue-star-rate__counter" aria-live="polite">
            <slot name="counter" :value="displayRating" :max="maxStars">
                {{ counterText }}
            </slot>
        </span>

        <!-- Clear button -->
        <button v-if="clearable && displayRating > minRating && !readonly && !disabled" type="button"
            class="vue-star-rate__clear" aria-label="Clear rating" @click="clearRating">
            <slot name="clear">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </slot>
        </button>
    </div>
</template>

<style scoped>
.vue-star-rate {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
    user-select: none;
}

.vue-star-rate--inline {
    display: inline-flex;
}

.vue-star-rate--rtl {
    direction: rtl;
}

.vue-star-rate--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.vue-star-rate--readonly {
    cursor: default;
}

.vue-star-rate:focus {
    outline: none;
}

.vue-star-rate:focus-visible {
    outline: 2px solid var(--star-color-filled);
    outline-offset: 2px;
    border-radius: 4px;
}

.vue-star-rate__stars {
    display: inline-flex;
    align-items: center;
    gap: var(--star-gap);
}

.vue-star-rate__star {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: transform var(--animation-duration) ease;
}

.vue-star-rate__star:disabled {
    cursor: inherit;
}

.vue-star-rate__star:focus {
    outline: none;
}

.vue-star-rate:not(.vue-star-rate--readonly):not(.vue-star-rate--disabled) .vue-star-rate__star:hover {
    transform: scale(1.1);
}

/* Animation classes */
.vue-star-rate--animated .vue-star-rate__star--animation-scale:hover {
    transform: scale(1.2);
}

.vue-star-rate--animated .vue-star-rate__star--animation-bounce:hover {
    animation: star-bounce var(--animation-duration) ease;
}

.vue-star-rate--animated .vue-star-rate__star--animation-pulse:hover {
    animation: star-pulse var(--animation-duration) ease infinite;
}

@keyframes star-bounce {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.3);
    }
}

@keyframes star-pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }
}

.vue-star-rate__counter {
    color: #6b7280;
    font-size: 0.875rem;
    white-space: nowrap;
}

.vue-star-rate__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: none;
    background: transparent;
    color: #9ca3af;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.2s ease, background-color 0.2s ease;
}

.vue-star-rate__clear:hover {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
}

.vue-star-rate__clear:focus {
    outline: none;
}

.vue-star-rate__clear:focus-visible {
    outline: 2px solid #ef4444;
    outline-offset: 2px;
}

/* Size variants */
.vue-star-rate--xs {
    font-size: 12px;
}

.vue-star-rate--sm {
    font-size: 14px;
}

.vue-star-rate--md {
    font-size: 16px;
}

.vue-star-rate--lg {
    font-size: 18px;
}

.vue-star-rate--xl {
    font-size: 20px;
}
</style>
