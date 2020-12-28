<template>
	<view class="viewPage">
		<view class="header">
			<view class="headerTop">
				<view class="headerLeft">
					<view class="name">
						<view class="nameText hiden">{{info.name}}</view>
						<view class="nameType">{{info.jobTitle}}</view>
					</view>
					<view class="text">{{info.role == 2?'康复师':'普通用户'}}</view>
					<view class="text text2">
						<!-- <view>好评率：95%</view>
						<view>1万+预约方案</view> -->
						<view> </view>
						<view> </view>
					</view>
				</view>
				<image class="headerRight" mode="aspectFill" :src="info.headUrl?info.headUrl:'../../../static/gongzuotai/icon_nv.png'"></image>
			</view>
			<!-- <view class="headerBottom">
				<view class="bottomTitle">擅长：</view>
				<view class="bottomList">
					<view class="">心脏病</view>
					<view class="">心脏病脏病</view>
					<view class="">心脏病新</view>
					<view class="">心脏病</view>
					<view class="">心脏病</view>
					<view class="">心脏病脏病</view>
					<view class="">心脏病新</view>
					<view class="">心脏病</view>
				</view>
			</view> -->
		</view>
		<view class="doctorDesc">
			<view class="doctorHeader">
				<image src="../../../static/Huanzhexiangqing/icon_jilu.png"></image>
				<view class="">医生简介</view>
			</view>
			<view class="value">{{info.introduce?info.introduce:'无'}}</view>
		</view>
		<view v-show="recommendCourseList.length >0" class="sectiontitleview" >
			<text class="sectiontitle">他的课程</text>
			<!-- <text class="sectionrighttitle">查看更多></text> -->
		</view>
		<uni-grid :column="2" class="recommendgridview" :square="false" :showBorder="false" @change="kechengItemClick">
			<uni-grid-item v-for="(item ,index) in recommendCourseList" :key="index" :index="index">
				<view class="recomendbgview">
					<view class="recomengimageview">
						<image :src="item.coverUrl" mode="aspectFill"></image>
						<text>课程</text>
					</view>
					<text class="recommendtitle_text">{{item.name}}</text>
					<view class="recomendpricebottomView">
						<text class="recommemdpricetext">¥{{item.cost}}元/会员价¥{{item.memberCost}}元</text>
						<!-- <text class="recommendbuynumtext">{{item.name}}人购买</text> -->
					</view>
				</view>
		
			</uni-grid-item>
		</uni-grid>
		
	</view>
</template>

