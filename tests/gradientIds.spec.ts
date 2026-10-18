import VueStarRate from '@/components/VueStarRate.vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { h, useId } from 'vue';

// Regression: half-star gradient ids must be unique on the page. Otherwise `url(#id)` resolves to the
// first matching element in the document, so a second rating borrows another rating's colour (or
// paints no half fill at all when the first one sits in a display:none subtree) and, worse, a
// gradient that shares its id with a `<label for>` target breaks that label.
const gradientIds = () => [...document.querySelectorAll('linearGradient')].map((g) => g.id);
const allIds = () => [...document.querySelectorAll('[id]')].map((el) => el.id);

let wrappers: VueWrapper[] = [];

const mountAttached = (component: Parameters<typeof mount>[0]) => {
  const wrapper = mount(component, { attachTo: document.body });
  wrappers.push(wrapper);
  return wrapper;
};

// Two ratings with the same half index (3.5) in ONE app: the case index-based ids collided on.
const mountTwoRatings = (iconProvider?: 'lucide') =>
  mountAttached({
    render: () =>
      h('div', [
        h(VueStarRate, { modelValue: 3.5, allowHalf: true, iconProvider }),
        h(VueStarRate, { modelValue: 3.5, allowHalf: true, iconProvider }),
      ]),
  });

describe('half-star gradient ids', () => {
  afterEach(() => {
    wrappers.forEach((wrapper) => wrapper.unmount());
    wrappers = [];
    document.body.innerHTML = '';
  });

  it.each([
    ['default SVG', undefined],
    ['Lucide', 'lucide'],
  ] as const)('are unique across two ratings in one app (%s provider)', (_name, iconProvider) => {
    mountTwoRatings(iconProvider);

    const ids = gradientIds();
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });

  it('every half star fills with a gradient that exists exactly once in the document', () => {
    mountTwoRatings();

    const roots = [...document.querySelectorAll('.vue-star-rate')];
    expect(roots).toHaveLength(2);
    for (const root of roots) {
      const id = root.querySelector('linearGradient')!.id;
      const halfPath = [...root.querySelectorAll('path')].find((p) => p.getAttribute('fill')?.startsWith('url('));
      expect(halfPath?.getAttribute('fill')).toBe(`url(#${id})`);
      expect(document.querySelectorAll(`[id="${id}"]`)).toHaveLength(1);
    }
  });

  // Each createApp() root restarts Vue's useId() counter, so a bare useId() would hand the rating
  // exactly the id (`v-0`) that the first useId() call of any other app gets. That app's
  // `<label for>` then points at the gradient, loses its input, and its field loses its name.
  it('does not collide with the ids that another Vue app gets from useId()', () => {
    mountAttached({ render: () => h(VueStarRate, { modelValue: 0.5, allowHalf: true }) });
    const field = mountAttached({
      setup() {
        const id = useId();
        return () => h('form', [h('label', { for: id }, 'Email'), h('input', { id, type: 'email' })]);
      },
    });

    const input = field.element.querySelector('input')!;
    const label = field.element.querySelector('label')!;
    expect(new Set(allIds()).size).toBe(allIds().length);
    expect(document.getElementById(label.htmlFor)).toBe(input);
  });
});
