<script setup lang="ts">
import {
    Accessibility,
    ArrowRight,
    Check,
    Clipboard,
    Code2,
    Github,
    Globe,
    Heart,
    Keyboard,
    Menu,
    Package,
    Palette,
    Smartphone,
    Sparkles,
    Star,
    X,
    Zap
} from 'lucide-vue-next';
import { computed, ref } from 'vue';

interface StarRateApi {
    reset: () => void;
    setRating: (value: number) => void;
    getRating: () => number;
    focus: () => void;
    blur: () => void;
}

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
const tooltipRating = ref(2);
const readonlyRating = ref(4);
const maxStarsRating = ref(7);
const counterRating = ref(3.5);

// v3.1 demos
const lucideRating = ref(3);
const faRating = ref(3);
const customSlotRating = ref(4);
const customSlotHeartRating = ref(2);
const disabledRating = ref(2);
const clearableRating = ref(4);
const allowResetRating = ref(3);
const rtlRating = ref(3);
const inlineRating = ref(3);
const stepRating = ref(2);
const minRatingDemo = ref(2);
const customTemplateRating = ref(3);
const customTooltipRating = ref(0);
const animationScaleRating = ref(3);
const animationBounceRating = ref(3);
const animationPulseRating = ref(3);
const eventLogRating = ref(3);
const methodsRating = ref(2);

// Live event log for the Events demo
type EventLogEntry = { id: number; name: string; payload: string; ts: string };
const eventLog = ref<EventLogEntry[]>([]);
let eventLogId = 0;
const logEvent = (name: string, payload: string) => {
    eventLog.value.unshift({
        id: ++eventLogId,
        name,
        payload,
        ts: new Date().toLocaleTimeString([], { hour12: false }),
    });
    if (eventLog.value.length > 6) eventLog.value.length = 6;
};
const clearEventLog = () => {
    eventLog.value = [];
};

// Imperative API demo
const methodsRef = ref<StarRateApi | null>(null);
const callReset = () => methodsRef.value?.reset();
const callSet = (v: number) => methodsRef.value?.setRating(v);
const callGet = () => alert(`Current rating: ${methodsRef.value?.getRating()}`);
const callFocus = () => methodsRef.value?.focus();
const currentMethodsValue = computed(() => methodsRating.value);

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

const animationCode = `<!-- type can be 'scale' | 'bounce' | 'pulse' | 'none' -->
<VueStarRate
  v-model="rating"
  :animation="{ enabled: true, duration: 200, type: 'scale' }"
/>
<VueStarRate
  v-model="rating"
  :animation="{ enabled: true, duration: 200, type: 'bounce' }"
/>
<VueStarRate
  v-model="rating"
  :animation="{ enabled: true, duration: 700, type: 'pulse' }"
/>

<!-- Animations automatically respect prefers-reduced-motion since v3.1 -->`;

const iconProvidersCode = `<!-- 1. Default SVG — bundled, zero deps -->
<VueStarRate v-model="rating" />

<!-- 2. Lucide — Lucide's star drawn inline, nothing to install -->
<VueStarRate v-model="rating" icon-provider="lucide" />

<!-- 3. FontAwesome — renders <i> elements, so your app must load Font Awesome's CSS,
        e.g. import '@fortawesome/fontawesome-free/css/all.min.css' -->
<VueStarRate v-model="rating" icon-provider="fontawesome" />

<!-- 4. Custom via scoped slot -->
<VueStarRate v-model="rating" icon-provider="custom">
  <template #icon="{ filled, size, color, half }">
    <svg :width="size.width" :height="size.height" viewBox="0 0 24 24">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
        :fill="filled ? color : 'none'" :stroke="color" stroke-width="2" />
    </svg>
  </template>
</VueStarRate>`;

const disabledCode = `<VueStarRate v-model="rating" :disabled="true" />`;

const clearableCode = `<!-- Built-in clear button when rating > minRating -->
<VueStarRate v-model="rating" :clearable="true" />

<!-- allowReset = click the active star again to clear (default true) -->
<VueStarRate v-model="rating" :allow-reset="true" />`;

const rtlCode = `<VueStarRate v-model="rating" :rtl="true" :allow-half="true" />`;

const inlineCode = `<p>Inline rating: <VueStarRate v-model="rating" size="sm" /> within text.</p>`;

const stepMinCode = `<!-- Increment by 1, but never go below 2 -->
<VueStarRate v-model="rating" :min-rating="2" :step="1" />`;

