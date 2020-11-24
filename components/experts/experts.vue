<template>
	<view :class="isshow?'item item1':'item'" @click="openInfo">
		<image class="itemLeft" src="../../static/gongzuotai/icon_nv.png"></image>
		<view class="itemRight">
			<view class="name">
				<view class="nameText">
					<view >蜡笔小新</view>
					<view >主治医师</view>
				</view>
				<view class="price">19526.23元</view>
			</view>
			<view class="text text1">烟台毓璜顶医院</view>
			<view class="text text2">
				<view >好评率：95%</view>
				<view >1万+预约方案</view>
			</view>
			<view class="typeList">
				<view>心脏病</view>
				<view>心脏病心脏病</view>
				<view>心脏病心脏病心脏病</view>
				<view>心脏病</view>
				<view>心脏病心脏病</view>
				<view>心脏病心脏病心脏病</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isshow:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			openInfo(){
				uni.navigateTo({
					url:"/pages/WodeKangfu/doctorInfo/doctorInfo",
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>

<style scoped>
	.item{
		width:690rpx;
		height: 200rpx;
		padding:20rpx 0rpx;
		background-color: #FFFFFF;
		display: flex;
		border-bottom: 2rpx solid #F4F4F4;
		padding-bottom: 0;
	}
	.item1{
		border:none;
	}
	.itemLeft{
		width:100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 24rpx;
	}
	.itemRight{
		flex: 1;
	}
	.name{
		
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.name .nameText{
		display: flex;
		align-items: center;
	}
	.nameText view:nth-child(1){
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
	}
	.nameText view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 32rpx;
		margin-left: 12rpx;
		margin-top:4rpx;
	}
	.price{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #E02020;
		line-height: 34rpx;
	}
	.text{
		display: flex;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
	}
	.text1{
		margin:20rpx 0rpx;
	}
	.text2 view{
		padding-right: 16rpx;
		margin-bottom: 20rpx;
	}
	.text2 view:nth-child(1){
		border-right: 2rpx solid #DADADA;
	}
	.text2 view:nth-child(2){
		padding-left: 24rpx;
	}
	.typeList{
		width:566rpx;
		height: 40rpx;
		overflow-x: scroll;
		display: flex;
		flex-wrap: nowrap;
	}
	.typeList view{
		padding:0 26rpx;
		background: #EFEFEF;
		border-radius: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
		margin-right: 12rpx;
		white-space: nowrap;
	}
</style>
