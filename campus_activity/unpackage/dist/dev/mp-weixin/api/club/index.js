"use strict";
const utils_request = require("../../utils/request.js");
const apiCreateClub = (data) => utils_request.request({
  url: "/clubs",
  method: "POST",
  data
});
exports.apiCreateClub = apiCreateClub;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/club/index.js.map
