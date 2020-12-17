<template>
	<view class="courseItem" @click="toPage(info.id)">
		<image mode="aspectFill" src="/static/gongzuotai/bg_zhibo.png"></image>
		<view class="title hidden2">{{info.name?info.name:''}}</view>
		<view class="tips">课程</view>
		<view class="price">¥{{info.cost}}元/会员价¥{{info.memberCost}}元</view>
	</view>
</template>

<script>
	export default {
		props:{
			info:{
				type:Object
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toPage(id) {
				uni.navigateTo({
					url: "/pages/Daxue/KechengDetail/KechengDetail?id="+id,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
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
