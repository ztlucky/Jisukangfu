<template>
	<view class="view">
		<view class="top">
			<textarea placeholder="输入创建的描述" v-model="title"></textarea>
			<view class="topImageList">
				<view v-for="(v,k) in imageList" :key="k" :class="'imageItem '+((k)%3 == 1?'imageItem1':'imageItem')" >
					<image :src="v" mode="aspectFill"></image>
					<image mode="aspectFill" src="../../../static/icon_delete.png" class="delete" @click="deleteImage(k)"></image>
				</view>
				<view :class="'imageItem imageAdd '+((imageList.length)%3 == 1?'imageItem1':'imageItem')" @click="getImages">
					<image class="image" src="../../../static/img_icon.png"></image>
				</view>
			</view>
		</view>
		<view class="textView">
			<view class="title">{{index == -1?'问题':'选项'}}解释</view>
			<input v-model="text"/>
			<view class="title">{{index == -1?'问题':'选项'}}诊断</view>
			<textarea v-model="text1"></textarea>
		</view>
		<view class="save" @click="save()">保存</view>
	</view>
</template>

<script>
	import onloadImage from "../../../utils/loadImage.js";
	import request from "../../../utils/util.js";
	export default {
		data() {
			return {
				imageList:[],
				tempFile:[],
				title:'',//问题描述
				text:'',//问题解释
				text1:'',//问题诊断
				imgList:[],//访问的图片路径
			}
		},
		onLoad(data) {
			this.index = data.index;
			this.title = data.title?data.title:'';
			this.text = data.text?data.text:'';
			this.text1 = data.text1?data.text1:'';
			this.tempFile = data.imglist?JSON.parse(data.imglist):[];
			this.imageList = data.imglist?JSON.parse(data.imglist):[];
			
;			console.log(this.imageList);
		},
		methods: {
			getImages(){
				let that = this;
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
				        that.imageList = that.imageList.concat(res.tempFilePaths);
						that.tempFile = that.tempFile.concat(res.tempFiles)
				    }
				    });
			},
			deleteImage(index){
				console.log(index);
				this.tempFile.splice(index,1);
				this.imageList.splice(index,1);
			},
			save(){
				let str = '';
				let that = this;
				if(!this.title){
					str = `请输入创建的描述`;
				}else if(!this.text){
					str = '请输入解释'
				}else if(!this.text1){
					str = '请输入诊断'
				}else if(this.imageList.length == 0){
					str = '请选择图片'
				}
				if(str){
					uni.showToast({
						title:str,
						duration:1500,
						mask:true,
						icon:"none"
					})
					return false;
				}
				onloadImage.init({
					tempFiles:that.tempFile,
					tempFilePaths:that.imageList,
				},(data,str)=>{
					that.imgList = data.imageUrl;
					let dataInfo = {
						title:that.title,
						text:that.text,
						text1:that.text1,
						index:that.index,
						imgList:that.imgList
					}
					
					uni.showToast({
						title:'保存成功',
						duration:1500
					});
					uni.$emit('addItem',dataInfo);
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				}).upload()
				
				
			}
		}
	}
</script>

<style scoped>
	.view{
		width:750rpx;
		min-height: 100vh;
		background-color: #f6f6f6;
	}
	.top{
		width:690rpx;
		padding:34rpx 30rpx;
		background-color: #FFFFFF;
		padding-bottom: 4rpx;
	}
	.topImageList{
		
		display: flex;
		flex-wrap: wrap;
	}
	.top textarea{
		height: 100rpx;
		margin-bottom: 20rpx;
		font-size:28rpx;
	}
	.imageItem{
		position: relative;
		width:184rpx;
		height: 184rpx;
		margin-bottom: 30rpx;
	}
	.imageItem1{
		margin:30rpx;
		margin-top: 0rpx;
	}
	.imageItem image:nth-child(1){
		position: absolute;
		top:0;
		left: 0;
		width:184rpx;
		height: 184rpx;
	}
	.imageAdd{
		background: #EFFFF6;
		border-radius: 8rpx;
		border: 2rpx dashed #78F4B3;
	}
	.imageAdd image:nth-child(1){
		width:50rpx;
		height: 50rpx;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.imageItem .delete{
		width:28rpx;
		height: 28rpx;
		position: absolute;
		top:8rpx;
		right: 8rpx;
		/* background-color: #007AFF; */
		border-radius: 50%;	
	}
	.textView{
		width:690rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
		margin-top:30rpx;
		padding-bottom: 30rpx;
	}
	.title{
		color:#999999;
		font-size:28rpx;
		padding-top:24rpx;
	}
	.textView input{
		font-size:28rpx;
		color:#333333;
		line-height: 60rpx;
		height: 60rpx;
		/* padding: 0 20rpx; */
	}
	.textView view:nth-child(3){
		padding-top:38rpx;
		border-top:2rpx solid #E5E5E5;
	}
	.textView textarea{
	height: 80rpx;
	font-size:28rpx;
	width:100%;
	border-bottom: 2rpx solid #E5E5E5;
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
