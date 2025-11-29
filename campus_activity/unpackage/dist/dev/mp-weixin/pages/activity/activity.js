"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (comSearch + comActivityItem)();
}
const comSearch = () => "../../components/com-search/com-search.js";
const comActivityItem = () => "../../components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const filterText = common_vendor.ref({
      status: "状态",
      cate: "分类",
      level: "级别"
    });
    function goFilter(type) {
      common_vendor.index.navigateTo({
        url: `/pages/activity/components/com-filter-list/com-filter-list?type=${type}`
      });
    }
    function onFilterBack(e) {
      if (e.value === "全部") {
        if (e.type === "status") {
          filterText.value[e.type] = "状态";
        } else if (e.type === "cate") {
          filterText.value[e.type] = "分类";
        } else {
          filterText.value[e.type] = "级别";
        }
        return;
      }
      filterText.value[e.type] = e.value;
    }
    function onInitFilter() {
      filterText.value = {
        status: "状态",
        cate: "分类",
        level: "级别"
      };
    }
    common_vendor.onMounted(() => common_vendor.index.$on("filterBack", onFilterBack));
    common_vendor.onUnmounted(() => common_vendor.index.$off("filterBack", onFilterBack));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(filterText.value.status),
        b: common_vendor.n(filterText.value.status === "状态" ? "" : "filter_tag--filter"),
        c: common_vendor.o(($event) => goFilter("status")),
        d: common_vendor.t(filterText.value.cate),
        e: common_vendor.n(filterText.value.cate === "分类" ? "" : "filter_tag--filter"),
        f: common_vendor.o(($event) => goFilter("cate")),
        g: common_vendor.t(filterText.value.level),
        h: common_vendor.n(filterText.value.level === "级别" ? "" : "filter_tag--filter"),
        i: common_vendor.o(($event) => goFilter("level")),
        j: common_vendor.o(onInitFilter),
        k: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: "da48f91d-1-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da48f91d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/activity/activity.js.map
