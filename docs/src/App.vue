<script setup lang="ts">
import {
    Accessibility,
    ArrowRight,
    Check,
    ExternalLink,
    Github,
    Globe,
    Keyboard,
    Package,
    Palette,
    Star,
    Zap
} from 'lucide-vue-next';
import { ref } from 'vue';

import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CodeBlock from '@/components/ui/CodeBlock.vue';

// Demo states
const basicRating = ref(3);
const halfRating = ref(3.5);
const sizeRatings = ref({
    xs: 4,
    sm: 4,
    md: 4,
    lg: 4,
    xl: 4,
});
const colorRating = ref(4);
const animationRating = ref(3);
const readonlyRating = ref(4);

// Code examples
const installCode = `pnpm add vue-js-star-rating`;

const basicUsage = `<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

const rating = ref(0);
<\/script>

<template>
  <VueStarRate v-model="rating" />
</template>`;

const halfStarCode = `<VueStarRate 
  v-model="rating" 
  :allow-half="true" 
  :show-counter="true" 
/>`;

const sizePresetsCode = `<!-- Size Presets: xs(16px), sm(20px), md(24px), lg(32px), xl(40px) -->
<VueStarRate v-model="rating" size="xs" />
<VueStarRate v-model="rating" size="sm" />
<VueStarRate v-model="rating" size="md" />
<VueStarRate v-model="rating" size="lg" />
<VueStarRate v-model="rating" size="xl" />`;

const customColorsCode = `<VueStarRate
  v-model="rating"
  :colors="{
    empty: '#3f3f46',
    filled: '#ffffff',
    hover: '#a1a1aa',
  }"
/>`;

// Features list
const features = [
    { icon: Star, title: 'Half-Star Support', desc: 'Precise ratings with half values' },
    { icon: Palette, title: 'Customizable', desc: 'Colors, sizes, and animations' },
    { icon: Keyboard, title: 'Keyboard Navigation', desc: 'Full a11y keyboard support' },
    { icon: Zap, title: 'TypeScript', desc: 'Complete type definitions' },
    { icon: Globe, title: 'RTL Support', desc: 'Right-to-left layouts' },
    { icon: Accessibility, title: 'Accessible', desc: 'WCAG 2.1 compliant' },
];

// Props table
const propsData = [
    { name: 'modelValue', type: 'number', default: '0', desc: 'Rating value (v-model)' },
    { name: 'maxStars', type: 'number', default: '5', desc: 'Maximum stars' },
    { name: 'allowHalf', type: 'boolean', default: 'false', desc: 'Enable half ratings' },
    { name: 'size', type: 'string', default: "'md'", desc: 'xs | sm | md | lg | xl' },
    { name: 'iconSize', type: 'number | object', default: 'auto', desc: 'Override size' },
    { name: 'colors', type: 'object', default: '...', desc: 'Color configuration' },
    { name: 'readonly', type: 'boolean', default: 'false', desc: 'Disable interaction' },
    { name: 'showCounter', type: 'boolean', default: 'false', desc: 'Show rating counter' },
    { name: 'showTooltip', type: 'boolean', default: 'false', desc: 'Show hover tooltips' },
    { name: 'animation', type: 'object', default: '...', desc: 'Animation config' },
];
</script>

