<template>
	<view class="viewPage">
		<view class="desc">
			<view class="title">班级简介</view>
			<view class="descText">
				德贝佳口腔门诊部有限公司是专业提供先进齿科服务口腔品牌，长期以来致力于为国内中产阶级及外籍人士提供专业的齿科服务。  
				拥有数字化种植中心、数字化正畸中心，修复美容科等九大科室，院内设置3D数字化设计，由专人专业操作设计，实现真正的看得见、摸得着的数字化技术。
				特别设置“医疗质量控制小组”、“院感质量控制小组”、“急救预控小组”、“消毒供应室”等15大保障服务质控小组，为顾客安全诊疗保驾护航。 
			</view>
		</view>
		<view class="live">
			<view class="title">直播</view>
			<live v-for="(v,k) in [1,2,3]" :key="k"></live>
		</view>
		<view class="course">
			<view class="title">课程</view>
			<view class="list">
				<view class="item" v-for="(v,k) in [1,2,3,4,5,6,7,8,9]">
					<course ></course>
				</view>
			</view>
		</view>
		<view class="lecture">
			<view class="title">线下讲座</view>
			<view class="lectureList">
				<view class="lectureItem" v-for="(v,k) in [1,2,3]" :key="k">
					<view class="lectureTitle">
						<view class="dot"></view>
						<view class="">线下讲座一</view>
					</view>
					<view class="lectureText">时间：2020-06-31</view>
					<view class="lectureTypes">
						<view class="lectureType">主任医师：路鹏桦</view>
						<view class="lectureType">主任医师：路鹏桦</view>
						<view class="lectureType">主任医师：路鹏桦</view>
					</view>
					<view class="lectureAddress hidden">地点：芝罘区互联网外包基地产业园芝罘区互联网外包基地产业园芝罘区互联网外包基地产业园</view>
				</view>
			</view>
			
		</view>
		<view class="bottom">
			<view>原价100/会员价90</view>
			<view class="">
				<image src="/static/zhibo/icon_shoucang.png"></image>
				<view class="">收藏本课</view>
			</view>
			<view >立即购买</view>
		</view>
	</view>
</template>

<script>
	import live from "../../../components/live/live.vue";
	import course from "../../../components/course/course.vue"
	export default {
		data() {
			return {
				
			}
		},
		components:{
			live,
			course
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.viewPage{
		width:750rpx;
		min-height: 100vh;
		background-color: #F9F9F9;
		padding-bottom: 80rpx;
	}
	.desc{
		width:690rpx;
		background-color: #FFFFFF;
		padding:10rpx 30rpx;
		margin-bottom:8rpx;
	}
	.title{
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 44rpx;
		padding:30rpx 0;
	}
	.live , .course{
		width:750rpx;
		background-color: #FFFFFF;
		margin-bottom:8rpx;
		padding-bottom: 30rpx;
		/* padding:0rpx 30rpx; */
	}
	.lecture{
		width:720rpx;
		background-color: #FFFFFF;
		padding-left: 30rpx;
	}
	.course{
		padding-left: 30rpx;
		width: 720rpx;
		margin-bottom:8rpx;
	}
	.course .list{
		display: flex;
		flex-wrap: wrap;
	}
	.list .item{
		margin-right: 30rpx;
	}
	.live .title {
		padding-left: 30rpx;
		padding-bottom: 0;
	}

	.descText{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		padding-bottom: 10rpx;
		
	}
	.lectureList{
		width:720rpx;
		padding-bottom: 20rpx;
		/* padding-left: 30rpx; */
	}
	.lectureTitle .dot{
		width: 8rpx;
		height: 8rpx;
		background-color: #31D880;
		margin-right: 12rpx;
		border-radius: 50%;
	}
	.lectureItem{
		border-bottom: 2rpx solid #F9F9F9;
		padding-bottom: 26rpx;
		margin-bottom: 20rpx;
	}
	.lectureItem:last-child{
		border: none;
	}
	.lectureItem .lectureTitle{
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
		margin-bottom: 22rpx;
	}
	.lectureText{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
		margin-bottom: 12rpx;
		padding-left: 20rpx;
	}
	.lectureTypes{
		width:670rpx;
		margin-left: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		overflow-y: scroll;
		margin-bottom: 20rpx;
	}
	.lectureType{
		padding:0 16rpx;
		height: 40rpx;
		background: #F0F0F0;
		border-radius: 8rpx;
		white-space: nowrap;
		margin-right: 10rpx;
		
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}
	.lectureAddress{
		width: 670rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 26rpx;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width:690rpx;
		height: 88rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.bottom>view:nth-child(1){
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #E02020;
	}
	.bottom>view:nth-child(2){
		display: flex;
		align-items: center;
	}
	.bottom>view:nth-child(2)>image{
		width:44rpx;
		height: 44rpx;
		margin-right: 14rpx;
	}
	.bottom>view:nth-child(2)>view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.bottom>view:nth-child(3){
		width: 214rpx;
		height: 54rpx;
		background: #E02020;
		border-radius: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		text-align: center;
		line-height: 54rpx;
	}
</style>
