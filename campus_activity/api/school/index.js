import requset from '@/utils/request.js'

export const apiGetSchoolInfoTree = () => requset({
	url: '/campus/tree'
})