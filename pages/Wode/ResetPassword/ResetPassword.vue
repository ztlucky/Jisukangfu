<template>
	<view>
		<nav-bar  bgColor="#ffffff" backState="1000" fontColor="#000000" title="修改密码" type="ordinary" >
			<view slot="right"  @click="save" class="navRight">完成</view>
		</nav-bar>
		<view class="itemView">
			<text class="title">输入旧密码:</text>
			<input class="contentInput" placeholder="旧密码"  password="true"/>
		</view>
		<view class="lineview"></view>
<view class="itemView">
			<text class="title">输入新密码:</text>
			<input class="contentInput" placeholder="新密码"  password="true"/>
		</view>
		<view class="lineview"></view>
			<view class="itemView">
				<text class="title">再次输入新密码:</text>
				<input class="contentInput" placeholder="确认新密码"  password="true"/>
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
				
			save(){
			}
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
		.title{
			margin-top:30rpx;
			margin-left: 30rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
			
			
		.contentInput{
			position: absolute;
			right: 30rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin-top: 32rpx;
			width: 250rpx;
			height: 50rpx;
		}
		 
	}
	.lineview{
		margin-left: 30rpx;
		margin-right: 30rpx;			
	      height: 2rpx;
		  background-color: #ECECEC;
	}
	</style>
