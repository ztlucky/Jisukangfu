<template>
	<view class="viewPage">
		<view class="title">方案标题</view>
		<input placeholder="请填写方案的标题" />
		<view class="title">方案内容</view>
		<textarea placeholder="请填写方案内容..." maxlength="-1"></textarea>
		<view class="save">保存</view>
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
	.viewPage{
		padding-top:10rpx;
		padding-left: 30rpx;
	}
	.title{
		padding-top:40rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 44rpx;
	}
	input{
		margin-top:20rpx;
		width: 630rpx;
		height: 80rpx;
		border-radius: 8rpx;
		/* opacity: 0.09; */
		border: 2rpx solid #E8E8E8;
		padding:0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	textarea{
		margin-top:20rpx;
		width: 630rpx;
		height: 280rpx;
		padding:0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
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
