"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_school_index = require("../../../api/school/index.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_load_more2 + _easycom_uni_icons2)();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "classList",
  setup(__props) {
    const schoolData = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadMoreText = {
      contentdown: "上拉加载更多",
      contentrefresh: "加载中...",
      contentnomore: "没有更多了"
    };
    async function getSchoolInfoTree() {
      loading.value = true;
      try {
        let res = await api_school_index.apiGetSchoolInfoTree();
        if (res.code === 200) {
          schoolData.value = (res.data.items || []).map((school) => ({
            ...school,
            expanded: false,
            colleges: (school.colleges || []).map((college) => ({
              ...college,
              expanded: false
            }))
          }));
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/user/classList/classList.vue:88", "获取学校信息失败", e);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    }
    function toggleSchool(index) {
      schoolData.value[index].expanded = !schoolData.value[index].expanded;
    }
    function toggleCollege(schoolIndex, collegeIndex) {
      schoolData.value[schoolIndex].colleges[collegeIndex].expanded = !schoolData.value[schoolIndex].colleges[collegeIndex].expanded;
    }
    function getSchoolCount(school) {
      let count = 0;
      if (school.colleges) {
        school.colleges.forEach((college) => {
          if (college.classes) {
            count += college.classes.length;
          }
        });
      }
      return count;
    }
    common_vendor.onMounted(() => {
      getSchoolInfoTree();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {
        b: common_vendor.p({
          status: "loading",
          ["content-text"]: loadMoreText
        })
      } : common_vendor.e({
        c: common_vendor.f(schoolData.value, (school, schoolIndex, i0) => {
          return common_vendor.e({
            a: "33ff1180-1-" + i0,
            b: common_vendor.p({
              type: school.expanded ? "arrowdown" : "arrowright",
              size: "20",
              color: "#666"
            }),
            c: common_vendor.t(school.name),
            d: common_vendor.t(getSchoolCount(school)),
            e: common_vendor.o(($event) => toggleSchool(schoolIndex), schoolIndex),
            f: school.expanded
          }, school.expanded ? common_vendor.e({
            g: common_vendor.f(school.colleges, (college, collegeIndex, i1) => {
              return common_vendor.e({
                a: "33ff1180-2-" + i0 + "-" + i1,
                b: common_vendor.p({
                  type: college.expanded ? "arrowdown" : "arrowright",
                  size: "18",
                  color: "#888"
                }),
                c: common_vendor.t(college.name),
                d: common_vendor.t(college.classes ? college.classes.length : 0),
                e: common_vendor.o(($event) => toggleCollege(schoolIndex, collegeIndex), collegeIndex),
                f: college.expanded && college.classes
              }, college.expanded && college.classes ? common_vendor.e({
                g: common_vendor.f(college.classes, (cls, classIndex, i2) => {
                  return {
                    a: common_vendor.t(cls.name),
                    b: classIndex
                  };
                }),
                h: !college.classes || college.classes.length === 0
              }, !college.classes || college.classes.length === 0 ? {} : {}) : {}, {
                i: collegeIndex
              });
            }),
            h: !school.colleges || school.colleges.length === 0
          }, !school.colleges || school.colleges.length === 0 ? {} : {}) : {}, {
            i: schoolIndex
          });
        }),
        d: !schoolData.value || schoolData.value.length === 0
      }, !schoolData.value || schoolData.value.length === 0 ? {} : {}));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33ff1180"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/classList/classList.js.map
