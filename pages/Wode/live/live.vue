<template>
	<view class="viewPage">
		<view class="list">
			<live  :list="list" ></live>
		</view>
		<view class="save" @click="create">新建直播课程</view>
	</view>
</template>

<script>
	import live from "../../../components/live/live.vue"
	export default {
		data() {
			return {
				list:[],
				type:''
			}
		},
		onLoad(options) {
			if(options.type == 1){
				this.type = options.type?options.type:2;
			}
			this.getData()
		},
		methods: {
			//获取直播数据
 			getData() {
				this.$app.request({
					
					url: this.$api.zhibo.livelist,
					data: {
						userId:getApp().globalData.userId,
						condition1:this.type == 1,
						condition2:this.type == 2
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
	.list{
		padding-bottom: 140rpx;
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
