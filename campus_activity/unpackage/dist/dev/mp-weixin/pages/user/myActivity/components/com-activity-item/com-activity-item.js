"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const common_assets = require("../../../../../common/assets.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_rate = () => "../../../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "com-activity-item",
  setup(__props) {
    const rateActivityPopup = common_vendor.ref();
    const rateValue = common_vendor.ref(0);
    function onActivityDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/activity/activityDetail/activityDetail"
      });
    }
    function onParticipationDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/user/myActivity/participationDetails/participationDetails"
      });
    }
    function onOpenRate() {
      rateActivityPopup.value.open();
    }
    function onCloseRate() {
      rateActivityPopup.value.close();
      rateValue.value = 0;
    }
    function onGitRate() {
      onCloseRate();
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(onActivityDetail),
        c: common_vendor.o(onParticipationDetail),
        d: common_vendor.o(onOpenRate),
        e: common_vendor.o(onCloseRate),
        f: common_vendor.t(rateValue.value),
        g: common_vendor.o(($event) => rateValue.value = $event),
        h: common_vendor.p({
          size: "35",
          ["allow-half"]: true,
          modelValue: rateValue.value
        }),
        i: common_vendor.o(onGitRate),
        j: common_vendor.sr(rateActivityPopup, "3405a3f7-0", {
          "k": "rateActivityPopup"
        }),
        k: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3405a3f7"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages/user/myActivity/components/com-activity-item/com-activity-item.js.map