const customTemplateCode = `<VueStarRate
  v-model="rating"
  :show-counter="true"
  counter-template="{value} of {max} stars"
/>`;

const customTooltipsCode = `<VueStarRate
  v-model="rating"
  :show-tooltip="true"
  :tooltip-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']"
/>`;

const customSlotCode = `<!-- Heart is an icon from your own icon library (here lucide-vue-next), not from this package -->
<VueStarRate v-model="rating" icon-provider="custom">
  <template #icon="{ filled, size, color }">
    <Heart :size="size.width" :fill="filled ? color : 'none'" :color="color" />
  </template>
</VueStarRate>`;

const eventsCode = `<VueStarRate
  v-model="rating"
  @change="(v, old) => console.log('change', v, 'was', old)"
  @hover="(v) => console.log('hover', v)"
  @focus="() => console.log('focused')"
  @blur="() => console.log('blurred')"
/>`;

const methodsCode = `<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from 'vue-js-star-rating';

const star = ref<InstanceType<typeof VueStarRate>>();

star.value?.reset();         // restore to initial value
star.value?.setRating(3.5);  // set programmatically
star.value?.getRating();     // read current value
star.value?.focus();         // focus the component
star.value?.blur();          // remove focus
<\/script>`;

const composableCode = `<script setup lang="ts">
import { ref } from 'vue';
import { useStarRating } from 'vue-js-star-rating';

const modelValue = ref(0);
const emit = (event: string, ...args: unknown[]) => console.log(event, args);

const { stars, displayRating, handleClick, handleKeyDown } = useStarRating(
  {
    modelValue,
    maxStars: 5,
    allowHalf: true,
    readonly: false,
    disabled: false,
    allowReset: true,
    minRating: 0,
    step: 1,
  },
  emit,
);
// Render \`stars\` however you like — fully headless.
<\/script>`;

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
    { icon: Accessibility, title: 'Keyboard & ARIA', desc: 'ARIA group, aria-pressed + prefers-reduced-motion' },
    { icon: Smartphone, title: 'Responsive', desc: 'Mobile-first design' },
    { icon: Code2, title: 'Tree-shakeable', desc: 'Zero runtime deps · ~4.6 KB gz JS + 0.75 KB gz CSS' },
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
    { name: 'clearable', type: 'boolean', default: 'false', desc: 'Show clear button when rating > minRating' },
    { name: 'allowReset', type: 'boolean', default: 'true', desc: 'Click active star again to reset' },
    { name: 'showCounter', type: 'boolean', default: 'false', desc: 'Show rating counter' },
    { name: 'counterTemplate', type: 'string', default: "'{value} / {max}'", desc: 'Counter format template' },
    { name: 'showTooltip', type: 'boolean', default: 'false', desc: 'Show tooltips on star hover' },
    { name: 'tooltipLabels', type: 'string[]', default: '—', desc: 'Custom tooltip labels per star' },
    { name: 'minRating', type: 'number', default: '0', desc: 'Minimum selectable value' },
    { name: 'step', type: 'number', default: '1', desc: 'Increment step (overridden by allowHalf)' },
    { name: 'rtl', type: 'boolean', default: 'false', desc: 'Right-to-left layout. Known gap: the half-star fill is still painted on the left and the arrow keys are not mirrored' },
    { name: 'gap', type: 'number', default: '4', desc: 'Gap between stars in pixels' },
    { name: 'ariaLabel', type: 'string', default: "'Star rating'", desc: 'Accessible group label' },
    { name: 'className', type: 'string', default: '—', desc: 'Extra CSS class on the root element' },
    { name: 'faIcons', type: 'object', default: '{...}', desc: "Font Awesome class names per state: { empty, filled, half } (iconProvider 'fontawesome' only)" },
    { name: 'inline', type: 'boolean', default: 'false', desc: 'Accepted but not implemented: no visual effect' },
    { name: 'customIcon', type: 'function', default: '—', desc: 'Not implemented: accepted but ignored. Use the #icon slot instead' },
];

// Events table
const eventsData = [
    { name: 'update:modelValue', payload: 'number', desc: 'Emitted by v-model (handled automatically)' },
    { name: 'change', payload: '(value, oldValue)', desc: 'Right after update:modelValue, when the rating changes via click, keyboard, setRating() or reset() — not when the parent changes v-model' },
    { name: 'hover', payload: 'number | null', desc: 'Previewed value while the pointer is over the stars; null when it leaves them' },
    { name: 'focus', payload: '—', desc: 'Root element received focus (not emitted when focus lands directly on a star button)' },
    { name: 'blur', payload: '—', desc: 'Root element lost focus (also emitted when focus moves onto a star button inside it)' },
];

