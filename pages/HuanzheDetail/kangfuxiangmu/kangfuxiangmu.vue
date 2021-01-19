<template>
	<view class="viewPage">
		<view class="xuangMuInfo">
			<view class="infoLeft">
				<view class="leftName">
					<view class="">{{info.huanZheInfo.name}}</view>
					<view class="">性别：{{info.huanZheInfo.sex == 1?'男':'女'}}</view>
					<view class="">年龄：{{info.huanZheInfo.age}}</view>
				</view>
				<view class="leftType">
					<image src="/static/gongzuotai/icon_zhenduan1.png"></image>
					<view class="leftTypeText">诊断：{{info.huanZheInfo.illnessName}}</view>
				</view>
			</view>
			<view class="infoRight">
				<view class="">{{total}}</view>
				<view class="">得分</view>
			</view>
		</view>
		<view class="list" >
			<view class="item" v-for="(v,k) in list" :key="k">
				<view class="itemTitle">
					<view class="hidden" style="max-width: 300rpx;">{{v.treatmentProgramName}}</view>
					<view class="">开始时间：{{v.createTime}}</view>
				</view>
				<view class="itemText">
					<text>短期目标：{{v.shortGoals}}</text>
				</view>
				<view class="itemText">
					<text>长期目标：{{v.longGoals}}</text>
				</view>
				<view class="itemBottom">
					<view class="" v-if="v.doctorAdviceType == '短嘱'">剩余时间：{{v.days<=0?0:v.days}}天</view>
					<view class="" v-if="v.doctorAdviceType == '长嘱'">长期</view>
					<block v-if="my !=1">
						<view class="" v-if="v.type != 2" @click="endXiangMu(k)">结束</view>
						<view class="endXiangMu" v-else>已结束</view>
					</block>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="my !=1" @click="toPage('/pages/HuanzheDetail/addXiangMu/addXiangMu?id='+id)">添加项目</view>
		<xiangmu v-if="isShowPerformWindow" :short="short" :long="long" :number="number" @setNumber="setNumber" @setShowPerformWindowStatus="setShowPerformWindowStatus" @setShowFinishWindowStatus="setShowFinishWindowStatus"></xiangmu>
		<complete-target v-if="isShowFinishWindow" @confirmFinish="confirmFinish" :number="number"></complete-target>
	</view>
