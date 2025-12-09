"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_steps2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_steps = () => "../../../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "participationDetails",
  setup(__props) {
    const active = common_vendor.ref(1);
    const list = common_vendor.ref([{
      title: "已报名"
    }, {
      title: "待录取"
    }, {
      title: "已录取"
    }]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          options: list.value,
          active: active.value
        }),
        b: common_vendor.o(() => common_vendor.index.__f__("log", "at pages/user/myActivity/participationDetails/participationDetails.vue:9", 11)),
        c: common_vendor.p({
          showArrow: true,
          clickable: true,
          title: "报名信息"
        }),
        d: common_vendor.p({
          title: "报名时间",
          rightText: "2025.11.08"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9003458"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/user/myActivity/participationDetails/participationDetails.js.map
