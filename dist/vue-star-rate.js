import { defineComponent as A, computed as v, useId as Y, openBlock as p, createElementBlock as S, createElementVNode as b, createCommentVNode as T, normalizeStyle as ee, normalizeClass as X, toValue as u, ref as V, watch as se, useModel as ue, useTemplateRef as de, unref as y, Fragment as ce, renderList as fe, createBlock as U, renderSlot as W, createTextVNode as ve, toDisplayString as he, mergeModels as Q } from "vue";
const me = { class: "lucide-icon-wrapper" }, pe = ["width", "height", "fill", "stroke", "stroke-width"], ye = { key: 0 }, ge = ["stop-color"], be = "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", we = /* @__PURE__ */ A({
  __name: "LucideIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" },
    strokeWidth: { default: 2 },
    index: { default: 0 }
  },
  setup(e) {
    /*!
     * The star path in this file is the `star` icon from Lucide (https://lucide.dev), used under the
     * ISC license. The full license text is in THIRD-PARTY-NOTICES.md.
     *
     * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
     * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
     *
     * Permission to use, copy, modify, and/or distribute this software for any purpose with or without
     * fee is hereby granted, provided that the above copyright notice and this permission notice appear
     * in all copies.
     */
    const l = e, d = v(() => typeof l.size == "number" ? { width: l.size, height: l.size } : l.size), i = v(() => l.filled || l.half ? l.color : l.emptyColor), f = `vsr-half-${Y()}`, w = v(() => l.filled ? l.color : l.half ? `url(#${f})` : "none");
    return (z, t) => (p(), S("span", me, [
      (p(), S("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        class: "lucide lucide-star-icon lucide-star",
        width: d.value.width,
        height: d.value.height,
        viewBox: "0 0 24 24",
        fill: w.value,
        stroke: i.value,
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": "true"
      }, [
        e.half ? (p(), S("defs", ye, [
          b("linearGradient", { id: f }, [
            b("stop", {
              offset: "50%",
              "stop-color": e.color
            }, null, 8, ge),
            t[0] || (t[0] = b("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ])
        ])) : T("", !0),
        b("path", { d: be })
      ], 8, pe))
    ]));
  }
}), F = (e, l) => {
  const d = e.__vccOpts || e;
  for (const [i, f] of l)
    d[i] = f;
  return d;
}, xe = /* @__PURE__ */ F(we, [["__scopeId", "data-v-6e861386"]]), Se = /* @__PURE__ */ A({
  __name: "FontAwesomeIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" },
    iconEmpty: { default: "fa-regular fa-star" },
    iconFilled: { default: "fa-solid fa-star" },
    iconHalf: { default: "fa-solid fa-star-half-stroke" }
  },
  setup(e) {
    const l = e, d = v(() => typeof l.size == "number" ? { width: l.size, height: l.size } : l.size), i = v(() => l.half ? l.iconHalf : l.filled ? l.iconFilled : l.iconEmpty), f = v(() => l.filled || l.half ? l.color : l.emptyColor), w = v(() => ({
      fontSize: `${d.value.width}px`,
      color: f.value,
      width: `${d.value.width}px`,
      height: `${d.value.height}px`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }));
    return (z, t) => (p(), S("span", {
      class: "fa-icon-wrapper",
      style: ee(w.value)
    }, [
      b("i", {
        class: X(i.value)
      }, null, 2)
    ], 4));
  }
}), ke = /* @__PURE__ */ F(Se, [["__scopeId", "data-v-cab526cc"]]), ze = { class: "svg-icon-wrapper" }, Re = ["width", "height"], Ce = { key: 0 }, $e = ["stop-color"], Le = ["stroke", "fill"], Be = /* @__PURE__ */ A({
  __name: "SvgIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" },
    index: { default: 0 }
  },
  setup(e) {
    const l = e, d = v(() => typeof l.size == "number" ? { width: l.size, height: l.size } : l.size), i = v(() => l.filled || l.half ? l.color : l.emptyColor), f = `vsr-half-${Y()}`, w = v(() => l.half ? `url(#${f})` : l.filled ? l.color : "none");
    return (z, t) => (p(), S("span", ze, [
      (p(), S("svg", {
        width: d.value.width,
        height: d.value.height,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        e.half ? (p(), S("defs", Ce, [
          b("linearGradient", { id: f }, [
            b("stop", {
              offset: "50%",
              "stop-color": e.color
            }, null, 8, $e),
            t[0] || (t[0] = b("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ])
        ])) : T("", !0),
        b("path", {
          d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
          stroke: i.value,
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: w.value
        }, null, 8, Le)
      ], 8, Re))
    ]));
  }
}), Ie = /* @__PURE__ */ F(Be, [["__scopeId", "data-v-9addabd2"]]);
function Ve(e, l) {
  const d = u(e.modelValue) ?? 0, i = V(d), f = V(null), w = V(!1), z = V(!1), t = V(d), C = v(() => w.value && f.value !== null ? f.value : i.value), g = v(() => {
    const o = [], s = C.value, m = u(e.maxStars), h = u(e.allowHalf);
    for (let c = 1; c <= m; c++) {
      const x = c <= Math.floor(s), B = h && !x && c === Math.ceil(s) && s % 1 !== 0, H = c <= s || B && c === Math.ceil(s);
      o.push({ index: c - 1, value: c, filled: x, half: B, active: H });
    }
    return o;
  }), $ = () => {
    if (u(e.allowHalf)) return 0.5;
    const o = u(e.step);
    return Number.isFinite(o) && o > 0 ? o : 1;
  }, k = (o) => {
    const s = u(e.minRating), m = u(e.maxStars), h = $();
    if (Number.isNaN(o)) return s;
    if (o >= m) return m;
    if (o <= s) return s;
    const c = Number((Math.round(o / h) * h).toPrecision(12));
    return Math.min(m, Math.max(s, c));
  }, D = (o) => {
    if (u(e.readonly) || u(e.disabled)) return;
    const s = u(e.minRating), m = u(e.allowReset);
    let h;
    m && i.value === o ? h = s : h = k(o);
    const c = i.value;
    h !== c && (i.value = h, l("update:modelValue", h), l("change", h, c));
  }, P = (o) => {
    u(e.readonly) || u(e.disabled) || (w.value = !0, f.value = k(o), l("hover", f.value));
  }, R = () => {
    u(e.readonly) || u(e.disabled) || (w.value = !1, f.value = null, l("hover", null));
  }, L = (o) => {
    if (u(e.readonly) || u(e.disabled) || o.ctrlKey || o.altKey || o.metaKey) return;
    const { key: s } = o, m = $(), h = u(e.maxStars), c = u(e.minRating);
    let x;
    switch (s) {
      case "ArrowRight":
      case "ArrowUp":
        o.preventDefault(), x = Math.min(h, i.value + m);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        o.preventDefault(), x = Math.max(c, i.value - m);
        break;
      case "Home":
      case "0":
        o.preventDefault(), x = c;
        break;
      case "End":
        o.preventDefault(), x = h;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        const B = Number.parseInt(s, 10);
        if (B > h) return;
        o.preventDefault(), x = B;
        break;
      }
      default:
        return;
    }
    M(x);
  }, _ = () => {
    const o = i.value;
    i.value = t.value, o !== t.value && (l("update:modelValue", t.value), l("change", t.value, o));
  }, M = (o) => {
    const s = k(o), m = i.value;
    s !== m && (i.value = s, l("update:modelValue", s), l("change", s, m));
  }, E = () => i.value, K = (o) => {
    z.value = o, l(o ? "focus" : "blur");
  };
  return se(
    () => u(e.modelValue),
    (o) => {
      o !== void 0 && o !== i.value && (i.value = k(o));
    }
  ), {
    internalRating: i,
    hoverRating: f,
    isHovering: w,
    isFocused: z,
    stars: g,
    displayRating: C,
    handleClick: D,
    handleMouseEnter: P,
    handleMouseLeave: R,
    handleKeyDown: L,
    reset: _,
    setRating: M,
    getRating: E,
    setFocused: K
  };
}
const Me = ["aria-label", "aria-disabled", "tabindex"], He = ["disabled", "aria-label", "aria-pressed", "title", "onClick", "onMousemove"], Ne = {
  key: 0,
  class: "vue-star-rate__counter",
  "aria-live": "polite"
}, Te = /* @__PURE__ */ A({
  __name: "VueStarRate",
  props: /* @__PURE__ */ Q({
    maxStars: { default: 5 },
    allowHalf: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    showCounter: { type: Boolean, default: !1 },
    counterTemplate: { default: "{value} / {max}" },
    iconProvider: { default: "custom" },
    iconSize: { default: void 0 },
    colors: {},
    gap: { default: 4 },
    animation: {},
    customIcon: {},
    showTooltip: { type: Boolean, default: !1 },
    tooltipLabels: {},
    allowReset: { type: Boolean, default: !0 },
    minRating: { default: 0 },
    step: { default: 1 },
    faIcons: {},
    rtl: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    inline: { type: Boolean, default: !1 },
    size: { default: "md" },
    className: {},
    ariaLabel: { default: "Star rating" }
  }, {
    modelValue: { default: 0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Q(["change", "hover", "focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: l, emit: d }) {
    const i = {
      empty: "#d1d5db",
      filled: "#fbbf24",
      hover: "#f59e0b",
      // Has its own default and does not follow `filled`.
      half: "#fbbf24"
    }, f = {
      enabled: !0,
      duration: 200,
      type: "scale"
    }, w = {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40
    }, z = ue(e, "modelValue"), t = e, C = d, g = v(() => ({
      ...i,
      ...t.colors
    })), $ = v(() => ({
      ...f,
      ...t.animation
    })), k = v(() => {
      if (typeof t.iconSize == "number")
        return { width: t.iconSize, height: t.iconSize };
      if (typeof t.iconSize == "object")
        return t.iconSize;
      const n = w[t.size] ?? 24;
      return { width: n, height: n };
    }), D = (n, ...r) => {
      n === "update:modelValue" ? z.value = r[0] : n === "change" ? C("change", r[0], r[1]) : n === "hover" ? C("hover", r[0]) : n === "focus" ? C("focus") : n === "blur" && C("blur");
    }, {
      stars: P,
      displayRating: R,
      isHovering: L,
      isFocused: _,
      handleClick: M,
      handleMouseEnter: E,
      handleMouseLeave: K,
      handleKeyDown: o,
      reset: s,
      setRating: m,
      getRating: h,
      setFocused: c
    } = Ve(
      {
        modelValue: z,
        // Ref<number> from defineModel — fully reactive
        maxStars: () => t.maxStars,
        allowHalf: () => t.allowHalf,
        readonly: () => t.readonly,
        disabled: () => t.disabled,
        allowReset: () => t.allowReset,
        minRating: () => t.minRating,
        step: () => t.step
      },
      D
    ), x = de("container"), B = v(() => t.counterTemplate.replace("{value}", R.value.toString()).replace("{max}", t.maxStars.toString())), H = (n) => {
      var a;
      const r = (a = t.tooltipLabels) == null ? void 0 : a[n];
      return r || `${n + 1} star${n === 0 ? "" : "s"}`;
    }, N = (n, r) => L.value ? g.value.hover : n ? g.value.filled : r ? g.value.half || g.value.filled : g.value.empty;
    let j = null, G = null;
    const Z = (n, r) => {
      if (!t.allowHalf) return n;
      const a = j ?? r.currentTarget.getBoundingClientRect();
      return (t.rtl ? r.clientX > a.left + a.width / 2 : r.clientX < a.left + a.width / 2) ? n - 0.5 : n;
    }, le = (n, r) => {
      t.readonly || t.disabled || M(r.detail === 0 ? n : Z(n, r));
    }, te = (n) => {
      t.readonly || t.disabled || !t.allowHalf || (j = n.currentTarget.getBoundingClientRect());
    }, ae = () => {
      j = null, G = null;
    }, oe = (n, r) => {
      if (t.readonly || t.disabled) return;
      const a = Z(n, r);
      a !== G && (G = a, E(a));
    }, ne = () => {
      m(t.minRating);
    };
    l({
      reset: s,
      setRating: m,
      getRating: h,
      focus: () => {
        var n;
        (n = x.value) == null || n.focus();
      },
      blur: () => {
        var n;
        (n = x.value) == null || n.blur();
      }
    });
    const re = v(() => [
      "vue-star-rate",
      `vue-star-rate--${t.size}`,
      {
        "vue-star-rate--readonly": t.readonly,
        "vue-star-rate--disabled": t.disabled,
        "vue-star-rate--hovering": L.value,
        "vue-star-rate--focused": _.value,
        "vue-star-rate--inline": t.inline,
        "vue-star-rate--rtl": t.rtl,
        "vue-star-rate--animated": $.value.enabled
      },
      t.className
    ]), ie = v(() => ({
      "--star-gap": `${t.gap}px`,
      "--star-color-empty": g.value.empty,
      "--star-color-filled": g.value.filled,
      "--star-color-hover": g.value.hover,
      "--animation-duration": `${$.value.duration}ms`
    }));
    return (n, r) => (p(), S("div", {
      ref: "container",
      class: X(re.value),
      style: ee(ie.value),
      role: "group",
      "aria-label": e.ariaLabel,
      "aria-disabled": e.disabled,
      tabindex: e.disabled ? -1 : 0,
      onKeydown: r[2] || (r[2] = //@ts-ignore
      (...a) => y(o) && y(o)(...a)),
      onFocus: r[3] || (r[3] = (a) => y(c)(!0)),
      onBlur: r[4] || (r[4] = (a) => y(c)(!1))
    }, [
      b("div", {
        class: "vue-star-rate__stars",
        onMouseleave: r[1] || (r[1] = (a) => {
          ae(), y(K)();
        })
      }, [
        (p(!0), S(ce, null, fe(y(P), (a) => {
          var O, q, J;
          return p(), S("button", {
            key: a.index,
            type: "button",
            class: X(["vue-star-rate__star", {
              "vue-star-rate__star--filled": a.filled,
              "vue-star-rate__star--half": a.half,
              "vue-star-rate__star--active": a.active,
              [`vue-star-rate__star--animation-${$.value.type}`]: $.value.enabled
            }]),
            disabled: e.disabled || e.readonly,
            "aria-label": H(a.index),
            "aria-pressed": a.active,
            title: e.showTooltip ? H(a.index) : void 0,
            onClick: (I) => le(a.value, I),
            onMouseenter: r[0] || (r[0] = (I) => te(I)),
            onMousemove: (I) => oe(a.value, I)
          }, [
            e.iconProvider === "lucide" ? (p(), U(xe, {
              key: 0,
              filled: a.filled || y(L) && a.value <= y(R),
              half: a.half,
              size: k.value,
              color: N(a.filled, a.half),
              "empty-color": g.value.empty
            }, null, 8, ["filled", "half", "size", "color", "empty-color"])) : e.iconProvider === "fontawesome" ? (p(), U(ke, {
              key: 1,
              filled: a.filled || y(L) && a.value <= y(R),
              half: a.half,
              size: k.value,
              color: N(a.filled, a.half),
              "empty-color": g.value.empty,
              "icon-empty": (O = e.faIcons) == null ? void 0 : O.empty,
              "icon-filled": (q = e.faIcons) == null ? void 0 : q.filled,
              "icon-half": (J = e.faIcons) == null ? void 0 : J.half
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "icon-empty", "icon-filled", "icon-half"])) : e.iconProvider === "custom" && n.$slots.icon ? W(n.$slots, "icon", {
              key: 2,
              filled: a.filled,
              half: a.half,
              size: k.value,
              color: N(a.filled, a.half),
              index: a.index
            }, void 0, !0) : (p(), U(Ie, {
              key: 3,
              filled: a.filled || y(L) && a.value <= y(R),
              half: a.half,
              size: k.value,
              color: N(a.filled, a.half),
              "empty-color": g.value.empty
            }, null, 8, ["filled", "half", "size", "color", "empty-color"]))
          ], 42, He);
        }), 128))
      ], 32),
      e.showCounter ? (p(), S("span", Ne, [
        W(n.$slots, "counter", {
          value: y(R),
          max: e.maxStars
        }, () => [
          ve(he(B.value), 1)
        ], !0)
      ])) : T("", !0),
      e.clearable && y(R) > e.minRating && !e.readonly && !e.disabled ? (p(), S("button", {
        key: 1,
        type: "button",
        class: "vue-star-rate__clear",
        "aria-label": "Clear rating",
        onClick: ne
      }, [
        W(n.$slots, "clear", {}, () => [
          r[5] || (r[5] = b("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            b("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            b("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1))
        ], !0)
      ])) : T("", !0)
    ], 46, Me));
  }
}), Ae = /* @__PURE__ */ F(Te, [["__scopeId", "data-v-b2943f02"]]);
/**
 * Vue Star Rate
 * A highly customizable star rating component for Vue 3
 * 
 * @author Pooya Golchian
 * @license MIT
 */
const _e = {
  install(e, l = {}) {
    const d = l.componentName || "VueStarRate";
    e.component(d, Ae), (l.defaultIconProvider || l.defaultColors || l.defaultAnimation) && e.provide("vueStarRateOptions", l);
  }
};
export {
  ke as FontAwesomeIcon,
  xe as LucideIcon,
  Ie as SvgIcon,
  Ae as VueStarRate,
  _e as VueStarRatePlugin,
  _e as default,
  Ve as useStarRating
};
//# sourceMappingURL=vue-star-rate.js.map
