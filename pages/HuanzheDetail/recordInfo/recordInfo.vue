<template>
	<view class="viewPage">
		<view class="content">
			<view class="text">{{info.content}}</view>
			<view v-for="(v,index) in info.file">
				<image :src="v.url" v-if="v.type == 'image'"></image>
				<view class="video" v-if="v.type == 'video'">
					<video object-fit="cover" poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605501411332&di=6e6844ccb5e722e457c8c7ae5f3cb10d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg" src="" :show-center-play-btn="true"></video>
				</view>
			</view>
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
		onLoad(options) {
			this.id = options.recordid?options.recordid:0;
			this.getInfo();
		},
		methods: {
			getInfo(){
				let that = this;
				return request({
					type:"GET",
					url:getApp().$api.huanzhe.getRecordInfo,
					data:{
						id:that.id
					}
				},true,true).then(data=>{
					data.file = JSON.parse(data.file)
					that.info = data;
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
 image , .video ,video{
	 width: 630rpx;
	 height: 354rpx;
	 margin-bottom: 26rpx;
	 /* background-color: red; */
	 border-radius: 16rpx;
	 margin:30rpx;
	 margin-top: 0;
	 overflow: hidden;
 }
 video{
	 margin: 0;
 }
</style>
