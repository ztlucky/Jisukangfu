<template>
	<view class="bgview" :style="[{height:viewHeight + 'px'}]"> 
		<image class="bgimage" src="../../../static/Login/denglu_beijing.png"  ></image>  
		<image src="../../../static/Login/icon-guanbi.png" class="closeview" @click="returnBack"></image>
		<text class="title">账号密码登陆</text>
		<text class="title1">未注册过的手机号将自动创建账号</text>
		<input type="text" class="input"  placeholder="请输入手机号" v-model="mobile"/>
		<view class="lineview">
			
		</view>
		<view class="codeview">
			<input type="text" class="input1" placeholder="密码"  :password="ispasswordsecret" v-model="password"/>
 			<image @click="changesecret" :src="ispasswordsecret?'../../../static/Login/icon_bukejian.png':'../../../static/Login/icon_yanjing.png' "  />
			<!-- <text class="getcode">获取验证码</text> -->
		</view>
		<view class="lineview">
			
		</view>
		<view class="codeview">
			<text class="forgotpassword" @click = "passwordLoginAction">忘记密码？</text>
			<text class="zhuce" @click="returnBack">注册账号</text>
		</view>
		
		<text class="loginbtn" @click="loginaction">登陆</text>
		 
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewHeight:0,
				ispasswordsecret:true,//密码是否可见 true 不可见 
				mobile:'',
				password:''
			}
		},
		onShow:function(){
			this.viewHeight = this.$app.getwindowHeight()
		},
		methods: {
			//返回
			
			returnBack() {
				
				uni.navigateBack({
					
				}) 
			},
			//密码登陆
				
			loginaction(){
			 uni.showLoading({
			 	
			 })
				this.$app.request({
						url: this.$api.user.loginPwd,
						data: {
							phone: this.mobile,
							passwd: this.password
						},
						method: 'POST',
						success: res => {
							uni.hideLoading()
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
								//登陆成功
							if(res.code == '200'){
 								                             uni.setStorageSync('userid',res.data.userid)
															 uni.setStorageSync('name',res.data.name)
															 uni.setStorageSync('roletype',res.data.roletype)
															 uni.setStorageSync('headurl',res.data.name)
															 uni.setStorageSync('phone',res.data.phone)
								getApp().globalData.userId = res.data.userid;
								getApp().globalData.userName = res.data.name; 
								
 								setTimeout(function(){
								      // 登录成功
								uni.switchTab({
									url:'../../Daxue/Daxue'
									 
								})},2000)
								
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
			
			passwordLoginAction(){
				uni.navigateTo({
					url:'../ForgotPassword/ForgotPassword',
					animationType:'slide-in-right',
					animationDuration:200
				})
			},
			//改变密码显示状态
			
			changesecret(){
				this.ispasswordsecret = !this.ispasswordsecret
			}
		}
	}
</script>

<style scoped lang="scss">
	
.bgview{
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
 	.bgimage{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
   	}
		
	.closeview{
		width: 48rpx;
		height: 48rpx;
		margin-left: 30rpx;
		margin-top: 60rpx;
	}
	.title{
		
		font-size: 44rpx;
 		font-weight: 700;
		color: #000000;
		margin-left:54rpx ;
		margin-top: 84rpx;
 	}
	.title1{
		
		font-size: 24rpx;
 		font-weight: 400;
		color: #999999;
		margin-left: 54rpx;
		margin-top:16rpx ;
 	}
		
	.input{
 		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333;
		margin-left:54rpx ;
		margin-top:134rpx ;
		margin-right: 88rpx;
 	}
	.lineview{
 		height: 2rpx;
		margin-left:54rpx ;
		margin-right: 88rpx;
		margin-top: 12rpx;
		background-color:#DCDCDC ;
	}
		
	.codeview{
 		display: flex;
		flex-direction: row;
        justify-content: space-between;
 		.input1{
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333;
			margin-left:54rpx ;
			margin-top:66rpx ;
			margin-right: 88rpx;
		}
			
		image{
			width: 38rpx;
			height: 20rpx;
			margin-right:100rpx ;
			margin-top: 80rpx;
		}
		.getcode{
			
			font-size: 24rpx;
 			font-weight: 400;
			color: #31D880;
			margin-right:100rpx ;
			margin-top:70rpx ;
			
 		}
		.forgotpassword{
			height: 50rpx;
			line-height: 50rpx;
			margin-left: 54rpx;
			margin-top:30rpx ;
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			margin-top:30rpx ;
			
		}
			
		.zhuce{
			
			font-size: 24rpx;
 			font-weight: 400;
			color: #31D880;
 			margin-right:100rpx ;
			margin-top: 30rpx;
		}
	}
		
	
		
	.loginbtn{
 		height: 72rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		border-radius: 38rpx;
		margin-left: 74rpx;
		margin-right: 74rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
		margin-top: 78rpx;
		  -moz-box-shadow:0px 2px 10px #31D880;
		     -webkit-box-shadow:0px 2px 10px #31D880;
		     box-shadow:0px 2px 15px #31D880;
	}
		
	 
}
</style>
