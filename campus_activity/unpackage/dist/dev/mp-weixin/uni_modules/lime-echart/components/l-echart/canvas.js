"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeEchart_components_lEchart_utils = require("./utils.js");
const cacheChart = {};
class EventEmit {
  constructor() {
    this.__events = {};
  }
  on(type, listener) {
    if (!type || !listener) {
      return;
    }
    const events = this.__events[type] || [];
    events.push(listener);
    this.__events[type] = events;
  }
  emit(type, e) {
    if (type.constructor === Object) {
      e = type;
      type = e && e.type;
    }
    if (!type) {
      return;
    }
    const events = this.__events[type];
    if (!events || !events.length) {
      return;
    }
    events.forEach((listener) => {
      listener.call(this, e);
    });
  }
  off(type, listener) {
    const __events = this.__events;
    const events = __events[type];
    if (!events || !events.length) {
      return;
    }
    if (!listener) {
      delete __events[type];
      return;
    }
    for (let i = 0, len = events.length; i < len; i++) {
      if (events[i] === listener) {
        events.splice(i, 1);
        i--;
      }
    }
  }
}
class Image {
  constructor() {
    this.currentSrc = null;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.width = 0;
    this.height = 0;
    this.tagName = "IMG";
  }
  set src(src) {
    this.currentSrc = src;
    common_vendor.index.getImageInfo({
      src,
      success: (res) => {
        this.naturalWidth = this.width = res.width;
        this.naturalHeight = this.height = res.height;
        this.onload();
      },
      fail: () => {
        this.onerror();
      }
    });
  }
  get src() {
    return this.currentSrc;
  }
}
class Canvas {
  constructor(ctx, com, isNew, canvasNode = {}) {
    cacheChart[com.canvasId] = { ctx };
    this.canvasId = com.canvasId;
    this.chart = null;
    this.isNew = isNew;
    this.tagName = "canvas";
    this.canvasNode = canvasNode;
    this.com = com;
    if (!isNew) {
      this._initStyle(ctx);
    }
    this._initEvent();
    this._ee = new EventEmit();
  }
  getContext(type) {
    if (type === "2d") {
      return this.ctx;
    }
  }
  setAttribute(key, value) {
    if (key === "aria-label") {
      this.com["ariaLabel"] = value;
    }
  }
  setChart(chart) {
    this.chart = chart;
  }
  createOffscreenCanvas(param) {
    if (!this.children)
      ;
    return this.children;
  }
  appendChild(child) {
    common_vendor.index.__f__("log", "at uni_modules/lime-echart/components/l-echart/canvas.js:162", "child", child);
  }
  dispatchEvent(type, e) {
    if (typeof type == "object") {
      this._ee.emit(type.type, type);
    } else {
      this._ee.emit(type, e);
    }
    return true;
  }
  attachEvent() {
  }
  detachEvent() {
  }
  addEventListener(type, listener) {
    this._ee.on(type, listener);
  }
  removeEventListener(type, listener) {
    this._ee.off(type, listener);
  }
  _initCanvas(zrender, ctx) {
  }
  _initStyle(ctx, child) {
    const styles = [
      "fillStyle",
      "strokeStyle",
      "fontSize",
      "globalAlpha",
      "opacity",
      "textAlign",
      "textBaseline",
      "shadow",
      "lineWidth",
      "lineCap",
      "lineJoin",
      "lineDash",
      "miterLimit"
    ];
    styles.forEach((style) => {
      Object.defineProperty(ctx, style, {
        set: (value) => {
          if (style === "opacity") {
            ctx.setGlobalAlpha(value);
            return;
          }
          if (style !== "fillStyle" && style !== "strokeStyle" || value !== "none" && value !== null) {
            ctx["set" + style.charAt(0).toUpperCase() + style.slice(1)](value);
          }
        }
      });
    });
    if (!this.isNew && !child) {
      ctx.uniDrawImage = ctx.drawImage;
      ctx.drawImage = (...a) => {
        a[0] = a[0].src;
        ctx.uniDrawImage(...a);
      };
    }
    if (!ctx.createRadialGradient) {
      ctx.createRadialGradient = function() {
        return ctx.createCircularGradient(...[...arguments].slice(-3));
      };
    }
    if (!ctx.strokeText) {
      ctx.strokeText = (...a) => {
        ctx.fillText(...a);
      };
    }
    if (!ctx.measureText || uni_modules_limeEchart_components_lEchart_utils.getDeviceInfo().osName == "harmonyos") {
      ctx._measureText = ctx.measureText;
      const strLen = (str) => {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
            len++;
          } else {
            len += 2;
          }
        }
        return len;
      };
      ctx.measureText = (text, font) => {
        var _a;
        let fontSize = ((_a = ctx == null ? void 0 : ctx.state) == null ? void 0 : _a.fontSize) || 12;
        if (font) {
          fontSize = parseInt(font.match(/([\d\.]+)px/)[1]);
        }
        fontSize /= 2;
        let isBold = fontSize >= 16;
        const widthFactor = isBold ? 1.3 : 1;
        return {
          width: strLen(text) * fontSize * widthFactor
        };
      };
    }
  }
  _initEvent(e) {
    this.event = {};
    const eventNames = [{
      wxName: "touchStart",
      ecName: "mousedown"
    }, {
      wxName: "touchMove",
      ecName: "mousemove"
    }, {
      wxName: "touchEnd",
      ecName: "mouseup"
    }, {
      wxName: "touchEnd",
      ecName: "click"
    }];
    eventNames.forEach((name) => {
      this.event[name.wxName] = (e2) => {
        const touch = e2.touches[0];
        this.chart.getZr().handler.dispatch(name.ecName, {
          zrX: name.wxName === "tap" ? touch.clientX : touch.x,
          zrY: name.wxName === "tap" ? touch.clientY : touch.y
        });
      };
    });
  }
  set width(w) {
    this.canvasNode.width = w;
  }
  set height(h) {
    this.canvasNode.height = h;
  }
  get width() {
    return this.canvasNode.width || 0;
  }
  get height() {
    return this.canvasNode.height || 0;
  }
  get ctx() {
    return cacheChart[this.canvasId]["ctx"] || null;
  }
  set chart(chart) {
    cacheChart[this.canvasId]["chart"] = chart;
  }
  get chart() {
    return cacheChart[this.canvasId]["chart"] || null;
  }
}
function dispatch(name, { x, y, wheelDelta }) {
  this.dispatch(name, {
    zrX: x,
    zrY: y,
    zrDelta: wheelDelta,
    preventDefault: () => {
    },
    stopPropagation: () => {
    }
  });
}
function setCanvasCreator(echarts, { canvas, node }) {
  if (echarts && !echarts.registerPreprocessor) {
    return common_vendor.index.__f__("warn", "at uni_modules/lime-echart/components/l-echart/canvas.js:356", "echarts 版本不对或未传入echarts，vue3请使用esm格式");
  }
  echarts.registerPreprocessor((option) => {
    if (option && option.series) {
      if (option.series.length > 0) {
        option.series.forEach((series) => {
          series.progressive = 0;
        });
      } else if (typeof option.series === "object") {
        option.series.progressive = 0;
      }
    }
  });
  function loadImage(src, onload, onerror) {
    let img = null;
    if (node && node.createImage) {
      img = node.createImage();
      img.onload = onload.bind(img);
      img.onerror = onerror.bind(img);
      img.src = src;
      return img;
    } else {
      img = new Image();
      img.onload = onload.bind(img);
      img.onerror = onerror.bind(img);
      img.src = src;
      return img;
    }
  }
  if (echarts.setPlatformAPI) {
    echarts.setPlatformAPI({
      loadImage: canvas.setChart ? loadImage : null,
      createCanvas() {
        const key = "createOffscreenCanvas";
        return common_vendor.index.canIUse(key) && common_vendor.index[key] ? common_vendor.index[key]({ type: "2d" }) : canvas;
      }
    });
  } else if (echarts.setCanvasCreator) {
    echarts.setCanvasCreator(() => {
      return canvas;
    });
  }
}
exports.Canvas = Canvas;
exports.dispatch = dispatch;
exports.setCanvasCreator = setCanvasCreator;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-echart/components/l-echart/canvas.js.map
