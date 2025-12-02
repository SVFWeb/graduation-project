<template>
	<view class="com-activity-item">
		<view class="activity_info">
			<view class="activity_info_left">
				<image src="/static/logo.png" mode=""></image>
			</view>
			<view class="activity_info_right">
				<view class="title">广西民族大学大学生职业生涯规划公益课程</view>
				<view class="type">创新创业</view>
				<view class="timer">2024.11.08 19:30 至 2024.11.08 21:30</view>
			</view>
		</view>

		<view class="activity_btn">
			<view class="btn_item" v-for="item in 3" :key="item">
				活动详情
			</view>
		</view>

		<view class="activity_tag">
			报名中
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.com-activity-item {
  position: relative;
  margin-bottom: 32rpx;
  padding: 32rpx;
  background: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.06);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  
  .activity_info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40rpx;
    gap: 24rpx;
    
    .activity_info_left {
      flex-shrink: 0;
      width: 240rpx;
      height: 180rpx;
      border-radius: 16rpx;
      overflow: hidden;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, 
          rgba(0,0,0,0) 70%, 
          rgba(0,0,0,0.1) 100%);
        pointer-events: none;
      }
      
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }
    
    .activity_info_right {
      flex: 1;
      min-width: 0;
      
      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #1a1a1a;
        line-height: 1.4;
        margin-bottom: 16rpx;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .type {
        display: inline-block;
        padding: 6rpx 16rpx;
        background: rgba($uni-topic-color, 0.1);
        color: $uni-topic-color;
        font-size: 22rpx;
        border-radius: 8rpx;
        margin-bottom: 20rpx;
        font-weight: 500;
      }
      
      .timer {
        font-size: 10px;
        color: #666;
        display: flex;
        align-items: center;
      }
    }
  }
  
  .activity_btn {
    display: flex;
    gap: 20rpx;
    margin-bottom: 8rpx;
    
    .btn_item {
      flex: 1;
      height: 68rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16rpx;
      font-size: 26rpx;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
	  border: 2rpx solid #e8e8e8;
	  color: #666;
	  background: #fafafa;
    }
  }
  
  .activity_tag {
    position: absolute;
    top: 32rpx;
    left: 32rpx;
    padding: 6rpx 20rpx;
    background: linear-gradient(135deg, #FF6B35, #FF8B5E);
    color: #fff;
    font-size: 22rpx;
    border-radius: 12rpx;
    line-height: 1;
    font-weight: 600;
    letter-spacing: 0.5rpx;
    z-index: 2;
    box-shadow: 0 4rpx 12rpx rgba(255, 107, 53, 0.25);
    
    &::before {
      content: '';
      position: absolute;
      top: -2rpx;
      left: -2rpx;
      right: -2rpx;
      bottom: -2rpx;
      background: linear-gradient(135deg, 
        rgba(255, 107, 53, 0.4), 
        rgba(255, 139, 94, 0.4));
      border-radius: 14rpx;
      z-index: -1;
    }
  }
}
</style>