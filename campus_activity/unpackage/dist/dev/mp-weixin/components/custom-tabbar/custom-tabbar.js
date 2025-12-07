"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "custom-tabbar",
  setup(__props) {
    const allTabs = [
      {
        text: "主页",
        pagePath: "/pages/index/index",
        iconPath: "/static/image/iconfonts/主页.png",
        selectedIconPath: "/static/image/iconfonts/主页 (1).png"
      },
      {
        text: "活动",
        pagePath: "/pages/activity/activity",
        iconPath: "/static/image/iconfonts/活动.png",
        selectedIconPath: "/static/image/iconfonts/活动 (1).png"
      },
      {
        text: "扫码签到",
        pagePath: "/pages/scanCode/scanCode",
        iconPath: "/static/image/iconfonts/扫码.png",
        selectedIconPath: "/static/image/iconfonts/扫码 (1).png",
        requireAuth: true
        // 需要登录
      },
      {
        text: "我的活动",
        pagePath: "/pages/myActivity/myActivity",
        iconPath: "/static/image/iconfonts/活动报名.png",
        selectedIconPath: "/static/image/iconfonts/活动报名 (1).png",
        requireAuth: true
        // 需要登录
      },
      {
        text: "个人",
        pagePath: "/pages/user/user",
        iconPath: "/static/image/iconfonts/个人.png",
        selectedIconPath: "/static/image/iconfonts/个人 (1).png"
      }
    ];
    const currentPath = common_vendor.ref("");
    const tabList = common_vendor.computed(() => {
      return allTabs.filter((tab) => {
        const token = common_vendor.index.getStorageSync("token");
        if (tab.requireAuth && !token) {
          return false;
        }
        return true;
      });
    });
    function updateCurrentPath() {
      const pages = getCurrentPages();
      if (pages.length === 0)
        return;
      const currentPage = pages[pages.length - 1];
      currentPath.value = "/" + currentPage.route;
    }
    function switchTab(item) {
      if (currentPath.value === item.pagePath) {
        return;
      }
      common_vendor.index.switchTab({
        url: item.pagePath
      });
    }
    common_vendor.onMounted(() => {
      updateCurrentPath();
    });
    common_vendor.onShow(() => {
      updateCurrentPath();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabList.value, (item, index, i0) => {
          return {
            a: currentPath.value === item.pagePath ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: index,
            d: currentPath.value === item.pagePath ? 1 : "",
            e: common_vendor.o(($event) => switchTab(item), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51c48e3c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-tabbar/custom-tabbar.js.map
