<template>
	<view class="view">
		<view class="leftList">
			<view class="leftItem" v-for="(i,k) in [1,2,3,4,5,6,7,4,5,6,8,9]" :key="k">
				<view class="itemBorder"></view>
				<view class="itemText">脑血栓{{k}}</view>
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
				<view class="rightItem" v-for="(i,k) in [1,2,3,4,5,6,7,8,9,12,]" :key="k">
					<view class="rightItemName">
						<view class="nameLeft">
							<view class="name">刘宋琦{{k}}</view>
							<view class="nameType">
								<image src=""></image>
								<view class="typeText">诊断：心脏病</view>
							</view>
						</view>
						<view class="nameRight">7床</view>
					</view>
					<view class="rightItemAge">
						<view class="">性别：女</view>
						<view class>年龄：56</view>
					</view>
					<view class="rightItemId">
						<view class="id">编号：45678987654</view>
						<view class="itemIdButton">查看患者</view>
					</view>
					<view class="rightItemDate">诊疗周期：2020.09.10-2020-11.07</view>
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
		height: 100vh;
		background-color: #F8F8F8;
		overflow-y: scroll;
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
		margin:0 30rpx;
		/* padding: 30rpx 0; */
		height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.rightContent .rightTop{
		display: flex;
		flex-wrap: wrap;
		foont-size:24rpx;
		line-height: 42rpx;
		border-bottom: 2rpx solid #F8F8F8;
		padding-top:30rpx;
	}
	.rightTop>view{
		margin-bottom: 16rpx;
		margin-right: 24rpx;
	}
	.rightTop .selected{
		color:#31D880;
	}
	.rightList{
		padding-bottom: 30rpx;
		margin-top:22rpx;
	}
	.rightItem{
		width:488rpx;
		/* padding:30rpx; */
		padding-top:0rpx;
		/* padding:0 32rpx; */
		border-radius: 16rpx;
		margin-top:30rpx;
		border: 2rpx solid #EAEAEA;
	}
	.rightItem >view{
		display: flex;
		align-items: center;
		padding:0 32rpx;
		width:428rpx;
		/* justify-content: space-between; */
	}
	.rightItem .rightItemName{
		padding-top:30rpx;
		/* display: flex; */
		height: 44rpx;
		justify-content: space-between;
		/* align-items: center; */
	}
	.rightItemName .nameLeft{
		display: flex;
		height: 44rpx;
		align-items: center;
	}
	.nameLeft .nameType {
		display: flex;
		padding-right: 20rpx;
		align-items: center;
		height: 36rpx;
		background-color: #F0F0F0;
		border-radius: 22rpx;
		font-size:24rpx;
	}
	.nameType image{
		width:28rpx;
		height: 28rpx;
		border-radius: 50%;
		background-color: red;
		margin:4rpx;
	}
	.nameType .nametext{
		font-size:20rpx;
		color:#333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.name{
		padding-right: 24rpx;
		font-size:32rpx;
		color:#333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.nameRight{
		font-size:24rpx;
		color:#31D880;
	}
	.rightItemAge{
		display: flex;
		font-size:20rpx;
		color:#999999;
		padding-top:28rpx;
		padding-bottom: 16rpx;
	}
	.rightItemAge > view{
		margin-right: 32rpx;
	}
	.rightItemId{
		display: flex;
		justify-content: space-between;
		height: 36rpx;
		font-size:20rpx;
		/* padding-bottom: 24rpx; */
	}
	.rightItemId >view:nth-child(1){
		color: #999999;
	}
	.rightItemId >view:nth-child(2){
		width: 154rpx;
		height: 36rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 18rpx;
		text-align: center;
		line-height: 36rpx;
		color:#FFFFFF
	}
	.rightItemDate{
		margin-top: 24rpx;
		border-top:2rpx solid #EAEAEA;
		height: 64rpx;
		width:430rpx;
		/* padding-left: 42rpx; */
		line-height: 90rpx;
		font-size:24rpx;
		color: #333333;
	}
	
</style>
