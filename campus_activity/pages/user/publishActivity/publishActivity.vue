<template>
	<view class="publish-activity container">
		<uni-forms ref="formRef" :modelValue="form" :rules="rules" label-position="top" label-width="120">
			<uni-forms-item label="活动名称" name="name" required>
				<uni-easyinput v-model="form.name" placeholder="请输入活动名称" />
			</uni-forms-item>

			<uni-forms-item label="活动介绍" name="description" required>
				<uni-easyinput v-model="form.description" type="textarea" placeholder="请填写活动介绍" :auto-height="true" />
			</uni-forms-item>

			<uni-forms-item label="活动类型" name="activityType" required>
				<uni-data-select v-model="form.activityType" :localdata="typeOptions" placeholder="请选择活动类型" />
			</uni-forms-item>

			<uni-forms-item label="活动地点" name="location" required>
				<uni-data-select v-model="form.location" :localdata="locationOptions" placeholder="请选择活动地点" />
			</uni-forms-item>

			<uni-forms-item label="活动主办方" name="clubId" required>
				<uni-data-select v-model="form.clubId" :localdata="organizerOptions" placeholder="请选择主办方" />
			</uni-forms-item>

			<uni-forms-item label="参与须知" name="notice" required>
				<uni-easyinput v-model="form.notice" type="textarea" placeholder="请填写参与须知" :auto-height="true" />
			</uni-forms-item>

			<uni-forms-item label="活动报名时间" name="signupRange" required>
				<uni-datetime-picker v-model="form.signupRange" type="datetimerange" range-separator="至"
					start-placeholder="报名开始时间" end-placeholder="报名结束时间" :start="nowLimit" :end="signupEndLimit" />
			</uni-forms-item>

			<uni-forms-item label="活动开始时间" name="activityRange" required>
				<uni-datetime-picker v-model="form.activityRange" type="datetimerange" :disabled="form.signupRange==''"
					range-separator="至" start-placeholder="活动开始时间" end-placeholder="活动结束时间"
					:start="activityStartLimit" />
			</uni-forms-item>

			<uni-forms-item label="最大报名人数" name="maxParticipants" required>
				<uni-number-box v-model="form.maxParticipants" :min="1" :max="9999" :step="1" background="#f5f5f5" />
			</uni-forms-item>

			<uni-forms-item label="人员是否要审核" name="needReview" required>
				<uni-data-checkbox v-model="form.needReview" :localdata="reviewOptions" mode="button" />
			</uni-forms-item>

			<uni-forms-item label="材料图片上传" name="imageUrls" required>
				<uni-file-picker ref="filePicker" v-model="form.imageUrls" fileMediatype="image" limit="5"
					:auto-upload="false" @select="selectImageFile" @success="successImageFile" />
				<view class="tip-text">至少上传 1 张，最多 5 张图片</view>
			</uni-forms-item>

			<button class="submit-btn" type="primary" @click="handleSubmit">提交</button>
		</uni-forms>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {
		apiGetClubManageList
	} from '@/api/club/index.js'
	import {
		apiCreateActivity
	} from '@/api/activity/index.js'

	const userId = uni.getStorageSync('userInfo').id
	const formRef = ref(null)
	const filePicker = ref(null)
	const form = reactive({
		name: '',
		description: '',
		activityType: '',
		location: '',
		clubId: '',
		notice: '',
		signupRange: [],
		activityRange: [],
		maxParticipants: '1',
		needReview: '1',
		imageUrls: [] // 上传材料
	})

	const nowLimit = Date.now()
	// 报名结束不可晚于活动开始；活动开始不可早于报名结束
	const signupEndLimit = computed(() => form.activityRange?.[0] || '')
	const activityStartLimit = computed(() => form.signupRange?.[1] || '')
	const organizerOptions = ref([])

	const typeOptions = [{
			text: '思想成长',
			value: '思想成长'
		},
		{
			text: '实践实习',
			value: '实践实习'
		},
		{
			text: '公益志愿',
			value: '公益志愿'
		},
		{
			text: '创新创业',
			value: '创新创业'
		},
		{
			text: '文化艺体',
			value: '文化艺体'
		}
	]

	const locationOptions = [{
			text: '主楼报告厅',
			value: '主楼报告厅'
		},
		{
			text: '体育馆',
			value: '体育馆'
		},
		{
			text: '教学楼',
			value: '教学楼'
		},
		{
			text: '图书馆',
			value: '图书馆'
		},
		{
			text: '户外场地',
			value: '户外场地'
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
		name: {
			rules: [{
				required: true,
				errorMessage: '请填写活动名称'
			}]
		},
		description: {
			rules: [{
				required: true,
				errorMessage: '请填写活动介绍'
			}]
		},
		activityType: {
			rules: [{
				required: true,
				errorMessage: '请选择活动类型'
			}]
		},
		location: {
			rules: [{
				required: true,
				errorMessage: '请选择活动地点'
			}]
		},
		clubId: {
			rules: [{
				required: true,
				errorMessage: '请选择主办方'
			}]
		},
		notice: {
			rules: [{
				required: true,
				errorMessage: '请填写参与须知'
			}]
		},
		signupRange: {
			rules: [{
				required: true,
				errorMessage: '请选择报名时间'
			}]
		},
		activityRange: {
			rules: [{
				required: true,
				errorMessage: '请选择活动时间'
			}]
		},
		maxParticipants: {
			rules: [{
					required: true,
					errorMessage: '请输入最大报名人数'
				},
				{
					validateFunction: (rule, value, data, callback) => {
						const num = Number(value)
						if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
							callback('请输入正整数')
							return
						}
						return true
					}
				}
			]
		},
		needReview: {
			rules: [{
				required: true,
				errorMessage: '请选择是否需要审核'
			}]
		},
		imageUrls: {
			rules: [{
					required: true,
					errorMessage: '请至少上传 1 张图片'
				},
				{
					validateFunction: (rule, value, data, callback) => {
						if (!Array.isArray(value) || value.length < 1) {
							callback('请至少上传 1 张图片')
							return
						}
						if (value.length > 5) {
							callback('最多上传 5 张图片')
							return
						}
						return true
					}
				}
			]
		}
	}

	function selectImageFile(e) {
		form.imageUrls = e.tempFiles
	}

	async function successImageFile(e) {
		let imageUrls = e.tempFiles.map(item => item.url)
		let fomData = {
			...form,
			imageUrls,
			registrationStartTime: form.signupRange[0],
			registrationEndTime: form.signupRange[1],
			startTime: form.activityRange[0],
			endTime: form.activityRange[1],
			needAudit:form.needReview=='1'?true:false
		}

		let res = await apiCreateActivity(fomData)

		if (res.code == 200) {
			uni.hideLoading()

			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/user/user'
				})

				uni.showToast({
					title: '创建成功',
					icon: 'success'
				})
			}, 1000)

		}
	}

	const handleSubmit = async () => {
		try {
			// 主动触发表单校验
			await formRef.value.validate()

			uni.showToast({
				title: '校验通过，可提交',
				icon: 'success'
			})

			await filePicker.value.upload()

			uni.showLoading()


		} catch (e) {
			uni.showToast({
				title: '请完善信息',
				icon: 'error'
			})
		}
	}

	onMounted(async () => {
		let res = await apiGetClubManageList(userId)
		organizerOptions.value = res.data.items
	})
</script>

<style lang="scss" scoped>
	.publish-activity {
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