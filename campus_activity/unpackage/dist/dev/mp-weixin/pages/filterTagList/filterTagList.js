"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  comFilterTagList();
}
const comFilterTagList = () => "../../components/com-filter-tag-list/com-filter-tag-list.js";
const _sfc_main = {
  __name: "filterTagList",
  setup(__props) {
    const type = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      type.value = option.type;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: type.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/filterTagList/filterTagList.js.map
