"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://localhost:8080/api";
function request(config = {}) {
  let {
    url,
    header = {},
    data = {},
    method
  } = config;
  url = BASE_URL + url;
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      header,
      method,
      data,
      success(res) {
        if (res.statusCode === 200) {
          let {
            code,
            message
          } = res.data;
          if (code === 200) {
            resolve(res.data);
          } else if (code === 400) {
            common_vendor.index.showModal({
              title: "错误提示",
              content: message,
              showCancel: false
            });
            resolve(res.data);
          }
        } else {
          common_vendor.index.showToast({
            title: res.errMsg,
            icon: "none"
          });
        }
      },
      fail(error) {
        reject(error);
      }
    });
  });
}
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
