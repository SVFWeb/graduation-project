<template>
	<view class="userinfo-container">
		<view class="userinfo-header">
			<text class="title">完善个人信息</text>
			<text class="subtitle">请填写以下信息以继续使用</text>
		</view>
		
		<view class="userinfo-form">
			<uni-forms ref="form" :rules="rules" :modelValue="formData" label-position="top">
				<uni-forms-item label="姓名" name="name" required>
					<input 
						class="input" 
						type="text" 
						v-model="formData.name" 
						placeholder="请输入真实姓名"
						maxlength="20"
						@input="onInput('name', $event)"
					/>
				</uni-forms-item>
				
				<uni-forms-item label="学号" name="studentId" required>
					<input 
						class="input" 
						type="text" 
						v-model="formData.studentId" 
						placeholder="请输入学号"
						maxlength="20"
						@input="onInput('studentId', $event)"
					/>
				</uni-forms-item>
				
				<uni-forms-item label="性别" name="gender" required>
					<radio-group @change="onGenderChange" class="radio-group">
						<label class="radio-item">
							<radio value="男" :checked="formData.gender === '男'" color="#1890ff" />
							<text class="radio-text">男</text>
						</label>
						<label class="radio-item">
							<radio value="女" :checked="formData.gender === '女'" color="#1890ff" />
							<text class="radio-text">女</text>
						</label>
					</radio-group>
				</uni-forms-item>
				
				<uni-forms-item label="学校/学院/班级" name="schoolInfo" required>
					<picker 
						mode="multiSelector" 
						:range="multiArray" 
						:value="multiIndex" 
						@change="onPickerChange" 
						@columnchange="onPickerColumnChange"
						class="picker-wrapper"
					>
						<view class="picker-input">
							<text :class="pickerDisplayText ? 'picker-text' : 'picker-placeholder'">
								{{ pickerDisplayText || '请选择学校、学院、班级' }}
							</text>
							<text class="picker-arrow">›</text>
						</view>
					</picker>
				</uni-forms-item>
				
				<uni-forms-item label="手机号" name="phone">
					<input 
						class="input" 
						type="number" 
						v-model="formData.phone" 
						placeholder="请输入手机号（选填）"
						maxlength="11"
						@input="onInput('phone', $event)"
					/>
				</uni-forms-item>
				
				<uni-forms-item label="邮箱" name="email">
					<input 
						class="input" 
						type="text" 
						v-model="formData.email" 
						placeholder="请输入邮箱（选填）"
						maxlength="50"
						@input="onInput('email', $event)"
					/>
				</uni-forms-item>
			</uni-forms>
			
			<button class="submit-btn" @click="handleSubmit">提交</button>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, computed } from 'vue'
	
	const form = ref(null)
	const formData = reactive({
		name: '',
		studentId: '',
		schoolName:'',
		college:'',
		className:'',
		gender:'',
		phone: '',
		email: ''
	})
	
	// 三级联动数据（示例数据，可根据实际情况修改）
	const schoolData = [
		{
			name: '广西民族大学',
			colleges: [
				{
					name: '计算机与信息工程学院',
					classes: ['计算机科学与技术2021级1班', '计算机科学与技术2021级2班', '软件工程2021级1班', '软件工程2021级2班']
				},
				{
					name: '商学院',
					classes: ['工商管理2021级1班', '工商管理2021级2班', '市场营销2021级1班']
				},
				{
					name: '文学院',
					classes: ['汉语言文学2021级1班', '汉语言文学2021级2班', '新闻学2021级1班']
				}
			]
		},
		{
			name: '广西大学',
			colleges: [
				{
					name: '机械工程学院',
					classes: ['机械工程2021级1班', '机械工程2021级2班', '自动化2021级1班']
				},
				{
					name: '电气工程学院',
					classes: ['电气工程2021级1班', '电气工程2021级2班']
				}
			]
		},
		{
			name: '广西师范大学',
			colleges: [
				{
					name: '教育科学学院',
					classes: ['教育学2021级1班', '心理学2021级1班']
				},
				{
					name: '文学院',
					classes: ['汉语言文学2021级1班', '历史学2021级1班']
				}
			]
		}
	]
	
	// 构建三级联动的数组
	const multiArray = computed(() => {
		const schools = schoolData.map(item => item.name)
		const colleges = schoolData[multiIndex.value[0]]?.colleges.map(item => item.name) || []
		const classes = schoolData[multiIndex.value[0]]?.colleges[multiIndex.value[1]]?.classes || []
		return [schools, colleges, classes]
	})
	
	// 初始化 multiIndex
	const initMultiIndex = () => {
		if (formData.schoolName && formData.college && formData.className) {
			// 如果已有数据，尝试找到对应的索引
			const schoolIndex = schoolData.findIndex(school => school.name === formData.schoolName)
			if (schoolIndex !== -1) {
				const collegeIndex = schoolData[schoolIndex].colleges.findIndex(college => college.name === formData.college)
				if (collegeIndex !== -1) {
					const classIndex = schoolData[schoolIndex].colleges[collegeIndex].classes.findIndex(cls => cls === formData.className)
					if (classIndex !== -1) {
						return [schoolIndex, collegeIndex, classIndex]
					}
				}
			}
		}
		return [0, 0, 0]
	}
	
	const multiIndex = ref(initMultiIndex())
	const pickerDisplayText = computed(() => {
		if (!formData.schoolName || !formData.college || !formData.className) {
			return ''
		}
		return `${formData.schoolName} - ${formData.college} - ${formData.className}`
	})
	
	const rules = {
		name: {
			rules: [
				{ required: true, errorMessage: '请输入姓名' }
			]
		},
		studentId: {
			rules: [
				{ required: true, errorMessage: '请输入学号' },
				{
					pattern: /^\d+$/,
					errorMessage: '学号格式不正确，只能输入数字'
				}
			]
		},
		gender: {
			rules: [
				{ required: true, errorMessage: '请选择性别' }
			]
		},
		schoolInfo: {
			rules: [
				{
					validateFunction: (rule, value, data, callback) => {
						if (!formData.schoolName || !formData.college || !formData.className) {
							callback('请选择学校、学院、班级')
						}
						return true
					}
				}
			]
		},
		phone: {
			rules: [
				{
					validateFunction: (rule, value, data, callback) => {
						if (value && !/^1[3-9]\d{9}$/.test(value)) {
							callback('手机号格式不正确')
						}
						return true
					}
				}
			]
		},
		email: {
			rules: [
				{
					validateFunction: (rule, value, data, callback) => {
						if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
							callback('邮箱格式不正确')
						}
						return true
					}
				}
			]
		}
	}
	
	const onInput = (name, e) => {
		const value = e.detail ? e.detail.value : e.target.value
		formData[name] = value
		if (form.value) {
			form.value.setValue(name, value)
		}
	}
	
	// 性别选择变化
	const onGenderChange = (e) => {
		formData.gender = e.detail.value
		if (form.value) {
			form.value.setValue('gender', e.detail.value)
		}
	}
	
	// 三级联动选择器变化
	const onPickerChange = (e) => {
		const values = e.detail.value
		multiIndex.value = values
		
		const schoolIndex = values[0]
		const collegeIndex = values[1]
		const classIndex = values[2]
		
		if (schoolData[schoolIndex]) {
			formData.schoolName = schoolData[schoolIndex].name
			
			if (schoolData[schoolIndex].colleges[collegeIndex]) {
				formData.college = schoolData[schoolIndex].colleges[collegeIndex].name
				
				if (schoolData[schoolIndex].colleges[collegeIndex].classes[classIndex]) {
					formData.className = schoolData[schoolIndex].colleges[collegeIndex].classes[classIndex]
				}
			}
		}
		
		// 更新表单验证
		if (form.value) {
			form.value.setValue('schoolInfo', pickerDisplayText.value)
		}
	}
	
	// 列变化时处理联动
	const onPickerColumnChange = (e) => {
		const column = e.detail.column
		const value = e.detail.value
		
		// 更新当前列的索引（需要创建新数组以触发响应式更新）
		const newIndex = [...multiIndex.value]
		newIndex[column] = value
		
		// 如果改变了学校，重置学院和班级
		if (column === 0) {
			newIndex[1] = 0
			newIndex[2] = 0
		}
		// 如果改变了学院，重置班级
		else if (column === 1) {
			newIndex[2] = 0
		}
		
		multiIndex.value = newIndex
	}
	
	const handleSubmit = async () => {
		try {
			await form.value.validate()
		
			// 保存个人信息到本地存储
			// uni.setStorageSync('userInfo', formData)
			uni.setStorageSync('profileCompleted', true)
			
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
			
			// 跳转到主页
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}, 1500)
		} catch (e) {
			console.log('表单校验失败', e)
		}
	}
