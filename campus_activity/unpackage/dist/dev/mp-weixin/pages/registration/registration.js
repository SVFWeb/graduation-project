"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (comSearch + comFilterBtn + comActivityItem)();
}
const comSearch = () => "../../components/com-search/com-search.js";
const comFilterBtn = () => "../../components/com-filter-btn/com-filter-btn.js";
const comActivityItem = () => "./components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "registration",
  setup(__props) {
    const filterValue = common_vendor.ref("筛选");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => filterValue.value = $event),
        b: common_vendor.p({
          title: filterValue.value
        }),
        c: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "1e5d1fa0-2-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e5d1fa0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/registration/registration.js.map
