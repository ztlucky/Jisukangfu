<template>
	<view class="view">
		<view class="headerBack" v-if="isShowTimeType" @click="setHeaderStatus()"></view>
		<view class="sousuo">
			<image src="../../../static/homesearch.png"></image>
			<input placeholder="输入手机号进行搜索" v-model="nowPhone" @blur="getMyPatientsList(true)"/>
		</view>
		<view class="list" v-if="huanzhelist.length>=1">
			<view class="item" v-for="(v,k) in huanzhelist" :key="k">
				<view class="itemTop">
						<image class="left" :src="v.sex==1?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"></image>
						<view class="right">
							<view class="name">
								<view class="hidden" style="width:380rpx">{{v.name}}</view>
								<view >{{v.bunk}}床</view>
							</view>
							<view class="info">
								<view class="infoType">
										<image src="/static/gongzuotai/icon_zhenduan1.png"></image>
										<view class="hidden" style="width:180rpx">诊断：{{v.illnessName?v.illnessName:''}}</view>
								</view>
								<view class="">
									<view>性别：{{v.sex == 1?'男':'女'}}</view>
									<view>年龄：{{v.age}}</view>
								</view>
							</view>
							<view class="id">
								<view>编号：{{v.num}}</view>
								<view @click="toPage('/pages/HuanzheDetail/HuanzheDetail?id='+v.id+'&my=1')">查看患者</view>
							</view>
						</view>
				</view>
				<view class="itemBottom">
					诊疗周期：{{v.createTime}} - {{v.endTime?v.endTime:''}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				isShowTimeType:false,
				timeType:-1,
				index:1,
				size:10,
				isGetMoreHuanZheList:true,
				huanzhelist:[],
				nowPhone:''
			}
		},
		onReachBottom() {
			if (this.isGetMoreHuanZheList) {
				this.getMyPatientsList();
			} else {
				uni.showToast({
					title: "暂无更多数据",
					duration: 1500,
					icon:"none"
				})
			}
		},
		onLoad() {
			if(uni.getStorageSync('nowPhone')){
				this.nowPhone = uni.getStorageSync('nowPhone');
			}else{
				this.nowPhone = this.phone =  uni.getStorageSync('phone')?uni.getStorageSync('phone'):'';
			}
			
			this.getMyPatientsList();
		},
		methods: {
			setHeaderStatus(){
					this.isShowTimeType = !this.isShowTimeType;
			},
			setTimeType(num){
				this.setHeaderStatus();
				this.timeType = num;
				this.getMyPatientsList(true);
			},
			toPage(url) {
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			getMyPatientsList(f = false) {
				if(f){
					this.index = 1;
					this.huanzhelist = [];
					this.isGetMoreHuanZheList = true;
				}
				let that = this;
				return request({
					url: that.$api.huanzhe.getMyPatientsList,
					data: {
						pageNo: that.index,
						pageSize: that.size,
						userId: getApp().globalData.userId,
						order:that.timeType == 1?'desc':'asc',
						phoneNumber:that.nowPhone?that.nowPhone:that.phone,
						column:'createTime',
						condition1:true
					},
					type: 'GET'
				}, true, true).then(data => {
					let list = that.huanzhelist;
					if(data.records.length != 0){
						data.records.map((v,k)=>{
							data.records[k].createTime = data.records[k].createTime?data.records[k].createTime.split(" ")[0]:'';
							data.records[k].endTime = data.records[k].endTime?data.records[k].endTime.split(" ")[0]:''
						});
						uni.setStorageSync('nowPhone',that.nowPhone);
					}
					if (data.records && data.records.length >= that.size) {
						that.isGetMoreHuanZheList = true;
					} else {
						that.isGetMoreHuanZheList = false;
					}
					that.huanzhelist = that.huanzhelist.concat(data.records);
					this.index++;
				})
			}
		}
	}	
</script>

<style scoped>
	.view{
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
	}
.header{
	position: relative;
	z-index: 2;
	width:100%;
	height: 80rpx;
	background-color: #FFFFFF;
	
}
.headerList{
	position: absolute;
	z-index: 1;
	top:-100rpx;
	left: 0;
	width:690rpx;
	padding:0 30rpx;
	background-color: #FFFFFF;
	transition: .6s;
}
.headerItem{
	width:690rpx;
	height: 84rpx;
	line-height: 84rpx;
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.headerItem:nth-child(1) {
	border-bottom: 2rpx solid #EDEDED;
}
.header .headerView{
	position: relative;
	z-index: 2;
	width: 100%;
	height: 80rpx;
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #EDEDED;
	background-color: #FFFFFF;
	
}
.header .headerText{
	height: 32rpx;
	align-items: center;
	margin-left: 32rpx;
	margin-right: 16rpx;
	
	font-size: 26rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
}
.header .headerImage{
	width:18rpx;
	height: 10rpx;
	margin-top: 8rpx;
}
.list{
	width:690rpx;
	margin-left: 30rpx;
}
.list .item{
	width: 690rpx;
	height: 306rpx;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	margin-top:30rpx;
}
.item .itemTop{
	width:620rpx;
	height: 154rpx;
	padding:30rpx;
	display: flex;
	justify-content: space-between;
}
.itemTop .left{
	width:154rpx;
	height: 154rpx;
	border-radius: 50%;

}
.right{
	width:458rpx;
	height: 154rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.right > view{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.right .name >view:nth-child(1){
	font-size:32rpx;
	color:#333333;
	font-family: PingFangSC-Semibold, PingFang SC;
}
.right .name >view:nth-child(2){
	font-size:24rpx;
	color:#31D880;
}
.right .info >view:nth-child(1){
	display: flex;
	padding-right: 20rpx;
	align-items: center;
	height: 36rpx;
	background-color: #F0F0F0;
	border-radius: 22rpx;
}
.right .info >view:nth-child(1) image{
	width:28rpx;
	height: 28rpx;
	border-radius: 50%;
	/* background-color: red; */
	margin:4rpx;
}
.right .info >view:nth-child(1) view{
	font-size:20rpx;
	color:#333333;
	font-family: PingFangSC-Semibold, PingFang SC;
}
.right .info >view:nth-child(2){
	display: flex;
	font-size:20rpx;
	color:#999999
}
.right .info >view:nth-child(2) >view:nth-child(2){
	margin-left: 32rpx;
}
.right .id{
	height: 36rpx;
	font-size:20rpx;
}
.right .id >view:nth-child(1){
	color: #999999;
}
.right .id >view:nth-child(2){
	width: 154rpx;
	height: 36rpx;
	background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
	box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
	border-radius: 18rpx;
	text-align: center;
	line-height: 36rpx;
	color:#FFFFFF
}
.itemBottom{
	height: 90rpx;
	width:638rpx;
	padding-left: 42rpx;
	border-top:2rpx solid #EAEAEA;
	line-height: 90rpx;
	font-size:24rpx;
	color: #333333;
}
.headerBack{
	width:750rpx;
	height: 100vh;
	position: fixed;
	top:0;
	left: 0;
	z-index: 1;
}
.sousuo{
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}
	.sousuo image{
		width:26rpx;
		height: 26rpx;
		margin-left: 24rpx;
		margin-right: 16rpx;
	}
	.sousuo input{
		width: 600rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40px;
	}
</style>
