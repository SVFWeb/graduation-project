"use strict";
const common_vendor = require("../../common/vendor.js");
const api_club_index = require("../../api/club/index.js");
if (!Array) {
  const _easycom_com_search2 = common_vendor.resolveComponent("com-search");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_com_search2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_com_search = () => "../../components/com-search/com-search.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_com_search + _easycom_uni_list_item + _easycom_uni_list + customTabbar)();
}
const customTabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
const _sfc_main = {
  __name: "clubList",
  setup(__props) {
    const searchData = common_vendor.ref({
      keyword: "",
      currentPage: "1",
      pageSize: "10"
    });
    const clubList = common_vendor.ref([]);
    async function getClubList() {
      let {
        data
      } = await api_club_index.apiGetClubList(searchData.value);
      if (searchData.value.currentPage == data.page.currentPage && searchData.value.pageSize == data.page.pageSize) {
        clubList.value = data.page.records;
      } else {
        clubList.value = [...clubList.value, ...data.page.records];
      }
    }
    function onSearch() {
      getClubList();
    }
    common_vendor.onMounted(() => {
      getClubList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onSearch),
        b: common_vendor.o(($event) => searchData.value.keyword = $event),
        c: common_vendor.p({
          value: searchData.value.keyword
        }),
        d: common_vendor.f(clubList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => common_vendor.index.navigateTo({
              url: `/pages/clubList/clubDetails/clubDetails?info=${encodeURIComponent(JSON.stringify(item))}`
            }), item.id),
            b: item.id,
            c: "adf44ad7-2-" + i0 + ",adf44ad7-1",
            d: common_vendor.p({
              clickable: true,
              title: item.name,
              note: item.tags,
              thumb: item.iconUrl,
              ["thumb-size"]: "lg",
              rightText: String(item.memberCount)
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-adf44ad7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/clubList/clubList.js.map
