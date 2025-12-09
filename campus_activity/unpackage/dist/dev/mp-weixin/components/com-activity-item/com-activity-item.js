"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "com-activity-item",
  setup(__props) {
    function onToActivitDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/activity/activityDetail/activityDetail"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(onToActivitDetail)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63dc9a1c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/com-activity-item/com-activity-item.js.map
