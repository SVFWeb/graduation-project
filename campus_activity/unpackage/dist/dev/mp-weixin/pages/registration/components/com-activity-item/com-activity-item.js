"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_card2 + _easycom_uni_popup2)();
}
const _easycom_uni_card = () => "../../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup = () => "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "com-activity-item",
  setup(__props) {
    const rateActivityPopup = common_vendor.ref();
    function onActivityDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/activityDetail/activityDetail"
      });
    }
    function onRateActivity() {
      rateActivityPopup.value.open();
    }
    function onChangePopup({
      show
    }) {
      show ? common_vendor.index.hideTabBar() : common_vendor.index.showTabBar();
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(onActivityDetail),
        c: common_vendor.o(() => {
        }),
        d: common_vendor.o(onRateActivity),
        e: common_vendor.p({
          title: "综合评分",
          isFull: true,
          extra: "取消"
        }),
        f: common_vendor.sr(rateActivityPopup, "1ca0b774-0", {
          "k": "rateActivityPopup"
        }),
        g: common_vendor.o(onChangePopup),
        h: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ca0b774"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/registration/components/com-activity-item/com-activity-item.js.map
