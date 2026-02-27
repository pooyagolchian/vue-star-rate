import { defineComponent as X, computed as d, openBlock as m, createElementBlock as z, createElementVNode as p, createCommentVNode as P, createVNode as le, unref as v, normalizeStyle as Q, normalizeClass as J, ref as M, watch as Y, Fragment as te, renderList as ae, createBlock as Z, renderSlot as q, createTextVNode as oe, toDisplayString as ne } from "vue";
import { Star as ie } from "lucide-vue-next";
const re = { class: "lucide-icon-wrapper" }, se = {
  key: 0,
  width: 0,
  height: 0,
  style: { position: "absolute", visibility: "hidden" }
}, ue = ["id"], de = ["stop-color"], ce = /* @__PURE__ */ X({
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
  setup(t) {
    const e = t, f = d(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), l = d(() => e.filled || e.half ? e.color : e.emptyColor), h = d(() => e.filled ? e.color : e.half ? `url(#half-gradient-lucide-${e.index})` : "none"), y = d(() => `half-gradient-lucide-${e.index}`);
    return (k, u) => (m(), z("span", re, [
      t.half ? (m(), z("svg", se, [
        p("defs", null, [
          p("linearGradient", { id: y.value }, [
            p("stop", {
              offset: "50%",
              "stop-color": t.color
            }, null, 8, de),
            u[0] || (u[0] = p("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, ue)
        ])
      ])) : P("", !0),
      le(v(ie), {
        size: f.value.width,
        color: l.value,
        fill: h.value,
        "stroke-width": t.strokeWidth
      }, null, 8, ["size", "color", "fill", "stroke-width"])
    ]));
  }
}), j = (t, e) => {
  const f = t.__vccOpts || t;
  for (const [l, h] of e)
    f[l] = h;
  return f;
}, fe = /* @__PURE__ */ j(ce, [["__scopeId", "data-v-b5183b10"]]), ve = /* @__PURE__ */ X({
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
  setup(t) {
    const e = t, f = d(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), l = d(() => e.half ? e.iconHalf : e.filled ? e.iconFilled : e.iconEmpty), h = d(() => e.filled || e.half ? e.color : e.emptyColor), y = d(() => ({
      fontSize: `${f.value.width}px`,
      color: h.value,
      width: `${f.value.width}px`,
      height: `${f.value.height}px`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }));
    return (k, u) => (m(), z("span", {
      class: "fa-icon-wrapper",
      style: Q(y.value)
    }, [
      p("i", {
        class: J(l.value)
      }, null, 2)
    ], 4));
  }
}), he = /* @__PURE__ */ j(ve, [["__scopeId", "data-v-cab526cc"]]), me = { class: "svg-icon-wrapper" }, pe = ["width", "height"], ye = { key: 0 }, ge = ["id"], be = ["stop-color"], we = ["stroke", "fill"], xe = /* @__PURE__ */ X({
  __name: "SvgIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" },
    index: { default: 0 }
  },
  setup(t) {
    const e = t, f = d(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), l = d(() => e.filled || e.half ? e.color : e.emptyColor), h = d(() => e.half ? `url(#half-gradient-${e.index})` : e.filled ? e.color : "none"), y = d(() => `half-gradient-${e.index}`);
    return (k, u) => (m(), z("span", me, [
      (m(), z("svg", {
        width: f.value.width,
        height: f.value.height,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        t.half ? (m(), z("defs", ye, [
          p("linearGradient", { id: y.value }, [
            p("stop", {
              offset: "50%",
              "stop-color": t.color
            }, null, 8, be),
            u[0] || (u[0] = p("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, ge)
        ])) : P("", !0),
        p("path", {
          d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
          stroke: l.value,
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: h.value
        }, null, 8, we)
      ], 8, pe))
    ]));
  }
}), ze = /* @__PURE__ */ j(xe, [["__scopeId", "data-v-558cdd76"]]);
function ke(t, e) {
  const {
    modelValue: f = 0,
    maxStars: l,
    allowHalf: h,
    readonly: y,
    disabled: k,
    allowReset: u,
    minRating: w,
    step: V
  } = t, r = M(f), C = M(null), g = M(!1), S = M(!1), I = M(f), F = d(() => g.value && C.value !== null ? C.value : r.value), K = d(() => {
    const o = [], i = F.value;
    for (let c = 1; c <= l; c++) {
      const x = c <= Math.floor(i), $ = h && !x && c === Math.ceil(i) && i % 1 !== 0, L = c <= i || $ && c === Math.ceil(i);
      o.push({
        index: c - 1,
        value: c,
        filled: x,
        half: $,
        active: L
      });
    }
    return o;
  }), R = (o) => {
    let i = Math.max(w, Math.min(l, o));
    return !h && V === 1 ? i = Math.round(i) : h ? i = Math.round(i * 2) / 2 : i = Math.round(i / V) * V, i;
  }, A = (o) => {
    if (y || k) return;
    let i;
    u && r.value === o ? i = w : i = R(o);
    const c = r.value;
    i !== c && (r.value = i, e("update:modelValue", i), e("change", i, c));
  }, G = (o) => {
    y || k || (g.value = !0, C.value = R(o), e("hover", C.value));
  }, H = () => {
    y || k || (g.value = !1, C.value = null, e("hover", null));
  }, O = () => h ? 0.5 : V, N = (o) => {
    if (y || k) return;
    const { key: i } = o, c = O();
    let x = r.value;
    switch (i) {
      case "ArrowRight":
      case "ArrowUp":
        o.preventDefault(), x = Math.min(
          l,
          r.value + c
        );
        break;
      case "ArrowLeft":
      case "ArrowDown":
        o.preventDefault(), x = Math.max(
          w,
          r.value - c
        );
        break;
      case "Home":
        o.preventDefault(), x = w;
        break;
      case "End":
        o.preventDefault(), x = l;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        const L = Number.parseInt(i, 10);
        L <= l && (o.preventDefault(), x = L);
        break;
      case "0":
        o.preventDefault(), x = w;
        break;
    }
    const $ = R(x);
    if ($ !== r.value) {
      const L = r.value;
      r.value = $, e("update:modelValue", $), e("change", $, L);
    }
  }, D = () => {
    const o = r.value;
    r.value = I.value, o !== I.value && (e("update:modelValue", I.value), e("change", I.value, o));
  }, W = (o) => {
    const i = R(o), c = r.value;
    i !== c && (r.value = i, e("update:modelValue", i), e("change", i, c));
  }, T = () => r.value, B = (o) => {
    S.value = o, e(o ? "focus" : "blur");
  };
  return Y(
    () => t.modelValue,
    (o) => {
      o !== void 0 && o !== r.value && (r.value = R(o));
    }
  ), {
    internalRating: r,
    hoverRating: C,
    isHovering: g,
    isFocused: S,
    stars: K,
    displayRating: F,
    handleClick: A,
    handleMouseEnter: G,
    handleMouseLeave: H,
    handleKeyDown: N,
    reset: D,
    setRating: W,
    getRating: T,
    setFocused: B
  };
}
const Ce = ["aria-label", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-readonly", "aria-disabled", "tabindex"], Se = ["disabled", "title", "aria-label", "onClick", "onMousemove"], Re = {
  key: 0,
  class: "vue-star-rate__counter"
}, $e = /* @__PURE__ */ X({
  __name: "VueStarRate",
  props: {
    modelValue: { default: 0 },
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
    lucideIcons: {},
    rtl: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    inline: { type: Boolean, default: !1 },
    size: { default: "md" },
    className: {},
    ariaLabel: { default: "Star rating" }
  },
  emits: ["update:modelValue", "change", "hover", "focus", "blur"],
  setup(t, { expose: e, emit: f }) {
    const l = t, h = f, y = {
      empty: "#d1d5db",
      filled: "#fbbf24",
      hover: "#f59e0b",
      half: "#fbbf24"
    }, k = {
      enabled: !0,
      duration: 200,
      type: "scale"
    }, u = d(() => ({
      ...y,
      ...l.colors
    })), w = d(() => ({
      ...k,
      ...l.animation
    })), V = {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40
    }, r = d(() => {
      if (typeof l.iconSize == "number")
        return { width: l.iconSize, height: l.iconSize };
      if (typeof l.iconSize == "object")
        return l.iconSize;
      const n = V[l.size] || 24;
      return { width: n, height: n };
    }), {
      stars: C,
      displayRating: g,
      isHovering: S,
      isFocused: I,
      handleClick: F,
      handleMouseEnter: K,
      handleMouseLeave: R,
      handleKeyDown: A,
      reset: G,
      setRating: H,
      getRating: O,
      setFocused: N
    } = ke(
      {
        modelValue: l.modelValue,
        maxStars: l.maxStars,
        allowHalf: l.allowHalf,
        readonly: l.readonly,
        disabled: l.disabled,
        allowReset: l.allowReset,
        minRating: l.minRating,
        step: l.step,
        colors: u.value,
        animation: w.value
      },
      (n, ...s) => {
        h(n, ...s);
      }
    );
    Y(
      () => l.modelValue,
      (n) => {
        n !== void 0 && H(n);
      }
    );
    const D = M(null), W = d(() => l.counterTemplate.replace("{value}", g.value.toString()).replace("{max}", l.maxStars.toString())), T = (n) => l.tooltipLabels && l.tooltipLabels[n] ? l.tooltipLabels[n] : `${n + 1} star${n === 0 ? "" : "s"}`, B = (n, s) => S.value ? u.value.hover : n ? u.value.filled : s ? u.value.half || u.value.filled : u.value.empty, o = (n, s) => {
      if (l.readonly || l.disabled) return;
      let a = n;
      if (l.allowHalf) {
        const b = s.currentTarget.getBoundingClientRect();
        (l.rtl ? s.clientX > b.left + b.width / 2 : s.clientX < b.left + b.width / 2) && (a = n - 0.5);
      }
      F(a);
    }, i = (n, s) => {
      if (l.readonly || l.disabled) return;
      let a = n;
      if (l.allowHalf) {
        const b = s.currentTarget.getBoundingClientRect();
        (l.rtl ? s.clientX > b.left + b.width / 2 : s.clientX < b.left + b.width / 2) && (a = n - 0.5);
      }
      K(a);
    }, c = () => {
      (l.allowReset || l.clearable) && H(l.minRating);
    };
    e({
      reset: G,
      setRating: H,
      getRating: O,
      focus: () => {
        var n;
        (n = D.value) == null || n.focus();
      },
      blur: () => {
        var n;
        (n = D.value) == null || n.blur();
      }
    });
    const L = d(() => [
      "vue-star-rate",
      `vue-star-rate--${l.size}`,
      {
        "vue-star-rate--readonly": l.readonly,
        "vue-star-rate--disabled": l.disabled,
        "vue-star-rate--hovering": S.value,
        "vue-star-rate--focused": I.value,
        "vue-star-rate--inline": l.inline,
        "vue-star-rate--rtl": l.rtl,
        "vue-star-rate--animated": w.value.enabled
      },
      l.className
    ]), ee = d(() => ({
      "--star-gap": `${l.gap}px`,
      "--star-color-empty": u.value.empty,
      "--star-color-filled": u.value.filled,
      "--star-color-hover": u.value.hover,
      "--animation-duration": `${w.value.duration}ms`
    }));
    return (n, s) => (m(), z("div", {
      ref_key: "containerRef",
      ref: D,
      class: J(L.value),
      style: Q(ee.value),
      role: "slider",
      "aria-label": t.ariaLabel,
      "aria-valuenow": v(g),
      "aria-valuemin": t.minRating,
      "aria-valuemax": t.maxStars,
      "aria-readonly": t.readonly,
      "aria-disabled": t.disabled,
      tabindex: t.disabled ? -1 : 0,
      onKeydown: s[1] || (s[1] = //@ts-ignore
      (...a) => v(A) && v(A)(...a)),
      onFocus: s[2] || (s[2] = (a) => v(N)(!0)),
      onBlur: s[3] || (s[3] = (a) => v(N)(!1))
    }, [
      p("div", {
        class: "vue-star-rate__stars",
        onMouseleave: s[0] || (s[0] = //@ts-ignore
        (...a) => v(R) && v(R)(...a))
      }, [
        (m(!0), z(te, null, ae(v(C), (a) => {
          var _, b, E;
          return m(), z("button", {
            key: a.index,
            type: "button",
            class: J(["vue-star-rate__star", {
              "vue-star-rate__star--filled": a.filled,
              "vue-star-rate__star--half": a.half,
              "vue-star-rate__star--active": a.active,
              [`vue-star-rate__star--animation-${w.value.type}`]: w.value.enabled
            }]),
            disabled: t.disabled || t.readonly,
            title: t.showTooltip ? T(a.index) : void 0,
            "aria-label": T(a.index),
            onClick: (U) => o(a.value, U),
            onMousemove: (U) => i(a.value, U)
          }, [
            t.iconProvider === "lucide" ? (m(), Z(fe, {
              key: 0,
              filled: a.filled || v(S) && a.value <= v(g),
              half: a.half,
              size: r.value,
              color: B(a.filled, a.half),
              "empty-color": u.value.empty,
              index: a.index
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "index"])) : t.iconProvider === "fontawesome" ? (m(), Z(he, {
              key: 1,
              filled: a.filled || v(S) && a.value <= v(g),
              half: a.half,
              size: r.value,
              color: B(a.filled, a.half),
              "empty-color": u.value.empty,
              "icon-empty": (_ = t.faIcons) == null ? void 0 : _.empty,
              "icon-filled": (b = t.faIcons) == null ? void 0 : b.filled,
              "icon-half": (E = t.faIcons) == null ? void 0 : E.half
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "icon-empty", "icon-filled", "icon-half"])) : t.iconProvider === "custom" && n.$slots.icon ? q(n.$slots, "icon", {
              key: 2,
              filled: a.filled,
              half: a.half,
              size: r.value,
              color: B(a.filled, a.half),
              index: a.index
            }, void 0, !0) : (m(), Z(ze, {
              key: 3,
              filled: a.filled || v(S) && a.value <= v(g),
              half: a.half,
              size: r.value,
              color: B(a.filled, a.half),
              "empty-color": u.value.empty,
              index: a.index
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "index"]))
          ], 42, Se);
        }), 128))
      ], 32),
      t.showCounter ? (m(), z("span", Re, [
        q(n.$slots, "counter", {
          value: v(g),
          max: t.maxStars
        }, () => [
          oe(ne(W.value), 1)
        ], !0)
      ])) : P("", !0),
      t.clearable && v(g) > t.minRating && !t.readonly && !t.disabled ? (m(), z("button", {
        key: 1,
        type: "button",
        class: "vue-star-rate__clear",
        "aria-label": "Clear rating",
        onClick: c
      }, [
        q(n.$slots, "clear", {}, () => [
          s[4] || (s[4] = p("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            p("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            p("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1))
        ], !0)
      ])) : P("", !0)
    ], 46, Ce));
  }
}), Le = /* @__PURE__ */ j($e, [["__scopeId", "data-v-c4d5676b"]]);
/**
 * Vue Star Rate
 * A highly customizable star rating component for Vue 3
 * 
 * @author Pooya Golchian
 * @license MIT
 */
const Ve = {
  install(t, e = {}) {
    const f = e.componentName || "VueStarRate";
    t.component(f, Le), (e.defaultIconProvider || e.defaultColors || e.defaultAnimation) && t.provide("vueStarRateOptions", e);
  }
};
typeof window < "u" && window.Vue && window.Vue.use(Ve);
export {
  he as FontAwesomeIcon,
  fe as LucideIcon,
  ze as SvgIcon,
  Le as VueStarRate,
  Ve as VueStarRatePlugin,
  Ve as default,
  ke as useStarRating
};
//# sourceMappingURL=vue-star-rate.js.map
