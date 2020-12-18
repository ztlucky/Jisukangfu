<template>
	<view class="viewPage">
		<view class="item">
			<!-- <image class="itemLeft" src=""></image> -->
			<view class="itemRight">
				<view class="itemRightName hidden2">{{info.goodsName}}</view>
				<view class="itemRightTime">{{info.createTime}}</view>
				<view class="itemPrice">
					<view class="priceTips">
						<view class="">¥</view>
						<view class="">{{info.actuallyPaid}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="item1">
			<view class="text">
				<view class="title">{{info.goodsSku_dictText}}金额</view>
				<view >¥{{info.originalPrice}}</view>
			</view>
			<view class="text">
				<view class="title">优惠价格</view>
				<view >-¥{{info.originalPrice - info.actuallyPaid}}</view>
			</view>
			<view class="text">
				<view class="title">优惠券</view>
				<view class="textRight">
					<view class="">未使用</view>
					<image src="/static/right.png"></image>
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
				
			}
		},
		onLoad() {
			this.info = uni.getStorageSync('orderItem');
			console.log(this.info)
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.viewPage{
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow:hidden;
	}
	.headerNav{
		width: 100%;
		display: flex;
		width:690rpx;
		height: 80rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
	}
	.navItem{
		width:100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 40rpx;
	}
	.text{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}
	.border{
		margin-top: 6rpx;
		width: 32rpx;
		height: 4rpx;
		background-color: #31D880;
		border-radius: 4rpx;
	}
	.navItem1 .text{
		color:#999999;
	}
	.navItem1 .border{
		background-color: #FFFFFF;
	}
	.orderList{
		width:690rpx;
		margin:30rpx;
	}
	.item{
		margin: 30rpx;
		width:630rpx;
		height: 160rpx;
		padding:30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
	}
	.item1{
		margin: 30rpx;
		padding-top:24rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
	}
	.text:nth-child(1){
		margin-bottom: 16rpx;
	}
	.text:nth-child(2){
		padding-bottom: 26rpx;
		border-bottom: 2rpx solid #CBCBCB;
	}
	.text:nth-child(3){
		height: 98rpx;
		display: flex;
		align-items: center;
		
	}
	.item image{
		width:240rpx;
		height: 160rpx;
		border-radius: 8rpx;
		background-color: #D8D8D8;
	}
	.itemRight{
		width:608rpx;
		
	}
	.itemRightName{
		margin-top:4rpx;
		width:608rpx;
		min-height:80rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 40rpx;
	}
	.itemRightTime{
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 28rpx;
	}
	.itemPrice{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40rpx;
	}
	.itemPrice .priceTips{
		display: flex;
	}
	.priceTips >view:nth-child(1){
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #E02020;
		line-height: 22rpx;
		margin-top:12rpx;
	}
	.priceTips >view:nth-child(2){
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #E02020;
		line-height: 40rpx;
	}
	.pay{
		width: 98rpx;
		height: 40rpx;
		background: #E02020;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.text{
		width: 630rpx;
		justify-content: space-between;
		display: flex;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 36rpx;
	}
	.textRight{
		display: flex;
		align-items: center;
	}
	.textRight image{
		margin-left: 14rpx;
		width:12rpx;
		height: 20rpx;
	}
	.textRight view{
		
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
</style>
