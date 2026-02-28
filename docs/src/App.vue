<script setup lang="ts">
import {
    Accessibility,
    ArrowRight,
    Check,
    Clipboard,
    Code2,
    Github,
    Globe,
    Keyboard,
    Menu,
    Package,
    Palette,
    Smartphone,
    Star,
    X,
    Zap
} from 'lucide-vue-next';
import { ref } from 'vue';

import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import CodeBlock from '@/components/ui/CodeBlock.vue';

// Mobile menu state
const mobileMenuOpen = ref(false);

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
const customIconRating = ref(3);
const tooltipRating = ref(2);
const readonlyRating = ref(4);
const animationRating = ref(3);
const maxStarsRating = ref(7);
const counterRating = ref(3.5);

// Copy state
const copiedCode = ref<string | null>(null);

const copyToClipboard = async (code: string, id: string) => {
    try {
        await navigator.clipboard.writeText(code);
        copiedCode.value = id;
        setTimeout(() => {
            copiedCode.value = null;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
};

// Code examples
const installCode = `pnpm add vue-js-star-rating`;

const vue3BasicUsage = `<script setup lang="ts">
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
<VueStarRate v-model="rating" size="xl" />

<!-- Custom pixel size -->
<VueStarRate v-model="rating" :icon-size="28" />`;

const customColorsCode = `<VueStarRate
  v-model="rating"
  :colors="{
    empty: '#3f3f46',
    filled: '#ffffff',
    hover: '#a1a1aa',
    half: '#71717a'
  }"
/>`;

const readonlyCode = `<VueStarRate 
  v-model="rating" 
  :readonly="true" 
  :show-counter="true"
/>`;

const maxStarsCode = `<VueStarRate 
  v-model="rating" 
  :max-stars="10" 
/>`;

const counterTooltipCode = `<!-- Show counter -->
<VueStarRate 
  v-model="rating" 
  :show-counter="true" 
  :allow-half="true"
/>

<!-- Show tooltips on hover -->
<VueStarRate 
  v-model="rating" 
  :show-tooltip="true"
/>`;

const animationCode = `<VueStarRate
  v-model="rating"
  :animation="{
    enabled: true,
    duration: 200,
    type: 'scale'
  }"
/>`;

const globalPluginCode = `// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import VueStarRatePlugin from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

createApp(App).use(VueStarRatePlugin).mount('#app');`;

const fullExampleCode = `<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';
import 'vue-js-star-rating/dist/style.css';

const rating = ref(3.5);
<\/script>

<template>
  <VueStarRate
    v-model="rating"
    :max-stars="5"
    :allow-half="true"
    :readonly="false"
    :show-counter="true"
    :show-tooltip="true"
    size="lg"
    :colors="{
      empty: '#27272a',
      filled: '#fbbf24',
      hover: '#fcd34d',
      half: '#fbbf24'
    }"
    :animation="{
      enabled: true,
      duration: 200,
      type: 'scale'
    }"
    @change="(val, old) => console.log(val, old)"
    @hover="(val) => console.log('hover:', val)"
  />
</template>`;

// Features list
const features = [
    { icon: Star, title: 'Half-Star Support', desc: 'Precise ratings with 0.5 increments' },
    { icon: Palette, title: 'Customizable', desc: 'Colors, sizes, and animations' },
    { icon: Keyboard, title: 'Keyboard Navigation', desc: 'Full a11y keyboard support' },
    { icon: Zap, title: 'TypeScript', desc: 'Complete type definitions' },
    { icon: Globe, title: 'RTL Support', desc: 'Right-to-left layouts' },
    { icon: Accessibility, title: 'Accessible', desc: 'WCAG 2.2 compliant (role=group, aria-pressed)' },
    { icon: Smartphone, title: 'Responsive', desc: 'Mobile-first design' },
    { icon: Code2, title: 'Lightweight', desc: 'Zero dependencies' },
];

// Props table
const propsData = [
    { name: 'v-model', type: 'number', default: '0', desc: 'Rating value' },
    { name: 'maxStars', type: 'number', default: '5', desc: 'Maximum number of stars' },
    { name: 'allowHalf', type: 'boolean', default: 'false', desc: 'Enable half-star ratings' },
    { name: 'size', type: 'string', default: "'md'", desc: 'Size preset: xs | sm | md | lg | xl' },
    { name: 'iconSize', type: 'number | object', default: 'auto', desc: 'Custom pixel size or {width, height}' },
    { name: 'iconProvider', type: 'string', default: "'custom'", desc: "Icon renderer: 'custom' | 'lucide' | 'fontawesome'" },
    { name: 'colors', type: 'object', default: '{...}', desc: 'Color configuration object' },
    { name: 'animation', type: 'object', default: '{...}', desc: 'Animation config: { enabled, duration, type }' },
    { name: 'readonly', type: 'boolean', default: 'false', desc: 'Disable user interaction' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable + grey out component' },
    { name: 'clearable', type: 'boolean', default: 'false', desc: 'Show clear button when rating > 0' },
    { name: 'allowReset', type: 'boolean', default: 'true', desc: 'Click active star again to reset' },
    { name: 'showCounter', type: 'boolean', default: 'false', desc: 'Show rating counter' },
    { name: 'counterTemplate', type: 'string', default: "'{value} / {max}'", desc: 'Counter format template' },
    { name: 'showTooltip', type: 'boolean', default: 'false', desc: 'Show tooltips on star hover' },
    { name: 'tooltipLabels', type: 'string[]', default: '—', desc: 'Custom tooltip labels per star' },
    { name: 'minRating', type: 'number', default: '0', desc: 'Minimum selectable value' },
    { name: 'step', type: 'number', default: '1', desc: 'Increment step (overridden by allowHalf)' },
    { name: 'rtl', type: 'boolean', default: 'false', desc: 'Right-to-left layout' },
    { name: 'gap', type: 'number', default: '4', desc: 'Gap between stars in pixels' },
    { name: 'ariaLabel', type: 'string', default: "'Star rating'", desc: 'Accessible group label' },
];

// Events table
const eventsData = [
    { name: 'change', payload: '(value, oldValue)', desc: 'Rating changed by user interaction' },
    { name: 'hover', payload: 'number | null', desc: 'Hover enters / leaves a star' },
    { name: 'focus', payload: '—', desc: 'Component received keyboard focus' },
    { name: 'blur', payload: '—', desc: 'Component lost focus' },
];

// Navigation
const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#installation', label: 'Installation' },
    { href: '#examples', label: 'Examples' },
    { href: '#api', label: 'API' },
];

const scrollToSection = (href: string) => {
    mobileMenuOpen.value = false;
    const el = document.querySelector(href);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <div class="min-h-screen bg-black overflow-x-hidden">
        <!-- Background Effects -->
        <div class="fixed inset-0 -z-10 pointer-events-none">
            <div class="absolute inset-0 bg-linear-to-br from-noir-950 via-black to-noir-950"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[min(600px,90vw)] md:w-[800px] h-[400px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,#27272a33,transparent)] blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[radial-gradient(ellipse_at_center,#3f3f461a,transparent)] blur-3xl"></div>
        </div>

        <!-- Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-50 border-b border-noir-900/50 bg-black/80 backdrop-blur-lg">
            <div class="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between px-4 md:px-6">
                <div class="flex items-center gap-2 md:gap-3">
                    <span class="text-xl md:text-2xl">⭐</span>
                    <span class="text-base md:text-lg font-semibold tracking-tight">Vue Star Rate</span>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8">
                    <a v-for="link in navLinks" :key="link.href" :href="link.href" 
                       class="text-sm text-noir-400 transition-colors hover:text-white">
                        {{ link.label }}
                    </a>
                </div>
                
                <div class="flex items-center gap-2 md:gap-3">
                    <a href="https://github.com/pooyagolchian/vue-star-rate" target="_blank"
                        class="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg text-noir-400 transition-colors hover:bg-noir-800 hover:text-white">
                        <Github class="h-4 w-4 md:h-5 md:w-5" />
                    </a>
                    <a href="https://www.npmjs.com/package/vue-js-star-rating" target="_blank"
                        class="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg text-noir-400 transition-colors hover:bg-noir-800 hover:text-white">
                        <Package class="h-4 w-4 md:h-5 md:w-5" />
                    </a>
                    
                    <!-- Mobile Menu Button -->
                    <button @click="mobileMenuOpen = !mobileMenuOpen" 
                            class="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-noir-400 hover:bg-noir-800 hover:text-white">
                        <Menu v-if="!mobileMenuOpen" class="h-5 w-5" />
                        <X v-else class="h-5 w-5" />
                    </button>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div v-if="mobileMenuOpen" class="md:hidden border-t border-noir-900/50 bg-black/95 backdrop-blur-lg">
                <div class="px-4 py-4 space-y-1">
                    <button v-for="link in navLinks" :key="link.href" 
                            @click="scrollToSection(link.href)"
                            class="block w-full text-left px-3 py-2 rounded-lg text-sm text-noir-400 hover:text-white hover:bg-noir-900/50">
                        {{ link.label }}
                    </button>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
            <div class="mx-auto max-w-4xl text-center">
                <!-- Version Badge -->
                <div class="mb-6 md:mb-8 flex justify-center">
                    <Badge variant="outline" class="gap-2 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm">
                        <span class="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-400"></span>
                    v3.0.0 — Vue 3.5 + TypeScript 5.7
                    </Badge>
                </div>

                <!-- Title -->
                <h1 class="mb-4 md:mb-6 text-[clamp(2.25rem,8vw,4.5rem)] font-bold tracking-tight leading-none">
                    <span class="gradient-text">Vue Star Rate</span>
                </h1>

                <p class="mx-auto mb-8 md:mb-10 max-w-2xl text-sm md:text-lg lg:text-xl text-noir-400 leading-relaxed px-2">
                    A highly customizable, accessible, and feature-rich star rating component
                    for Vue 3 with full TypeScript support.
                </p>

                <!-- Interactive Demo -->
                <Card class="mx-auto mb-8 md:mb-10 max-w-xs sm:max-w-sm md:max-w-md" hoverable>
                    <div class="flex flex-col items-center gap-3 md:gap-4">
                        <span class="text-xs md:text-sm text-noir-500 uppercase tracking-wider">Try it out</span>
                        <VueStarRate v-model="basicRating"
                            :size="'lg'"
                            class="sm:hidden"
                            :show-counter="true" :colors="{
                            empty: '#3f3f46',
                            filled: '#ffffff',
                            hover: '#a1a1aa',
                        }" />
                        <VueStarRate v-model="basicRating"
                            :size="'xl'"
                            class="hidden sm:block"
                            :show-counter="true" :colors="{
                            empty: '#3f3f46',
                            filled: '#ffffff',
                            hover: '#a1a1aa',
                        }" />
                    </div>
                </Card>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
                    <Button size="lg" class="w-full sm:w-auto gap-2" @click="scrollToSection('#installation')">
                        Get Started
                        <ArrowRight class="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg" class="w-full sm:w-auto gap-2" as="a" href="https://github.com/pooyagolchian/vue-star-rate" target="_blank">
                        <Github class="h-4 w-4" />
                        View on GitHub
                    </Button>
                </div>

                <!-- Install Command -->
                <div class="mt-8 md:mt-10 flex justify-center px-4">
                    <button @click="copyToClipboard(installCode, 'install')"
                        class="group inline-flex w-full max-w-xs sm:w-auto items-center justify-between gap-2 md:gap-3 rounded-xl border border-noir-800 bg-noir-900/50 px-4 md:px-5 py-2.5 md:py-3 font-mono text-xs md:text-sm hover:border-noir-700 transition-colors overflow-hidden">
                        <span class="text-noir-500 shrink-0">$</span>
                        <span class="text-noir-200 truncate">{{ installCode }}</span>
                        <span class="text-noir-500 group-hover:text-white transition-colors shrink-0">
                            <Check v-if="copiedCode === 'install'" class="h-4 w-4 text-green-400" />
                            <Clipboard v-else class="h-4 w-4" />
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- Features Section -->
        <section id="features" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-6xl">
                <div class="mb-12 md:mb-16 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">Features</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Everything you need</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">Built for modern Vue applications with best practices in mind.</p>
                </div>

                <div class="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <Card v-for="feature in features" :key="feature.title" hoverable class="group">
                        <div class="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-noir-800/50 text-white transition-colors group-hover:bg-white group-hover:text-black">
                            <component :is="feature.icon" class="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 class="mb-1 md:mb-2 text-base md:text-lg font-semibold">{{ feature.title }}</h3>
                        <p class="text-xs md:text-sm text-noir-400">{{ feature.desc }}</p>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- Installation Section -->
        <section id="installation" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-4xl">
                <div class="mb-12 md:mb-16 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">Installation</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Get started in seconds</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">Vue 3.5+ · TypeScript-first · Zero dependencies.</p>
                </div>

                <!-- Vue 3 Installation -->
                <div class="space-y-4 md:space-y-6">
                    <Card>
                        <h3 class="mb-3 md:mb-4 text-base md:text-lg font-semibold">1. Install the package</h3>
                        <CodeBlock :code="'pnpm add vue-js-star-rating\n# or\nnpm install vue-js-star-rating\n# or\nyarn add vue-js-star-rating'" language="bash" />
                        <p class="mt-3 text-xs text-noir-500">Requires Vue 3.5+ · Zero runtime dependencies</p>
                    </Card>
                    <Card>
                        <h3 class="mb-3 md:mb-4 text-base md:text-lg font-semibold">2. Import and use</h3>
                        <CodeBlock :code="vue3BasicUsage" language="vue" />
                    </Card>
                    <Card>
                        <h3 class="mb-3 md:mb-4 text-base md:text-lg font-semibold">3. Register globally (optional)</h3>
                        <CodeBlock :code="globalPluginCode" language="typescript" />
                    </Card>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- Examples Section -->
        <section id="examples" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-6xl">
                <div class="mb-12 md:mb-16 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">Examples</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">See it in action</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">Interactive examples demonstrating all features.</p>
                </div>

                <div class="space-y-6 md:space-y-10">
                    <!-- Half Stars -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Half-Star Ratings</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Enable precise half-star values with counter display.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="halfStarCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] md:min-h-[140px] flex-col items-center justify-center rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
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
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Size Presets</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Five predefined sizes or custom pixel values.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="sizePresetsCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex flex-col items-start justify-center gap-3 md:gap-5 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8 overflow-x-auto">
                                <div v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size"
                                    class="flex items-center gap-2 md:gap-4">
                                    <span class="w-5 md:w-8 shrink-0 text-xs text-noir-500 uppercase">{{ size }}</span>
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
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Custom Colors</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Match your design system with custom color configuration.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="customColorsCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate v-model="colorRating" size="lg" class="sm:hidden" :colors="{
                                    empty: '#27272a',
                                    filled: '#ffffff',
                                    hover: '#71717a',
                                }" />
                                <VueStarRate v-model="colorRating" size="xl" class="hidden sm:block" :colors="{
                                    empty: '#27272a',
                                    filled: '#ffffff',
                                    hover: '#71717a',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Max Stars -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Custom Star Count</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Configure any number of stars for your rating system.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="maxStarsCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8 overflow-x-auto">
                                <!-- xs: size sm so 10 stars fit; md+: size md -->
                                <VueStarRate v-model="maxStarsRating" :max-stars="10" size="xs" :show-counter="true" class="sm:hidden" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                                <VueStarRate v-model="maxStarsRating" :max-stars="10" size="sm" :show-counter="true" class="hidden sm:block md:hidden" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                                <VueStarRate v-model="maxStarsRating" :max-stars="10" size="md" :show-counter="true" class="hidden md:block" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Counter & Tooltip -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Counter & Tooltips</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Display rating value and show tooltips on hover.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="counterTooltipCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-5 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-3">With Counter</span>
                                    <VueStarRate v-model="counterRating" size="lg" :show-counter="true" :allow-half="true" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                                </div>
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-3">With Tooltip</span>
                                    <VueStarRate v-model="tooltipRating" size="lg" :show-tooltip="true" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- Read-only -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Read-only Mode</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Display ratings without user interaction.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="readonlyCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate v-model="readonlyRating" size="lg" :readonly="true" :show-counter="true"
                                    :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                    }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Full Example -->
                    <Card class="border-noir-700">
                        <div class="mb-6">
                            <Badge variant="outline" class="mb-4">Complete Example</Badge>
                            <h3 class="mb-2 text-lg md:text-xl font-semibold">Full Configuration</h3>
                            <p class="text-xs md:text-sm text-noir-400">All props combined in a single example.</p>
                        </div>
                        <CodeBlock :code="fullExampleCode" language="vue" />
                    </Card>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- API Reference -->
        <section id="api" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-6xl">
                <div class="mb-12 md:mb-16 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">API</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Props Reference</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">Complete list of available configuration options.</p>
                </div>

                <!-- Props Table -->
                <Card class="overflow-hidden p-0 mb-8 md:mb-12">
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs md:text-sm">
                            <thead class="border-b border-noir-800 bg-noir-900/50">
                                <tr>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Prop</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300 hidden sm:table-cell">Type</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300 hidden md:table-cell">Default</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Description</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-noir-800/50">
                                <tr v-for="prop in propsData" :key="prop.name"
                                    class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white whitespace-nowrap text-xs md:text-sm">{{ prop.name }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-noir-400 whitespace-nowrap text-xs hidden sm:table-cell">{{ prop.type }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-noir-500 text-xs hidden md:table-cell">{{ prop.default }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300 text-xs md:text-sm">{{ prop.desc }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <!-- Events Table -->
                <div class="mb-8 md:mb-12">
                    <h3 class="mb-4 md:mb-6 text-lg md:text-xl font-semibold">Events</h3>
                    <Card class="overflow-hidden p-0">
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs md:text-sm">
                                <thead class="border-b border-noir-800 bg-noir-900/50">
                                    <tr>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Event</th>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300 hidden sm:table-cell">Payload</th>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Description</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-noir-800/50">
                                    <tr v-for="event in eventsData" :key="event.name"
                                        class="transition-colors hover:bg-noir-900/30">
                                        <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white whitespace-nowrap">{{ event.name }}</td>
                                        <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-noir-400 hidden sm:table-cell">{{ event.payload }}</td>
                                        <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">{{ event.desc }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <!-- Keyboard Navigation -->
                <div>
                    <h3 class="mb-4 md:mb-6 text-lg md:text-xl font-semibold">Keyboard Navigation</h3>
                    <div class="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3">
                        <Card class="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">→</kbd>
                            <span class="text-xs md:text-sm text-noir-300">Increase</span>
                        </Card>
                        <Card class="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">←</kbd>
                            <span class="text-xs md:text-sm text-noir-300">Decrease</span>
                        </Card>
                        <Card class="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">Home</kbd>
                            <span class="text-xs md:text-sm text-noir-300">Minimum</span>
                        </Card>
                        <Card class="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">End</kbd>
                            <span class="text-xs md:text-sm text-noir-300">Maximum</span>
                        </Card>
                        <Card class="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">1-9</kbd>
                            <span class="text-xs md:text-sm text-noir-300">Jump to</span>
                        </Card>
                        <Card class="flex items-center gap-2 md:gap-3 p-3 md:p-4">
                            <kbd class="rounded bg-noir-800 px-2 py-1 font-mono text-xs">0</kbd>
                            <span class="text-xs md:text-sm text-noir-300">Reset</span>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-noir-900 py-8 md:py-12 px-4 md:px-6">
            <div class="mx-auto max-w-6xl">
                <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    <div class="flex items-center gap-2 md:gap-3">
                        <span class="text-lg md:text-xl">⭐</span>
                        <span class="text-sm md:text-base font-medium">Vue Star Rate</span>
                    </div>

                    <div class="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-noir-500">
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

                    <p class="text-xs md:text-sm text-noir-600">
                        MIT © 2026 Pooya Golchian
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>
