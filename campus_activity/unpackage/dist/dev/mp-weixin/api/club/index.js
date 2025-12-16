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
const apiGetJoinClubUserList = (id) => utils_request.request({
  url: `/clubs/${id}/members`
});
const apiSettingClubManager = (data) => utils_request.request({
  url: `/clubs/${data.clubId}/members/${data.userId}/manager?isManager=${data.isManager}`,
  method: "POST"
});
const apiGetClubNewList = () => utils_request.request({
  url: "/clubs/latest"
});
exports.apiCreateClub = apiCreateClub;
exports.apiGetClubList = apiGetClubList;
exports.apiGetClubNewList = apiGetClubNewList;
exports.apiGetJoinClubUserList = apiGetJoinClubUserList;
exports.apiJoinClub = apiJoinClub;
exports.apiQueryJoinClubList = apiQueryJoinClubList;
exports.apiSettingClubManager = apiSettingClubManager;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/club/index.js.map
