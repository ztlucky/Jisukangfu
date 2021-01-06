<template>
	<view class="contentview">
		<view class="header header1" :style="'padding-top:'+topheight+'px'">
			<view class="title">搜索</view>
			<view class="sousuo">
				<image src="/static/homesearch.png"></image>
				<input :auto-focus="true" placeholder="搜索医生" @confirm="getList(true)" @blur="getList(true)" v-model="value"/>
			</view>
		</view>
		<view class="header header2" :style="'padding-top:'+topheight+'px'">
			<view class="title">搜索</view>
		</view>
		<view class="recommended" v-if="expertList && expertList.length >=1">
			<view class="recommendedList" >
				<expert :info="v" :isshow="(k == expertList.length-1)" v-for="(v,k) in expertList" :key="k"></expert>
			</view>
		</view>
	</view>
	
</template>

<script>
	import expert from "@/components/experts/experts.vue";
	import request from '../../../utils/util.js';
	export default {
		components:{
			expert
		},
		data() {
			return {
				expertList:[],
				topheight:0,
				value:'',
				isGetMoreDataList:true
			}
		},
		onReachBottom() {
			if(this.isGetMoreDataList){
				this.getList();
			}else{
				uni.showToast({
					title:'暂无更多数据',
					icon:'none'
				});
			}
		},
		onLoad() {
			this.initHeight();
		},
		methods: {
			initHeight() {
				let systemInfo = uni.getSystemInfoSync();
				const system = systemInfo.platform
				this.statusBarHeight = systemInfo.statusBarHeight;
				console.log(this.statusBarHeight,this.topheight)
				this.topheight += this.statusBarHeight;
			},
			getList(){
				let that = this;
				let data = {
					pageNo:1,
					pageSize:100,
					name:this.value
				}
				return request({
					url:getApp().$api.huanzhe.getDoctorList,
					type:"GET",
					data
				},true,true).then(data=>{
					that.expertList = data.records;
				})
			}
		}
	}
</script>

<style scoped>
	.contentview{
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.header{
		width: 100%;
		background-color: #31D880;
		padding-bottom: 72rpx;
		position: relative;
		
	}
	.contentview .header1{
		position: fixed;
		top:0;
		z-index: 2;
	}
	.header2{
		opacity: 0;
	}
	.header .title{
		padding-top: 22rpx;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 50rpx;
		/* opacity: 0; */
	}
	.header .sousuo{
		position: absolute;
		bottom: 0rpx;
		transform: translateY(50%);
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		margin-left: 30rpx;
	}
	.sousuo image{
		width:26rpx;
		height: 26rpx;
		margin-left: 24rpx;
		margin-right: 16rpx;
	}
	.sousuo input{
		width: 600rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40px;
	}
	.recommended{
		background-color: #FFFFFF;
		/* margin-top: 8rpx; */
		width: 690rpx;
		padding:10rpx 30rpx;
		overflow: hidden;
	}
	.recommendedList{
		padding-top:50rpx;
		padding-bottom: 0;
	}
</style>
