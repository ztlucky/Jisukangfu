<template>
	<view class="viewPage">
		<view class="header">
			<view class="headerTop">
				<view class="headerLeft">
					<view class="name">
						<view class="nameText">蜡笔小新</view>
						<view class="nameType">主治医师</view>
					</view>
					<view class="text">烟台玉皇洞医院</view>
					<view class="text text2">
						<view>好评率：95%</view>
						<view>1万+预约方案</view>
					</view>
				</view>
				<image class="headerRight" src="../../../static/gongzuotai/icon_nv.png"></image>
			</view>
			<view class="headerBottom">
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
			</view>
		</view>
		<view class="doctorDesc">
			<view class="doctorHeader">
				<image src="../../../static/Huanzhexiangqing/icon_jilu.png"></image>
				<view class="">医生简介</view>
			</view>
			<view class="value">髓瘤等具有丰富临床经验。专长造血干细胞移植，成功开展烟威地区首例异基因造血干细胞移植以及单倍体异基因造血干细胞移植，每年主持开展造血干细胞移植20余例。实用型国家医学专利2项，发表SCI论文11篇，在国内核心期刊杂志发表论文10余篇。多次评为十佳青年医生、中青年技术标兵、先进工作者。担任青岛大学医学院血液病专业课及实习、见习教学工作，多次被评为优秀教师。</view>
		</view>
		<view class="evaluation">
			<view class="doctorHeader">
				<image src="../../../static/Huanzhexiangqing/icon_jilu.png"></image>
				<view class="">患者评价</view>
			</view>
			<view class="evaluationData">
				<view class="evaluationLeft">
					<view class="">评分</view>
					<view class="">4.5</view>
					<view>
						<pentagram height="30" right="12"></pentagram>
					</view>
				</view>
				<view class="evaluationRight">
					<view class="rightItem" v-for="(v,k) in dataTypeList" :key="k">
						<view class="rightText">{{5-k}}</view>
						<view class="rightView" :style="'width:'+(v/dataTypeAllNumber*300)+'rpx'"></view>
					</view>
				</view>
			</view>
			<view class="evaluationList">
				<view class="evaluationItem" v-for="(v,k) in [1,2.5,3.4,4.4,3.5,2.6,1.7,4.8,4.9,2.1]">
					<view class="itemTop">
						<view class="">
							<view class="">张**</view>
							<pentagram height="28" :value="v"  right="4"></pentagram>
						</view>
						<view class="">2020-09-31</view>
					</view>
					<view class="itemText">医生的方案对我帮助很大，已经能够从瘫痪状态到跑起来了非常感谢医生</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottomText">咨询价格：¥199</view>
			<view class="bottomClick">立即购买</view>
		</view>
	</view>
</template>

<script>
	import pentagram from "../../../components/pentagram/pentagram.vue"
	export default {
		components:{
			pentagram
		},
		data() {
			return {
				dataTypeAllNumber:600,
				dataTypeList:[100,50,150,50,200]
			}
		},
		methods: {
			
		}
	}
</script>

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
	.doctorDesc , .evaluation{
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
