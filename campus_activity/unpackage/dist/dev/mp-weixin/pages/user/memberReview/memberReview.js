"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_activity_index = require("../../../api/activity/index.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_tag2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "memberReview",
  setup(__props) {
    const tagList = [
      {
        title: "同意",
        value: true
      },
      {
        title: "拒绝",
        value: false
      }
    ];
    const managerReviewDialog = common_vendor.ref(null);
    const activeId = common_vendor.ref("");
    const userId = common_vendor.ref("");
    const managerUserId = common_vendor.index.getStorageSync("userInfo").id;
    const userList = common_vendor.ref([]);
    const changeValue = common_vendor.ref();
    async function getMemberReviewList() {
      let res = await api_activity_index.apiGetMemberReviewList({
        activityId: activeId.value,
        userId: managerUserId
      });
      if (res.code == 200) {
        userList.value = res.data.items;
      }
    }
    async function handleReview(value, id) {
      changeValue.value = value;
      userId.value = id;
      managerReviewDialog.value.open();
    }
    async function managerReview() {
      let res = await api_activity_index.apiMemberReview({
        activityId: activeId.value,
        userId: userId.value,
        managerUserId,
        pass: changeValue.value
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          title: res.message,
          icon: "success"
        });
      }
      getMemberReviewList();
    }
    common_vendor.onLoad((e) => {
      activeId.value = e.id;
    });
    common_vendor.onMounted(() => {
      getMemberReviewList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userList.value.length != 0
      }, userList.value.length != 0 ? {
        b: common_vendor.f(userList.value, (item, k0, i0) => {
          return {
            a: common_vendor.f(tagList, (tagItem, k1, i1) => {
              return {
                a: common_vendor.o(($event) => handleReview(tagItem.value, item.id)),
                b: "e52e7f5f-2-" + i0 + "-" + i1 + "," + ("e52e7f5f-1-" + i0),
                c: common_vendor.p({
                  text: tagItem.title,
                  type: tagItem.value ? "primary" : "error"
                })
              };
            }),
            b: item.id,
            c: "e52e7f5f-1-" + i0 + ",e52e7f5f-0",
            d: common_vendor.p({
              title: item.realName,
              note: item.schoolName + item.collegeName + item.className,
              thumb: item.avatarUrl,
              ["thumb-size"]: "lg"
            })
          };
        })
      } : {
        c: common_vendor.p({
          type: "info",
          size: "60",
          color: "#c0c4cc"
        })
      }, {
        d: common_vendor.o(managerReview),
        e: common_vendor.p({
          type: "info",
          confirmText: "同意",
          cancelText: "取消",
          content: "是否确认此操作"
        }),
        f: common_vendor.sr(managerReviewDialog, "e52e7f5f-4", {
          "k": "managerReviewDialog"
        }),
        g: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e52e7f5f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/memberReview/memberReview.js.map