<script>
	import pentagram from "../../../components/pentagram/pentagram.vue"
	import request from "../../../utils/util.js"
	export default {
		components:{
			pentagram
		},
		onLoad(options) {
			this.id = options.id;
			this.getInfo().then(()=>{
				this.getList();
			})
			
		},
		data() {
			return {
				dataTypeAllNumber:600,
				dataTypeList:[100,50,150,50,200],
				recommendCourseList:[],
				info:{}
			}
		},
		methods: {
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.user.getUserInfo,
					data:{
						condition:true,
						id:that.id
					}
				},true,true).then(data=>{
					that.info = data.data;
					console.log(data.data);
				})
			},
			getList(){
				let that = this;
				return request({
					type:'GET',
					url:getApp().$api.course.getList,
					data:{
						userId:that.id,
						pageNo:1,
						pageSize:200
					}
				},true,true).then(data=>{
					that.recommendCourseList = data.records;
				})
			},
			kechengItemClick: function(e) {
				uni.navigateTo({
					url: '/pages/Daxue/KechengDetail/KechengDetail?id=' +this.recommendCourseList[e.detail.index].id ,
					animationType: "slide-in-right",
					animationDuration: 300
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.recommendgridview {
		height: auto;
		margin-bottom: 20upx;
		margin-top: 10upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding-left: 15upx;
		padding-right: 15upx;
	
	}
	
	.recomendbgview {
		flex-direction: column;
		display: flex;
		padding-left: 15upx;
	}
	
	.recomengimageview {
	
		margin-top: 22upx;
		position: relative;
		width: 330upx;
		height: 220upx;
	
		image {
			width: 330upx;
			height: 220upx;
			border-radius: 8upx;
	
		}
	
		text {
			position: absolute;
			background-color: #777;
			font-size: 16upx;
			color: #FFFFFF;
			width: 46upx;
			height: 24upx;
			border-radius: 4px;
			right: 14upx;
			bottom: 12upx;
			text-align: center;
			line-height: 24upx;
		}
	
	}
	
	.recommendtitle_text {
	
		font-size: 28upx;
		height: auto;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		margin-top: 20upx;
		width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
	
	}
	
	.recomendpricebottomView {
		width: 90%;
		height: auto;
		margin-top: 10upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.recommemdpricetext {
		font-size: 20upx;
		font-weight: 500;
		color: rgba(250, 6, 17, 1);
		line-height: 26upx;
	}
	
	.recommendbuynumtext {
		font-size: 15upx;
		font-family: FZHTK;
		font-weight: normal;
		color: rgba(106, 106, 106, 1);
		line-height: 34upx;
	}
	.sectiontitleview {
		margin-top: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20upx;
		.sectiontitle {
			margin-left: 30rpx;
			font-size: 32rpx;
			color: #000000;
			font-weight: 600;
	
	
		}
	
		.sectionrighttitle {
			margin-right: 15px;
			font-size: 18rpx;
			color: #999;
			text-align: center;
	
		}
	}
</style>
<style scoped>
	.viewPage{
		width:100%;
		min-height: 100vh;
		background-color: #f9f9f9;
		overflow: hidden;
	}	
	.header{
		width:630rpx;
		/* height: 260rpx; */
		margin:30rpx;
		padding:0 30rpx;
		border-radius: 4rpx;
		background-color: #FFFFFF;
		padding-top:30rpx;
	}
	.header .headerTop{
		padding-bottom: 20rpxx;
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #F4F4F4;
	}
	.name{
		display: flex;
	}
	.name view:nth-child(1){
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		margin-right: 12rpx;
	}
	.name view:nth-child(2){
		padding-top:4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 28rpx;
	}
	.text{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
		margin:20rpx 0;
		display: flex;
		margin-bottom: 0;
	}
	.headerRight{
		width:120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.text2 view{
		padding-right: 16rpx;
		margin-bottom: 28rpx;
	}
	.text2 view:nth-child(1){
		border-right: 2rpx solid #DADADA;
	}
	.text2 view:nth-child(2){
		padding-left: 24rpx;
	}
	.headerBottom{
		display: flex;
	}
	.headerBottom .bottomTitle{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 78rpx;
		width:84rpx;
	}
	.bottomList{
		display: flex;
		width:546rpx;
		overflow-x: scroll;
		flex-wrap: nowrap;
		height: 78rpx;
		align-items: center;
	}
	.bottomList view{
		white-space: nowrap;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
		padding:0 26rpx;
		margin-right: 12rpx;
		background-color: #F6F6F6;
		height: 40rpx;
		border-radius: 24rpx;
	}
	.doctorHeader{
		display: flex;
		height: 94rpx;
		align-items: center;
		border-bottom:2rpx solid #F4F4F4;
	}
	.doctorHeader image{
		width:30rpx;
		height: 36rpx;
		margin-left: 30rpx;
		margin-right: 16rpx;
	}
	.doctorDesc {
		width:690rpx;
		margin: 30rpx;
		padding:30rpx 0;
		padding-top: 0;
		background-color: #FFFFFF;
		border-radius: 4rpx;
	}
	.evaluation{
		padding-bottom: 0;
	}
	.value{
		text-indent:2em;
		padding:0 30rpx;
		padding-top:30rpx;
		padding-bottom: 6rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.evaluationData{
		display: flex;
		border-bottom: 2rpx solid #F6F6F6;
	}
	.evaluationData .evaluationLeft{
		width:256rpx;
		border-right: 2rpx solid #F6F6F6;
		height: 198rpx;
	}
	.evaluationData .evaluationLeft > view:nth-child(1){
		padding-top:24rpx;
		padding-left: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}
	.evaluationData .evaluationLeft >view:nth-child(2){
		padding-top:12rpx;
		padding-bottom: 12rpx;
		padding-left: 30rpx;
		font-size: 56rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 56rpx;
	}
	.evaluationData .evaluationLeft >view:nth-child(3){
		padding-left: 30rpx;
	}
	.evaluationRight{
		padding-left: 30rpx;
		padding-top:14rpx;
	}
	.rightItem{
		display: flex;
		align-items: center;
		height: 34rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
	}
	.rightItem .rightView{
		height: 12rpx;
		background-color: #E02020;
		margin-left: 16rpx;
	}
	.evaluationList{
		/* border-bottom: 20rpx solid #F9F9F9; */
		margin-bottom: 100rpx;
	}
	.evaluationItem{
		width:630rpx;
		margin:30rpx;
		margin-bottom: 0rpx;
	}
	.itemTop{
		display: flex;
		justify-content: space-between;
		height: 34rpx;
		align-items: center;
	}
	.itemTop >view:nth-child(1){
		display: flex;
		height: 34rpx;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 34rpx;
	}
	.itemTop >view:nth-child(1)>view:nth-child(1){
		margin-right: 18rpx;
	}
	.itemTop >view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 34rpx;
	}
	.itemText{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 34rpx;
		margin-top: 12rpx;
		padding-bottom: 22rpx;
		border-bottom: 2rpx solid #F9F9F9;
	}
	.itemText:last-child{
		border: none;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 4;
		width:690rpx;
		padding:0 30rpx;
		height: 88rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bottom .bottomText{
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #E02020;
		line-height: 40rpx;
	}
	.bottom .bottomClick{
		width: 214rpx;
		height: 54rpx;
		background: #E02020;
		border-radius: 28rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
