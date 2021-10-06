import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

//
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
    "v-icon": Icon
  },

  data() {
    return {
      stars: this.rateRange || 0
    };
  },

  computed: {
    counter() {
      return `${this.stars} of ${this.maxIcon}`;
    },

    styleObject() {
      return {
        "--icon-color": this.iconColor,
        "--icon-color-hover": this.iconColorHover
      };
    }

  },
  methods: {
    rate(icon) {
      if (Number(icon) && icon <= this.maxIcon && icon >= 0) {
        this.stars = this.stars === icon ? icon - 1 : icon;
        this.$emit('ratingSet', this.stars);
      }
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vue-star-rate"
  }, [_c('ul', {
    staticClass: "list"
  }, _vm._l(_vm.maxIcon, function (icon, index) {
    return _c('li', {
      key: index,
      staticClass: "star",
      class: {
        active: icon <= _vm.stars
      },
      style: _vm.styleObject,
      on: {
        "click": function ($event) {
          return _vm.rate(icon);
        }
      }
    }, [_c('v-icon', {
      style: {
        height: _vm.iconHeight + "px",
        width: _vm.iconWidth + "px",
        padding: "0px 2px"
      },
      attrs: {
        "name": icon <= _vm.stars ? _vm.iconShape : _vm.iconShape
      }
    })], 1);
  }), 0), _vm._v(" "), _vm.hasCounter ? _c('span', [_vm._v(_vm._s(_vm.stars) + " of " + _vm._s(_vm.maxIcon))]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-0dc02aaa_0", {
    source: ".vue-star-rate[data-v-0dc02aaa]{font-size:14px;color:#a7a8a8}.list[data-v-0dc02aaa]{margin:0 0 5px 0;padding:0;list-style-type:none}.list:hover .star[data-v-0dc02aaa]{color:var(--icon-color)}.star[data-v-0dc02aaa]{display:inline-block;cursor:pointer}.star:hover~.star[data-v-0dc02aaa]:not(.active){color:inherit}.active[data-v-0dc02aaa]{color:var(--icon-color-hover)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-0dc02aaa";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueStarRate(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueStarRate', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export { __vue_component__ as default };
