<template>
	<view class="viewPage">
		<view class="headerNav" v-if="type == 2">
			<view :class="nowIndex == 0?'navItem':'navItem navItem1'" @click="setNowStatus(0)">
				<view class="text">已购买</view>
				<view class="border"></view>
			</view>
			<view :class="nowIndex == 1?'navItem':'navItem navItem1'" @click="setNowStatus(1)">
				<view class="text">收藏</view>
				<view class="border"></view>
			</view>
		</view>
		<view class="list" v-if="list.length >=1">
			<live  :list="list" ></live>
		</view>
		<view class="save" @click="create" v-if="type == 1">新建直播课程</view>
	</view>
</template>

<script>
	import live from "../../../components/live/live.vue"
	export default {
		data() {
			return {
				list:[],
				type:2,
				nowIndex:0,
			}
		},
		onLoad(options) {
			this.type = options.type?options.type:2;
			this.getData()
		},
		methods: {
			setNowStatus(index){
				if(index == this.nowIndex) return false;
				this.nowIndex = index;
				this.getData();
			},
			//获取直播数据
 			getData() {
				this.$app.request({
					url: this.$api.zhibo.livelist,
					data: {
						userId:getApp().globalData.userId,
						condition1:this.type == 2 && this.nowIndex == 0,
						condition2:this.type == 2 && this.nowIndex == 1,
						column:'createTime',
						order:'desc'
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						if (res.code ==200) {
							 
							 
						   this.list =  res.result.records;
 							
						 
						}
					},
					fail: res => {
					},
					complete: res => {
					}
				});
			},
			create(){
				uni.navigateTo({
					url:"/pages/Zhibo/createLive/createLive",
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
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
	.list{
		padding-bottom: 40rpx;
		background-color: #FFFFFF;
	}
	.save {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		z-index: 3;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
