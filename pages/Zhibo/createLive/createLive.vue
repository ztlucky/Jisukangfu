<template>
	<view class="viewPage">
		<view class="list border">
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">直播标题直播标题直播标题直播标题直播标题直播标题</view>
				</view>
				<view class="itemRight">
					<view class="hidden2">直播标题直播</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_time.png"></image>
					<view class="hidden">直播时间</view>
				</view>
				<view class="itemRight">
					<view class="hidden2">2020-16-21 08:00-09:00</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_fenlei.png"></image>
					<view class="hidden">选择分类</view>
				</view>
				<view class="itemRight">
					<view class="hidden2">心脏病</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="onLoadCover border">
			<image src="../../../static/zhibo/img_fengmian.png"></image>
			<view >上传封面</view>
		</view>
		<view class="course border">
			<view class="top">
				<textarea placeholder="请输入课程的文字内容（选填）…" @input="input"></textarea>
				<view class="topImageList">
					<view v-for="(v,k) in imageList" :key="k" :class="'imageItem '+((k)%3 == 1?'imageItem1':'imageItem')" >
						<image mode="aspectFill" :src="v"></image>
						<image src="/static/icon_delete.png" class="delete" @click="deleteImage(k)"></image>
					</view>
					<image  src="/static/zhibo/img_tupian.png" :class="'imageItem imageAdd '+((imageList.length)%3 == 1?'imageItem1':'imageItem')" @click="getImages"></image>
				</view>
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/zhibo/icon_zhuchiren.png"></image>
					<view class="">选择主持人</view>
				</view>
				<view class="selectedFile">
					<image src="/static/zhibo/img_tianjia.png"></image>
				</view>
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/zhibo/icon_sucai.png"></image>
					<view class="">选择素材（仅限MP4和PDF文件）</view>
				</view>
				<view class="selectedFile">
					<image src="/static/zhibo/img_tianjia.png"></image>
				</view>
			</view>
		</view>
		<view class="price border selectedItem">
			<view class="selectedTitle notBorder">
				<image src="/static/zhibo/icon_jine.png"></image>
				<view class="">金额</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">价格</view>
				<view class="priceItemRight">
					<view>56.00元</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">会员价格</view>
				<view class="priceItemRight">
					<view>56.00元</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="list border">
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">课程可见性</view>
				</view>
				<view class="itemRight">
					<view class="hidden2">全部可见</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_guankan.png"></image>
					<view class="hidden">如何查看</view>
				</view>
				<view class="itemRight">
					<view class="hidden2">无限查看</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="save">提交申请</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				tempFile:[],
				value:''
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
				        that.imageList = that.imageList.concat(res.tempFilePaths);
						that.tempFile = that.tempFile.concat(res.tempFiles)
				    }
				    });
			},
			deleteImage(index){
				this.tempFile.splice(index,1);
				this.imageList.splice(index,1);
			},
			input(e){
				this.value = e.detail.value
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
		width: 280rpx;
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
		display: flex;
		padding-bottom: 34rpx;
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
	.priceItemRight view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34px;
		margin-right: 26rpx;
	}
	.priceItemRight image{
		width:20rpx;
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
</style>
