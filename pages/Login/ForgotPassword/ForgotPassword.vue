<template>
	<view class="bgview" :style="[{height:viewHeight + 'px'}]"> 
		<image class="bgimage" src="../../../static/Login/denglu_beijing.png"  ></image>  
		<image src="../../../static/Login/icon-guanbi.png" class="closeview" @click="returnBack"></image>
		<text class="title">密码找回</text>
		<text class="title1">通过注册的手机号找回密码</text>
		<input type="text" class="input"  placeholder="请输入手机号" v-model="mobile"/>
		<view class="lineview">
			
		</view>
		<view class="codeview">
			<input type="text" class="input1" placeholder="验证码" v-model="code" />
			<text class="getcode" @click="getcodeAction" >{{remaining}}</text>
			
			<!-- <text class="getcode">获取验证码</text> -->
		</view>
		<view class="lineview">
			
		</view>
		<view class="codeview">
			<text class="forgotpassword" @click = "returnBack">返回登陆</text>
 		</view>
		
		<text class="loginbtn" @click="nextAction">下一步</text>
		 
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewHeight:0,
				remaining: '获取验证码', //显示剩余时间
				 remainingd: '',  //数据返回时间秒
				 mobile:'',
				 code:'',
				 timer: '' ,
				 
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
			//获取验证码
			getcodeAction(){
				if(this.mobile.length == 0){
					uni.showToast({
						title:"请输入手机号",
						icon:'none'
					})
					
				}else{
					
					uni.request({
						url:'http://www.huaxiakangfu.com:8090/app/msg/sendcode',
						
						header: {
						 'content-type': 'application/json', 
						},
						
						data:{
							codetype:1,
							phone:this.mobile
						 				
						},
						method:'GET',
						success: (res) => {
							console.log("ddd");
							console.log(res.data);
							
						 uni.showToast({
						 	title:res.data.message,
							icon:'none'
						 })
						 console.log(res.data.code)
						if(res.data.code == '200'){
							//发送成功，开始倒计时
							this.remainingd = 60,
							this.timer = setInterval(()=>{
								this.jishiqi(),
								console.log("ooo"+this.remaining)
							},1000)
						}		 
							 
						},
						fail: (res) => {
							uni.showToast({
								icon:"none",
								title:"请求失败，请检查网络"
							})
						}
						});
					}
					 
					
					
				 
					
			
				},
			//倒计时计时器
			jishiqi: function() {
								var dj = this.remainingd;
								dj = dj - 1;
								if (dj == 0) {
									this.remaining = "获取验证码";
			                   clearInterval(this.timer)
								} else {
									//当前时间减去时间
									
									var ddf = dj; //格式化过后的时间
									
									this.remaining = ddf+'s';
									
									this.remainingd = dj;
								}
				 
							},		
		 
			//进入重新设置密码页面
			nextAction(){
					
				if(this.mobile.length==0 ||this.code.length == 0){
					uni.showToast({
						icon:"none",
						title:"请填写必要信息"
					})
				
				}else{
					let params = "code="+this.code+"&mobile="+this.mobile;
					
					uni.navigateTo({
						url:'../PasswordLogin/ResetPassword/ResetPassword?'+params,
						animationType:'slide-in-right',
						animationDuration:200
					})
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
