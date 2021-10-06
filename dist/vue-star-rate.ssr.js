'use strict';Object.defineProperty(exports,'__esModule',{value:true});require('vue-awesome/icons');var Icon=require('vue-awesome/components/Icon');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Icon__default=/*#__PURE__*/_interopDefaultLegacy(Icon);//
var script = {
  name: "VueStarRate",
  props: {
    rateRange: {
      type: Number,
      default: 3,
      required: false
    },
    maxIcon: {
      type: Number,
      default: 5
    },
    iconHeight: {
      type: Number,
      default: 25
    },
    iconWidth: {
      type: Number,
      default: 25
    },
    hasCounter: {
      type: Boolean,
      default: true
    },
    iconColor: {
      type: String,
      default: "#f3d23e"
    },
    iconColorHover: {
      type: String,
      default: "#f3d23e"
    },
    iconShape: {
      type: String,
      default: "star"
    }
  },
  components: {
    "v-icon": Icon__default["default"]
  },
  data: function data() {
    return {
      stars: this.rateRange || 0
    };
  },
  computed: {
    counter: function counter() {
      return "".concat(this.stars, " of ").concat(this.maxIcon);
    },
    styleObject: function styleObject() {
      return {
        "--icon-color": this.iconColor,
        "--icon-color-hover": this.iconColorHover
      };
    }
  },
  methods: {
    rate: function rate(icon) {
      if (Number(icon) && icon <= this.maxIcon && icon >= 0) {
        this.stars = this.stars === icon ? icon - 1 : icon;
        this.$emit('ratingSet', this.stars);
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-star-rate"
  }, [_vm._ssrNode("<ul class=\"list\" data-v-0dc02aaa>", "</ul>", _vm._l(_vm.maxIcon, function (icon, index) {
    return _vm._ssrNode("<li" + _vm._ssrClass("star", {
      active: icon <= _vm.stars
    }) + _vm._ssrStyle(null, _vm.styleObject, null) + " data-v-0dc02aaa>", "</li>", [_c('v-icon', {
      style: {
        height: _vm.iconHeight + "px",
        width: _vm.iconWidth + "px",
        padding: "0px 2px"
      },
      attrs: {
        "name": icon <= _vm.stars ? _vm.iconShape : _vm.iconShape
      }
    })], 1);
  }), 0), _vm._ssrNode(" " + (_vm.hasCounter ? "<span data-v-0dc02aaa>" + _vm._ssrEscape(_vm._s(_vm.stars) + " of " + _vm._s(_vm.maxIcon)) + "</span>" : "<!---->"))], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0dc02aaa_0", {
    source: ".vue-star-rate[data-v-0dc02aaa]{font-size:14px;color:#a7a8a8}.list[data-v-0dc02aaa]{margin:0 0 5px 0;padding:0;list-style-type:none}.list:hover .star[data-v-0dc02aaa]{color:var(--icon-color)}.star[data-v-0dc02aaa]{display:inline-block;cursor:pointer}.star:hover~.star[data-v-0dc02aaa]:not(.active){color:inherit}.active[data-v-0dc02aaa]{color:var(--icon-color-hover)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-0dc02aaa";
/* module identifier */

var __vue_module_identifier__ = "data-v-0dc02aaa";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueStarRate(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueStarRate', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports["default"]=__vue_component__;