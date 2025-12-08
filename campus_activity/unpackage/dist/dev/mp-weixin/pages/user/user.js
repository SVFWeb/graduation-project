"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + customTabbar)();
}
const customTabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const token = common_vendor.index.getStorageSync("token");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: !common_vendor.unref(token)
      }, !common_vendor.unref(token) ? {} : {}, {
        c: common_vendor.unref(token)
      }, common_vendor.unref(token) ? {} : {}, {
        d: common_vendor.p({
          type: "person",
          size: "24",
          color: "#fff"
        }),
        e: common_vendor.p({
          type: "calendar",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.p({
          type: "notification",
          size: "20",
          color: "#fff"
        }),
        g: common_vendor.p({
          type: "star",
          size: "20",
          color: "#fff"
        }),
        h: common_vendor.p({
          type: "medal",
          size: "20",
          color: "#fff"
        }),
        i: common_vendor.unref(token)
      }, common_vendor.unref(token) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
