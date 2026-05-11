/**
 * Regression test for https://github.com/pooyagolchian/vue-star-rate/issues/7 —
 * importing VueStarRate must not pull `lucide-vue-next` into the module graph
 * unless the consumer actually renders the Lucide icon provider.
 */
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';

describe('Issue #7 — optional peer isolation', () => {
  it('does not import lucide-vue-next when using fontawesome provider', async () => {
    const lucideMock = vi.fn(() => {
      throw new Error('lucide-vue-next must not be imported for non-lucide providers');
    });
    vi.doMock('lucide-vue-next', lucideMock);

    const { default: VueStarRate } = await import('@/components/VueStarRate.vue');
    const wrapper = mount(VueStarRate, {
      props: { iconProvider: 'fontawesome', modelValue: 3 },
    });
    await nextTick();

    expect(wrapper.find('.vue-star-rate').exists()).toBe(true);
    expect(lucideMock).not.toHaveBeenCalled();

    vi.doUnmock('lucide-vue-next');
  });

  it('does not import lucide-vue-next when using default svg provider', async () => {
    const lucideMock = vi.fn(() => {
      throw new Error('lucide-vue-next must not be imported for default svg provider');
    });
    vi.doMock('lucide-vue-next', lucideMock);

    const { default: VueStarRate } = await import('@/components/VueStarRate.vue');
    const wrapper = mount(VueStarRate, { props: { modelValue: 2 } });
    await nextTick();

    expect(wrapper.findAll('.vue-star-rate__star')).toHaveLength(5);
    expect(lucideMock).not.toHaveBeenCalled();

    vi.doUnmock('lucide-vue-next');
  });
});
