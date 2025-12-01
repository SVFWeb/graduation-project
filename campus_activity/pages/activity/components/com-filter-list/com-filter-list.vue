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
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const filterListData = ref({
		status: ['全部', '审核中', '报名中', '等待中', '进行中', '已结束'],
		cate: ['全部', '文艺', '体育', '学术', '公益'],
		level: ['全部', '班级', '院级', '校级']
	})
	const type = ref()

	const filterList = computed(() => filterListData.value[type.value])

	function onGoTo(value) {
		uni.$emit(`filterBack_${type.value}`, {value})
		uni.navigateBack()
	}

	onLoad((option) => {
		type.value = option.type
	})
</script>

<style lang="scss" scoped>

</style>