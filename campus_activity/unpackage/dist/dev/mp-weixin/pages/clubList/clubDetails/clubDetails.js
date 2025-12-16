"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_club_index = require("../../../api/club/index.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (comActivityItem + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const comActivityItem = () => "../../../components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "clubDetails",
  setup(__props) {
    const alertDialog = common_vendor.ref(null);
    const clubInfo = common_vendor.ref([]);
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo"));
    function onShowDialog() {
      var _a;
      (_a = alertDialog.value) == null ? void 0 : _a.open();
    }
    async function onJoinClub() {
      let res = await api_club_index.apiJoinClub({
        clubId: clubInfo.value.id,
        userId: userInfo.value.id
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          icon: "success",
          title: res.message
        });
      }
    }
    common_vendor.onLoad((e) => {
      clubInfo.value = JSON.parse(decodeURIComponent(e.info));
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(clubInfo.value.name),
        b: common_vendor.t(clubInfo.value.id),
        c: common_vendor.o(onShowDialog),
        d: common_vendor.t(clubInfo.value.memberCount),
        e: common_vendor.t(clubInfo.value.name),
        f: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "e409fb66-0-" + i0
          };
        }),
        g: common_vendor.o(onJoinClub),
        h: common_vendor.p({
          type: "info",
          confirmText: "加入",
          cancelText: "取消",
          content: "是否确认加入该社团"
        }),
        i: common_vendor.sr(alertDialog, "e409fb66-1", {
          "k": "alertDialog"
        }),
        j: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e409fb66"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/clubList/clubDetails/clubDetails.js.map
