"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      src: ""
    };
  },
  methods: {
    takePhoto() {
      const ctx = common_vendor.index.createCameraContext();
      ctx.takePhoto({
        quality: "high",
        success: (res) => {
          this.src = res.tempImagePath;
        }
      });
    },
    error(e) {
      common_vendor.index.__f__("log", "at pages/scanCode/scanCode.vue:28", e.detail);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.error && $options.error(...args)),
    b: common_vendor.o((...args) => $options.takePhoto && $options.takePhoto(...args)),
    c: $data.src
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scanCode/scanCode.js.map
