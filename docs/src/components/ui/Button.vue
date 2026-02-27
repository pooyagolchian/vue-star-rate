<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

interface Props {
    variant?: 'default' | 'outline' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    class?: string;
    asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'default',
});

const buttonClass = computed(() =>
    cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50',
        {
            // Variants
            'bg-white text-black hover:bg-noir-200 active:bg-noir-300': props.variant === 'default',
            'border border-noir-700 bg-transparent hover:bg-noir-800 hover:border-noir-600': props.variant === 'outline',
            'hover:bg-noir-800 hover:text-white': props.variant === 'ghost',
            'text-white underline-offset-4 hover:underline': props.variant === 'link',
            // Sizes
            'h-10 px-4 py-2': props.size === 'default',
            'h-9 px-3 text-xs': props.size === 'sm',
            'h-12 px-8 text-base': props.size === 'lg',
            'h-10 w-10': props.size === 'icon',
        },
        props.class
    )
);
</script>

<template>
    <button :class="buttonClass">
        <slot />
    </button>
</template>
