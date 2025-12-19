import request from '@/utils/request.js'

// 创建活动
export const apiCreateActivity = (data) => request({
	url: '/activities',
	method: 'POST',
	data
})

// 获取活动列表
export const apiGetActivityList=(data)=>request({
	url:'/activities/search',
	method: 'POST',
	data
})

// 活动详情
export const apiQueryActivity=(id)=>request({
	url:`/activities/${id}`
})