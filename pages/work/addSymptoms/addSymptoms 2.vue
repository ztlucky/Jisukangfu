<template>
	<view class="view">
		<view class="content">
			<view class="title">症状名称</view>
			<input placeholder="请输入要创建的症状名称" v-model="title"/>
		</view>
		<view class="bottom" @click="save">保存</view>
	</view>
</template>

<script>
	import request from "../../../utils/util"
	export default {
		data() {
			return {
				title:"",
				}
		},
		onLoad(options) {
			this.id = options.id;
		},
		methods: {
			save(){
				let that = this;
				if(!this.title){
					uni.showToast({
						title:'请输入症状名称',
						duration:1500,
						mask:true,
						icon:"none"
					});
					return false;
				}
				return request({
					type:"POST",
					url:getApp().$api.huanzhe.addSymptom,
					data:{
						name:that.title,
						illnessId:that.id,
						userId:getApp().globalData.userId
					}
				}).then(data=>{
					uni.showToast({
						title:'添加成功',
						duration:1500,
						mask:true
					});
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				})
			}
		}

	}
</script>

<style scoped>
	.view {
		width: 100vw;
		/* min-height: 100vh; */
		/* background-color: #F6F6F6; */
		overflow: hidden;
	}

	.content {
		width: 650rpx;
		/* margin: 32rpx 30rpx; */
		padding: 50rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}

	.title {
		color: #666666;
		font-size: 32rpx;
		line-height: 44rpx;
		padding-top: 10rpx;
		padding-bottom: 20rpx;
	}

	.content input {
		width: 600rpx;
		line-height: 80rpx;
		height: 80rpx;
		color: #333333;
		border-radius: 8rpx;
		background-color: #F5F5F5;
		font-size: 28rpx;
		padding: 0 28rpx;
	}

	.bottom {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	}
</style>
