import request from '@/utils/request.js'

// 创建社团
export const apiCreateClub = (data) => request({
	url: '/clubs',
	method: 'POST',
	data
})

// 查询社团列表
export const apiGetClubList = (data) => request({
	url: '/clubs/search',
	method: 'POST',
	data
})

// 查询我加入的社团
export const apiQueryJoinClubList = (data) => request({
	url: '/clubs/joined',
	method: 'POST',
	data
})

export const apiJoinClub = (data) => request({
	url: '/clubs/join',
	method: 'POST',
	data
})