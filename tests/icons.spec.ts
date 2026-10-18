import FontAwesomeIcon from '@/components/icons/FontAwesomeIcon.vue';
import LucideIcon from '@/components/icons/LucideIcon.vue';
import SvgIcon from '@/components/icons/SvgIcon.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Icon Components', () => {
  describe('SvgIcon', () => {
    it('renders correctly', () => {
      const wrapper = mount(SvgIcon);
      
      expect(wrapper.find('svg').exists()).toBe(true);
      expect(wrapper.find('path').exists()).toBe(true);
    });

    it('applies correct size', () => {
      const wrapper = mount(SvgIcon, {
        props: { size: 32 },
      });
      
      const svg = wrapper.find('svg');
      expect(svg.attributes('width')).toBe('32');
      expect(svg.attributes('height')).toBe('32');
    });

    it('applies correct size when object is passed', () => {
      const wrapper = mount(SvgIcon, {
        props: { size: { width: 24, height: 32 } },
      });
      
      const svg = wrapper.find('svg');
      expect(svg.attributes('width')).toBe('24');
      expect(svg.attributes('height')).toBe('32');
    });

    it('applies filled color when filled', () => {
      const wrapper = mount(SvgIcon, {
        props: { filled: true, color: '#ff0000' },
      });
      
      const path = wrapper.find('path');
      expect(path.attributes('fill')).toBe('#ff0000');
      expect(path.attributes('stroke')).toBe('#ff0000');
    });

    it('applies empty styling when not filled', () => {
      const wrapper = mount(SvgIcon, {
        props: { filled: false, emptyColor: '#cccccc' },
      });
      
      const path = wrapper.find('path');
      expect(path.attributes('fill')).toBe('none');
      expect(path.attributes('stroke')).toBe('#cccccc');
    });

    it('creates gradient for half-filled state', () => {
      const wrapper = mount(SvgIcon, {
        props: { half: true, color: '#fbbf24' },
      });
      
      expect(wrapper.find('defs').exists()).toBe(true);
      expect(wrapper.find('linearGradient').exists()).toBe(true);
    });
  });

  describe('FontAwesomeIcon', () => {
    it('renders correctly', () => {
      const wrapper = mount(FontAwesomeIcon);
      
      expect(wrapper.find('.fa-icon-wrapper').exists()).toBe(true);
      expect(wrapper.find('i').exists()).toBe(true);
    });

    it('uses filled icon class when filled', () => {
      const wrapper = mount(FontAwesomeIcon, {
        props: { filled: true, iconFilled: 'fa-solid fa-star' },
      });
      
      const icon = wrapper.find('i');
      expect(icon.classes()).toContain('fa-solid');
      expect(icon.classes()).toContain('fa-star');
    });

    it('uses empty icon class when not filled', () => {
      const wrapper = mount(FontAwesomeIcon, {
        props: { filled: false, iconEmpty: 'fa-regular fa-star' },
      });
      
      const icon = wrapper.find('i');
      expect(icon.classes()).toContain('fa-regular');
      expect(icon.classes()).toContain('fa-star');
    });

    it('uses half icon class when half', () => {
      const wrapper = mount(FontAwesomeIcon, {
        props: { half: true, iconHalf: 'fa-solid fa-star-half-stroke' },
      });
      
      const icon = wrapper.find('i');
      expect(icon.classes()).toContain('fa-solid');
      expect(icon.classes()).toContain('fa-star-half-stroke');
    });

    it('applies correct color', () => {
      const wrapper = mount(FontAwesomeIcon, {
        props: { filled: true, color: '#ff0000', size: 24 },
      });
      
      const iconWrapper = wrapper.find('.fa-icon-wrapper');
      // Color could be in hex or rgb format depending on the browser/environment
      const style = iconWrapper.attributes('style') || '';
      expect(style.includes('color: #ff0000') || style.includes('color: rgb(255, 0, 0)')).toBe(true);
    });

    it('applies correct size', () => {
      const wrapper = mount(FontAwesomeIcon, {
        props: { size: 32 },
      });
      
      const iconWrapper = wrapper.find('.fa-icon-wrapper');
      expect(iconWrapper.attributes('style')).toContain('font-size: 32px');
    });
  });

  describe('LucideIcon', () => {
    it('renders a star icon synchronously', () => {
      const wrapper = mount(LucideIcon);

      expect(wrapper.find('.lucide-icon-wrapper').exists()).toBe(true);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it("draws Lucide's star: full path data, presentation attributes, decorative markup", () => {
      const wrapper = mount(LucideIcon, { props: { filled: true, color: '#ff0000', strokeWidth: 3, size: 20 } });
      const svg = wrapper.find('svg');

      // The class list and aria-hidden are what lucide-vue-next 0.563 and later (1.x) render. 0.469, the
      // version this package used to be built against, rendered `lucide lucide-star-icon` and no aria-hidden.
      expect(svg.classes()).toEqual(['lucide', 'lucide-star-icon', 'lucide-star']);
      expect(svg.attributes('viewBox')).toBe('0 0 24 24');
      expect(svg.attributes('width')).toBe('20');
      expect(svg.attributes('height')).toBe('20');
      expect(svg.attributes('fill')).toBe('#ff0000');
      expect(svg.attributes('stroke')).toBe('#ff0000');
      expect(svg.attributes('stroke-width')).toBe('3');
      expect(svg.attributes('stroke-linecap')).toBe('round');
      expect(svg.attributes('stroke-linejoin')).toBe('round');
      // The star is decorative: the surrounding button carries the accessible name.
      expect(svg.attributes('aria-hidden')).toBe('true');
      // The whole path, byte for byte: the same data as the `star` icon of lucide-vue-next 0.469 and 1.x.
      // A prefix check would let a mangled curve through.
      expect(svg.find('path').attributes('d')).toBe(
        'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
      );
    });

    it('uses the empty colour and no fill for an empty star', () => {
      const wrapper = mount(LucideIcon, { props: { color: '#ff0000', emptyColor: '#cccccc' } });
      const svg = wrapper.find('svg');

      expect(svg.attributes('fill')).toBe('none');
      expect(svg.attributes('stroke')).toBe('#cccccc');
    });

    it('renders a linearGradient for half-star state', () => {
      const wrapper = mount(LucideIcon, {
        props: { half: true, color: '#fbbf24', index: 2 },
      });

      expect(wrapper.find('linearGradient').exists()).toBe(true);
      // The id is built from useId() (unique per instance and app, see gradientIds.spec.ts), not from the index.
      const id = wrapper.find('linearGradient').attributes('id');
      expect(id).toMatch(/^vsr-half-/);
      expect(wrapper.find('.lucide-star').attributes('fill')).toBe(`url(#${id})`);
    });

    it('renders no gradient when the star is not half', () => {
      const wrapper = mount(LucideIcon, {
        props: { filled: true, half: false },
      });

      expect(wrapper.find('linearGradient').exists()).toBe(false);
    });

    it.each([
      { size: 32, width: '32', height: '32' },
      { size: { width: 20, height: 30 }, width: '20', height: '30' },
    ])('applies the size $size to width and height', ({ size, width, height }) => {
      const svg = mount(LucideIcon, { props: { size } }).find('svg');

      expect(svg.attributes('width')).toBe(width);
      expect(svg.attributes('height')).toBe(height);
    });
  });
});
