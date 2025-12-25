"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_club_index = require("../../../api/club/index.js");
const api_activity_index = require("../../../api/activity/index.js");
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
    const userId = common_vendor.index.getStorageSync("userInfo").id;
    const formRef = common_vendor.ref(null);
    const filePicker = common_vendor.ref(null);
    const form = common_vendor.reactive({
      name: "",
      description: "",
      activityType: "",
      location: "",
      clubId: "",
      notice: "",
      signupRange: [],
      activityRange: [],
      maxParticipants: "1",
      needReview: "1",
      imageUrls: []
      // 上传材料
    });
    const nowLimit = Date.now();
    const signupEndLimit = common_vendor.computed(() => {
      var _a;
      return ((_a = form.activityRange) == null ? void 0 : _a[0]) || "";
    });
    const activityStartLimit = common_vendor.computed(() => {
      var _a;
      return ((_a = form.signupRange) == null ? void 0 : _a[1]) || "";
    });
    const organizerOptions = common_vendor.ref([]);
    const typeOptions = [
      {
        text: "思想成长",
        value: "思想成长"
      },
      {
        text: "实践实习",
        value: "实践实习"
      },
      {
        text: "公益志愿",
        value: "公益志愿"
      },
      {
        text: "创新创业",
        value: "创新创业"
      },
      {
        text: "文化艺体",
        value: "文化艺体"
      }
    ];
    const locationOptions = [
      {
        text: "主楼报告厅",
        value: "主楼报告厅"
      },
      {
        text: "体育馆",
        value: "体育馆"
      },
      {
        text: "教学楼",
        value: "教学楼"
      },
      {
        text: "图书馆",
        value: "图书馆"
      },
      {
        text: "户外场地",
        value: "户外场地"
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
      name: {
        rules: [{
          required: true,
          errorMessage: "请填写活动名称"
        }]
      },
      description: {
        rules: [{
          required: true,
          errorMessage: "请填写活动介绍"
        }]
      },
      activityType: {
        rules: [{
          required: true,
          errorMessage: "请选择活动类型"
        }]
      },
      location: {
        rules: [{
          required: true,
          errorMessage: "请选择活动地点"
        }]
      },
      clubId: {
        rules: [{
          required: true,
          errorMessage: "请选择主办方"
        }]
      },
      notice: {
        rules: [{
          required: true,
          errorMessage: "请填写参与须知"
        }]
      },
      signupRange: {
        rules: [{
          required: true,
          errorMessage: "请选择报名时间"
        }]
      },
      activityRange: {
        rules: [{
          required: true,
          errorMessage: "请选择活动时间"
        }]
      },
      maxParticipants: {
        rules: [
          {
            required: true,
            errorMessage: "请输入最大报名人数"
          },
          {
            validateFunction: (rule, value, data, callback) => {
              const num = Number(value);
              if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
                callback("请输入正整数");
                return;
              }
              return true;
            }
          }
        ]
      },
      needReview: {
        rules: [{
          required: true,
          errorMessage: "请选择是否需要审核"
        }]
      },
      imageUrls: {
        rules: [
          {
            required: true,
            errorMessage: "请至少上传 1 张图片"
          },
          {
            validateFunction: (rule, value, data, callback) => {
              if (!Array.isArray(value) || value.length < 1) {
                callback("请至少上传 1 张图片");
                return;
              }
              if (value.length > 5) {
                callback("最多上传 5 张图片");
                return;
              }
              return true;
            }
          }
        ]
      }
    };
    function selectImageFile(e) {
      form.imageUrls = e.tempFiles;
    }
    async function successImageFile(e) {
      let imageUrls = e.tempFiles.map((item) => item.url);
      let fomData = {
        ...form,
        imageUrls,
        registrationStartTime: form.signupRange[0],
        registrationEndTime: form.signupRange[1],
        startTime: form.activityRange[0],
        endTime: form.activityRange[1],
        needAudit: form.needReview == "1" ? true : false
      };
      let res = await api_activity_index.apiCreateActivity(fomData);
      if (res.code == 200) {
        common_vendor.index.hideLoading();
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/user/user"
          });
          common_vendor.index.showToast({
            title: "创建成功",
            icon: "success"
          });
        }, 1e3);
      }
    }
    const handleSubmit = async () => {
      try {
        await formRef.value.validate();
        await filePicker.value.upload();
        common_vendor.index.showLoading();
      } catch (e) {
        common_vendor.index.showToast({
          title: "请完善信息",
          icon: "error"
        });
      }
    };
    common_vendor.onMounted(async () => {
      let res = await api_club_index.apiGetClubManageList(userId);
      organizerOptions.value = res.data.items;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.name = $event),
        b: common_vendor.p({
          placeholder: "请输入活动名称",
          modelValue: form.name
        }),
        c: common_vendor.p({
          label: "活动名称",
          name: "name",
          required: true
        }),
        d: common_vendor.o(($event) => form.description = $event),
        e: common_vendor.p({
          type: "textarea",
          placeholder: "请填写活动介绍",
          ["auto-height"]: true,
          modelValue: form.description
        }),
        f: common_vendor.p({
          label: "活动介绍",
          name: "description",
          required: true
        }),
        g: common_vendor.o(($event) => form.activityType = $event),
        h: common_vendor.p({
          localdata: typeOptions,
          placeholder: "请选择活动类型",
          modelValue: form.activityType
        }),
        i: common_vendor.p({
          label: "活动类型",
          name: "activityType",
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
        m: common_vendor.o(($event) => form.clubId = $event),
        n: common_vendor.p({
          localdata: organizerOptions.value,
          placeholder: "请选择主办方",
          modelValue: form.clubId
        }),
        o: common_vendor.p({
          label: "活动主办方",
          name: "clubId",
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
          start: common_vendor.unref(nowLimit),
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
          disabled: form.signupRange == "",
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
        F: common_vendor.sr(filePicker, "755b73c9-22,755b73c9-21", {
          "k": "filePicker"
        }),
        G: common_vendor.o(selectImageFile),
        H: common_vendor.o(successImageFile),
        I: common_vendor.o(($event) => form.imageUrls = $event),
        J: common_vendor.p({
          fileMediatype: "image",
          limit: "5",
          ["auto-upload"]: false,
          modelValue: form.imageUrls
        }),
        K: common_vendor.p({
          label: "材料图片上传",
          name: "imageUrls",
          required: true
        }),
        L: common_vendor.o(handleSubmit),
        M: common_vendor.sr(formRef, "755b73c9-0", {
          "k": "formRef"
        }),
        N: common_vendor.p({
          modelValue: form,
          rules,
          ["label-position"]: "top",
          ["label-width"]: "120"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-755b73c9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/publishActivity/publishActivity.js.map