// Slots
const slotsData = [
    { name: 'icon', props: '{ filled, half, size, color, index }', desc: 'Custom icon markup per star — used when iconProvider="custom"' },
    { name: 'counter', props: '{ value, max }', desc: 'Custom counter rendering (replaces the default template)' },
    { name: 'clear', props: '—', desc: 'Custom content for the built-in clear button' },
];

// Exposed methods
const methodsData = [
    { name: 'reset()', returns: 'void', desc: 'Restore the rating to its initial v-model value' },
    { name: 'setRating(value)', returns: 'void', desc: 'Set the rating programmatically (validated against minRating, maxStars, allowHalf, step)' },
    { name: 'getRating()', returns: 'number', desc: 'Read the current rating' },
    { name: 'focus()', returns: 'void', desc: 'Focus the root component' },
    { name: 'blur()', returns: 'void', desc: 'Remove focus from the root component' },
];

// FAQ
const faqData = [
    {
        q: 'Do I need lucide-vue-next if I use FontAwesome or a custom icon?',
        a: 'No. This package has no optional peer dependencies: the only peer dependency is vue (^3.5.0), and the entry files import nothing else. iconProvider="lucide" draws Lucide\'s own star inline as an SVG, so it needs nothing installed. The Font Awesome provider only needs Font Awesome\'s stylesheet to be loaded by your app. Releases 2.0.0 to 3.1.0 imported lucide-vue-next at build time, and 3.1.0 also documented it as optional with lazy-loaded icon providers; that was wrong, because bundlers resolve import("lucide-vue-next") while building, so Vite, webpack, esbuild, Nuxt and Storybook builds failed unless the package was installed (issue #13). This is fixed in 3.1.1.',
    },
    {
        q: 'Is it SSR-safe? Does it work with Nuxt 3?',
        a: 'Yes. The component renders deterministically on the server. All three icon providers are part of the single entry file and render synchronously, so the stars are in the server-rendered HTML and no <ClientOnly> wrapper is needed. With iconProvider="fontawesome" the stars appear once Font Awesome\'s CSS is loaded.',
    },
    {
        q: 'What is the bundle size?',
        a: 'Importing VueStarRate costs about 4.6 KB gzipped JavaScript (12.4 KB raw) plus about 0.75 KB gzipped CSS (2.9 KB raw), measured with Vite 6 and esbuild minification, vue external, gzip -9. All three icon providers are inside that one entry file; nothing is split into lazy chunks. Export-level tree-shaking works: useStarRating alone is about 1 KB gzipped.',
    },
    {
        q: 'Is it accessible?',
        a: 'The root carries role="group" + aria-label. Each star button exposes aria-pressed. The counter uses aria-live="polite". Full keyboard navigation (arrows, Home, End, 0–9). The star hover animations are gated on prefers-reduced-motion since v3.1.0. The package has not been audited against WCAG, so it makes no conformance claim. Known gaps: the default star colors have low contrast on white (pass your own colors); size="xs" targets are 16 px, below the 24 px WCAG 2.2 target-size minimum; a half value such as 2.5 is announced like the next whole number; the numeric value is only available as text when showCounter is on.',
    },
    {
        q: 'Can I use it without v-model?',
        a: 'Yes — pass :model-value and listen to @change (or @update:modelValue). The useStarRating composable is also exported for fully headless control.',
    },
    {
        q: 'Which Vue versions are supported?',
        a: 'Vue 3.5+ is required. The component uses defineModel, useTemplateRef, and MaybeRefOrGetter — all stable in Vue 3.5. Vue 2 is not supported.',
    },
];

// Comparison
const comparisonRows: { feature: string; us: string | true | false; a: string | true | false; b: string | true | false }[] = [
    { feature: 'Runtime dependencies', us: '0', a: '1', b: '1' },
    { feature: 'Keyboard navigation', us: true, a: false, b: false },
    { feature: 'aria-pressed + aria-live', us: true, a: false, b: false },
];
const cellLabel = (v: string | true | false) =>
    v === true ? '✓' : v === false ? '—' : v;

