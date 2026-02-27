import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.css';

// Import the star rating component from parent source
import VueStarRate from '../../src/components/VueStarRate.vue';

const app = createApp(App);

// Register globally
app.component('VueStarRate', VueStarRate);

app.mount('#app');
