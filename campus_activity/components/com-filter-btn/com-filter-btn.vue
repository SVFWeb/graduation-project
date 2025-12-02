<template>
	<view class="com-filter-btn">
		<view :class="{'filter_tag':true,'active':isActive}" @click="goFilter">
			{{ title }}
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue'
	const props = defineProps(['title', 'type'])
	const $emit=defineEmits(['update:title','update:type'])
	const initTitle=ref(props.title)
	const isActive = ref(false)

	function goFilter() {
		uni.navigateTo({
			url: `/pages/filterTagList/filterTagList?type=${props.type}`
		})
	}

	function onChangeTitle(e) {
		if (e.value === '全部') {
			isActive.value = false
			$emit('update:title',initTitle.value)
		} else {
			isActive.value = true
			$emit('update:title',e.value)
		}
	}

	onMounted(() => uni.$on(`filterBack_${props.type}`, onChangeTitle))
	onUnmounted(() => uni.$off(`filterBack_${props.type}`, onChangeTitle))
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