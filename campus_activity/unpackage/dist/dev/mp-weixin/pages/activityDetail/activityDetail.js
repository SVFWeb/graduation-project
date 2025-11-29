"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "activityDetail",
  setup(__props) {
    const currentSwiper = common_vendor.ref(0);
    const isCollected = common_vendor.ref(true);
    const bannerList = common_vendor.ref([
      "/static/logo.png",
      "/static/logo.png",
      "/static/logo.png",
      "/static/logo.png",
      "/static/logo.png"
    ]);
    const onSwiperChange = (e) => {
      currentSwiper.value = e.detail.current;
    };
    const toggleCollect = () => {
      isCollected.value = !isCollected.value;
    };
    const handleSignUp = () => {
      common_vendor.index.showToast({
        title: "报名成功",
        icon: "success"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.o(onSwiperChange),
        c: common_vendor.t(currentSwiper.value + 1),
        d: common_vendor.t(bannerList.value.length),
        e: common_vendor.p({
          type: "location-filled",
          size: "16",
          color: "#fff"
        }),
        f: common_assets._imports_0,
        g: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#666"
        }),
        h: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#666"
        }),
        i: common_vendor.p({
          type: "flag",
          size: "16",
          color: "#666"
        }),
        j: common_vendor.p({
          type: "bars",
          size: "16",
          color: "#666"
        }),
        k: common_vendor.p({
          type: "person",
          size: "16",
          color: "#666"
        }),
        l: common_vendor.p({
          type: "star",
          size: "16",
          color: "#666"
        }),
        m: common_vendor.p({
          type: isCollected.value ? "star-filled" : "star",
          size: "22",
          color: isCollected.value ? "#FCB857" : "#666"
        }),
        n: common_vendor.t(isCollected.value ? "已收藏" : "收藏"),
        o: isCollected.value ? 1 : "",
        p: common_vendor.o(toggleCollect),
        q: common_vendor.o(handleSignUp)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c8aaa9f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/activityDetail/activityDetail.js.map
