<template>
	<view>
		<nav-bar    bgColor="#ffffff" backState="1000" fontColor="#000000" type="ordinary" title="姓名" >
			<view slot="right"  @click="save" class="navRight">完成</view>
		</nav-bar>
		<view class="itemView">
			<input class="contentInput" placeholder="请输入姓名"/>
				
			 
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
<style lang="scss">
	.navRight{
		width: 112rpx;
		height: 42rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		border: 2rpx solid #979797;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		text-align: center;
		margin-right: 42rpx;
	}
	.itemView{
		display: flex;
		flex-direction: row;
		position: relative;
		background-color: #FFFFFF;	 
		.contentInput{
 			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
            color: #333333;
			margin-top: 32rpx;
 			height: 50rpx;
			margin-left: 30rpx;
			margin-bottom: 30rpx;
			width: 400rpx;
		}
		 
	}
	.lineview{
		margin-left: 30rpx;
		margin-right: 30rpx;			
	      height: 2rpx;
		  background-color: #ECECEC;
	}
	</style>
