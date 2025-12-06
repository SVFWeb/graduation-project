"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (comSearch + comFilterBtn + comActivityItem)();
}
const comSearch = () => "../../components/com-search/com-search.js";
const comActivityItem = () => "../../components/com-activity-item/com-activity-item.js";
const comFilterBtn = () => "../../components/com-filter-btn/com-filter-btn.js";
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const filterRes = common_vendor.ref({
      status: "状态",
      cate: "分类",
      level: "级别"
    });
    function onSearch() {
      common_vendor.index.__f__("log", "at pages/activity/activity.vue:33", filterRes.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onSearch),
        b: common_vendor.o(($event) => searchValue.value = $event),
        c: common_vendor.p({
          value: searchValue.value
        }),
        d: common_vendor.o(($event) => filterRes.value.status = $event),
        e: common_vendor.p({
          type: "status",
          title: filterRes.value.status
        }),
        f: common_vendor.o(($event) => filterRes.value.cate = $event),
        g: common_vendor.p({
          type: "cate",
          title: filterRes.value.cate
        }),
        h: common_vendor.o(($event) => filterRes.value.level = $event),
        i: common_vendor.p({
          type: "level",
          title: filterRes.value.level
        }),
        j: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: "da48f91d-4-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da48f91d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/activity/activity.js.map
