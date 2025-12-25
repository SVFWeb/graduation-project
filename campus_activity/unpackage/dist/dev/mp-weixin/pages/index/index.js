"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_club_index = require("../../api/club/index.js");
const api_activity_index = require("../../api/activity/index.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (comSearch + _easycom_uni_notice_bar + comTitle + comActivityItem + customTabbar)();
}
const comTitle = () => "./component/com-title.js";
const comSearch = () => "../../components/com-search/com-search.js";
const comActivityItem = () => "../../components/com-activity-item/com-activity-item.js";
const customTabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const clubList = common_vendor.ref([]);
    const activityList = common_vendor.ref([]);
    async function getClubNewList() {
      let res = await api_club_index.apiGetClubNewList();
      if (res.code == 200) {
        clubList.value = res.data.items;
      }
    }
    async function getHotActivityList() {
      let res = await api_activity_index.apiGetHotActivity();
      if (res.code == 200) {
        activityList.value = res.data.activities;
      }
    }
    common_vendor.onShow(() => {
      getClubNewList();
      getHotActivityList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.index.navigateTo({
          url: "/pages/index/searchActivity/searchActivity"
        })),
        b: common_assets._imports_0,
        c: common_assets._imports_1,
        d: common_assets._imports_2,
        e: common_assets._imports_3,
        f: common_vendor.p({
          showIcon: true,
          scrollable: true,
          single: true,
          text: "精彩热门活动，欢迎您来报名~~"
        }),
        g: common_vendor.o(() => {
          common_vendor.index.switchTab({
            url: "/pages/clubList/clubList"
          });
        }),
        h: common_vendor.f(clubList.value, (item, k0, i0) => {
          return {
            a: item.iconUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.description),
            d: item.id,
            e: common_vendor.o(($event) => common_vendor.index.navigateTo({
              url: `/pages/clubList/clubDetails/clubDetails?info=${encodeURIComponent(JSON.stringify(item))}`
            }), item.id)
          };
        }),
        i: common_vendor.f(activityList.value, (item, k0, i0) => {
          return {
            a: "1cf27b2a-4-" + i0,
            b: common_vendor.p({
              activiyInfo: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
