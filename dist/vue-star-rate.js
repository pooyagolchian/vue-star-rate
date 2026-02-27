import { defineComponent as E, computed as d, openBlock as m, createElementBlock as k, createElementVNode as p, createCommentVNode as T, createVNode as le, unref as v, normalizeStyle as J, normalizeClass as U, ref as L, watch as Q, Fragment as te, renderList as ae, createBlock as W, renderSlot as q, createTextVNode as oe, toDisplayString as ne } from "vue";
import { Star as ie } from "lucide-vue-next";
const re = { class: "lucide-icon-wrapper" }, se = {
  key: 0,
  width: 0,
  height: 0,
  style: { position: "absolute", visibility: "hidden" }
}, ue = ["id"], de = ["stop-color"], ce = /* @__PURE__ */ E({
  __name: "LucideIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" },
    strokeWidth: { default: 2 }
  },
  setup(t) {
    const e = t, c = d(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), l = d(() => e.filled || e.half ? e.color : e.emptyColor), h = d(() => e.filled ? e.color : e.half ? `url(#half-gradient-${e.color.replace("#", "")})` : "none");
    return (y, w) => (m(), k("span", re, [
      t.half ? (m(), k("svg", se, [
        p("defs", null, [
          p("linearGradient", {
            id: `half-gradient-${t.color.replace("#", "")}`
          }, [
            p("stop", {
              offset: "50%",
              "stop-color": t.color
            }, null, 8, de),
            w[0] || (w[0] = p("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, ue)
        ])
      ])) : T("", !0),
      le(v(ie), {
        size: c.value.width,
        color: l.value,
        fill: h.value,
        "stroke-width": t.strokeWidth
      }, null, 8, ["size", "color", "fill", "stroke-width"])
    ]));
  }
}), P = (t, e) => {
  const c = t.__vccOpts || t;
  for (const [l, h] of e)
    c[l] = h;
  return c;
}, fe = /* @__PURE__ */ P(ce, [["__scopeId", "data-v-7d66102d"]]), ve = /* @__PURE__ */ E({
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
    const e = t, c = d(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), l = d(() => e.half ? e.iconHalf : e.filled ? e.iconFilled : e.iconEmpty), h = d(() => e.filled || e.half ? e.color : e.emptyColor), y = d(() => ({
      fontSize: `${c.value.width}px`,
      color: h.value,
      width: `${c.value.width}px`,
      height: `${c.value.height}px`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }));
    return (w, f) => (m(), k("span", {
      class: "fa-icon-wrapper",
      style: J(y.value)
    }, [
      p("i", {
        class: U(l.value)
      }, null, 2)
    ], 4));
  }
}), he = /* @__PURE__ */ P(ve, [["__scopeId", "data-v-cab526cc"]]), me = { class: "svg-icon-wrapper" }, pe = ["width", "height"], ye = { key: 0 }, ge = ["id"], be = ["stop-color"], we = ["stroke", "fill"], ze = /* @__PURE__ */ E({
  __name: "SvgIcon",
  props: {
    filled: { type: Boolean, default: !1 },
    half: { type: Boolean, default: !1 },
    size: { default: 24 },
    color: { default: "#fbbf24" },
    emptyColor: { default: "#d1d5db" }
  },
  setup(t) {
    const e = t, c = d(() => typeof e.size == "number" ? { width: e.size, height: e.size } : e.size), l = d(() => e.filled || e.half ? e.color : e.emptyColor), h = d(() => e.half ? "url(#half-gradient)" : e.filled ? e.color : "none"), y = d(() => `star-${Math.random().toString(36).substr(2, 9)}`);
    return (w, f) => (m(), k("span", me, [
      (m(), k("svg", {
        width: c.value.width,
        height: c.value.height,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        t.half ? (m(), k("defs", ye, [
          p("linearGradient", {
            id: `half-gradient-${y.value}`
          }, [
            p("stop", {
              offset: "50%",
              "stop-color": t.color
            }, null, 8, be),
            f[0] || (f[0] = p("stop", {
              offset: "50%",
              "stop-color": "transparent"
            }, null, -1))
          ], 8, ge)
        ])) : T("", !0),
        p("path", {
          d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
          stroke: l.value,
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          fill: t.half ? `url(#half-gradient-${y.value})` : h.value
        }, null, 8, we)
      ], 8, pe))
    ]));
  }
}), ke = /* @__PURE__ */ P(ze, [["__scopeId", "data-v-df46be21"]]);
function xe(t, e) {
  const {
    modelValue: c = 0,
    maxStars: l,
    allowHalf: h,
    readonly: y,
    disabled: w,
    allowReset: f,
    minRating: z,
    step: V
  } = t, s = L(c), C = L(null), g = L(!1), S = L(!1), $ = L(c), M = d(() => g.value && C.value !== null ? C.value : s.value), _ = d(() => {
    const o = [], i = M.value;
    for (let r = 1; r <= l; r++) {
      const x = r <= Math.floor(i), G = h && !x && r === Math.ceil(i) && i % 1 !== 0, Z = r <= i || G && r === Math.ceil(i);
      o.push({
        index: r - 1,
        value: r,
        filled: x,
        half: G,
        active: Z
      });
    }
    return o;
  }), R = (o) => {
    let i = Math.max(z, Math.min(l, o));
    return !h && V === 1 ? i = Math.round(i) : h ? i = Math.round(i * 2) / 2 : i = Math.round(i / V) * V, i;
  }, H = (o) => {
    if (y || w) return;
    let i;
    f && s.value === o ? i = z : i = R(o);
    const r = s.value;
    i !== r && (s.value = i, e("update:modelValue", i), e("change", i, r));
  }, X = (o) => {
    y || w || (g.value = !0, C.value = R(o), e("hover", C.value));
  }, B = () => {
    y || w || (g.value = !1, C.value = null, e("hover", null));
  }, j = (o) => {
    if (y || w) return;
    const { key: i } = o;
    let r = s.value;
    switch (i) {
      case "ArrowRight":
      case "ArrowUp":
        o.preventDefault(), r = Math.min(
          l,
          s.value + (h ? 0.5 : 1)
        );
        break;
      case "ArrowLeft":
      case "ArrowDown":
        o.preventDefault(), r = Math.max(
          z,
          s.value - (h ? 0.5 : 1)
        );
        break;
      case "Home":
        o.preventDefault(), r = z;
        break;
      case "End":
        o.preventDefault(), r = l;
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
        const x = Number.parseInt(i, 10);
        x <= l && (o.preventDefault(), r = x);
        break;
      case "0":
        o.preventDefault(), r = z;
        break;
    }
    if (r !== s.value) {
      const x = s.value;
      s.value = r, e("update:modelValue", r), e("change", r, x);
    }
  }, D = () => {
    const o = s.value;
    s.value = $.value, o !== $.value && (e("update:modelValue", $.value), e("change", $.value, o));
  }, I = (o) => {
    const i = R(o), r = s.value;
    i !== r && (s.value = i, e("update:modelValue", i), e("change", i, r));
  }, K = () => s.value, F = (o) => {
    S.value = o, e(o ? "focus" : "blur");
  };
  return Q(
    () => t.modelValue,
    (o) => {
      o !== void 0 && o !== s.value && (s.value = R(o));
    }
  ), {
    internalRating: s,
    hoverRating: C,
    isHovering: g,
    isFocused: S,
    stars: _,
    displayRating: M,
    handleClick: H,
    handleMouseEnter: X,
    handleMouseLeave: B,
    handleKeyDown: j,
    reset: D,
    setRating: I,
    getRating: K,
    setFocused: F
  };
}
const Ce = ["aria-label", "aria-valuenow", "aria-valuemin", "aria-valuemax", "aria-readonly", "aria-disabled", "tabindex"], Se = ["disabled", "title", "aria-label", "onClick", "onMousemove"], Re = {
  key: 0,
  class: "vue-star-rate__counter"
}, $e = /* @__PURE__ */ E({
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
    iconSize: { default: 24 },
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
  setup(t, { expose: e, emit: c }) {
    const l = t, h = c, y = {
      empty: "#d1d5db",
      filled: "#fbbf24",
      hover: "#f59e0b",
      half: "#fbbf24"
    }, w = {
      enabled: !0,
      duration: 200,
      type: "scale"
    }, f = d(() => ({
      ...y,
      ...l.colors
    })), z = d(() => ({
      ...w,
      ...l.animation
    })), V = {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40
    }, s = d(() => {
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
      isFocused: $,
      handleClick: M,
      handleMouseEnter: _,
      handleMouseLeave: R,
      handleKeyDown: H,
      reset: X,
      setRating: B,
      getRating: j,
      setFocused: D
    } = xe(
      {
        modelValue: l.modelValue,
        maxStars: l.maxStars,
        allowHalf: l.allowHalf,
        readonly: l.readonly,
        disabled: l.disabled,
        allowReset: l.allowReset,
        minRating: l.minRating,
        step: l.step,
        colors: f.value,
        animation: z.value
      },
      (n, ...u) => {
        h(n, ...u);
      }
    );
    Q(
      () => l.modelValue,
      (n) => {
        n !== void 0 && B(n);
      }
    );
    const I = L(null), K = d(() => l.counterTemplate.replace("{value}", g.value.toString()).replace("{max}", l.maxStars.toString())), F = (n) => l.tooltipLabels && l.tooltipLabels[n] ? l.tooltipLabels[n] : `${n + 1} star${n === 0 ? "" : "s"}`, o = (n, u) => S.value ? f.value.hover : n ? f.value.filled : u ? f.value.half || f.value.filled : f.value.empty, i = (n, u) => {
      if (l.readonly || l.disabled) return;
      let a = n;
      if (l.allowHalf) {
        const b = u.currentTarget.getBoundingClientRect();
        (l.rtl ? u.clientX > b.left + b.width / 2 : u.clientX < b.left + b.width / 2) && (a = n - 0.5);
      }
      M(a);
    }, r = (n, u) => {
      if (l.readonly || l.disabled) return;
      let a = n;
      if (l.allowHalf) {
        const b = u.currentTarget.getBoundingClientRect();
        (l.rtl ? u.clientX > b.left + b.width / 2 : u.clientX < b.left + b.width / 2) && (a = n - 0.5);
      }
      _(a);
    }, x = () => {
      B(l.minRating);
    };
    e({
      reset: X,
      setRating: B,
      getRating: j,
      focus: () => {
        var n;
        (n = I.value) == null || n.focus();
      },
      blur: () => {
        var n;
        (n = I.value) == null || n.blur();
      }
    });
    const Y = d(() => [
      "vue-star-rate",
      `vue-star-rate--${l.size}`,
      {
        "vue-star-rate--readonly": l.readonly,
        "vue-star-rate--disabled": l.disabled,
        "vue-star-rate--hovering": S.value,
        "vue-star-rate--focused": $.value,
        "vue-star-rate--inline": l.inline,
        "vue-star-rate--rtl": l.rtl,
        "vue-star-rate--animated": z.value.enabled
      },
      l.className
    ]), ee = d(() => ({
      "--star-gap": `${l.gap}px`,
      "--star-color-empty": f.value.empty,
      "--star-color-filled": f.value.filled,
      "--star-color-hover": f.value.hover,
      "--animation-duration": `${z.value.duration}ms`
    }));
    return (n, u) => (m(), k("div", {
      ref_key: "containerRef",
      ref: I,
      class: U(Y.value),
      style: J(ee.value),
      role: "slider",
      "aria-label": t.ariaLabel,
      "aria-valuenow": v(g),
      "aria-valuemin": t.minRating,
      "aria-valuemax": t.maxStars,
      "aria-readonly": t.readonly,
      "aria-disabled": t.disabled,
      tabindex: t.disabled ? -1 : 0,
      onKeydown: u[1] || (u[1] = //@ts-ignore
      (...a) => v(H) && v(H)(...a)),
      onFocus: u[2] || (u[2] = (a) => v(D)(!0)),
      onBlur: u[3] || (u[3] = (a) => v(D)(!1))
    }, [
      p("div", {
        class: "vue-star-rate__stars",
        onMouseleave: u[0] || (u[0] = //@ts-ignore
        (...a) => v(R) && v(R)(...a))
      }, [
        (m(!0), k(te, null, ae(v(C), (a) => {
          var A, b, N;
          return m(), k("button", {
            key: a.index,
            type: "button",
            class: U(["vue-star-rate__star", {
              "vue-star-rate__star--filled": a.filled,
              "vue-star-rate__star--half": a.half,
              "vue-star-rate__star--active": a.active,
              [`vue-star-rate__star--animation-${z.value.type}`]: z.value.enabled
            }]),
            disabled: t.disabled || t.readonly,
            title: t.showTooltip ? F(a.index) : void 0,
            "aria-label": F(a.index),
            onClick: (O) => i(a.value, O),
            onMousemove: (O) => r(a.value, O)
          }, [
            t.iconProvider === "lucide" ? (m(), W(fe, {
              key: 0,
              filled: a.filled || v(S) && a.value <= v(g),
              half: a.half,
              size: s.value,
              color: o(a.filled, a.half),
              "empty-color": f.value.empty
            }, null, 8, ["filled", "half", "size", "color", "empty-color"])) : t.iconProvider === "fontawesome" ? (m(), W(he, {
              key: 1,
              filled: a.filled || v(S) && a.value <= v(g),
              half: a.half,
              size: s.value,
              color: o(a.filled, a.half),
              "empty-color": f.value.empty,
              "icon-empty": (A = t.faIcons) == null ? void 0 : A.empty,
              "icon-filled": (b = t.faIcons) == null ? void 0 : b.filled,
              "icon-half": (N = t.faIcons) == null ? void 0 : N.half
            }, null, 8, ["filled", "half", "size", "color", "empty-color", "icon-empty", "icon-filled", "icon-half"])) : t.iconProvider === "custom" && n.$slots.icon ? q(n.$slots, "icon", {
              key: 2,
              filled: a.filled,
              half: a.half,
              size: s.value,
              color: o(a.filled, a.half),
              index: a.index
            }, void 0, !0) : (m(), W(ke, {
              key: 3,
              filled: a.filled || v(S) && a.value <= v(g),
              half: a.half,
              size: s.value,
              color: o(a.filled, a.half),
              "empty-color": f.value.empty
            }, null, 8, ["filled", "half", "size", "color", "empty-color"]))
          ], 42, Se);
        }), 128))
      ], 32),
      t.showCounter ? (m(), k("span", Re, [
        q(n.$slots, "counter", {
          value: v(g),
          max: t.maxStars
        }, () => [
          oe(ne(K.value), 1)
        ], !0)
      ])) : T("", !0),
      t.clearable && v(g) > t.minRating && !t.readonly && !t.disabled ? (m(), k("button", {
        key: 1,
        type: "button",
        class: "vue-star-rate__clear",
        "aria-label": "Clear rating",
        onClick: x
      }, [
        q(n.$slots, "clear", {}, () => [
          u[4] || (u[4] = p("svg", {
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
      ])) : T("", !0)
    ], 46, Ce));
  }
}), Le = /* @__PURE__ */ P($e, [["__scopeId", "data-v-b604465e"]]);
/**
 * Vue Star Rate
 * A highly customizable star rating component for Vue 3
 * 
 * @author Pooya Golchian
 * @license MIT
 */
const Ve = {
  install(t, e = {}) {
    const c = e.componentName || "VueStarRate";
    t.component(c, Le), (e.defaultIconProvider || e.defaultColors || e.defaultAnimation) && t.provide("vueStarRateOptions", e);
  }
};
typeof window < "u" && window.Vue && window.Vue.use(Ve);
export {
  he as FontAwesomeIcon,
  fe as LucideIcon,
  ke as SvgIcon,
  Le as VueStarRate,
  Ve as VueStarRatePlugin,
  Ve as default,
  xe as useStarRating
};
//# sourceMappingURL=vue-star-rate.js.map
