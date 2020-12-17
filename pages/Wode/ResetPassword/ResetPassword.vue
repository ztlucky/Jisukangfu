<template>
	<view class="viewPage">
		<nav-bar :bgColor="bgColor" fontColor="#000000" title="修改密码">
			<view slot="right" @click="save" class="navRight">确认</view>
		</nav-bar>
		<!-- <view class="header">
			<view :class="nowStatus == 1?'item ':'item item1'">1.验证手机号</view>
			<image src="/static/icon/me_lise_more.png"></image>
			<view :class="nowStatus == 2?'item ':'item item1'">2.输入新密码</view>
		</view> -->
		<!-- <view class="" v-if="nowStatus == 1"> -->
			<view class="input border">
				<input type="number" :disabled="true" maxlength="11" :name="phone"  placeholder="请输入手机号"  v-model="phone"/>
				<view class="sendCode" @click="sendCode">{{time<= 0?'发送验证码':time+'s'}}</view>
			</view>
			<view class="input input1">
				<input type="number"  v-model="code"   placeholder="请输入验证码" />
			</view>
		<!-- </view> -->
		<!-- <view class="" v-if="nowStatus == 2"> -->
			<view class="input input1">
				<input type="password"   v-model="password" placeholder="请输入新密码" />
			</view>
			<view class="input input1">
				<input type="password"   v-model="password1" placeholder="请确认新密码" />
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
	import navBar from "../../../components/zhouWei-navBar/index.vue";
	import request from "../../../utils/util.js"
	let md5 =  require('md5');
	export default {
		data() {
			return {
				bgColor: '#FFFFFF',
				text: '',
				phone: '',
				code: '',
				time: 0,
				nowStatus:2,
				password:'',
				password1:''
			}
		},
		components: {
			navBar
		},
		onLoad(options) {
			// this.key = options.key?options.key:'';
			this.phone = options.value?options.value:'';
			if(this.phone == ''){
				this.nowStatus == 2;
			}
			this.setTime();
		},
		onUnload() {

		},
		methods: {
			sendCode() {
				let that = this;
				if (this.time >= 1) return;
				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: '手机号有误，请重新输入',
						icon: "none"
					})
					return false;
				}
				return request({
					url:getApp().$api.user.getcode,
					type:"GET",
					data:{
						phone:that.phone
					}
				}).then(data=>{
					uni.showToast({
						title:'发送成功',
						icon:"success"
					});
					that.time = 60;
					that.setTime();
				})
			},
			setTime() {
				if (this.time >= 1) {
					setTimeout(() => {
						this.time--;
						this.setTime();
					}, 1000)
				}
			},
			check() {

				return false;
			},
			save() {
				let that = this;
				
				if(this.code.length == 6 ){
						if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
							uni.showToast({
								title: '手机号有误，请重新输入',
								icon: "none"
							})
							return false;
						}
						if(this.password.length <=5){
							uni.showToast({
								title:'密码不可少于6位',
								icon:'none'
							})
						}else if(this.password != this.password1){
							uni.showToast({
								title:'两个次输入的密码不一致',
								icon:'none'
							})
						}else{
							let pwd = md5(this.password + 'JSKF1234'); 
							return request({
								url:getApp().$api.user.setPwd,
								type:"GET",
								data:{
									phone:that.phone,
									code:that.code,
									pwd,
									id:getApp().globalData.userId
								}
							}).then(data=>{
								uni.showToast({
									title:'修改成功',
									icon:"success"
								})
								setTimeout(()=>{
									uni.navigateBack();
								},1000);
								
							})
						}

				}else{
					uni.showToast({
						title:'验证码格式有误',
						icon:"none"
					})
				}
				// uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.viewPage {
		width: 750rpx;
		min-height: 100vh;
		background-color: #F9F9F9;
	}

	.navRight {
		width: 134rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		font-size: 26rpx;
		color: #333333;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 30rpx;
		border-radius: 8rpx;
		border: 2rpx solid #979797;
	}

	.input {
		width: 720rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		padding-right: 0;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
	}
	.item1{
		color: #666666;
	}
	input {
		width: 460rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-right: 2rpx solid #E5E5E5;
		
	}

	.input view {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.input1{
		/* height: 100rpx; */
	/* 	width: 720rpx;
		margin-left: 30rpx; */
		
		
	}
	.input1 input {
		height: 100rpx;
		line-height: 100rpx;
		border-top:2rpx solid #E5E5E5;
		width: 720rpx;
		border-right: none;
	}
	.header{
		height: 90rpx;
		width: 750rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		justify-content: space-between;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.header view{
		flex: 1;
		text-align: center;
		line-height: 90rpx;
	}
	.header image{
		width:16rpx;
		height: 26rpx;
	}
	.border{
		border-top:2rpx solid #E5E5E5;
	}
</style>
