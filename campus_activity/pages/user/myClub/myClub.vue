<template>
	<view class="my-club container">
		<view class="my-club_seach">
			<com-search></com-search>
		</view>
		<view class="my-club_btn">
			<view class="btn" :class="{ active: item.value===activeValue}" v-for="item in btnList" :key="item.value"
			@click="onChangeActive(item)">
				{{ item.name }}</view>
		</view>
		<view class="my-club_container">
			<uni-list>
				<uni-list-item style="height: 170rpx;" v-for="item in 6" :key="item" title="25级汉语言学写作班"
					note="文学院，院系级，班级团支部，班级部落" thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					thumb-size="lg" rightText="12" clickable @click="()=>uni.navigateTo({
						url:'/pages/clubList/clubDetails/clubDetails'
					})"></uni-list-item>
			</uni-list>

		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import comSearchVue from '@/components/com-search/com-search.vue';

	const btnList = [{
			name: '加入的',
			value: 'join'
		},
		{
			name: '管理的',
			value: 'management'
		}
	]
	const activeValue = ref('join')
	
	function onChangeActive(item){
		activeValue.value=item.value
	}
</script>

<style lang="scss" scoped>
	.my-club {
		.my-club_seach {
			margin-bottom: 30rpx;
		}

		.my-club_btn {
			display: flex;
			flex: 1;
			gap: 20rpx;
			overflow-x: auto;
			padding-bottom: 30rpx;
			scrollbar-width: none;

			.btn {
				padding: 0 32rpx;
				height: 64rpx;
				min-width: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 2rpx solid #e0e0e0;
				border-radius: 16rpx;
				font-size: 28rpx;
				color: #666;
				background: #ffffff;
				white-space: nowrap;
				font-weight: 500;
			}

			.active {
				background: linear-gradient(135deg,
						lighten($uni-topic-color, 5%) 0%,
						$uni-topic-color 100%);
				color: #ffffff;
				border: none;
				box-shadow: 0 6rpx 20rpx rgba($uni-topic-color, 0.25);
				font-weight: 600;
			}
		}

		.my-club_container {}
	}
</style>