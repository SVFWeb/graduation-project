"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeEchart_components_lEchart_props = require("./props.js");
const uni_modules_limeEchart_components_lEchart_canvas = require("./canvas.js");
const uni_modules_limeEchart_components_lEchart_utils = require("./utils.js");
const _sfc_main = common_vendor.defineComponent({
  props: uni_modules_limeEchart_components_lEchart_props.echartProps,
  emits: ["finished"],
  setup(props, { emit, expose }) {
    let echartsLibrary = null;
    const instance = common_vendor.getCurrentInstance();
    const canvasId = `lime-echart-${instance.uid}`;
    const isInitialized = common_vendor.ref(false);
    const chartContainer = common_vendor.ref(null);
    const initializationQueue = [];
    const callbackQueue = [];
    let chartInstance = null;
    const styles = common_vendor.computed(() => {
      if (props.landscape) {
        return {
          transform: "translate(-50%,-50%) rotate(90deg)",
          top: "50%",
          left: "50%"
        };
      }
      return {};
    });
    const checkInitialization = () => {
      if (chartInstance)
        return false;
      common_vendor.index.__f__("warn", "at uni_modules/lime-echart/components/l-echart/l-echart.vue:97", `组件还未初始化，请先使用 init`);
      return true;
    };
    const setOption = (options) => {
      if (checkInitialization())
        return;
      chartInstance.setOption(options);
    };
    const hideLoading = () => {
      if (checkInitialization())
        return;
      chartInstance.showLoading();
    };
    const showLoading = () => {
      if (checkInitialization())
        return;
      chartInstance.hideLoading();
    };
    const clear = () => {
      if (checkInitialization())
        return;
      chartInstance.clear();
    };
    const dispose = () => {
      if (checkInitialization())
        return;
      chartInstance.dispose();
    };
    const processInitializationQueue = () => {
      while (initializationQueue.length > 0) {
        if (chartInstance != null) {
          const resolve = initializationQueue.pop();
          resolve(chartInstance);
        }
      }
      if (chartInstance != null) {
        while (callbackQueue.length > 0) {
          const callback = callbackQueue.pop();
          callback(chartInstance);
        }
      }
    };
    const resize = (dimensions) => {
      if (checkInitialization())
        return;
      uni_modules_limeEchart_components_lEchart_utils.getRect(`#${canvasId}`, instance.proxy).then((res) => {
        chartInstance.resize({ width: res.width, height: res.height });
      });
    };
    let canvasNode;
    const canvasToTempFilePath = (options) => {
      var _a;
      if (checkInitialization())
        return;
      if (canvasNode) {
        (_a = options.success) == null ? void 0 : _a.call(options, {
          tempFilePath: canvasNode.toDataURL()
        });
      } else {
        common_vendor.index.canvasToTempFilePath({
          ...options,
          canvasId
        }, instance.proxy);
      }
    };
    const getContext = () => {
      return uni_modules_limeEchart_components_lEchart_utils.getRect(`#${canvasId}`, instance.proxy).then((res) => {
        let dpr = uni_modules_limeEchart_components_lEchart_utils.devicePixelRatio;
        let { width, height, node } = res;
        let canvas = null;
        if (!(width || height)) {
          return Promise.reject("no rect");
        }
        if (node && node.getContext) {
          const ctx = node.getContext("2d");
          canvas = new uni_modules_limeEchart_components_lEchart_canvas.Canvas(ctx, instance.proxy, true, node);
          canvasNode = node;
        } else {
          dpr = 1;
          const ctx = common_vendor.index.createCanvasContext(canvasId, instance.proxy);
          canvas = new uni_modules_limeEchart_components_lEchart_canvas.Canvas(ctx, instance.proxy, false);
        }
        return { canvas, width, height, devicePixelRatio: dpr, node };
      });
    };
    const getTouch = (e) => {
      const touches = e.touches[0];
      const touch = props.landscape ? {
        x: touches.y,
        y: touches.x
      } : {
        x: touches.x,
        y: touches.y
      };
      return touch;
    };
    const handleTouchStart = (e) => {
      if (chartInstance == null)
        return;
      const handler = chartInstance.getZr().handler;
      const touch = getTouch(e);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "mousedown", touch);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "click", touch);
    };
    const handleTouchMove = (e) => {
      if (chartInstance == null)
        return;
      const handler = chartInstance.getZr().handler;
      const touch = getTouch(e);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "mousemove", touch);
    };
    const handleTouchEnd = (e) => {
      if (chartInstance == null || !props.autoHideTooltip)
        return;
      const handler = chartInstance.getZr().handler;
      const touch = {
        x: 999999999,
        y: 999999999
      };
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "mousemove", touch);
      uni_modules_limeEchart_components_lEchart_canvas.dispatch.call(handler, "touchend", touch);
    };
    const init = async (echartsLib = echartsLibrary, ...args) => {
      const library = echartsLib || echartsLibrary;
      if (!library) {
        common_vendor.index.__f__("error", "at uni_modules/lime-echart/components/l-echart/l-echart.vue:307", "ECharts library is required");
        return Promise.reject("ECharts library is required");
      }
      let theme = null;
      let config = {};
      let callback = null;
      args.forEach((item) => {
        if (typeof item === "function") {
          callback = item;
        } else if (typeof item === "string") {
          theme = item;
        } else if (typeof item === "object") {
          config = item;
        }
      });
      if (props.beforeDelay) {
        await uni_modules_limeEchart_components_lEchart_utils.sleep(props.beforeDelay);
      }
      let options = await getContext();
      uni_modules_limeEchart_components_lEchart_canvas.setCanvasCreator(library, options);
      chartInstance = library.init(options.canvas, theme, Object.assign({}, options, config));
      if (callback && typeof callback === "function") {
        callbackQueue.push(callback);
      }
      return new Promise((resolve) => {
        initializationQueue.push(resolve);
        processInitializationQueue();
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        isInitialized.value = true;
        emit("finished");
        processInitializationQueue();
      });
    });
    common_vendor.onBeforeUnmount(() => {
      clear();
      dispose();
    });
    expose({
      init,
      setOption,
      hideLoading,
      showLoading,
      clear,
      dispose,
      resize,
      canvasToTempFilePath
    });
    return {
      canvasId,
      chartContainer,
      styles,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.canvasId
  }, _ctx.canvasId ? {
    b: common_vendor.s(_ctx.styles),
    c: _ctx.canvasId,
    d: _ctx.isDisableScroll,
    e: _ctx.canvasId,
    f: common_vendor.o((...args) => _ctx.handleTouchStart && _ctx.handleTouchStart(...args)),
    g: common_vendor.o((...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
    h: common_vendor.o((...args) => _ctx.handleTouchEnd && _ctx.handleTouchEnd(...args)),
    i: common_vendor.s(_ctx.lStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-echart/components/l-echart/l-echart.js.map
