<template>
	<view class="registration container">
		<view class="registration_search">
			<com-search v-model:value="searchValue" @click="onSearch"></com-search>
		</view>
		<view class="registration_filter">
			<view class="left">
				<view v-for="tab in tabs" :key="tab.value" class="btn" :class="{ active: activeTab === tab.value }"
					@click="activeTab = tab.value">
					{{ tab.label }}
				</view>
			</view>

			<view class="right">
				<com-filter-btn v-model:title="filterValue"></com-filter-btn>
			</view>
		</view>
		<view class="registration_activity_list">
			<com-activity-item v-for="item in 6" :key="item"></com-activity-item>
		</view>
	</view>
</template>

<script setup>
	import comSearch from '@/components/com-search/com-search.vue';
	import comFilterBtn from '@/components/com-filter-btn/com-filter-btn.vue';
	import comActivityItem from './components/com-activity-item/com-activity-item.vue';
	import {
		ref
	} from 'vue'

	const searchValue = ref('')
	const filterValue = ref('筛选')
	const activeTab = ref('participate')

	const tabs = [{
			label: '参与',
			value: 'participate'
		},
		{
			label: '管理',
			value: 'manage'
		}
	]

	function onSearch() {
		console.log(searchValue.value);
	}
</script>

<style lang="scss" scoped>
	.registration {
		padding: 24rpx 32rpx;
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
		min-height: 100vh;
		background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);

		.registration_search {
			margin-bottom: 40rpx;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			overflow: hidden;
		}

		.registration_filter {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40rpx;
			padding: 20rpx 0;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 2rpx;
				background: linear-gradient(90deg,
						rgba($uni-topic-color, 0.1) 0%,
						rgba($uni-topic-color, 0.3) 50%,
						rgba($uni-topic-color, 0.1) 100%);
			}

			.left {
				display: flex;
				flex: 1;
				gap: 20rpx;
				overflow-x: auto;
				padding-bottom: 8rpx;
				scrollbar-width: none;

				&::-webkit-scrollbar {
					display: none;
				}

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
					transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

			.right {
				flex-shrink: 0;
				margin-left: 24rpx;
			}
		}

	}
</style>