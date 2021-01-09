<template>
	<view class="list" v-if="list.length > 0">
		<view @click="toPage('/pages/Daxue/Zhibodetail/Zhibodetail?id=' + item.id)" class="item" v-for="(item, index) in list" :key="index" hover-class="none">
	<view class="itemLeft">
		<image mode="aspectFill" :src="item.cover"></image>
		<view class="tips">
			<view class="dot"></view>
 			<text class="tipsText" v-if="item.status == 0">未开始</text>
		  	<text class="tipsText" v-if="item.status == 1">直播中</text>
			<text class="tipsText" v-if="item.status == 2">已结束</text>  
		</view>
	</view>
	<view class="itemRight">
		<view class="title hidden2">{{item.title}}</view>
		<!-- <view class="itemAddress">华南地区</view> -->
		<view class="itemInfo">
			<view>¥ {{item.cost}}元/会员价¥{{item.memberCost}}元</view>
			<view class="">
				<view> {{item.viewerCount}}人观看</view>
				<view>进入</view>
			</view>
		</view>
	</view>
					 
		</view>
	</view>
	 
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function(e) {
					return [];
				}
			},
			notpay:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			toPage(url) {
				if(this.notpay){
					uni.showToast({
						title:'请在购买班级后，在进行该操作!',
						icon:'none'
					})
					return false;
				}
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
	.item {

		width: 690rpx;
		height: 160rpx;
		display: flex;
		padding: 0 30rpx;
		padding-top: 30rpx;
	}

	.item .itemLeft {
		position: relative;
		width: 240rpx;
		height: 160rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 30rpx;
	}

	.itemLeft image {
		position: absolute;
		top: 0;
		left: 0;
		width: 240rpx;
		height: 160rpx;
	}

	.dot {
		width: 6rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 50%;
		margin: 0 8rpx;
	}

	.itemLeft .tips {
		position: absolute;
		top: 16rpx;
		left: 12rpx;
		z-index: 1;
		width: 94rpx;
		height: 28rpx;
		background: #31D880;
		border-radius: 4rpx;
		font-size: 18rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.itemRight {
		flex: 1;
		position: relative;
	}

	.itemRight .title {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}

	.itemAddress {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 34rpx;
		margin: 8rpx 0;
	}

	.itemInfo {
		display: flex;
		justify-content: space-between;
		height: 36rpx;
		align-items: center;
		position: absolute;
		bottom: 10rpx;
	}

	.itemInfo>view:nth-child(1) {
		font-size: 18rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF2828;
		line-height: 26rpx;
	}

	.itemInfo>view:nth-child(2) {
		width: 220rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.itemInfo>view:nth-child(2)>view:nth-child(1) {
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 26rpx;
		margin-left: 20rpx;
	}

	.itemInfo>view:nth-child(2)>view:nth-child(2) {
		width: 74rpx;
		height: 36rpx;
		background: #EBEBEB;
		border-radius: 18rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		text-align: center;
		line-height: 36rpx;
	}
</style>
