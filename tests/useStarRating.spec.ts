import { useStarRating } from '@/composables/useStarRating';
import type { AnimationConfig, StarColors } from '@/types';
import { describe, expect, it, vi } from 'vitest';

describe('useStarRating', () => {
  const defaultColors: StarColors = {
    empty: '#d1d5db',
    filled: '#fbbf24',
    hover: '#f59e0b',
    half: '#fbbf24',
  };

  const defaultAnimation: AnimationConfig = {
    enabled: true,
    duration: 200,
    type: 'scale',
  };

  const createEmit = () => vi.fn();

  const defaultOptions = {
    modelValue: 0,
    maxStars: 5,
    allowHalf: false,
    readonly: false,
    disabled: false,
    allowReset: true,
    minRating: 0,
    step: 1,
    colors: defaultColors,
    animation: defaultAnimation,
  };

  describe('Initial state', () => {
    it('initializes with correct default values', () => {
      const emit = createEmit();
      const { internalRating, isHovering, isFocused } = useStarRating(defaultOptions, emit);
      
      expect(internalRating.value).toBe(0);
      expect(isHovering.value).toBe(false);
      expect(isFocused.value).toBe(false);
    });

    it('initializes with provided modelValue', () => {
      const emit = createEmit();
      const { internalRating } = useStarRating({ ...defaultOptions, modelValue: 3 }, emit);
      
      expect(internalRating.value).toBe(3);
    });
  });

  describe('stars computed', () => {
    it('generates correct star items', () => {
      const emit = createEmit();
      const { stars } = useStarRating({ ...defaultOptions, modelValue: 3 }, emit);
      
      expect(stars.value).toHaveLength(5);
      expect(stars.value[0].filled).toBe(true);
      expect(stars.value[1].filled).toBe(true);
      expect(stars.value[2].filled).toBe(true);
      expect(stars.value[3].filled).toBe(false);
      expect(stars.value[4].filled).toBe(false);
    });

    it('correctly marks half-filled stars', () => {
      const emit = createEmit();
      const { stars } = useStarRating(
        { ...defaultOptions, modelValue: 2.5, allowHalf: true },
        emit
      );
      
      expect(stars.value[0].filled).toBe(true);
      expect(stars.value[1].filled).toBe(true);
      expect(stars.value[2].half).toBe(true);
      expect(stars.value[2].filled).toBe(false);
      expect(stars.value[3].filled).toBe(false);
    });
  });

  describe('handleClick', () => {
    it('updates rating on click', () => {
      const emit = createEmit();
      const { handleClick, internalRating } = useStarRating(defaultOptions, emit);
      
      handleClick(3);
      
      expect(internalRating.value).toBe(3);
      expect(emit).toHaveBeenCalledWith('update:modelValue', 3);
      expect(emit).toHaveBeenCalledWith('change', 3, 0);
    });

    it('resets on same value click when allowReset is true', () => {
      const emit = createEmit();
      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 3 },
        emit
      );
      
      handleClick(3);
      
      expect(internalRating.value).toBe(0);
    });

    it('does not click when readonly', () => {
      const emit = createEmit();
      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, readonly: true },
        emit
      );
      
      handleClick(3);
      
      expect(internalRating.value).toBe(0);
      expect(emit).not.toHaveBeenCalled();
    });

    it('does not click when disabled', () => {
      const emit = createEmit();
      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, disabled: true },
        emit
      );
      
      handleClick(3);
      
      expect(internalRating.value).toBe(0);
      expect(emit).not.toHaveBeenCalled();
    });

    it('clamps value to maxStars', () => {
      const emit = createEmit();
      const { handleClick, internalRating } = useStarRating(defaultOptions, emit);
      
      handleClick(10);
      
      expect(internalRating.value).toBe(5);
    });

    it('clamps value to minRating', () => {
      const emit = createEmit();
      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, minRating: 1 },
        emit
      );
      
      handleClick(0);
      
      expect(internalRating.value).toBe(1);
    });
  });

  describe('handleMouseEnter and handleMouseLeave', () => {
    it('updates hover state on mouse enter', () => {
      const emit = createEmit();
      const { handleMouseEnter, isHovering, hoverRating } = useStarRating(defaultOptions, emit);
      
      handleMouseEnter(4);
      
      expect(isHovering.value).toBe(true);
      expect(hoverRating.value).toBe(4);
      expect(emit).toHaveBeenCalledWith('hover', 4);
    });

    it('clears hover state on mouse leave', () => {
      const emit = createEmit();
      const { handleMouseEnter, handleMouseLeave, isHovering, hoverRating } = useStarRating(
        defaultOptions,
        emit
      );
      
      handleMouseEnter(4);
      handleMouseLeave();
      
      expect(isHovering.value).toBe(false);
      expect(hoverRating.value).toBe(null);
      expect(emit).toHaveBeenCalledWith('hover', null);
    });

    it('does not update hover when readonly', () => {
      const emit = createEmit();
      const { handleMouseEnter, isHovering } = useStarRating(
        { ...defaultOptions, readonly: true },
        emit
      );
      
      handleMouseEnter(4);
      
      expect(isHovering.value).toBe(false);
    });
  });

  describe('handleKeyDown', () => {
    it('increases rating with ArrowRight', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 2 },
        emit
      );
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      handleKeyDown(event);
      
      expect(internalRating.value).toBe(3);
    });

    it('decreases rating with ArrowLeft', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 3 },
        emit
      );
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      handleKeyDown(event);
      
      expect(internalRating.value).toBe(2);
    });

    it('sets to max with End key', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating(defaultOptions, emit);
      
      const event = new KeyboardEvent('keydown', { key: 'End' });
      handleKeyDown(event);
      
      expect(internalRating.value).toBe(5);
    });

    it('sets to min with Home key', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 3 },
        emit
      );
      
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      handleKeyDown(event);
      
      expect(internalRating.value).toBe(0);
    });

    it('sets rating with number key', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating(defaultOptions, emit);
      
      const event = new KeyboardEvent('keydown', { key: '4' });
      handleKeyDown(event);
      
      expect(internalRating.value).toBe(4);
    });

    it('increases by 0.5 when allowHalf is true', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 2, allowHalf: true },
        emit
      );
      
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      handleKeyDown(event);
      
      expect(internalRating.value).toBe(2.5);
    });
  });

  describe('reset', () => {
    it('resets to initial value', () => {
      const emit = createEmit();
      const { handleClick, reset, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 2 },
        emit
      );
      
      handleClick(5);
      expect(internalRating.value).toBe(5);
      
      reset();
      
      expect(internalRating.value).toBe(2);
    });
  });

  describe('setRating', () => {
    it('sets rating programmatically', () => {
      const emit = createEmit();
      const { setRating, internalRating } = useStarRating(defaultOptions, emit);
      
      setRating(4);
      
      expect(internalRating.value).toBe(4);
      expect(emit).toHaveBeenCalledWith('update:modelValue', 4);
    });

    it('validates and clamps the value', () => {
      const emit = createEmit();
      const { setRating, internalRating } = useStarRating(defaultOptions, emit);
      
      setRating(10);
      
      expect(internalRating.value).toBe(5);
    });
  });

  describe('getRating', () => {
    it('returns current rating', () => {
      const emit = createEmit();
      const { getRating, handleClick } = useStarRating(defaultOptions, emit);
      
      handleClick(3);
      
      expect(getRating()).toBe(3);
    });
  });

  describe('displayRating', () => {
    it('returns hover rating when hovering', () => {
      const emit = createEmit();
      const { displayRating, handleMouseEnter, internalRating } = useStarRating(
        { ...defaultOptions, modelValue: 2 },
        emit
      );
      
      expect(displayRating.value).toBe(2);
      
      handleMouseEnter(4);
      
      expect(displayRating.value).toBe(4);
      expect(internalRating.value).toBe(2); // Internal rating unchanged
    });
  });

  describe('setFocused', () => {
    it('updates focus state and emits events', () => {
      const emit = createEmit();
      const { setFocused, isFocused } = useStarRating(defaultOptions, emit);
      
      setFocused(true);
      expect(isFocused.value).toBe(true);
      expect(emit).toHaveBeenCalledWith('focus');
      
      setFocused(false);
      expect(isFocused.value).toBe(false);
      expect(emit).toHaveBeenCalledWith('blur');
    });
  });
});
