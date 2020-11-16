<template>
	<view class="viewPage">
		<view class="content">
			<view class="itemView" >
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">结果</text>
				</view>
				<view class="problem" v-for="(v,k) in [1,2,3,4]" :key="k">
					<text class="title">问题</text>
					<view class="text">
						将健侧下肢稍外展,对抗徒手阻力将使下肢内收。观察患侧下肢有无内收动作或内收肌群收缩(Raimiste现象)
					</view>
					<image class="image"></image>
					<view class="title">选项</view>
					<view class="options">
						<view class="optionsItem">
							<view class="dot"></view>
							<view class="optionsText">肌群收缩不充分没有动作</view>
						</view>
						<view class="optionsItem">
							<view class="dot"></view>
							<view class="optionsText">肌群收缩不充分没有动作</view>
						</view>
						<view class="optionsItem">
							<view class="dot"></view>
							<view class="optionsText">肌群收缩不充分没有动作</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="itemView" >
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">注意问题</text>
				</view>
				<view class="problem problem1" v-for="(v,k) in [1,2,3,4]" :key="k">
					<text class="title">问题{{k}}</text>
					<view class="text">
						将健侧下肢稍外展,对抗徒手阻力将使下肢内收。观察患侧下肢有无内收动作或内收肌群收缩(Raimiste现象)
					</view>
					
				</view>
			</view>
			<view class="itemView" >
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">治疗方案</text>
				</view>
				<view class="problem problem1" v-for="(v,k) in [1,2,3,4]" :key="k">
					<text class="title">问题{{k}}</text>
					<view class="text">
						将健侧下肢稍外展,对抗徒手阻力将使下肢内收。观察患侧下肢有无内收动作或内收肌群收缩(Raimiste现象)
					</view>
					
				</view>
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
	.viewPage{
		width:100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
	}
	.content{
		width:690rpx;
		margin:30rpx
	}
	.itemView{
		width:690rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		/*display: flex; 
		flex-direction: column; */
	}
	.titleView{
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.titleView image{
		width:26rpx;
		height: 30rpx;
		margin-left: 40rpx;
		margin-right:16rpx;
	}
	.titleView view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.title{
		display: inline-block;
		padding:0 22rpx;
		height: 36rpx;
		border-radius: 8rpx;
		background-color: #31D880;
		text-align: center;
		line-height: 36rpx;
		margin:30rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.text{
		width:630rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.image{
		margin: 10rpx 30rpx;
		width:468rpx;
		height: 222rpx;
		background-color: red;
		margin-right: 150rpx;
	}
	.optionsItem{
		height: 40rpx;
		display: flex;
		align-items: center;
	}
	.optionsItem .dot{
		width:10rpx;
		height:10rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 50rpx;
	}
	.optionsItem .optionsText{
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.options{
		padding-bottom: 42rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.problem:last-child .options{
		border:none;
	}
	.problem1{
		border-bottom: 2rpx solid #EAEAEA;
		padding-bottom: 40rpx;
	}
	.itemView .problem1:last-child{
		border: none;
	}
</style>
