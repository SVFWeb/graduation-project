"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/activity/activity.js";
  "./pages/myActivity/myActivity.js";
  "./pages/user/user.js";
  "./pages/index/searchActivity/searchActivity.js";
  "./pages/clubDetails/clubDetails.js";
  "./pages/activityDetail/activityDetail.js";
  "./pages/filterTagList/filterTagList.js";
  "./pages/myActivity/participationDetails/participationDetails.js";
  "./pages/index/tribeList/tribeList.js";
  "./pages/scanCode/scanCode.js";
  "./pages/login/login.js";
  "./pages/registration/registration.js";
  "./pages/userInfo/userInfo.js";
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
const routeNoControl = ["/pages/index/index", "/pages/login/login", "/pages/registration/registration", "/pages/activity/activity", "/pages/user/user", "/pages/userInfo/userInfo"];
routeTypes.forEach((item) => {
  common_vendor.index.addInterceptor(item, {
    invoke(option) {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.getStorageSync("profileCompleted");
      if (!token && !routeNoControl.includes(option.url)) {
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
        return false;
      }
    }
  });
});
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
