<template>
	<view class="page">
		<uni-list class="card">
			<uni-list-item title="头像" :thumb="userInfo.avatar" thumb-size="lg" clickable />
			<uni-list-item title="姓名" :right-text="userInfo.name" />
			<uni-list-item title="性别" :right-text="userInfo.gender" />
			<uni-list-item title="学校" :right-text="userInfo.school" />
			<uni-list-item title="学院" :right-text="userInfo.college" />
			<uni-list-item title="班级" :right-text="userInfo.className" />
			<uni-list-item title="手机号" :right-text="userInfo.phone" />
			<uni-list-item title="邮箱" :right-text="userInfo.email" />
		</uni-list>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue'

	const userInfo = reactive({
		avatar: '/static/image/xin.jpg', // 可替换为用户上传的头像
		name: '林嘉宇',
		gender: '男',
		school: '广西民族大学',
		college: '应用技术学院',
		className: '24级计算机科学与技术（专升本）04班',
		phone: '138****8888',
		email: 'linjiayu@example.com'
	})
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
	}

	.title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 24rpx;
	}
</style>