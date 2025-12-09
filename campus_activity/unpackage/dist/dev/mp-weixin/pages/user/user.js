"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup + customTabbar)();
}
const customTabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const token = common_vendor.index.getStorageSync("token");
    const logoutPopup = common_vendor.ref(null);
    function onOutLogin() {
      var _a;
      (_a = logoutPopup.value) == null ? void 0 : _a.open();
    }
    function confirmLogout() {
      common_vendor.index.clearStorageSync();
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
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
        e: common_vendor.o(() => common_vendor.index.navigateTo({
          url: "/pages/user/userInfo/userInfo"
        })),
        f: common_vendor.p({
          type: "calendar",
          size: "20",
          color: "#fff"
        }),
        g: common_vendor.p({
          type: "notification",
          size: "20",
          color: "#fff"
        }),
        h: common_vendor.p({
          type: "star",
          size: "20",
          color: "#fff"
        }),
        i: common_vendor.o(() => {
          common_vendor.index.navigateTo({
            url: "/pages/user/myActivity/myActivity"
          });
        }),
        j: common_vendor.p({
          type: "medal",
          size: "20",
          color: "#fff"
        }),
        k: common_vendor.o(() => {
          common_vendor.index.navigateTo({
            url: "/pages/user/myClub/myClub"
          });
        }),
        l: common_vendor.unref(token)
      }, common_vendor.unref(token) ? {
        m: common_vendor.o(onOutLogin)
      } : {}, {
        n: common_vendor.o(confirmLogout),
        o: common_vendor.p({
          type: "info",
          title: "退出登录",
          content: "确认退出当前账号？",
          confirmText: "退出",
          cancelText: "取消"
        }),
        p: common_vendor.sr(logoutPopup, "0f7520f0-5", {
          "k": "logoutPopup"
        }),
        q: common_vendor.p({
          type: "dialog",
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
