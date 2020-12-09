<template>
	<view class="viewPage">
		<view class="headerNav">
			<view class="navItem">
				<view class="text">未支付</view>
				<view class="border"></view>
			</view>
			<view class="navItem navItem1">
				<view class="text">已支付</view>
				<view class="border"></view>
			</view>
		</view>
		<view class="orderList">
			<view class="item">
				<image class="itemLeft" src=""></image>
				<view class="itemRight">
					<view class="itemRightName hidden2">发哈短发看风景警方快速减肥发课时费就开始发课时费健康发哈短发看风景警方快速减肥发课时费就开始发课时费健康</view>
					<view class="itemRightTime">2020-12-13 08:23</view>
					<view class="itemPrice">
						<view class="priceTips">
							<view class="">¥</view>
							<view class="">356</view>
						</view>
						<view class="pay">付款</view>
					</view>
				</view>
			</view>
		</view>
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
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
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
		width:630rpx;
		height: 160rpx;
		padding:30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
	}
	.item image{
		width:240rpx;
		height: 160rpx;
		border-radius: 8rpx;
		background-color: #D8D8D8;
	}
	.itemRight{
		width:368rpx;
	}
	.itemRightName{
		margin-top:4rpx;
		width:368rpx;
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
</style>
