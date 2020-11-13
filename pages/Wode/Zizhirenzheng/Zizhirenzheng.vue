<template>
	<view>
		<view class="itemView" >
			<text class="title">工作单位</text>
			<text class="content">烟台毓璜顶医院</text>
			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>
		<view class="itemView" >
			<text class="title">毕业院校</text>
			<text class="content">滨州医学院</text>
			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>	
		<view class="itemView" >
			<text class="title">学历</text>
			<text class="content">研究生</text>
			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>	
		<view class="itemView" >
			<text class="title">身份证</text>
			<text class="content">370645798504057532</text>
			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>	
		<view class="itemView" >
			<text class="title">职称</text>
			<text class="content">主任医师</text>
			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>
		<view class="itemView" >
			<text class="title">资质证书</text>
 			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>	
		<view class="itemView" >
			<text class="title">工作证书</text>
			<image src="" mode="" class="rightIcon"></image>
		</view>
		<view class="lineview"></view>	
		<view class="itemView" >
			<text class="title">备注</text>
 			<image src="" mode="" class="rightIcon"></image>
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

<style>
page{
	background-color: #F7F7F7;
}
</style>
<style  scoped lang="scss">
	.itemView{
		display: flex;
		flex-direction: row;
		position: relative;
		background-color: #FFFFFF;	 
		.title{
			margin-top:30rpx;
			margin-left: 30rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
			
			
		.content{
			position: absolute;
			right: 70rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin-top: 32rpx;
		}
		.rightIcon{
			position: absolute;
			right: 30rpx;
			width: 10rpx;
			height: 20rpx;
			background-color: red;
			margin-top: 40rpx;
		}
	}
	.lineview{
		margin-left: 30rpx;
		margin-right: 30rpx;			
	      height: 2rpx;
		  background-color: #ECECEC;
	}
	</style>