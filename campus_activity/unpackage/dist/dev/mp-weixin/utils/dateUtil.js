"use strict";
function formatTime(timestamp, format = "YYYY-MM-DD hh:mm:ss") {
  if (!timestamp)
    return "";
  const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (typeof timestamp === "string" && datetimeRegex.test(timestamp)) {
    return timestamp;
  }
  timestamp = Number(timestamp);
  if (timestamp.toString().length === 10) {
    timestamp *= 1e3;
  }
  const date = new Date(timestamp);
  const pad = (n) => n.toString().padStart(2, "0");
  const map = {
    "YYYY": date.getFullYear(),
    "MM": pad(date.getMonth() + 1),
    "DD": pad(date.getDate()),
    "hh": pad(date.getHours()),
    "mm": pad(date.getMinutes()),
    "ss": pad(date.getSeconds()),
    "M": date.getMonth() + 1,
    "D": date.getDate(),
    "h": date.getHours(),
    "m": date.getMinutes(),
    "s": date.getSeconds()
  };
  return format.replace(/YYYY|MM|DD|hh|mm|ss|M|D|h|m|s/g, (matched) => map[matched]);
}
exports.formatTime = formatTime;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/dateUtil.js.map
