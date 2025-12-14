import request from '@/utils/request.js'

// 创建社团
export const apiCreateClub = (data) => request({
	url: '/clubs',
	method: 'POST',
	data
})

