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
    it('renders a star icon', () => {
      const wrapper = mount(LucideIcon);

      expect(wrapper.find('.lucide-icon-wrapper').exists()).toBe(true);
      // lucide-vue-next renders an SVG
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('injects a hidden linearGradient SVG for half-star state', () => {
      const wrapper = mount(LucideIcon, {
        props: { half: true, color: '#fbbf24', index: 2 },
      });

      // The hidden gradient SVG must be present
      expect(wrapper.find('linearGradient').exists()).toBe(true);
      expect(wrapper.find('linearGradient').attributes('id')).toBe(
        'half-gradient-lucide-2',
      );
    });

    it('does NOT inject a gradient SVG when not in half state', () => {
      const wrapper = mount(LucideIcon, {
        props: { filled: true, half: false },
      });

      expect(wrapper.find('linearGradient').exists()).toBe(false);
    });

    it('passes the correct width to the Star icon', () => {
      const wrapper = mount(LucideIcon, {
        props: { size: { width: 32, height: 32 } },
      });

      // lucide renders svg with width attribute
      const svgs = wrapper.findAll('svg');
      const visibleSvg = svgs.find((s) => s.attributes('width') === '32');
      expect(visibleSvg).toBeDefined();
    });
  });
});
