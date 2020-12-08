<template>
	<view class="view">
		<view class="content">
			<view class="title">请填写说明题标题</view>
			<input placeholder="请填写说明题问题标题" v-model="title"/>
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
			this.index = data.index?data.index:3;
			this.isEdit = data.edit?data.edit:1;
			if(this.isEdit == 2){
				this.getInfo();
			}
		},
		methods: {
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.getQuestionInfo,
					type:"GET",
					data:{
						id:that.id
					}
				},true,true).then(data=>{
					that.title = data.title;
				})
			},
			editValue(){
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.editQuestionInfo,
					type:"PUT",
					data:{
						id:that.id,
						title:that.title
					}
				}).then(data=>{
					uni.showToast({
						title:'修改成功',
						duration:1500,
						mask:true
					});
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				})
			},
			save(){
				let that = this;
				if (this.title == '') {
					uni.showToast({
						title: '请输入问题标题',
						duration: 1500,
						icon: 'none'
					});
					return false;
				}
				if(this.isEdit == 2){
					this.editValue();
					return false;
				}
				return request({
					type:'POST',
					url:getApp().$api.pingdingliangbiao.addQuestion,
					data:{
						content:that.checkboxStr,
						type:that.index,//0单选，1多选，2说明
						title:that.title,
						classifyId:that.id
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
