<template>
	<view class="viewPage">
		<nav-bar :bgColor="bgColor" fontColor="#000000" :title= "nowStatus==2?'绑定手机号':'修改手机号'">
			<view slot="right" @click="save" class="navRight">确认</view>
		</nav-bar>
		<view class="header">
			<view :class="nowStatus == 1?'item ':'item item1'">1.验证手机号</view>
			<image src="/static/icon/me_lise_more.png"></image>
			<view :class="nowStatus == 2?'item ':'item item1'">2.验证新手机号</view>
		</view>
		<view class="input">
			<input type="number" :disabled="nowStatus == 1" maxlength="11" :name="phone" v-model="phone" :placeholder="nowStatus == 1?'请输入手机号':'请输入新的手机号'" />
			<view class="sendCode" @click="sendCode">{{time<= 0?'发送验证码':time+'s'}}</view>
		</view>
		<view class="input input1">
			<input type="number"  v-model="code" placeholder="请输入验证码" />
		</view>
	</view>
</template>

<script>
	import navBar from "../../../components/zhouWei-navBar/index.vue";
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				bgColor: '#FFFFFF',
				text: '',
				phone: '',
				code: '',
				time: 0,
				nowStatus:1,
 			}
		},
		components: {
			navBar
		},
		onLoad(options) {
			// this.key = options.key?options.key:'';
			this.phone = options.value?options.value:'';
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(options.value))){
				console.log('是吧')
				this.nowStatus = 2;
			}
			this.setTime();
			console.log(this.nowStatus)
		},
		onUnload() {
			this.time = 0;
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
						type:that.nowStatus==1?4:3,
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
				console.log(this.time)
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
				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: '手机号有误，请重新输入',
						icon: "none"
					})
					return false;
				}
				if(this.code.length == 6){
					if(this.nowStatus == 1){
						return request({
							url:getApp().$api.user.login,
							type:"GET",
							data:{
								phone:that.phone,
								code:that.code,
								user_id:getApp().globalData.userId
							}
						}).then(data=>{
							that.code = '';
							that.time = 0;
							that.phone = '';
							that.nowStatus = 2;
						})
						
					}else if(this.nowStatus == 2){
						return request({
							url:getApp().$api.user.setUserPhone,
							type:"GET",
							data:{
								phone:that.phone,
								code:that.code,
								user_id:getApp().globalData.userId
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
</style>
