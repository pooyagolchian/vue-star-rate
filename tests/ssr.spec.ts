// @vitest-environment node
import VueStarRate from '@/components/VueStarRate.vue';
import { describe, expect, it } from 'vitest';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';

// The README and the docs promise that every icon provider renders on the server without touching
// window or document. This runs in a plain Node environment, where either would throw.
const render = (props: Record<string, unknown>) =>
  renderToString(createSSRApp({ render: () => h(VueStarRate, props) }));

const renderTwoRatings = (props: Record<string, unknown>) =>
  renderToString(
    createSSRApp({
      render: () => h('div', [h(VueStarRate, props), h(VueStarRate, props)]),
    }),
  );

const gradientIds = (html: string): string[] => [...html.matchAll(/<linearGradient id="([^"]+)"/g)].map((m) => m[1]!);

describe('server-side rendering', () => {
  it('runs in an environment without window or document', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it.each([
    ['custom (default)', {}, '<svg'],
    ['lucide', { iconProvider: 'lucide' }, 'class="lucide lucide-star-icon lucide-star"'],
    ['fontawesome', { iconProvider: 'fontawesome' }, 'fa-regular fa-star'],
  ])('renders five stars with the %s provider', async (_name, props, marker) => {
    const html = await render({ modelValue: 3, ...props });

    expect(html.match(/<button/g)).toHaveLength(5);
    expect(html).toContain(marker);
    expect(html).not.toContain('undefined');
  });

  it.each([
    ['custom (default)', {}],
    ['lucide', { iconProvider: 'lucide' }],
  ])('half star (%s provider): the fill references the gradient it defines', async (_name, props) => {
    const html = await render({ modelValue: 2.5, allowHalf: true, ...props });

    const [id, ...others] = gradientIds(html);
    expect(id).toMatch(/^vsr-half-/);
    expect(others).toEqual([]);
    expect(html).toContain(`fill="url(#${id})"`);
  });

  // Hydration needs the client to compute the same ids as the server. useId() guarantees it; a module
  // counter or Math.random() would not. Rendering the same tree in two fresh apps must give the same HTML.
  it('gradient ids are the same in two independent renders (what hydration relies on)', async () => {
    const first = await renderTwoRatings({ modelValue: 3.5, allowHalf: true });
    const second = await renderTwoRatings({ modelValue: 3.5, allowHalf: true });

    expect(second).toBe(first);
    const ids = gradientIds(first);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});
