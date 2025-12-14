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
    const userInfo = common_vendor.index.getStorageSync("userInfo");
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
        a: !common_vendor.unref(userInfo).avatarUrl
      }, !common_vendor.unref(userInfo).avatarUrl ? {
        b: common_assets._imports_0$1
      } : {
        c: common_vendor.unref(userInfo).avatarUrl
      }, {
        d: !common_vendor.unref(token)
      }, !common_vendor.unref(token) ? {} : {
        e: common_vendor.t(common_vendor.unref(userInfo).realName)
      }, {
        f: common_vendor.unref(token)
      }, common_vendor.unref(token) ? {
        g: common_vendor.t(common_vendor.unref(userInfo).studentNo)
      } : {}, {
        h: common_vendor.p({
          type: "person",
          size: "24",
          color: "#fff"
        }),
        i: common_vendor.o(() => common_vendor.index.navigateTo({
          url: "/pages/user/userInfo/userInfo"
        })),
        j: common_vendor.p({
          type: "plusempty",
          size: "24",
          color: "#fff"
        }),
        k: common_vendor.o(() => common_vendor.index.navigateTo({
          url: "/pages/user/publishActivity/publishActivity"
        })),
        l: common_vendor.p({
          type: "plusempty",
          size: "24",
          color: "#fff"
        }),
        m: common_vendor.o(() => common_vendor.index.navigateTo({
          url: "/pages/user/createClub/createClub"
        })),
        n: common_vendor.p({
          type: "plusempty",
          size: "24",
          color: "#fff"
        }),
        o: common_vendor.o(() => common_vendor.index.navigateTo({
          url: "/pages/user/createClass/createClass"
        })),
        p: common_vendor.p({
          type: "calendar",
          size: "24",
          color: "#fff"
        }),
        q: common_vendor.p({
          type: "star",
          size: "24",
          color: "#fff"
        }),
        r: common_vendor.o(() => {
          common_vendor.index.navigateTo({
            url: "/pages/user/myActivity/myActivity"
          });
        }),
        s: common_vendor.p({
          type: "medal",
          size: "24",
          color: "#fff"
        }),
        t: common_vendor.o(() => {
          common_vendor.index.navigateTo({
            url: "/pages/user/myClub/myClub"
          });
        }),
        v: common_vendor.p({
          type: "contact",
          size: "24",
          color: "#fff"
        }),
        w: common_vendor.o(() => common_vendor.index.navigateTo({
          url: "/pages/user/classList/classList"
        })),
        x: common_vendor.unref(token)
      }, common_vendor.unref(token) ? {
        y: common_vendor.o(onOutLogin)
      } : {}, {
        z: common_vendor.o(confirmLogout),
        A: common_vendor.p({
          type: "info",
          title: "退出登录",
          content: "确认退出当前账号？",
          confirmText: "退出",
          cancelText: "取消"
        }),
        B: common_vendor.sr(logoutPopup, "0f7520f0-8", {
          "k": "logoutPopup"
        }),
        C: common_vendor.p({
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
