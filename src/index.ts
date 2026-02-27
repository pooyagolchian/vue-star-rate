/**
 * Vue Star Rate
 * A highly customizable star rating component for Vue 3
 * 
 * @author Pooya Golchian
 * @license MIT
 */

import type { App, Plugin } from 'vue';
import { VueStarRate } from './components';
import type { VueStarRateOptions } from './types';

// Export components
export { VueStarRate } from './components';
export { LucideIcon, FontAwesomeIcon, SvgIcon } from './components';

// Export composables
export { useStarRating } from './composables';
export type { UseStarRatingOptions, UseStarRatingReturn } from './composables';

// Export types
export type {
  IconProvider,
  RatingValue,
  IconSize,
  StarColors,
  AnimationConfig,
  CustomIconRenderer,
  StarRateProps,
  StarRateEmits,
  StarRateExpose,
  VueStarRateOptions,
  StarItem,
} from './types';

// Default export - Vue plugin
const VueStarRatePlugin: Plugin = {
  install(app: App, options: VueStarRateOptions = {}) {
    const componentName = options.componentName || 'VueStarRate';
    
    // Register the component globally
    app.component(componentName, VueStarRate);

    // Provide global options
    if (options.defaultIconProvider || options.defaultColors || options.defaultAnimation) {
      app.provide('vueStarRateOptions', options);
    }
  },
};

export default VueStarRatePlugin;

// Named export for plugin
export { VueStarRatePlugin };

// For direct script tag usage
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueStarRatePlugin);
}

// Type augmentation for Vue
declare module 'vue' {
  export interface GlobalComponents {
    VueStarRate: typeof VueStarRate;
  }
}
