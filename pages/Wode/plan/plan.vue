<template>
	<view class="viewPage">
		<view class="list" :style="!isNotEdit?'padding-top:22rpx':''">
			<view class="item" @click="toPage('/pages/HuanzheDetail/recordInfo/recordInfo')"  v-for="(v,k) in [2,2,3,4]" :key="k">
				<view class="itemLeft" :style="isNotEdit?'margin-bottom:0':'margin-bottom:10rpx'"></view>
				<view class="itemRight" :style="isNotEdit?'height:98rpx':'height:118rpx'">
					<view class="text" >
						<view class="title hidden" :style="isNotEdit?'':'margin-top:18rpx'">患者记录患者记录患者记录患者记录患者记录患者记录患者记录1</view>
						<view class="time" v-if="!isNotEdit">2020-06-30 06:00</view>
					</view>
					<view class="rightView">
						<view class="name" v-if="isNotEdit">蜡笔小新</view>
						<view class="tips">未发送</view>
						<image src="../../../static/f_my_kecheng_arrow.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="save" >方案价格设置</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isNotEdit:true
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
		width:630rpx;
		padding:0 30rpx;
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
		margin-bottom: 20rpx;
	}
	.itemRight{
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.itemRight image{
		width:32rpx;
		height: 32rpx;
	}
	.title{
		width: 300rpx;
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
	.rightView{
		display: flex;
		align-items: center;
	}
	.rightView{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #E02020;
		line-height: 34rpx;
	}
	.rightView .name{
		color: #999999;
		margin-right: 12rpx;
	}
	.rightView .tips{
		margin-right: 20rpx;
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
