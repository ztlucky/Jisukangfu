<template>
	<view class="view">
		<view class="header"></view>
		<view class="list">
			<view class="item" v-for="(i,k) in [1,2,3]" :key="k">
				<view class="itemTop">
						<image class="left" src=""></image>
						<view class="right">
							<view class="name">
								<view class="">刘胡兰</view>
								<view >6床</view>
							</view>
							<view class="info">
								<view class="infoType">
										<image src="../../../static/gongzuotai/icon_zhenduan1.png"></image>
										<view>诊断：心脏病</view>
								</view>
								<view class="">
									<view>性别：女</view>
									<view>年龄：56</view>
								</view>
							</view>
							<view class="id">
								<view>编号：345678　</view>
								<view >查看患者</view>
							</view>
						</view>
				</view>
				<view class="itemBottom">
					诊疗周期：2019.3.18 - 2020.7.17
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
		min-height: 100vh;
		background-color: #F6F6F6;
	}
.header{
	width:100%;
	height: 80rpx;
	background-color: #FFFFFF;
}
.list{
	width:690rpx;
	margin-left: 30rpx;
}
.list .item{
	width: 690rpx;
	height: 306rpx;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	margin-top:30rpx;
}
.item .itemTop{
	width:620rpx;
	height: 154rpx;
	padding:30rpx;
	display: flex;
	justify-content: space-between;
}
.itemTop .left{
	width:154rpx;
	height: 154rpx;
	border-radius: 50%;
	background-color: #007AFF;
}
.right{
	width:458rpx;
	height: 154rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.right > view{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.right .name >view:nth-child(1){
	font-size:32rpx;
	color:#333333;
	font-family: PingFangSC-Semibold, PingFang SC;
}
.right .name >view:nth-child(2){
	font-size:24rpx;
	color:#31D880;
}
.right .info >view:nth-child(1){
	display: flex;
	padding-right: 20rpx;
	align-items: center;
	height: 36rpx;
	background-color: #F0F0F0;
	border-radius: 22rpx;
}
.right .info >view:nth-child(1) image{
	width:28rpx;
	height: 28rpx;
	border-radius: 50%;
	/* background-color: red; */
	margin:4rpx;
}
.right .info >view:nth-child(1) view{
	font-size:20rpx;
	color:#333333;
	font-family: PingFangSC-Semibold, PingFang SC;
}
.right .info >view:nth-child(2){
	display: flex;
	font-size:20rpx;
	color:#999999
}
.right .info >view:nth-child(2) >view:nth-child(2){
	margin-left: 32rpx;
}
.right .id{
	height: 36rpx;
	font-size:20rpx;
}
.right .id >view:nth-child(1){
	color: #999999;
}
.right .id >view:nth-child(2){
	width: 154rpx;
	height: 36rpx;
	background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
	box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
	border-radius: 18rpx;
	text-align: center;
	line-height: 36rpx;
	color:#FFFFFF
}
.itemBottom{
	height: 90rpx;
	width:638rpx;
	padding-left: 42rpx;
	border-top:2rpx solid #EAEAEA;
	line-height: 90rpx;
	font-size:24rpx;
	color: #333333;
}

</style>
