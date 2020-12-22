<template>
	<view class="bgview" :style="[{height:viewHeight + 'px'}]">
		<image class="bgimage" src="../../../static/Login/denglu_beijing.png"></image>
		<image src="../../../static/Login/icon-guanbi.png" class="closeview" @click="returnBack"></image>
		<text class="title">手机快捷登陆</text>
		<text class="title1">未注册过的手机号将自动创建账号</text>
		<input type="text" class="input" v-model="mobile" placeholder="请输入手机号" />
		<view class="lineview">

		</view>
		<view class="codeview">
			<input type="number" class="input1" placeholder="请输入验证码" v-model="code" />
			<text class="getcode" @click="getcodeAction">{{remaining}}</text>
		</view>
		<view class="lineview">

		</view>
		<text class="passwordLogin" @click="passwordLoginAction">密码登陆</text>
		<text class="loginbtn" @click="loginAction">登陆</text>
		<view class="weixinIcon">
			<image src="../../../static/icon_weixin.png" @click="weixinLoginAction"></image>
		</view>
		<view class="lasttext">
			<text class="text1">继续下一步代表同意</text>
			<text class="text2" @click="protolpage">用户协议</text>
			<text class="text1">和</text>
			<text class="text2" @click="privicypage">隐私政策</text>

		</view>
		<view class="">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewHeight: 0,
				remaining: '获取验证码', //显示剩余时间
				remainingd: '', //数据返回时间秒
				timer: '',
				mobile: '',
				code: ''
			}
		},
		//物理键返回
		onBackPress: function(e) {

			// uni.showModal({
			//                 title: '提示',
			//                 content: '是否退出？',
			//                 success: function(res) {
			//                     if (res.confirm) {
			//                         // 退出当前应用，改方法只在App中生效  
			//                         plus.runtime.quit();
			//                     } else if (res.cancel) {
			//                         console.log('用户点击取消');
			//                     }
			//                 }
			//             });
			uni.switchTab({
				url: '/pages/Daxue/Daxue'
			})
			return true;
		},
		onShow: function() {
			this.viewHeight = this.$app.getwindowHeight()
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			//协议
			 protolpage(){
				  const item = {url:"http://www.huaxiakangfu.com/privacy/yinsi.html",
				                title: "用户协议"
				                     }

				 uni.navigateTo({
				 	url:'../Protocol/Protocol?item='+encodeURIComponent(JSON.stringify(item)),
					animationDuration:300,
					animationType:'slide-in-right'
				 })
			 },
			 //隐私政策
			 
			 privicypage(){
				const item = {url:"http://www.huaxiakangfu.com/privacy/yinsi-.html",
				               title: "隐私政策"
				                 }
				
				uni.navigateTo({
					url:'../Protocol/Protocol?item='+encodeURIComponent(JSON.stringify(item)),
									animationDuration:300,
									animationType:'slide-in-right'
				})
			 },
			//返回
			returnBack() {
				uni.switchTab({
					url: '/pages/Daxue/Daxue'
				})
			},
			//获取验证码
			getcodeAction() {
				if (this.remaining != '获取验证码') {
					return false;
				}
				if (this.mobile.length == 0) {
					uni.showToast({
						title: "请输入手机号",
						icon: 'none'
					})

				} else {

					uni.request({
						url: 'http://www.huaxiakangfu.com:8090/app/msg/sendcode',

						header: {
							'content-type': 'application/json',
						},

						data: {
							codetype: 1,
							phone: this.mobile

						},
						method: 'GET',
						success: (res) => {
							console.log("dddd");
							console.log(res);
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
							if (res.data.code == '200') {
								//发送成功，开始倒计时
								this.remainingd = 60,
									this.timer = setInterval(() => {
										this.jishiqi(),
											console.log("ooo" + this.remaining)
									}, 1000)
							}

						},
						fail: (res) => {
							uni.showToast({
								icon: "none",
								title: "请求失败，请检查网络"
							})
						}
					});
				}






			},


			//倒计时计时器
			jishiqi: function() {
				var dj = this.remainingd;
				dj = dj - 1;
				if (dj == 0 || this.remaining == '获得验证码') {
					this.remaining = "获取验证码";
					clearInterval(this.timer)
				} else {
					//当前时间减去时间

					var ddf = dj; //格式化过后的时间

					this.remaining = ddf + 's';

					this.remainingd = dj;
				}

			},

			weixinLogin(info, unionid) {
				uni.showLoading({
					title: ''
				})

				console.log(info.avatarUrl)
				console.log(info.nickName)
				console.log(info.gender)
				console.log(unionid)

				uni.request({
					//url: 'http://www.huaxiakangfu.com:8090/app/user/loginByWX',
                  url:'http://www.huaxiakangfu.com:8090/user/user/loginByWX',
					header: {
						'content-type': 'application/json',
					},
					data: {
					   name:info.nickName,
					   wxId: unionid,
					   sex:info.gender,
					   headUrl:info.avatarUrl
					},
					method: 'POST',
					success: (res) => {
 						console.log(res.data)
						uni.hideLoading()
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						if (res.data.code == '200') {

 							uni.setStorageSync('userid', res.data.result.id)
							uni.setStorageSync('name', res.data.result.name)
							uni.setStorageSync('roletype', res.data.result.role)
							uni.setStorageSync('headurl', res.data.result.headUrl)
							uni.setStorageSync('phone', res.data.result.phone)
							uni.setStorageSync("wxid",res.data.result.wxId);
							getApp().globalData.userId = res.data.result.id;
							getApp().globalData.userName = res.data.result.name;


							setTimeout(function() {
								// 登录成功
								uni.switchTab({
									url: '../../Daxue/Daxue'

								})
							}, 2000)
						}


					},
					fail: (res) => {
						uni.hideLoading()
						uni.showToast({
							icon: "none",
							title: "请求失败，请检查网络"
						})
					}
				});

			},
			//微信登陆
			weixinLoginAction() {
				var that = this

				uni.getProvider({

					service: 'oauth',

					success: function(res) {

						console.log(res.provider);

						//支持微信、qq和微博等

						if (~res.provider.indexOf('weixin')) {

							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log(infoRes.userInfo)


											that.weixinLogin(infoRes.userInfo, loginRes.authResult.openid)
										}
									})
								},

								fail: function(res) {
									uni.showToast({
										title: "授权失败",
										icon: 'none'
									})
								}
							})
						}
					}
				});
			},
			//登陆操作							
			loginAction() {

				if (this.code.length == 0 || this.mobile.length == 0) {
					uni.showToast({
						title: '请完善相关信息',
						icon: 'none'
					})
				} else {
					uni.request({
						url: 'http://www.huaxiakangfu.com:8090/user/user/loginByPhoneCode',

						header: {
							'content-type': 'application/json',
						},
						data: {
							phone: this.mobile,
							code: this.code

						},
						method: 'GET',
						success: (res) => {
							console.log(res);
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
							if (res.data.code == '200') {
								// "company": null,
								// "education": null,
								// "headurl": null,
								// "introduce": null,
								// "lastLogintime": "2020年10月13日10时44分02秒",
								// "name": "18265352478",
								// "paytype": 1,
								// "phone": "18265352478",
								// "registtime": "2020年09月25日14时18分42秒",
								// "roletype": 1,
								// "school": null,
								// "setpwd": 0,
								// "sex": null,
								// "userid": 24

								uni.setStorageSync('userid', res.data.data.id)
								uni.setStorageSync('name', res.data.data.name)
								uni.setStorageSync('roletype', res.data.data.roletype)
								uni.setStorageSync('headurl', res.data.data.name)
								uni.setStorageSync('phone', res.data.data.phone)
								uni.setStorageSync("wxid",res.data.data.wxId);
								getApp().globalData.userId = res.data.data.id;
								getApp().globalData.userName = res.data.data.name;
								console.log(getApp().globalData.userId);
								if (res.data.data.pwd == null) {
									//登陆成功，未设置密码
									//进入设置密码页面	
									setTimeout(function() {
										uni.navigateTo({
											url: '../SetPassword/SetPassword',
											animationDuration: 300,
											animationType: 'slide-in-right'
										})
									}, 2000)

								} else {

									setTimeout(function() {
										// 登录成功
										uni.switchTab({
											url: '../../Daxue/Daxue'

										})
									}, 2000)
								}
							}

						},
						fail: (res) => {
							uni.showToast({
								icon: "none",
								title: "请求失败，请检查网络"
							})
						}
					});




				}

			},
			//密码登陆	
			passwordLoginAction() {
				uni.navigateTo({
					url: '../PasswordLogin/PasswordLogin',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bgview {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;

		.bgimage {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
		}

		.closeview {
			width: 48rpx;
			height: 48rpx;
			margin-left: 30rpx;
			margin-top: 60rpx;
		}

		.title {

			font-size: 44rpx;
			font-weight: 700;
			color: #000000;
			margin-left: 54rpx;
			margin-top: 84rpx;
		}

		.title1 {

			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			margin-left: 54rpx;
			margin-top: 16rpx;
		}

		.input {
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333;
			margin-left: 54rpx;
			margin-top: 134rpx;
			margin-right: 88rpx;
		}

		.lineview {
			height: 2rpx;
			margin-left: 54rpx;
			margin-right: 88rpx;
			margin-top: 12rpx;
			background-color: #DCDCDC;
		}

		.codeview {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.input1 {
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333;
				margin-left: 54rpx;
				margin-top: 66rpx;
				margin-right: 88rpx;
			}

			.getcode {

				font-size: 24rpx;
				font-weight: 400;
				color: #31D880;
				margin-right: 100rpx;
				margin-top: 70rpx;

			}
		}

		.passwordLogin {
			height: 50rpx;
			line-height: 50rpx;
			margin-left: 54rpx;
			margin-top: 30rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #31D880;
		}

		.loginbtn {
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
			-moz-box-shadow: 0px 2px 10px #31D880;
			-webkit-box-shadow: 0px 2px 10px #31D880;
			box-shadow: 0px 2px 15px #31D880;
		}

		.weixinIcon {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			bottom: 150rpx;
			position: absolute;

			image {
				width: 72rpx;
				height: 72rpx;

			}
		}

		.lasttext {
			position: absolute;
			bottom: 90rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.text1 {
				font-size: 20rpx;
				font-weight: 400;
				color: #999999;

			}

			.text2 {
				font-size: 20rpx;
				font-weight: 400;
				color: #31D880;
				margin-left: 5rpx;
				margin-right: 5rpx;
			}
		}
	}
</style>
