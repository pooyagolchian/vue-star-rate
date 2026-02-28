import { defineComponent as A, computed as c, openBlock as b, createElementBlock as S, createElementVNode as x, createCommentVNode as _, createVNode as te, unref as m, normalizeStyle as q, normalizeClass as U, toValue as u, ref as M, watch as ae, useModel as oe, useTemplateRef as ne, Fragment as ie, renderList as re, createBlock as O, renderSlot as W, createTextVNode as se, toDisplayString as ue, mergeModels as Z } from "vue";
import { Star as de } from "lucide-vue-next";
const ce = { class: "lucide-icon-wrapper" }, fe = {
  key: 0,
  width: 0,
  height: 0,
  style: { position: "absolute", visibility: "hidden" }
}, ve = ["id"], he = ["stop-color"], me = /* @__PURE__ */ A({
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
  setup(l) {
    const e = l, v = c(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), i = c(() => e.filled || e.half ? e.color : e.emptyColor), t = c(() => e.filled ? e.color : e.half ? `url(#half-gradient-lucide-${e.index})` : "none"), p = c(() => `half-gradient-lucide-${e.index}`);
    return ($, w) => (b(), S("span", ce, [
      l.half ? (b(), S("svg", fe, [
        x("defs", null, [
          x("linearGradient", { id: p.value }, [
            x("stop", {
              offset: "50%",
              "stop-color": l.color
            }, null, 8, he),
            w[0] || (w[0] = x("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, ve)
        ])
      ])) : _("", !0),
      te(m(de), {
        size: v.value.width,
        color: i.value,
        fill: t.value,
        "stroke-width": l.strokeWidth
      }, null, 8, ["size", "color", "fill", "stroke-width"])
    ]));
  }
}), N = (l, e) => {
  const v = l.__vccOpts || l;
  for (const [i, t] of e)
    v[i] = t;
  return v;
}, pe = /* @__PURE__ */ N(me, [["__scopeId", "data-v-b5183b10"]]), ye = /* @__PURE__ */ A({
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
  setup(l) {
    const e = l, v = c(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), i = c(() => e.half ? e.iconHalf : e.filled ? e.iconFilled : e.iconEmpty), t = c(() => e.filled || e.half ? e.color : e.emptyColor), p = c(() => ({
      fontSize: `${v.value.width}px`,
      color: t.value,
      width: `${v.value.width}px`,
      height: `${v.value.height}px`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }));
    return ($, w) => (b(), S("span", {
      class: "fa-icon-wrapper",
      style: q(p.value)
    }, [
      x("i", {
        class: U(i.value)
      }, null, 2)
    ], 4));
  }
}), ge = /* @__PURE__ */ N(ye, [["__scopeId", "data-v-cab526cc"]]), be = { class: "svg-icon-wrapper" }, we = ["width", "height"], xe = { key: 0 }, ze = ["id"], Se = ["stop-color"], ke = ["stroke", "fill"], Re = /* @__PURE__ */ A({
  __name: "SvgIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" },
    index: { default: 0 }
  },
  setup(l) {
    const e = l, v = c(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), i = c(() => e.filled || e.half ? e.color : e.emptyColor), t = c(() => e.half ? `url(#half-gradient-${e.index})` : e.filled ? e.color : "none"), p = c(() => `half-gradient-${e.index}`);
    return ($, w) => (b(), S("span", be, [
      (b(), S("svg", {
        width: v.value.width,
        height: v.value.height,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        l.half ? (b(), S("defs", xe, [
          x("linearGradient", { id: p.value }, [
            x("stop", {
              offset: "50%",
              "stop-color": l.color
            }, null, 8, Se),
            w[0] || (w[0] = x("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, ze)
        ])) : _("", !0),
        x("path", {
          d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
          stroke: i.value,
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: t.value
        }, null, 8, ke)
      ], 8, we))
    ]));
  }
}), Ce = /* @__PURE__ */ N(Re, [["__scopeId", "data-v-558cdd76"]]);
function $e(l, e) {
  const v = u(l.modelValue) ?? 0, i = M(v), t = M(null), p = M(!1), $ = M(!1), w = M(v), y = c(() => p.value && t.value !== null ? t.value : i.value), B = c(() => {
    const o = [], f = y.value, g = u(l.maxStars), h = u(l.allowHalf);
    for (let s = 1; s <= g; s++) {
      const d = s <= Math.floor(f), k = h && !d && s === Math.ceil(f) && f % 1 !== 0, R = s <= f || k && s === Math.ceil(f);
      o.push({ index: s - 1, value: s, filled: d, half: k, active: R });
    }
    return o;
  }), V = (o) => {
    const f = u(l.minRating), g = u(l.maxStars), h = u(l.allowHalf), s = u(l.step);
    let d = Math.max(f, Math.min(g, o));
    return !h && s === 1 ? d = Math.round(d) : h ? d = Math.round(d * 2) / 2 : d = Math.round(d / s) * s, d;
  }, I = (o) => {
    if (u(l.readonly) || u(l.disabled)) return;
    const f = u(l.minRating), g = u(l.allowReset);
    let h;
    g && i.value === o ? h = f : h = V(o);
    const s = i.value;
    h !== s && (i.value = h, e("update:modelValue", h), e("change", h, s));
  }, E = (o) => {
    u(l.readonly) || u(l.disabled) || (p.value = !0, t.value = V(o), e("hover", t.value));
  }, P = () => {
    u(l.readonly) || u(l.disabled) || (p.value = !1, t.value = null, e("hover", null));
  }, C = () => u(l.allowHalf) ? 0.5 : u(l.step), L = (o) => {
    if (u(l.readonly) || u(l.disabled)) return;
    const { key: f } = o, g = C(), h = u(l.maxStars), s = u(l.minRating);
    let d = i.value;
    switch (f) {
      case "ArrowRight":
      case "ArrowUp":
        o.preventDefault(), d = Math.min(h, i.value + g);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        o.preventDefault(), d = Math.max(s, i.value - g);
        break;
      case "Home":
        o.preventDefault(), d = s;
        break;
      case "End":
        o.preventDefault(), d = h;
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
        const R = Number.parseInt(f, 10);
        R <= h && (o.preventDefault(), d = R);
        break;
      }
      case "0":
        o.preventDefault(), d = s;
        break;
    }
    const k = V(d);
    if (k !== i.value) {
      const R = i.value;
      i.value = k, e("update:modelValue", k), e("change", k, R);
    }
  }, X = () => {
    const o = i.value;
    i.value = w.value, o !== w.value && (e("update:modelValue", w.value), e("change", w.value, o));
  }, j = (o) => {
    const f = V(o), g = i.value;
    f !== g && (i.value = f, e("update:modelValue", f), e("change", f, g));
  }, K = () => i.value, H = (o) => {
    $.value = o, e(o ? "focus" : "blur");
  };
  return ae(
    () => u(l.modelValue),
    (o) => {
      o !== void 0 && o !== i.value && (i.value = V(o));
    }
  ), {
    internalRating: i,
    hoverRating: t,
    isHovering: p,
    isFocused: $,
    stars: B,
    displayRating: y,
    handleClick: I,
    handleMouseEnter: E,
    handleMouseLeave: P,
    handleKeyDown: L,
    reset: X,
    setRating: j,
    getRating: K,
    setFocused: H
  };
}
const Ve = ["aria-label", "aria-readonly", "aria-disabled", "tabindex"], Le = ["disabled", "aria-label", "aria-pressed", "title", "onClick", "onMousemove"], Be = {
  key: 0,
  class: "vue-star-rate__counter",
  "aria-live": "polite"
}, Ie = /* @__PURE__ */ A({
  __name: "VueStarRate",
  props: /* @__PURE__ */ Z({
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
  emits: /* @__PURE__ */ Z(["change", "hover", "focus", "blur"], ["update:modelValue"]),
  setup(l, { expose: e, emit: v }) {
    const i = oe(l, "modelValue"), t = l, p = v, $ = {
      empty: "#d1d5db",
      filled: "#fbbf24",
      hover: "#f59e0b",
      half: "#fbbf24"
    }, w = {
      enabled: !0,
      duration: 200,
      type: "scale"
    }, y = c(() => ({
      ...$,
      ...t.colors
    })), B = c(() => ({
      ...w,
      ...t.animation
    })), V = {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40
    }, I = c(() => {
      if (typeof t.iconSize == "number")
        return { width: t.iconSize, height: t.iconSize };
      if (typeof t.iconSize == "object")
        return t.iconSize;
      const n = V[t.size] ?? 24;
      return { width: n, height: n };
    }), E = (n, ...r) => {
      n === "update:modelValue" ? i.value = r[0] : n === "change" ? p("change", r[0], r[1]) : n === "hover" ? p("hover", r[0]) : n === "focus" ? p("focus") : n === "blur" && p("blur");
    }, {
      stars: P,
      displayRating: C,
      isHovering: L,
      isFocused: X,
      handleClick: j,
      handleMouseEnter: K,
      handleMouseLeave: H,
      handleKeyDown: o,
      reset: f,
      setRating: g,
      getRating: h,
      setFocused: s
    } = $e(
      {
        modelValue: i,
        // Ref<number> from defineModel — fully reactive
        maxStars: () => t.maxStars,
        allowHalf: () => t.allowHalf,
        readonly: () => t.readonly,
        disabled: () => t.disabled,
        allowReset: () => t.allowReset,
        minRating: () => t.minRating,
        step: () => t.step
      },
      E
    ), d = ne("container"), k = c(() => t.counterTemplate.replace("{value}", C.value.toString()).replace("{max}", t.maxStars.toString())), R = (n) => t.tooltipLabels && t.tooltipLabels[n] ? t.tooltipLabels[n] : `${n + 1} star${n === 0 ? "" : "s"}`, D = (n, r) => L.value ? y.value.hover : n ? y.value.filled : r ? y.value.half || y.value.filled : y.value.empty, J = (n, r) => {
      if (t.readonly || t.disabled) return;
      let a = n;
      if (t.allowHalf) {
        const z = r.currentTarget.getBoundingClientRect();
        (t.rtl ? r.clientX > z.left + z.width / 2 : r.clientX < z.left + z.width / 2) && (a = n - 0.5);
      }
      j(a);
    }, Q = (n, r) => {
      if (t.readonly || t.disabled) return;
      let a = n;
      if (t.allowHalf) {
        const z = r.currentTarget.getBoundingClientRect();
        (t.rtl ? r.clientX > z.left + z.width / 2 : r.clientX < z.left + z.width / 2) && (a = n - 0.5);
      }
      K(a);
    }, Y = () => {
      (t.allowReset || t.clearable) && g(t.minRating);
    };
    e({
      reset: f,
      setRating: g,
      getRating: h,
      focus: () => {
        var n;
        (n = d.value) == null || n.focus();
      },
      blur: () => {
        var n;
        (n = d.value) == null || n.blur();
      }
    });
    const ee = c(() => [
      "vue-star-rate",
      `vue-star-rate--${t.size}`,
      {
        "vue-star-rate--readonly": t.readonly,
        "vue-star-rate--disabled": t.disabled,
        "vue-star-rate--hovering": L.value,
        "vue-star-rate--focused": X.value,
        "vue-star-rate--inline": t.inline,
        "vue-star-rate--rtl": t.rtl,
        "vue-star-rate--animated": B.value.enabled
      },
      t.className
    ]), le = c(() => ({
      "--star-gap": `${t.gap}px`,
      "--star-color-empty": y.value.empty,
      "--star-color-filled": y.value.filled,
      "--star-color-hover": y.value.hover,
      "--animation-duration": `${B.value.duration}ms`
    }));
    return (n, r) => (b(), S("div", {
      ref: "container",
      class: U(ee.value),
      style: q(le.value),
      role: "group",
      "aria-label": l.ariaLabel,
      "aria-readonly": l.readonly,
      "aria-disabled": l.disabled,
      tabindex: l.disabled ? -1 : 0,
      onKeydown: r[1] || (r[1] = //@ts-ignore
      (...a) => m(o) && m(o)(...a)),
      onFocus: r[2] || (r[2] = (a) => m(s)(!0)),
      onBlur: r[3] || (r[3] = (a) => m(s)(!1))
    }, [
      x("div", {
        class: "vue-star-rate__stars",
        onMouseleave: r[0] || (r[0] = //@ts-ignore
        (...a) => m(H) && m(H)(...a))
      }, [
        (b(!0), S(ie, null, re(m(P), (a) => {
          var F, z, T;
          return b(), S("button", {
            key: a.index,
            type: "button",
            class: U(["vue-star-rate__star", {
              "vue-star-rate__star--filled": a.filled,
              "vue-star-rate__star--half": a.half,
              "vue-star-rate__star--active": a.active,
              [`vue-star-rate__star--animation-${B.value.type}`]: B.value.enabled
            }]),
            disabled: l.disabled || l.readonly,
            "aria-label": R(a.index),
            "aria-pressed": a.active,
            title: l.showTooltip ? R(a.index) : void 0,
            onClick: (G) => J(a.value, G),
            onMousemove: (G) => Q(a.value, G)
          }, [
            l.iconProvider === "lucide" ? (b(), O(pe, {
              key: 0,
              filled: a.filled || m(L) && a.value <= m(C),
              half: a.half,
              size: I.value,
              color: D(a.filled, a.half),
              "empty-color": y.value.empty,
              index: a.index
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "index"])) : l.iconProvider === "fontawesome" ? (b(), O(ge, {
              key: 1,
              filled: a.filled || m(L) && a.value <= m(C),
              half: a.half,
              size: I.value,
              color: D(a.filled, a.half),
              "empty-color": y.value.empty,
              "icon-empty": (F = l.faIcons) == null ? void 0 : F.empty,
              "icon-filled": (z = l.faIcons) == null ? void 0 : z.filled,
              "icon-half": (T = l.faIcons) == null ? void 0 : T.half
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "icon-empty", "icon-filled", "icon-half"])) : l.iconProvider === "custom" && n.$slots.icon ? W(n.$slots, "icon", {
              key: 2,
              filled: a.filled,
              half: a.half,
              size: I.value,
              color: D(a.filled, a.half),
              index: a.index
            }, void 0, !0) : (b(), O(Ce, {
              key: 3,
              filled: a.filled || m(L) && a.value <= m(C),
              half: a.half,
              size: I.value,
              color: D(a.filled, a.half),
              "empty-color": y.value.empty,
              index: a.index
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "index"]))
          ], 42, Le);
        }), 128))
      ], 32),
      l.showCounter ? (b(), S("span", Be, [
        W(n.$slots, "counter", {
          value: m(C),
          max: l.maxStars
        }, () => [
          se(ue(k.value), 1)
        ], !0)
      ])) : _("", !0),
      l.clearable && m(C) > l.minRating && !l.readonly && !l.disabled ? (b(), S("button", {
        key: 1,
        type: "button",
        class: "vue-star-rate__clear",
        "aria-label": "Clear rating",
        onClick: Y
      }, [
        W(n.$slots, "clear", {}, () => [
          r[4] || (r[4] = x("svg", {
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
      ])) : _("", !0)
    ], 46, Ve));
  }
}), Me = /* @__PURE__ */ N(Ie, [["__scopeId", "data-v-33546d7d"]]);
/**
 * Vue Star Rate
 * A highly customizable star rating component for Vue 3
 * 
 * @author Pooya Golchian
 * @license MIT
 */
const _e = {
  install(l, e = {}) {
    const v = e.componentName || "VueStarRate";
    l.component(v, Me), (e.defaultIconProvider || e.defaultColors || e.defaultAnimation) && l.provide("vueStarRateOptions", e);
  }
};
export {
  ge as FontAwesomeIcon,
  pe as LucideIcon,
  Ce as SvgIcon,
  Me as VueStarRate,
  _e as VueStarRatePlugin,
  _e as default,
  $e as useStarRating
};
//# sourceMappingURL=vue-star-rate.js.map
