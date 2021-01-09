<template>
	<view>
		<nav-bar bgColor="#FFFFFF" fontColor="#333333" title="个人信息">
			<image slot="right" class="rightImage" @click="toPage('/pages/Wode/customerInfo/customerInfo?type=2')" src="/static/tips.png"></image>
		</nav-bar>
		<view class="contentview">
			<view class="itemImageView" @click="getImages()">
				<image mode="aspectFill" :src="info.headUrl"  class="usericon"></image>
				<text class="title">设置头像</text>
				<image src="../../../static/icon_jiantou.png" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 15px;" @click="editinfo('name')">
				<text class="title">姓名</text>
				<text class="content">{{info.name}}</text>
				<image src="/static/icon_jiantou.png" class="rightIcon"></image>
			</view>
			<view class="lineview"></view>
			<view class="itemView" @click="showSelectView">
				<text class="title">性别</text>
				<text class="content">{{info.sex == 1?'男':info.sex == 2?'女':'未知'}}</text>
				<image src="/static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="lineview"></view>
			<view class="itemView" @click="editinfo('introduce')">
				<text class="title">简介</text>
				<view class="content hidden">{{info.introduce}}</view>
				<image src="/static/icon_jiantou.png" class="rightIcon"></image>
			</view>
			<view class="lineview"></view>
			<view class="itemView" @click="toPage('/pages/Wode/resetPhone/resetPhone?value='+info.phone)">
				<text class="title">手机号</text>
				<text class="content">{{info.phone}}</text>
				<image src="/static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 15px;" @click="resetPassword">
				<text class="title">修改密码</text>
 				<image src="/static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 15px;" @click="toPage('/pages/Wode/certification/certification')">
				<text class="title">资质认证</text>
				<image src="static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView itemView-" style="margin-top: 15px;" @click="loggedOut">
				<text class="title">退出登陆</text>
				<image src="static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
 		</view>
		<w-picker :visible.sync="visible"
        mode="selector"
        value="男"
        default-type="name"
        :default-props="defaultProps"
        :options="selectorList"
        @confirm="onConfirm($event,'selector')"
        ref="selector" ></w-picker>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	import onloadImage from '../../../utils/loadImage.js'
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				imageList:[],
				tempFile:[],
				visible:false,
				info:{},
				defaultProps:{"label":"name","value":"id"},
				selectorList:[
					{
						id:1,
						name:'男'
					},{
						id:2,
						name:"女"
					}
				]
			}
		},
		onLoad() {
			this.addEvent();
			
		},
		onUnload() {
			uni.$off();
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			loggedOut(){
				let that = this;
				uni.showModal({
					title:'提示',
					content:'确认退出当前登陆账号？',
					success(res) {
						if(res.confirm){
							uni.clearStorageSync();
							getApp().globalData.userId = null;
							uni.navigateTo({
								url: '/pages/Login/Login/Login',
								animationType: 'slide-in-bottom',
								animationDuration: 300
							});
						}
					}
				})
				
				
			},
			showSelectView(){
				this.visible = true;
			},
			onConfirm(data){
				this.info.sex = data.value;
				this.setUserInfo('sex');
			},
			addEvent(){
				let that =this;
				uni.$on('setUserInfo',function(data){
					console.log(data);
					that.info[data.key] = data.value;
					that.setUserInfo(data.key)
				})
			},
			getImages(){
				let that = this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
				        that.imageList = (res.tempFilePaths);
						that.tempFile = (res.tempFiles);
						that.savePortrait();
				    }
				    });
			},
			savePortrait(){
				let that = this;
				onloadImage.init({
					tempFiles:that.tempFile,
					tempFilePaths:that.imageList
				},(data,str)=>{
					// console.log(data)
					that.info.headUrl = data.imageUrl[0];
					that.setUserInfo('headUrl');
				}).upload();
			},
			resetPassword(){
				if(!this.info.phone){
					uni.showToast({
						title:'请先绑定手机号',
						icon:'none'
					})
					return false;
				}
				uni.navigateTo({
					url:'/pages/Wode/ResetPassword/ResetPassword?value='+this.info.phone,
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			editinfo(key){
				let that = this;
				uni.navigateTo({
					url:`/pages/Wode/resetUserInfo/resetUserInfo?key=${key}&value=${that.info[key]}`,
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			toPage(url){
				console.log(url)
				uni.navigateTo({
					url,
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			getUserInfo(){
				let that = this;
				return request({
					url:getApp().$api.user.getUserInfo,
					type:"GET",
					data:{
						id:getApp().globalData.userId
					}
				},true,true).then(data=>{
					that.info = data;
					console.log(data);
				})
			},
			setUserInfo(key){
				let that = this;
				console.log(key,that.info[key],that.info.headUrl)
				return request({
					url:getApp().$api.user.editUserInfo,
					type:"PUT",
					data:{
						[key]:that.info[key],
						id:getApp().globalData.userId
					}
				},false).then(()=>{
					that.getUserInfo();
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
				// background-color: red;
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
				max-width: 500rpx;
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
	.itemView-{
		position: absolute !important;
		width: 750rpx;
		display: flex;
		bottom: 40rpx;
		justify-content: center;
		align-items: center;
		left: 50%;
		transform: translateX(-50%);
	}
	.rightImage {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}
</style>