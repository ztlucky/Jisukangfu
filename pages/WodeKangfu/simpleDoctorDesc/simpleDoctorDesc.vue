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
		<view class="save" >发送我的病例</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
	.doctorDesc{
		width:690rpx;
		margin: 30rpx;
		padding:30rpx 0;
		padding-top: 0;
		background-color: #FFFFFF;
		border-radius: 4rpx;
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
