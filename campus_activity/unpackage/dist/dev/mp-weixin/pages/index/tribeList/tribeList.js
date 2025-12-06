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
  __name: "tribeList",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(6, (item, k0, i0) => {
          return {
            a: item,
            b: "8a0f8e16-2-" + i0 + ",8a0f8e16-1"
          };
        }),
        b: common_vendor.p({
          title: "25级汉语言学写作班",
          note: "文学院，院系级，班级团支部，班级部落",
          thumb: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          ["thumb-size"]: "lg",
          rightText: "12"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8a0f8e16"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/tribeList/tribeList.js.map
