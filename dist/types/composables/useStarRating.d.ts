import { Ref, ComputedRef } from 'vue';
import { StarItem, RatingValue, StarColors, AnimationConfig } from '../types';

export interface UseStarRatingOptions {
    modelValue?: RatingValue;
    maxStars: number;
    allowHalf: boolean;
    readonly: boolean;
    disabled: boolean;
    allowReset: boolean;
    minRating: number;
    step: number;
    colors: StarColors;
    animation: AnimationConfig;
}
export interface UseStarRatingReturn {
    internalRating: Ref<RatingValue>;
    hoverRating: Ref<RatingValue | null>;
    isHovering: Ref<boolean>;
    isFocused: Ref<boolean>;
    stars: ComputedRef<StarItem[]>;
    displayRating: ComputedRef<RatingValue>;
    handleClick: (value: number) => void;
    handleMouseEnter: (value: number) => void;
    handleMouseLeave: () => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    reset: () => void;
    setRating: (value: RatingValue) => void;
    getRating: () => RatingValue;
    setFocused: (focused: boolean) => void;
}
export declare function useStarRating(options: UseStarRatingOptions, emit: (event: string, ...args: any[]) => void): UseStarRatingReturn;
export default useStarRating;
