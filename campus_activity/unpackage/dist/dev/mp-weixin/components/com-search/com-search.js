"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "com-search",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  emits: ["update:value", "click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isShowCloseIcon = common_vendor.computed(() => props.value != "");
    function onInput(e) {
      emit("update:value", e.detail.value);
    }
    function onSearch() {
      emit("click");
    }
    function onClearSearchText() {
      emit("update:value", "");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "search",
          size: "20",
          color: "#999"
        }),
        b: __props.value,
        c: common_vendor.o(onInput),
        d: isShowCloseIcon.value
      }, isShowCloseIcon.value ? {
        e: common_vendor.o(onClearSearchText),
        f: common_vendor.p({
          type: "close",
          size: "20"
        })
      } : {}, {
        g: common_vendor.o(onSearch)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a0a1a17c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/com-search/com-search.js.map
