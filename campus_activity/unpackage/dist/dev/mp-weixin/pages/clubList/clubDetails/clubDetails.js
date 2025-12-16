"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_club_index = require("../../../api/club/index.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_drawer2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_drawer = () => "../../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (comActivityItem + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_drawer)();
}
const comActivityItem = () => "../../../components/com-activity-item/com-activity-item.js";
const _sfc_main = {
  __name: "clubDetails",
  props: {
    info: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const alertDialog = common_vendor.ref(null);
    const settingManagerDialog = common_vendor.ref(null);
    const showRight = common_vendor.ref(null);
    const clubInfo = common_vendor.ref([]);
    const userList = common_vendor.ref([]);
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo"));
    const settingManagerUserid = common_vendor.ref("");
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
    async function getJoinClubUserList() {
      let res = await api_club_index.apiGetJoinClubUserList(clubInfo.value.id);
      if (res.code == 200) {
        userList.value = res.data.items;
      }
    }
    function onShowSettingManagerDialog(id) {
      var _a, _b;
      settingManagerUserid.value = id;
      (_a = settingManagerDialog.value) == null ? void 0 : _a.open();
      (_b = showRight.value) == null ? void 0 : _b.close();
    }
    async function settingManager() {
      let res = await api_club_index.apiSettingClubManager({
        clubId: clubInfo.value.id,
        userId: settingManagerUserid.value,
        isManager: true
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          icon: "success",
          title: res.message
        });
      }
    }
    function onCheckUserList() {
      var _a;
      (_a = showRight.value) == null ? void 0 : _a.open();
      getJoinClubUserList();
    }
    common_vendor.onLoad((e) => {
      const rawInfo = e && e.info || props.info;
      if (rawInfo) {
        clubInfo.value = JSON.parse(decodeURIComponent(rawInfo));
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(clubInfo.value.name),
        b: common_vendor.t(clubInfo.value.id),
        c: common_vendor.o(onShowDialog),
        d: common_vendor.t(clubInfo.value.memberCount),
        e: common_vendor.o(onCheckUserList),
        f: common_vendor.t(clubInfo.value.description),
        g: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "e409fb66-0-" + i0
          };
        }),
        h: common_vendor.o(onJoinClub),
        i: common_vendor.p({
          type: "info",
          confirmText: "加入",
          cancelText: "取消",
          content: "是否确认加入该社团"
        }),
        j: common_vendor.sr(alertDialog, "e409fb66-1", {
          "k": "alertDialog"
        }),
        k: common_vendor.p({
          type: "dialog"
        }),
        l: common_vendor.f(userList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.isManager
          }, item.isManager ? {
            b: "e409fb66-6-" + i0 + "," + ("e409fb66-5-" + i0),
            c: common_vendor.p({
              text: "管理",
              type: "error"
            })
          } : {
            d: "e409fb66-7-" + i0 + "," + ("e409fb66-5-" + i0),
            e: common_vendor.p({
              text: "成员",
              type: "primary"
            })
          }, {
            f: item.userId,
            g: common_vendor.o(($event) => onShowSettingManagerDialog(item.userId), item.userId),
            h: "e409fb66-5-" + i0 + ",e409fb66-4",
            i: common_vendor.p({
              clickable: true,
              title: item.user.realName,
              note: item.user.schoolName + item.user.collegeName + item.user.className,
              thumb: item.user.avatarUrl,
              ["thumb-size"]: "lg"
            })
          });
        }),
        m: common_vendor.sr(showRight, "e409fb66-3", {
          "k": "showRight"
        }),
        n: common_vendor.p({
          mode: "right",
          width: 300
        }),
        o: common_vendor.o(settingManager),
        p: common_vendor.p({
          type: "info",
          confirmText: "设置",
          cancelText: "取消",
          content: "是否设置该成员为管理员"
        }),
        q: common_vendor.sr(settingManagerDialog, "e409fb66-8", {
          "k": "settingManagerDialog"
        }),
        r: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e409fb66"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/clubList/clubDetails/clubDetails.js.map
