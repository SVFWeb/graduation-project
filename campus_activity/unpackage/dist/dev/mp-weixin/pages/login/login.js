"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const form = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      username: "",
      password: ""
    });
    const rules = {
      username: {
        rules: [
          { required: true, errorMessage: "请输入账号" }
        ]
      },
      password: {
        rules: [
          { required: true, errorMessage: "请输入密码" },
          { minLength: 6, errorMessage: "密码至少6位" }
        ]
      }
    };
    const onInput = (name, e) => {
      const value = e.detail ? e.detail.value : e.target.value;
      formData[name] = value;
      if (form.value) {
        form.value.setValue(name, value);
      }
    };
    const handleLogin = async () => {
      try {
        await form.value.validate();
        const mockToken = "token_" + Date.now();
        common_vendor.index.setStorageSync("token", mockToken);
        const profileCompleted = common_vendor.index.getStorageSync("profileCompleted");
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        if (!profileCompleted) {
          common_vendor.index.reLaunch({
            url: "/pages/userInfo/userInfo"
          });
        } else {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      } catch (e) {
        common_vendor.index.__f__("log", "at pages/login/login.vue:103", "表单校验失败", e);
      }
    };
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/registration/registration"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => formData.username = $event.detail.value, ($event) => onInput("username", $event)]),
        b: formData.username,
        c: common_vendor.p({
          label: "账号",
          name: "username",
          required: true
        }),
        d: common_vendor.o([($event) => formData.password = $event.detail.value, ($event) => onInput("password", $event)]),
        e: formData.password,
        f: common_vendor.p({
          label: "密码",
          name: "password",
          required: true
        }),
        g: common_vendor.sr(form, "e4e4508d-0", {
          "k": "form"
        }),
        h: common_vendor.p({
          rules,
          modelValue: formData,
          ["label-position"]: "top"
        }),
        i: common_vendor.o(handleLogin),
        j: common_vendor.o(goToRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
