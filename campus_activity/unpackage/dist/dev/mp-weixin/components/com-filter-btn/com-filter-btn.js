"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (comFilterTagList + _easycom_uni_popup)();
}
const comFilterTagList = () => "../com-filter-tag-list/com-filter-tag-list.js";
const _sfc_main = {
  __name: "com-filter-btn",
  props: ["title", "type"],
  emits: ["update:title", "update:type"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const $emit = __emit;
    const initTitle = common_vendor.ref(props.title);
    const isActive = common_vendor.ref(false);
    const popup = common_vendor.ref(null);
    function goFilter() {
      popup.value.open();
    }
    function closePopup() {
      popup.value.close();
    }
    function onChangeTitle(e) {
      if (e.value === "全部") {
        isActive.value = false;
        $emit("update:title", initTitle.value);
      } else {
        isActive.value = true;
        $emit("update:title", e.value);
      }
    }
    common_vendor.onMounted(() => common_vendor.index.$on(`filterBack_${props.type}`, onChangeTitle));
    common_vendor.onUnmounted(() => common_vendor.index.$off(`filterBack_${props.type}`, onChangeTitle));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: isActive.value ? 1 : "",
        c: common_vendor.o(goFilter),
        d: common_vendor.o(closePopup),
        e: common_vendor.p({
          type: props.type
        }),
        f: common_vendor.sr(popup, "2ed28089-0", {
          "k": "popup"
        }),
        g: common_vendor.p({
          type: "bottom",
          ["is-mask-click"]: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ed28089"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/com-filter-btn/com-filter-btn.js.map
