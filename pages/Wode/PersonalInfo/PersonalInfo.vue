<template>
	<view>
		<nav-bar bgColor="#FFFFFF" fontColor="#333333" title="个人信息">
			<!-- <image slot="right" class="rightImage" @click="toPage('/pages/Wode/customerInfo/customerInfo?type=2')" src="/static/tips.png"></image> -->
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
			<view class="lineview"></view>
			
			<view class="itemView" @click="bangdingweixin">
				<text class="title">微信</text>
				<text class="content">{{weixintext}}</text>
				<image src="/static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 10px;" @click="resetPassword">
				<text class="title">修改密码</text>
 				<image src="/static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 10px;" @click="toPage('/pages/Wode/certification/certification')">
				<text class="title">资质认证</text>
				<image src="static/icon_jiantou.png" mode="" class="rightIcon"></image>
			</view>
			<view class="itemView" style="margin-top: 10px;" @click="toPage('/pages/Wode/customerInfo/customerInfo?type=2')">
				<text class="title">关于我们</text>
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
 		<prompt :visible.sync="promptVisible" title="提示" type="text" :password = password 
		placeholder="请输入密码" @confirm="clickPromptConfirm" 
		mainColor="#0ED482">
		</prompt>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	import onloadImage from '../../../utils/loadImage.js'
	import wPicker from "@/components/w-picker/w-picker.vue"
	import Prompt from '@/components/zz-prompt/index.vue'
	let md5 = require('md5');
	
	export default {
		components:{
			wPicker,
			Prompt
		},
		data() {
			return {
				imageList:[],
				tempFile:[],
				visible:false,
				info:{},
				password:true,
				weixintext:'绑定',
				defaultProps:{"label":"name","value":"id"},
				promptVisible:false ,
				newWeixinID:'',
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
			bangdingweixin(){
				var that = this;
				uni.getProvider({
				    service: 'oauth',
				    success: function(res) {
				        console.log(res.provider);	
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
				              provider: 'weixin',
				              success: function (loginRes) {
				
				 that.newWeixinID = loginRes.authResult.openid;
				                  
				that.promptVisible = true
				              },
				
				              fail:function(res){
					     uni.showToast({
						title:"授权失败",
						icon:'none'
					})							
				    }								
				   })							
				  }								
				    }								
				});
			},
			clickPromptConfirm(val){
				console.log(val)
				 this.refreshweixinId(this.newWeixinID,val)
			},
			//更新用户的微信ID
			refreshweixinId(wxid,pwd) {
				uni.showLoading({
					title: "绑定中..."
				})
				var that = this;
				let passwd = md5(pwd + 'JSKF1234');
				let data = {
						pwd:passwd,
						user_id: getApp().globalData.userId,
						wx_id: wxid,
					}
					console.log(data)
				this.$app.request({
					url: this.$api.user.bindWeixin,
					data: {
						pwd:passwd,
						user_id: getApp().globalData.userId,
						wx_id: wxid,
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						uni.hideLoading()
						console.log(res)
						that.promptVisible = false
						
						if (res.code == 200) {
							//绑定成功后刷新本地wxid数据
							uni.setStorageSync("wxid",wxid);
			
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
			
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
			
						}
					},
					fail: res => {
						uni.hideLoading()
			
					},
					complete: res => {
						uni.hideLoading()
			
					}
				});
			},
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
					if(data.wxId.length>0){
						that.weixintext = "更换"
					}else{
						that.weixintext = "绑定"
						
					}
					
					
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
		//position: absolute !important;
		width: 750rpx;
		display: flex;
		text-align: center;
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