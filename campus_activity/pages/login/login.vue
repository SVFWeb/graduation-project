<template>
	<view class="login-container">
		<view class="login-header">
			<text class="title">欢迎回来</text>
			<text class="subtitle">登录您的账号</text>
		</view>
		
		<view class="login-form">
			<view class="input-group">
				<text class="label">账号</text>
				<input 
					class="input" 
					type="text" 
					v-model="username" 
					placeholder="请输入账号"
					maxlength="20"
				/>
			</view>
			
			<view class="input-group">
				<text class="label">密码</text>
				<input 
					class="input" 
					type="password" 
					v-model="password" 
					placeholder="请输入密码"
					maxlength="20"
				/>
			</view>
			
			<button class="login-btn" @click="handleLogin">登录</button>
			
			<view class="link-section">
				<text class="link-text" @click="goToRegister">还没有账号？立即注册</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const username = ref('')
	const password = ref('')
	
	const handleLogin = () => {
		if (!username.value.trim()) {
			uni.showToast({
				title: '请输入账号',
				icon: 'none'
			})
			return
		}
		
		if (!password.value.trim()) {
			uni.showToast({
				title: '请输入密码',
				icon: 'none'
			})
			return
		}
		
		if (password.value.length < 6) {
			uni.showToast({
				title: '密码至少6位',
				icon: 'none'
			})
			return
		}
		
		// 这里可以调用登录接口
		uni.showToast({
			title: '登录成功',
			icon: 'success'
		})
		
		// 登录成功后可以跳转到首页
		// uni.switchTab({
		// 	url: '/pages/index/index'
		// })
	}
	
	const goToRegister = () => {
		uni.navigateTo({
			url: '/pages/registration/registration'
		})
	}
</script>

<style lang="scss" scoped>
	.login-container {
		height: 100vh;
		background: linear-gradient(180deg, #e6f4ff 0%, #f0f8ff 100%);
		padding: 80rpx 60rpx;
		display: flex;
		flex-direction: column;
	}
	
	.login-header {
		text-align: center;
		margin-top: 100rpx;
		margin-bottom: 100rpx;
		
		.title {
			display: block;
			font-size: 56rpx;
			font-weight: bold;
			color: #1890ff;
			margin-bottom: 20rpx;
		}
		
		.subtitle {
			display: block;
			font-size: 28rpx;
			color: #409eff;
		}
	}
	
	.login-form {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 60rpx 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(24, 144, 255, 0.15);
	}
	
	.input-group {
		margin-bottom: 40rpx;
		
		.label {
			display: block;
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 20rpx;
			font-weight: 500;
		}
		
		.input {
			width: 100%;
			height: 88rpx;
			background: #fafafa;
			border-radius: 8rpx;
			padding: 0 24rpx;
			font-size: 28rpx;
			color: #333333;
			box-sizing: border-box;
			border: 1rpx solid #d9ecff;
			
			&::placeholder {
				color: #999999;
			}
		}
	}
	
	.login-btn {
		width: 100%;
		height: 88rpx;
		background: #1890ff;
		border-radius: 8rpx;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 500;
		margin-top: 40rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&::after {
			border: none;
		}
		
		&:active {
			opacity: 0.8;
			background: #40a9ff;
		}
	}
	
	.link-section {
		text-align: center;
		margin-top: 40rpx;
		
		.link-text {
			font-size: 26rpx;
			color: #1890ff;
		}
	}
</style>
