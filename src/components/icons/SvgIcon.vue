<script setup lang="ts">
/**
 * SVG Icon Provider Component
 * Renders star icons using custom SVG (default fallback)
 *
 * The star outline below is the `star` icon of Feather (https://github.com/feathericons/feather),
 * MIT License, Copyright (c) 2013-2023 Cole Bemis. The license text is in THIRD-PARTY-NOTICES.md.
 */
import { computed, useId } from 'vue';
import type { IconSize } from '../../types';

interface Props {
    filled?: boolean;
    half?: boolean;
    size?: number | IconSize;
    color?: string;
    emptyColor?: string;
    /** Position of the star. Unused; accepted so existing bindings keep type-checking. */
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

// `url(#id)` resolves against the whole document, so the gradient id must be unique on the page.
// useId() is unique within one Vue app and identical on the server and the client, which keeps
// hydration quiet; an index-based id collides as soon as two ratings show a half star at the same
// position, and `url(#id)` then picks the first gradient in the document (the second rating borrows
// its colour, or paints nothing). The prefix keeps it clear of the ids other components derive from
// useId() (for example `<label for>` targets), which all share the `v-N` namespace. Every
// createApp() root restarts that counter, so several Vue apps on one page need distinct
// `app.config.idPrefix` values.
const gradientId = `vsr-half-${useId()}`;

const fillColor = computed(() => {
    if (props.half) return `url(#${gradientId})`;
    return props.filled ? props.color : 'none';
});
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
