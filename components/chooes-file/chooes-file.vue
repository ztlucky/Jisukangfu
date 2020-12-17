<template>
	<view class="viewPageCom" @click="cancel(false)" v-if="isAllShow" :style="isShow?'background-color: rgba(0,0,0,.4)':'background-color: rgba(0,0,0,.0)'">
		<view class="pageList" :style="isShow?'bottom:0':'bottom:-100vh'" >
			<view class="item" v-if="image" @click.stop="chooesImage">选择图片文件</view>
			<view class="item" v-if="video" @click.stop="chooesVideo">选择视频文件</view>
			<view class="item" v-if="pdf" @click.stop="chooesFile">选择PDF文件</view>
			<view class="item itemCancel" @click="cancel(false)">取消</view>
		</view>
	</view>
</template>

<script>
	import onloadImage from "../../utils/loadImage.js"
	import request from "../../utils/util.js";
	import AndroidChooseFile from "../../utils/androidChooseFile.js"
	export default {
		data() {
			return {
				isRun:false,
				isShow:false,
				isAllShow:false
			};
		},
		props:{
			image:{
				type:Boolean
			},
			video:{
				type:Boolean
			},
			pdf:{
				type:Boolean
			},
			count:{
				type:Number
			}
		},
		methods:{
			cancel(f){
				if(this.isRun) return
				this.isRun = true;
				if(f){
					this.isAllShow = true;
					setTimeout(()=>{
						this.isShow = true;
						setTimeout(()=>{
							this.isRun = false;
						},500)
					},100)
				}else{
				this.isShow = false;
				setTimeout(()=>{
					this.isAllShow = false;
					this.isRun = false;
				},500)
			}
			},
			chooesImage(e){
				let that = this;
				uni.chooseImage({
				    count: that.count,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						that.cancel(false);
						uni.$emit("getImage",{res});
				    }
				    });
			},
			chooesVideo(){
				let that = this;
				console.log("选择视频");
				uni.chooseVideo({
					maxDuration:60,
					count: 1,	
					sourceType: ['album'],
					success:function(res){
						console.log(res);
						console.log('完成')
					that.cancel(false);
					uni.$emit("getVideo",{res});
				},
				complete(data){
					console.log(data);
				}
				})
			},
			chooesFile(){
				let that = this;
				new AndroidChooseFile().init((res)=>{
					console.log(res);
					that.cancel(false);
					uni.$emit("getFile",{res});
				})
			}
		}
	}
</script>

<style scoped>
	.viewPageCom{
		position: fixed;
		z-index: 999;
		top:0;
		left: 0;
		width:100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.4);
		transition:.5s;
		padding-bottom: 0;
	}
	.pageList{
		
		transition:.5s;
		position: absolute;
		left: 0;
		bottom: 0;
		padding:0 30rpx;
		width: 690rpx;
		background-color: #FFFFFF;
	}
	.item{
		line-height: 100rpx;
		text-align: center;
		border-bottom: 2rpx solid #ccc;
	}
	.item:last-child{
		border:none;
	}
	.itemCancel{
		color: #ccc;
	}
</style>
