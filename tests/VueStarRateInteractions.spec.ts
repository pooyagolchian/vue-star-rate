import VueStarRate from '@/components/VueStarRate.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

// happy-dom does no layout (every rect is 0x0), so the half-star hit test needs a real geometry.
// A 20px-wide star starting at x=100: clientX < 110 is its left half. The non-zero left makes maths
// that forgets rect.left fail.
const rect = (left: number, width: number): DOMRect =>
  ({
    left,
    width,
    right: left + width,
    top: 0,
    bottom: 20,
    height: 20,
    x: left,
    y: 0,
    toJSON: () => ({}),
  }) as DOMRect;

/** Mount with allowHalf and give star #3 (value 3) a 20px-wide rect. */
const mountHalf = (props: Record<string, unknown> = {}) => {
  const wrapper = mount(VueStarRate, { props: { allowHalf: true, ...props } });
  const star = wrapper.findAll('.vue-star-rate__star')[2];
  const getRect = vi.spyOn(star.element, 'getBoundingClientRect').mockReturnValue(rect(100, 20));
  return { wrapper, star, getRect };
};

// A real mouse/touch/pen click has detail >= 1; detail 0 is a keyboard or programmatic click, which
// activates the whole star (tested below). VTU's trigger() defaults to detail 0.
const POINTER = { detail: 1 };

describe('VueStarRate - half-star pointer path', () => {
  it.each([
    { rtl: false, clientX: 104, expected: 2.5, half: 'left' },
    { rtl: false, clientX: 116, expected: 3, half: 'right' },
    { rtl: true, clientX: 104, expected: 3, half: 'left' },
    { rtl: true, clientX: 116, expected: 2.5, half: 'right' },
  ])('rtl=$rtl: clicking the $half half of star 3 commits $expected', async ({ rtl, clientX, expected }) => {
    const { wrapper, star } = mountHalf({ rtl });

    await star.trigger('click', { ...POINTER, clientX });

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([expected]);
  });

  // Enter/Space on a focused <button> and el.click() produce a click with detail 0 and no usable clientX
  // (0 in Chromium and Gecko; a truncated element centre for WebKit keyboard clicks): the pointer maths
  // must not run. The second case carries a clientX in the left half to prove it is detail, not
  // clientX === 0, that decides.
  it.each([
    { clientX: 0, source: 'Chromium/Gecko keyboard click' },
    { clientX: 104, source: 'WebKit keyboard click, position in the left half' },
  ])('detail 0 ($source) commits the whole star', async ({ clientX }) => {
    const { wrapper, star } = mountHalf();

    await star.trigger('click', { detail: 0, clientX });

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3]);
  });

  it('without allowHalf the click position is ignored', async () => {
    const wrapper = mount(VueStarRate);
    const star = wrapper.findAll('.vue-star-rate__star')[2];
    vi.spyOn(star.element, 'getBoundingClientRect').mockReturnValue(rect(100, 20));

    await star.trigger('click', { ...POINTER, clientX: 104 });

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3]);
  });

  it('hover previews the half under the pointer and does not re-emit inside the same half', async () => {
    const { wrapper, star } = mountHalf();

    await star.trigger('mouseenter');
    await star.trigger('mousemove', { clientX: 104 });
    await star.trigger('mousemove', { clientX: 106 });
    await star.trigger('mousemove', { clientX: 116 });

    expect(wrapper.emitted('hover')).toEqual([[2.5], [3]]);
  });

  it('measures the star once on mouseenter, not on every mousemove', async () => {
    const { star, getRect } = mountHalf();

    await star.trigger('mouseenter');
    await star.trigger('mousemove', { clientX: 104 });
    await star.trigger('mousemove', { clientX: 116 });
    await star.trigger('mousemove', { clientX: 104 });

    expect(getRect).toHaveBeenCalledTimes(1);
  });
});

