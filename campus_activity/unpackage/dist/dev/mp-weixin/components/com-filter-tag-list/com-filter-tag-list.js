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
  __name: "com-filter-tag-list",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const filterListData = {
      status: ["全部", "审核中", "报名中", "等待中", "进行中", "已结束"],
      cate: ["全部", "文艺", "体育", "学术", "公益"],
      level: ["全部", "班级", "院级", "校级"]
    };
    const filterList = common_vendor.computed(() => filterListData[props.type]);
    const emit = __emit;
    function onGoTo(value) {
      common_vendor.index.$emit(`filterBack_${props.type}`, {
        value
      });
      emit("close");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(filterList.value, (item, k0, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => onGoTo(item), item),
            c: "4c128c7b-1-" + i0 + ",4c128c7b-0",
            d: common_vendor.p({
              clickable: true,
              title: item
            })
          };
        }),
        b: common_vendor.p({
          border: false
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c128c7b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/com-filter-tag-list/com-filter-tag-list.js.map
