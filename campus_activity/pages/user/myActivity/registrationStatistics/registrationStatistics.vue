<template>
	<view class="registration-statistics">
		<view class="chart-container">
			<view class="chart-title">{{ activityInfo.name || '活动报名状态统计' }}</view>
			<view class="chart-content">
				<l-echart ref="chartRef" @finished="initChart"></l-echart>
			</view>
			<view class="chart-info">
				<text>总报名人数: {{ statisticsData.total || 0 }}</text>
				<text>当前参与人数:
					{{ statisticsData.currentParticipants || 0 }}/{{ statisticsData.maxParticipants || 0 }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		apiGetRegistrationStatistics
	} from '@/api/activity/index.js'

	const props = defineProps(['id'])
	const managerUserId = uni.getStorageSync('userInfo').id
	const chartRef = ref(null)
	const activityInfo = ref({})
	const statisticsData = ref({
		pending: 0,
		approved: 0,
		rejected: 0,
		total: 0,
		maxParticipants: 0,
		currentParticipants: 0
	})

	// 仅在小程序环境下引入 ECharts
	// #ifdef MP
	const echarts = require('../../../../static/echarts.min.js')
	// #endif
	// #ifndef MP
	const echarts = null // H5 和 App 环境不需要手动引入
	// #endif

	// 获取活动统计数据
	const getActivityStatistics = async () => {

		const response = await apiGetRegistrationStatistics({
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

			// 初始化图表
			await initChart();
		}
	}

	// 创建饼图配置选项
	const createPieChartOption = () => {
		return {
			title: {
				left: 'center',
				textStyle: {
					fontSize: 16
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} {b}: {c} ({d}%)'
			},
			legend: {
				orient: 'horizontal',
				bottom: '5%',
				data: ['待审核', '已通过', '已拒绝']
			},
			series: [{
				name: '报名状态',
				type: 'pie',
				radius: ['40%', '70%'],
				data: [{
						value: statisticsData.value.pending,
						name: '待审核'
					},
					{
						value: statisticsData.value.approved,
						name: '已通过'
					},
					{
						value: statisticsData.value.rejected,
						name: '已拒绝'
					}
				],
				color: ['#FFA500', '#52C41A', '#FF4D4F'],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
	}

	// 初始化图表
	const initChart = async () => {
		if (!chartRef.value) return

		try {
			const chart = await chartRef.value.init(echarts)
			const option = createPieChartOption()
			chart.setOption(option)
		} catch (error) {
			console.error('图表初始化失败:', error)
		}
	}

	// 页面加载时获取数据
	onMounted(() => {
		getActivityStatistics()
	})
</script>

<style lang="scss" scoped>
	.registration-statistics {
		min-height: 100vh;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chart-container {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20rpx;
		padding: 40rpx;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10rpx);
		width: 100%;
		max-width: 800rpx;
	}

	.chart-title {
		font-size: 32rpx;
		font-weight: 700;
		text-align: center;
		margin-bottom: 30rpx;
		color: #2c3e50;
		position: relative;
		padding-bottom: 15rpx;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 100rpx;
			height: 4rpx;
			background: linear-gradient(90deg, #667eea, #764ba2);
			border-radius: 2rpx;
		}
	}

	.chart-content {
		width: 100%;
		height: 550rpx;
		margin-bottom: 30rpx;
	}

	.chart-info {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-top: 30rpx;
		padding: 25rpx;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		border-radius: 15rpx;

		text {
			flex: 1;
			min-width: 250rpx;
			font-size: 26rpx;
			color: #34495e;
			font-weight: 500;
			text-align: center;
			padding: 15rpx 0;

			&:first-child {
				color: #667eea;
			}

			&:last-child {
				color: #764ba2;
			}
		}
	}
</style>