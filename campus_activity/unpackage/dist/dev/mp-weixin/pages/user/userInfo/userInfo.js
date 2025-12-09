"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_file_picker2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "userInfo",
  setup(__props) {
    const imageStyles = common_vendor.ref({
      width: 64,
      height: 64,
      border: {
        radius: "50%"
      }
    });
    const userInfo = common_vendor.reactive({
      avatar: "/static/image/xin.jpg",
      // 可替换为用户上传的头像
      name: "林嘉宇",
      gender: "男",
      school: "广西民族大学",
      college: "应用技术学院",
      className: "24级计算机科学与技术（专升本）04班",
      phone: "138****8888",
      email: "linjiayu@example.com"
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.p({
          limit: "1",
          ["disable-preview"]: true,
          ["del-icon"]: false,
          ["file-mediatype"]: "image",
          imageStyles: imageStyles.value
        }),
        c: common_vendor.p({
          title: "头像",
          clickable: true
        }),
        d: common_vendor.p({
          title: "姓名",
          ["right-text"]: userInfo.name
        }),
        e: common_vendor.p({
          title: "性别",
          ["right-text"]: userInfo.gender
        }),
        f: common_vendor.p({
          title: "学校",
          ["right-text"]: userInfo.school
        }),
        g: common_vendor.p({
          title: "学院",
          ["right-text"]: userInfo.college
        }),
        h: common_vendor.p({
          title: "班级",
          ["right-text"]: userInfo.className
        }),
        i: common_vendor.p({
          title: "手机号",
          ["right-text"]: userInfo.phone
        }),
        j: common_vendor.p({
          title: "邮箱",
          ["right-text"]: userInfo.email
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b0fe2f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/userInfo/userInfo.js.map
