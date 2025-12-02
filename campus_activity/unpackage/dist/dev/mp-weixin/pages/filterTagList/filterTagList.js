"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "filterTagList",
  setup(__props) {
    const filterListData = common_vendor.ref({
      status: ["全部", "审核中", "报名中", "等待中", "进行中", "已结束"],
      cate: ["全部", "文艺", "体育", "学术", "公益"],
      level: ["全部", "班级", "院级", "校级"]
    });
    const type = common_vendor.ref();
    const filterList = common_vendor.computed(() => filterListData.value[type.value]);
    function onGoTo(value) {
      common_vendor.index.$emit(`filterBack_${type.value}`, {
        value
      });
      common_vendor.index.navigateBack();
    }
    common_vendor.onLoad((option) => {
      type.value = option.type;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(filterList.value, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => onGoTo(item), item),
            c: "85d5dd98-1-" + i0 + ",85d5dd98-0",
            d: common_vendor.p({
              clickable: true,
              title: item
            })
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/filterTagList/filterTagList.js.map
