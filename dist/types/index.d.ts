import { Plugin } from 'vue';
import { VueStarRate } from './components';

export { VueStarRate } from './components';
export { LucideIcon, FontAwesomeIcon, SvgIcon } from './components';
export { useStarRating } from './composables';
export type { UseStarRatingOptions, UseStarRatingReturn } from './composables';
export type { IconProvider, RatingValue, IconSize, StarColors, AnimationConfig, CustomIconRenderer, StarRateProps, StarRateEmits, StarRateExpose, VueStarRateOptions, StarItem, } from './types';
declare const VueStarRatePlugin: Plugin;
export default VueStarRatePlugin;
export { VueStarRatePlugin };
declare module 'vue' {
    interface GlobalComponents {
        VueStarRate: typeof VueStarRate;
    }
}
