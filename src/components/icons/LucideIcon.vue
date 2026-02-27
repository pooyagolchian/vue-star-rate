<script setup lang="ts">
import { Star } from 'lucide-vue-next';
/**
 * Lucide Icon Provider Component
 * Renders star icons using Lucide Vue icons
 */
import { computed } from 'vue';
import type { IconSize } from '../../types';

interface Props {
    filled?: boolean;
    half?: boolean;
    size?: number | IconSize;
    color?: string;
    emptyColor?: string;
    strokeWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
    filled: false,
    half: false,
    size: 24,
    color: '#fbbf24',
    emptyColor: '#d1d5db',
    strokeWidth: 2,
});

const iconSize = computed(() => {
    if (typeof props.size === 'number') {
        return { width: props.size, height: props.size };
    }
    return props.size;
});

const currentColor = computed(() => {
    return props.filled || props.half ? props.color : props.emptyColor;
});

const fillColor = computed(() => {
    if (props.filled) return props.color;
    if (props.half) return `url(#half-gradient-${props.color.replace('#', '')})`;
    return 'none';
});
</script>

<template>
    <span class="lucide-icon-wrapper">
        <svg v-if="half" :width="0" :height="0" style="position: absolute; visibility: hidden;">
            <defs>
                <linearGradient :id="`half-gradient-${color.replace('#', '')}`">
                    <stop offset="50%" :stop-color="color" />
                    <stop offset="50%" stop-color="transparent" />
                </linearGradient>
            </defs>
        </svg>
        <Star :size="iconSize.width" :color="currentColor" :fill="fillColor" :stroke-width="strokeWidth" />
    </span>
</template>

<style scoped>
.lucide-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
