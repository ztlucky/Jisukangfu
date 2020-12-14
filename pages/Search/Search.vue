<template>
	<view class="contentview">
		<view class="header header1">
			<view class="sousuo">
				<image src="/static/homesearch.png"></image>
				<input placeholder="搜索课程" />
			</view>
		</view>
	</view>
	
</template>

<script>
	import expert from "@/components/experts/experts.vue";
	import request from '../../utils/util.js';
	export default {
		components:{
			expert
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.contentview{
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.header .title{
		padding-top: 22rpx;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 50rpx;
	}
	.header .sousuo{
		
		transform: translateY(30%);
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		margin-left: 30rpx;
	}
	.sousuo image{
		width:26rpx;
		height: 26rpx;
		margin-left: 24rpx;
		margin-right: 16rpx;
	}
	.sousuo input{
		width: 600rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40px;
	}
</style>
