<template>
	<view class="activityDetail">
		<view class="activityDetail_top">
			<view class="banner">
				<swiper autoplay :interval="3000" :duration="1000" circular @change="onSwiperChange">
					<swiper-item v-for="(item, index) in bannerList" :key="index">
						<view class="swiper-item">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<!-- 轮播图指示器 -->
				<view class="swiper-indicator">
					{{ currentSwiper + 1 }}/{{ bannerList.length }}
				</view>
			</view>

			<view class="info_mask">
				<view class="mask_bg"></view>
				<view class="mask_content">
					<view class="tag status-tag">报名中</view>
					<view class="title">广西民族大学第三届大学生面试挑战赛</view>
					<view class="address">
						<uni-icons type="location-filled" size="16" color="#fff"></uni-icons>
						<view class="text">广西民族大学大学相思湖校区</view>
					</view>
					<view class="number_info">
						<view class="id">ID：123123</view>
						<view class="people_count">已报人数：28/100</view>
					</view>
				</view>
			</view>
		</view>

		<view class="activityDetail_bottom">
			<scroll-view scroll-y class="detail-scroll">
				<view class="detail_container">
					<!-- 组织者信息 -->
					<view class="organizer_card">
						<view class="organizer_header">
							<image class="organizer_avatar" src="/static/image/xin.jpg" mode="aspectFill"></image>
							<view class="organizer_info">
								<view class="organizer_name">招生处</view>
								<view class="organizer_desc">官方招生部门</view>
							</view>
							<view>
								1212
							</view>
						</view>
					</view>

					<!-- 活动详情 -->
					<view class="detail_section">
						<view class="section_title">活动介绍</view>
						<view class="section_content">
							这里是活动的详细描述信息，包括活动背景、目的、特色等内容。可以详细介绍活动的各项安排和注意事项。
						</view>
					</view>

					<view class="detail_section">
						<view class="section_title">参与须知</view>
						<view class="section_content">
							列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息列表描述信息
						</view>
					</view>

					<!-- 活动信息列表 -->
					<view class="info_list">
						<view class="info_item">
							<view class="info_label">
								<uni-icons type="calendar" size="16" color="#666"></uni-icons>
								<text>报名时间</text>
							</view>
							<view class="info_value">2025.10.01-2025.11.01</view>
						</view>
						<view class="info_item">
							<view class="info_label">
								<uni-icons type="calendar" size="16" color="#666"></uni-icons>
								<text>活动时间</text>
							</view>
							<view class="info_value">2025.10.01-2025.11.01</view>
						</view>
						<view class="info_item">
							<view class="info_label">
								<uni-icons type="flag" size="16" color="#666"></uni-icons>
								<text>活动级别</text>
							</view>
							<view class="info_value">院级</view>
						</view>
						<view class="info_item">
							<view class="info_label">
								<uni-icons type="bars" size="16" color="#666"></uni-icons>
								<text>活动类型</text>
							</view>
							<view class="info_value">文体艺术</view>
						</view>
						<view class="info_item">
							<view class="info_label">
								<uni-icons type="person" size="16" color="#666"></uni-icons>
								<text>报名人数</text>
							</view>
							<view class="info_value">300</view>
						</view>
						<view class="info_item">
							<view class="info_label">
								<uni-icons type="star" size="16" color="#666"></uni-icons>
								<text>综合评分</text>
							</view>
							<view class="info_value rating">0.0</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 底部操作栏 -->
		<view class="activityDetail_btn">
			<view class="operation_btn" @click="toggleCollect">
				<uni-icons :type="isCollected ? 'star-filled' : 'star'" size="22"
					:color="isCollected ? '#FCB857' : '#666'"></uni-icons>
				<view class="btn_text" :class="{ collected: isCollected }">{{ isCollected ? '已收藏' : '收藏' }}</view>
			</view>


			<view class="primary_btn" @click="handleSignUp">
				立即报名
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const currentSwiper = ref(0)
	const isCollected = ref(true)
	const bannerList = ref([
		'/static/logo.png',
		'/static/logo.png',
		'/static/logo.png',
		'/static/logo.png',
		'/static/logo.png'
	])

	const onSwiperChange = (e) => {
		currentSwiper.value = e.detail.current
	}

	const toggleCollect = () => {
		isCollected.value = !isCollected.value
	}

	const handleSignUp = () => {
		// 报名逻辑
		uni.showToast({
			title: '报名成功',
			icon: 'success'
		})
	}
</script>

