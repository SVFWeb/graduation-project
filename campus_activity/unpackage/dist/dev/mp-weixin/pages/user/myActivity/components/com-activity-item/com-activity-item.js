"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const utils_dateUtil = require("../../../../../utils/dateUtil.js");
const api_activity_index = require("../../../../../api/activity/index.js");
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
  props: ["activeInfo"],
  setup(__props) {
    const props = __props;
    const userId = common_vendor.index.getStorageSync("userInfo").id;
    const rateActivityPopup = common_vendor.ref();
    const rateValue = common_vendor.ref(0);
    const commentText = common_vendor.ref("");
    function onActivityDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/activity/activityDetail/activityDetail?id=${props.activeInfo.id}`
      });
    }
    function onParticipationDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/user/myActivity/participationDetails/participationDetails?activeId=${props.activeInfo.id}`
      });
    }
    function onOpenRate() {
      rateActivityPopup.value.open();
    }
    function onCloseRate() {
      rateActivityPopup.value.close();
      rateValue.value = 0;
    }
    async function onGitRate() {
      let res = await api_activity_index.apiActivityRate({
        activityId: props.activeInfo.id,
        userId,
        score: rateValue.value,
        comment: commentText.value
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          icon: "success",
          title: res.message
        });
      }
      onCloseRate();
    }
    return (_ctx, _cache) => {
      return {
        a: __props.activeInfo.imageUrls[0],
        b: common_vendor.t(__props.activeInfo.name),
        c: common_vendor.t(__props.activeInfo.activityType),
        d: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(__props.activeInfo.startTime, "YYYY.MM.DD hh:mm")),
        e: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(__props.activeInfo.endTime, "YYYY.MM.DD hh:mm")),
        f: common_vendor.o(onActivityDetail),
        g: common_vendor.o(onParticipationDetail),
        h: common_vendor.o(onOpenRate),
        i: common_vendor.t(__props.activeInfo.status),
        j: common_vendor.o(onCloseRate),
        k: common_vendor.t(rateValue.value.toFixed(1)),
        l: common_vendor.o(($event) => rateValue.value = $event),
        m: common_vendor.p({
          size: "45",
          ["allow-half"]: true,
          ["active-color"]: "#FF9500",
          margin: 15,
          modelValue: rateValue.value
        }),
        n: commentText.value,
        o: common_vendor.o(($event) => commentText.value = $event.detail.value),
        p: rateValue.value > 0 ? 1 : "",
        q: rateValue.value === 0,
        r: common_vendor.o(onGitRate),
        s: common_vendor.sr(rateActivityPopup, "3405a3f7-0", {
          "k": "rateActivityPopup"
        }),
        t: common_vendor.p({
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
