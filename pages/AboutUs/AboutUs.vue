<template>
	<view class="contentview">
		<image src="../../static/logo.png" class="logoiamge"></image>
		<view class="bgview">
			<view class="Hview">
				<text>联系我们</text>
				<image src="../../static/icon_jiantou.png"  ></image>
			</view>
			<view class="lineview">
				
			</view>
			<view class="Hview">
				<text>使用帮助</text>
				<image src="../../static/icon_jiantou.png"  ></image>
			</view>
			<view class="lineview">
				
			</view>
			<view class="Hview">
				<text>隐私政策</text>
				<image src="../../static/icon_jiantou.png"  ></image>
			</view>
			<view class="lineview">
				
			</view>
			<view class="Hview">
				<text>给我评分</text>
				<image src="../../static/icon_jiantou.png"  ></image>
			</view>
		</view>
		<text class="tiptext1">Copyright@2020-2020</text>
		
		<text class="tiptext">艾辰AC.com 版权所有</text>
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
<style>
	page{
		background-color: #F7F7F7;
	}
	</style>
<style scoped lang="scss">
	
.contentview{
	display: flex;
	flex-direction: column;
	align-items: center;
		
	.logoiamge{
		width: 150rpx;
		height: 150rpx;
		margin-top: 100rpx;
	}
	.tiptext1{
		margin-top: 100rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.tiptext{
 		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
 	}
	.bgview{
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 50rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		width: 92%;
		padding-top: 15rpx;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
 		.lineview{
			margin-left: 10rpx;
			margin-right: 10rpx;
			margin-top: 20rpx;
 			background-color: #F4F5F6;
			height: 2rpx;
		}
		.Hview{
			padding-right: 30rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 60rpx;
  			text{
 				font-size: 26rpx;
 				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-top: 20rpx;
			}
			image{
				width: 14rpx;
				height: 24rpx;
			}
			
				
			 
		}
	}
}
</style>
