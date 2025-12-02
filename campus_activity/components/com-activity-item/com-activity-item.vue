<template>
	<view class="com-activity-item_cotainer" @click="onToActivitDetail">
		<view class="activity_tag">报名中</view>
		<view class="activity_image">
			<image src="/static/logo.png" mode="aspectFill"></image>
		</view>
		<view class="activity_time">2025.11.26至2025.11.30</view>
		<view class="activity_title">广西民族大学校园广播节目类型与需求调查问卷第二期</view>
		<view class="activity_category">文化艺体</view>
	</view>
</template>

<script setup>
	function onToActivitDetail(){
		uni.navigateTo({
			url:'/pages/activityDetail/activityDetail'
		})
	}
</script>

<style lang="scss" scoped>
	.com-activity-item_cotainer {
		margin-bottom: 20rpx;
		position: relative;
		width: 342rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 10rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);

		.activity_tag {
			position: absolute;
			top: 24rpx;
			left: 24rpx;
			z-index: 2;
			padding: 8rpx 20rpx;
			background: #FF6B35;
			color: #fff;
			font-size: 20rpx;
			border-radius: 10rpx;
			line-height: 1;

			&--class {
				background: #4CAF50;
			}
		}

		.activity_image {
			width: 100%;
			height: 200rpx;
			border-radius: 12rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			background: #f0f0f0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.activity_time {
			font-size: 22rpx;
			color: $uni-topic-color;
			margin-bottom: 16rpx;
			line-height: 1.4;
		}

		.activity_title {
			font-size: 26rpx;
			font-weight: 500;
			color: #333;
			line-height: 1.4;
			margin-bottom: 16rpx;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			height: 72rpx;
		}

		.activity_category {
			font-size: 22rpx;
			color: #999;
			padding-top: 8rpx;
			border-top: 1rpx solid #f0f0f0;
		}
	}
</style>