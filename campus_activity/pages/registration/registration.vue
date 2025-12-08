<template>
	<view class="registration-container">
		<view class="registration-header">
			<text class="title">创建账号</text>
			<text class="subtitle">注册新用户</text>
		</view>
		
		<view class="registration-form">
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
					placeholder="请输入密码（至少6位）"
					maxlength="20"
				/>
			</view>
			
			<view class="input-group">
				<text class="label">确认密码</text>
				<input 
					class="input" 
					type="password" 
					v-model="confirmPassword" 
					placeholder="请再次输入密码"
					maxlength="20"
				/>
			</view>
			
			<button class="register-btn" @click="handleRegister">注册</button>
			
			<view class="link-section">
				<text class="link-text" @click="goToLogin">已有账号？立即登录</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const username = ref('')
	const password = ref('')
	const confirmPassword = ref('')
	
	const handleRegister = () => {
		if (!username.value.trim()) {
			uni.showToast({
				title: '请输入账号',
				icon: 'none'
			})
			return
		}
		
		if (username.value.length < 3) {
			uni.showToast({
				title: '账号至少3位',
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
		
		if (password.value !== confirmPassword.value) {
			uni.showToast({
				title: '两次密码不一致',
				icon: 'none'
			})
			return
		}
		
		// 这里可以调用注册接口
		uni.showToast({
			title: '注册成功',
			icon: 'success'
		})
	}
	
	const goToLogin = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.registration-container {
		min-height: 100vh;
		background: linear-gradient(180deg, #e6f4ff 0%, #f0f8ff 100%);
		padding: 80rpx 60rpx;
		display: flex;
		flex-direction: column;
	}
	
	.registration-header {
		text-align: center;
		margin: 100rpx 0;
		
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
	
	.registration-form {
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
	
	.register-btn {
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
