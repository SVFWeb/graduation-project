"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_dateUtil = require("../../utils/dateUtil.js");
const _sfc_main = {
  __name: "com-activity-item",
  props: ["activiyInfo"],
  setup(__props) {
    const props = __props;
    function onToActivitDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/activity/activityDetail/activityDetail?id=${props.activiyInfo.id}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.activiyInfo.status),
        b: __props.activiyInfo.imageUrls[0],
        c: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(__props.activiyInfo.startTime)),
        d: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(__props.activiyInfo.endTime)),
        e: common_vendor.t(__props.activiyInfo.name),
        f: common_vendor.t(__props.activiyInfo.activityType),
        g: common_vendor.o(onToActivitDetail)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63dc9a1c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/com-activity-item/com-activity-item.js.map
