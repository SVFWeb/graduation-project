import request from '@/utils/request.js'

// 创建活动
export const apiCreateActivity = (data) => request({
	url: '/activities',
	method: 'POST',
	data
})

// 获取活动列表
export const apiGetActivityList = (data) => request({
	url: '/activities/search',
	method: 'POST',
	data
})

// 活动详情
export const apiQueryActivity = (id) => request({
	url: `/activities/${id}`
})

// 报名活动
export const apiJoinActivity = (id, data) => request({
	url: `/activities/${id}/register`,
	method: 'POST',
	data
})

// 获取热门活动列表
export const apiGetHotActivity = () => request({
	url: '/activities/hot'
})

// 获取社团活动
export const apiGetClubActivity = (id) => request({
	url: `/activities/club/${id}`
})

//获取参与或管理的活动列表
export const apiGetJoinOrManangeActivity = (data) => request({
	url: `/activities/user/${data.id}?type=${data.type}&keyword=${data.keyword}`
})


// 获取活动报名详情
export const apiGetActiviyStatus = (data) => request({
	url: `/activities/${data.activityId}/registrations/check?userId=${data.userId}`
})

//评价活动
export const apiActivityRate = (data) => request({
	url: '/activities/comment',
	method: 'POST',
	data
})

// 获取人员审核列表
export const apiGetMemberReviewList = (data) => request({
	url: `/activities/${data.activityId}/registrations/status?managerUserId=${data.userId}`
})

// 审核人员
export const apiMemberReview=(data)=>request({
	url:'/activities/registrations/review',
	method: 'POST',
	data
})

// 审核活动列表
export const apiActivityReviewList=()=>request({
	url:'/activities/pending?bossUserId=8'
})