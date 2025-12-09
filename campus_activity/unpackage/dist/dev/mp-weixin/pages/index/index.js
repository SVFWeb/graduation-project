"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    common_vendor.onShow(() => {
      const token = common_vendor.index.getStorageSync("token");
      const profileCompleted = common_vendor.index.getStorageSync("profileCompleted");
      if (token && !profileCompleted) {
        common_vendor.index.redirectTo({
          url: "/pages/system/userInfo/userInfo"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.index.navigateTo({
          url: "/pages/index/searchActivity/searchActivity"
        })),
        b: common_vendor.f(4, (item, k0, i0) => {
          return {
            a: item
          };
        }),
        c: common_assets._imports_0,
        d: common_vendor.p({
          showIcon: true,
          scrollable: true,
          single: true,
          text: "精彩热门活动，欢迎您来报名~~"
        }),
        e: common_vendor.o(() => {
          common_vendor.index.switchTab({
            url: "/pages/clubList/clubList"
          });
        }),
        f: common_vendor.f(4, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => common_vendor.index.navigateTo({
              url: "/pages/clubList/clubDetails/clubDetails"
            }), item)
          };
        }),
        g: common_assets._imports_0$1,
        h: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "1cf27b2a-4-" + i0
          };
        }),
        i: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "1cf27b2a-6-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
