import { Ref, ComputedRef } from 'vue';
import { StarItem, RatingValue, UseStarRatingOptions } from '../types';
export type { UseStarRatingOptions } from '../types';
/** Narrow emit type — no more `event: string` + `any[]` */
type EmitFn = (event: "update:modelValue" | "change" | "hover" | "focus" | "blur", ...args: unknown[]) => void;
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
export declare function useStarRating(options: UseStarRatingOptions, emit: EmitFn): UseStarRatingReturn;
export default useStarRating;
