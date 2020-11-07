<template>
	<view class="view">
		<view class="leftList">
			<view class="leftItem">
				<view class="itemBorder"></view>
				<view class="itemText">脑血栓</view>
			</view>
			<view class="leftItem leftItem1">
				<view class="itemBorder"></view>
				<view class="itemText">脑血栓</view>
			</view>
			<view class="leftItem">
				<view class="itemBorder"></view>
				<view class="itemText">脑血栓</view>
			</view>
		</view>
		<view class="rightContent">
			<view class="rightTop">
				<view class="">夏治偏瘫</view>
				<view class="">夏治偏瘫</view>
				<view class="">夏治瘫偏瘫</view>
				<view class="selected">夏治偏瘫偏瘫偏瘫</view>
				<view class="">夏治偏瘫</view>
				<view class="">夏治偏瘫</view>
				<view class="">夏治偏瘫</view>
				<view class="">夏治瘫偏瘫</view>
				<view class="">夏治偏瘫偏瘫偏瘫</view>
				<view class="">夏治偏瘫</view>
			</view>
			<view class="rightList">
				<view class="rightItem">
					
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
	.view{
		display: flex;
	}
	.leftList{
		width:200rpx;
		min-height: 100vh;
		background-color: #F8F8F8;
	}
	.leftItem{
		font-size: 32rpx;
		color:#333333;
		background-color: #F8F8F8;
		height: 150rpx;
		border-bottom: 2rpx solid #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.leftItem .itemBorder{
		width:4rpx;
		height: 44rpx;
		border-radius: 4rpx;
		margin-left: 2rpx;
	}
	.leftItem .itemText{
		flex: 1;
		text-align: center;
	}
	.leftItem1 .itemBorder{
		background-color:#36DB97;
	}
	.leftItem1 {
		background-color: #FFFFFF;
		color:#31D880;
	}
	.rightContent{
		width:490rpx;
		margin:30rpx;
	}
	.rightContent .rightTop{
		display: flex;
		flex-wrap: wrap;
		foont-size:24rpx;
		line-height: 42rpx;
		border-bottom: 2rpx solid #F8F8F8;
	}
	.rightTop>view{
		margin-bottom: 16rpx;
		margin-right: 24rpx;
	}
	.rightTop .selected{
		color:#31D880;
	}
</style>
