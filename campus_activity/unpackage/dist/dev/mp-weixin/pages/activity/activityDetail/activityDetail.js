"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_activity_index = require("../../../api/activity/index.js");
const api_club_index = require("../../../api/club/index.js");
const utils_dateUtil = require("../../../utils/dateUtil.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "activityDetail",
  props: ["id"],
  setup(__props) {
    const props = __props;
    const isReview = common_vendor.ref(false);
    const popup = common_vendor.ref(null);
    const activityInfo = common_vendor.ref(null);
    const currentSwiper = common_vendor.ref(0);
    common_vendor.ref(true);
    const bannerList = common_vendor.ref([]);
    const clubInfo = common_vendor.ref();
    const userId = common_vendor.index.getStorageSync("userInfo").id;
    const onSwiperChange = (e) => {
      currentSwiper.value = e.detail.current;
    };
    const handleSignUp = () => {
      popup.value.open();
    };
    async function queryActivity() {
      let res = await api_activity_index.apiQueryActivity(props.id);
      bannerList.value = res.data.imageUrls;
      activityInfo.value = res.data.activity;
      let clubRes = await api_club_index.apiGetClubDetail(res.data.activity.clubId);
      clubInfo.value = clubRes.data.club;
    }
    async function handelJoinActivity() {
      let res = await api_activity_index.apiJoinActivity(props.id, {
        userId
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          icon: "success",
          title: "报名成功"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/activity/activity"
          });
        }, 1e3);
      }
    }
    function handleReview(value) {
      common_vendor.index.showModal({
        title: "提示",
        content: value ? "确认通过此活动吗？" : "确认拒绝此活动吗？",
        success: async function(res) {
          if (res.confirm) {
            let res2 = await api_activity_index.apiActivityReview({
              activityId: props.id,
              auditUserId: userId,
              pass: value
            });
            if (res2.code == 200) {
              common_vendor.index.showToast({
                icon: "success",
                title: value ? "通过成功" : "拒绝成功"
              });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1e3);
            }
          }
        }
      });
    }
    common_vendor.onLoad(() => {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      if (prevPage.route === "pages/user/clubReview/clubReview") {
        isReview.value = true;
      }
    });
    common_vendor.onMounted(() => {
      queryActivity();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      return common_vendor.e({
        a: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.o(onSwiperChange),
        c: common_vendor.t(currentSwiper.value + 1),
        d: common_vendor.t(bannerList.value.length),
        e: common_vendor.t((_a = activityInfo.value) == null ? void 0 : _a.status),
        f: common_vendor.t((_b = activityInfo.value) == null ? void 0 : _b.name),
        g: common_vendor.p({
          type: "location-filled",
          size: "16",
          color: "#fff"
        }),
        h: common_vendor.t((_c = activityInfo.value) == null ? void 0 : _c.location),
        i: common_vendor.t((_d = activityInfo.value) == null ? void 0 : _d.id),
        j: common_vendor.t((_e = activityInfo.value) == null ? void 0 : _e.currentParticipants),
        k: common_vendor.t((_f = activityInfo.value) == null ? void 0 : _f.maxParticipants),
        l: (_g = clubInfo.value) == null ? void 0 : _g.iconUrl,
        m: common_vendor.t((_h = clubInfo.value) == null ? void 0 : _h.name),
        n: common_vendor.t((_i = clubInfo.value) == null ? void 0 : _i.description),
        o: common_vendor.t((_j = clubInfo.value) == null ? void 0 : _j.memberCount),
        p: common_vendor.t((_k = activityInfo.value) == null ? void 0 : _k.description),
        q: common_vendor.t((_l = activityInfo.value) == null ? void 0 : _l.notice),
        r: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#666"
        }),
        s: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)((_m = activityInfo.value) == null ? void 0 : _m.registrationStartTime)),
        t: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)((_n = activityInfo.value) == null ? void 0 : _n.registrationEndTime)),
        v: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#666"
        }),
        w: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)((_o = activityInfo.value) == null ? void 0 : _o.startTime)),
        x: common_vendor.t(common_vendor.unref(utils_dateUtil.formatTime)((_p = activityInfo.value) == null ? void 0 : _p.endTime)),
        y: common_vendor.p({
          type: "flag",
          size: "16",
          color: "#666"
        }),
        z: common_vendor.t((_q = activityInfo.value) == null ? void 0 : _q.activityLevel),
        A: common_vendor.p({
          type: "bars",
          size: "16",
          color: "#666"
        }),
        B: common_vendor.t((_r = activityInfo.value) == null ? void 0 : _r.activityType),
        C: common_vendor.p({
          type: "person",
          size: "16",
          color: "#666"
        }),
        D: common_vendor.t((_s = activityInfo.value) == null ? void 0 : _s.maxParticipants),
        E: common_vendor.p({
          type: "star",
          size: "16",
          color: "#666"
        }),
        F: common_vendor.t((_t = activityInfo.value) == null ? void 0 : _t.score),
        G: !isReview.value
      }, !isReview.value ? {
        H: common_vendor.o(handleSignUp)
      } : {
        I: common_vendor.p({
          type: "closeempty",
          size: "24",
          color: "#fff"
        }),
        J: common_vendor.o(($event) => handleReview(false)),
        K: common_vendor.p({
          type: "checkmarkempty",
          size: "24",
          color: "#fff"
        }),
        L: common_vendor.o(($event) => handleReview(true))
      }, {
        M: common_vendor.o(handelJoinActivity),
        N: common_vendor.p({
          type: "info",
          title: "活动报名",
          content: "确认报名当前活动？",
          confirmText: "确认",
          cancelText: "取消"
        }),
        O: common_vendor.sr(popup, "da156902-9", {
          "k": "popup"
        }),
        P: common_vendor.p({
          type: "dialog",
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-da156902"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/activity/activityDetail/activityDetail.js.map
