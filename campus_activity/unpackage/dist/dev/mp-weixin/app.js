"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/activity/activity.js";
  "./pages/user/myActivity/myActivity.js";
  "./pages/user/user.js";
  "./pages/index/searchActivity/searchActivity.js";
  "./pages/clubList/clubDetails/clubDetails.js";
  "./pages/activity/activityDetail/activityDetail.js";
  "./pages/user/myActivity/participationDetails/participationDetails.js";
  "./pages/clubList/clubList.js";
  "./pages/scanCode/scanCode.js";
  "./pages/system/login/login.js";
  "./pages/system/registration/registration.js";
  "./pages/system/userInfo/userInfo.js";
  "./pages/user/userInfo/userInfo.js";
  "./pages/user/myClub/myClub.js";
  "./pages/user/publishActivity/publishActivity.js";
  "./pages/user/createClass/createClass.js";
  "./pages/user/classList/classList.js";
  "./pages/user/createClub/createClub.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
const routeTypes = ["navigateTo", "redirectTo", "switchTab", "reLaunch", "navigateBack"];
const routeNoControl = ["/pages/index/index", "/pages/system/login/login", "/pages/system/registration/registration", "/pages/system/userInfo/userInfo", "/pages/activity/activity", "/pages/user/user"];
const normalizePath = (url = "") => url.split("?")[0] || "";
routeTypes.forEach((item) => {
  common_vendor.index.addInterceptor(item, {
    invoke(option) {
      const token = common_vendor.index.getStorageSync("token");
      const targetPath = normalizePath(option.url);
      if (!token && !routeNoControl.includes(targetPath)) {
        common_vendor.index.reLaunch({
          url: "/pages/system/login/login"
        });
        return false;
      }
    }
  });
});
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
