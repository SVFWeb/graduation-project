<template>
	<view class="scan-code-container">
		<camera  device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
		<button type="primary" @click="takePhoto">拍照</button>
		<view>预览</view>
		<image mode="widthFix" :src="src"></image>
	</view>
	<!-- 自定义tabBar -->
	<custom-tabbar></custom-tabbar>
</template>

<script>
	import customTabbar from '@/components/custom-tabbar/custom-tabbar.vue';
	
	export default {
		components: {
			customTabbar
		},
		data() {
			return {
				src: ""
			}
		},
		methods: {
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
					}
				});
			},
			error(e) {
				console.log(e.detail);
			}
		}
	}
</script>

<style lang="scss" scoped>
.scan-code-container {
	padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	min-height: 100vh;
}
</style>