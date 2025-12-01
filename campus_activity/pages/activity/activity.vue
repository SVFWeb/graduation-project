<template>
	<view class="activity container">
		<view class="activity_search">
			<com-search></com-search>
		</view>

		<view class="activity_filter_tag_list">
			<com-filter-btn title="状态" type="status"></com-filter-btn>
			<com-filter-btn title="分类" type="cate"></com-filter-btn>
			<com-filter-btn title="级别" type="level"></com-filter-btn>
		</view>

		<view class="activity_list">
			<com-activity-item v-for="item in 6"></com-activity-item>
		</view>
	</view>
</template>

<script setup>
	import comSearch from '../../components/com-search/com-search.vue';
	import comActivityItem from '../../components/com-activity-item/com-activity-item.vue';
	import comFilterBtn from './components/com-filter-btn/com-filter-btn.vue';
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

			.reset {
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