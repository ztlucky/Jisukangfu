<template>
	<view class="view">
		<view class="top">
			<textarea placeholder="输入创建的问题的描述"></textarea>
			<view class="topImageList">
				<view v-for="(v,k) in imageList" :key="k" :class="'imageItem '+((k)%3 == 1?'imageItem1':'imageItem')" >
					<image :src="v"></image>
					<image src="" class="delete" @click="deleteImage(k)"></image>
				</view>
				<view :class="'imageItem imageAdd '+((imageList.length)%3 == 1?'imageItem1':'imageItem')" @click="getImages">
					<image src=""></image>
				</view>
			</view>
		</view>
		<view class="textView">
			<view class="title">问题解释</view>
			<input />
			<view class="title">问题诊断</view>
			<textarea></textarea>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				tempFile:[]
			}
		},
		methods: {
			getImages(){
				let that = this;
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						console.log(res);
				        // 预览图片
						console.log(res.tempFilePaths);
				        that.imageList = that.imageList.concat(res.tempFilePaths);
						console.log(that.imageList)
						that.tempFile = that.tempFile.concat(res.tempFiles)
				    }
				    });
			},
			deleteImage(index){
				console.log(index);
				this.tempFile.splice(index,1);
				this.imageList.splice(index,1);
			}
		}
	}
</script>

<style scoped>
	.view{
		width:750rpx;
		min-height: 100vh;
		background-color: #f6f6f6;
	}
	.top{
		width:690rpx;
		padding:34rpx 30rpx;
		background-color: #FFFFFF;
		padding-bottom: 4rpx;
	}
	.topImageList{
		
		display: flex;
		flex-wrap: wrap;
	}
	.top textarea{
		height: 100rpx;
		margin-bottom: 20rpx;
		font-size:28rpx;
	}
	.imageItem{
		position: relative;
		width:184rpx;
		height: 184rpx;
		margin-bottom: 30rpx;
	}
	.imageItem1{
		margin:30rpx;
		margin-top: 0rpx;
	}
	.imageItem image:nth-child(1){
		position: absolute;
		top:0;
		left: 0;
		width:184rpx;
		height: 184rpx;
	}
	.imageAdd{
		background-color: red;
	}
	.imageItem .delete{
		width:28rpx;
		height: 28rpx;
		position: absolute;
		top:8rpx;
		right: 8rpx;
		background-color: #007AFF;
		border-radius: 50%;	
	}
	.textView{
		width:690rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
		margin-top:30rpx;
		padding-bottom: 30rpx;
	}
	.title{
		color:#999999;
		font-size:28rpx;
		padding-top:24rpx;
	}
	.textView input{
		font-size:28rpx;
		color:#333333;
		line-height: 60rpx;
		height: 60rpx;
		/* padding: 0 20rpx; */
	}
	.textView view:nth-child(3){
		padding-top:38rpx;
		border-top:2rpx solid #E5E5E5;
	}
	.textView textarea{
	height: 80rpx;
	font-size:28rpx;
	width:100%;
	border-bottom: 2rpx solid #E5E5E5;
	}
</style>
