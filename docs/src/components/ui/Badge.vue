<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed } from 'vue';

interface Props {
  variant?: 'default' | 'secondary' | 'outline';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const badgeClass = computed(() =>
  cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
    {
      'bg-white text-black': props.variant === 'default',
      'bg-noir-800 text-noir-200': props.variant === 'secondary',
      'border border-noir-700 text-noir-300': props.variant === 'outline',
    },
    props.class
  )
);
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>
