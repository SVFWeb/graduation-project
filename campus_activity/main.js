import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

// 需要权限的api
const routeTypes = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch', 'navigateBack'];
// 不需要权限的页面
const routeNoControl=['/pages/index/index','/pages/login/login','/pages/registration/registration','/pages/activity/activity','/pages/user/user','/pages/userInfo/userInfo']

// 为每个api添加拦截器
routeTypes.forEach(item => {
	uni.addInterceptor(item, {
		invoke(option) {
			const token = uni.getStorageSync('token')
			const profileCompleted = uni.getStorageSync('profileCompleted')
			
			// 检查是否登录
			if (!token && !routeNoControl.includes(option.url)) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return false
			}
		}
	})
});
