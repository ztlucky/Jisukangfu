<template>
	<view class="viewPage">
		<view class="xuangMuInfo">
			<view class="infoLeft">
				<view class="leftName">
					<view class="">六花blab</view>
					<view class="">性别：女</view>
					<view class="">年龄:56</view>
				</view>
				<view class="leftType">
					<image src="../../../static/gongzuotai/icon_zhenduan1.png"></image>
					<view class="leftTypeText">诊断：心脏病</view>
				</view>
			</view>
			<view class="infoRight">
				<view class="">80</view>
				<view class="">得分</view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(v,k) in [1,2,3]" :key="k">
				<view class="itemTitle">
					<view class="">康复项目1</view>
					<view class="">开始时间：2020-06-31</view>
				</view>
				<view class="itemText">
					<text>短期目标：站立平衡达到三级，十天达到三级，十天达到三级，十天达到三级，十天达到三级，十天达到三级，十天达到三级，十天。</text>
				</view>
				<view class="itemText">
					<text>短期目标：站立平衡达到三级，十天。</text>
				</view>
				<view class="itemBottom">
					<view class="">剩余时间：5天</view>
					<view class="">结束</view>
				</view>
			</view>
		</view>
		<view class="bottom">添加项目</view>
		<view class="muBiaoView">
			<view class="muBiaoViewBack"></view>
			<view class="muBiaoViewContent">
				<view class="title">短期目标</view>
				<view class="contentText">
					<view class="text">脑卒中又称脑血管意外（CVA），主要是指脑动脉系统病变引起的血管痉挛。</view>
					<view class="contentCenter">
						<view class="title"> 请为本次治疗打分</view>
						<view class="setNumber">
							<view class="numberBotton">-</view>
							<input :disabled="true" value="10" />
							<view class="numberBotton">+</view>
						</view>
						<view class="confirm">确认进度</view>
						<view class="stop">停止进度</view>
					</view>
					<view class="title">长期目标</view>
				</view>
				<view class="text">脑卒中又称脑血管意外（CVA），主要是指脑动脉系统病变引起的血管痉挛。</view>
			</view>
		</view>
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
	.viewPage {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F6F6F6;

	}

	.xuangMuInfo {

		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 590rpx;
		padding: 0 50rpx;
		height: 194rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		margin: 30rpx;
	}

	.xuangMuInfo .infoLeft {
		/* height: 44rpx; */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.leftName {
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.leftName>view:nth-child(1) {
		font-size: 32rpx;
		color: #333333;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 500;
		margin-right: 38rpx;
	}

	.leftName>view:nth-child(2) {
		margin-right: 32rpx;
	}

	.leftName>view:nth-child(2),
	.leftName>view:nth-child(3) {
		font-size: 22rpx;
		color: #666666;
	}

	.leftType {
		display: flex;
		align-items: center;
		margin-top: 16rpx;
		padding-right: 20rpx;
		align-items: center;
		height: 36rpx;
		background-color: #F0F0F0;
		border-radius: 22rpx;
	}

	.leftType image {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		/* background-color: red; */
		margin: 4rpx;
	}

	.leftType .leftTypeText {
		font-size: 20rpx;
		color: #333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}

	.infoRight {
		width: 122rpx;
		height: 122rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 50%;
	}

	.infoRight>view:nth-child(1) {
		/* width: 66rpx; */
		height: 60rpx;
		font-size: 60rpx;
		font-family: DIN-Bold, DIN;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 60rpx;
		margin-top: 16rpx;
		text-align: center;
	}

	.infoRight>view:nth-child(2) {
		height: 24px;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 24rpx;
		text-align: center;
	}

	.list {
		/* padding-top:30rpx; */
		width: 690rpx;
		margin-left: 30rpx;
		padding-bottom: 120rpx;
	}

	.list .item {
		display: flex;
		flex-direction: column;
		width: 630rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 30rpx;

	}

	.item .itemTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 44rpx;
		padding-top: 28rpx;
		padding-bottom: 14rpx;
	}

	.itemTitle>view:nth-child(1) {
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 500;
		color: #333333;
		font-size: 32rpx;
	}

	.itemTitle>view:nth-child(2) {
		font-size: 24rpx;
		color: #31D880;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.itemText text {
		/* flex:auto; */
		display: inline-block;
		font-size: 24rpx;
		color: #666666;
		line-height: 32rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		padding-left: 14rpx;
		padding-right: 12rpx;
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		margin-bottom: 12rpx;
		font-weight: 400;
		font-family: PingFangSC-Medium, PingFang SC;
	}

	.itemBottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		marin-top: 30rpx;
		margin-bottom: 32rpx;
		height: 42rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
	}

	.itemBottom>view:nth-child(1) {
		min-width: 224rpx;
		padding: 0 10rpx;
		height: 42rpx;
		background: #2AD36A;
		line-height: 42rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.itemBottom>view:nth-child(2) {
		width: 124rpx;
		height: 42rpx;
		font-size: 24rpx;
		border-radius: 20rpx;
		border: 2rpx solid #FA4000;
		color: #FA4000;
		line-height: 42rpx;
		text-align: center;
	}

	.bottom {
		position: fixed;
		bottom: 44rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}
	.muBiaoView{
		position: fixed;
		top:0;
		left: 0;
		width:100vw;
		height:100vh;
	}
	.muBiaoView .muBiaoViewBack{
		width:100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.6);
		position: absolute;
		top:0;
		left: 0;
	}
	.muBiaoView .muBiaoViewContent{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		width:612rpx;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 26rpx;
		padding-bottom: 48rpx;
	}
	.title{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
		text-align: center;
	}
	.title:nth-child(1){
		margin-top:46rpx;
		margin-bottom: 18rpx;
	}
	.muBiaoViewContent .text{
		width:482rpx;
		padding-left: 64rpx;
		padding-right: 66rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
		border-top:2rpx solid #EAEAEA;
		padding-top:14rpx;
	}
	.contentText{
		width:612rpx;
		display: flex;
		min-height: 608rpx;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.setNumber{
		width:266rpx;
		margin-top: 38rpx;
		margin-bottom: 34rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8rpx;
		border:2rpx solid #EAEAEA;
		margin-left: 16rpx;
	}
	.setNumber >view{
		width: 62rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 8rpx;
		font-size:34rpx;
	}
	.setNumber >view:nth-child(1){
		font-size:50rpx;
		color:#EAEAEA;
		border-right: 2rpx solid #EAEAEA;
	}
	.setNumber >view:nth-child(3){
		color:#FFFFFF;
		background-color: #31D880;
	}
	.setNumber input{
		flex: 1;
		text-align: center;
		line-height: 60rpx;
		fobnt-size:36rpx;
		color:#31D880;
	}
	.confirm , .stop{
		width: 296rpx;
		height: 60rpx;
		background-color: #31D880;
		border-radius: 32rpx;
		margin-bottom: 20rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		border:2rpx solid #31D880;
	}
	.stop{
		background-color: #FFFFFF;
		color: #31D880;
		
	}
</style>
