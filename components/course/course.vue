<template>
	<view class="courseItem">
		<image mode="aspectFill" src="/static/gongzuotai/bg_zhibo.png"></image>
		<view class="title hidden2">数字化种牙是全球公认的先进种植技术数字化种牙是全球公认的先进种植技术</view>
		<view class="tips">课程</view>
		<view class="price">¥20元/会员价¥15元</view>
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
	.courseItem{
		position: relative;
		width: 330rpx;
		height: 352rpx;
	}
	.courseItem image{
		width: 330rpx;
		height: 220rpx;
		border-radius: 8rpx;
	}
	.courseItem .title{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}
	.tips{
		position: absolute;
		top:184rpx;
		right: 14rpx;
		background-color: rgba(0,0,0,.4);
		border-radius: 4rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 24rpx;
		padding:0 8rpx;
	}
	.courseItem .price{
		font-size: 18rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF2828;
		line-height: 26rpx;
	}
</style>
