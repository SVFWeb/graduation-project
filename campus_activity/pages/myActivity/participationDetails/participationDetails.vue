<template>
	<view class="participation container">
		<view class="participation_step">
			<uni-steps :options="list" :active="active" />
		</view>

		<view class="participation_list">
			<uni-list >
				<uni-list-item showArrow clickable   title="报名信息" @click="()=>console.log(11)"></uni-list-item>
				<uni-list-item   title="报名时间" rightText="2025.11.08"></uni-list-item>
			</uni-list>
		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const active = ref(1)
	const list = ref([{
		title: '已报名'
	}, {
		title: '待录取'
	}, {
		title: '已录取'
	}])
</script>

<style lang="scss" scoped>
	.participation {
		display: flex;
		flex-direction: column;
		.participation_step{
			margin-top: 20vh;
		}
		
		.participation_list{
			margin-top: 270rpx;
		}
	}
</style>