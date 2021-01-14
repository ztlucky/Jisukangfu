<template>
	<view class="bgview" :style="[{height:viewHeight + 'px'}]"> 
		<image class="bgimage" src="../../../static/Login/denglu_beijing.png"  ></image>  
		<image src="../../../static/Login/icon-guanbi.png" class="closeview" @click="returnBack"></image>
		<text class="title">设置密码</text>
		<text class="title1">未注册过的手机号将自动创建账号</text>
		<input type="text" class="input" v-model="password"  placeholder="密码"/>
		<view class="lineview">
			
		</view>
		 
		 
 		<text class="loginbtn" @click="setpasswordAction">确认</text>
		 
		<view class="">
			
		</view>
	</view>
</template>

<script>
	let md5 = require('md5');
	
 	export default {
		data() {
			return {
				viewHeight:0,
				password:'',
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
							//设置密码
							setpasswordAction(){
 								console.log('===='+getApp().globalData.userId)	
								if(this.password.length == 0 ){
									uni.showToast({
										title:'请输入密码',
										icon:'none'
									})
								}else{
								 let passwd = md5(this.password + 'JSKF1234');
								 
									this.$app.request({
											
											url: this.$api.user.setPwd,
											data: {
 												id: getApp().globalData.userId,
												passwd: passwd
											},
											method: 'POST',
 											success: res => {
												console.log(res.code)
													uni.showToast({
														title:res.msg,
														icon:'none'
													})
												if(res.code == 200){
													setTimeout(function(){
                                                          // 登录成功
													uni.switchTab({
														url:'../../Daxue/Daxue'
														 
													})},2000)
													
												}
												
 											},
											fail: res => {
 											},
											complete: res => {
												 
											}
										});
									}
								 
							},
			//密码登陆	
			passwordLoginAction(){
				uni.navigateTo({
					url:'../PasswordLogin/PasswordLogin',
					animationType:'slide-in-right',
					animationDuration:200
				})
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
		.getcode{
			
			font-size: 24rpx;
 			font-weight: 400;
			color: #31D880;
			margin-right:100rpx ;
			margin-top:70rpx ;
			
 		}
	}
		
	.passwordLogin{
		height: 50rpx;
		line-height: 50rpx;
		margin-left: 54rpx;
		margin-top:30rpx ;
		font-size: 24rpx;
		font-weight: 400;
		color: #31D880;
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
		
	.weixinIcon{
		display: flex;
		flex-direction: column;
		align-items: center;
		width:100% ;
		bottom: 150rpx;
		image{
			width: 72rpx;
			height: 72rpx;
			
		}
	}	
	.lasttext{
		position: absolute;
		bottom: 90rpx;
		width: 100%;
		display: flex;
 		flex-direction: row;
 		justify-content: center;
 		.text1{
			font-size: 20rpx;
 			font-weight: 400;
			color: #999999;
 			
		}
			
		.text2{
			font-size: 20rpx;
			font-weight: 400;
			color: #31D880;
			margin-left: 5rpx;
			margin-right: 5rpx;
		}
	}
}
</style>
