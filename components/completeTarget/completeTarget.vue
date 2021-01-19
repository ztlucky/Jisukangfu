<template>
	<view class="finishView">
		<view class="finishViewBack" @click="setShowFinishWindowStatus"></view>
		<view class="finisViewContent">
			<image src="/static/work/bg_all.png" class="finisViewContentImage"></image>
			<view class="finisViewScore">
				<image src="/static/work/bg_neibu.png" class="scoreImage"></image>
				<view class="scoreText">{{number}}</view>
			</view>
			<view class="title" v-if="referrer == 0">您的本次项目得分为</view>
			<view class="title" v-else>本次项目{{referrer != 0?'已执行'+ referrer+'次':''}}</view>
			<view class="text">恭喜您完成本次项目</view>
			<view class="finishConfirm" @click="confirmFinish">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			number:Number,
			 referrer:{
				 type:Number,
				 default:0
			 }
		},
		data() {
			return {

			};
		},
		methods:{
			 confirmFinish(){
				 this.$emit("confirmFinish",{})
			 }
		}
	}
</script>

<style scoped>
	.finishView {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 5;
		top: 0rpx;
		left: 0rpx;
	}

	.finishViewBack {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .6);
		position: absolute;
		top: 0;
		left: 0;
	}

	.finisViewContent {
		width: 518rpx;
		height: 612rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.finisViewContentImage {
		width: 518rpx;
		height: 612rpx;
		/* background-color: red; */
		position: absolute;
		top: 0;
		left: 0;
	}

	.finisViewContent .finishConfirm {
		position: absolute;
		z-index: 2;
		left: 50%;
		transform: translateX(-50%);
		bottom: -8rpx;
		width: 308rpx;
		height: 80rpx;
		background: #31D880;
		border-radius: 50rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.finisViewScore {
		position: relative;
		width: 278rpx;
		height: 278rpx;
		margin-left: 120rpx;
		margin-top: 98rpx;
	}

	.finisViewScore image {
		width: 278rpx;
		height: 278rpx;
		/* background-color: #007AFF; */
	}

	.finisViewScore .scoreText {
		position: absolute;
		top: 74rpx;
		width: 100%;
		left: 0;
		text-align: center;
		font-size: 96rpx;
		font-family: DIN-Bold, DIN;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 118rpx;
	}

	.finisViewContent .title {
		position: relative;
		z-index: 1;
		margin-top: 38rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 42rpx;
	}

	.finisViewContent .text {
		position: relative;
		z-index: 1;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
		margin-top: 6rpx;
		text-align: center;
	}
	.title{
		text-align: center;
	}
</style>
