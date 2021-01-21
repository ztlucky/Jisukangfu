<template>
	<view class="viewPage">
		<view class="selectedItem">
			<view class="selectedTitle">
				<!-- <image src="/static/zhibo/icon_sucai.png"></image> -->
				<view class="">选择资质证书</view>
			</view>
			<view class="selectedFile">
				<view  v-for="(item,index) in qualification" @click="lookFileInfo('资质证书','qualification',index)" :key= "index" class="hostview">
					 <image  src="/static/icon_wenjian@2x.png"></image>
					<view class="fileName hidden">{{item.name}}</view>
				</view>
				<image class="addFile" src="/static/zhibo/img_tianjia.png" @click="addFile('qualification')"></image>
				<view style="width:20rpx;height: 10rpx;"></view>
			</view>
		</view>
		<view class="selectedItem">
			<view class="selectedTitle">
				<!-- <image src="/static/zhibo/icon_sucai.png"></image> -->
				<view class="">选择工作证书</view>
			</view>
			<view class="selectedFile">
				<view  v-for="(item,index) in work" @click="lookFileInfo('工作证书','work',index)" :key= "index" class="hostview">
					 <image  src="/static/icon_wenjian@2x.png"></image>
					<view class="fileName hidden">{{item.name}}</view>
				</view>
				<image class="addFile" src="/static/zhibo/img_tianjia.png" @click="addFile('work')"></image>
				<view style="width:20rpx;height: 10rpx;"></view>
			</view>
		</view>
		<view class="save" @click="save()">保存</view>	
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
    import onloadImage from "../../../utils/loadImage.js"
 import request from '../../../utils/util.js'
 import choose from "../../../utils/androidChooseFile.js";
 
	export default {
		data() {
			return {
				work:[],
				qualification:[]
				
			}
		},
		onShow() {
			 
			 
 		},
		onLoad() {
			let list = uni.getStorageSync('uploadCertificate');
			if(list){
				this.work = list.work;
				this.qualification = list.qualification;
			}
		},
		onUnload(){
			//uni.$off();
		},
		methods: {
			lookFileInfo(type,str,index){
				let content = '';
				let that = this;
				content = this[str][index].name
				uni.showModal({
					title:type,
					content:`当前操作的文件为 ${content}`,
					confirmText:'删除文件',
					cancelText:'取消操作',
					success(res) {
						if(res.confirm){
							console.log(str)
							console.log(that[str]);
							
							that[str].splice(index,1);
						}
					}
				})
			},
			//上传图片
			uploadCover(){
 				
			},
			addFile(str){
				let that = this;
				new choose().init((data)=>{
					that[str].push(data);
				});
			},
			save(){
				uni.setStorageSync('uploadCertificate',{
					work:this.work,
					qualification:this.qualification
				});
				uni.navigateBack();
			}
			
			
		}
	}
</script>

<style scoped>
	.viewPage{
		width: 750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding-bottom: 174rpx;
	}
	.border{
		margin-top:30rpx;
	}
	.list{
		width: 750rpx;
		background-color: #FFFFFF;
	}
	.item{
		width:720rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		border-bottom: 4rpx solid #F0F0F0;
	}
	.list .item:last-child{
		border:none
	}
	.item .itemLeft{
		display: flex;
		align-items: center;
	}
	.itemLeft image{
		width:40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.item .itemLeft view{
		width: 160rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28rpx;
	}
	 
	.itemRight{
		display: flex;
		align-items: center;
		 
	}
	 
	.input{
		width:400rpx ;
		text-align: right;
 		font-size:26rpx;
 		/* margin-right: 40rpx; */
		text-align: right;
 	}
	.itemRight view{
		width:300rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
		text-align: right;
	}
	.itemRight image{
		width:16rpx;
		height: 30rpx;
		margin-right: 30rpx;
		margin-left: 24rpx;
	}
	.onLoadCover{
		width: 750rpx;
		height: 186rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
	}
	.onLoadCover image{
		width:126rpx;
		height: 126rpx;
		padding-left: 30rpx;
		padding-right: 22rpx;
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
		/* background-color: red; */
		
		background: #F5F5F5;
		border-radius: 8rpx;
		border: 2rpx dashed #DEDEDE;
	}
	.imageAdd image:nth-child(1){
		width:50rpx;
		height: 50rpx;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.imageItem .delete{
		width:28rpx;
		height: 28rpx;
		position: absolute;
		top:8rpx;
		right: 8rpx;
		/* background-color: #007AFF; */
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
	.selectedItem{
		width:720rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
	}
	.selectedTitle{
		border-top:2rpx solid #F0F0F0;
		display: flex;
		height: 98rpx;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.selectedTitle image{
		width:40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.selectedFile{
		width:710rpx;
		display: flex;
		padding-bottom: 34rpx;
		overflow-x: scroll;
	}
	.selectedFile >image , .selectedFile >view{
		flex-shrink: 0;
	}
	.addFile{
		/* padding-right: 40rpx; */
	}
	.fileName{
		max-width: 150rpx;
	}
	.hostview{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 10rpx;
	}
	.hostview image{
		width:88rpx;
		height: 88rpx;
		border-radius: 50%;
		
		
	} 
	.hostview text ,.hostview view{
		 font-size: 20rpx;
		 margin-top: 10rpx;
		 color: #000000;
		
	} 
	.selectedFile image{
		width:88rpx;
		height: 88rpx;
		border-radius: 50%;
	}
	.notBorder{
		border: none;
	}
	.priceItem{
		width:690rpx;
		padding-right: 30rpx;
		display: flex;
		height: 54rpx;
		justify-content: space-between;
		align-items: center;
	}
	.priceItemLeft{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
	}
	.priceItemRight{
		display: flex;
		align-items: center;
	}
	.priceItemInput{
		text-align: right;
		font-size: 24rpx;
		margin-right: 30rpx;
 	}
	.priceItemRight view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34px;
		margin-right: 26rpx;
	}
	.priceItemRight image{
		width:16rpx;
		height: 30rpx;
 	}
	.save {
		position: fixed;
		bottom: 38rpx;
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
	.border_{
		border-bottom:2rpx solid #F0F0F0;
	}
</style>
