import {
	ref
} from 'vue'
export default function useFilterTag(value,type) {


	const title = ref(value)
	const isActive=ref(false)

	function onChangeTitle(e) {
		
		if(type!=e.type) return
		if (e.value === '全部') {
			isActive.value=false
			title.value = value
		} else {
			isActive.value=true
			title.value =e.value
		}

	}

	return {
		title,
		onChangeTitle,
		isActive
	}

}