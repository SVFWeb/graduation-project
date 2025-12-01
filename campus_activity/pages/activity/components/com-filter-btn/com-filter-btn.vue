<template>
	<view class="com-filter-btn">
		<view :class="{'filter_tag':true,'active':tag.isActive.value}" @click="goFilter">
			{{ tag.title.value }}
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		onUnmounted
	} from 'vue'
	import useFilterTag from '../../../../hooks/useFilterTag';
	const props = defineProps(['title', 'type'])
	const tag = useFilterTag(props.title, props.type)


	function goFilter() {
		uni.navigateTo({
			url: `/pages/activity/components/com-filter-list/com-filter-list?type=${props.type}`
		})
	}


	onMounted(() => uni.$on('filterBack', tag.onChangeTitle))
	onUnmounted(() => uni.$off('filterBack', tag.onChangeTitle))
</script>

<style lang="scss" scoped>
	.com-filter-btn {
		.filter_tag {
			margin-right: 20rpx;
			padding: 0 20rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			border: 1px solid #DEDEDE;
			border-radius: 10rpx;
			font-size: 28rpx;
		}

		.active {
			background-color: $uni-topic-color;
			border: 1px transparent;
			color: #fff;
		}
	}
</style>