describe('VueStarRate - half-step snapping', () => {
  it.each([
    { given: 2.3, expected: 2.5 },
    { given: 2.2, expected: 2 },
    { given: 2.8, expected: 3 },
  ])('setRating($given) snaps to the nearest half ($expected) when allowHalf is on', ({ given, expected }) => {
    const wrapper = mount(VueStarRate, { props: { allowHalf: true } });

    (wrapper.vm as unknown as { setRating: (value: number) => void }).setRating(given);

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([expected]);
  });
});

describe('VueStarRate - keyboard on the root', () => {
  it('ArrowRight raises the rating by one star', async () => {
    const wrapper = mount(VueStarRate, { props: { modelValue: 2 } });

    await wrapper.find('.vue-star-rate').trigger('keydown', { key: 'ArrowRight' });

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3]);
    expect(wrapper.emitted('change')![0]).toEqual([3, 2]);
  });

  // A read-only or disabled widget stays focusable (tabindex 0 for read-only), so the only thing that
  // stops its keystrokes from changing the rating is the guard in the key handler. The star buttons are
  // `disabled` there, which the test utils skip, so only the root's keydown can prove it.
  it.each(['readonly', 'disabled'] as const)('%s: rating keys change nothing', async (flag) => {
    const wrapper = mount(VueStarRate, { props: { modelValue: 3, [flag]: true } });

    for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End', '0', '1', '5']) {
      await wrapper.find('.vue-star-rate').trigger('keydown', { key });
    }

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('change')).toBeUndefined();
  });
});

describe('VueStarRate - hover and focus wiring', () => {
  it('emits hover with the star value, marks the root --hovering and clears both on mouseleave', async () => {
    const wrapper = mount(VueStarRate);
    const root = wrapper.find('.vue-star-rate');

    await wrapper.findAll('.vue-star-rate__star')[2].trigger('mousemove');
    expect(wrapper.emitted('hover')).toEqual([[3]]);
    expect(root.classes()).toContain('vue-star-rate--hovering');

    await wrapper.find('.vue-star-rate__stars').trigger('mouseleave');
    expect(wrapper.emitted('hover')).toEqual([[3], [null]]);
    expect(root.classes()).not.toContain('vue-star-rate--hovering');
  });

  it('paints the stars up to the hovered one with colors.hover; later stars keep colors.empty', async () => {
    const wrapper = mount(VueStarRate, {
      props: { modelValue: 1, colors: { hover: '#00ff00', empty: '#cccccc' } },
    });

    await wrapper.findAll('.vue-star-rate__star')[3].trigger('mousemove');

    const strokes = wrapper.findAll('.vue-star-rate__star').map((star) => star.find('path').attributes('stroke'));
    expect(strokes).toEqual(['#00ff00', '#00ff00', '#00ff00', '#00ff00', '#cccccc']);
  });

  // Drive focus through the platform (element.focus()) rather than trigger('focus'). This test only
  // involves the root; the next one pins what happens when a star button takes focus.
  it('emits focus/blur and toggles --focused when the root takes and loses focus', async () => {
    const wrapper = mount(VueStarRate, { attachTo: document.body });
    const root = wrapper.find('.vue-star-rate');

    (root.element as HTMLElement).focus();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('focus')).toHaveLength(1);
    expect(root.classes()).toContain('vue-star-rate--focused');

    (root.element as HTMLElement).blur();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('blur')).toHaveLength(1);
    expect(root.classes()).not.toContain('vue-star-rate--focused');

    wrapper.unmount();
  });

  // The documented semantics (types/index.ts, README): `focus` and `blur` describe the root element
  // only. Focusing a star button emits nothing, and moving focus from the root onto a star button
  // counts as the root losing focus. Wiring them to focusin/focusout would change all three counts.
  it('focus/blur follow the root element, not the star buttons inside it', async () => {
    const wrapper = mount(VueStarRate, { attachTo: document.body });
    const root = wrapper.find('.vue-star-rate').element as HTMLElement;
    const star = wrapper.find('.vue-star-rate__star').element as HTMLElement;
    const counts = () => [wrapper.emitted('focus')?.length ?? 0, wrapper.emitted('blur')?.length ?? 0];

    star.focus();
    expect(counts()).toEqual([0, 0]);

    root.focus();
    expect(counts()).toEqual([1, 0]);

    star.focus();
    expect(counts()).toEqual([1, 1]);

    wrapper.unmount();
  });

  it('exposes focus() and blur()', () => {
    const wrapper = mount(VueStarRate, { attachTo: document.body });
    const root = wrapper.find('.vue-star-rate').element;

    (wrapper.vm as unknown as { focus: () => void }).focus();
    expect(document.activeElement).toBe(root);

    (wrapper.vm as unknown as { blur: () => void }).blur();
    expect(document.activeElement).not.toBe(root);

    wrapper.unmount();
  });
});

