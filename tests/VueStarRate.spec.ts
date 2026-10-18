import VueStarRate from '@/components/VueStarRate.vue';
import VueStarRatePlugin from '@/index';
import { mount } from '@vue/test-utils';
import { createApp } from 'vue';
import { describe, expect, it } from 'vitest';

describe('VueStarRate', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(VueStarRate);
      
      expect(wrapper.find('.vue-star-rate').exists()).toBe(true);
      expect(wrapper.findAll('.vue-star-rate__star')).toHaveLength(5);
    });

    it('renders correct number of stars based on maxStars prop', () => {
      const wrapper = mount(VueStarRate, {
        props: { maxStars: 10 },
      });
      
      expect(wrapper.findAll('.vue-star-rate__star')).toHaveLength(10);
    });

    it('renders counter when showCounter is true', () => {
      const wrapper = mount(VueStarRate, {
        props: { showCounter: true, modelValue: 3, maxStars: 5 },
      });
      
      expect(wrapper.find('.vue-star-rate__counter').exists()).toBe(true);
      expect(wrapper.find('.vue-star-rate__counter').text()).toBe('3 / 5');
    });

    it('does not render counter when showCounter is false', () => {
      const wrapper = mount(VueStarRate, {
        props: { showCounter: false },
      });
      
      expect(wrapper.find('.vue-star-rate__counter').exists()).toBe(false);
    });

    it('renders clear button when clearable and has rating', () => {
      const wrapper = mount(VueStarRate, {
        props: { clearable: true, modelValue: 3 },
      });
      
      expect(wrapper.find('.vue-star-rate__clear').exists()).toBe(true);
    });

    it('does not render clear button when rating is 0', () => {
      const wrapper = mount(VueStarRate, {
        props: { clearable: true, modelValue: 0 },
      });
      
      expect(wrapper.find('.vue-star-rate__clear').exists()).toBe(false);
    });
  });

  describe('User interactions', () => {
    it('emits update:modelValue when star is clicked', async () => {
      const wrapper = mount(VueStarRate);
      
      await wrapper.findAll('.vue-star-rate__star')[2].trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([3]);
    });

    it('emits change event with old and new value', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 2 },
      });
      
      await wrapper.findAll('.vue-star-rate__star')[3].trigger('click');
      
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')![0]).toEqual([4, 2]);
    });

    it('does not emit when readonly', async () => {
      const wrapper = mount(VueStarRate, {
        props: { readonly: true },
      });
      
      await wrapper.findAll('.vue-star-rate__star')[2].trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('does not emit when disabled', async () => {
      const wrapper = mount(VueStarRate, {
        props: { disabled: true },
      });
      
      await wrapper.findAll('.vue-star-rate__star')[2].trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('allows reset when clicking same star', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3, allowReset: true },
      });
      
      await wrapper.findAll('.vue-star-rate__star')[2].trigger('click');
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([0]);
    });

    it('clears rating when clear button is clicked', async () => {
      const wrapper = mount(VueStarRate, {
        props: { clearable: true, modelValue: 3 },
      });
      
      await wrapper.find('.vue-star-rate__clear').trigger('click');
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([0]);
    });
  });

  describe('Keyboard navigation', () => {
    it('increases rating with ArrowRight', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 2 },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'ArrowRight' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([3]);
    });

    it('decreases rating with ArrowLeft', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3 },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'ArrowLeft' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([2]);
    });

    it('sets max rating with End key', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 2, maxStars: 5 },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'End' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([5]);
    });

    it('sets min rating with Home key', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3, minRating: 0 },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'Home' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([0]);
    });

    it('sets rating with number keys', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 2 },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: '4' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([4]);
    });
  });

  describe('Half-star support', () => {
    it('renders a half-filled star for a x.5 modelValue when allowHalf is true', () => {
      const wrapper = mount(VueStarRate, {
        props: { allowHalf: true, modelValue: 2.5 },
      });

      const stars = wrapper.findAll('.vue-star-rate__star');
      expect(stars[1].classes()).toContain('vue-star-rate__star--filled');
      expect(stars[2].classes()).toContain('vue-star-rate__star--half');
      expect(stars[2].find('linearGradient').exists()).toBe(true);
      expect(stars[3].classes()).not.toContain('vue-star-rate__star--half');
    });

    it('increases by 0.5 with allowHalf on ArrowRight', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 2, allowHalf: true },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'ArrowRight' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([2.5]);
    });

    it('decreases by 0.5 with allowHalf on ArrowLeft', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 2.5, allowHalf: true },
      });
      
      await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'ArrowLeft' });
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([2]);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3, maxStars: 5, ariaLabel: 'Rate this item' },
      });
      
      const container = wrapper.find('.vue-star-rate');
      // The root is a role="group" with an aria-label; each star is a button with aria-pressed
      // (asserted under "ARIA pressed state" below).
      expect(container.attributes('role')).toBe('group');
      expect(container.attributes('aria-label')).toBe('Rate this item');
    });

    // aria-readonly is not allowed on role="group" (axe: aria-allowed-attr, critical), so the read-only
    // state is carried by what assistive technology does perceive: disabled star buttons.
    it('marks readonly through disabled stars, not through aria-readonly', () => {
      const wrapper = mount(VueStarRate, {
        props: { readonly: true },
      });
      
      expect(wrapper.find('.vue-star-rate').attributes('aria-readonly')).toBeUndefined();
      expect(wrapper.find('.vue-star-rate').classes()).toContain('vue-star-rate--readonly');
      const stars = wrapper.findAll('.vue-star-rate__star');
      expect(stars).toHaveLength(5);
      for (const star of stars) expect(star.attributes('disabled')).toBeDefined();
    });

    it('does not swallow browser shortcuts typed while the widget has focus', () => {
      const wrapper = mount(VueStarRate, { props: { modelValue: 3 } });
      const root = wrapper.find('.vue-star-rate').element;
      const dispatch = (init: KeyboardEventInit) => {
        const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
        root.dispatchEvent(event);
        return event;
      };

      // Alt+ArrowLeft is "Back", Ctrl/Cmd+digit switches tabs: neither is a rating key
      expect(dispatch({ key: 'ArrowLeft', altKey: true }).defaultPrevented).toBe(false);
      expect(dispatch({ key: '4', ctrlKey: true }).defaultPrevented).toBe(false);
      expect(dispatch({ key: 'Tab' }).defaultPrevented).toBe(false);
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();

      // while plain rating keys are still handled
      expect(dispatch({ key: 'ArrowLeft' }).defaultPrevented).toBe(true);
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([2]);
    });

    it('has aria-disabled when disabled', () => {
      const wrapper = mount(VueStarRate, {
        props: { disabled: true },
      });
      
      expect(wrapper.find('.vue-star-rate').attributes('aria-disabled')).toBe('true');
    });

    it('is focusable with tabindex', () => {
      const wrapper = mount(VueStarRate);
      
      expect(wrapper.find('.vue-star-rate').attributes('tabindex')).toBe('0');
    });

    it('is not focusable when disabled', () => {
      const wrapper = mount(VueStarRate, {
        props: { disabled: true },
      });
      
      expect(wrapper.find('.vue-star-rate').attributes('tabindex')).toBe('-1');
    });
  });

  describe('Styling', () => {
    it('applies size class correctly', () => {
      const wrapper = mount(VueStarRate, {
        props: { size: 'lg' },
      });
      
      expect(wrapper.find('.vue-star-rate').classes()).toContain('vue-star-rate--lg');
    });

    it('applies disabled class', () => {
      const wrapper = mount(VueStarRate, {
        props: { disabled: true },
      });
      
      expect(wrapper.find('.vue-star-rate').classes()).toContain('vue-star-rate--disabled');
    });

    it('applies readonly class', () => {
      const wrapper = mount(VueStarRate, {
        props: { readonly: true },
      });
      
      expect(wrapper.find('.vue-star-rate').classes()).toContain('vue-star-rate--readonly');
    });

    it('applies RTL class', () => {
      const wrapper = mount(VueStarRate, {
        props: { rtl: true },
      });
      
      expect(wrapper.find('.vue-star-rate').classes()).toContain('vue-star-rate--rtl');
    });

    it('applies inline class', () => {
      const wrapper = mount(VueStarRate, {
        props: { inline: true },
      });
      
      expect(wrapper.find('.vue-star-rate').classes()).toContain('vue-star-rate--inline');
    });

    it('applies custom className', () => {
      const wrapper = mount(VueStarRate, {
        props: { className: 'my-custom-class' },
      });
      
      expect(wrapper.find('.vue-star-rate').classes()).toContain('my-custom-class');
    });
  });

  describe('Counter customization', () => {
    it('uses custom counter template', () => {
      const wrapper = mount(VueStarRate, {
        props: {
          showCounter: true,
          modelValue: 3,
          maxStars: 5,
          counterTemplate: '{value} out of {max} stars',
        },
      });
      
      expect(wrapper.find('.vue-star-rate__counter').text()).toBe('3 out of 5 stars');
    });
  });

  describe('Exposed methods', () => {
    it('exposes reset method', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3 },
      });
      
      // First change the rating
      await wrapper.findAll('.vue-star-rate__star')[4].trigger('click');
      
      // Reset should restore to initial value
      (wrapper.vm as any).reset();
      
      expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([3]);
    });

    it('exposes setRating method', () => {
      const wrapper = mount(VueStarRate);
      
      (wrapper.vm as any).setRating(4);
      
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([4]);
    });

    it('exposes getRating method', () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3 },
      });
      
      expect((wrapper.vm as any).getRating()).toBe(3);
    });
  });

  describe('Tooltip support', () => {
    it('shows tooltip when showTooltip is true', () => {
      const wrapper = mount(VueStarRate, {
        props: { showTooltip: true },
      });
      
      const star = wrapper.findAll('.vue-star-rate__star')[0];
      expect(star.attributes('title')).toBe('1 star');
    });

    it('uses custom tooltip labels', () => {
      const customLabels = ['Terrible', 'Bad', 'OK', 'Good', 'Excellent'];
      const wrapper = mount(VueStarRate, {
        props: { showTooltip: true, tooltipLabels: customLabels },
      });
      
      const stars = wrapper.findAll('.vue-star-rate__star');
      expect(stars[0].attributes('title')).toBe('Terrible');
      expect(stars[4].attributes('title')).toBe('Excellent');
    });
  });

  describe('ARIA pressed state', () => {
    it('marks filled stars with aria-pressed=true', () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3 },
      });

      const stars = wrapper.findAll('.vue-star-rate__star');
      expect(stars[0].attributes('aria-pressed')).toBe('true');
      expect(stars[2].attributes('aria-pressed')).toBe('true');
      expect(stars[3].attributes('aria-pressed')).toBe('false');
      expect(stars[4].attributes('aria-pressed')).toBe('false');
    });

    it('marks all stars as aria-pressed=false when modelValue is 0', () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 0 },
      });

      wrapper.findAll('.vue-star-rate__star').forEach((star) => {
        expect(star.attributes('aria-pressed')).toBe('false');
      });
    });
  });

  describe('Counter aria-live', () => {
    it('counter has aria-live="polite"', () => {
      const wrapper = mount(VueStarRate, {
        props: { showCounter: true, modelValue: 3 },
      });

      expect(wrapper.find('.vue-star-rate__counter').attributes('aria-live')).toBe('polite');
    });
  });

  describe('Slot API', () => {
    it('renders custom icon slot for each star when iconProvider is custom', () => {
      const wrapper = mount(VueStarRate, {
        props: { iconProvider: 'custom' },
        slots: {
          icon: '<span class="custom-star">★</span>',
        },
      });

      expect(wrapper.findAll('.custom-star')).toHaveLength(5);
    });

    it('renders custom counter slot content', () => {
      const wrapper = mount(VueStarRate, {
        props: { showCounter: true, modelValue: 3 },
        slots: {
          counter: '<span class="my-counter">custom counter</span>',
        },
      });

      expect(wrapper.find('.my-counter').text()).toBe('custom counter');
    });

    it('renders custom clear slot when clearable and rating > 0', async () => {
      const wrapper = mount(VueStarRate, {
        props: { clearable: true, modelValue: 3 },
        slots: {
          clear: '<span class="custom-clear">Reset</span>',
        },
      });

      expect(wrapper.find('.custom-clear').text()).toBe('Reset');
    });
  });

  describe('allowReset=false', () => {
    it('does not reset when clicking the same star with allowReset=false', async () => {
      const wrapper = mount(VueStarRate, {
        props: { modelValue: 3, allowReset: false },
      });

      await wrapper.findAll('.vue-star-rate__star')[2].trigger('click');

      // Clicking the current star should not emit anything (no change)
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  describe('Plugin registration', () => {
    it('registers VueStarRate globally under the default name', () => {
      const app = createApp({});
      VueStarRatePlugin.install!(app, {});

      expect((app as any)._context.components['VueStarRate']).toBeDefined();
    });

    it('registers VueStarRate under a custom component name', () => {
      const app = createApp({});
      VueStarRatePlugin.install!(app, { componentName: 'StarRating' });

      expect((app as any)._context.components['StarRating']).toBeDefined();
    });
  });
});
