<template>
	<view class="viewPage">
		<view class="content">
			<view class="text">{{info.content}}</view>
			<view v-for="(v,index) in info.file">
				<image :src="v.url" v-if="v.type == 'image'"></image>
				<view class="video" v-if="v.type == 'video'">
					<video object-fit="cover"  :src="v.url" :show-center-play-btn="true"></video>
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
				info:{},
				videoIdList:[]
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
					data.file = JSON.parse(data.file);
					if(data.file.length >=1){
						let ids= [];
						data.file.map((v,k)=>{
							if(v.type == 'video'){
								that.videoIdList.push({
									index:k,
									id:v.url
								});
								ids.push(v.url);
							}
						});
						that.getVideoUrl(ids,data);
					}else{
						that.info = data;
					}
					
				})
			},
			getVideoUrl(v_ids,data_){
				if(v_ids.length == 0)return this.info = data_;
				let that = this;
				return request({
					url: getApp().$api.oss.getVideoUrl,
					data: {
						v_ids
					},
					type: "POST"
				}, false, true).then(data => {
					console.log(data);
					that.videoFile = [];
					data.map((v, k) => {
						data_.file[that.videoIdList[k].index].url = v[0].url;
					});
					that.$forceUpdate();
					that.info = data_;
					console.log(that.info)
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
