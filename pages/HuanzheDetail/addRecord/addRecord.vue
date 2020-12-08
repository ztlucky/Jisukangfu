<template>
	<view class="viewPage">
		<view class="viewHeader">
			<yealuo placeholder="请选择标签" checkType="checkbox" @getBackVal1="getBackVal" width="690" :binData="listText" padding="20rpx" :isShowAllBack="true" :selectIco="true"></yealuo>
		</view>
		<input placeholder="请输入内容..." v-model="text" />
		<view class="list">
			<view :class="((k)%3 == 1?'imageItem imageItem1':'imageItem')" v-for="(v,k) in list" :key="k">
				<image class="deleteImage" @click="deleteImage(k)" src="../../../static/close.png"></image>

				<image mode="aspectFill" :src="v" v-if="tempFile[k].type == 'image'" class=""></image>
				<video object-fit="cover" :src="v" v-else class=""></video>
			</view>
			<view :class="'addImage '+((list.length)%3 == 1?'imageItem1':'addImage')" @click="getValue">
				<image src="../../../static/img_icon.png"></image>
			</view>
		</view>
		<view class="save" @click="save()">保存</view>
		<choose ref="chooesFile" :image="isAddImage" :count="count" :video="isAddVideo" :pdf="isAddPDF"></choose>
	</view>
</template>

<script>
	import yealuo from "@/components/yealuo-select/yealuo-select.vue"
	import choose from "@/components/chooes-file/chooes-file.vue";
	import request from "../../../utils/util.js"
	import onloadImage from "../../../utils/loadImage.js"
	export default {
		data() {
			return {
				listText: [],
				list: [],
				tempFile: [],
				isAddImage:true,
				isAddVideo:false,
				isAddPDF:false,
				count:1,
				text:'',
				nowListTextId:0
			}
		},
		onLoad(options) {
			this.illnessId = options.illnessid?options.illnessid:'';
			this.patientId = options.id?options.id:''
			this.addEvent();
			this.getList();
		},
		methods: {
			addEvent(){
				let that = this;
				uni.$on("getImage",res=>{
					that.list = that.list.concat(res.res.tempFilePaths);
					let tempFile = [];
					res.res.tempFiles.map(v=>{
						tempFile.push({
							type:'image',
							value:v
						})
					})
					that.tempFile = that.tempFile.concat(tempFile);
					console.log(that.tempFile);
				})
				uni.$on("getVideo",res=>{
					that.list = that.list.concat(res.res.tempFilePaths);
					let tempFile = [];
					res.res.tempFiles.map(v=>{
						tempFile.push({
							type:'video',
							value:v
						})
					})
					that.tempFile = that.tempFile.concat(tempFile);
				})
				
			},
			getBackVal(e){
				console.log(e);
				if(e.value.length == 0){
					this.nowListTextId = 0
				}else{
					let list = [];
					e.value.map(v=>{
						list.push(v.split("|")[1])
					});
					this.nowListTextId = list.join(",")
				}
				// this.nowListTextId = e.value.split("|")[1]
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getSymptomsList,
					pageNo:1,
					pageSize:200,
					illnessId:that.illnessId
				},true,true).then(data=>{
					let list = data.records;
					let list1 = [];
					list.map(v=>{
						list1.push({
							id:v.id,
							value:v.name
						})
					})
					 that.listText = list1;
					 console.log(that.listText)
				})
			},
			showChoose(){
				this.$refs.chooesFile.cancel(true);
			},
			getValue(){
				this.isAddImage = true;
				this.isAddVideo = true;
				this.isAddPDF = false;
				this.count = 9;
				this.fileType = 'cover';
				this.showChoose();
			},
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
			save(){
				let str = '';
				let that = this;
				if(this.nowListTextId == 0){
					str = '请选择标签'
				}else if(this.text == ''){
					str = '请输入内容'
				}else if(this.list.length == 0){
					str = '请选择文件'
				}
				if(str){
					uni.showToast({
						title:str,
						duration:1500,
						icon:"none"
					});
					return false;
				}
				onloadImage.init({
					tempFiles:that.tempFile,
					tempFilePaths:that.list
				},(data,str)=>{
					console.log(data.imageUrl,str);
					return request({
						url:getApp().$api.huanzhe.addRecord,
						data:{
							userId:getApp().globalData.userId,
							illnessId:that.illnessId,
							file:str,
							patientId:that.patientId,
							symptomIds:that.nowListTextId,
							content:that.text
						},
						type:"POST"
					}).then(data=>{
						uni.showToast({
							title:'保存成功',
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
						console.log(data);
					})
				}).upload();
				
			}
		},
		components: {
			yealuo,
			choose
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
		/* color: #999999; */
		line-height: 50rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		padding-right: 30rpx;
	}
</style>
