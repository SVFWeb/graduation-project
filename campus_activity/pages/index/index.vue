<template>
	<view class="home_container">
		<!-- 搜索区域 -->
		<view class="home_search" @click="uni.navigateTo({
			url:'/pages/searchActivity/searchActivity'
		})">
			<com-search></com-search>
		</view>

		<!-- 轮播图 -->
		<view class="home_banner">
			<swiper indicator-dots autoplay :interval="3000" :duration="1000" circular
				indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#ffffff">
				<swiper-item v-for="item in 4" :key="item">
					<view class="swiper-item">
						<image src="/static/image/xin.jpg" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 公告 -->
		<view class="home_announcement">
			<uni-notice-bar style="border-radius: 36rpx;border: 1rpx solid #ffeae5;" showIcon scrollable single text="精彩热门活动，欢迎您来报名~~"></uni-notice-bar>
		</view>
		
		<!-- 社团 -->
		<view class="home_tribe">
			<view class="tribe_title">
				<com-title>
					<template #left>社团</template>
					<template #right>More+</template>
				</com-title>
			</view>

			<view class="tribe_list">
				<scroll-view class="tribe_scroll" scroll-x :show-scrollbar="false">
					<view class="scroll_item_container" v-for="item in 4" :key="item">
						<view class="tribe_card">
							<view class="tribe_avatar">
								<image src="/static/logo.png" mode="aspectFill"></image>
							</view>
							<view class="tribe_info">
								<view class="tribe_name">广西民族大学社团{{item}}</view>
								<view class="tribe_desc">广西民族大学是一个广西最好的学校，提供丰富的社团活动</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 社团活动 -->
		<view class="home_activity">
			<com-title>
				<template #left>社团活动</template>
				<template #right>More+</template>
			</com-title>

			<view class="activity_list">
				<com-activity-item  v-for="item in 6" :key="item">
				</com-activity-item>
			</view>
		</view>

		<!-- 班级活动 -->
		<view class="home_activity">
			<com-title>
				<template #left>班级活动</template>
				<template #right>More+</template>
			</com-title>

			<view class="activity_list">
				<com-activity-item v-for="item in 6" :key="item">
					
				</com-activity-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import comTitle from './component/com-title.vue';
	import comSearch from '../../components/com-search/com-search.vue';
	import comActivityItem from '../../components/com-activity-item/com-activity-item.vue';
</script>

<style lang="scss" scoped>
	.home_container {
		padding: 20rpx 24rpx;
		// background: #f8f8f8;
		min-height: 100vh;

		// 搜索区域
		.home_search {
			margin-bottom: 30rpx;

			.search_input {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				border-radius: 16rpx;
				padding: 0 24rpx;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);

				.search_box {
					display: flex;
					align-items: center;
					flex: 1;
					color: #999;
					font-size: 28rpx;

					.text {
						margin-left: 16rpx;
					}
				}

				.btn {
					width: 120rpx;
					height: 56rpx;
					background: $uni-topic-color;
					color: #fff;
					font-size: 26rpx;
					border-radius: 12rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 20rpx;
				}
			}
		}

		// 轮播图
		.home_banner {
			margin-bottom: 32rpx;
			border-radius: 20rpx;
			overflow: hidden;

			swiper {
				height: 320rpx;

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
		}

		// 社团区域
		.home_tribe {
			margin-bottom: 40rpx;

			.tribe_title {
				margin-bottom: 24rpx;
			}

			.tribe_list {
				.tribe_scroll {
					white-space: nowrap;

					.scroll_item_container {
						display: inline-block;
						width: 480rpx;
						height: 180rpx;
						margin-right: 20rpx;

						&:last-child {
							margin-right: 0;
						}

						.tribe_card {
							display: flex;
							align-items: center;
							height: 100%;
							background: #fff;
							border-radius: 16rpx;
							padding: 24rpx;
							box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);

							.tribe_avatar {
								width: 120rpx;
								height: 120rpx;
								border-radius: 12rpx;
								overflow: hidden;
								flex-shrink: 0;
								background: #f0f0f0;

								image {
									width: 100%;
									height: 100%;
								}
							}

							.tribe_info {
								flex: 1;
								margin-left: 20rpx;
								overflow: hidden;

								.tribe_name {
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									font-size: 28rpx;
									font-weight: 600;
									color: #333;
									margin-bottom: 12rpx;
								}

								.tribe_desc {
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									font-size: 24rpx;
									color: #666;
									line-height: 1.4;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									-webkit-box-orient: vertical;

								}
							}
						}
					}
				}
			}
		}

		// 活动区域
		.home_activity {
			margin-bottom: 40rpx;

			.activity_list {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
			}
		}

	}
</style>