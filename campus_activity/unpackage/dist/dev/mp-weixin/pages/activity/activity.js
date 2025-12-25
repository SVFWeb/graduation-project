"use strict";
const common_vendor = require("../../common/vendor.js");
const api_activity_index = require("../../api/activity/index.js");
if (!Math) {
  (comSearch + comFilterBtn + comActivityItem + customTabbar)();
}
const comSearch = () => "../../components/com-search/com-search.js";
const comActivityItem = () => "../../components/com-activity-item/com-activity-item.js";
const comFilterBtn = () => "../../components/com-filter-btn/com-filter-btn.js";
const customTabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const activityList = common_vendor.ref();
    const filterRes = common_vendor.reactive({
      status: "",
      category: "",
      level: ""
    });
    function onSearch() {
      getActivityList();
    }
    async function getActivityList() {
      let res = await api_activity_index.apiGetActivityList({
        ...filterRes,
        keyword: searchValue.value
      });
      if (res.code == 200) {
        activityList.value = res.data.page.records;
      }
    }
    common_vendor.onShow(() => {
      getActivityList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onSearch),
        b: common_vendor.o(($event) => searchValue.value = $event),
        c: common_vendor.p({
          value: searchValue.value
        }),
        d: common_vendor.o(($event) => filterRes.status = $event),
        e: common_vendor.p({
          text: "状态",
          type: "status",
          title: filterRes.status
        }),
        f: common_vendor.o(($event) => filterRes.category = $event),
        g: common_vendor.p({
          text: "分类",
          type: "category",
          title: filterRes.category
        }),
        h: common_vendor.o(($event) => filterRes.level = $event),
        i: common_vendor.p({
          text: "等级",
          type: "level",
          title: filterRes.level
        }),
        j: common_vendor.f(activityList.value, (item, k0, i0) => {
          return {
            a: "da48f91d-4-" + i0,
            b: common_vendor.p({
              activiyInfo: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da48f91d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/activity/activity.js.map
