import VueStarRate from '@/components/VueStarRate.vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSSRApp, h, type Component } from 'vue';
import { renderToString } from 'vue/server-renderer';

// Server-rendered HTML must hydrate without a single mismatch warning. The half-star gradient id is the
// one value that could differ between server and client; replacing useId() with a module counter or a
// random id makes Vue log "Hydration attribute mismatch" and this suite fail.
const twoRatings = (props: Record<string, unknown>): Component => ({
  render: () => h('div', [h(VueStarRate, props), h(VueStarRate, props)]),
});

let container: HTMLElement | undefined;

afterEach(() => {
  container?.remove();
  container = undefined;
  vi.restoreAllMocks();
});

/** Render `component` on the "server", hydrate it in the DOM, and return what Vue logged. */
async function hydrate(component: Component): Promise<{ html: string; logged: string[] }> {
  const html = await renderToString(createSSRApp(component));
  container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const error = vi.spyOn(console, 'error').mockImplementation(() => {});
  createSSRApp(component).mount(container);

  return { html, logged: [...warn.mock.calls, ...error.mock.calls].map((args) => args.join(' ')) };
}

describe('hydration', () => {
  it.each([
    ['custom (default)', {}],
    ['lucide', { iconProvider: 'lucide' }],
    ['fontawesome', { iconProvider: 'fontawesome' }],
  ])('hydrates two half-star ratings without warnings (%s provider)', async (_name, props) => {
    const { html, logged } = await hydrate(twoRatings({ modelValue: 2.5, allowHalf: true, ...props }));

    expect(logged).toEqual([]);
    // Hydration adopts the server DOM: the gradient ids on the page are the ones the server wrote.
    const ids = (root: string) => [...root.matchAll(/<linearGradient id="([^"]+)"/g)].map((m) => m[1]);
    expect(ids(container!.innerHTML)).toEqual(ids(html));
  });

  it('harness self-check: an id that differs between server and client is reported', async () => {
    const unstable: Component = { render: () => h('i', { id: `random-${Math.random()}` }) };

    const { logged } = await hydrate(unstable);

    expect(logged.join('\n')).toMatch(/Hydration/);
  });
});
