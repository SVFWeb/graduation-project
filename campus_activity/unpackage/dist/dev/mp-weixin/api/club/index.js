"use strict";
const utils_request = require("../../utils/request.js");
const apiCreateClub = (data) => utils_request.request({
  url: "/clubs",
  method: "POST",
  data
});
const apiGetClubList = (data) => utils_request.request({
  url: "/clubs/search",
  method: "POST",
  data
});
const apiQueryJoinClubList = (data) => utils_request.request({
  url: "/clubs/joined",
  method: "POST",
  data
});
const apiJoinClub = (data) => utils_request.request({
  url: "/clubs/join",
  method: "POST",
  data
});
exports.apiCreateClub = apiCreateClub;
exports.apiGetClubList = apiGetClubList;
exports.apiJoinClub = apiJoinClub;
exports.apiQueryJoinClubList = apiQueryJoinClubList;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/club/index.js.map
