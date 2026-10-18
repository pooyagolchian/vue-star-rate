import { useStarRating } from '@/composables/useStarRating';
import type { AnimationConfig, StarColors } from '@/types';
import { nextTick, ref } from 'vue';
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

  describe('handleKeyDown: keys that are not rating keys', () => {
    // minRating 1 with a model of 0: the value is below the floor, so anything that validates and
    // emits on an unrelated key would write 1 into the parent (the user only pressed Tab).
    const unnormalised = { ...defaultOptions, modelValue: 0, minRating: 1, maxStars: 3 };
    const press = (init: KeyboardEventInit) => new KeyboardEvent('keydown', { cancelable: true, ...init });

    it.each(['Tab', 'Shift', 'Escape', 'Enter', ' ', 'a', 'PageDown', 'F5'])(
      'ignores %j: no emit, no state change, default not prevented',
      (key) => {
        const emit = createEmit();
        const { handleKeyDown, internalRating } = useStarRating(unnormalised, emit);
        const event = press({ key });

        handleKeyDown(event);

        expect(emit).not.toHaveBeenCalled();
        expect(internalRating.value).toBe(0);
        expect(event.defaultPrevented).toBe(false);
      },
    );

    it('ignores a digit above maxStars', () => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating(unnormalised, emit);
      const event = press({ key: '9' });

      handleKeyDown(event);

      expect(emit).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });

    it.each([
      { key: 'ArrowLeft', altKey: true }, // browser Back
      { key: 'ArrowRight', altKey: true }, // browser Forward
      { key: '4', ctrlKey: true }, // switch tab
      { key: '2', metaKey: true }, // switch tab on macOS
      { key: 'ArrowRight', metaKey: true },
      { key: 'Home', ctrlKey: true },
    ])('leaves %j to the browser', (init) => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating({ ...defaultOptions, modelValue: 3 }, emit);
      const event = press(init);

      handleKeyDown(event);

      expect(emit).not.toHaveBeenCalled();
      expect(internalRating.value).toBe(3);
      expect(event.defaultPrevented).toBe(false);
    });

    it.each(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End', '0', '1', '5'])(
      'still claims %j for itself',
      (key) => {
        const { handleKeyDown } = useStarRating({ ...defaultOptions, modelValue: 3 }, createEmit());
        const event = press({ key });

        handleKeyDown(event);

        expect(event.defaultPrevented).toBe(true);
      },
    );

    it('Shift does not turn a rating key into a pass-through', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating({ ...defaultOptions, modelValue: 2 }, emit);
      const event = press({ key: 'ArrowRight', shiftKey: true });

      handleKeyDown(event);

      expect(internalRating.value).toBe(3);
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe('handleKeyDown: rating keys and the values they set', () => {
    const press = (key: string) => new KeyboardEvent('keydown', { key, cancelable: true });
    const modelEmits = (emit: ReturnType<typeof createEmit>): number[] =>
      emit.mock.calls.filter(([name]) => name === 'update:modelValue').map(([, value]) => value as number);

    it.each([
      { key: 'ArrowRight', from: 2, to: 3 },
      { key: 'ArrowUp', from: 2, to: 3 },
      { key: 'ArrowLeft', from: 2, to: 1 },
      { key: 'ArrowDown', from: 2, to: 1 },
      { key: 'Home', from: 2, to: 0 },
      { key: '0', from: 2, to: 0 },
      { key: 'End', from: 2, to: 5 },
      { key: '4', from: 2, to: 4 },
      { key: 'ArrowRight', from: 5, to: undefined }, // already at the top: nothing to commit
      { key: 'ArrowUp', from: 5, to: undefined },
      { key: 'ArrowLeft', from: 0, to: undefined },
      { key: 'ArrowDown', from: 0, to: undefined },
    ])('$key from $from commits $to', ({ key, from, to }) => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating({ ...defaultOptions, modelValue: from }, emit);

      handleKeyDown(press(key));

      expect(modelEmits(emit)).toEqual(to === undefined ? [] : [to]);
    });

    it('0 and Home both go to minRating, not to 0 or maxStars', () => {
      for (const key of ['0', 'Home']) {
        const emit = createEmit();
        const { handleKeyDown } = useStarRating({ ...defaultOptions, modelValue: 4, minRating: 1 }, emit);

        handleKeyDown(press(key));

        expect(modelEmits(emit), key).toEqual([1]);
      }
    });

    it('ArrowUp and ArrowDown move by half a star with allowHalf', () => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating({ ...defaultOptions, modelValue: 2, allowHalf: true }, emit);

      handleKeyDown(press('ArrowUp'));
      handleKeyDown(press('ArrowDown'));
      handleKeyDown(press('ArrowDown'));

      expect(modelEmits(emit)).toEqual([2.5, 2, 1.5]);
    });

    const ratingKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End', '0', '1', '5'];

    it.each(['readonly', 'disabled'] as const)('%s: no rating key emits, changes the value or is swallowed', (flag) => {
      for (const key of ratingKeys) {
        const emit = createEmit();
        const { handleKeyDown, internalRating } = useStarRating({ ...defaultOptions, modelValue: 3, [flag]: true }, emit);
        const event = press(key);

        handleKeyDown(event);

        expect(emit, `${flag} + ${key}`).not.toHaveBeenCalled();
        expect(internalRating.value, `${flag} + ${key}`).toBe(3);
        expect(event.defaultPrevented, `${flag} + ${key}`).toBe(false);
      }
    });
  });

  describe('NaN', () => {
    const press = (key: string) => new KeyboardEvent('keydown', { key });
    const modelEmits = (emit: ReturnType<typeof createEmit>): number[] =>
      emit.mock.calls.filter(([name]) => name === 'update:modelValue').map(([, value]) => value as number);

    it('setRating(NaN) means "no rating": it commits minRating, never NaN', () => {
      const emit = createEmit();
      const { setRating } = useStarRating({ ...defaultOptions, modelValue: 3, minRating: 1 }, emit);

      setRating(Number.NaN);

      expect(modelEmits(emit)).toEqual([1]);
    });

    it('a NaN model recovers on the first rating key instead of emitting NaN again and again', () => {
      const emit = createEmit();
      const { handleKeyDown, internalRating } = useStarRating({ ...defaultOptions, modelValue: Number.NaN }, emit);

      handleKeyDown(press('ArrowRight'));
      handleKeyDown(press('ArrowRight'));

      expect(modelEmits(emit)).toEqual([0, 1]);
      expect(internalRating.value).toBe(1);
    });
  });

  describe('validation of fractional and invalid steps', () => {
    const press = (key: string) => new KeyboardEvent('keydown', { key });
    const modelEmits = (emit: ReturnType<typeof createEmit>): number[] =>
      emit.mock.calls.filter(([name]) => name === 'update:modelValue').map(([, value]) => value as number);

    // The bounds are selectable whatever the step grid is. In each row, snapping the bound to the grid
    // would land somewhere else: 5 / 0.6 -> 4.8, 5 / 4 -> 4, 0.5 / 0.6 -> 0.6, 1.3 / 0.5 -> 1.5, 1 / 2 -> 2.
    it.each([
      { key: 'End', step: 0.6, minRating: 0, modelValue: 0, expected: 5 },
      { key: 'End', step: 0.7, minRating: 0, modelValue: 0, expected: 5 },
      { key: 'End', step: 4, minRating: 0, modelValue: 0, expected: 5 },
      { key: 'Home', step: 0.6, minRating: 0.5, modelValue: 3, expected: 0.5 },
      { key: 'Home', step: 0.5, minRating: 1.3, modelValue: 3, expected: 1.3 },
      { key: 'Home', step: 2, minRating: 1, modelValue: 4, expected: 1 },
    ])('$key reaches the bound $expected with step $step and minRating $minRating', ({ key, step, minRating, modelValue, expected }) => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating({ ...defaultOptions, step, minRating, modelValue }, emit);

      handleKeyDown(press(key));

      expect(modelEmits(emit)).toEqual([expected]);
    });

    it('step 0.1: fifty ArrowRight presses emit only canonical values and end on maxStars', () => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating({ ...defaultOptions, step: 0.1 }, emit);

      for (let i = 0; i < 50; i++) handleKeyDown(press('ArrowRight'));

      const values = modelEmits(emit);
      expect(values).toHaveLength(50);
      // 3 * 0.1 is 0.30000000000000004 in binary floating point; a canonical value survives a 1-decimal round trip
      expect(values.filter((value) => value !== Number(value.toFixed(1)))).toEqual([]);
      expect(values.at(-1)).toBe(5);
    });

    it('step 0.1: setRating(0.3) emits exactly 0.3', () => {
      const emit = createEmit();
      const { setRating } = useStarRating({ ...defaultOptions, step: 0.1 }, emit);

      setRating(0.3);

      expect(modelEmits(emit)).toEqual([0.3]);
    });

    it('End never exceeds maxStars when the step does not divide it (5 / 0.75 snaps to 5.25)', () => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating({ ...defaultOptions, step: 0.75 }, emit);

      handleKeyDown(press('End'));

      expect(modelEmits(emit)).toEqual([5]);
    });

    it('Home never goes below minRating when the step does not divide it (1 / 0.75 snaps to 0.75)', () => {
      const emit = createEmit();
      const { handleKeyDown } = useStarRating({ ...defaultOptions, step: 0.75, minRating: 1, modelValue: 3 }, emit);

      handleKeyDown(press('Home'));

      expect(modelEmits(emit)).toEqual([1]);
    });

    it('clicking the last star never exceeds maxStars (5 / 0.4 snaps to 5.2)', () => {
      const emit = createEmit();
      const { handleClick } = useStarRating({ ...defaultOptions, step: 0.4 }, emit);

      handleClick(5);

      expect(modelEmits(emit)).toEqual([5]);
    });

    it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])('step %s falls back to 1 instead of producing NaN', (step) => {
      const emit = createEmit();
      const { handleClick, handleKeyDown } = useStarRating({ ...defaultOptions, step }, emit);

      handleClick(3);
      handleKeyDown(press('ArrowRight'));

      expect(modelEmits(emit)).toEqual([3, 4]);
    });

    it('stays inside [minRating, maxStars] and on a canonical value for every step and input', () => {
      const steps = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.9, 1, 2];
      for (const step of steps) {
        for (const minRating of [0, 1]) {
          const { setRating, getRating } = useStarRating({ ...defaultOptions, step, minRating }, createEmit());
          for (let value = -1; value <= 6; value += 0.05) {
            setRating(value);
            const rating = getRating();
            const where = `step ${step}, min ${minRating}, input ${value}`;
            expect(rating, where).toBeGreaterThanOrEqual(minRating);
            expect(rating, where).toBeLessThanOrEqual(5);
            expect(rating, where).toBe(Number(rating.toPrecision(12)));
            // The result is a bound or a point of the step grid, and it is the grid point (or bound)
            // nearest to the input: no further than half a step from the input once that is clamped.
            const onGrid = Math.abs(rating / step - Math.round(rating / step)) < 1e-9;
            expect(onGrid || rating === minRating || rating === 5, where).toBe(true);
            expect(Math.abs(rating - Math.min(5, Math.max(minRating, value))), where).toBeLessThanOrEqual(step / 2 + 1e-9);
          }
        }
      }
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

  describe('Reactive options (MaybeRefOrGetter)', () => {
    it('respects readonly ref changing to true after setup', () => {
      const emit = createEmit();
      const readonlyRef = ref(false);

      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, readonly: readonlyRef },
        emit,
      );

      handleClick(3);
      expect(internalRating.value).toBe(3);

      readonlyRef.value = true;
      handleClick(5);
      // Rating must not change after readonly becomes true
      expect(internalRating.value).toBe(3);
    });

    it('respects disabled ref changing to true after setup', () => {
      const emit = createEmit();
      const disabledRef = ref(false);

      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, disabled: disabledRef },
        emit,
      );

      handleClick(3);
      expect(internalRating.value).toBe(3);

      disabledRef.value = true;
      handleClick(5);
      // Rating must not change after disabled becomes true
      expect(internalRating.value).toBe(3);
    });

    it('re-enables interaction when readonly ref switches back to false', () => {
      const emit = createEmit();
      const readonlyRef = ref(true);

      const { handleClick, internalRating } = useStarRating(
        { ...defaultOptions, readonly: readonlyRef },
        emit,
      );

      handleClick(3);
      expect(internalRating.value).toBe(0); // blocked

      readonlyRef.value = false;
      handleClick(3);
      expect(internalRating.value).toBe(3); // now allowed
    });
  });

  describe('External modelValue sync', () => {
    it('syncs internalRating when the modelValue ref is updated externally', async () => {
      const emit = createEmit();
      const externalModel = ref<number>(2);

      const { internalRating } = useStarRating(
        { ...defaultOptions, modelValue: externalModel },
        emit,
      );

      expect(internalRating.value).toBe(2);

      externalModel.value = 4;
      await nextTick();

      expect(internalRating.value).toBe(4);
    });

    it('does NOT emit "change" when internalRating is synced from external model update', async () => {
      const emit = createEmit();
      const externalModel = ref<number>(2);

      const { internalRating } = useStarRating(
        { ...defaultOptions, modelValue: externalModel },
        emit,
      );

      emit.mockClear();
      externalModel.value = 4;
      await nextTick();

      expect(internalRating.value).toBe(4);
      // External sync must NOT fire a user-interaction "change" event
      expect(emit).not.toHaveBeenCalledWith('change', expect.anything(), expect.anything());
    });
  });
});
