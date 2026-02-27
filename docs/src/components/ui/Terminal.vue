<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

defineProps<Props>();
</script>

<template>
  <div :class="cn('inline-flex items-center gap-3 rounded-xl border border-noir-800 bg-noir-900/50 px-4 py-2 font-mono text-sm', $props.class)">
    <span class="text-noir-500">$</span>
    <slot />
    <button 
      class="ml-2 rounded-md p-1.5 text-noir-500 transition-colors hover:bg-noir-800 hover:text-white"
      title="Copy"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  </div>
</template>
