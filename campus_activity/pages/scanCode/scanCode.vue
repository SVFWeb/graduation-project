<template>
	<view class="scan-code container">

		<view class="scan-box">
			<view class="scan-frame">
				<camera
					v-if="canUseCamera"
					class="camera-view"
					device-position="back"
					mode="scanCode"
					flash="off"
					@scancode="onScanCode"
					@error="onCameraError"
				/>
				<view v-else class="camera-placeholder" @click="ensureCameraPermission">
					<text>请先授权摄像头以开始扫码</text>
				</view>
			</view>
			<view class="scan-hint">对准二维码/条码自动识别</view>
		</view>

		<button class="album-btn" type="default" @click="pickFromAlbum">
			相册
		</button>
	</view>

	<custom-tabbar></custom-tabbar>
</template>

<script setup>
	import customTabbar from '@/components/custom-tabbar/custom-tabbar.vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';

	const isHandlingResult = ref(false);
	const canUseCamera = ref(false);

	const handleScanResult = (res) => {
		if (isHandlingResult.value) return;
		isHandlingResult.value = true;
		console.log('scan result', res);
		const result = res?.result || res?.code || res?.path;
		if (result) {
			uni.showToast({ title: '签到成功', icon: 'success' });
		} else {
			uni.showToast({ title: '未能识别，请重试', icon: 'none' });
		}
		// 适当延时避免快速重复触发
		setTimeout(() => {
			isHandlingResult.value = false;
		}, 800);
	};

	const onScanCode = (event) => {
		handleScanResult(event?.detail);
	};

	const onCameraError = (err) => {
		console.warn('camera error', err);
		uni.showToast({ title: '摄像头不可用', icon: 'none' });
	};

	const requestCameraAuth = () =>
		new Promise((resolve) => {
			uni.authorize({
				scope: 'scope.camera',
				success: () => resolve(true),
				fail: () => resolve(false),
			});
		});

	const openSettingForCamera = () =>
		new Promise((resolve) => {
			uni.openSetting({
				success(res) {
					resolve(res.authSetting?.['scope.camera'] === true);
				},
				fail() {
					resolve(false);
				},
			});
		});

	const ensureCameraPermission = async () => {
		uni.getSetting({
			async success(res) {
				const hasAuth = res.authSetting?.['scope.camera'] === true;
				if (hasAuth) {
					canUseCamera.value = true;
					return;
				}

				const granted = await requestCameraAuth();
				
				if (granted) {
					canUseCamera.value = true;
					return;
				}

				uni.showModal({
					title: '需要摄像头权限',
					content: '请在设置中开启摄像头权限以完成扫码签到',
					confirmText: '去设置',
					success: async (modalRes) => {
						if (modalRes.confirm) {
							const ok = await openSettingForCamera();
							canUseCamera.value = ok;
							if (!ok) {
								uni.showToast({ title: '未开启权限', icon: 'none' });
							}
						}
					},
				});
			},
			fail() {
				uni.showToast({ title: '无法获取权限状态', icon: 'none' });
			},
		});
	};

	const pickFromAlbum = () => {
		if (isHandlingResult.value) return;
		uni.scanCode({
			onlyFromCamera: false, // 从相册选择照片
			scanType: ['qrCode', 'barCode'],
			success(res) {
				handleScanResult(res);
			},
			fail(err) {
				console.warn('choose image failed', err);
				uni.showToast({ title: '未能识别，请重试', icon: 'none' });
			},
		});
	};

	onLoad(() => {
		ensureCameraPermission();
	});
</script>

<style lang="scss" scoped>
.scan-code.container {
	min-height: 100vh;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.scan-btn {
	margin-bottom: 24rpx;
	width: 300rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: linear-gradient(135deg, #0bb4f0, #4ad1f9);
	color: #fff;
	border: none;
	border-radius: 16rpx;
}

.scan-box {
	width: 520rpx;
	height: 520rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 32rpx;
	box-sizing: border-box;
}

.scan-frame {
	width: 100%;
	height: 100%;
	border: 4rpx dashed #0bb4f0;
	border-radius: 24rpx;
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
}

.camera-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999;
	font-size: 26rpx;
	background: #f6f6f6;
}

.camera-view {
	width: 100%;
	height: 100%;
}

.scan-hint {
	margin-top: 24rpx;
	font-size: 28rpx;
	color: #666;
}

.album-btn {
	margin-top: 40rpx;
	width: 240rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: linear-gradient(135deg, #FCB857 0%, #FF9800 100%);
	color: #fff;
	border: none;
	border-radius: 16rpx;
}
</style>