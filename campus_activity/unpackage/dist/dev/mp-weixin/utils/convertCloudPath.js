"use strict";
function convertCloudPath(cloudPath) {
  const match = cloudPath.match(/cloud:\/\/([^\/]+)\/(.+)/);
  if (!match) {
    return cloudPath;
  }
  const envId = match[1];
  const filePath = match[2];
  return `https://${envId}.normal.cloudstatic.cn/${filePath}`;
}
exports.convertCloudPath = convertCloudPath;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/convertCloudPath.js.map
