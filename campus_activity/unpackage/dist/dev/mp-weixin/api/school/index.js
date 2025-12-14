"use strict";
const utils_request = require("../../utils/request.js");
const apiGetSchoolInfoTree = () => utils_request.request({
  url: "/campus/tree"
});
const apiCreateCampus = (data) => utils_request.request({
  url: "/campus",
  method: "POST",
  data
});
exports.apiCreateCampus = apiCreateCampus;
exports.apiGetSchoolInfoTree = apiGetSchoolInfoTree;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/school/index.js.map
