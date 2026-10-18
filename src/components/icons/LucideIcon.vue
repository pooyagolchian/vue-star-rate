<script setup lang="ts">
/*!
 * The star path in this file is the `star` icon from Lucide (https://lucide.dev), used under the
 * ISC license. The full license text is in THIRD-PARTY-NOTICES.md.
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without
 * fee is hereby granted, provided that the above copyright notice and this permission notice appear
 * in all copies.
 */

/**
 * Lucide star icon provider.
 *
 * The star is Lucide's own `star` geometry, inlined, so this provider needs no icon package:
 * the published entry imports nothing but `vue`, and consumer bundlers have nothing optional
 * to resolve at build time.
 *
 * Keep the license notice above next to the path data. It is a `/*!` comment so that bundlers
 * keep it, and tests/consumer-build.spec.ts checks that it reaches dist/.
 */
import { computed, useId } from 'vue';
import type { IconSize } from '../../types';

// Path data of Lucide's `star` icon (identical in the 0.469 and 1.x releases).
const STAR_PATH =
    'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z';

interface Props {
    filled?: boolean;
    half?: boolean;
    size?: number | IconSize;
    color?: string;
    emptyColor?: string;
    strokeWidth?: number;
    /** Position of the star. Unused; accepted so existing bindings keep type-checking. */
    index?: number;
}

const props = withDefaults(defineProps<Props>(), {
    filled: false,
    half: false,
    size: 24,
    color: '#fbbf24',
    emptyColor: '#d1d5db',
    strokeWidth: 2,
    index: 0,
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

// `url(#id)` resolves against the whole document, so the gradient id must be unique on the page.
// useId() is unique within one Vue app and identical on the server and the client, which keeps
// hydration quiet; an index-based id collides as soon as two ratings show a half star at the same
// position. The prefix keeps it clear of the ids other components derive from useId() (for example
// `<label for>` targets), which all share the `v-N` namespace. Every createApp() root restarts
// that counter, so several Vue apps on one page need distinct `app.config.idPrefix` values.
const gradientId = `vsr-half-${useId()}`;

const fillColor = computed(() => {
    if (props.filled) return props.color;
    if (props.half) return `url(#${gradientId})`;
    return 'none';
});
</script>

<template>
    <span class="lucide-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-star-icon lucide-star" :width="iconSize.width"
            :height="iconSize.height" viewBox="0 0 24 24" :fill="fillColor" :stroke="currentColor"
            :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <defs v-if="half">
                <linearGradient :id="gradientId">
                    <stop offset="50%" :stop-color="color" />
                    <stop offset="50%" stop-color="transparent" />
                </linearGradient>
            </defs>
            <path :d="STAR_PATH" />
        </svg>
    </span>
</template>

<style scoped>
.lucide-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
