<template>
	<view class="page container">
		<!-- 头像区域 -->
		<view class="avatar-section">
			<view class="avatar-wrapper">
				<image :src="userAvatar" mode="aspectFill" class="avatar" @click="upload" />
			</view>
		</view>

		<!-- 信息列表 -->
		<uni-list class="info-card">
			<uni-list-item title="姓名" :right-text="userInfo.realName" class="info-item" />
			<uni-list-item title="性别" :right-text="userInfo.gender===1?'男':'女'" class="info-item" />
			<uni-list-item title="学校" :right-text="userInfo.schoolName" class="info-item" />
			<uni-list-item title="学院" :right-text="userInfo.collegeName" class="info-item" />
			<uni-list-item title="班级" :right-text="userInfo.className" class="info-item" />
		</uni-list>

		<uni-list class="info-card contact-card">
			<uni-list-item title="手机号" :right-text="userInfo.phone" class="info-item" />
			<uni-list-item title="邮箱" :right-text="userInfo.email" class="info-item" />
		</uni-list>

		<!-- 优化后的保存按钮 -->
		<view class="save-button-container">
			<button class="save-btn" @click="saveChanges">
				<text class="btn-text">保存修改</text>
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import convertCloudPath from '@/utils/convertCloudPath'
	import {
		apiImproveUserInfo
	} from '@/api/user/index.js'

	const userInfo = uni.getStorageSync('userInfo')
	const userAvatar = ref(userInfo.avatarUrl)
	const filesName = ref()

	function upload() {
		uni.chooseImage({
			count: 1,
			success(e) {
				userAvatar.value = e.tempFilePaths[0]
				filesName.value = e.tempFiles[0].name
			}
		})
	}

	async function saveChanges() {
		uni.showToast({
			title: '保存成功',
			icon: 'success'
		})

		uniCloud.uploadFile({
			filePath: userAvatar.value,
			cloudPath: `avatar/${new Date().getTime()}_${filesName.value}`,
			fileType: 'image',
			success: async (e) => {
				let filePath = convertCloudPath(e.fileID)
				userInfo.avatarUrl = filePath
				let res = await apiImproveUserInfo(userInfo.id, userInfo)
				if (res.code === 200) {
					uni.setStorageSync('userInfo', res.data.user)
					uni.reLaunch({
						url: '/pages/user/user'
					})
				}

			}
		});
	}
</script>

<style lang="scss" scoped>
	// 定义主色调变量
	$primary-color: #FCB857;
	$primary-light: #FFE6B7;
	$primary-dark: #E6A33D;
	$bg-color: #F8F9FA;
	$text-primary: #333333;
	$text-secondary: #666666;
	$text-light: #999999;
	$border-color: #F0F0F0;
	$white: #FFFFFF;
	$shadow-light: rgba(0, 0, 0, 0.08);
	$shadow-medium: rgba(0, 0, 0, 0.12);

	.page {
		background-color: $bg-color;
		padding: 0;
	}

	// 头像区域
	.avatar-section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx 0 40rpx;
		background: linear-gradient(135deg, #FCB857 0%, #FF9800 100%);
		margin-bottom: 30rpx;
		overflow: hidden;

		.avatar-bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffcc80' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
			opacity: 0.5;
		}

		.avatar-wrapper {
			position: relative;
			margin-bottom: 30rpx;
			z-index: 1;

			.avatar {
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
				box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.15);
				transition: all 0.3s ease;
			}
		}

		.user-name {
			font-size: 40rpx;
			font-weight: 600;
			color: $white;
			letter-spacing: 1rpx;
			text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
			z-index: 1;
		}
	}

	// 信息卡片
	.info-card {
		background: $white;
		border-radius: 20rpx;
		overflow: hidden;
		margin: 0 30rpx 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
		border: 1rpx solid $border-color;
		transition: all 0.25s ease;

		:deep(.uni-list-item) {
			padding: 30rpx 32rpx;
			border-bottom: 1rpx solid $border-color;
			position: relative;

			&:last-child {
				border-bottom: none;
			}

			&:not(:last-child):after {
				content: '';
				position: absolute;
				left: 32rpx;
				right: 32rpx;
				bottom: 0;
				height: 1rpx;
				background: $border-color;
			}

			.uni-list-item__container {
				.uni-list-item__content {
					.uni-list-item__content-title {
						font-size: 32rpx;
						color: $text-primary;
						font-weight: 500;
						letter-spacing: 1rpx;
					}
				}

				.uni-list-item__extra {
					.uni-list-item__extra-text {
						font-size: 30rpx;
						color: $text-secondary;
						max-width: 400rpx;
						text-align: right;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: 400;
					}
				}
			}
		}
	}

	.contact-card {
		margin-bottom: 60rpx;
	}

	// 保存按钮容器
	.save-button-container {
		padding: 20rpx 30rpx 60rpx;
		background: linear-gradient(to top, $bg-color 70%, transparent);
		position: sticky;
		bottom: 0;
		z-index: 10;
	}

	// 保存按钮样式
	.save-btn {
		background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
		border: none;
		border-radius: 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 34rpx;
		font-weight: 600;
		color: $white;
		position: relative;
		overflow: hidden;
		box-shadow: 0 8rpx 30rpx rgba(252, 184, 87, 0.3);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16rpx;


		.btn-text {
			position: relative;
			z-index: 1;
			letter-spacing: 2rpx;
			transition: transform 0.3s ease;
		}


	}
</style>