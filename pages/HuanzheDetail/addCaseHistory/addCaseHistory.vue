<template>
	<view class="viewPage">
		<view class="content">
			<view class="title">诊断</view>
			<input placeholder="请填写诊断" v-model="title" />
			<view class="title">诊疗意见</view>
			<textarea  placeholder="请填写诊疗意见" v-model="content"></textarea>
			<view class="title">上传图片</view>
			<view class="list">
				<view :class="((k)%3 == 1?'imageItem imageItem1':'imageItem')"  v-for="(v,k) in list" :key="k">
					<image class="deleteImage" @click="deleteImage(k)" src="../../../static/close.png"></image>
					<image mode="aspectFill" :src="v" class=""></image>
				</view>
				<view :class="'addImage '+((list.length)%3 == 1?'imageItem1':'addImage')" @click="getImages">
					<image src="../../../static/icon_camera.png"></image>
				</view>
			</view>
		</view>
		<view class="save" @click="save">保存</view>
	</view>
</template>
<script>
	import request from "../../../utils/util.js";
	import onloadImage from "../../../utils/loadImage.js";
	export default {
		data() {
			return {
				list:[],
				tempFile:[],
				title:'',
				content:''
			}
		},
		onLoad(data) {
			this.id = data.id?data.id:0;
			this.getData();
		},
		methods: {
			getData(){
				let data = uni.getStorageSync("cases").data;
				console.log(data);
				let file = data.file;
				this.title = data.title?data.title:'';
				this.content = data.content?data.content:''
				if(file){
					file.map(v=>{
						this.list.push(v.url);
						this.tempFile.push(v.url);
					})
				}
			},
			getImages(){
				let that = this;
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						console.log(res);
				        // 预览图片
				        that.list = that.list.concat(res.tempFilePaths);
						that.tempFile = that.tempFile.concat(res.tempFiles)
				    }
				    });
			},
			deleteImage(index){
				this.tempFile.splice(index,1);
				this.list.splice(index,1);
			},
			save(){
				let that = this;
				let str = '';
				if(!this.title){
					str = "请填写诊断信息"
				}else if(!this.content){
					str = "请填写诊疗意见"
				}else if(this.list.length == 0){
					str = "请先选择图片"
				}
				if(str){
					uni.showToast({
						title:str,
						duration:1500,
						icon:"none"
					});
					return false;
				}
				onloadImage.init({
					tempFiles:that.tempFile,
					tempFilePaths:that.list
				},(data,str)=>{
					return request({
						url:getApp().$api.huanzhe.editHuanZhe,
						data:{
							id:that.id,
							diagnose:that.title,
							medicalOpinion:that.content,
							file:str
						},
						type:"PUT"
					}).then(data=>{
						uni.showToast({
							title:'保存成功',
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					})
				}).upload();
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding-bottom: 180rpx;
	}
	.content{
		
		width: 590rpx;
		padding:0 50rpx;
		padding-top:4rpx;
		border-radius: 16rpx;
		margin: 30rpx;
		background-color:#FFFFFF;
		
	}
	.title{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 44rpx;
		padding-top:36rpx;
	}
	input{
		width:534rpx;
		height: 80rpx;
		background-color: #F5F5F5;
		padding:0 28rpx;
		border-radius: 8rpx;
		margin-top:20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
	}
	textarea{
		width: 534rpx;
		height: 208rpx;
		padding:20rpx 28rpx;
		background: #F5F5F5;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40rpx;
		margin-top: 20rpx;
	}
	.list{
		width:590rpx;
		display: flex;
		flex-wrap: wrap;
		/* margin-top:26rpx; */
		padding-bottom: 56rpx;
	}
	.addImage , .imageItem{
		width:176rpx;
		height: 176rpx;
		position: relative;
		margin: 30rpx 0;
		margin-bottom: 0rpx;
	}
	.addImage{
		background-color: #F5F5F5;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8rpx;
	}
	.addImage image{
		width:50rpx;
		height: 44rpx;
		/* background-color: red; */
	}
	.imageItem > image:nth-child(2){
		width: 176rpx;
		height: 176rpx;
		/* background-color: red; */
	}
	.imageItem1{
		margin:30rpx;
		margin-bottom: 0rpx;
	}
	.imageItem .deleteImage{
		width:28rpx;
		height: 28rpx;
		position: absolute;
		z-index: 2;
		right: 8rpx;
		top:8rpx;
	}
	.save {
		position: fixed;
		bottom: 68rpx;
		left: 50%;
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
