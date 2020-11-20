<template>
	<view class="viewPage">
		<view class="list">
			<view class="item">
				<view class="itemTitle inputView">
					<view class="text">项目名称</view>
					<input placeholder="请输入姓名名称" />
				</view>
				<view class="inputView">
					<view class="text">项目一标题</view>
					<input placeholder="项目一标题" />
				</view>
				<view class="inputView">
					<view class="text">项目费用</view>
					<input placeholder="请输入完成项目的费用" />
				</view>
				<view class="inputView">
					<view class="text">项目得分</view>
					<input placeholder="请输入完成项目的得分" />
				</view>
				<view class="itemTitle inputView">
					<view class="text">项目时间</view>
					
				</view>
			</view>
			<view class="addItem">添加项目</view>
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
		width:690rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding:30rpx;
	}
	.list{
		width:690rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		/* margin: 30rpx; */
		padding-bottom: 60rpx;
	}
	.text{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 44rpx;
		margin-left: 30rpx;
		padding-top: 40rpx;
	}
	input{
		width: 570rpx;
		margin:0 30rpx;
		height: 80rpx;
		padding:0 30rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}
	.itemTitle{
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #f5f5f5;
	}
	.addItem{
		width: 252rpx;
		height: 80rpx;
		border-radius: 8rpx;
		border: 2rpx solid #31D880;
		margin-top: 50rpx;
		margin-left: 30rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #31D880;
	}
</style>
