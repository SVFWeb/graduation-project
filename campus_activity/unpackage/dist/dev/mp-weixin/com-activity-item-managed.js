"use strict";
const common_vendor = require("./common/vendor.js");
const utils_dateUtil = require("./utils/dateUtil.js");
const _sfc_main = {
  __name: "com-activity-item-managed",
  props: ["activeInfo"],
  setup(__props) {
    const props = __props;
    common_vendor.ref();
    common_vendor.ref(0);
    function activityDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/activity/activityDetail/activityDetail?id=${props.activeInfo.id}`
      });
    }
    function memberReview() {
      common_vendor.index.navigateTo({
        url: `/pages/user/memberReview/memberReview?id=${props.activeInfo.id}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.activeInfo.imageUrls[0],
        b: common_vendor.t(__props.activeInfo.name),
        c: common_vendor.t(__props.activeInfo.activityType),
        d: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(__props.activeInfo.startTime, "YYYY.MM.DD hh:mm")),
        e: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(__props.activeInfo.endTime, "YYYY.MM.DD hh:mm")),
        f: common_vendor.o(activityDetail),
        g: __props.activeInfo.needAudit
      }, __props.activeInfo.needAudit ? {
        h: common_vendor.o(memberReview)
      } : {}, {
        i: common_vendor.o(() => {
          common_vendor.index.navigateTo({
            url: `/pages/user/myActivity/registrationStatistics/registrationStatistics?id=${props.activeInfo.id}`
          });
        }),
        j: common_vendor.t(__props.activeInfo.status)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-76fc133d"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/com-activity-item-managed.js.map