</script>

<style lang="scss" scoped>
	.userinfo-container {
		min-height: 100vh;
		background: linear-gradient(180deg, #e6f4ff 0%, #f0f8ff 100%);
		padding: 80rpx 60rpx;
	}
	
	.userinfo-header {
		text-align: center;
		margin-bottom: 60rpx;
		
		.title {
			display: block;
			font-size: 56rpx;
			font-weight: bold;
			color: #1890ff;
			margin-bottom: 20rpx;
		}
		
		.subtitle {
			display: block;
			font-size: 28rpx;
			color: #409eff;
		}
	}
	
	.userinfo-form {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 60rpx 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(24, 144, 255, 0.15);
	}
	
	.input {
		width: 100%;
		height: 88rpx;
		background: #fafafa;
		border-radius: 8rpx;
		padding: 0 24rpx;
		font-size: 28rpx;
		color: #333333;
		box-sizing: border-box;
		border: 1rpx solid #d9ecff;
		
		&::placeholder {
			color: #999999;
		}
	}
	
	.radio-group {
		display: flex;
		gap: 60rpx;
		
		.radio-item {
			display: flex;
			align-items: center;
			gap: 12rpx;
			
			.radio-text {
				font-size: 28rpx;
				color: #333333;
			}
		}
	}
	
	.picker-wrapper {
		width: 100%;
		
		.picker-input {
			width: 100%;
			height: 88rpx;
			background: #fafafa;
			border-radius: 8rpx;
			padding: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			border: 1rpx solid #d9ecff;
			
			.picker-text {
				font-size: 28rpx;
				color: #333333;
				flex: 1;
			}
			
			.picker-placeholder {
				font-size: 28rpx;
				color: #999999;
				flex: 1;
			}
			
			.picker-arrow {
				font-size: 32rpx;
				color: #999999;
				transform: rotate(90deg);
			}
		}
	}
	
	.submit-btn {
		width: 100%;
		height: 88rpx;
		background: #1890ff;
		border-radius: 8rpx;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 500;
		margin-top: 40rpx;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&::after {
			border: none;
		}
		
		&:active {
			opacity: 0.8;
			background: #40a9ff;
		}
	}
</style>

