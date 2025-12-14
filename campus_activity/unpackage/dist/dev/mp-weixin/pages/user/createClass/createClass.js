"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_school_index = require("../../../api/school/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_icons2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "createClass",
  setup(__props) {
    const form = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      schoolName: "",
      collegeName: "",
      className: ""
    });
    const schoolData = common_vendor.ref([]);
    const schoolOptionIndex = common_vendor.ref(null);
    const collegeOptionIndex = common_vendor.ref(null);
    const isNewSchool = common_vendor.ref(false);
    const isNewCollege = common_vendor.ref(false);
    const schoolOptions = common_vendor.computed(() => {
      const list = schoolData.value.map((item) => item.name);
      return [...list, "新建学校"];
    });
    const collegeOptions = common_vendor.computed(() => {
      if (!formData.schoolName && !isNewSchool.value) {
        return [];
      }
      if (isNewSchool.value) {
        return ["新建学院"];
      }
      const school = schoolData.value.find((s) => s.name === formData.schoolName);
      if (school && school.colleges && school.colleges.length > 0) {
        const list = school.colleges.map((item) => item.name);
        return [...list, "新建学院"];
      }
      return ["新建学院"];
    });
    async function getSchoolInfoTree() {
      try {
        let res = await api_school_index.apiGetSchoolInfoTree();
        if (res.code === 200) {
          schoolData.value = res.data.items || [];
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/user/createClass/createClass.vue:153", "获取学校信息失败", e);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    }
    function onSchoolOptionChange(e) {
      const index = e.detail.value;
      schoolOptionIndex.value = index;
      if (index === schoolOptions.value.length - 1) {
        isNewSchool.value = true;
        formData.schoolName = "";
      } else {
        isNewSchool.value = false;
        formData.schoolName = schoolData.value[index].name;
      }
      formData.collegeName = "";
      formData.className = "";
      collegeOptionIndex.value = null;
      isNewCollege.value = false;
    }
    function onNewSchoolInput(e) {
      formData.schoolName = e.detail.value;
      if (!formData.schoolName) {
        formData.collegeName = "";
        formData.className = "";
        collegeOptionIndex.value = null;
        isNewCollege.value = false;
      }
    }
    function onCollegeOptionChange(e) {
      const index = e.detail.value;
      collegeOptionIndex.value = index;
      if (index === collegeOptions.value.length - 1) {
        isNewCollege.value = true;
        formData.collegeName = "";
      } else {
        isNewCollege.value = false;
        formData.collegeName = collegeOptions.value[index];
      }
      formData.className = "";
    }
    function onNewCollegeInput(e) {
      formData.collegeName = e.detail.value;
      if (!formData.collegeName) {
        formData.className = "";
      }
    }
    async function handleSubmit() {
      if (!formData.schoolName) {
        common_vendor.index.showToast({
          title: "请选择学校",
          icon: "none"
        });
        return;
      }
      if (!formData.collegeName && !formData.className) {
        common_vendor.index.showToast({
          title: "请至少填写学院或班级名称",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "创建中..."
      });
      try {
        const submitData = {
          schoolName: formData.schoolName
        };
        if (formData.collegeName) {
          submitData.collegeName = formData.collegeName;
        }
        if (formData.className) {
          submitData.className = formData.className;
        }
        let res = await api_school_index.apiCreateCampus(submitData);
        common_vendor.index.hideLoading();
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "创建成功",
            icon: "success"
          });
          formData.schoolName = "";
          formData.collegeName = "";
          formData.className = "";
          schoolOptionIndex.value = null;
          collegeOptionIndex.value = null;
          isNewSchool.value = false;
          isNewCollege.value = false;
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: res.message || "创建失败",
            icon: "none"
          });
        }
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "创建失败",
          icon: "none"
        });
        common_vendor.index.__f__("error", "at pages/user/createClass/createClass.vue:296", "创建失败", e);
      }
    }
    common_vendor.onMounted(() => {
      getSchoolInfoTree();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(schoolOptions.value[schoolOptionIndex.value] || "请选择或新建学校"),
        b: common_vendor.n(schoolOptionIndex.value !== null ? "picker-text" : "picker-placeholder"),
        c: common_vendor.p({
          type: "arrowdown",
          size: "16",
          color: "#999"
        }),
        d: schoolOptions.value,
        e: schoolOptionIndex.value,
        f: common_vendor.o(onSchoolOptionChange),
        g: isNewSchool.value
      }, isNewSchool.value ? {
        h: common_vendor.o([($event) => formData.schoolName = $event.detail.value, onNewSchoolInput]),
        i: formData.schoolName
      } : {}, {
        j: common_vendor.p({
          label: "学校",
          name: "schoolName",
          required: true
        }),
        k: common_vendor.t(collegeOptions.value[collegeOptionIndex.value] || "请选择或新建学院（可选）"),
        l: common_vendor.n(collegeOptionIndex.value !== null ? "picker-text" : "picker-placeholder"),
        m: common_vendor.p({
          type: "arrowdown",
          size: "16",
          color: "#999"
        }),
        n: !formData.schoolName ? 1 : "",
        o: collegeOptions.value,
        p: collegeOptionIndex.value,
        q: common_vendor.o(onCollegeOptionChange),
        r: !formData.schoolName,
        s: isNewCollege.value && formData.schoolName
      }, isNewCollege.value && formData.schoolName ? {
        t: common_vendor.o([($event) => formData.collegeName = $event.detail.value, onNewCollegeInput]),
        v: formData.collegeName
      } : {}, {
        w: common_vendor.p({
          label: "学院",
          name: "collegeName"
        }),
        x: !formData.collegeName ? 1 : "",
        y: !formData.collegeName,
        z: formData.className,
        A: common_vendor.o(($event) => formData.className = $event.detail.value),
        B: common_vendor.p({
          label: "班级名称",
          name: "className"
        }),
        C: common_vendor.sr(form, "97e0d85a-0", {
          "k": "form"
        }),
        D: common_vendor.p({
          modelValue: formData,
          ["label-position"]: "top",
          ["label-width"]: "120"
        }),
        E: common_vendor.p({
          type: "info",
          size: "16",
          color: "#FCB857"
        }),
        F: common_vendor.o(handleSubmit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-97e0d85a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/createClass/createClass.js.map
