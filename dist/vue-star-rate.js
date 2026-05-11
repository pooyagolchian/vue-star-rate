import { defineComponent as T, defineAsyncComponent as U, computed as f, openBlock as g, createElementBlock as z, createElementVNode as x, createCommentVNode as F, createVNode as de, unref as h, normalizeStyle as le, normalizeClass as Z, toValue as d, ref as _, watch as ce, useModel as fe, useTemplateRef as ve, Fragment as me, renderList as he, createBlock as W, renderSlot as X, createTextVNode as ye, toDisplayString as pe, mergeModels as ee } from "vue";
const ge = { class: "lucide-icon-wrapper" }, be = {
  key: 0,
  width: 0,
  height: 0,
  style: { position: "absolute", visibility: "hidden" }
}, we = ["id"], xe = ["stop-color"], Se = /* @__PURE__ */ T({
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
    const l = U(
      () => import("lucide-vue-next").then((b) => b.Star)
    ), r = e, s = f(() => typeof r.size == "number" ? { width: r.size, height: r.size } : r.size), y = f(() => r.filled || r.half ? r.color : r.emptyColor), S = f(() => r.filled ? r.color : r.half ? `url(#half-gradient-lucide-${r.index})` : "none"), $ = f(() => `half-gradient-lucide-${r.index}`);
    return (b, V) => (g(), z("span", ge, [
      e.half ? (g(), z("svg", be, [
        x("defs", null, [
          x("linearGradient", { id: $.value }, [
            x("stop", {
              offset: "50%",
              "stop-color": e.color
            }, null, 8, xe),
            V[0] || (V[0] = x("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, we)
        ])
      ])) : F("", !0),
      de(h(l), {
        size: s.value.width,
        color: y.value,
        fill: S.value,
        "stroke-width": e.strokeWidth
      }, null, 8, ["size", "color", "fill", "stroke-width"])
    ]));
  }
}), P = (e, l) => {
  const r = e.__vccOpts || e;
  for (const [s, y] of l)
    r[s] = y;
  return r;
}, ze = /* @__PURE__ */ P(Se, [["__scopeId", "data-v-ca6e5d3f"]]), Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ze
}, Symbol.toStringTag, { value: "Module" })), ke = /* @__PURE__ */ T({
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
    const l = e, r = f(() => typeof l.size == "number" ? { width: l.size, height: l.size } : l.size), s = f(() => l.half ? l.iconHalf : l.filled ? l.iconFilled : l.iconEmpty), y = f(() => l.filled || l.half ? l.color : l.emptyColor), S = f(() => ({
      fontSize: `${r.value.width}px`,
      color: y.value,
      width: `${r.value.width}px`,
      height: `${r.value.height}px`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }));
    return ($, b) => (g(), z("span", {
      class: "fa-icon-wrapper",
      style: le(S.value)
    }, [
      x("i", {
        class: Z(s.value)
      }, null, 2)
    ], 4));
  }
}), Ce = /* @__PURE__ */ P(ke, [["__scopeId", "data-v-cab526cc"]]), $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ce
}, Symbol.toStringTag, { value: "Module" })), Ve = { class: "svg-icon-wrapper" }, Ie = ["width", "height"], Le = { key: 0 }, Me = ["id"], Be = ["stop-color"], He = ["stroke", "fill"], _e = /* @__PURE__ */ T({
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
    const l = e, r = f(() => typeof l.size == "number" ? { width: l.size, height: l.size } : l.size), s = f(() => l.filled || l.half ? l.color : l.emptyColor), y = f(() => l.half ? `url(#half-gradient-${l.index})` : l.filled ? l.color : "none"), S = f(() => `half-gradient-${l.index}`);
    return ($, b) => (g(), z("span", Ve, [
      (g(), z("svg", {
        width: r.value.width,
        height: r.value.height,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        e.half ? (g(), z("defs", Le, [
          x("linearGradient", { id: S.value }, [
            x("stop", {
              offset: "50%",
              "stop-color": e.color
            }, null, 8, Be),
            b[0] || (b[0] = x("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, Me)
        ])) : F("", !0),
        x("path", {
          d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
          stroke: s.value,
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: y.value
        }, null, 8, He)
      ], 8, Ie))
    ]));
  }
}), Ae = /* @__PURE__ */ P(_e, [["__scopeId", "data-v-558cdd76"]]);
function Fe(e, l) {
  const r = d(e.modelValue) ?? 0, s = _(r), y = _(null), S = _(!1), $ = _(!1), b = _(r), V = f(() => S.value && y.value !== null ? y.value : s.value), a = f(() => {
    const n = [], v = V.value, p = d(e.maxStars), m = d(e.allowHalf);
    for (let u = 1; u <= p; u++) {
      const c = u <= Math.floor(v), k = m && !c && u === Math.ceil(v) && v % 1 !== 0, C = u <= v || k && u === Math.ceil(v);
      n.push({ index: u - 1, value: u, filled: c, half: k, active: C });
    }
    return n;
  }), R = (n) => {
    const v = d(e.minRating), p = d(e.maxStars), m = d(e.allowHalf), u = d(e.step);
    let c = Math.max(v, Math.min(p, n));
    return !m && u === 1 ? c = Math.round(c) : m ? c = Math.round(c * 2) / 2 : c = Math.round(c / u) * u, c;
  }, w = (n) => {
    if (d(e.readonly) || d(e.disabled)) return;
    const v = d(e.minRating), p = d(e.allowReset);
    let m;
    p && s.value === n ? m = v : m = R(n);
    const u = s.value;
    m !== u && (s.value = m, l("update:modelValue", m), l("change", m, u));
  }, M = (n) => {
    d(e.readonly) || d(e.disabled) || (S.value = !0, y.value = R(n), l("hover", y.value));
  }, B = () => {
    d(e.readonly) || d(e.disabled) || (S.value = !1, y.value = null, l("hover", null));
  }, D = () => d(e.allowHalf) ? 0.5 : d(e.step), N = (n) => {
    if (d(e.readonly) || d(e.disabled)) return;
    const { key: v } = n, p = D(), m = d(e.maxStars), u = d(e.minRating);
    let c = s.value;
    switch (v) {
      case "ArrowRight":
      case "ArrowUp":
        n.preventDefault(), c = Math.min(m, s.value + p);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        n.preventDefault(), c = Math.max(u, s.value - p);
        break;
      case "Home":
        n.preventDefault(), c = u;
        break;
      case "End":
        n.preventDefault(), c = m;
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
        const C = Number.parseInt(v, 10);
        C <= m && (n.preventDefault(), c = C);
        break;
      }
      case "0":
        n.preventDefault(), c = u;
        break;
    }
    const k = R(c);
    if (k !== s.value) {
      const C = s.value;
      s.value = k, l("update:modelValue", k), l("change", k, C);
    }
  }, I = () => {
    const n = s.value;
    s.value = b.value, n !== b.value && (l("update:modelValue", b.value), l("change", b.value, n));
  }, L = (n) => {
    const v = R(n), p = s.value;
    v !== p && (s.value = v, l("update:modelValue", v), l("change", v, p));
  }, E = () => s.value, j = (n) => {
    $.value = n, l(n ? "focus" : "blur");
  };
  return ce(
    () => d(e.modelValue),
    (n) => {
      n !== void 0 && n !== s.value && (s.value = R(n));
    }
  ), {
    internalRating: s,
    hoverRating: y,
    isHovering: S,
    isFocused: $,
    stars: a,
    displayRating: V,
    handleClick: w,
    handleMouseEnter: M,
    handleMouseLeave: B,
    handleKeyDown: N,
    reset: I,
    setRating: L,
    getRating: E,
    setFocused: j
  };
}
const Te = ["aria-label", "aria-readonly", "aria-disabled", "tabindex"], Pe = ["disabled", "aria-label", "aria-pressed", "title", "onClick", "onMousemove"], De = {
  key: 0,
  class: "vue-star-rate__counter",
  "aria-live": "polite"
}, Ne = /* @__PURE__ */ T({
  __name: "VueStarRate",
  props: /* @__PURE__ */ ee({
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
  emits: /* @__PURE__ */ ee(["change", "hover", "focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: l, emit: r }) {
    const s = U(() => Promise.resolve().then(() => Re)), y = U(() => Promise.resolve().then(() => $e)), S = {
      empty: "#d1d5db",
      filled: "#fbbf24",
      hover: "#f59e0b",
      half: "#fbbf24"
    }, $ = {
      enabled: !0,
      duration: 200,
      type: "scale"
    }, b = {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40
    }, V = fe(e, "modelValue"), a = e, R = r, w = f(() => ({
      ...S,
      ...a.colors
    })), M = f(() => ({
      ...$,
      ...a.animation
    })), B = f(() => {
      if (typeof a.iconSize == "number")
        return { width: a.iconSize, height: a.iconSize };
      if (typeof a.iconSize == "object")
        return a.iconSize;
      const o = b[a.size] ?? 24;
      return { width: o, height: o };
    }), D = (o, ...i) => {
      o === "update:modelValue" ? V.value = i[0] : o === "change" ? R("change", i[0], i[1]) : o === "hover" ? R("hover", i[0]) : o === "focus" ? R("focus") : o === "blur" && R("blur");
    }, {
      stars: N,
      displayRating: I,
      isHovering: L,
      isFocused: E,
      handleClick: j,
      handleMouseEnter: n,
      handleMouseLeave: v,
      handleKeyDown: p,
      reset: m,
      setRating: u,
      getRating: c,
      setFocused: k
    } = Fe(
      {
        modelValue: V,
        // Ref<number> from defineModel — fully reactive
        maxStars: () => a.maxStars,
        allowHalf: () => a.allowHalf,
        readonly: () => a.readonly,
        disabled: () => a.disabled,
        allowReset: () => a.allowReset,
        minRating: () => a.minRating,
        step: () => a.step
      },
      D
    ), C = ve("container"), te = f(() => a.counterTemplate.replace("{value}", I.value.toString()).replace("{max}", a.maxStars.toString())), q = (o) => {
      var t;
      const i = (t = a.tooltipLabels) == null ? void 0 : t[o];
      return i || `${o + 1} star${o === 0 ? "" : "s"}`;
    }, A = (o, i) => L.value ? w.value.hover : o ? w.value.filled : i ? w.value.half || w.value.filled : w.value.empty;
    let O = null, K = null;
    const J = (o, i) => {
      if (!a.allowHalf) return o;
      const t = O ?? i.currentTarget.getBoundingClientRect();
      return (a.rtl ? i.clientX > t.left + t.width / 2 : i.clientX < t.left + t.width / 2) ? o - 0.5 : o;
    }, ae = (o, i) => {
      a.readonly || a.disabled || j(J(o, i));
    }, oe = (o) => {
      a.readonly || a.disabled || !a.allowHalf || (O = o.currentTarget.getBoundingClientRect());
    }, ne = () => {
      O = null, K = null;
    }, re = (o, i) => {
      if (a.readonly || a.disabled) return;
      const t = J(o, i);
      t !== K && (K = t, n(t));
    }, ie = () => {
      (a.allowReset || a.clearable) && u(a.minRating);
    };
    l({
      reset: m,
      setRating: u,
      getRating: c,
      focus: () => {
        var o;
        (o = C.value) == null || o.focus();
      },
      blur: () => {
        var o;
        (o = C.value) == null || o.blur();
      }
    });
    const se = f(() => [
      "vue-star-rate",
      `vue-star-rate--${a.size}`,
      {
        "vue-star-rate--readonly": a.readonly,
        "vue-star-rate--disabled": a.disabled,
        "vue-star-rate--hovering": L.value,
        "vue-star-rate--focused": E.value,
        "vue-star-rate--inline": a.inline,
        "vue-star-rate--rtl": a.rtl,
        "vue-star-rate--animated": M.value.enabled
      },
      a.className
    ]), ue = f(() => ({
      "--star-gap": `${a.gap}px`,
      "--star-color-empty": w.value.empty,
      "--star-color-filled": w.value.filled,
      "--star-color-hover": w.value.hover,
      "--animation-duration": `${M.value.duration}ms`
    }));
    return (o, i) => (g(), z("div", {
      ref: "container",
      class: Z(se.value),
      style: le(ue.value),
      role: "group",
      "aria-label": e.ariaLabel,
      "aria-readonly": e.readonly,
      "aria-disabled": e.disabled,
      tabindex: e.disabled ? -1 : 0,
      onKeydown: i[2] || (i[2] = //@ts-ignore
      (...t) => h(p) && h(p)(...t)),
      onFocus: i[3] || (i[3] = (t) => h(k)(!0)),
      onBlur: i[4] || (i[4] = (t) => h(k)(!1))
    }, [
      x("div", {
        class: "vue-star-rate__stars",
        onMouseleave: i[1] || (i[1] = (t) => {
          ne(), h(v)();
        })
      }, [
        (g(!0), z(me, null, he(h(N), (t) => {
          var G, Q, Y;
          return g(), z("button", {
            key: t.index,
            type: "button",
            class: Z(["vue-star-rate__star", {
              "vue-star-rate__star--filled": t.filled,
              "vue-star-rate__star--half": t.half,
              "vue-star-rate__star--active": t.active,
              [`vue-star-rate__star--animation-${M.value.type}`]: M.value.enabled
            }]),
            disabled: e.disabled || e.readonly,
            "aria-label": q(t.index),
            "aria-pressed": t.active,
            title: e.showTooltip ? q(t.index) : void 0,
            onClick: (H) => ae(t.value, H),
            onMouseenter: i[0] || (i[0] = (H) => oe(H)),
            onMousemove: (H) => re(t.value, H)
          }, [
            e.iconProvider === "lucide" ? (g(), W(h(s), {
              key: 0,
              filled: t.filled || h(L) && t.value <= h(I),
              half: t.half,
              size: B.value,
              color: A(t.filled, t.half),
              "empty-color": w.value.empty,
              index: t.index
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "index"])) : e.iconProvider === "fontawesome" ? (g(), W(h(y), {
              key: 1,
              filled: t.filled || h(L) && t.value <= h(I),
              half: t.half,
              size: B.value,
              color: A(t.filled, t.half),
              "empty-color": w.value.empty,
              "icon-empty": (G = e.faIcons) == null ? void 0 : G.empty,
              "icon-filled": (Q = e.faIcons) == null ? void 0 : Q.filled,
              "icon-half": (Y = e.faIcons) == null ? void 0 : Y.half
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "icon-empty", "icon-filled", "icon-half"])) : e.iconProvider === "custom" && o.$slots.icon ? X(o.$slots, "icon", {
              key: 2,
              filled: t.filled,
              half: t.half,
              size: B.value,
              color: A(t.filled, t.half),
              index: t.index
            }, void 0, !0) : (g(), W(Ae, {
              key: 3,
              filled: t.filled || h(L) && t.value <= h(I),
              half: t.half,
              size: B.value,
              color: A(t.filled, t.half),
              "empty-color": w.value.empty,
              index: t.index
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "index"]))
          ], 42, Pe);
        }), 128))
      ], 32),
      e.showCounter ? (g(), z("span", De, [
        X(o.$slots, "counter", {
          value: h(I),
          max: e.maxStars
        }, () => [
          ye(pe(te.value), 1)
        ], !0)
      ])) : F("", !0),
      e.clearable && h(I) > e.minRating && !e.readonly && !e.disabled ? (g(), z("button", {
        key: 1,
        type: "button",
        class: "vue-star-rate__clear",
        "aria-label": "Clear rating",
        onClick: ie
      }, [
        X(o.$slots, "clear", {}, () => [
          i[5] || (i[5] = x("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            x("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            x("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1))
        ], !0)
      ])) : F("", !0)
    ], 46, Te));
  }
}), Ee = /* @__PURE__ */ P(Ne, [["__scopeId", "data-v-f42e6244"]]);
/**
 * Vue Star Rate
 * A highly customizable star rating component for Vue 3
 * 
 * @author Pooya Golchian
 * @license MIT
 */
const Ge = {
  install(e, l = {}) {
    const r = l.componentName || "VueStarRate";
    e.component(r, Ee), (l.defaultIconProvider || l.defaultColors || l.defaultAnimation) && e.provide("vueStarRateOptions", l);
  }
};
export {
  Ce as FontAwesomeIcon,
  ze as LucideIcon,
  Ae as SvgIcon,
  Ee as VueStarRate,
  Ge as VueStarRatePlugin,
  Ge as default,
  Fe as useStarRating
};
//# sourceMappingURL=vue-star-rate.js.map