describe('VueStarRate - clear button', () => {
  // The clear button is its own feature: `allowReset` only concerns clicking the current star again.
  it('clears the rating when allowReset is false', async () => {
    const wrapper = mount(VueStarRate, { props: { modelValue: 3, clearable: true, allowReset: false } });

    await wrapper.find('.vue-star-rate__clear').trigger('click');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([0]);
  });
});

describe('VueStarRate - icon providers and colours', () => {
  it('iconProvider="lucide" renders a Lucide star per button', () => {
    const wrapper = mount(VueStarRate, { props: { iconProvider: 'lucide' } });

    expect(wrapper.findAll('.lucide-icon-wrapper')).toHaveLength(5);
    expect(wrapper.findAll('svg.lucide-star')).toHaveLength(5);
  });

  it('iconProvider="fontawesome" forwards faIcons for the empty, filled and half state', () => {
    const wrapper = mount(VueStarRate, {
      props: {
        iconProvider: 'fontawesome',
        allowHalf: true,
        modelValue: 2.5,
        faIcons: { empty: 'fa-regular fa-heart', filled: 'fa-solid fa-heart', half: 'fa-solid fa-heart-half' },
      },
    });

    expect(wrapper.findAll('i.fa-solid.fa-heart')).toHaveLength(2); // stars 1 and 2: filled
    expect(wrapper.findAll('i.fa-heart-half')).toHaveLength(1); // star 3: half
    expect(wrapper.findAll('i.fa-regular.fa-heart')).toHaveLength(2); // stars 4 and 5: empty
  });

  it('colors.filled paints filled stars; empty stars keep no fill', () => {
    const wrapper = mount(VueStarRate, { props: { modelValue: 3, colors: { filled: '#ff0000' } } });
    const stars = wrapper.findAll('.vue-star-rate__star');

    expect(stars[0].find('path').attributes('fill')).toBe('#ff0000');
    expect(stars[4].find('path').attributes('fill')).toBe('none');
  });

  // colors.half has its own default; it does not follow a custom colors.filled (documented in the README
  // and the types). An empty value falls back to colors.filled.
  it('a half star keeps its own default colour when only colors.filled is customised', () => {
    const wrapper = mount(VueStarRate, {
      props: { allowHalf: true, modelValue: 2.5, colors: { filled: '#ff0000' } },
    });
    const stars = wrapper.findAll('.vue-star-rate__star');

    expect(stars[0].find('path').attributes('stroke')).toBe('#ff0000');
    expect(stars[2].find('path').attributes('stroke')).toBe('#fbbf24');
  });

  it('a half star falls back to colors.filled when colors.half is empty', () => {
    const wrapper = mount(VueStarRate, {
      props: { allowHalf: true, modelValue: 2.5, colors: { filled: '#ff0000', half: '' } },
    });

    expect(wrapper.findAll('.vue-star-rate__star')[2].find('path').attributes('stroke')).toBe('#ff0000');
  });

  it.each(['custom', 'lucide'] as const)(
    'iconSize accepts a number or a { width, height } object (%s provider)',
    (iconProvider) => {
      const square = mount(VueStarRate, { props: { iconProvider, iconSize: 32 } });
      expect(square.find('svg').attributes('width')).toBe('32');
      expect(square.find('svg').attributes('height')).toBe('32');

      const wide = mount(VueStarRate, { props: { iconProvider, iconSize: { width: 20, height: 30 } } });
      expect(wide.find('svg').attributes('width')).toBe('20');
      expect(wide.find('svg').attributes('height')).toBe('30');
    },
  );
});
