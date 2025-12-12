"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user_index = require("../../../api/user/index.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "registration",
  setup(__props) {
    const form = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      username: "",
      password: "",
      confirmPassword: ""
    });
    const rules = {
      username: {
        rules: [
          {
            required: true,
            errorMessage: "请输入账号"
          },
          {
            minLength: 3,
            errorMessage: "账号至少3位"
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "请输入密码"
          },
          {
            minLength: 6,
            errorMessage: "密码至少6位"
          }
        ]
      },
      confirmPassword: {
        rules: [
          {
            required: true,
            errorMessage: "请再次输入密码"
          },
          {
            validateFunction: (rule, value, data, callback) => {
              if (value !== formData.password) {
                callback("两次密码不一致");
              }
              return true;
            }
          }
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
    const handleRegister = async () => {
      try {
        await form.value.validate();
        let res = await api_user_index.apiUserRegistration(formData);
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "注册成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/system/login/login"
            });
          }, 1500);
        }
      } catch (e) {
      }
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
        g: common_vendor.o([($event) => formData.confirmPassword = $event.detail.value, ($event) => onInput("confirmPassword", $event)]),
        h: formData.confirmPassword,
        i: common_vendor.p({
          label: "确认密码",
          name: "confirmPassword",
          required: true
        }),
        j: common_vendor.sr(form, "84158b02-0", {
          "k": "form"
        }),
        k: common_vendor.p({
          rules,
          modelValue: formData,
          ["label-position"]: "top"
        }),
        l: common_vendor.o(handleRegister),
        m: common_vendor.o(() => common_vendor.index.redirectTo({
          url: "/pages/system/login/login"
        }))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84158b02"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/system/registration/registration.js.map