<template>
    <div class="min-h-screen bg-black">
        <!-- Background Effects -->
        <div class="fixed inset-0 -z-10">
            <div class="absolute inset-0 bg-gradient-to-br from-noir-950 via-black to-noir-950"></div>
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-noir-800/20 via-transparent to-transparent blur-3xl">
            </div>
            <div
                class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-noir-700/10 to-transparent blur-3xl">
            </div>
        </div>

        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 border-b border-noir-900/50 bg-black/80 backdrop-blur-lg">
            <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <div class="flex items-center gap-3">
                    <Star class="h-6 w-6 text-white" :fill="'currentColor'" />
                    <span class="text-lg font-semibold tracking-tight">Vue Star Rate</span>
                </div>
                <div class="hidden md:flex items-center gap-8">
                    <a href="#features" class="text-sm text-noir-400 transition-colors hover:text-white">Features</a>
                    <a href="#examples" class="text-sm text-noir-400 transition-colors hover:text-white">Examples</a>
                    <a href="#api" class="text-sm text-noir-400 transition-colors hover:text-white">API</a>
                </div>
                <div class="flex items-center gap-3">
                    <a href="https://github.com/pooyagolchian/vue-star-rate" target="_blank"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-noir-400 transition-colors hover:bg-noir-800 hover:text-white">
                        <Github class="h-5 w-5" />
                    </a>
                    <a href="https://www.npmjs.com/package/vue-js-star-rating" target="_blank"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-noir-400 transition-colors hover:bg-noir-800 hover:text-white">
                        <Package class="h-5 w-5" />
                    </a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="relative pt-32 pb-24 px-6">
            <div class="mx-auto max-w-4xl text-center">
                <!-- Version Badge -->
                <div class="mb-8 flex justify-center">
                    <Badge variant="outline" class="gap-2 px-4 py-1.5">
                        <span class="h-2 w-2 rounded-full bg-green-400"></span>
                        v2.0.0 — Vue 3 + TypeScript
                    </Badge>
                </div>

                <!-- Title -->
                <h1 class="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
                    <span class="gradient-text">Vue Star Rate</span>
                </h1>

                <p class="mx-auto mb-10 max-w-2xl text-lg text-noir-400 leading-relaxed md:text-xl">
                    A highly customizable, accessible, and feature-rich star rating component
                    for Vue 3 with full TypeScript support.
                </p>

                <!-- Interactive Demo -->
                <Card class="mx-auto mb-10 max-w-md" hoverable>
                    <div class="flex flex-col items-center gap-4">
                        <span class="text-sm text-noir-500 uppercase tracking-wider">Try it out</span>
                        <VueStarRate v-model="basicRating" size="xl" :show-counter="true" :colors="{
                            empty: '#3f3f46',
                            filled: '#ffffff',
                            hover: '#a1a1aa',
                        }" />
                    </div>
                </Card>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" class="gap-2">
                        Get Started
                        <ArrowRight class="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg" class="gap-2">
                        <Github class="h-4 w-4" />
                        View on GitHub
                    </Button>
                </div>

                <!-- Install Command -->
                <div class="mt-10 flex justify-center">
                    <div
                        class="inline-flex items-center gap-3 rounded-xl border border-noir-800 bg-noir-900/50 px-5 py-3 font-mono text-sm">
                        <span class="text-noir-500">$</span>
                        <span class="text-noir-200">{{ installCode }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-6"></div>

        <!-- Features Section -->
        <section id="features" class="py-24 px-6">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <Badge variant="secondary" class="mb-4">Features</Badge>
                    <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Everything you need</h2>
                    <p class="mt-4 text-noir-400">Built for modern Vue applications with best practices in mind.</p>
                </div>

                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card v-for="feature in features" :key="feature.title" hoverable class="group">
                        <div
                            class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-noir-800/50 text-white transition-colors group-hover:bg-white group-hover:text-black">
                            <component :is="feature.icon" class="h-6 w-6" />
                        </div>
                        <h3 class="mb-2 text-lg font-semibold">{{ feature.title }}</h3>
                        <p class="text-sm text-noir-400">{{ feature.desc }}</p>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-6"></div>

        <!-- Examples Section -->
        <section id="examples" class="py-24 px-6">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <Badge variant="secondary" class="mb-4">Examples</Badge>
                    <h2 class="text-3xl font-bold tracking-tight md:text-4xl">See it in action</h2>
                    <p class="mt-4 text-noir-400">Interactive examples demonstrating core features.</p>
                </div>

                <div class="space-y-12">
                    <!-- Basic Usage -->
                    <Card>
                        <div class="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold">Basic Usage</h3>
                                <p class="mb-6 text-sm text-noir-400">Simple star rating with v-model binding.</p>
                                <CodeBlock :code="basicUsage" language="vue" />
                            </div>
                            <div
                                class="flex flex-col items-center justify-center rounded-xl border border-noir-800 bg-noir-900/30 p-8">
                                <VueStarRate v-model="basicRating" size="lg" :show-counter="true" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Half Stars -->
                    <Card>
                        <div class="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold">Half-Star Ratings</h3>
                                <p class="mb-6 text-sm text-noir-400">Enable precise half-star values.</p>
                                <CodeBlock :code="halfStarCode" language="vue" />
                            </div>
                            <div
                                class="flex flex-col items-center justify-center rounded-xl border border-noir-800 bg-noir-900/30 p-8">
                                <VueStarRate v-model="halfRating" :allow-half="true" size="lg" :show-counter="true"
                                    :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                        half: '#a1a1aa',
                                    }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Size Presets -->
                    <Card>
                        <div class="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold">Size Presets</h3>
                                <p class="mb-6 text-sm text-noir-400">Five predefined sizes for quick styling.</p>
                                <CodeBlock :code="sizePresetsCode" language="vue" />
                            </div>
                            <div
                                class="flex flex-col items-center justify-center gap-6 rounded-xl border border-noir-800 bg-noir-900/30 p-8">
                                <div v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size"
                                    class="flex items-center gap-4">
                                    <span class="w-8 text-xs text-noir-500 uppercase">{{ size }}</span>
                                    <VueStarRate v-model="sizeRatings[size as keyof typeof sizeRatings]"
                                        :size="size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'" :colors="{
                                            empty: '#3f3f46',
                                            filled: '#ffffff',
                                            hover: '#a1a1aa',
                                        }" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- Custom Colors -->
                    <Card>
                        <div class="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold">Custom Colors</h3>
                                <p class="mb-6 text-sm text-noir-400">Match your design system with custom colors.</p>
                                <CodeBlock :code="customColorsCode" language="vue" />
                            </div>
                            <div
                                class="flex flex-col items-center justify-center gap-6 rounded-xl border border-noir-800 bg-noir-900/30 p-8">
                                <VueStarRate v-model="colorRating" size="xl" :colors="{
                                    empty: '#27272a',
                                    filled: '#ffffff',
                                    hover: '#71717a',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Read-only -->
                    <Card>
                        <div class="grid gap-8 lg:grid-cols-2">
                            <div>
                                <h3 class="mb-2 text-xl font-semibold">Read-only Mode</h3>
                                <p class="mb-6 text-sm text-noir-400">Display ratings without interaction.</p>
                                <CodeBlock code='<VueStarRate v-model="rating" :readonly="true" />' language="vue" />
                            </div>
                            <div
                                class="flex flex-col items-center justify-center gap-6 rounded-xl border border-noir-800 bg-noir-900/30 p-8">
                                <VueStarRate v-model="readonlyRating" size="lg" :readonly="true" :show-counter="true"
                                    :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                    }" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-6"></div>

        <!-- API Reference -->
        <section id="api" class="py-24 px-6">
            <div class="mx-auto max-w-6xl">
                <div class="mb-16 text-center">
                    <Badge variant="secondary" class="mb-4">API</Badge>
                    <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Props Reference</h2>
                    <p class="mt-4 text-noir-400">Complete list of available configuration options.</p>
                </div>

                <Card class="overflow-hidden p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-noir-800 bg-noir-900/50">
                                <tr>
                                    <th class="px-6 py-4 text-left font-medium text-noir-300">Prop</th>
                                    <th class="px-6 py-4 text-left font-medium text-noir-300">Type</th>
                                    <th class="px-6 py-4 text-left font-medium text-noir-300">Default</th>
                                    <th class="px-6 py-4 text-left font-medium text-noir-300">Description</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-noir-800/50">
                                <tr v-for="prop in propsData" :key="prop.name"
                                    class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-6 py-4 font-mono text-white">{{ prop.name }}</td>
                                    <td class="px-6 py-4 font-mono text-noir-400">{{ prop.type }}</td>
                                    <td class="px-6 py-4 font-mono text-noir-500">{{ prop.default }}</td>
                                    <td class="px-6 py-4 text-noir-300">{{ prop.desc }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <!-- Events -->
                <div class="mt-12">
                    <h3 class="mb-6 text-xl font-semibold">Events</h3>
                    <Card class="overflow-hidden p-0">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="border-b border-noir-800 bg-noir-900/50">
                                    <tr>
                                        <th class="px-6 py-4 text-left font-medium text-noir-300">Event</th>
                                        <th class="px-6 py-4 text-left font-medium text-noir-300">Payload</th>
                                        <th class="px-6 py-4 text-left font-medium text-noir-300">Description</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-noir-800/50">
                                    <tr class="transition-colors hover:bg-noir-900/30">
                                        <td class="px-6 py-4 font-mono text-white">update:modelValue</td>
                                        <td class="px-6 py-4 font-mono text-noir-400">number</td>
                                        <td class="px-6 py-4 text-noir-300">Emitted on rating change</td>
                                    </tr>
                                    <tr class="transition-colors hover:bg-noir-900/30">
                                        <td class="px-6 py-4 font-mono text-white">change</td>
                                        <td class="px-6 py-4 font-mono text-noir-400">(value, oldValue)</td>
                                        <td class="px-6 py-4 text-noir-300">Emitted with previous value</td>
                                    </tr>
                                    <tr class="transition-colors hover:bg-noir-900/30">
                                        <td class="px-6 py-4 font-mono text-white">hover</td>
                                        <td class="px-6 py-4 font-mono text-noir-400">number | null</td>
                                        <td class="px-6 py-4 text-noir-300">Emitted on star hover</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <!-- Keyboard Navigation -->
                <div class="mt-12">
                    <h3 class="mb-6 text-xl font-semibold">Keyboard Navigation</h3>
                    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <Card class="flex items-center gap-3 p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">→</kbd>
                            <span class="text-sm text-noir-300">Increase rating</span>
                        </Card>
                        <Card class="flex items-center gap-3 p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">←</kbd>
                            <span class="text-sm text-noir-300">Decrease rating</span>
                        </Card>
                        <Card class="flex items-center gap-3 p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">Home</kbd>
                            <span class="text-sm text-noir-300">Set to minimum</span>
                        </Card>
                        <Card class="flex items-center gap-3 p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">End</kbd>
                            <span class="text-sm text-noir-300">Set to maximum</span>
                        </Card>
                        <Card class="flex items-center gap-3 p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">1-9</kbd>
                            <span class="text-sm text-noir-300">Jump to value</span>
                        </Card>
                        <Card class="flex items-center gap-3 p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">0</kbd>
                            <span class="text-sm text-noir-300">Reset</span>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-noir-900 py-12 px-6">
            <div class="mx-auto max-w-6xl">
                <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div class="flex items-center gap-3">
                        <Star class="h-5 w-5 text-white" :fill="'currentColor'" />
                        <span class="font-medium">Vue Star Rate</span>
                    </div>

                    <div class="flex items-center gap-6 text-sm text-noir-500">
                        <a href="https://github.com/pooyagolchian/vue-star-rate" target="_blank"
                            class="transition-colors hover:text-white">
                            GitHub
                        </a>
                        <a href="https://www.npmjs.com/package/vue-js-star-rating" target="_blank"
                            class="transition-colors hover:text-white">
                            npm
                        </a>
                        <a href="https://pooya.blog" target="_blank" class="transition-colors hover:text-white">
                            Author
                        </a>
                    </div>

                    <p class="text-sm text-noir-600">
                        MIT © 2024 Pooya Golchian
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>