</template>
<script>
	import request from "../../../utils/util.js"
	import	xiangmu from "@/components/confirmTarget/confirmTarget.vue"
	import completeTarget from "@/components/completeTarget/completeTarget.vue"
	export default {
		components:{
			xiangmu,
			completeTarget
		},
		data() {
			return {
				isShowPerformWindow:false,
				number:1,
				list:[],
				isShowFinishWindow:false,
				isGetMoreList:true,
				index:1,
				size:10,
				short:'',
				long:'',
				total:0
			}
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			if (this.isGetMoreList) {
				this.getList();
			} else {
				uni.showToast({
					title: "暂无更多数据",
					duration: 1500,
					icon:"none"
				})
			}
		},
		onLoad(options) {
			this.id = options.id?options.id:0;
			this.my = options.my;
			this.init();
		},
		onShow() {
			this.getList(true);
		},
		methods: {
			init(){
				this.info = uni.getStorageSync("huanZheInfo");
			},
			getList(f = false){
				if(f){
					this.index = 1;
					this.isGetMoreList = true;
					this.list = [];
				}
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getRehabilitationList,
					type:"GET",
					data:{
						pageNo:that.index,
						pageSize:that.size,
						patientId:that.id
					}
				},true,true).then(data=>{
					that.total = data.total;
					if(data.records.length >=that.size){
						that.isGetMoreList = true;
					}else{
						that.isGetMoreList = false
					}
					that.list = that.list.concat(data.records);
					that.index++;
					console.log(that.list);
				})
			},
			setShowPerformWindowStatus(){
				this.isShowPerformWindow = !this.isShowPerformWindow;
			},
			endXiangMu(index){
				let that = this;
				this.nowIndex = index;
				uni.showModal({
					title:'温馨提示',
					content:'是否结束该项目',
					cancelText:'我在想想',
					confirmText:'确认结束',
					confirmColor:"#31D880",
					success(res) {
						if(res.confirm){
							that.endXiangMu_(index).then(()=>{
								that.getList(true);
							});
						}
					}
				})
				
				// this.number = 1;
				// this.setShowPerformWindowStatus();
				// this.short = this.list[index].shortGoals;
				// this.long = this.list[index].longGoals
			},
			endXiangMu_(index){
				let id = this.list[index].id;
				return request({
					url:getApp().$api.huanzhe.editProgram,
					type:"PUT",
					data:{
						id,
						type:'2'
					}
				})
			},
			setNumber(data){
				this.number = data.num;
			},
			confirmProgress(){
				this.setShowPerformWindowStatus();
				this.setShowFinishWindowStatus();
			},
			stopProgress(){
				this.setShowPerformWindowStatus();
			},
			setShowFinishWindowStatus(){
				this.completeXiangMu().then(()=>{
					this.isShowFinishWindow = !this.isShowFinishWindow;
				})
				
			},
			confirmFinish(){
				this.isShowFinishWindow = !this.isShowFinishWindow;
				// this.setShowFinishWindowStatus();
			},
			toPage(url) {
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			completeXiangMu(){
				let that = this;
				let id = this.list[this.nowIndex].id;
				return request({
					url:getApp().$api.huanzhe.endXiangMu,
					type:"POST",
					data:{
						doctorId:that.info.huanZheInfo.userId,
						patientId:that.id,
						treatmentId:id
					}
				}).then(data=>{
					console.log(data);
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F6F6F6;

	}

	.xuangMuInfo {

		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 590rpx;
		padding: 0 50rpx;
		height: 194rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
	}

	.xuangMuInfo .infoLeft {
		/* height: 44rpx; */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.leftName {
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.leftName>view:nth-child(1) {
		font-size: 32rpx;
		color: #333333;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 500;
		margin-right: 38rpx;
	}

	.leftName>view:nth-child(2) {
		margin-right: 32rpx;
	}

	.leftName>view:nth-child(2),
	.leftName>view:nth-child(3) {
		font-size: 22rpx;
		color: #666666;
	}

	.leftType {
		display: flex;
		align-items: center;
		margin-top: 16rpx;
		padding-right: 20rpx;
		align-items: center;
		height: 36rpx;
		background-color: #F0F0F0;
		border-radius: 22rpx;
	}

	.leftType image {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		/* background-color: red; */
		margin: 4rpx;
	}

	.leftType .leftTypeText {
		font-size: 20rpx;
		color: #333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}

	.infoRight {
		width: 122rpx;
		height: 122rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 50%;
	}

	.infoRight>view:nth-child(1) {
		/* width: 66rpx; */
		height: 60rpx;
		font-size: 60rpx;
		font-family: DIN-Bold, DIN;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 60rpx;
		margin-top: 16rpx;
		text-align: center;
	}

	.infoRight>view:nth-child(2) {
		height: 24px;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 24rpx;
		text-align: center;
	}

	.list {
		/* padding-top:30rpx; */
		width: 690rpx;
		margin-left: 30rpx;
		padding-bottom: 120rpx;
	}

	.list .item {
		display: flex;
		flex-direction: column;
		width: 630rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 30rpx;

	}

	.item .itemTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 44rpx;
		padding-top: 28rpx;
		padding-bottom: 14rpx;
	}

	.itemTitle>view:nth-child(1) {
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 500;
		color: #333333;
		font-size: 32rpx;
	}

	.itemTitle>view:nth-child(2) {
		font-size: 24rpx;
		color: #31D880;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.itemText text {
		/* flex:auto; */
		display: inline-block;
		font-size: 24rpx;
		color: #666666;
		line-height: 32rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		padding-left: 14rpx;
		padding-right: 12rpx;
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		margin-bottom: 12rpx;
		font-weight: 400;
		font-family: PingFangSC-Medium, PingFang SC;
	}

	.itemBottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		marin-top: 30rpx;
		margin-bottom: 32rpx;
		height: 42rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
	}

	.itemBottom>view:nth-child(1) {
		max-width: 224rpx;
		/* padding:0 20rpx; */
		padding: 0 20rpx;
		height: 42rpx;
		background: #2AD36A;
		line-height: 42rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.itemBottom>view:nth-child(2) {
		width: 124rpx;
		height: 42rpx;
		font-size: 24rpx;
		border-radius: 20rpx;
		border: 2rpx solid #FA4000;
		color: #FA4000;
		line-height: 42rpx;
		text-align: center;
	}
	.itemBottom .endXiangMu{
		border: 2rpx solid #CCCCCC !important;
		color: #CCCCCC !important;
	}
	.bottom {
		position: fixed;
		bottom: 44rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}
	
	.finishView{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top:0rpx;
		left: 0rpx;
	}
	.finishViewBack{
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.6);
		position: absolute;
		top:0;
		left: 0;
	}
	.finisViewContent{
		width:518rpx;
		height: 612rpx;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.finisViewContentImage{
		width: 518rpx;
		height: 612rpx;
		/* background-color: red; */
		position: absolute;
		top:0;
		left: 0;
	}
	.finisViewContent .finishConfirm{
		position: absolute;
		z-index: 2;
		left: 50%;
		transform: translateX(-50%);
		bottom: -8rpx;
		width: 308rpx;
		height: 80rpx;
		background: #31D880;
		border-radius: 50rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.finisViewScore{
		position: relative;
		width:278rpx;
		height: 278rpx;
		margin-left: 120rpx;
		margin-top: 98rpx;
	}
	.finisViewScore image{
		width:278rpx;
		height: 278rpx;
		/* background-color: #007AFF; */
	}
	.finisViewScore .scoreText{
		position: absolute;
		top:74rpx;
		width: 100%;
		left: 0;
		text-align: center;
		font-size: 96rpx;
		font-family: DIN-Bold, DIN;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 118rpx;
	}
	.finisViewContent .title{
			position: relative;
			z-index: 1;
			margin-top:38rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333333;
			line-height: 42rpx;
	}
	.finisViewContent .text{
			position: relative;
			z-index: 1;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 40rpx;
			margin-top: 6rpx;
			text-align: center;
	}
</style>
