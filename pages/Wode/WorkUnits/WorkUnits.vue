<template>
	<view class="page">
		<view class="item" v-for="(item , index) in list" :key="index" v-if="list.length >=1">
			<view class="title">工作单位</view>
			<input placeholder="请输入工作单位" v-model="item.company" placeholder-class="input-placeholder" />
			<view class="border"></view>
			<view class="title">所在行业</view>
			<input placeholder="请输入所在行业" v-model="item.industry" placeholder-class="input-placeholder" />
			<view class="border"></view>
			<view class="title">在职时间</view>
			<view class="dateSelected">
				<view class="startTime" :class="item.startTime?'':'time-'" @click="showTime(index,'start')">{{item.startTime?item.startTime:'开始时间'}}</view>
				<view> - </view>
				<view class="endTime" :class="item.endTime?'':'time-'" @click="showTime(index,'end')">{{item.endTime?item.endTime:'结束时间'}}</view>
			</view>
			<view class="border"></view>
			<view class="title">职业名称</view>
			<input placeholder="请输入职业名称" v-model="item.professional" placeholder-class="input-placeholder" />
			<view class="border"></view>
			<view class="title">工作内容</view>
			<textarea placeholder="请输入工作内容" v-model="item.workValue" placeholder-class="input-placeholder"></textarea>
			<view class="border"></view>
			<view class="title">拥有技能</view>
			<input placeholder="请输入你所拥有的技能" v-model="item.skills" placeholder-class="input-placeholder" />
			<view class="addData" @click="addItem(index)">{{index == list.length-1?'添加工作经历':'删除工作经历'}}</view>
		</view>
		<w-picker :visible.sync="visible" mode="date" startYear="2017" endYear="2029" :value="dateValue" :current="false"
		 fields="day" @confirm="onConfirm($event,'date1')" :disabled-after="false" ref="date1"></w-picker>
		<view class="bottom" @click="save">保存</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				visible: false,
				startTime: '',
				endTime: '',
				type: '',
				dateValue: '',
				list: [{
					company: '',
					industry: '',
					startTime: '',
					endTime: '',
					professional: '',
					workValue: '',
					skills: ''
				}]
			}
		},
		onLoad() {
			let list = uni.getStorageSync('workUnits');
			if(list){
				this.list = list;
			}
		},
		methods: {
			showTime(index,type) {
				this.type = type;
				this.nowIndex = index;
				if (type == 'start') {
					this.list[index].dateValue = this.list[index].startTime;
				} else {
					this.list[index].dateValue = this.list[index].endTime;
				}
				this.$forceUpdate()
				this.visible = true;
			},
			onConfirm(data) {
				if (this.type == 'start') {
					this.list[this.nowIndex].startTime = data.value;
				} else {
					this.list[this.nowIndex].endTime = data.value;
				}
				this.$forceUpdate()
			},
			addItem(index){
				if(this.list.length - 1 == index){
					this.list.push({
					company: '',
					industry: '',
					startTime: '',
					endTime: '',
					professional: '',
					workValue: '',
					skills: ''
				})
				}else{
					this.list.splice(index,1);
				}
				
			},
			save(){
				uni.setStorageSync('workUnits',this.list);
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 690rpx;
		padding: 30rpx;
		padding-bottom: 140rpx;
	}

	.border {
		width: 690rpx;
		height: 2rpx;
		background-color: #EAEAEA;
	}

	.title {
		line-height: 80rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	input,
	textarea {
		width: 690rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		padding-bottom: 20rpx;
	}

	textarea {
		height: 200rpx;
	}

	.dateSelected {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dateSelected view {
		height: 40rpx;
		margin-bottom: 20rpx;
	}

	.time- {
		color: #ccc;
	}

	.input-placeholder {
		color: #CCCCCC;
	}

	.addData {
		width: 252rpx;
		height: 80rpx;
		border-radius: 8rpx;
		border: 2rpx solid #333333;
		margin-top: 50rpx;
		/* margin-left: 30rpx; */
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.bottom {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	}
</style>
