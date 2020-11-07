<template>
	<view class="view">
		<view class="navList">
			<view class="item" v-for="(i,k) in [1,2,3]" :key="i">
				<view class="itemLeft">
					<view class="title">评定量表</view>
					<view class="text hidden">选择用肯定是会计师苦上加苦飞机上看</view>
				</view>
				<image src="" class="itemRight"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.hidden{
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap;
	}
	.hidden2{
	overflow: hidden;
	text-overflow: ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	}
	.view{
		background-color: #f6f6f6;
		min-height: 100vh;
	}
	.navList{
		width:690rpx;
		padding:30rpx;
	}
	.navList .item{
		width:610rpx;
		height: 92rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:44rpx 40rpx;
		border-radius: 8rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}
	.item .itemLeft .title{
		font-size: 32rpx;
		color:#333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.item .itemLeft .text{
		max-width: 400rpx;
		font-size:24rpx;
		margin-top: 14rpx;
	}
	.item .itemRight{
		width:80rpx;
		height: 80rpx;
		background-color: red;
	}
</style>
