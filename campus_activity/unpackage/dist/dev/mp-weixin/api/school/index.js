"use strict";
const utils_request = require("../../utils/request.js");
const apiGetSchoolInfoTree = () => utils_request.request({
  url: "/campus/tree"
});
exports.apiGetSchoolInfoTree = apiGetSchoolInfoTree;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/school/index.js.map
