<template>
	<view class="view">
		<scroll-view class="leftList" @scrolltolower="getIllness" :scroll-y="true">
			<view :class="k != nowIllnessIndex?'leftItem':'leftItem leftItem1'" v-for="(item,k) in illnessList"  :key="k" @click="setIllnessStatus(k)">
				<view class="itemBorder"></view>
				<view class="itemText hidden2">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="rightContent">
			<view class="rightTop">
				<view :class="nowSymptomIndex == index?'selected':''" @click="setSymptomIndex(index)" v-for="(item,index) in illnessList[nowIllnessIndex].symptomList">{{item.name}}</view>
			</view>
			<view class="rightList">
				<view class="rightItem" v-for="(v,k) in huanZheList" :key="k">
					<view class="rightItemName">
						<view class="nameLeft">
							<view class="name hidden">{{v.name}}</view>
							<view class="nameType">
								<image src="../../../static/gongzuotai/icon_zhenduan1.png"></image>
								<view class="typeText hidden">诊断：心脏病</view>
							</view>
						</view>
						<view class="nameRight">{{v.bunk}}床</view>
					</view>
					<view class="rightItemAge">
						<view class="">性别：{{v.sex == 1?"男":"女"}}</view>
						<view class>年龄：{{v.age}}</view>
					</view>
					<view class="rightItemId">
						<view class="id">编号：{{v.idNo?v.idNo:''}}</view>
						<view class="itemIdButton" @click="toPage('/pages/HuanzheDetail/huanZheInfo/huanZheInfo',k)">查看患者</view>
					</view>
					<view class="rightItemDate">诊疗周期：{{v.createTime}}-{{v.endTime}}</view>
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
				isGetMoreIllnessData:true,
				illnessIndex:1,
				illnessSize:20,
				illnessList:[],
				nowIllnessIndex:0,
				nowSymptomIndex:0,
				huanZheInde:1,
				huanZheSize:20,
				huanZheList:[],
				isGetMoreHuanZheData:true
			}
		},
		onLoad() {
			this.init();
		},
		onReachBottom() {
			if (this.isGetMoreHuanZheData) {
				this.getHuanZheList();
			} else {
				uni.showToast({
					title: "暂无更多数据",
					duration: 1500,
					icon:"none"
				})
			}
		},
		methods: {
			init(){
				this.getIllness().then(()=>{
					this.getHuanZheList();
				});
			},
			setIllnessStatus(index){
				this.nowIllnessIndex = index;
				this.getHuanZheList(true);
			},
			setSymptomIndex(index){
				this.nowSymptomIndex = index;
				this.getHuanZheList(true);
			},
			getIllness(){
				let that = this;
				if(this.isGetMoreIllnessData){
					return request({
						url:getApp().$api.huanzhe.getillnessList,
						type:"GET",
						data:{
							pageNo:that.illnessIndex,
							pageSize:that.illnessSize,
							userId:getApp().globalData.userId
						}
					},true,true).then(data=>{
						if(data.records.length == that.illnessSize){
							that.isGetMoreIllnessData = true;
						}else{
							that.isGetMoreIllnessData = false;
						}
						that.illnessList = that.illnessList.concat(data.records);
						console.log(that.illnessList)
					})
				}
			},
			getHuanZheList(f){
				if(f){
					this.isGetMoreHuanZheData = true;
					this.huanZheInde = 1;
					this.huanZheList = []
				}
				let id = this.illnessList[this.nowIllnessIndex].symptomList[this.nowSymptomIndex]?this.illnessList[this.nowIllnessIndex].symptomList[this.nowSymptomIndex].id:0;
				let that = this;
				if(id){
					return request({
						url:getApp().$api.work.getCompareList,
						type:"GET",
						data:{
							condition:true,
							pageNo:that.huanZheInde,
							pageSize:that.huanZheSize,
							symptomIds:`,${id},`
						}
					},true,true).then(data=>{
						console.log(data);
						if(data.records){
							data.records.map((v,k)=>{
								data.records[k].createTime = data.records[k].createTime?data.records[k].createTime.split(" ")[0]:'';
								data.records[k].endTime = data.records[k].endTime?data.records[k].endTime.split(" ")[0]:''
							})
						}
						if(data.records.length >= that.huanZheSize){
							that.isGetMoreHuanZheData = true;
						}else{
							that.isGetMoreHuanZheData = false
						}
						that.huanZheList = that.huanZheList.concat(data.records);
						that.huanZheInde++;
					})
				}
			},
			toPage(url,index) {
				if(url == '/pages/HuanzheDetail/huanZheInfo/huanZheInfo'){
					let item = this.huanZheList[index];
					url = `/pages/HuanzheDetail/huanZheInfo/huanZheInfo?id=${item.id}`;
					uni.setStorageSync('huanzhe',item)
				}
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>

<style scoped>
	.view{
		display: flex;
	}
	.leftList{
		width:200rpx;
		height: 100vh;
		background-color: #F8F8F8;
	}
	.leftItem{
		font-size: 32rpx;
		color:#333333;
		background-color: #F8F8F8;
		height: 150rpx;
		border-bottom: 2rpx solid #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.leftItem .itemBorder{
		width:4rpx;
		height: 44rpx;
		border-radius: 4rpx;
		margin-left: 2rpx;
	}
	.leftItem .itemText{
		flex: 1;
		text-align: center;
	}
	.leftItem1 .itemBorder{
		background-color:#36DB97;
	}
	.leftItem1 {
		background-color: #FFFFFF;
		color:#31D880;
	}
	
	.rightContent{
		width:490rpx;
		margin:0 30rpx;
		/* padding: 30rpx 0; */
		height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.rightContent .rightTop{
		display: flex;
		flex-wrap: wrap;
		foont-size:24rpx;
		line-height: 42rpx;
		border-bottom: 2rpx solid #F8F8F8;
		padding-top:30rpx;
	}
	.rightTop>view{
		margin-bottom: 16rpx;
		margin-right: 24rpx;
	}
	.rightTop .selected{
		color:#31D880;
	}
	.rightList{
		padding-bottom: 30rpx;
		margin-top:22rpx;
	}
	.rightItem{
		width:488rpx;
		/* padding:30rpx; */
		padding-top:0rpx;
		/* padding:0 32rpx; */
		border-radius: 16rpx;
		margin-top:30rpx;
		border: 2rpx solid #EAEAEA;
	}
	.rightItem >view{
		display: flex;
		align-items: center;
		padding:0 32rpx;
		width:428rpx;
		/* justify-content: space-between; */
	}
	.rightItem .rightItemName{
		padding-top:30rpx;
		/* display: flex; */
		height: 44rpx;
		justify-content: space-between;
		/* align-items: center; */
	}
	.rightItemName .nameLeft{
		display: flex;
		height: 44rpx;
		align-items: center;
	}
	.nameLeft .nameType {
		display: flex;
		padding-right: 20rpx;
		align-items: center;
		height: 36rpx;
		background-color: #F0F0F0;
		border-radius: 22rpx;
		font-size:24rpx;
	}
	.nameType image{
		width:28rpx;
		height: 28rpx;
		border-radius: 50%;
		margin:4rpx;
	}
	.nameType .nametext{
		font-size:20rpx;
		color:#333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.name{
		max-width:100rpx;
		padding-right: 24rpx;
		font-size:32rpx;
		color:#333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.nameRight{
		font-size:24rpx;
		color:#31D880;
	}
	.rightItemAge{
		display: flex;
		font-size:20rpx;
		color:#999999;
		padding-top:28rpx;
		padding-bottom: 16rpx;
	}
	.rightItemAge > view{
		margin-right: 32rpx;
	}
	.rightItemId{
		display: flex;
		justify-content: space-between;
		height: 36rpx;
		font-size:20rpx;
		/* padding-bottom: 24rpx; */
	}
	.rightItemId >view:nth-child(1){
		color: #999999;
	}
	.rightItemId >view:nth-child(2){
		width: 154rpx;
		height: 36rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 18rpx;
		text-align: center;
		line-height: 36rpx;
		color:#FFFFFF
	}
	.rightItemDate{
		margin-top: 24rpx;
		border-top:2rpx solid #EAEAEA;
		height: 64rpx;
		width:430rpx;
		/* padding-left: 42rpx; */
		line-height: 90rpx;
		font-size:24rpx;
		color: #333333;
	}
	.typeText{
		max-width: 200rpx;
	}
</style>
