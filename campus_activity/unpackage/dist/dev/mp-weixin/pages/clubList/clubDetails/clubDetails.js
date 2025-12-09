"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  comActivityItem();
}
const comActivityItem = () => "../../../components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "clubDetails",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "e409fb66-0-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e409fb66"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/clubList/clubDetails/clubDetails.js.map
