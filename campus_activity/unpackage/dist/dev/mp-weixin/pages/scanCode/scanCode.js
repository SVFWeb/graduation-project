"use strict";
const common_vendor = require("../../common/vendor.js");
const api_activity_index = require("../../api/activity/index.js");
if (!Math) {
  customTabbar();
}
const customTabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _sfc_main = {
  __name: "scanCode",
  setup(__props) {
    const isHandlingResult = common_vendor.ref(false);
    const canUseCamera = common_vendor.ref(false);
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    const handleScanResult = async (res) => {
      if (isHandlingResult.value)
        return;
      isHandlingResult.value = true;
      common_vendor.index.__f__("log", "at pages/scanCode/scanCode.vue:46", "scan result", res);
      const qrContent = (res == null ? void 0 : res.result) || (res == null ? void 0 : res.code) || (res == null ? void 0 : res.path);
      if (!qrContent) {
        common_vendor.index.showToast({
          title: "未能识别二维码，请重试",
          icon: "none"
        });
        setTimeout(() => {
          isHandlingResult.value = false;
        }, 800);
        return;
      }
      let activityId = null;
      try {
        const qrData = JSON.parse(qrContent);
        if (qrData.activityId) {
          activityId = qrData.activityId;
        }
      } catch (e) {
        const numId = parseInt(qrContent);
        if (!isNaN(numId)) {
          activityId = numId;
        }
      }
      if (!activityId) {
        common_vendor.index.showToast({
          title: "二维码格式不正确",
          icon: "none"
        });
        setTimeout(() => {
          isHandlingResult.value = false;
        }, 800);
        return;
      }
      common_vendor.index.showLoading({
        title: "签到中...",
        mask: true
      });
      try {
        const checkinRes = await api_activity_index.apiCheckinActivity({
          qrContent,
          userId: userInfo.id
        });
        common_vendor.index.hideLoading();
        if (checkinRes.code === 200) {
          common_vendor.index.showToast({
            title: "签到成功",
            icon: "success",
            duration: 2e3
          });
          setTimeout(() => {
            isHandlingResult.value = false;
          }, 2e3);
        } else {
          setTimeout(() => {
            isHandlingResult.value = false;
          }, 1500);
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("error", "at pages/scanCode/scanCode.vue:124", "签到失败:", error);
        common_vendor.index.showToast({
          title: "签到失败，请重试",
          icon: "none"
        });
        setTimeout(() => {
          isHandlingResult.value = false;
        }, 1500);
      }
    };
    const onScanCode = (event) => {
      handleScanResult(event == null ? void 0 : event.detail);
    };
    const onCameraError = (err) => {
      common_vendor.index.__f__("warn", "at pages/scanCode/scanCode.vue:140", "camera error", err);
      common_vendor.index.showToast({ title: "摄像头不可用", icon: "none" });
    };
    const requestCameraAuth = () => new Promise((resolve) => {
      common_vendor.index.authorize({
        scope: "scope.camera",
        success: () => resolve(true),
        fail: () => resolve(false)
      });
    });
    const openSettingForCamera = () => new Promise((resolve) => {
      common_vendor.index.openSetting({
        success(res) {
          var _a;
          resolve(((_a = res.authSetting) == null ? void 0 : _a["scope.camera"]) === true);
        },
        fail() {
          resolve(false);
        }
      });
    });
    const ensureCameraPermission = async () => {
      common_vendor.index.getSetting({
        async success(res) {
          var _a;
          const hasAuth = ((_a = res.authSetting) == null ? void 0 : _a["scope.camera"]) === true;
          if (hasAuth) {
            canUseCamera.value = true;
            return;
          }
          const granted = await requestCameraAuth();
          if (granted) {
            canUseCamera.value = true;
            return;
          }
          common_vendor.index.showModal({
            title: "需要摄像头权限",
            content: "请在设置中开启摄像头权限以完成扫码签到",
            confirmText: "去设置",
            success: async (modalRes) => {
              if (modalRes.confirm) {
                const ok = await openSettingForCamera();
                canUseCamera.value = ok;
                if (!ok) {
                  common_vendor.index.showToast({ title: "未开启权限", icon: "none" });
                }
              }
            }
          });
        },
        fail() {
          common_vendor.index.showToast({ title: "无法获取权限状态", icon: "none" });
        }
      });
    };
    const pickFromAlbum = () => {
      if (isHandlingResult.value)
        return;
      common_vendor.index.scanCode({
        onlyFromCamera: false,
        // 从相册选择照片
        scanType: ["qrCode", "barCode"],
        success(res) {
          handleScanResult(res);
        },
        fail(err) {
          common_vendor.index.__f__("warn", "at pages/scanCode/scanCode.vue:211", "choose image failed", err);
          common_vendor.index.showToast({ title: "未能识别，请重试", icon: "none" });
        }
      });
    };
    common_vendor.onLoad(() => {
      ensureCameraPermission();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: canUseCamera.value
      }, canUseCamera.value ? {
        b: common_vendor.o(onScanCode),
        c: common_vendor.o(onCameraError)
      } : {
        d: common_vendor.o(ensureCameraPermission)
      }, {
        e: common_vendor.o(pickFromAlbum)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-011a5f44"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scanCode/scanCode.js.map
