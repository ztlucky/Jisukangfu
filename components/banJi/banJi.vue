<template>
	<view class="item" @click="toPage('/pages/Wode/banJiDesc/banJiDesc')">
		<view class="banJiInfo">
			<image class="infoIcon" src="/static/gongzuotai/bg_huiyuan.png"></image>
			<view class="banJiInfoTips">课程</view>
			<view class="banJiInfoText">
				<view class="textTitle hidden">{{itemObject.name}}</view>
				<view class="textPrice">¥{{itemObject.cost}}元/会员价¥{{itemObject.memberCost}}元</view>
				<view class="textView">
					<view v-if="itemObject.collectCount!=null">{{itemObject.collectCount}}人收藏</view>
<!-- 					<view>共15节课</view>
 -->				</view>
			</view>
		</view>
		<view class="banJiDesc hidden2">{{itemObject.presentation}}
 		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			itemObject: {
				type: Object,
				default: function(e) {
					return {};
				}
			}
		},
		methods: {
			toPage(url){
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>

<style scoped>
	.item{
		padding-top:30rpx;
		width: 690rpx;
	}
	.banJiInfo{
		display: flex;
		position: relative;
	}
	.banJiInfo .infoIcon{
		width: 298rpx;
		height: 168rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}
	.banJiInfoTips{
		position: absolute;
		top:134rpx;
		left: 222rpx;
		padding:0 12rpx;
		border-radius: 4rpx;
		background-color: rgba(0,0,0,.4);
		height: 32rpx;
		line-height: 32rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.banJiInfoText{
		width:370rpx;
	}
	.banJiInfoText .textTitle{
		width: 370rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
		margin-top:26rpx;
		margin-bottom: 16rpx;
	}
	.banJiInfoText .textPrice{
		font-size: 18rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF2828;
		line-height: 26rpx;
		margin-bottom: 10rpx;
	}
	.banJiInfoText .textView{
		display: flex;
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 26rpx;
	}
	.banJiInfoText .textView>view:nth-child(1){
		margin-right: 14rpx;
	}
	.banJiDesc{
		padding:10rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
		height: auto;
		margin-top:10rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
	}
</style>
