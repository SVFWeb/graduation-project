"use strict";
const utils_request = require("../../utils/request.js");
const apiCreateActivity = (data) => utils_request.request({
  url: "/activities",
  method: "POST",
  data
});
const apiGetActivityList = (data) => utils_request.request({
  url: "/activities/search",
  method: "POST",
  data
});
const apiQueryActivity = (id) => utils_request.request({
  url: `/activities/${id}`
});
const apiJoinActivity = (id, data) => utils_request.request({
  url: `/activities/${id}/register`,
  method: "POST",
  data
});
const apiGetHotActivity = () => utils_request.request({
  url: "/activities/hot"
});
const apiGetClubActivity = (id) => utils_request.request({
  url: `/activities/club/${id}`
});
const apiGetJoinOrManangeActivity = (data) => utils_request.request({
  url: `/activities/user/${data.id}?type=${data.type}&keyword=${data.keyword}`
});
const apiGetActiviyStatus = (data) => utils_request.request({
  url: `/activities/${data.activityId}/registrations/check?userId=${data.userId}`
});
const apiActivityRate = (data) => utils_request.request({
  url: "/activities/comment",
  method: "POST",
  data
});
const apiGetMemberReviewList = (data) => utils_request.request({
  url: `/activities/${data.activityId}/registrations/status?managerUserId=${data.userId}`
});
const apiMemberReview = (data) => utils_request.request({
  url: "/activities/registrations/review",
  method: "POST",
  data
});
const apiActivityReviewList = () => utils_request.request({
  url: "/activities/pending?bossUserId=8"
});
const apiActivityReview = (data) => utils_request.request({
  url: "/activities/review",
  method: "POST",
  data
});
const apiGetRegistrationStatistics = (data) => utils_request.request({
  url: `/activities/${data.activityId}/statistics?managerUserId=${data.managerUserId}`
});
const apiCheckinActivity = (data) => utils_request.request({
  url: "/activities/checkin",
  method: "POST",
  data
});
const apiUpdateActivity = (data) => utils_request.request({
  url: "/activities/update",
  method: "PUT",
  data
});
const apiUpdateActivityStatus = (id, data) => utils_request.request({
  url: `/activities/${id}/publish-status`,
  method: "PUT",
  data
});
exports.apiActivityRate = apiActivityRate;
exports.apiActivityReview = apiActivityReview;
exports.apiActivityReviewList = apiActivityReviewList;
exports.apiCheckinActivity = apiCheckinActivity;
exports.apiCreateActivity = apiCreateActivity;
exports.apiGetActivityList = apiGetActivityList;
exports.apiGetActiviyStatus = apiGetActiviyStatus;
exports.apiGetClubActivity = apiGetClubActivity;
exports.apiGetHotActivity = apiGetHotActivity;
exports.apiGetJoinOrManangeActivity = apiGetJoinOrManangeActivity;
exports.apiGetMemberReviewList = apiGetMemberReviewList;
exports.apiGetRegistrationStatistics = apiGetRegistrationStatistics;
exports.apiJoinActivity = apiJoinActivity;
exports.apiMemberReview = apiMemberReview;
exports.apiQueryActivity = apiQueryActivity;
exports.apiUpdateActivity = apiUpdateActivity;
exports.apiUpdateActivityStatus = apiUpdateActivityStatus;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/api/activity/index.js.map
