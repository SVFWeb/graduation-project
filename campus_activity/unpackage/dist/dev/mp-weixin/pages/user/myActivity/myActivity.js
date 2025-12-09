"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (comSearch + comFilterBtn + comActivityItem)();
}
const comSearch = () => "../../../components/com-search/com-search.js";
const comFilterBtn = () => "../../../components/com-filter-btn/com-filter-btn.js";
const comActivityItem = () => "./components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "myActivity",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const filterValue = common_vendor.ref("筛选");
    const activeTab = common_vendor.ref("participate");
    const tabs = [
      {
        label: "参与",
        value: "participate"
      },
      {
        label: "管理",
        value: "manage"
      },
      {
        label: "收藏",
        value: "collect"
      }
    ];
    function onSearch() {
      common_vendor.index.__f__("log", "at pages/user/myActivity/myActivity.vue:51", searchValue.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onSearch),
        b: common_vendor.o(($event) => searchValue.value = $event),
        c: common_vendor.p({
          value: searchValue.value
        }),
        d: common_vendor.f(tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab.label),
            b: tab.value,
            c: activeTab.value === tab.value ? 1 : "",
            d: common_vendor.o(($event) => activeTab.value = tab.value, tab.value)
          };
        }),
        e: common_vendor.o(($event) => filterValue.value = $event),
        f: common_vendor.p({
          title: filterValue.value
        }),
        g: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "73e68555-2-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73e68555"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/myActivity/myActivity.js.map
