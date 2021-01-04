<template>
	<view>
		<view class="headerNav">
			<view :class="nowIndex == 0?'navItem':'navItem navItem1'" @click="setNowStatus(0)">
				<view class="text">未使用</view>
				<view class="border"></view>
			</view>
			<view :class="nowIndex == 1?'navItem':'navItem navItem1'" @click="setNowStatus(1)">
				<view class="text">已使用</view>
				<view class="border"></view>
			</view>
		</view>
		<view class="list">
			<view v-for="(item , index ) in list" :key="index" style="margin-top:20rpx">
				<view class="item" v-if="((nowIndex == 0 && item.status == 10)||(nowIndex == 1 && item.status == 11)) && item.type == 2">
					<image src="/static/bg_youhuiquan@2x.png"></image>
					<view class="itemTop">
						<view class="itemTopLeft">
							<image src="/static/icon_huiyuan @2x.png"></image>
							<view class="hidden" >优惠券</view>
						</view>
						<view class="itemTopRight">
							<view class="rightTips">¥</view>
							<view class="rightPrice">{{item.value}}</view>
						</view>
					</view>
					<view class="itemText">无门槛</view>
					<view class="itemBottom">不可与其他优惠券共同使用</view>
				</view>
				<view class="item" v-if="((nowIndex == 0 && item.status == 10)||(nowIndex == 1 && item.status == 11)) && item.type == 1">
					<image src="/static/bg_youhuiquan@2x.png"></image>
					<view class="itemTop">
						<view class="itemTopLeft">
							<image src="/static/icon_huiyuan @2x.png"></image>
							<view class="hidden" >邀请码</view>
						</view>
						<view class="itemTopRight">
							<view class="rightTips"></view>
							<view class="rightPrice">{{item.value}}</view>
						</view>
					</view>
					<view class="itemBottom">不可与其他优惠券共同使用</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/util.js'
	export default {
		data() {
			return {
				nowIndex:0,
				list:[]
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			setNowStatus(index){
				this.nowIndex = index;
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.user.getTicketList,
					type:"GET",
					data:{
						pageNo:1,
						pageSize:100,
						column:'createTime',
						order:'desc'
					}
				},true,true).then(data=>{
					that.list = data.records;
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	.list{
		width:690rpx;
		margin: 30rpx;
	}
	.item{
		position: relative;
		width: 690rpx;
		height: 202rpx;
	}
	.item > image{
		position: absolute;
		top:0;
		left: 0;
		width:690rpx;
		height: 202rpx;
	}
	.itemTop{
		position: relative;
		z-index: 10;
		width:630rpx;
		padding:0 30rpx;
		padding-top:18rpx;
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.itemTopLeft{
		
		display: flex;
		align-items: center;
	}
	.itemTopLeft > image{
		width:26rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}
	.itemTopLeft > view{
		width: 360rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
	.itemTopRight{
		display: flex;
		align-items: center;
	}
	.itemTopRight view:nth-child(1){
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top:6rpx;
	}
	.itemTopRight view:nth-child(2){
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #E02020;
	}
	.itemBottom{
		position: absolute;
		bottom: 20rpx;
		left: 30rpx;
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.itemText{
		width:630rpx;
		position: absolute;
		text-align: right;
		bottom: 120rpx;
		left: 30rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.headerNav{
		width: 100%;
		display: flex;
		width:690rpx;
		height: 80rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
	}
	.navItem{
		width:100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 40rpx;
	}
	.text{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}
	.border{
		margin-top: 6rpx;
		width: 32rpx;
		height: 4rpx;
		background-color: #31D880;
		border-radius: 4rpx;
	}
	.navItem1 .text{
		color:#999999;
	}
	.navItem1 .border{
		background-color: #FFFFFF;
	}
</style>
