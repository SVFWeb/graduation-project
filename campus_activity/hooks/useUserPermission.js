export default function useUserPermission(){
	const { isBoss,isManager } =uni.getStorageSync('userInfo')
	
	return {
		isBoss,
		isManager
	}
}