<style lang="scss" scoped>
	.activityDetail {
		position: relative;
		background: #f8f8f8;
		min-height: 100vh;

		.activityDetail_top {
			position: relative;
			overflow: hidden;
			background: #fff;

			.banner {
				width: 100vw;
				height: 652rpx;
				position: relative;

				swiper {
					width: 100%;
					height: 100%;

					.swiper-item {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}

				.swiper-indicator {
					position: absolute;
					top: 30rpx;
					right: 30rpx;
					background: rgba(0, 0, 0, 0.4);
					color: #fff;
					padding: 8rpx 20rpx;
					border-radius: 20rpx;
					font-size: 24rpx;
					backdrop-filter: blur(10px);
				}
			}

			.info_mask {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				color: #fff;
				z-index: 10;
				padding: 40rpx 30rpx 30rpx;
				box-sizing: border-box;

				.mask_bg {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(to top,
							rgba(60, 60, 60, 0.9) 0%,
							rgba(90, 90, 90, 0.5) 60%,
							rgba(120, 120, 120, 0.2) 85%,
							transparent 100%);
					z-index: -1;
				}

				.mask_content {
					position: relative;
					z-index: 2;

					.status-tag {
						display: inline-block;
						background: linear-gradient(135deg, #0083F4, #0066CC);
						padding: 8rpx 24rpx;
						font-size: 24rpx;
						border-radius: 12rpx;
						font-weight: 500;
						letter-spacing: 1rpx;
						margin-bottom: 24rpx;
						box-shadow: 0 4rpx 12rpx rgba(0, 131, 244, 0.3);
					}

					.title {
						font-size: 36rpx;
						font-weight: 700;
						line-height: 1.4;
						margin-bottom: 24rpx;
						text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
					}

					.address {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						margin-bottom: 24rpx;
						opacity: 0.95;

						.text {
							margin-left: 12rpx;
						}
					}

					.number_info {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 24rpx;
						opacity: 0.85;

						.id {
							flex: 1;
						}

						.people_count {
							flex: 1;
							text-align: right;
						}
					}
				}
			}
		}

		.activityDetail_bottom {
			padding-bottom: 120rpx;
			height: calc(100vh - 652rpx);

			.detail-scroll {
				height: 100%;

				.detail_container {
					padding: 30rpx;
				}
			}

			.organizer_card {
				background: #fff;
				border-radius: 16rpx;
				padding: 30rpx;
				margin-bottom: 24rpx;
				box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);

				.organizer_header {
					display: flex;
					align-items: center;

					.organizer_avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 12rpx;
						margin-right: 20rpx;
					}

					.organizer_info {
						flex: 1;

						.organizer_name {
							font-size: 32rpx;
							font-weight: 600;
							color: #333;
							margin-bottom: 8rpx;
						}

						.organizer_desc {
							font-size: 24rpx;
							color: #999;
						}
					}

					.follow_btn {
						padding: 12rpx 24rpx;
						border: 1rpx solid $uni-topic-color;
						color: $uni-topic-color;
						border-radius: 20rpx;
						font-size: 24rpx;
					}
				}
			}

			.detail_section {
				background: #fff;
				border-radius: 16rpx;
				padding: 30rpx;
				margin-bottom: 24rpx;
				box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);

				.section_title {
					font-size: 32rpx;
					font-weight: 600;
					color: #333;
					margin-bottom: 20rpx;
					position: relative;
					padding-left: 20rpx;

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 28rpx;
						background: $uni-topic-color;
						border-radius: 3rpx;
					}
				}

				.section_content {
					font-size: 28rpx;
					line-height: 1.6;
					color: #666;
				}
			}

			.info_list {
				background: #fff;
				border-radius: 16rpx;
				overflow: hidden;
				box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);

				.info_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 28rpx 30rpx;
					border-bottom: 1rpx solid #f0f0f0;

					&:last-child {
						border-bottom: none;
					}

					.info_label {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #666;

						uni-icons {
							margin-right: 12rpx;
						}
					}

					.info_value {
						font-size: 28rpx;
						color: #333;
						font-weight: 500;

						&.rating {
							color: #FF6B35;
						}
					}
				}
			}
		}

		.activityDetail_btn {
			display: flex;
			justify-content: space-between;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100vw;
			height: 120rpx;
			background: #fff;
			box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
			padding: 0 30rpx;
			box-sizing: border-box;
			align-items: center;

			.operation_btn {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 40rpx;
				padding: 16rpx 0;

				.btn_text {
					font-size: 22rpx;
					color: #666;
					margin-top: 8rpx;

					&.collected {
						color: #FCB857;
					}
				}
			}

			.primary_btn {
				width: 60vw;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: linear-gradient(135deg, $uni-topic-color, darken($uni-topic-color, 10%));
				color: #fff;
				font-size: 32rpx;
				font-weight: 600;
				border-radius: 40rpx;
				box-shadow: 0 8rpx 24rpx rgba($uni-topic-color, 0.3);
			}
		}
	}
</style>