"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (comSearch + comActivityItem)();
}
const comSearch = () => "../../../components/com-search/com-search.js";
const comActivityItem = () => "../../../components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "searchActivity",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const searchHistory = common_vendor.ref(common_vendor.index.getStorageSync("searchHistory") || []);
    const activityList = common_vendor.ref([]);
    const isShowSearchHistory = common_vendor.computed(() => searchHistory.value.length === 0);
    function onSearch() {
      if (searchValue.value == "")
        return;
      searchHistory.value.unshift(searchValue.value);
      searchHistory.value = [...new Set(searchHistory.value)];
      if (searchHistory.value.length > 10) {
        searchHistory.value.pop();
      }
      common_vendor.index.setStorageSync("searchHistory", searchHistory.value);
      activityList.value = [1, 2, 3];
    }
    function onClear() {
      searchHistory.value = [];
      common_vendor.index.clearStorageSync("searchHistory");
    }
    function onClickHistory(item) {
      searchValue.value = item;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onSearch),
        b: common_vendor.o(($event) => searchValue.value = $event),
        c: common_vendor.p({
          value: searchValue.value
        }),
        d: !isShowSearchHistory.value
      }, !isShowSearchHistory.value ? {
        e: common_vendor.o(onClear)
      } : {}, {
        f: common_vendor.f(searchHistory.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item + index,
            c: common_vendor.o(($event) => onClickHistory(item), item + index)
          };
        }),
        g: common_vendor.f(activityList.value.length, (item, k0, i0) => {
          return {
            a: item,
            b: "b69fed56-1-" + i0
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b69fed56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/searchActivity/searchActivity.js.map
