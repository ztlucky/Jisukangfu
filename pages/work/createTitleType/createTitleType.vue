<template>
	<view class="view">
		<view class="content">
			<view class="title">评定量表分类</view>
			<yealuo @getBackVal="getBackVal" :selectIco="true" placeholder="请选择分类" width="590" :binData="binData" checkType="radio"
			 :isShowAllBack="true" padding="20rpx"></yealuo>
			<view class="title">评定量表标题</view>
			<input placeholder="请输入要创建的评定量表的标题" />
		</view>
		<view class="bottom">下一步</view>
	</view>
</template>

<script>
	import yealuo from "../../../components/yealuo-select/yealuo-select.vue"
	export default {
		data() {
			return {
				binData: [{
						value: '那此处也好',
						id: 1
					},
					{
						value: '那此处也好2',
						id: 2
					},
					{
						value: '那此处也好3',
						id: 3
					},
					{
						value: '那此处也好4',
						id: 4
					}
				]
			}
		},
		methods: {
			getBackVal(data) {
				console.log(data.split('|'));

			}
		},
		components: {
			yealuo
		}

	}
</script>

<style scoped>
	.view {
		width: 100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
	}

	.content {
		width: 590rpx;
		margin: 32rpx 30rpx;
		padding: 50rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}

	.title {
		color: #666666;
		font-size: 32rpx;
		line-height: 44rpx;
		padding-top: 10rpx;
		padding-bottom: 20rpx;
	}

	.content input {
		width: 534rpx;
		line-height: 80rpx;
		height: 80rpx;
		color: #333333;
		border-radius: 8rpx;
		background-color: #F5F5F5;
		font-size: 28rpx;
		padding: 0 28rpx;
	}

	.bottom {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;

	}
</style>
