<template>
	<view class="viewPage">
		<view class="content">
			<view class="title">项目名称</view>
			<Select placeholder="请选择治疗项目" width="590" :binData="list" @getBackVal1="getBackVal" uid="0" padding="20rpx"
			 :isShowAllBack="true" :selectIco="true"></Select>
			<view class="title">医嘱类型</view>
			<Select placeholder="请选择医嘱类型" width="590" :binData="list1" @getBackVal1="getBackVal" uid="1" padding="20rpx"
			 :isShowAllBack="true"></Select>
			<view class="title">医嘱频次</view>
			<Select placeholder="请选择医嘱频次" width="590" :binData="list2" @getBackVal1="getBackVal" uid="2" padding="20rpx"
			 :isShowAllBack="true"></Select>
			<view v-if="!listValue1 || listValue1.id != 2" class="title">短期医嘱天数</view>
			<Select v-if="!listValue1 || listValue1.id != 2" placeholder="请选择医嘱天数" width="590" :binData="list3" @getBackVal1="getBackVal"
			 uid="3" padding="20rpx" :isShowAllBack="true"></Select>
			<view class="title">医嘱开始时间</view>
			<view class="dateView" :style="'color:'+(start_time == '请选择医嘱开始时间'?'#999999':'#333333')" @click="showDateSelect(true,0)">
				<view class="dateLeft">{{start_time}}</view>
				<image :src='!visible? "/static/wodehuanzhe/below.png":"/static/wodehuanzhe/top.png"'></image>
			</view>
			<view class="contentview">
				<view class="bgview">
					<text class="title">短期目标</text>
					<textarea @blur="bindTextAreaBlur" class="duanqimubiao" placeholder="请输入患者的短期目标" style="height: 100px;" maxlength="-1"
					 v-model="duanqimubiao" adjust-position="true" />
					<text class="kuaijiebiaoqian">快捷标签</text>
				<view class="kuaijiebiaoqianview">
					<uni-grid :column="2"   :square="false"  :showBorder = "false" :highlight="false">
						<uni-grid-item  v-for="(item ,index) in kuaijiebianqianArray[kuaijiebianqianArrayIndex]" :key ="index" :index= "index"   >
							<text  class="bianqiantext" :style="((index + 1)%2 == 1)?'margin-right:16rpx':'margin-right:0rpx'" @click="duanqikuaijiebianqianclick(index)">{{item}}</text>
						 </uni-grid-item>
					</uni-grid>
				</view>
				<view class="huanyipi">
					<view class="centerview" @click="setStatus(1)">
						<image src="/static/icon_gongzuotai_xuanzhong.png"class="image"></image>
						<text class="text">换一批</text>					
					</view>
				</view>
				<text class="title">长期目标</text>
				<textarea  @blur="bindChangqiTextAreaBlur" class="duanqimubiao" placeholder="请输入患者的长期目标"  style="height: 100px;" maxlength="-1" v-model="changqimubiao"
				 adjust-position="true"/>
				<text class="kuaijiebiaoqian">快捷标签</text>
				<view class="kuaijiebiaoqianview">
					<uni-grid :column="2"  :square="false"   :showBorder="false"  :highlight="false">
						<uni-grid-item  v-for="(item ,index) in (kuaijiebianqianArray1[kuaijiebianqianArrayIndex1])" :key ="index" :index= "index" >
						<text :style="((index + 1)%2 == 1)?'margin-right:16rpx':'margin-right:0rpx'" class="bianqiantext" @click="duanqikuaijiebianqianclick1(index)">{{item}} </text>
						 </uni-grid-item>
					</uni-grid>
				</view>
				<view class="huanyipi">
					<view class="centerview" @click="setStatus(2)">
						<image src="/staticicon_gongzuotai_xuanzhong.png"class="image"></image>
						<text class="text">换一批</text>
			
					</view>
				</view>
			</view>
			</view>
			<!-- 
			<view class="title">项目开始时间</view>
			<view class="dateView" :style="'color:'+(xiangmu_start_time == '请选择项目开始时间'?'#999999':'#333333')" @click="showDateSelect(true,1)">
				<view class="dateLeft">{{xiangmu_start_time}}</view>
				<image :src='visible? "/static/wodehuanzhe/below.png":"/static/wodehuanzhe/top.png"'></image>
			</view> -->
			
			<view v-if="listValue && listValue.list" class="timeItem" v-for="(v,k) in listValue.list" :key="k">
				<view v-if="listValue && listValue.list" class="title hidden">{{v.name}}</view>
				<view class="timeItemLeft">
					<view class="timeView" :style="'color:'+(v.value == ''?'#999999':'#333333')" @click="showTimeView(k,0)">
						<view class="timeViewLeft">{{v.value?v.value:'请选择开始时间'}}</view>
						<image :src="(nowIndex == k && visibleTime)?'/static/wodehuanzhe/top.png':'/static/wodehuanzhe/below.png'"></image>
					</view>
