<template>
	<view class="viewPage">
		<view class="content">
			<view class="title">项目名称</view>
			<Select placeholder="请选择治疗项目" width="590" :binData="list" padding="20rpx" :isShowAllBack="true" :selectIco="true"></Select>
			<view class="title">项目名称</view>
			<Select placeholder="请选择治疗项目" width="590" :binData="list" padding="20rpx" :isShowAllBack="true"></Select>
			<view class="title">项目名称</view>
			<Select placeholder="请选择治疗项目" width="590" :binData="list" padding="20rpx" :isShowAllBack="true"></Select>
			<view class="title">项目名称</view>
			<Select placeholder="请选择治疗项目" width="590" :binData="list" padding="20rpx" :isShowAllBack="true"></Select>
			<view class="title">项目名称</view>
			<view class="dateView" :style="'color:'+(start_time == '请选择医嘱开始时间'?'#999999':'#333333')" @click="showDateSelect(true)">
				<view class="dateLeft">{{start_time}}</view>
				<image :src='visible? "/static/wodehuanzhe/below.png":"/static/wodehuanzhe/top.png"'></image>
			</view>
			<view class="title">项目时间</view>
			<view class="timeItem" v-for="(v,k) in xiangMuTimeList" :key="k">
				<view class="timeItemLeft">
					<view class="timeView" @click="showTimeView(k,0)">
						<view class="timeViewLeft">{{v.value[0]}}</view>
						<image :src="(nowIndex == k && visibleTime &&isStartTime == 0)?'/static/wodehuanzhe/below.png':'/static/wodehuanzhe/top.png'"></image>
					</view>
					<view class="timeViewBorder"></view>
					<view class="timeView" @click="showTimeView(k,1)">
						<view class="timeViewLeft">{{v.value[1]}}</view>
						<image :src="(nowIndex == k && visibleTime &&isStartTime == 1)?'/static/wodehuanzhe/below.png':'/static/wodehuanzhe/top.png'"></image>
					</view>
				</view>
				
				<image src="" @click="deleteTimeView(k)" class="timeItemRight"></image>
			</view>
			<view class="addItem" @click="addItem">
				<image src=""></image>
				<view class="">添加一个时间</view>
			</view>
			<view class="save">保存</view>
		</view>
		<w-picker :visible.sync="visible" mode="date" startYear="2017" endYear="2029" value="2020-04-07" :current="true"
		 fields="day" @confirm="onConfirm" @cancel="onCancel" :disabled-after="false" ref="date"></w-picker>

		<w-picker :visible.sync="visibleTime" mode="time" :second="false" startYear="2017" endYear="2029" :value="`${xiangMuTimeList.length>=1?xiangMuTimeList[nowIndex].value[isStartTime]:'00:00:00'}`"
		 :current="false" @confirm="onConfirmTime" @cancel="onCancelTime" :disabled-after="false" ref="time"></w-picker>
	</view>
</template>

<script>
	import Select from "../../../components/yealuo-select/yealuo-select.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				list: [{
						value: '12123',
						id: 1
					},
					{
						value: '12124',
						id: 2
					},
					{
						value: '12125',
						id: 3
					}
				],
				xiangMuTimeList: [
				],
				start_time: "请选择医嘱开始时间",
				visible: false,
				visibleTime: false,
				nowIndex: 0,
				isStartTime: true
			}
		},
		methods: {
			showDateSelect(f = true) {
				this.visible = f;
			},
			onConfirm(data) {
				this.start_time = data.value;

			},
			onCancel(e) {
				this.visible = false;
			},
			showTimeView(k, f) {
				this.nowIndex = k;
				this.isStartTime = f;
				this.visibleTime = true;
			},
			onConfirmTime(data) {
				console.log(data)
				this.xiangMuTimeList[this.nowIndex].value[this.isStartTime] = data.result;
			},
			onCancelTime() {

			},
			deleteTimeView(index) {
				let that = this;
				if (this.xiangMuTimeList[index].value[0] == this.xiangMuTimeList[index].value[1]) {
					that.xiangMuTimeList.splice(index, 1);
					that.nowIndex = 0;
				} else {
					uni.showModal({
						title: "温馨提示",
						content: "确定要删除该时间？",
						confirmColor: '#31D880',
						mask: true,
						success(e) {
							if (!e.cancel) {
								that.xiangMuTimeList.splice(index, 1);
								that.nowIndex = 0;
							}

						}
					})
				}
				console.log(this.xiangMuTimeList);
			},
			addItem() {
				this.xiangMuTimeList.push({
					value: ['00:00', '00:00'],
					isError: false
				})
			}
		},
		components: {
			Select,
			wPicker
		}
	}
</script>
<style scoped>
	.viewPage {
		width: 690rpx;
		padding: 30rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-bottom: 180rpx;
	}

	.content {
		padding: 0 50rpx;
		width: 590rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		padding-top: 4rpx;
		padding-bottom: 52rpx;
	}

	.title {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 44rpx;
		margin-bottom: 20rpx;
		padding-top: 36rpx;
	}

	.dateView {
		width: 540rpx;
		height: 80rpx;
		padding: 0 20rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.dateView image {
		width: 26rpx;
		height: 26rpx;
	}

	.timeItem {
		display: flex;
		width: 590rpx;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 28rpx;
	}

	.timeItem .timeItemRight {
		width: 32rpx;
		height: 32rpx;
		background-color: red;
		border-radius: 50%;
	}

	.timeItemLeft {
		width: 534rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.timeItemLeft .timeView {
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 80rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		width: 172rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		padding-left: 40rpx;
		padding-right: 30rpx;
	}

	.timeView>image {
		width: 26rpx;
		height: 26rpx;
	}

	.timeViewBorder {
		width: 14rpx;
		height: 2rpx;
		background-color: #999999;
	}

	.addItem {
		width: 296rpx;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8rpx;
		background-color: #F5F5F5;
	}

	.addItem image {
		width: 32rpx;
		height: 32rpx;
		background-color: red;
		margin-left: 24rpx;
		margin-right: 16rpx;
	}

	.addItem view {
		padding-right: 32rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.save {
		position: fixed;
		bottom: 68rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;

		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
