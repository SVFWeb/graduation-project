<template>
	<view class="activity container">
		<view class="activity_search">
			<com-search v-model:value="searchValue" @click="onSearch"></com-search>
		</view>

		<view class="activity_filter_tag_list">
			<com-filter-btn v-model:title="filterRes.status" type="status"></com-filter-btn>
			<com-filter-btn v-model:title="filterRes.cate" type="cate"></com-filter-btn>
			<com-filter-btn v-model:title="filterRes.level" type="level"></com-filter-btn>
		</view>

		<view class="activity_list">
			<com-activity-item v-for="item in 6"></com-activity-item>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import comSearch from '@/components/com-search/com-search.vue';
	import comActivityItem from '@/components/com-activity-item/com-activity-item.vue';
	import comFilterBtn from '@/components/com-filter-btn/com-filter-btn.vue';
	
	const searchValue=ref('')
	const filterRes=ref({
		status:'状态',
		cate:'分类',
		level:'级别'
	})
	
	function onSearch(){
		console.log(filterRes.value);
	}
</script>

<style lang="scss" scoped>
	.activity {
		.activity_search {
			margin-bottom: 30rpx;
		}

		.activity_filter_tag_list {
			margin-bottom: 30rpx;
			display: flex;
		}

		.activity_list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
		}

	}
</style>