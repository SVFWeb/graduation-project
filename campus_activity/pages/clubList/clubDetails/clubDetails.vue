<template>
	<view class="clubDetails container">
		<!-- 社团基本信息 -->
		<view class="clubDetails_info">
			<view class="title">{{ clubInfo.name }}</view>
			<view class="id">#ID:{{ clubInfo.id }}</view>
			<view class="btn" @click="onShowDialog">加入社团</view>
		</view>

		<!-- 社团成员 -->
		<view class="clubDetails_member">
			<view class="title">社团成员</view>
			<view class="text">当前社团共有{{ clubInfo.memberCount }}位成员</view>
		</view>

		<!-- 社团简介 -->
		<view class="clubDatails_info">
			<view class="title">社团简介</view>
			<view class="text">{{ clubInfo.name }}</view>
		</view>

		<!-- 社团活动 -->
		<view class="clubDatails_activity">
			<view class="title">社团活动</view>
			<view class="activity_list">
				<com-activity-item v-for="item in 6" :key="item"></com-activity-item>
			</view>
		</view>
	</view>

	<!-- 提示窗示例 -->
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="info" confirmText="加入" cancelText="取消" content="是否确认加入该社团"
			@confirm="onJoinClub"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import comActivityItem from '../../../components/com-activity-item/com-activity-item.vue';
	import {
		ref
	} from 'vue';
	import {
		apiJoinClub
	} from '@/api/club/index.js'

	const alertDialog = ref(null)
	const clubInfo = ref([])
	const userInfo = ref(uni.getStorageSync('userInfo'))

	function onShowDialog() {
		alertDialog.value?.open()
	}

	async function onJoinClub() {
		let res = await apiJoinClub({
			clubId: clubInfo.value.id,
			userId: userInfo.value.id
		})

		if (res.code == 200) {
			uni.showToast({
				icon: 'success',
				title: res.message
			})
		}
	}

	onLoad((e) => {
		clubInfo.value = JSON.parse(decodeURIComponent(e.info))
	})
</script>

<style lang="scss" scoped>
	.clubDetails {

		// 公共样式
		.title {
			font-size: 40rpx;
			font-weight: 500;
			color: #333;
			margin-bottom: 50rpx;
		}

		.text {
			font-size: 28rpx;
			color: #666;
			line-height: 1.6;
		}

		// 社团信息区块
		.clubDetails_info {
			margin-bottom: 60rpx;
			padding-bottom: 50rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.title {
				font-size: 44rpx;
				color: #1a1a1a;
				margin-bottom: 30rpx;
			}

			.id {
				font-size: 26rpx;
				color: #999;
				margin-bottom: 40rpx;
			}

			.btn {
				padding: 16rpx 32rpx;
				display: inline-block;
				color: #fff;
				font-size: 28rpx;
				background: linear-gradient(135deg, #0083F4, #0066CC);
				border-radius: 50rpx;
				box-shadow: 0 4rpx 12rpx rgba(0, 131, 244, 0.3);
				transition: all 0.3s ease;

				&:active {
					transform: scale(0.98);
					box-shadow: 0 2rpx 8rpx rgba(0, 131, 244, 0.4);
				}
			}
		}

		// 社团成员区块
		.clubDetails_member {
			margin-bottom: 90rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.text {
				margin-bottom: 45rpx;
				font-size: 30rpx;
				color: #333;
			}

			.details {
				font-size: 28rpx;
				color: #0083F4;
				font-weight: 500;
				display: inline-block;
				padding: 8rpx 16rpx;
				border-radius: 8rpx;
				background-color: rgba(0, 131, 244, 0.1);
				transition: all 0.3s ease;

				&:active {
					background-color: rgba(0, 131, 244, 0.2);
				}
			}
		}

		// 社团简介区块
		.clubDatails_info {
			margin-bottom: 90rpx;
			padding-bottom: 50rpx;
			border-bottom: 1rpx solid #f0f0f0;

			.text {
				background: linear-gradient(135deg, #f8f9fa, #e9ecef);
				padding: 40rpx;
				border-radius: 20rpx;
			}
		}

		// 社团活动区块
		.clubDatails_activity {
			.activity_list {
				display: flex;
				flex-wrap: wrap;
				align-items: stretch;
				justify-content: space-between;

				// 为活动项添加统一的卡片效果
				::v-deep .activity-item {
					border-radius: 20rpx;
					overflow: hidden;
					box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
					transition: all 0.3s ease;

					&:active {
						transform: translateY(-4rpx);
						box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.12);
					}
				}
			}
		}

		// 区块通用样式
		.clubDetails_member,
		.clubDatails_info,
		.clubDatails_activity {
			.title {
				position: relative;
				padding-left: 20rpx;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 8rpx;
					height: 32rpx;
					background: linear-gradient(135deg, #0083F4, #00A3FF);
					border-radius: 4rpx;
				}
			}
		}
	}
</style>