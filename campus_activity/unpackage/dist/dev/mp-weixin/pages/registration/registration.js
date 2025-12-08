"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "registration",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const handleRegister = () => {
      if (!username.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入账号",
          icon: "none"
        });
        return;
      }
      if (username.value.length < 3) {
        common_vendor.index.showToast({
          title: "账号至少3位",
          icon: "none"
        });
        return;
      }
      if (!password.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      if (password.value.length < 6) {
        common_vendor.index.showToast({
          title: "密码至少6位",
          icon: "none"
        });
        return;
      }
      if (password.value !== confirmPassword.value) {
        common_vendor.index.showToast({
          title: "两次密码不一致",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showToast({
        title: "注册成功",
        icon: "success"
      });
    };
    const goToLogin = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: username.value,
        b: common_vendor.o(($event) => username.value = $event.detail.value),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: confirmPassword.value,
        f: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        g: common_vendor.o(handleRegister),
        h: common_vendor.o(goToLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e5d1fa0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/registration/registration.js.map
