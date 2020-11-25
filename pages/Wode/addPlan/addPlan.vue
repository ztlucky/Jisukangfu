<template>
	<view class="viewPage" >
		<nav-bar :bgColor="bgColor" fontColor="#fff" title="我的方案">
			<view slot="right" @click="save" class="navRight">保存</view>
		</nav-bar>
		<view class="input">
			<input type="text" placeholder="" />
		</view>
	</view>
</template>

<script>
	import navBar from "../../../components/zhouWei-navBar/index.vue"
	export default {
		data() {
			return {
				bgColor:'#31D880'
			}
		},
		components:{
			navBar
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
	}
	.navRight {
		width: 134rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		background-color: #31D880;
		border-radius: 8rpx;
		margin-right: 30rpx;
		border-radius: 8rpx;
		border: 2rpx solid #FFFFFF;
	}
	.input{
		width:690rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding:0 30rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
	}
	input{
		width:690rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
</style>
