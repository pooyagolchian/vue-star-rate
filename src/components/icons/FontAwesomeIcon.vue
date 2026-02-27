<script setup lang="ts">
/**
 * FontAwesome Icon Provider Component
 * Renders star icons using FontAwesome classes
 */
import { computed } from 'vue';
import type { IconSize } from '../../types';

interface Props {
    filled?: boolean;
    half?: boolean;
    size?: number | IconSize;
    color?: string;
    emptyColor?: string;
    iconEmpty?: string;
    iconFilled?: string;
    iconHalf?: string;
}

const props = withDefaults(defineProps<Props>(), {
    filled: false,
    half: false,
    size: 24,
    color: '#fbbf24',
    emptyColor: '#d1d5db',
    iconEmpty: 'fa-regular fa-star',
    iconFilled: 'fa-solid fa-star',
    iconHalf: 'fa-solid fa-star-half-stroke',
});

const iconSize = computed(() => {
    if (typeof props.size === 'number') {
        return { width: props.size, height: props.size };
    }
    return props.size;
});

const iconClass = computed(() => {
    if (props.half) return props.iconHalf;
    if (props.filled) return props.iconFilled;
    return props.iconEmpty;
});

const iconColor = computed(() => {
    return props.filled || props.half ? props.color : props.emptyColor;
});

const iconStyle = computed(() => ({
    fontSize: `${iconSize.value.width}px`,
    color: iconColor.value,
    width: `${iconSize.value.width}px`,
    height: `${iconSize.value.height}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
</script>

<template>
    <span class="fa-icon-wrapper" :style="iconStyle">
        <i :class="iconClass" />
    </span>
</template>

<style scoped>
.fa-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.fa-icon-wrapper i {
    display: inline-block;
}
</style>
