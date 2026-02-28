<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

interface Props {
    class?: string;
    hoverable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    hoverable: false,
});

const cardClass = computed(() =>
    cn(
        'rounded-2xl border border-noir-800 bg-noir-950/50 p-4 md:p-6 backdrop-blur-sm transition-all duration-300 overflow-hidden',
        {
            'hover:border-noir-700 hover:bg-noir-900/50': props.hoverable,
        },
        props.class
    )
);
</script>

<template>
    <div :class="cardClass">
        <slot />
    </div>
</template>
