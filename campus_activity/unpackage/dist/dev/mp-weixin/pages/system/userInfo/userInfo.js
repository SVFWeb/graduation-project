"use strict";
const common_vendor = require("../../../common/vendor.js");
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
  __name: "userInfo",
  setup(__props) {
    const form = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      name: "",
      studentId: "",
      schoolName: "",
      college: "",
      className: "",
      gender: "",
      phone: "",
      email: ""
    });
    const schoolData = [
      {
        name: "广西民族大学",
        colleges: [
          {
            name: "计算机与信息工程学院",
            classes: ["计算机科学与技术2021级1班", "计算机科学与技术2021级2班", "软件工程2021级1班", "软件工程2021级2班"]
          },
          {
            name: "商学院",
            classes: ["工商管理2021级1班", "工商管理2021级2班", "市场营销2021级1班"]
          },
          {
            name: "文学院",
            classes: ["汉语言文学2021级1班", "汉语言文学2021级2班", "新闻学2021级1班"]
          }
        ]
      },
      {
        name: "广西大学",
        colleges: [
          {
            name: "机械工程学院",
            classes: ["机械工程2021级1班", "机械工程2021级2班", "自动化2021级1班"]
          },
          {
            name: "电气工程学院",
            classes: ["电气工程2021级1班", "电气工程2021级2班"]
          }
        ]
      },
      {
        name: "广西师范大学",
        colleges: [
          {
            name: "教育科学学院",
            classes: ["教育学2021级1班", "心理学2021级1班"]
          },
          {
            name: "文学院",
            classes: ["汉语言文学2021级1班", "历史学2021级1班"]
          }
        ]
      }
    ];
    const multiArray = common_vendor.computed(() => {
      var _a, _b, _c;
      const schools = schoolData.map((item) => item.name);
      const colleges = ((_a = schoolData[multiIndex.value[0]]) == null ? void 0 : _a.colleges.map((item) => item.name)) || [];
      const classes = ((_c = (_b = schoolData[multiIndex.value[0]]) == null ? void 0 : _b.colleges[multiIndex.value[1]]) == null ? void 0 : _c.classes) || [];
      return [schools, colleges, classes];
    });
    const initMultiIndex = () => {
      if (formData.schoolName && formData.college && formData.className) {
        const schoolIndex = schoolData.findIndex((school) => school.name === formData.schoolName);
        if (schoolIndex !== -1) {
          const collegeIndex = schoolData[schoolIndex].colleges.findIndex((college) => college.name === formData.college);
          if (collegeIndex !== -1) {
            const classIndex = schoolData[schoolIndex].colleges[collegeIndex].classes.findIndex((cls) => cls === formData.className);
            if (classIndex !== -1) {
              return [schoolIndex, collegeIndex, classIndex];
            }
          }
        }
      }
      return [0, 0, 0];
    };
    const multiIndex = common_vendor.ref(initMultiIndex());
    const pickerDisplayText = common_vendor.computed(() => {
      if (!formData.schoolName || !formData.college || !formData.className) {
        return "";
      }
      return `${formData.schoolName} - ${formData.college} - ${formData.className}`;
    });
    const rules = {
      name: {
        rules: [
          { required: true, errorMessage: "请输入姓名" }
        ]
      },
      studentId: {
        rules: [
          { required: true, errorMessage: "请输入学号" },
          {
            pattern: /^\d+$/,
            errorMessage: "学号格式不正确，只能输入数字"
          }
        ]
      },
      gender: {
        rules: [
          { required: true, errorMessage: "请选择性别" }
        ]
      },
      schoolInfo: {
        rules: [
          {
            validateFunction: (rule, value, data, callback) => {
              if (!formData.schoolName || !formData.college || !formData.className) {
                callback("请选择学校、学院、班级");
              }
              return true;
            }
          }
        ]
      },
      phone: {
        rules: [
          {
            validateFunction: (rule, value, data, callback) => {
              if (value && !/^1[3-9]\d{9}$/.test(value)) {
                callback("手机号格式不正确");
              }
              return true;
            }
          }
        ]
      },
      email: {
        rules: [
          {
            validateFunction: (rule, value, data, callback) => {
              if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                callback("邮箱格式不正确");
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
    const onGenderChange = (e) => {
      formData.gender = e.detail.value;
      if (form.value) {
        form.value.setValue("gender", e.detail.value);
      }
    };
    const onPickerChange = (e) => {
      const values = e.detail.value;
      multiIndex.value = values;
      const schoolIndex = values[0];
      const collegeIndex = values[1];
      const classIndex = values[2];
      if (schoolData[schoolIndex]) {
        formData.schoolName = schoolData[schoolIndex].name;
        if (schoolData[schoolIndex].colleges[collegeIndex]) {
          formData.college = schoolData[schoolIndex].colleges[collegeIndex].name;
          if (schoolData[schoolIndex].colleges[collegeIndex].classes[classIndex]) {
            formData.className = schoolData[schoolIndex].colleges[collegeIndex].classes[classIndex];
          }
        }
      }
      if (form.value) {
        form.value.setValue("schoolInfo", pickerDisplayText.value);
      }
    };
    const onPickerColumnChange = (e) => {
      const column = e.detail.column;
      const value = e.detail.value;
      const newIndex = [...multiIndex.value];
      newIndex[column] = value;
      if (column === 0) {
        newIndex[1] = 0;
        newIndex[2] = 0;
      } else if (column === 1) {
        newIndex[2] = 0;
      }
      multiIndex.value = newIndex;
    };
    const handleSubmit = async () => {
      try {
        await form.value.validate();
        common_vendor.index.setStorageSync("profileCompleted", true);
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1500);
      } catch (e) {
        common_vendor.index.__f__("log", "at pages/system/userInfo/userInfo.vue:330", "表单校验失败", e);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => formData.name = $event.detail.value, ($event) => onInput("name", $event)]),
        b: formData.name,
        c: common_vendor.p({
          label: "姓名",
          name: "name",
          required: true
        }),
        d: common_vendor.o([($event) => formData.studentId = $event.detail.value, ($event) => onInput("studentId", $event)]),
        e: formData.studentId,
        f: common_vendor.p({
          label: "学号",
          name: "studentId",
          required: true
        }),
        g: formData.gender === "男",
        h: formData.gender === "女",
        i: common_vendor.o(onGenderChange),
        j: common_vendor.p({
          label: "性别",
          name: "gender",
          required: true
        }),
        k: common_vendor.t(pickerDisplayText.value || "请选择学校、学院、班级"),
        l: common_vendor.n(pickerDisplayText.value ? "picker-text" : "picker-placeholder"),
        m: multiArray.value,
        n: multiIndex.value,
        o: common_vendor.o(onPickerChange),
        p: common_vendor.o(onPickerColumnChange),
        q: common_vendor.p({
          label: "学校/学院/班级",
          name: "schoolInfo",
          required: true
        }),
        r: common_vendor.o([($event) => formData.phone = $event.detail.value, ($event) => onInput("phone", $event)]),
        s: formData.phone,
        t: common_vendor.p({
          label: "手机号",
          name: "phone"
        }),
        v: common_vendor.o([($event) => formData.email = $event.detail.value, ($event) => onInput("email", $event)]),
        w: formData.email,
        x: common_vendor.p({
          label: "邮箱",
          name: "email"
        }),
        y: common_vendor.sr(form, "8f1c05e6-0", {
          "k": "form"
        }),
        z: common_vendor.p({
          rules,
          modelValue: formData,
          ["label-position"]: "top"
        }),
        A: common_vendor.o(handleSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f1c05e6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/system/userInfo/userInfo.js.map
