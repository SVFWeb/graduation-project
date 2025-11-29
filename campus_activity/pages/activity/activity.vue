<template>
	<view class="activity container">
		<view class="activity_search">
			<com-search></com-search>
		</view>

		<view class="activity_filter_tag_list">
			<view :class="['filter_tag', filterText.status==='状态'?'':'filter_tag--filter']" @click="goFilter('status')">
				{{ filterText.status }}
			</view>
			<view :class="['filter_tag', filterText.cate==='分类'?'':'filter_tag--filter']" @click="goFilter('cate')">
				{{ filterText.cate }}
			</view>
			<view :class="['filter_tag', filterText.level==='级别'?'':'filter_tag--filter']" @click="goFilter('level')">
				{{ filterText.level }}
			</view>
			<view class="filter_tag reset" @click="onInitFilter">
				重置
			</view>
		</view>

		<view class="activity_list">
			<com-activity-item v-for="item in 6"></com-activity-item>
		</view>
	</view>
</template>

<script setup>
	import comSearch from '../../components/com-search/com-search.vue';
	import comActivityItem from '../../components/com-activity-item/com-activity-item.vue';
	import {
		onMounted,
		onUnmounted,
		ref
	} from 'vue'

	/* 当前显示的文案 */
	const filterText = ref({
		status: '状态',
		cate: '分类',
		level: '级别'
	})

	/* 跳转时把“筛类型”带过去 */
	function goFilter(type) {
		uni.navigateTo({
			url: `/pages/activity/components/com-filter-list/com-filter-list?type=${type}`
		})
	}

	/* 监听筛选返回 */
	function onFilterBack(e) {
		if(e.value==='全部'){
			if(e.type==='status'){
				filterText.value[e.type]='状态'
			}else if(e.type==='cate'){
				filterText.value[e.type]='分类'
			}else{
				filterText.value[e.type]='级别'
			}
			return
		}
		filterText.value[e.type] = e.value
	}
	

	// 重置
	function onInitFilter() {
		filterText.value = {
			status: '状态',
			cate: '分类',
			level: '级别'
		}
	}

	onMounted(() => uni.$on('filterBack', onFilterBack))
	onUnmounted(() => uni.$off('filterBack', onFilterBack))
</script>

<style lang="scss" scoped>
	.activity {
		.activity_search {
			margin-bottom: 30rpx;
		}

		.activity_filter_tag_list {
			position: relative;
			margin-bottom: 30rpx;
			display: flex;
			align-items: center;

			.filter_tag {
				margin-right: 20rpx;
				padding: 0 20rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				border: 1px solid #DEDEDE;
				border-radius: 10rpx;
				font-size: 28rpx;

				&--filter {
					background-color: $uni-topic-color;
					border: 1px transparent;
					color: #fff;
				}
			}
			
			.reset{
				position: absolute;
				right: 0;
			}
		}

		.activity_list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
		}

	}
</style>