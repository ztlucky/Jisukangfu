<template>
	<view class="viewPage">
		<view class="viewHeader">
			<yealuo placeholder="请选择标签" width="690" :binData="listText" padding="20rpx" :isShowAllBack="true" :selectIco="true"></yealuo>
		</view>
		<input placeholder="请输入内容..." />
		<view class="list">
			<view :class="((k)%3 == 1?'imageItem imageItem1':'imageItem')" v-for="(v,k) in list" :key="k">
				<image class="deleteImage" @click="deleteImage(k)" src="../../../static/close.png"></image>

				<image mode="aspectFill" :src="v.value" v-if="v.type == 'image'" class=""></image>
				<video object-fit="cover" :src="v.value" v-else class=""></video>
			</view>
			<view :class="'addImage '+((list.length)%3 == 1?'imageItem1':'addImage')" @click="selectedFile">
				<image src=""></image>
			</view>
		</view>
		<view class="save">保存</view>
	</view>
</template>

<script>
	import yealuo from "@/components/yealuo-select/yealuo-select.vue"
	export default {
		data() {
			return {
				listText: [{
					value: 1,
					id: 2
				}],
				list: [],
				tempFile: []
			}
		},
		methods: {
			getImages() {
				let that = this;
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						let list = [];
						res.tempFilePaths.map((v, k) => {
							list.push({
								type: "image",
								value: v
							})
						})
						that.list = that.list.concat(list);
						that.tempFile = that.tempFile.concat(res.tempFiles)
					}
				});
			},
			deleteImage(index) {
				this.tempFile.splice(index, 1);
				this.list.splice(index, 1);
			},
			selectedFile() {
				let that = this;
				uni.showActionSheet({
					title: "选择上传类型",
					itemList: ['图片', '视频'],
					success: (res) => {
						console.log(res)
						if (res.tapIndex == 0) {
							that.getImages()
						} else {
							that.getVideo();
						}
					}
				})
			},
			getVideo() {
				let that = this;
				uni.chooseVideo({
					success: function(res) {
						console.log(res);
						let list = [];
						list.push({
							type: "video",
							value: res.tempFilePath
						})
						that.list = that.list.concat(list);
						that.tempFile = that.tempFile.concat([res.tempFile])
					}
				})
			}
		},
		components: {
			yealuo
		}
	}
</script>

<style scoped>
	.viewHeader {
		width: 690rpx;
		padding: 30rpx;
		border-bottom: 2rpx solid #E9E9E9;
	}

	.list {
		width: 690rpx;
		display: flex;
		flex-wrap: wrap;
		margin-left: 30rpx;
		/* margin-top:26rpx; */
		padding-bottom: 56rpx;
	}

	.addImage,
	.imageItem {
		width: 210rpx;
		height: 210rpx;
		position: relative;
		margin: 30rpx 0;
		margin-bottom: 0rpx;
	}

	.addImage {
		background-color: #effff6;
		border: 2rpx solid #78F4B3;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8rpx;
	}

	.addImage image {
		width: 50rpx;
		height: 44rpx;
		background-color: red;
	}

	.imageItem>image:nth-child(2) {
		width: 210rpx;
		height: 210rpx;
		object-fit: cover;
		/* background-color: red; */
	}

	.imageItem>video {
		width: 210rpx;
		height: 210rpx;
	}

	.imageItem1 {
		margin: 30rpx;
		margin-bottom: 0rpx;
	}

	.imageItem .deleteImage {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		z-index: 2;
		right: 8rpx;
		top: 8rpx;
	}

	.save {
		position: fixed;
		bottom: 68rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;

		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}

	input {
		margin-top: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 50rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
	}
</style>
