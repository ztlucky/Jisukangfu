<template>
	<view class="view">
		<view class="problem" v-if="info.type == 1">
			<view class="title">
				<view class="titleText">问题</view>
				<image v-if="isEdit" src="../../../static/order/icon_xuanzhong.png"></image>
			</view>
			<view class="text">
				{{v.title}}
			</view>
			<image class="image"></image>
			<view class="title">
				<view class="titleText">选项</view>
				<!-- <image src="../../../static/order/icon_xuanzhong.png"></image> -->
			</view>
			<view class="options">
				<view class="optionsItem" v-for="(vv,kk) in v.content" :key="kk">
					<view class="dot"></view>
					<view class="optionsText">{{vv.title}}</view>
				</view>
			</view>
			<view class="edit">
				<view class="editText" @click="toPage('/pages/work/createProblem/createProblem?id='+info.id+'&edit=2')">编辑</view>
			</view>
		</view>
		<view class="problem" v-if="info.type == 2">
			<view class="title">
				<view class="titleText">问题</view>
				<image v-if="isEdit" src="../../../static/order/icon_xuanzhong.png"></image>
			</view>
			<view class="text">
				{{v.title}}
			</view>
			<image class="image"></image>
			<view class="title">
				<view class="titleText">选项</view>
				<!-- <image src="../../../static/order/icon_xuanzhong.png"></image> -->
			</view>
			<view class="options">
				<view class="optionsItem" v-for="(vv,kk) in v.content" :key="kk">
					<view class="dot"></view>
					<view class="optionsText">{{vv.title}}</view>
				</view>
			</view>
			<view class="edit">
				<view class="editText" @click="toPage('/pages/work/createProblem/createProblem?id='+info.id+'&edit=2')">编辑</view>
			</view>
		</view>
		<view class="problem" v-if="info.type == 3">
			<view class="title">
				<view class="titleText">问题</view>
				<image v-if="isEdit" src="../../../static/order/icon_xuanzhong.png"></image>
			</view>
			<view class="text">
				{{info.title}}
			</view>
			
			<view class="edit">
				<view class="editText" @click="toPage('/pages/work/createTextProblem/createTextProblem?id='+info.id+'&edit=2')">编辑</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js";
	export default {
		data() {
			return {
			isEdit:false,
			list:[],
			num:0,
			index:1,
			size:10,
			info:{}
			}
		},
		onLoad(data) {
			this.id = data.id?data.id:6;
			this.getInfo();
		},
		methods: {
			setNowStatus(){
				this.isEdit = !this.isEdit;
			},
			save(){
				this.setNowStatus();
			},
			toPage(url,f = true,index = 0){
				let that = this;
				if(!f){
					this.list[url].isSelected = !this.list[url].isSelected;
					let num = 0;
					this.list.map(v=>{
						if(v.isSelected){
							num++;
						}
					})
					this.num = num;
				}else{
					
						uni.navigateTo({
							url,
							animationDuration: 300,
							animationType: 'slide-in-right'
						})
					
					
				}
			},
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.getQuestionInfo,
					tppe:"GET",
					data:{
						id:that.id
					}
				},true,true).then(data=>{
					console.log(data);
					that.info = data;
				})
			}
		}
	}
	
</script>

<style scoped>
	.view{
		min-height: 100vh;
		background-color: #f6f6f6;
		padding-bottom: 140rpx;
		overflow: hidden;
	}
	.navRight{
		width:104rpx;
		height: 40rpx;
		text-align: center;
		font-size:24rpx;
		color:#31D880;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 30rpx;
	}

	.bottom{
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		color:#FFFFFF
	}
	.bottomNav{
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		display: flex;
		width:690rpx;
		/* margin-left: 30rpx; */
		justify-content: space-between;
		
	}
	.bottomNav >view{
		line-height: 80rpx;
		text-align: center;
	}
	.bottomNav >view:nth-child(1){
		width: 330rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border:2rpx solid #E02020;
		font-size:28rpx;
		color:#E02020;
		background-color: #FFFFFF;
	}
	.bottomNav >view:nth-child(2){
		width: 330rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		font-size:28rpx;
		color:#FFFFFF;
	}
	.rightView1 image{
		background-color: #DDDDDD;
		border-radius: 50%;
	}
	.problem{
		width:690rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		margin-left: 30rpx;
		margin-top:30rpx;
	}
	.titleView{
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.titleView image{
		width:26rpx;
		height: 30rpx;
		margin-left: 40rpx;
		margin-right:16rpx;
	}
	.titleView view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.title .titleText{
		padding:0 22rpx;
		height: 36rpx;
		border-radius: 8rpx;
		background-color: #31D880;
		text-align: center;
		line-height: 36rpx;
		margin:30rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.title image{
		width:36rpx;
		height: 36rpx;
		margin-right: 30rpx;
		background-color: #E0E0E0;
		border-radius: 50%;
	}
	.text{
		width:630rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.image{
		margin: 10rpx 30rpx;
		width:468rpx;
		height: 222rpx;
		background-color: red;
		margin-right: 150rpx;
	}
	.optionsItem{
		height: 40rpx;
		display: flex;
		align-items: center;
	}
	.optionsItem .dot{
		width:10rpx;
		height:10rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 50rpx;
	}
	.optionsItem .optionsText{
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.options{
		/* padding-bottom: 42rpx; */
		/* border-bottom: 2rpx solid #EAEAEA; */
	}
	.problem:last-child .options{
		border:none;
	}
	.problem1{
		border-bottom: 2rpx solid #EAEAEA;
		padding-bottom: 40rpx;
	}
	.itemView .problem1:last-child{
		border: none;
	}
	.edit{
		width: 100%;
		height: 56rpx;
		display: flex;
		justify-content: flex-end;
		padding-bottom: 40rpx;
	}
	.edit .editText{
		width: 188rpx;
		height: 56rpx;
		border-radius: 8rpx;
		border: 2rpx solid #31D880;
		
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #31D880;
		text-align: center;
		line-height: 56rpx;
		margin-right:30rpx;
	}
</style>
