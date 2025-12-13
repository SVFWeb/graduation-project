"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_convertCloudPath = require("../../../utils/convertCloudPath.js");
const api_user_index = require("../../../api/user/index.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "userInfo",
  setup(__props) {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    const userAvatar = common_vendor.ref(userInfo.avatarUrl);
    const filesName = common_vendor.ref();
    function upload() {
      common_vendor.index.chooseImage({
        count: 1,
        success(e) {
          userAvatar.value = e.tempFilePaths[0];
          filesName.value = e.tempFiles[0].name;
        }
      });
    }
    async function saveChanges() {
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
      common_vendor.tr.uploadFile({
        filePath: userAvatar.value,
        cloudPath: `avatar/${(/* @__PURE__ */ new Date()).getTime()}_${filesName.value}`,
        fileType: "image",
        success: async (e) => {
          let filePath = utils_convertCloudPath.convertCloudPath(e.fileID);
          userInfo.avatarUrl = filePath;
          let res = await api_user_index.apiImproveUserInfo(userInfo.id, userInfo);
          if (res.code === 200) {
            common_vendor.index.setStorageSync("userInfo", res.data.user);
            common_vendor.index.reLaunch({
              url: "/pages/user/user"
            });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: userAvatar.value,
        b: common_vendor.o(upload),
        c: common_vendor.p({
          title: "姓名",
          ["right-text"]: common_vendor.unref(userInfo).realName
        }),
        d: common_vendor.p({
          title: "性别",
          ["right-text"]: common_vendor.unref(userInfo).gender === 1 ? "男" : "女"
        }),
        e: common_vendor.p({
          title: "学校",
          ["right-text"]: common_vendor.unref(userInfo).schoolName
        }),
        f: common_vendor.p({
          title: "学院",
          ["right-text"]: common_vendor.unref(userInfo).collegeName
        }),
        g: common_vendor.p({
          title: "班级",
          ["right-text"]: common_vendor.unref(userInfo).className
        }),
        h: common_vendor.p({
          title: "手机号",
          ["right-text"]: common_vendor.unref(userInfo).phone
        }),
        i: common_vendor.p({
          title: "邮箱",
          ["right-text"]: common_vendor.unref(userInfo).email
        }),
        j: common_vendor.o(saveChanges)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b0fe2f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/userInfo/userInfo.js.map
