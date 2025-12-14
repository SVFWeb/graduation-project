"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_datetime_picker2 + _easycom_uni_number_box2 + _easycom_uni_data_checkbox2 + _easycom_uni_file_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_datetime_picker + _easycom_uni_number_box + _easycom_uni_data_checkbox + _easycom_uni_file_picker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "publishActivity",
  setup(__props) {
    const formRef = common_vendor.ref(null);
    const form = common_vendor.reactive({
      title: "",
      intro: "",
      type: "",
      location: "",
      organizer: "",
      notice: "",
      signupRange: [],
      activityRange: [],
      maxParticipants: "1",
      needReview: "1",
      materials: []
    });
    const signupEndLimit = common_vendor.computed(() => {
      var _a;
      return ((_a = form.activityRange) == null ? void 0 : _a[0]) || "";
    });
    const activityStartLimit = common_vendor.computed(() => {
      var _a;
      return ((_a = form.signupRange) == null ? void 0 : _a[1]) || "";
    });
    const typeOptions = [
      {
        text: "学术讲座",
        value: "lecture"
      },
      {
        text: "文体活动",
        value: "sports"
      },
      {
        text: "志愿服务",
        value: "volunteer"
      },
      {
        text: "竞赛赛事",
        value: "competition"
      },
      {
        text: "其他",
        value: "other"
      }
    ];
    const locationOptions = [
      {
        text: "主楼报告厅",
        value: "hall"
      },
      {
        text: "体育馆",
        value: "gym"
      },
      {
        text: "教学楼",
        value: "classroom"
      },
      {
        text: "图书馆",
        value: "library"
      },
      {
        text: "户外场地",
        value: "outdoor"
      }
    ];
    const organizerOptions = [
      {
        text: "学生会",
        value: "student_union"
      },
      {
        text: "社团联合会",
        value: "association_union"
      },
      {
        text: "研究生会",
        value: "postgraduate_union"
      },
      {
        text: "学院",
        value: "college"
      },
      {
        text: "其他",
        value: "other"
      }
    ];
    const reviewOptions = [
      {
        text: "需要审核",
        value: "1"
      },
      {
        text: "无需审核",
        value: "0"
      }
    ];
    const rules = {
      title: {
        required: true,
        errorMessage: "请填写活动名称"
      },
      intro: {
        required: true,
        errorMessage: "请填写活动介绍"
      },
      type: {
        required: true,
        errorMessage: "请选择活动类型"
      },
      location: {
        required: true,
        errorMessage: "请选择活动地点"
      },
      organizer: {
        required: true,
        errorMessage: "请选择主办方"
      },
      notice: {
        required: true,
        errorMessage: "请填写参与须知"
      },
      signupRange: {
        required: true,
        errorMessage: "请选择报名时间"
      },
      activityRange: {
        required: true,
        errorMessage: "请选择活动时间"
      },
      maxParticipants: {
        required: true,
        errorMessage: "请输入最大报名人数",
        validator: (rule, value, callback) => {
          const num = Number(value);
          if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
            callback("请输入正整数");
            return;
          }
          callback();
        }
      },
      needReview: {
        required: true,
        errorMessage: "请选择是否需要审核"
      },
      materials: {
        required: true,
        errorMessage: "请至少上传 1 张图片",
        validator: (rule, value, callback) => {
          if (!Array.isArray(value) || value.length < 1) {
            callback("请至少上传 1 张图片");
            return;
          }
          if (value.length > 5) {
            callback("最多上传 5 张图片");
            return;
          }
          callback();
        }
      }
    };
    const handleSubmit = () => {
      formRef.value.validate().then(() => {
        common_vendor.index.showToast({
          title: "校验通过，可提交",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.__f__("warn", "at pages/user/publishActivity/publishActivity.vue:238", "表单校验未通过", err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.title = $event),
        b: common_vendor.p({
          placeholder: "请输入活动名称",
          modelValue: form.title
        }),
        c: common_vendor.p({
          label: "活动名称",
          name: "title",
          required: true
        }),
        d: common_vendor.o(($event) => form.intro = $event),
        e: common_vendor.p({
          type: "textarea",
          placeholder: "请填写活动介绍",
          ["auto-height"]: true,
          modelValue: form.intro
        }),
        f: common_vendor.p({
          label: "活动介绍",
          name: "intro",
          required: true
        }),
        g: common_vendor.o(($event) => form.type = $event),
        h: common_vendor.p({
          localdata: typeOptions,
          placeholder: "请选择活动类型",
          modelValue: form.type
        }),
        i: common_vendor.p({
          label: "活动类型",
          name: "type",
          required: true
        }),
        j: common_vendor.o(($event) => form.location = $event),
        k: common_vendor.p({
          localdata: locationOptions,
          placeholder: "请选择活动地点",
          modelValue: form.location
        }),
        l: common_vendor.p({
          label: "活动地点",
          name: "location",
          required: true
        }),
        m: common_vendor.o(($event) => form.organizer = $event),
        n: common_vendor.p({
          localdata: organizerOptions,
          placeholder: "请选择主办方",
          modelValue: form.organizer
        }),
        o: common_vendor.p({
          label: "活动主办方",
          name: "organizer",
          required: true
        }),
        p: common_vendor.o(($event) => form.notice = $event),
        q: common_vendor.p({
          type: "textarea",
          placeholder: "请填写参与须知",
          ["auto-height"]: true,
          modelValue: form.notice
        }),
        r: common_vendor.p({
          label: "参与须知",
          name: "notice",
          required: true
        }),
        s: common_vendor.o(($event) => form.signupRange = $event),
        t: common_vendor.p({
          type: "datetimerange",
          ["range-separator"]: "至",
          ["start-placeholder"]: "报名开始时间",
          ["end-placeholder"]: "报名结束时间",
          end: signupEndLimit.value,
          modelValue: form.signupRange
        }),
        v: common_vendor.p({
          label: "活动报名时间",
          name: "signupRange",
          required: true
        }),
        w: common_vendor.o(($event) => form.activityRange = $event),
        x: common_vendor.p({
          type: "datetimerange",
          ["range-separator"]: "至",
          ["start-placeholder"]: "活动开始时间",
          ["end-placeholder"]: "活动结束时间",
          start: activityStartLimit.value,
          modelValue: form.activityRange
        }),
        y: common_vendor.p({
          label: "活动开始时间",
          name: "activityRange",
          required: true
        }),
        z: common_vendor.o(($event) => form.maxParticipants = $event),
        A: common_vendor.p({
          min: 1,
          max: 9999,
          step: 1,
          background: "#f5f5f5",
          modelValue: form.maxParticipants
        }),
        B: common_vendor.p({
          label: "最大报名人数",
          name: "maxParticipants",
          required: true
        }),
        C: common_vendor.o(($event) => form.needReview = $event),
        D: common_vendor.p({
          localdata: reviewOptions,
          mode: "button",
          modelValue: form.needReview
        }),
        E: common_vendor.p({
          label: "人员是否要审核",
          name: "needReview",
          required: true
        }),
        F: common_vendor.o(($event) => form.materials = $event),
        G: common_vendor.p({
          fileMediatype: "image",
          limit: "5",
          ["auto-upload"]: false,
          mode: "list",
          modelValue: form.materials
        }),
        H: common_vendor.p({
          label: "材料上传",
          name: "materials",
          required: true
        }),
        I: common_vendor.o(handleSubmit),
        J: common_vendor.sr(formRef, "755b73c9-0", {
          "k": "formRef"
        }),
        K: common_vendor.p({
          modelValue: form,
          rules,
          ["label-position"]: "top",
          ["label-width"]: "120",
          ["validate-trigger"]: "bind"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-755b73c9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/publishActivity/publishActivity.js.map
