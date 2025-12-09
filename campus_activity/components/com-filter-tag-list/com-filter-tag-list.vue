<template>
	<view class="com-filter-list">
		<uni-list :border="false">
			<uni-list-item v-for="item in filterList" :key="item" clickable :title="item"
				@click="onGoTo(item)"></uni-list-item>
		</uni-list>

	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue'

	const props = defineProps({
		type: {
			type: String,
			required: true
		}
	})

	const filterListData = {
		status: ['全部', '审核中', '报名中', '等待中', '进行中', '已结束'],
		cate: ['全部', '文艺', '体育', '学术', '公益'],
		level: ['全部', '班级', '院级', '校级']
	}

	const filterList = computed(() => filterListData[props.type])

	const emit = defineEmits(['close'])

	function onGoTo(value) {
		uni.$emit(`filterBack_${props.type}`, {
			value
		})
		emit('close')
	}
</script>

<style lang="scss" scoped>
	.com-filter-list {
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx 0;
		max-height: 60vh;
		overflow-y: auto;
	}
</style>

