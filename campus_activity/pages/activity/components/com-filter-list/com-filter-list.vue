<template>
	<view class="com-filter-list">
		<uni-list>
			<uni-list-item v-for="item in filterList" :key="item" clickable :title="item"
				@click="onGoTo(item)"></uni-list-item>
		</uni-list>

	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue'

	const props = defineProps({
		type: String // 上级页面传过来的“筛类型”：status / cate / level
	})


	const filterList = computed(() => {
		return props.type === 'status' ? ['全部', '审核中', '报名中', '等待中', '进行中', '已结束'] :
			props.type === 'cate' ? ['全部', '文艺', '体育', '学术', '公益'] : ['全部', '院级', '校级', '省级', '国家级']
	})

	function onGoTo(value) {
		uni.$emit('filterBack', {
			type: props.type,
			value
		})
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>

</style>