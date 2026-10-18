/**
 * Static check of a built stylesheet for rules that take the keyboard focus indicator away from the
 * star buttons. happy-dom applies no CSS, so no component test can see such a rule: the shipped
 * stylesheet is the only place to look.
 *
 * The parser is deliberately small. It handles what a minified Vite build of this component emits
 * (style rules, `@media`, `@keyframes`), not CSS in general. tests/focusRingGuard.spec.ts runs it over
 * fixtures so the checker itself is proven to go red on each way of hiding the ring.
 */

export interface CssRule {
  selector: string;
  declarations: Record<string, string>;
}

/** Split on `separator`, ignoring separators inside (), [] and quotes. */
function splitTopLevel(text: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote = '';
  let current = '';
  for (const char of text) {
    if (quote) {
      if (char === quote) quote = '';
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '(' || char === '[') {
      depth++;
    } else if (char === ')' || char === ']') {
      depth--;
    } else if (char === separator && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  parts.push(current);
  return parts;
}

function parseDeclarations(body: string): Record<string, string> {
  const declarations: Record<string, string> = {};
  for (const declaration of splitTopLevel(body, ';')) {
    const colon = declaration.indexOf(':');
    if (colon === -1) continue;
    const property = declaration.slice(0, colon).trim().toLowerCase();
    const value = declaration
      .slice(colon + 1)
      .replace(/!important/i, '')
      .trim();
    if (property) declarations[property] = value;
  }
  return declarations;
}

/** Flatten a stylesheet into style rules. `@media` and friends are looked through, `@keyframes` is skipped. */
export function parseRules(css: string): CssRule[] {
  const rules: CssRule[] = [];
  const preludes: string[] = [];
  let buffer = '';
  for (const char of css) {
    if (char === '{') {
      preludes.push(buffer.trim());
      buffer = '';
    } else if (char === '}') {
      const prelude = preludes.pop() ?? '';
      const inKeyframes = preludes.some((outer) => /^@(-[a-z]+-)?keyframes/i.test(outer));
      if (buffer.trim() && !prelude.startsWith('@') && !inKeyframes) {
        rules.push({ selector: prelude, declarations: parseDeclarations(buffer) });
      }
      buffer = '';
    } else {
      buffer += char;
    }
  }
  return rules;
}

/** The compound selector the rule is about: `.a .b:hover` -> `.b:hover`. */
function subject(selector: string): string {
  const trimmed = selector.trim();
  let depth = 0;
  for (let i = trimmed.length - 1; i >= 0; i--) {
    const char = trimmed[i]!;
    if (char === ')' || char === ']') depth++;
    else if (char === '(' || char === '[') depth--;
    else if (depth === 0 && /[\s>+~]/.test(char)) return trimmed.slice(i + 1);
  }
  return trimmed;
}

const ZERO_WIDTH = /^0(px|em|rem)?$/i;

/** True when the declarations switch the outline off (and nothing else, such as a box-shadow, replaces it). */
function removesOutline(declarations: Record<string, string>): boolean {
  const outline = declarations.outline?.split(/\s+/) ?? [];
  const removed =
    outline.some((token) => /^(none|hidden)$/i.test(token) || ZERO_WIDTH.test(token)) ||
    /^(none|hidden)$/i.test(declarations['outline-style'] ?? '') ||
    ZERO_WIDTH.test(declarations['outline-width'] ?? '') ||
    /^(unset|initial)$/i.test(declarations.all ?? '');
  const replacedByShadow = !!declarations['box-shadow'] && !/^none$/i.test(declarations['box-shadow']);
  return removed && !replacedByShadow;
}

const FOCUS_STATE = /:focus(?:-visible|-within)?(?![\w-])/;
const OTHER_STATE = /:(?:hover|active|disabled)(?![\w-])/;
const MOUSE_FOCUS_ONLY = /:not\(\s*:focus-visible\s*\)/;
const STAR_BUTTON = /\.vue-star-rate__star(?![\w])/;
const ROOT = /\.vue-star-rate(?![\w-])/;

/**
 * Rules that remove the outline of a star button while it can be keyboard-focused: a focus state
 * (`:focus`, `:focus-visible`, `:focus-within`) or no state at all. `:focus:not(:focus-visible)` is the
 * standard idiom for hiding the ring on mouse focus only, and `:hover`/`:active`/`:disabled` rules do
 * not apply to a keyboard-focused enabled star, so those are allowed.
 */
export function findFocusRingRemovals(css: string): string[] {
  const offenders: string[] = [];
  for (const { selector, declarations } of parseRules(css)) {
    if (!removesOutline(declarations)) continue;
    for (const part of splitTopLevel(selector, ',')) {
      const compound = subject(part);
      if (!STAR_BUTTON.test(compound) || MOUSE_FOCUS_ONLY.test(compound)) continue;
      if (FOCUS_STATE.test(compound) || !OTHER_STATE.test(compound)) {
        offenders.push(`${part.trim()} { ${JSON.stringify(declarations)} }`);
      }
    }
  }
  return offenders;
}

/** True when the root element gets a visible `:focus-visible` outline (the ring the component draws itself). */
export function hasRootFocusRing(css: string): boolean {
  return parseRules(css).some(({ selector, declarations }) =>
    splitTopLevel(selector, ',').some((part) => {
      const compound = subject(part);
      return ROOT.test(compound) && /:focus-visible/.test(compound) && !!declarations.outline && !removesOutline(declarations);
    }),
  );
}