<!-- 					<view class="timeViewBorder"></view>
					<view class="timeView" @click="showTimeView(k,1)">
						<view class="timeViewLeft">{{v.value[1]}}</view>
						<image :src="(nowIndex == k && visibleTime &&isStartTime == 1)?'/static/wodehuanzhe/top.png':'/static/wodehuanzhe/below.png'"></image>
					</view> -->
				</view>
				<!-- <image src="/static../static/Huanzhexiangqing/icon_deletedtime.png" @click="deleteTimeView(k)" class="timeItemRight"></image> -->
			</view>
			<!-- <view class="addItem" @click="addItem">
				<image src="/static../static/Huanzhexiangqing/icon_add.png"></image>
				<view class="">添加一个时间</view>
			</view> -->
			<view class="save" @click="save()">保存</view>
		</view>
		<w-picker :visible.sync="visible" mode="date" startYear="2017" endYear="2029" value="2020-04-07" :current="true"
		 fields="day" @confirm="onConfirm" @cancel="onCancel" :disabled-after="false" ref="date"></w-picker>

		<w-picker :visible.sync="visibleTime" mode="date" :second="false" startYear="2017" endYear="2029" :value="`${xiangMuTimeList.length>=1?xiangMuTimeList[nowIndex].value:''}`"
		 :current="false" fields="day" @confirm="onConfirmTime" @cancel="onCancelTime" :disabled-after="false" ref="time"></w-picker>
	</view>
</template>

