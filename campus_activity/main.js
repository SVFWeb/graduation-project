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
const routeNoControl=['/pages/index/index','/pages/system/login/login','/pages/system/registration/registration','/pages/activity/activity','/pages/user/user']

// 为每个api添加拦截器
routeTypes.forEach(item => {
	uni.addInterceptor(item, {
		invoke(option) {
			const token = uni.getStorageSync('token')
			const profileCompleted = uni.getStorageSync('profileCompleted')
			
			// 检查是否登录
			if (!token && !routeNoControl.includes(option.url)) {
				uni.reLaunch({
					url: '/pages/system/login/login'
				})
				return false
			}
			
			// 如果已登录但未完善个人信息
			if (token && !profileCompleted) {
				// 允许访问的页面：登录、注册、完善信息
				const allowedPages = ['/pages/system/login/login', '/pages/system/registration/registration', '/pages/system/userInfo/userInfo']
				// 如果是switchTab到首页，允许进入（首页会自己检查并跳转）
				if (item === 'switchTab' && option.url === '/pages/index/index') {
					return true
				}
				// 如果访问的不是允许的页面，跳转到完善信息页面
				if (!allowedPages.includes(option.url)) {
					uni.redirectTo({
						url: '/pages/system/userInfo/userInfo'
					})
					return false
				}
			}
		}
	})
});
