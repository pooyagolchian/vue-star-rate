<script setup lang="ts">
import { ref } from 'vue';
import { VueStarRate } from '../src';

const basicRating = ref(3);
const halfRating = ref(2.5);
const readonlyRating = ref(4);
const customRating = ref(2);
const fontAwesomeRating = ref(3);
const lucideRating = ref(4);

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const sizeRating = ref(3);
const selectedSize = ref<typeof sizes[number]>('md');

const handleRatingChange = (value: number, oldValue: number) => {
    console.log(`Rating changed from ${oldValue} to ${value}`);
};
</script>

<template>
    <div class="demo-container">
        <header class="demo-header">
            <h1>🌟 Vue Star Rate</h1>
            <p>A highly customizable star rating component for Vue 3</p>
        </header>

        <main class="demo-content">
            <!-- Basic Usage -->
            <section class="demo-section">
                <h2>Basic Usage</h2>
                <div class="demo-item">
                    <VueStarRate v-model="basicRating" :show-counter="true" @change="handleRatingChange" />
                    <p class="demo-value">Value: {{ basicRating }}</p>
                </div>
            </section>

            <!-- Half Stars -->
            <section class="demo-section">
                <h2>Half Star Support</h2>
                <div class="demo-item">
                    <VueStarRate v-model="halfRating" :allow-half="true" :show-counter="true" />
                    <p class="demo-value">Value: {{ halfRating }}</p>
                </div>
            </section>

            <!-- Read Only -->
            <section class="demo-section">
                <h2>Read Only</h2>
                <div class="demo-item">
                    <VueStarRate v-model="readonlyRating" :readonly="true" :show-counter="true" />
                </div>
            </section>

            <!-- Custom Colors -->
            <section class="demo-section">
                <h2>Custom Colors</h2>
                <div class="demo-item">
                    <VueStarRate v-model="customRating" :colors="{
                        empty: '#e0e0e0',
                        filled: '#ff6b6b',
                        hover: '#ee5253'
                    }" :show-counter="true" />
                </div>
            </section>

            <!-- Size Presets -->
            <section class="demo-section">
                <h2>Size Presets</h2>
                <div class="demo-item">
                    <div class="size-buttons">
                        <button v-for="size in sizes" :key="size" :class="{ active: selectedSize === size }"
                            @click="selectedSize = size">
                            {{ size.toUpperCase() }}
                        </button>
                    </div>
                    <VueStarRate v-model="sizeRating" :size="selectedSize" :show-counter="true" />
                </div>
            </section>

            <!-- FontAwesome Icons -->
            <section class="demo-section">
                <h2>FontAwesome Icons</h2>
                <div class="demo-item">
                    <VueStarRate v-model="fontAwesomeRating" icon-provider="fontawesome" :show-counter="true"
                        :show-tooltip="true" :tooltip-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']" />
                </div>
            </section>

            <!-- Clearable -->
            <section class="demo-section">
                <h2>Clearable & Animated</h2>
                <div class="demo-item">
                    <VueStarRate :model-value="4" :clearable="true"
                        :animation="{ enabled: true, type: 'bounce', duration: 300 }" :show-counter="true" />
                </div>
            </section>

            <!-- Max Stars -->
            <section class="demo-section">
                <h2>Custom Max Stars (10)</h2>
                <div class="demo-item">
                    <VueStarRate :model-value="7" :max-stars="10" :icon-size="20" :show-counter="true" />
                </div>
            </section>

            <!-- RTL Support -->
            <section class="demo-section">
                <h2>RTL Support</h2>
                <div class="demo-item">
                    <VueStarRate :model-value="3" :rtl="true" :show-counter="true" />
                </div>
            </section>
        </main>

        <footer class="demo-footer">
            <p>
                Vue Star Rate v2.0.0 |
                <a href="https://github.com/pooyagolchian/vue-star-rate" target="_blank">GitHub</a>
            </p>
        </footer>
    </div>
</template>

<style>
.demo-container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.demo-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: white;
    padding: 40px;
    text-align: center;
}

.demo-header h1 {
    margin: 0 0 10px 0;
    font-size: 2.5rem;
}

.demo-header p {
    margin: 0;
    opacity: 0.8;
}

.demo-content {
    padding: 20px 40px;
}

.demo-section {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #eee;
}

.demo-section:last-child {
    border-bottom: none;
}

.demo-section h2 {
    color: #333;
    font-size: 1.25rem;
    margin-bottom: 16px;
}

.demo-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.demo-value {
    color: #666;
    font-size: 0.875rem;
    margin: 8px 0 0;
}

.size-buttons {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.size-buttons button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.size-buttons button:hover {
    border-color: #667eea;
}

.size-buttons button.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.demo-footer {
    background: #f8f9fa;
    padding: 20px;
    text-align: center;
    color: #666;
}

.demo-footer a {
    color: #667eea;
    text-decoration: none;
}

.demo-footer a:hover {
    text-decoration: underline;
}
</style>
