<script setup lang="ts">
/**
 * SVG Icon Provider Component
 * Renders star icons using custom SVG (default fallback)
 */
import { computed } from 'vue';
import type { IconSize } from '../../types';

interface Props {
    filled?: boolean;
    half?: boolean;
    size?: number | IconSize;
    color?: string;
    emptyColor?: string;
    index?: number;
}

const props = withDefaults(defineProps<Props>(), {
    filled: false,
    half: false,
    size: 24,
    color: '#fbbf24',
    emptyColor: '#d1d5db',
    index: 0,
});

const iconSize = computed(() => {
    if (typeof props.size === 'number') {
        return { width: props.size, height: props.size };
    }
    return props.size;
});

const strokeColor = computed(() => {
    return props.filled || props.half ? props.color : props.emptyColor;
});

const fillColor = computed(() => {
    if (props.half) return `url(#half-gradient-${props.index})`;
    return props.filled ? props.color : 'none';
});

// Stable gradient ID based on index
const gradientId = computed(() => `half-gradient-${props.index}`);
</script>

<template>
    <span class="svg-icon-wrapper">
        <svg :width="iconSize.width" :height="iconSize.height" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <defs v-if="half">
                <linearGradient :id="gradientId">
                    <stop offset="50%" :stop-color="color" />
                    <stop offset="50%" stop-color="transparent" />
                </linearGradient>
            </defs>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                :stroke="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                :fill="fillColor" />
        </svg>
    </span>
</template>

<style scoped>
.svg-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
