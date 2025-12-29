"use strict";
const common_vendor = require("../common/vendor.js");
function useUserPermission() {
  const { isBoss, isManager } = common_vendor.index.getStorageSync("userInfo");
  return {
    isBoss,
    isManager
  };
}
exports.useUserPermission = useUserPermission;
//# sourceMappingURL=../../.sourcemap/mp-weixin/hooks/useUserPermission.js.map
