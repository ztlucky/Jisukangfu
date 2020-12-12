<template>
	<view class="viewPage">
		<view class="list">
			<view class="item">
				<view class="itemTitle">工作单位</view>
				<view class="itemRight">
					<view class="itemRightText">烟台毓璜顶医院</view>
					<image src="/static/icon/me_lise_more.png"></image>
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
		width:100%;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.list{
		width:750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
	.item{
		width:720rpx;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item .title{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
</style>
