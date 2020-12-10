<template>
	<view class="muBiaoView" >
		<view class="muBiaoViewBack" @click="setShowPerformWindowStatus"></view>
		<view class="muBiaoViewContent">
			<view class="title">短期目标</view>
			<view class="contentText">
				<view class="text">{{short}}</view>
				<view class="contentCenter">
					<view class="title"> 请为本次治疗打分</view>
					<view class="setNumber">
						<view class="numberBotton" @click="setNumber(-1)">-</view>
						<input :disabled="true" :value="number" />
						<view class="numberBotton" @click="setNumber(1)">+</view>
					</view>
					<view class="confirm" @click="confirmProgress">确认进度</view>
					<view class="stop" @click="stopProgress">停止进度</view>
				</view>
				<view class="title">长期目标</view>
			</view>
			<view class="text">{{long}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			short:{
				type:String
			},
			long:{
				type:String
			}
		},
		data() {
			return {
				number:1
			};
		},
		methods:{
			setNumber(data){
				let num = this.number;
				num+=data;
				if(num>=1 && num<=10){
					this.number = num;
					this.$emit('setNumber',{num})
				}
			},
			setShowPerformWindowStatus(){
				this.$emit('setShowPerformWindowStatus',{})
			},
			confirmProgress(){
				this.$emit('setShowPerformWindowStatus',{})
				this.$emit('setShowFinishWindowStatus',{});
			},
			stopProgress(){
				this.$emit('setShowPerformWindowStatus',{})
				
			}
		}
	}
</script>

<style scoped>
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
