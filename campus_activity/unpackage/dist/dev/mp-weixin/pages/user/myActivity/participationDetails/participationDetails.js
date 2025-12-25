"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_activity_index = require("../../../../api/activity/index.js");
const utils_dateUtil = require("../../../../utils/dateUtil.js");
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_steps2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_steps = () => "../../../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_list_item + _easycom_uni_list)();
}
const activeColor = "#FB4A3E";
const _sfc_main = {
  __name: "participationDetails",
  props: ["activeId"],
  setup(__props) {
    const props = __props;
    const userId = common_vendor.index.getStorageSync("userInfo").id;
    const registrationTime = common_vendor.ref("");
    const active = common_vendor.ref(1);
    const list = common_vendor.ref([{
      title: "已报名"
    }, {
      title: "待录取"
    }, {
      title: "已录取"
    }, {
      title: "未签到"
    }]);
    async function getActiviyStatus() {
      let res = await api_activity_index.apiGetActiviyStatus({
        activityId: props.activeId,
        userId
      });
      if (res.code == 200) {
        let status = res.data.registration.status;
        registrationTime.value = res.data.registration.registrationTime;
        common_vendor.index.__f__("log", "at pages/user/myActivity/participationDetails/participationDetails.vue:50", res);
        if (status === "已通过") {
          active.value = 3;
        } else if (status === "已拒绝") {
          active.value = 2;
          list.value[2].title = "已拒绝";
        } else if (status === "签到成功") {
          active.value = 3;
          list.value[3].title = "签到成功";
        }
      }
    }
    common_vendor.onMounted(() => {
      getActiviyStatus();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          options: list.value,
          active: active.value,
          ["active-color"]: list.value[2].title === "已拒绝" ? activeColor : "#2979FF	"
        }),
        b: common_vendor.p({
          title: "报名时间",
          rightText: common_vendor.unref(utils_dateUtil.formatTime)(registrationTime.value, "YYYY.MM.DD")
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9003458"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/user/myActivity/participationDetails/participationDetails.js.map
