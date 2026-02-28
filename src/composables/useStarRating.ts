import { ref, computed, watch, toValue, type Ref, type ComputedRef } from "vue";
import type { StarItem, RatingValue, UseStarRatingOptions } from "../types";

export type { UseStarRatingOptions } from "../types";

/** Narrow emit type — no more `event: string` + `any[]` */
type EmitFn = (
	event: "update:modelValue" | "change" | "hover" | "focus" | "blur",
	...args: unknown[]
) => void;

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
	emit: EmitFn,
): UseStarRatingReturn {
	const initialValue = toValue(options.modelValue) ?? 0;

	// Internal state
	const internalRating = ref<RatingValue>(initialValue);
	const hoverRating = ref<RatingValue | null>(null);
	const isHovering = ref(false);
	const isFocused = ref(false);
	const initialRating = ref(initialValue);

	// Computed display rating (hover takes precedence)
	const displayRating = computed<RatingValue>(() => {
		if (isHovering.value && hoverRating.value !== null) {
			return hoverRating.value;
		}
		return internalRating.value;
	});

	// Generate star items — all option reads go through toValue() so they're reactive
	const stars = computed<StarItem[]>(() => {
		const items: StarItem[] = [];
		const rating = displayRating.value;
		const maxStars = toValue(options.maxStars);
		const allowHalf = toValue(options.allowHalf);

		for (let i = 1; i <= maxStars; i++) {
			const filled = i <= Math.floor(rating);
			const half =
				allowHalf && !filled && i === Math.ceil(rating) && rating % 1 !== 0;
			const active = i <= rating || (half && i === Math.ceil(rating));

			items.push({ index: i - 1, value: i, filled, half, active });
		}

		return items;
	});

	// Validate and clamp rating value — reads options reactively via toValue()
	const validateRating = (value: number): RatingValue => {
		const minRating = toValue(options.minRating);
		const maxStars = toValue(options.maxStars);
		const allowHalf = toValue(options.allowHalf);
		const step = toValue(options.step);

		let newValue = Math.max(minRating, Math.min(maxStars, value));

		if (!allowHalf && step === 1) {
			newValue = Math.round(newValue);
		} else if (allowHalf) {
			newValue = Math.round(newValue * 2) / 2;
		} else {
			newValue = Math.round(newValue / step) * step;
		}

		return newValue;
	};

	// Handle star click — guards are now reactive via toValue()
	const handleClick = (value: number): void => {
		if (toValue(options.readonly) || toValue(options.disabled)) return;

		const minRating = toValue(options.minRating);
		const allowReset = toValue(options.allowReset);
		let newValue: RatingValue;

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
		if (toValue(options.readonly) || toValue(options.disabled)) return;

		isHovering.value = true;
		hoverRating.value = validateRating(value);
		emit("hover", hoverRating.value);
	};

	// Handle mouse leave
	const handleMouseLeave = (): void => {
		if (toValue(options.readonly) || toValue(options.disabled)) return;

		isHovering.value = false;
		hoverRating.value = null;
		emit("hover", null);
	};

	const getStepIncrement = (): number => {
		if (toValue(options.allowHalf)) return 0.5;
		return toValue(options.step);
	};

	// Handle keyboard navigation
	const handleKeyDown = (event: KeyboardEvent): void => {
		if (toValue(options.readonly) || toValue(options.disabled)) return;

		const { key } = event;
		const stepIncrement = getStepIncrement();
		const maxStars = toValue(options.maxStars);
		const minRating = toValue(options.minRating);
		let newValue = internalRating.value;

		switch (key) {
			case "ArrowRight":
			case "ArrowUp":
				event.preventDefault();
				newValue = Math.min(maxStars, internalRating.value + stepIncrement);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				event.preventDefault();
				newValue = Math.max(minRating, internalRating.value - stepIncrement);
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
			case "9": {
				const numValue = Number.parseInt(key, 10);
				if (numValue <= maxStars) {
					event.preventDefault();
					newValue = numValue;
				}
				break;
			}
			case "0":
				event.preventDefault();
				newValue = minRating;
				break;
		}

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

	// Set rating programmatically (also emits change — intentional user-driven API)
	const setRating = (value: RatingValue): void => {
		const validatedValue = validateRating(value);
		const previousValue = internalRating.value;

		if (validatedValue !== previousValue) {
			internalRating.value = validatedValue;
			emit("update:modelValue", validatedValue);
			emit("change", validatedValue, previousValue);
		}
	};

	const getRating = (): RatingValue => internalRating.value;

	const setFocused = (focused: boolean): void => {
		isFocused.value = focused;
		emit(focused ? "focus" : "blur");
	};

	/**
	 * Watch for external model changes and sync internal state.
	 * Crucially, we do NOT emit `change` here — this is a parent-driven
	 * sync, not a user interaction, so only the internal ref is updated.
	 */
	watch(
		() => toValue(options.modelValue),
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
