import VueStarRate from '@/components/VueStarRate.vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import axe from 'axe-core';
import { afterEach, describe, expect, it } from 'vitest';

let wrapper: VueWrapper | undefined;

afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
});

// happy-dom has no layout engine, so `color-contrast` (and `target-size`, off by default) cannot be
// evaluated here, and `region` is a page-level rule that means nothing for a single component.
// Everything else runs, which is what catches invalid ARIA such as `aria-readonly` on role="group".
//
// axe reports what it could not decide as `incomplete` (for example an `aria-describedby` that points
// at an id missing from the page). Those results are not violations, so they are checked too:
// nothing in these variants is allowed to be undecided.
async function axeProblems(el: Element): Promise<string[]> {
  const { violations, incomplete } = await axe.run(el, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
  });
  const format = (kind: string, results: typeof violations) =>
    results.map((v) => `${kind} ${v.id} [${v.impact}]: ${v.nodes.map((n) => n.failureSummary ?? n.html).join(' | ')}`);
  return [...format('violation', violations), ...format('incomplete', incomplete)];
}

const variants = {
  default: {},
  readonly: { readonly: true, modelValue: 3 },
  disabled: { disabled: true, modelValue: 3 },
  'clearable + counter': { clearable: true, showCounter: true, modelValue: 3 },
  'allowHalf 2.5': { allowHalf: true, modelValue: 2.5 },
  'lucide provider': { iconProvider: 'lucide', modelValue: 3 },
  'fontawesome provider': { iconProvider: 'fontawesome', modelValue: 3 },
} as const;

describe('accessibility (axe-core)', () => {
  it.each(Object.entries(variants))('%s: no axe violations and nothing undecided', async (_name, props) => {
    // axe needs the element to be in the document: a detached mount throws
    // "No elements found for include in page Context".
    wrapper = mount(VueStarRate, { props: { ...props }, attachTo: document.body });

    expect(await axeProblems(wrapper.element)).toEqual([]);
  });

  // Harness self-check: a dangling ARIA reference is only reported as `incomplete`, never as a violation.
  it('harness self-check: a dangling aria-describedby is caught', async () => {
    wrapper = mount(VueStarRate, {
      props: { modelValue: 3 },
      attrs: { 'aria-describedby': 'vsr-missing' },
      attachTo: document.body,
    });

    expect((await axeProblems(wrapper.element)).join('\n')).toContain('aria-valid-attr-value');
  });
});
