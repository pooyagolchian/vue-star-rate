// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { findFocusRingRemovals, hasRootFocusRing, parseRules } from './helpers/focusRing';

// The stylesheet guard in consumer-build.spec.ts is only worth something if it goes red on every way
// of hiding the focus ring and stays green on the idioms that keep it. These fixtures prove both.
describe('focus ring guard: the checker itself', () => {
  it.each([
    ['the 3.1.0 rule', '.vue-star-rate__star[data-v-1]:focus{outline:none}'],
    ['outline on :focus-visible', '.vue-star-rate__star[data-v-1]:focus-visible{outline:none}'],
    ['outline removed in every state', '.vue-star-rate__star[data-v-1]{outline:none}'],
    ['outline: 0', '.vue-star-rate__star:focus{outline:0}'],
    ['outline: 0px', '.vue-star-rate__star:focus{outline:0px}'],
    ['outline-style: none', '.vue-star-rate__star:focus{outline-style:none}'],
    ['outline-width: 0', '.vue-star-rate__star:focus{outline-width:0}'],
    ['all: unset', '.vue-star-rate__star:focus{all:unset}'],
    ['!important', '.vue-star-rate__star:focus{outline:none!important}'],
    ['a state modifier class', '.vue-star-rate__star--filled[data-v-1]:focus{outline:none}'],
    ['a selector list', '.vue-star-rate__clear:focus,.vue-star-rate__star:focus{outline:none}'],
    ['a descendant selector', '.vue-star-rate__stars .vue-star-rate__star:focus-visible{outline:none}'],
    ['a focus-within ancestor', '.vue-star-rate__stars:focus-within .vue-star-rate__star{outline:none}'],
    ['inside @media', '@media (prefers-reduced-motion:no-preference){.vue-star-rate__star:focus{outline:none}}'],
    ['outline and box-shadow both removed', '.vue-star-rate__star:focus{outline:none;box-shadow:none}'],
  ])('flags %s', (_name, css) => {
    expect(findFocusRingRemovals(css)).toHaveLength(1);
  });

  it.each([
    ['a visible outline', '.vue-star-rate__star:focus-visible{outline:2px solid red}'],
    ['the mouse-only idiom', '.vue-star-rate__star:focus:not(:focus-visible){outline:none}'],
    ['a box-shadow ring instead of the outline', '.vue-star-rate__star:focus-visible{outline:none;box-shadow:0 0 0 2px red}'],
    ['a hover rule', '.vue-star-rate__star:hover{outline:none}'],
    ['a disabled rule', '.vue-star-rate__star:disabled{outline:none}'],
    ['the container (not a button)', '.vue-star-rate__stars:focus{outline:none}'],
    ['the root element', '.vue-star-rate[data-v-1]:focus{outline:none}'],
    ['the clear button', '.vue-star-rate__clear:focus{outline:none}'],
    ['a keyframes step', '@keyframes star-pulse{0%{outline:none}}'],
    ['no outline at all', '.vue-star-rate__star:focus{color:red}'],
  ])('allows %s', (_name, css) => {
    expect(findFocusRingRemovals(css)).toEqual([]);
  });

  it('reports the offending rule', () => {
    const [offender] = findFocusRingRemovals('.vue-star-rate__star[data-v-1]:focus{outline:none}');
    expect(offender).toContain('.vue-star-rate__star[data-v-1]:focus');
    expect(offender).toContain('outline');
  });

  it('parses minified output: nested at-rules, several declarations, commas inside functions', () => {
    const rules = parseRules(
      '.a{color:red;background:url(data:image/svg+xml;base64,AAAA)}@media (x){.b,.c{outline:1px solid rgb(1,2,3)}}',
    );
    expect(rules.map((rule) => rule.selector)).toEqual(['.a', '.b,.c']);
    expect(rules[0]!.declarations.background).toBe('url(data:image/svg+xml;base64,AAAA)');
    expect(rules[1]!.declarations.outline).toBe('1px solid rgb(1,2,3)');
  });

  describe('hasRootFocusRing', () => {
    it('is true when the root draws a visible :focus-visible outline', () => {
      expect(hasRootFocusRing('.vue-star-rate[data-v-1]:focus-visible{outline:2px solid var(--c)}')).toBe(true);
    });

    it.each([
      ['no rule', '.vue-star-rate__star{color:red}'],
      ['an outline removed on the root', '.vue-star-rate:focus-visible{outline:none}'],
      ['a ring on another element', '.vue-star-rate__clear:focus-visible{outline:2px solid red}'],
    ])('is false for %s', (_name, css) => {
      expect(hasRootFocusRing(css)).toBe(false);
    });
  });
});
