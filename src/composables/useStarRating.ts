import { ref, computed, watch, type Ref, type ComputedRef } from "vue";
import type {
	StarItem,
	RatingValue,
	StarColors,
	AnimationConfig,
} from "../types";

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

export function useStarRating(
	options: UseStarRatingOptions,
	emit: (event: string, ...args: any[]) => void,
): UseStarRatingReturn {
	const {
		modelValue = 0,
		maxStars,
		allowHalf,
		readonly,
		disabled,
		allowReset,
		minRating,
		step,
	} = options;

	// Internal state
	const internalRating = ref<RatingValue>(modelValue);
	const hoverRating = ref<RatingValue | null>(null);
	const isHovering = ref(false);
	const isFocused = ref(false);
	const initialRating = ref(modelValue);

	// Computed display rating (hover takes precedence)
	const displayRating = computed<RatingValue>(() => {
		if (isHovering.value && hoverRating.value !== null) {
			return hoverRating.value;
		}
		return internalRating.value;
	});

	// Generate star items
	const stars = computed<StarItem[]>(() => {
		const items: StarItem[] = [];
		const rating = displayRating.value;

		for (let i = 1; i <= maxStars; i++) {
			const filled = i <= Math.floor(rating);
			const half =
				allowHalf && !filled && i === Math.ceil(rating) && rating % 1 !== 0;
			const active = i <= rating || (half && i === Math.ceil(rating));

			items.push({
				index: i - 1,
				value: i,
				filled,
				half,
				active,
			});
		}

		return items;
	});

	// Validate and clamp rating value
	const validateRating = (value: number): RatingValue => {
		// Clamp between minRating and maxStars
		let newValue = Math.max(minRating, Math.min(maxStars, value));

		// Apply step if not allowing half
		if (!allowHalf && step === 1) {
			newValue = Math.round(newValue);
		} else if (allowHalf) {
			// Round to nearest 0.5
			newValue = Math.round(newValue * 2) / 2;
		} else {
			// Round to nearest step
			newValue = Math.round(newValue / step) * step;
		}

		return newValue;
	};

	// Handle star click
	const handleClick = (value: number): void => {
		if (readonly || disabled) return;

		let newValue: RatingValue;

		// Allow reset if clicking same value
		if (allowReset && internalRating.value === value) {
			newValue = minRating;
		} else {
			newValue = validateRating(value);
		}

		const previousValue = internalRating.value;

		if (newValue !== previousValue) {
			internalRating.value = newValue;
			emit("update:modelValue", newValue);
			emit("change", newValue, previousValue);
		}
	};

	// Handle mouse enter on star
	const handleMouseEnter = (value: number): void => {
		if (readonly || disabled) return;

		isHovering.value = true;
		hoverRating.value = validateRating(value);
		emit("hover", hoverRating.value);
	};

	// Handle mouse leave
	const handleMouseLeave = (): void => {
		if (readonly || disabled) return;

		isHovering.value = false;
		hoverRating.value = null;
		emit("hover", null);
	};

	// Calculate the step increment based on allowHalf and step prop
	const getStepIncrement = (): number => {
		if (allowHalf) return 0.5;
		return step;
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent): void => {
		if (readonly || disabled) return;

		const { key } = event;
		const stepIncrement = getStepIncrement();
		let newValue = internalRating.value;

		switch (key) {
			case "ArrowRight":
			case "ArrowUp":
				event.preventDefault();
				newValue = Math.min(
					maxStars,
					internalRating.value + stepIncrement,
				);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				event.preventDefault();
				newValue = Math.max(
					minRating,
					internalRating.value - stepIncrement,
				);
				break;
			case "Home":
				event.preventDefault();
				newValue = minRating;
				break;
			case "End":
				event.preventDefault();
				newValue = maxStars;
				break;
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				const numValue = Number.parseInt(key, 10);
				if (numValue <= maxStars) {
					event.preventDefault();
					newValue = numValue;
				}
				break;
			case "0":
				event.preventDefault();
				newValue = minRating;
				break;
		}

		// Validate the new value before applying
		const validatedValue = validateRating(newValue);
		if (validatedValue !== internalRating.value) {
			const previousValue = internalRating.value;
			internalRating.value = validatedValue;
			emit("update:modelValue", validatedValue);
			emit("change", validatedValue, previousValue);
		}
	};


	// Reset to initial value
	const reset = (): void => {
		const previousValue = internalRating.value;
		internalRating.value = initialRating.value;
		if (previousValue !== initialRating.value) {
			emit("update:modelValue", initialRating.value);
			emit("change", initialRating.value, previousValue);
		}
	};

	// Set rating programmatically
	const setRating = (value: RatingValue): void => {
		const validatedValue = validateRating(value);
		const previousValue = internalRating.value;

		if (validatedValue !== previousValue) {
			internalRating.value = validatedValue;
			emit("update:modelValue", validatedValue);
			emit("change", validatedValue, previousValue);
		}
	};

	// Get current rating
	const getRating = (): RatingValue => {
		return internalRating.value;
	};

	// Set focused state
	const setFocused = (focused: boolean): void => {
		isFocused.value = focused;
		emit(focused ? "focus" : "blur");
	};

	// Watch for external model changes
	watch(
		() => options.modelValue,
		(newValue) => {
			if (newValue !== undefined && newValue !== internalRating.value) {
				internalRating.value = validateRating(newValue);
			}
		},
	);

	return {
		internalRating,
		hoverRating,
		isHovering,
		isFocused,
		stars,
		displayRating,
		handleClick,
		handleMouseEnter,
		handleMouseLeave,
		handleKeyDown,
		reset,
		setRating,
		getRating,
		setFocused,
	};
}

export default useStarRating;
