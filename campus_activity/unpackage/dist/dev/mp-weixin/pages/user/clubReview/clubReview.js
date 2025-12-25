"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_activity_index = require("../../../api/activity/index.js");
const utils_dateUtil = require("../../../utils/dateUtil.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "clubReview",
  setup(__props) {
    const activityList = common_vendor.ref([]);
    const imageLoaded = common_vendor.ref({});
    common_vendor.index.getStorageSync("userInfo").id;
    async function getActivityReviewList() {
      try {
        const res = await api_activity_index.apiActivityReviewList();
        if (res.code === 200) {
          activityList.value = res.data.page.records;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/clubReview/clubReview.vue:89", "获取活动列表失败:", error);
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "error"
        });
      }
    }
    function handleViewDetail(activityId) {
      common_vendor.index.navigateTo({
        url: `/pages/activity/activityDetail/activityDetail?id=${activityId}`
      });
    }
    function onImageLoad(index) {
      imageLoaded.value[index] = true;
    }
    common_vendor.onShow(() => {
      getActivityReviewList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(activityList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.status),
            b: item.imageUrls[0] || "/static/images/default-activity.png",
            c: common_vendor.o(($event) => onImageLoad(index), item.id),
            d: imageLoaded.value[index] ? 1 : "",
            e: !item.imageUrls[0]
          }, !item.imageUrls[0] ? {
            f: "a602a862-0-" + i0,
            g: common_vendor.p({
              type: "image",
              size: "40",
              color: "#c0c4cc"
            })
          } : {}, {
            h: common_vendor.t(item.name),
            i: common_vendor.t(item.activityType),
            j: "a602a862-1-" + i0,
            k: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(item.startTime, "YYYY.MM.DD hh:mm")),
            l: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)(item.endTime, "hh:mm")),
            m: item.location
          }, item.location ? {
            n: "a602a862-2-" + i0,
            o: common_vendor.p({
              type: "location",
              size: "16",
              color: "#999"
            }),
            p: common_vendor.t(item.location)
          } : {}, {
            q: "a602a862-3-" + i0,
            r: common_vendor.o(($event) => handleViewDetail(item.id), item.id),
            s: index < activityList.value.length - 1
          }, index < activityList.value.length - 1 ? {} : {}, {
            t: item.id,
            v: `${index * 0.05}s`
          });
        }),
        b: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#999"
        }),
        c: common_vendor.p({
          type: "eye",
          size: "18"
        }),
        d: activityList.value.length === 0
      }, activityList.value.length === 0 ? {
        e: common_assets._imports_0$2
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a602a862"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/clubReview/clubReview.js.map
