"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_com_search2 = common_vendor.resolveComponent("com-search");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_com_search2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_com_search = () => "../../../components/com-search/com-search.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_com_search + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "myClub",
  setup(__props) {
    const btnList = [
      {
        name: "加入的",
        value: "join"
      },
      {
        name: "管理的",
        value: "management"
      }
    ];
    const activeValue = common_vendor.ref("join");
    function onChangeActive(item) {
      activeValue.value = item.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(btnList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.value === activeValue.value ? 1 : "",
            c: item.value,
            d: common_vendor.o(($event) => onChangeActive(item), item.value)
          };
        }),
        b: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.o(() => common_vendor.index.navigateTo({
              url: "/pages/clubList/clubDetails/clubDetails"
            }), item),
            c: "5a924e72-2-" + i0 + ",5a924e72-1"
          };
        }),
        c: common_vendor.p({
          title: "25级汉语言学写作班",
          note: "文学院，院系级，班级团支部，班级部落",
          thumb: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          ["thumb-size"]: "lg",
          rightText: "12",
          clickable: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a924e72"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/myClub/myClub.js.map
