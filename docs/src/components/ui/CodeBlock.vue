<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next';
import { ref } from 'vue';

interface Props {
  code: string;
  language?: string;
  title?: string;
}

defineProps<Props>();

const copied = ref(false);

async function copyCode(code: string) {
  await navigator.clipboard.writeText(code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="group relative overflow-hidden rounded-xl border border-noir-800 bg-noir-950">
    <!-- Header -->
    <div v-if="title || language" class="flex items-center justify-between border-b border-noir-800 px-4 py-2">
      <span v-if="title" class="text-xs font-medium text-noir-400">{{ title }}</span>
      <span v-if="language" class="text-xs text-noir-500">{{ language }}</span>
    </div>
    
    <!-- Code -->
    <div class="relative">
      <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono text-noir-200">{{ code }}</code></pre>
      
      <!-- Copy button -->
      <button
        @click="copyCode(code)"
        class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-noir-800/80 text-noir-400 opacity-0 transition-all hover:bg-noir-700 hover:text-white group-hover:opacity-100"
        :title="copied ? 'Copied!' : 'Copy code'"
      >
        <Check v-if="copied" class="h-4 w-4 text-green-400" />
        <Copy v-else class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
