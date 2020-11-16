<template>
	<view class="viewPage">
		<view class="list">
			<view class="item" @click="toPage('/pages/HuanzheDetail/evaluation/evaluation')" v-for="(v,k) in [1,2,3,4,5,6,7,8,9]" :key="k">
				<view class="itemLeft"></view>
				<view class="itemRight">
					<view class="text">
						<view class="title hidden">患者记录患者记录患者记录患者记录患者记录患者记录患者记录1</view>
					</view>
					<image src="../../../static/f_my_kecheng_arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="save" @click="toPage('/pages/KangfuPingdingListPage/KangfuPingdingListPage')">康复评定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toPage(url) {
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
	.viewPage{
		width: 100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-bottom: 180rpx;
		overflow: hidden;
	}
	.list{
		width:690rpx;
		margin: 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding-bottom: 36rpx;
	}
	.item{
		width:686rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* height: 118rpx; */
		overflow: hidden;
	}
	.item .itemLeft{
		width:8rpx;
		height: 8rpx;
		background-color: #31D880;
		border-radius: 50%;
		/* margin-bottom: 20rpx; */
		margin-right: 34rpx;
		margin-left: 26rpx;
	}
	.itemRight{
		display: flex;
		flex: 1;
		height: 98rpx;
		justify-content: space-between;
		align-items: center;
		padding-right: 20rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.itemRight image{
		width:32rpx;
		height: 32rpx;
	}
	.title{
		width: 540rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
		/* padding-top:40rpx; */
	}
	.time{
		padding-bottom: 20rpx;
		margin-top:8rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 32rpx;
	}
	.save {
		position: fixed;
		bottom: 68rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
