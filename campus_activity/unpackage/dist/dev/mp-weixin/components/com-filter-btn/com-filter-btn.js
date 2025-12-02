"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "com-filter-btn",
  props: ["title", "type"],
  emits: ["update:title", "update:type"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const $emit = __emit;
    const initTitle = common_vendor.ref(props.title);
    const isActive = common_vendor.ref(false);
    function goFilter() {
      common_vendor.index.navigateTo({
        url: `/pages/filterTagList/filterTagList?type=${props.type}`
      });
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
        c: common_vendor.o(goFilter)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ed28089"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/com-filter-btn/com-filter-btn.js.map
