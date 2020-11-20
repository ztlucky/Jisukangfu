<template>
	<view class="viewPage">
		<view class="content">
			<view class="text">{{info.content}}</view>
			<image mode="aspectFill" :src="v.url" v-for="(v,k) in info.file" :key="k" @click="lookImage(k)"></image>
		</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad(data){
			this.id = data.id?data.id:13;
			this.init();
		},
		methods: {
			init(){
				this.getInfo()
			},
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.notes.getInfo,
					type:"GET",
					data:{
						id:that.id
					}
				},true,true).then(data=>{
					data.file = JSON.parse(data.file);
					that.info = data;
					console.log(data);
				})
			},
			lookImage(k){
				let that = this;
				let urls = [];
				this.info.file.map(v=>{
					urls.push(v.url);
				})
				console.log(urls);
				uni.previewImage({
					urls,
					current:k
				})
			}
		}
	}
</script>

<style scoped>
 .viewPage{
	 width: 100vw;
	 min-height: 100vh;
	 background-color: #F6F6F6;
	 overflow: hidden;
 }
 .content{
	 margin: 30rpx;
	 width: 690rpx;
	 background-color: #FFFFFF;
	 border-radius: 16rpx;
	 padding-bottom: 28rpx;
 }
 .text{
	 padding:30rpx;
	 font-size: 26rpx;
	 font-family: PingFangSC-Regular, PingFang SC;
	 font-weight: 400;
	 color: #666666;
	 line-height: 30rpx;
 }
 image{
	 width: 630rpx;
	 height: 354rpx;
	 margin-bottom: 26rpx;
	 /* background-color: red; */
	 border-radius: 16rpx;
	 margin:30rpx;
	 margin-top: 0;
 }
</style>