<script>
	import Select from "@/components/yealuo-select/yealuo-select.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				list: [{
						value: '中航沈飞',
						id: 1,
						list: [{
							name: '中航沈飞中航飞'
						},{
							name: '项目二'
						},{
							name: '项目三'
						}]
					},
					{
						value: '12123',
						id: 2,
						list: [{
							name: '项目一'
						}]
					},
					{
						value: '12123',
						id: 3,
						list: [{
							name: '项目一'
						}]
					}
				],
				list1: [{
						value: '短嘱',
						id: 1
					},
					{
						value: '长嘱',
						id: 2
					}
				],
				list2: [{
						value: '一天三次',
						id: 1
					},
					{
						value: '一天二次',
						id: 2
					},
					{
						value: '一天一次',
						id: 3
					},
					{
						value: '二天三次',
						id: 4
					},
					{
						value: '二天一次',
						id: 5
					},
					{
						value: '三天一次',
						id: 6
					},
					{
						value: '四天一次',
						id: 7
					},
					{
						value: '五天一次',
						id: 8
					},
					{
						value: '六天一次',
						id: 9
					},
					{
						value: '七天一次',
						id: 10
					}
				],
				list3: [{
						value: '1',
						id: 1
					},
					{
						value: '2',
						id: 2
					},
					{
						value: '3',
						id: 3
					},
					{
						value: '4',
						id: 4
					},
					{
						value: '5',
						id: 5
					},
					{
						value: '6',
						id: 6
					},
					{
						value: '7',
						id: 7
					},
					{
						value: '8',
						id: 8
					},
					{
						value: '9',
						id: 9
					},
					{
						value: '10',
						id: 10
					},
					{
						value: '11',
						id: 11
					},
					{
						value: '12',
						id: 12
					},
					{
						value: '13',
						id: 13
					},
					{
						value: '14',
						id: 14
					},
					{
						value: '15',
						id: 15
					},
					{
						value: '16',
						id: 16
					},
					{
						value: '17',
						id: 17
					},
					{
						value: '18',
						id: 18
					},
					{
						value: '19',
						id: 19
					},
					{
						value: '20',
						id: 20
					},
					{
						value: '21',
						id: 21
					},
					{
						value: '22',
						id: 22
					},
					{
						value: '23',
						id: 23
					},
					{
						value: '24',
						id: 24
					},
					{
						value: '25',
						id: 25
					},
					{
						value: '26',
						id: 26
					},
					{
						value: '27',
						id: 27
					},
					{
						value: '28',
						id: 28
					},
					{
						value: '29',
						id: 29
					},
					{
						value: '30',
						id: 30
					}
				],
				xiangMuTimeList: [],
				start_time: "请选择医嘱开始时间",
				visible: false,
				visibleTime: false,
				nowIndex: 0,
				isStartTime: true,
				listValue: {},
				listValue1: {},
				listValue2: {},
				listValue3: {},
				nowXiangMuIndex:-1,//当前选中的项目下标
				status:1,
				status1:1,
				kuaijiebianqianArrayIndex:0,
				kuaijiebianqianArrayIndex1:0,
				mainscrollvieheight:0,
				duanqimubiao:'',
				changqimubiao:'',
				kuaijiebianqianNowIndex:-1,
				kuaijiebianqianNowIndex1:-1,
				kuaijiebianqianArray:[
					['平稳站立30s',
					'永久站立，跑五公里',
					'马拉松比赛拿到名次',
					'平稳站立30s马拉松比赛拿到名次',
					'永久站立，跑五公里',
					'马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次'],
					['1平稳站立30s',
					'1永久站立，跑五公里',
					'1马拉松比赛拿到名次',
					'1平稳站立30s马拉松比赛拿到名次',
					'1永久站立，跑五公里',
					'1马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次'],
					['2平稳站立30s',
					'2永久站立，跑五公里',
					'2马拉松比赛拿到名次',
					'2平稳站立30s马拉松比赛拿到名次',
					'2永久站立，跑五公里',
					'2马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次']
				],
				kuaijiebianqianArray1:[
					['平稳站立30s',
					'永久站立，跑五公里',
					'马拉松比赛拿到名次',
					'平稳站立30s马拉松比赛拿到名次',
					'永久站立，跑五公里',
					'马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次'],
					['1平稳站立30s',
					'1永久站立，跑五公里',
					'1马拉松比赛拿到名次',
					'1平稳站立30s马拉松比赛拿到名次',
					'1永久站立，跑五公里',
					'1马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次'],
					['2平稳站立30s',
					'2永久站立，跑五公里',
					'2马拉松比赛拿到名次',
					'2平稳站立30s马拉松比赛拿到名次',
					'2永久站立，跑五公里',
					'2马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次']
				]
							
			}
		},
		onLoad(options) {
			this.id = options.id?options.id:0;
			this.getAllItem();	
		},
		methods: {
			getBackVal(data) {
				let uid = data.uid;
				let value = data.value;
				let item = this[`list${uid == 0?'':uid}`];
				let list = null;
				let that = this;
				if(uid == 0){
					item.map((v,k)=>{
						
						if(v.id == value.split('|')[1]){
							this.nowXiangMuIndex = k;
							let item_ = [];
							that.xiangMuTimeList = [];
							v.treatmentProgramItemList.map((v,i)=>{
								item_.push({
									name:v.title,
									value:''
								})
								that.xiangMuTimeList.push({
									id:0,
									value:''
								})
							});
							list = item_;
						}
					})
					this[`listValue${uid == 0?'':uid}`] = {
						id: value.split('|')[1],
						value: value.split('|')[0],
						list
					}
				}else{
					this[`listValue${uid == 0?'':uid}`] = {
						id: value.split('|')[1],
						value: value.split('|')[0]
					}
				}
				
				this[`listValue${uid == 0?'':uid}`] = {
					id: value.split('|')[1],
					value: value.split('|')[0],
					list
				}
				console.log(this[`listValue${uid == 0?'':uid}`])
			},
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
				this.listValue.list[this.nowIndex].value = data.result;
			},
			onCancelTime(e) {
				console.log(e);
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
			},
			save() {
				let nowXiangMuTimeList = this.checkData();
				let that = this;
				if (!nowXiangMuTimeList) return false;
				let endTime = JSON.stringify(nowXiangMuTimeList);
				return request({
					url:getApp().$api.huanzhe.addTreatment,
					type:'POST',
					data:{
						days:that.listValue3.value,
						doctorAdviceType:that.listValue1.value,
						frequency:that.listValue2.id,
						patientId:that.id,
						treatmentProgramId:that.listValue.id,
						treatmentProgramName:that.listValue.value,
						type:0,
						shortGoals:that.duanqimubiao,
						longGoals:that.changqimubiao,
						endTime
					}
				}).then(data=>{
					console.log(data);
				})
			},
			getAllItem(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getProgramList,
					type:"GET",
					data:{
						pageNo:1,
						pageSize:100,
						condition:true
					}
				},true,true).then(data=>{
					that.list = data.records;
					if(data.records){
						data.records.map((v,k)=>{
							data.records[k].value = v.name; 
						})
					}
				})
			},
			checkData() {
				let nowXiangMuTimeList = [];
				let str = '';
				let isCompleteListValue = false;
				this.xiangMuTimeList = []
				this.listValue.list.map(v=>{
					if(v.value == ''){
						isCompleteListValue = true;
					}else{
						this.xiangMuTimeList.push(v)
					}
				})
				console.log(this.listValue.list)
				if (!this.listValue.id) {
					str = '请选择项目名称'
				} else if (!this.listValue1.id) {
					str = '请选择医嘱类型'
				} else if (!this.listValue2.id) {
					str = '请选择医嘱频次'
				} else if (!this.listValue3.id && this.listValue1.id ==1) {
					str = '请选择医嘱天数'
				} else if (!this.start_time) {
					str = '请选择开始时间'
				}else if(this.duanqimubiao == ''){
					str = '请填写短期目标';
				}else if(this.changqimubiao == ''){
					str = '请填写长期目标'
				}else if(isCompleteListValue){
					str = '请完善项目时间'
				}
				
				if (str) {
					uni.showToast({
						title: str,
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				this.xiangMuTimeList.map(v => {
					nowXiangMuTimeList.push(v);
				})
				return nowXiangMuTimeList;
			},
			bindTextAreaBlur: function (e) {
							this.duanqimubiao = e.detail.value;
			 },
			 bindChangqiTextAreaBlur: function (e) {
							this.changqimubiao = e.detail.value;
						}, 
			duanqikuaijiebianqianclick(index){
						  this.duanqimubiao = this.kuaijiebianqianArray[this.kuaijiebianqianArrayIndex][index];
						  this.kuaijiebianqianNowIndex = index;
			}, 
			duanqikuaijiebianqianclick1(index){
						  this.changqimubiao = this.kuaijiebianqianArray1[this.kuaijiebianqianArrayIndex1][index];
						  this.kuaijiebianqianNowIndex1 = index;
			},
			changqikuaijiebianqianclick(index){		  
						this.changqimubiao = this.kuaijiebianqianArray[index]						  
			},
			setStatus(type){
			  if(type == 1){
				  if(this.kuaijiebianqianArray.length-1 == this.kuaijiebianqianArrayIndex){
					  this.status = -1;
				  }else if(this.kuaijiebianqianArrayIndex == 0){
					  this.status = 1;
				  }
				  this.kuaijiebianqianArrayIndex += this.status;
			  }else{
				  if(this.kuaijiebianqianArray1.length-1 == this.kuaijiebianqianArrayIndex1){
									  this.status1 = -1;
				  }else if(this.kuaijiebianqianArrayIndex1 == 0){
									  this.status1 = 1;
				  }
				  this.kuaijiebianqianArrayIndex1 += this.status1;
			  }
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
		/* display: flex; */
		margin-top:40rpx;
		width: 590rpx;
		/* align-items: center;
		justify-content: space-between; */
		margin-bottom: 28rpx;
	}

	.timeItem .timeItemRight {
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
	}

	.timeItemLeft {
		width: 594rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.timeItem .title{
		padding-top:0;
	}
	.timeItemLeft .timeView {
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 80rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		width: 540rpx;
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
		/* background-color: red; */
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
<style scoped lang="scss">
	
.contentview{
	display: flex;
	flex-direction: column;
		
	.bgview{
		background: #FFFFFF;
		// box-shadow: 0px 4rpx 30rpx 0px rgba(229, 229, 229, 0.5);
		border-radius: 24rpx;
		display: flex;
		flex-direction: column;
			
		.title{
			
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-top: 58rpx;
		}
			
		.duanqimubiao{
			width:540rpx;
			background: #F6F6F6;
			border-radius: 10px;
			border: 2rpx solid #EAEAEA;
			margin-top: 28rpx;
			padding: 24rpx;
		}
			
		.kuaijiebiaoqian{
			
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			// margin-left: 40rpx;
			margin-top: 16rpx;
		}
		.kuaijiebiaoqianview{
				margin-top: 10rpx;
				// padding-left: 25rpx;
				// padding-right: 4rpx;
			.bianqiantext{
				height: 50rpx;
				  margin-top: 12rpx;
				// margin-left: 15rpx;
				margin-right: 16rpx;
				border-radius: 10rpx;
				border: 2rpx solid #F0F0F0;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				padding-left:24rpx ;
				line-height: 50rpx;				 
				    overflow: hidden;
				    text-overflow: ellipsis;  /* 超出部分省略号 */
				   display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				    -webkit-line-clamp: 1; /** 显示的行数 **/
				     -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	
				
			}
		}
			
		.huanyipi{
			display: flex;
			flex-direction: column;
			align-items:center ;
			height: 56rpx;
			margin-top: 10rpx;
			border-radius: 6rpx;
			border: 2rpx solid #F0F0F0;
				
			.centerview{
				display: flex;
				flex-direction: row;
				align-items: center;
				.image{
					width:24rpx ;
					height: 24rpx;
				}
				.text{
					
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					height: 56rpx;
					line-height: 56rpx;
					margin-left: 15rpx;
				}
			}
		
		}
	}
		
	.demo-popup{
		z-index: 5;
	  .bgtanchuangview{
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
  		 width: 586rpx;
  		 height: 712rpx;
 		 border-radius: 21rpx;
  		 
		 .greenBtn{
		 		  width: 362rpx;
		 		  height: 80rpx;
		 		  background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		 		  box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		 		  border-radius: 40rpx;
		  		  font-size: 28rpx;
		 		  font-family: PingFangSC-Medium, PingFang SC;
		 		  font-weight: 500;
		 		  color: #FFFFFF;
		 		  line-height:80rpx;
		 		  text-align: center;
				  margin-top: 40rpx;
 		 		  
		 }
		 .whiteBtn{
			 width: 362rpx;
			 height: 80rpx;
			 box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
			 border-radius: 40rpx;
			 border: 2rpx solid #29D267;
			 
 			 font-size: 28rpx;
			 font-family: PingFangSC-Medium, PingFang SC;
			 font-weight: 500;
			 color: #00D67B;
			 line-height: 80rpx;
			 text-align: center;
			 margin-top: 40rpx;
		 }
	  }
	 
	}
  	.saveBtn{
		display:flex;
		flex-direction: column;
		align-items: center;
 		margin-left:76rpx ;
		margin-right: 76rpx;
		margin-top: 60rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		height:80rpx ;
		line-height:80rpx ;
		text-align: center;
		
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
 		//bottom: 60rpx;
 	}
}

</style>
