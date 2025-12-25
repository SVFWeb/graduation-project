"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_activity_index = require("../../../../api/activity/index.js");
if (!Array) {
  const _easycom_l_echart2 = common_vendor.resolveComponent("l-echart");
  _easycom_l_echart2();
}
const _easycom_l_echart = () => "../../../../uni_modules/lime-echart/components/l-echart/l-echart.js";
if (!Math) {
  _easycom_l_echart();
}
const _sfc_main = {
  __name: "registrationStatistics",
  props: ["id"],
  setup(__props) {
    const props = __props;
    const managerUserId = common_vendor.index.getStorageSync("userInfo").id;
    const chartRef = common_vendor.ref(null);
    const activityInfo = common_vendor.ref({});
    const statisticsData = common_vendor.ref({
      pending: 0,
      approved: 0,
      rejected: 0,
      total: 0,
      maxParticipants: 0,
      currentParticipants: 0
    });
    const echarts = require("../../../../static/echarts.min.js");
    const getActivityStatistics = async () => {
      const response = await api_activity_index.apiGetRegistrationStatistics({
        activityId: props.id,
        managerUserId
      });
      if (response.code === 200) {
        const statistics = response.data.statistics;
        activityInfo.value = statistics.activityInfo;
        statisticsData.value = {
          pending: statistics.statusStats.pending,
          approved: statistics.statusStats.approved,
          rejected: statistics.statusStats.rejected,
          total: statistics.statusStats.total,
          maxParticipants: statistics.maxParticipants,
          currentParticipants: statistics.currentParticipants
        };
        await initChart();
      }
    };
    const createPieChartOption = () => {
      return {
        title: {
          left: "center",
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} {b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          bottom: "5%",
          data: ["待审核", "已通过", "已拒绝"]
        },
        series: [{
          name: "报名状态",
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            {
              value: statisticsData.value.pending,
              name: "待审核"
            },
            {
              value: statisticsData.value.approved,
              name: "已通过"
            },
            {
              value: statisticsData.value.rejected,
              name: "已拒绝"
            }
          ],
          color: ["#FFA500", "#52C41A", "#FF4D4F"],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }]
      };
    };
    const initChart = async () => {
      if (!chartRef.value)
        return;
      try {
        const chart = await chartRef.value.init(echarts);
        const option = createPieChartOption();
        chart.setOption(option);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/user/myActivity/registrationStatistics/registrationStatistics.vue:128", "图表初始化失败:", error);
      }
    };
    common_vendor.onMounted(() => {
      getActivityStatistics();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(activityInfo.value.name || "活动报名状态统计"),
        b: common_vendor.sr(chartRef, "cee11be1-0", {
          "k": "chartRef"
        }),
        c: common_vendor.o(initChart),
        d: common_vendor.t(statisticsData.value.total || 0),
        e: common_vendor.t(statisticsData.value.currentParticipants || 0),
        f: common_vendor.t(statisticsData.value.maxParticipants || 0)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cee11be1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/user/myActivity/registrationStatistics/registrationStatistics.js.map
