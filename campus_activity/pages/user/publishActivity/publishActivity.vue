<template>
	<view class="publish-activity container">
		<uni-forms ref="formRef" :modelValue="form" :rules="rules" label-position="top" label-width="120"
			validate-trigger="bind">
			<uni-forms-item label="活动名称" name="title" required>
				<uni-easyinput v-model="form.title" placeholder="请输入活动名称" />
			</uni-forms-item>

			<uni-forms-item label="活动介绍" name="intro" required>
				<uni-easyinput v-model="form.intro" type="textarea" placeholder="请填写活动介绍" :auto-height="true" />
			</uni-forms-item>

			<uni-forms-item label="活动类型" name="type" required>
				<uni-data-select v-model="form.type" :localdata="typeOptions" placeholder="请选择活动类型" />
			</uni-forms-item>

			<uni-forms-item label="活动地点" name="location" required>
				<uni-data-select v-model="form.location" :localdata="locationOptions" placeholder="请选择活动地点" />
			</uni-forms-item>

			<uni-forms-item label="活动主办方" name="organizer" required>
				<uni-data-select v-model="form.organizer" :localdata="organizerOptions" placeholder="请选择主办方" />
			</uni-forms-item>

			<uni-forms-item label="参与须知" name="notice" required>
				<uni-easyinput v-model="form.notice" type="textarea" placeholder="请填写参与须知" :auto-height="true" />
			</uni-forms-item>

			<uni-forms-item label="活动报名时间" name="signupRange" required>
				<uni-datetime-picker v-model="form.signupRange" type="datetimerange" range-separator="至"
					start-placeholder="报名开始时间" end-placeholder="报名结束时间" :end="signupEndLimit" />
			</uni-forms-item>

			<uni-forms-item label="活动开始时间" name="activityRange" required>
				<uni-datetime-picker v-model="form.activityRange" type="datetimerange" range-separator="至"
					start-placeholder="活动开始时间" end-placeholder="活动结束时间" :start="activityStartLimit" />
			</uni-forms-item>

			<uni-forms-item label="最大报名人数" name="maxParticipants" required>
				<uni-number-box v-model="form.maxParticipants" :min="1" :max="9999" :step="1" background="#f5f5f5" />
			</uni-forms-item>

			<uni-forms-item label="人员是否要审核" name="needReview" required>
				<uni-data-checkbox v-model="form.needReview" :localdata="reviewOptions" mode="button" />
			</uni-forms-item>

			<uni-forms-item label="材料上传" name="materials" required>
				<uni-file-picker v-model="form.materials" fileMediatype="image" limit="5" :auto-upload="false"
					mode="list" />
				<view class="tip-text">至少上传 1 张，最多 5 张图片</view>
			</uni-forms-item>

			<button class="submit-btn" type="primary" @click="handleSubmit">提交</button>
		</uni-forms>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive,
		ref
	} from 'vue'

	const formRef = ref(null)
	const form = reactive({
		title: '',
		intro: '',
		type: '',
		location: '',
		organizer: '',
		notice: '',
		signupRange: [],
		activityRange: [],
		maxParticipants: '',
		needReview: '1',
		materials: []
	})

	// 报名结束不可晚于活动开始；活动开始不可早于报名结束
	const signupEndLimit = computed(() => form.activityRange?.[0] || '')
	const activityStartLimit = computed(() => form.signupRange?.[1] || '')


	const typeOptions = [{
			text: '学术讲座',
			value: 'lecture'
		},
		{
			text: '文体活动',
			value: 'sports'
		},
		{
			text: '志愿服务',
			value: 'volunteer'
		},
		{
			text: '竞赛赛事',
			value: 'competition'
		},
		{
			text: '其他',
			value: 'other'
		}
	]

	const locationOptions = [{
			text: '主楼报告厅',
			value: 'hall'
		},
		{
			text: '体育馆',
			value: 'gym'
		},
		{
			text: '教学楼',
			value: 'classroom'
		},
		{
			text: '图书馆',
			value: 'library'
		},
		{
			text: '户外场地',
			value: 'outdoor'
		}
	]

	const organizerOptions = [{
			text: '学生会',
			value: 'student_union'
		},
		{
			text: '社团联合会',
			value: 'association_union'
		},
		{
			text: '研究生会',
			value: 'postgraduate_union'
		},
		{
			text: '学院',
			value: 'college'
		},
		{
			text: '其他',
			value: 'other'
		}
	]

	const reviewOptions = [{
			text: '需要审核',
			value: '1'
		},
		{
			text: '无需审核',
			value: '0'
		}
	]

	const rules = {
		title: {
			required: true,
			errorMessage: '请填写活动名称'
		},
		intro: {
			required: true,
			errorMessage: '请填写活动介绍'
		},
		type: {
			required: true,
			errorMessage: '请选择活动类型'
		},
		location: {
			required: true,
			errorMessage: '请选择活动地点'
		},
		organizer: {
			required: true,
			errorMessage: '请选择主办方'
		},
		notice: {
			required: true,
			errorMessage: '请填写参与须知'
		},
		signupRange: {
			required: true,
			errorMessage: '请选择报名时间'
		},
		activityRange: {
			required: true,
			errorMessage: '请选择活动时间'
		},
		maxParticipants: {
			required: true,
			errorMessage: '请输入最大报名人数',
			validator: (rule, value, callback) => {
				const num = Number(value)
				if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
					callback('请输入正整数')
					return
				}
				callback()
			}
		},
		needReview: {
			required: true,
			errorMessage: '请选择是否需要审核'
		},
		materials: {
			required: true,
			errorMessage: '请至少上传 1 张图片',
			validator: (rule, value, callback) => {
				if (!Array.isArray(value) || value.length < 1) {
					callback('请至少上传 1 张图片')
					return
				}
				if (value.length > 5) {
					callback('最多上传 5 张图片')
					return
				}
				callback()
			}
		}
	}

	const handleSubmit = () => {
		formRef.value
			.validate()
			.then(() => {
				uni.showToast({
					title: '校验通过，可提交',
					icon: 'success'
				})
				// TODO: 提交表单数据到后端
			})
			.catch((err) => {
				console.warn('表单校验未通过', err)
			})
	}
</script>

<style lang="scss" scoped>
	.publish-activity {
		padding: 24rpx;
		background: #f7f8fa;
		min-height: 100vh;
	}

	.uni-forms {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 24rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.tip-text {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #999;
	}

	.submit-btn {
		margin-top: 32rpx;
		width: 100%;
	}
</style>