// Navigation
const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#installation', label: 'Installation' },
    { href: '#examples', label: 'Examples' },
    { href: '#api', label: 'API' },
    { href: '#faq', label: 'FAQ' },
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
                    Vue 3.5+ · Icon providers · Reduced-motion
                    </Badge>
                </div>

                <!-- Title -->
                <h1 class="mb-4 md:mb-6 text-[clamp(2.25rem,8vw,4.5rem)] font-bold tracking-tight leading-none">
                    <span class="gradient-text">Vue Star Rate</span>
                </h1>

                <p class="mx-auto mb-8 md:mb-10 max-w-2xl text-sm md:text-lg lg:text-xl text-noir-400 leading-relaxed px-2">
                    A highly customizable, keyboard-accessible star rating component
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
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Display ratings without user interaction. The component remains focusable for keyboard exploration.</p>
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

                    <!-- Disabled -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Disabled State</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Greyed out and unfocusable. Use for unauthenticated or pending UI.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="disabledCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate v-model="disabledRating" size="lg" :disabled="true" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Clearable & allowReset -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Clearable &amp; allowReset</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Show an explicit clear button or let users click the active star again to reset.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="clearableCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-5 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-3">Clearable button</span>
                                    <VueStarRate v-model="clearableRating" size="lg" :clearable="true" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                                </div>
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-3">Click active star to reset</span>
                                    <VueStarRate v-model="allowResetRating" size="lg" :allow-reset="true" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- RTL -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Right-to-Left Layout</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Mirror the stars for RTL languages (Arabic, Hebrew, Persian). A pointer click on the half of a star respects direction. Known gap: the half-star fill is still painted on the left side of the star, and the arrow keys are not mirrored.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="rtlCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8" dir="rtl">
                                <VueStarRate v-model="rtlRating" size="lg" :rtl="true" :allow-half="true" :show-counter="true" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Inline mode -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Inline usage</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">The component is already inline-flex, so it sits inside flowing text or table cells as it is. The inline prop is accepted but has no effect.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="inlineCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8 text-center">
                                <p class="text-sm md:text-base text-noir-200 leading-relaxed">
                                    The reviewer scored this
                                    <VueStarRate v-model="inlineRating" size="sm" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                                    across all categories.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <!-- Step + minRating -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Step &amp; minRating</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Floor the rating at a minimum value — useful for required fields.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="stepMinCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-3 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <span class="text-xs text-noir-500 uppercase tracking-wider">Cannot go below 2</span>
                                <VueStarRate v-model="minRatingDemo" size="lg" :min-rating="2" :step="1" :show-counter="true" :colors="{
                                    empty: '#3f3f46',
                                    filled: '#ffffff',
                                    hover: '#a1a1aa',
                                }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Custom Counter Template -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Custom Counter Template</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Use <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">{value}</code> and <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">{max}</code> placeholders.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="customTemplateCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate v-model="customTemplateRating" size="lg" :show-counter="true"
                                    counter-template="{value} of {max} stars" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Custom Tooltip Labels -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Custom Tooltip Labels</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Provide per-star labels via <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">tooltipLabels</code>. Hover any star to preview.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="customTooltipsCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate v-model="customTooltipRating" size="lg" :show-tooltip="true"
                                    :tooltip-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']" :colors="{
                                        empty: '#3f3f46',
                                        filled: '#ffffff',
                                        hover: '#a1a1aa',
                                    }" />
                            </div>
                        </div>
                    </Card>

                    <!-- Animation Types -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Animation Types</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Choose <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">scale</code>, <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">bounce</code>, or <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">pulse</code>. Automatically disabled when <em>prefers-reduced-motion</em> is set. <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">enabled: false</code> and <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">none</code> are not a full off-switch: interactive stars still scale to 1.1 on hover.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="animationCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-2">scale</span>
                                    <VueStarRate v-model="animationScaleRating" size="lg"
                                        :animation="{ enabled: true, duration: 200, type: 'scale' }"
                                        :colors="{ empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa' }" />
                                </div>
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-2">bounce</span>
                                    <VueStarRate v-model="animationBounceRating" size="lg"
                                        :animation="{ enabled: true, duration: 400, type: 'bounce' }"
                                        :colors="{ empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa' }" />
                                </div>
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-2">pulse</span>
                                    <VueStarRate v-model="animationPulseRating" size="lg"
                                        :animation="{ enabled: true, duration: 700, type: 'pulse' }"
                                        :colors="{ empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa' }" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- Icon Providers -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Icon Providers</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">
                                    The default is a built-in SVG star (zero deps). <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">lucide</code>
                                    draws Lucide's own star inline as an SVG, so nothing needs installing.
                                    <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">fontawesome</code> renders
                                    <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">&lt;i&gt;</code> elements with Font Awesome class names,
                                    so your app must load Font Awesome's stylesheet; without it the stars are invisible.
                                    All three providers are in the one entry file.
                                </p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="iconProvidersCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-5 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-2">default SVG</span>
                                    <VueStarRate v-model="customSlotRating" size="lg" :colors="{
                                        empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa',
                                    }" />
                                </div>
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-2">Lucide</span>
                                    <VueStarRate v-model="lucideRating" size="lg" icon-provider="lucide" :colors="{
                                        empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa',
                                    }" />
                                </div>
                                <div class="text-center">
                                    <span class="text-xs text-noir-500 uppercase tracking-wider block mb-2">FontAwesome</span>
                                    <VueStarRate v-model="faRating" size="lg" icon-provider="fontawesome" :colors="{
                                        empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa',
                                    }" />
                                    <p class="mt-2 text-xs text-noir-500">Requires Font Awesome's CSS: the stars stay invisible until the stylesheet is loaded.</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- Custom slot icon -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Custom Icon via Slot</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Replace the star entirely. Hearts, thumbs, flags — whatever you ship.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="customSlotCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate v-model="customSlotHeartRating" size="lg" icon-provider="custom" :colors="{
                                    empty: '#3f3f46', filled: '#ef4444', hover: '#f87171',
                                }">
                                    <template #icon="{ filled, size, color }">
                                        <Heart :size="size.width"
                                               :fill="filled ? color : 'none'"
                                               :color="color"
                                               :stroke-width="2" />
                                    </template>
                                </VueStarRate>
                            </div>
                        </div>
                    </Card>

                    <!-- Events live log -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Live Event Log</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Interact with the rating to see every event the component emits.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="eventsCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[180px] flex-col items-center justify-start gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-6">
                                <VueStarRate v-model="eventLogRating" size="lg" :allow-half="true"
                                    @change="(v, old) => logEvent('change', `value=${v}, old=${old}`)"
                                    @hover="(v) => logEvent('hover', v === null ? 'null' : String(v))"
                                    @focus="() => logEvent('focus', '')"
                                    @blur="() => logEvent('blur', '')"
                                    :colors="{ empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa' }" />
                                <div class="w-full max-w-md">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-xs uppercase tracking-wider text-noir-500">Recent events</span>
                                        <button @click="clearEventLog"
                                                class="text-xs text-noir-500 hover:text-white">Clear</button>
                                    </div>
                                    <ul class="text-xs font-mono space-y-1 min-h-[5rem] bg-black/40 rounded-lg p-3 border border-noir-800">
                                        <li v-if="eventLog.length === 0" class="text-noir-600">No events yet — try clicking, hovering, or pressing Tab + arrow keys.</li>
                                        <li v-for="entry in eventLog" :key="entry.id" class="text-noir-300">
                                            <span class="text-noir-500">{{ entry.ts }}</span>
                                            <span class="text-white ml-2">{{ entry.name }}</span>
                                            <span v-if="entry.payload" class="text-noir-400 ml-2">{{ entry.payload }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- Exposed methods demo -->
                    <Card>
                        <div class="grid gap-4 md:gap-8 lg:grid-cols-2">
                            <div class="min-w-0">
                                <h3 class="mb-2 text-base md:text-xl font-semibold">Imperative API</h3>
                                <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Drive the rating from outside via the exposed methods on the component ref.</p>
                                <div class="overflow-x-auto">
                                    <CodeBlock :code="methodsCode" language="vue" />
                                </div>
                            </div>
                            <div class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-8">
                                <VueStarRate ref="methodsRef" v-model="methodsRating" size="lg" :allow-half="true"
                                    :colors="{ empty: '#3f3f46', filled: '#ffffff', hover: '#a1a1aa' }" />
                                <span class="text-xs text-noir-500">Current value: <span class="text-white font-mono">{{ currentMethodsValue }}</span></span>
                                <div class="flex flex-wrap items-center justify-center gap-2">
                                    <Button size="sm" variant="outline" @click="callReset">reset()</Button>
                                    <Button size="sm" variant="outline" @click="callSet(2.5)">setRating(2.5)</Button>
                                    <Button size="sm" variant="outline" @click="callSet(5)">setRating(5)</Button>
                                    <Button size="sm" variant="outline" @click="callGet">getRating()</Button>
                                    <Button size="sm" variant="outline" @click="callFocus">focus()</Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <!-- Headless composable -->
                    <Card>
                        <div>
                            <h3 class="mb-2 text-base md:text-xl font-semibold">Headless via <code class="text-noir-200">useStarRating</code></h3>
                            <p class="mb-3 md:mb-6 text-xs md:text-sm text-noir-400">Prefer to render your own markup? Skip the component and use the exported composable for full control over the DOM.</p>
                            <CodeBlock :code="composableCode" language="vue" />
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

                <!-- Slots Table -->
                <div class="mb-8 md:mb-12">
                    <h3 class="mb-4 md:mb-6 text-lg md:text-xl font-semibold">Slots</h3>
                    <Card class="overflow-hidden p-0">
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs md:text-sm">
                                <thead class="border-b border-noir-800 bg-noir-900/50">
                                    <tr>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Slot</th>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300 hidden sm:table-cell">Scoped props</th>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Description</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-noir-800/50">
                                    <tr v-for="slot in slotsData" :key="slot.name"
                                        class="transition-colors hover:bg-noir-900/30">
                                        <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white whitespace-nowrap">{{ slot.name }}</td>
                                        <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-noir-400 text-xs hidden sm:table-cell">{{ slot.props }}</td>
                                        <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">{{ slot.desc }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <!-- Methods Table -->
                <div class="mb-8 md:mb-12">
                    <h3 class="mb-4 md:mb-6 text-lg md:text-xl font-semibold">Exposed Methods</h3>
                    <Card class="overflow-hidden p-0">
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs md:text-sm">
                                <thead class="border-b border-noir-800 bg-noir-900/50">
                                    <tr>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Method</th>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300 hidden sm:table-cell">Returns</th>
                                        <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Description</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-noir-800/50">
                                    <tr v-for="m in methodsData" :key="m.name"
                                        class="transition-colors hover:bg-noir-900/30">
                                        <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white whitespace-nowrap">{{ m.name }}</td>
                                        <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-noir-400 hidden sm:table-cell">{{ m.returns }}</td>
                                        <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">{{ m.desc }}</td>
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

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- Bundle Size & Icon Providers -->
        <section id="bundle" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-5xl">
                <div class="mb-10 md:mb-14 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">Bundle</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Pay only for what you import</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">
                        All three icon providers are inside the one entry file: nothing is lazy-loaded, and the only peer dependency is
                        <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">vue</code>. Sizes are minified and gzipped, measured with Vite 6 and esbuild, vue external.
                        <strong class="text-white">Version 3.1.0</strong> claimed lazy icon chunks and an optional
                        <code class="px-1 py-0.5 bg-noir-800 rounded text-xs">lucide-vue-next</code>; that was wrong
                        (<a href="https://github.com/pooyagolchian/vue-star-rate/issues/13" target="_blank" class="text-white underline">issue #13</a>)
                        and is fixed in 3.1.1.
                    </p>
                </div>

                <Card class="overflow-hidden p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs md:text-sm">
                            <thead class="border-b border-noir-800 bg-noir-900/50">
                                <tr>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">What you import</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Bundle impact</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-noir-800/50">
                                <tr class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white text-xs">{{ '{ VueStarRate }' }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">About 4.6 KB gz JS (12.4 KB raw) + 0.75 KB gz CSS (2.9 KB raw), all three icon providers included</td>
                                </tr>
                                <tr class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white text-xs">icon-provider=&quot;lucide&quot;</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">Nothing extra: Lucide's star is drawn inline, nothing to install</td>
                                </tr>
                                <tr class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white text-xs">icon-provider=&quot;fontawesome&quot;</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">Nothing extra in JS; you load Font Awesome's CSS (the stars are invisible without it)</td>
                                </tr>
                                <tr class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white text-xs">icon-provider=&quot;custom&quot;</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">Nothing extra: the built-in SVG star, or your <code class="text-noir-200">#icon</code> slot markup</td>
                                </tr>
                                <tr class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 font-mono text-white text-xs">{{ '{ useStarRating }' }} only</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">About 1 KB gz JS: export-level tree-shaking works, but there is no component-level code splitting</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                    <Card class="flex items-start gap-3">
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-noir-800 text-white"><Sparkles class="h-4 w-4" /></div>
                        <div>
                            <h4 class="text-sm font-semibold mb-1">Lucide</h4>
                            <code class="block bg-black/40 rounded p-2 text-xs text-noir-200">icon-provider=&quot;lucide&quot;</code>
                            <p class="mt-2 text-xs text-noir-400">Nothing to install: Lucide's star is drawn inline, so <code>lucide-vue-next</code> is not needed.</p>
                        </div>
                    </Card>
                    <Card class="flex items-start gap-3">
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-noir-800 text-white"><Sparkles class="h-4 w-4" /></div>
                        <div>
                            <h4 class="text-sm font-semibold mb-1">FontAwesome: load its CSS</h4>
                            <code class="block bg-black/40 rounded p-2 text-xs text-noir-200">pnpm add @fortawesome/fontawesome-free</code>
                            <code class="mt-1 block bg-black/40 rounded p-2 text-xs text-noir-200 break-all">import '@fortawesome/fontawesome-free/css/all.min.css'</code>
                            <p class="mt-2 text-xs text-noir-400">Only for <code>icon-provider=&quot;fontawesome&quot;</code>, and you must load the stylesheet yourself: the stars are <code>&lt;i&gt;</code> elements and are invisible without it.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- FAQ -->
        <section id="faq" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-3xl">
                <div class="mb-10 md:mb-14 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">FAQ</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Frequently asked</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">Short answers to the questions we hear most.</p>
                </div>

                <div class="space-y-3 md:space-y-4">
                    <details v-for="(item, i) in faqData" :key="i"
                             class="group rounded-xl border border-noir-800 bg-noir-900/30 p-4 md:p-5 open:bg-noir-900/50 transition-colors">
                        <summary class="cursor-pointer list-none flex items-center justify-between gap-4 text-sm md:text-base font-semibold text-white">
                            <span>{{ item.q }}</span>
                            <span class="text-noir-500 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p class="mt-3 text-xs md:text-sm text-noir-300 leading-relaxed">{{ item.a }}</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- Divider -->
        <div class="divider mx-4 md:mx-6"></div>

        <!-- Comparison -->
        <section id="comparison" class="py-16 md:py-24 px-4 md:px-6">
            <div class="mx-auto max-w-5xl">
                <div class="mb-10 md:mb-14 text-center">
                    <Badge variant="secondary" class="mb-3 md:mb-4">Comparison</Badge>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">How it compares</h2>
                    <p class="mt-3 md:mt-4 text-sm md:text-base text-noir-400">vue-js-star-rating vs other popular Vue star-rating libraries.</p>
                </div>

                <Card class="overflow-hidden p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs md:text-sm">
                            <thead class="border-b border-noir-800 bg-noir-900/50">
                                <tr>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-left font-medium text-noir-300">Feature</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-center font-medium text-white">vue-js-star-rating</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-center font-medium text-noir-300 hidden sm:table-cell">vue-star-rating</th>
                                    <th class="px-3 md:px-6 py-3 md:py-4 text-center font-medium text-noir-300 hidden md:table-cell">vue3-star-ratings</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-noir-800/50">
                                <tr v-for="row in comparisonRows" :key="row.feature"
                                    class="transition-colors hover:bg-noir-900/30">
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-noir-300">{{ row.feature }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-center text-white font-mono">{{ cellLabel(row.us) }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-center text-noir-400 font-mono hidden sm:table-cell">{{ cellLabel(row.a) }}</td>
                                    <td class="px-3 md:px-6 py-3 md:py-4 text-center text-noir-400 font-mono hidden md:table-cell">{{ cellLabel(row.b) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
                <p class="mt-4 text-center text-xs md:text-sm text-noir-500">As of October 2026, checked against vue-star-rating 1.7.0 and 2.1.0 (the next tag, built for Vue 3) and vue3-star-ratings 3.0.5 by reading their published files; a dash means the feature was not found there. Only features checked this way are listed, so this is not a full comparison.</p>
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
                        <a href="https://pooyagolchian.github.io/vue-star-rate/llms.txt" target="_blank"
                            class="transition-colors hover:text-white">
                            llms.txt
                        </a>
                        <a href="https://pooyagolchian.github.io/vue-star-rate/llms-full.txt" target="_blank"
                            class="transition-colors hover:text-white">
                            llms-full.txt
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
