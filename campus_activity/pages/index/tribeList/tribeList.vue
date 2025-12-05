<template>
	<view class="tribe_list container">
		<view class="tribe_seach">
			<com-search></com-search>
		</view>
		<view class="tribe_list_container">
			<view class="title">
				全部社团
			</view>
			<uni-list>
				<uni-list-item style="height: 170rpx;" v-for="item in 6" :key="item" title="25级汉语言学写作班" note="文学院，院系级，班级团支部，班级部落"
					thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg"
					rightText="12"></uni-list-item>
			</uni-list>

		</view>
	</view>
</template>

<script setup>
	import comSearchVue from '../../../components/com-search/com-search.vue';
</script>

<style lang="scss" scoped>
	.tribe_list {
		.tribe_seach {}

		.tribe_list_container {
			.title{
				margin-top: 50rpx;
				margin-bottom: 50rpx;
				font-size: 20px;
				font-weight: 600;
			}
		}
	}
</style>