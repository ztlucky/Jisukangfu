<template>
	<view class="view">
		<view class="content">
			<view class="title">量表问题分类标题</view>
			<input placeholder="请输入要创建的问题分类标题" v-model="title"/>
		</view>
		<view class="bottom" @click="save">保存</view>
	</view>
</template>

<script>
	import yealuo from "../../../components/yealuo-select/yealuo-select.vue";
	import request from "../../../utils/util"
	export default {
		data() {
			return {
				title:"",
				id:-1
				}
		},
		onLoad(data){
			this.id = data.id?data.id:-1;
		},
		methods: {
			save(){
				let that = this;
				if(!this.title){
					uni.showToast({
						title:'请输入问题分类标题',
						duration:1500,
						mask:true,
						icon:"none"
					});
					return false;
				}
				if(this.id == -1){
					uni.$emit('addItem',this.title);
					uni.navigateBack();
				}else{
					return request({
						url:getApp().$api.pingdingliangbiao.addQuestionType,
						data:{
							ratingScaleId:that.id,
							name:that.title
						},
						type:"POST"
					}).then(data=>{
						uni.showToast({
							title:'添加成功',
							duration:1500
						});
						setTimeout(()=>{
							uni.navigateBack();
						},1000);
					})
					
				}
			}
		},
		components: {
			yealuo
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
