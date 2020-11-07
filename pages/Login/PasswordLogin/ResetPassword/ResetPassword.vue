<template>
	<view class="bgview" :style="[{height:viewHeight + 'px'}]"> 
		<image class="bgimage" src="../../../../static/Login/denglu_beijing.png"  ></image>  
		<image src="../../../../static/Login/icon-guanbi.png" class="closeview" @click="returnBack"></image>
		<text class="title">密码找回</text>
		<text class="title1">通过注册的手机号找回密码</text>
		<input type="text" class="input"  placeholder="请输入密码" v-model="password"/>
		<view class="lineview">
			
		</view>
		<view class="codeview">
			<input type="text" class="input1" placeholder="请再次输入密码"  v-model="againpassword"/>
			<!-- <text class="getcode">获取验证码</text> -->
		</view>
		<view class="lineview">
			
		</view>
		 
		
		<text class="loginbtn" @click="sureAction">确认</text>
		 
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewHeight:0,
				code:'',
				mobile:'',
				password:'',
				againpassword:''
				
			}
		},
		onLoad:function(e){
		this.code = e.code;
		this.mobile = e.mobile;
		console.log(this.code);
		console.log(this.mobile);
		
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
				
			passwordLoginAction(){
				uni.navigateTo({
					url:'../PasswordLogin/PasswordLogin',
					animationType:'slide-in-right',
					animationDuration:200
				})
			},
			// 提交重置密码
			sureAction(){
					 
				 if(this.password.length == 0 ||this.againpassword.length == 0){
					 uni.showToast({
					 	title:'请填写密码',
						icon:'none'
					 })
					 
				 }else if(this.password != this.againpassword){
					 uni.showToast({
					 	title:'两次密码输入不一致',
					    icon:'none'
					 })
				 }else{
					 console.log(this.code)
					 this.$app.request({
					 		url: this.$api.user.resetPwd ,
					 		data: {
					 			phone: this.mobile,
					 			passwd: this.password,
								phonecode:this.code
					 		},
					 		method: 'POST',
					 		success: res => {
								console.log(res.code);
 					 			uni.showToast({
					 				title:res.msg,
					 				icon:"none",
									
					 			})
									 
					 			 if(res.code == '200'){
									 setTimeout(function(){
									 uni.navigateTo({
									 	url:'../../Login/Login'
									 										
									 }) 	
									 
									 },2000)
									 										
									
								 }
					 			 
					 		},
					 		fail: res => {
								
					 		},
					 		complete: res => {
					 			 
					 		}
					 	});
				 }
				 
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
		.forgotpassword{
			height: 50rpx;
			line-height: 50rpx;
			margin-left: 54rpx;
			margin-top:30rpx ;
			font-size: 24rpx;
			font-weight: 400;
			color: #31D880;
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
