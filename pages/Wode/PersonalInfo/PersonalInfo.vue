<template>
	<view>
		<view class="contentview">
			<view class="itemImageView" @click="getImages()">
				<image src="" mode="" class="usericon"></image>
				<text class="title">设置头像</text>
				<image src="../../../static/icon_jiantou.png" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 15px;" @click="editinfo('name')">
				<text class="title">姓名</text>
				<text class="content">路鹏桦</text>
				<image src="../../../static/icon_jiantou.png" class="rightIcon"></image>
			</view>
			<view class="lineview"></view>
			<view class="itemView" >
				<text class="title">性别</text>
				<text class="content">男</text>
				<image src="../../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="lineview"></view>
			<view class="itemView" >
				<text class="title">手机号</text>
				<text class="content">18846216642</text>
				<image src="../../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 15px;" @click="resetPassword">
				<text class="title">修改密码</text>
 				<image src="../../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 15px;">
				<text class="title">资质认证</text>
				<image src="../../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
 		</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	import onloadImage from '../../../utils/loadImage.js'
	export default {
		data() {
			return {
				imageList:[],
				tempFile:[]
			}
		},
		methods: {
			getImages(){
				let that = this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
				        // 预览图片
						console.log(res);
				        that.imageList = (res.tempFilePaths);
						that.tempFile = (res.tempFiles)
				    }
				    });
			},
			savePortrait(){
				onloadImage.init({
					tempFiles:that.tempFile,
					tempFilePaths:that.imageList
				},(data,str)=>{
					console.log(data.imageUrl,str);
					
				}).upload();
			},
			resetPassword(){
				uni.navigateTo({
					url:'../ResetPassword/ResetPassword',
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			editinfo(edittype){
				uni.navigateTo({
					url:'../EditInfo/EditInfo?type='+edittype,
					animationDuration:300,
					animationType:'slide-in-right'
				})
			}
		}
	}
</script>

<style>
		
	page{
		background-color: #F7F7F7;
	}
	</style>
<style scoped lang="scss" >
	.contentview{
		display: flex;
		flex-direction: column;
		.itemImageView{
			display: flex;
			flex-direction: row;
			position: relative;
			background-color: #FFFFFF;
 			
			.usericon{
				width: 128rpx;
				height: 128rpx;
				border-radius: 64rpx;
				background-color: red;
				margin-left: 30rpx;
				margin-top: 30rpx;
				margin-bottom: 30rpx;
			}
			.title{
				margin-top: 72rpx;
				margin-left: 38rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
			}
			.rightIcon{
				position: absolute;
				right: 30rpx;
				width: 10rpx;
				height: 20rpx;
				margin-top: 84rpx;
			}
		}
		.itemView{
			display: flex;
			flex-direction: row;
			position: relative;
			background-color: #FFFFFF;	 
			.title{
				margin-top:30rpx;
				margin-left: 30rpx;
				margin-bottom: 30rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}
				
				
			.content{
				position: absolute;
				right: 70rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-top: 32rpx;
			}
			.rightIcon{
				position: absolute;
				right: 30rpx;
				width: 10rpx;
				height: 20rpx;
 				margin-top: 40rpx;
			}
		}
		.lineview{
			margin-left: 30rpx;
			margin-right: 30rpx;			
              height: 2rpx;
			  background-color: #ECECEC;
		}
	}
</style>