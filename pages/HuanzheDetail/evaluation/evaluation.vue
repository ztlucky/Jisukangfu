<template>
	<view class="viewPage">
		<view class="content">
			<view class="itemView" >
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">结果</text>
				</view>
				<view v-for="(v,k) in info.selectedProblemList" :key="k">
					<view class="problem" v-if="v.content.type == 1|| v.content.type == 2">
						<text class="title">问题</text>
						<view class="text text_">{{v.content.title}}</view>
						<image class="image" mode="aspectFill" :src="item" v-for="(item,index) in v.content.file" :key="index"></image>
						<view class="title">选项</view>
						<view class="options">
							<view v-for="(vv,kk) in v.content.content" :key="kk">
								<view class="optionsItem" v-if="vv.isSelected">
									<view class="dot"></view>
									<view class="optionsText">{{vv.title}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="problem" v-if="v.content.type == 3" style="padding-bottom: 40rpx;">
						<text class="title">问题</text>
						<view class="text text_">{{v.content.title}}</view>
						<view class="text">{{v.content.content}}</view>
					</view>
				</view>
			</view>
			
			<view class="itemView" >
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">注意问题</text>
				</view>
				<view class="problem problem1" v-for="(v,k) in info.selectedList" :key="k">
					<text class="title">问题{{k+1}}</text>
					<view class="text" v-for="(vv,kk) in v">{{vv.text}}</view>
					
				</view>
			</view>
			<view class="itemView" >
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">治疗方案</text>
				</view>
				<view class="problem problem1" v-for="(v,k) in info.selectedList1" :key="k">
					<text class="title">问题{{k+1}}</text>
					<view class="text" v-for="(vv,kk) in v">{{vv.text}}</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/util.js'
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad(options) {
			this.id = options.assessid?options.assessid:0;
			this.getInit();
		},
		methods: {
			getInit(){
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.getResult,
					type:"GET",
					data:{
						id:that.id
					}
				},true,true).then(data=>{
					data = JSON.parse(data.result);
					data.selectedProblemList.map((v,k)=>{
						data.selectedProblemList[k].content = JSON.parse(data.selectedProblemList[k].content);
					})
					this.info = data;
					console.log(data)
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
	}
	.content{
		width:690rpx;
		margin:30rpx
	}
	.itemView{
		width:690rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		/*display: flex; 
		flex-direction: column; */
	}
	.titleView{
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.titleView image{
		width:26rpx;
		height: 30rpx;
		margin-left: 40rpx;
		margin-right:16rpx;
	}
	.titleView view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.title{
		display: inline-block;
		padding:0 22rpx;
		height: 36rpx;
		border-radius: 8rpx;
		background-color: #31D880;
		text-align: center;
		line-height: 36rpx;
		margin:30rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.text{
		width:630rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.image{
		margin: 10rpx 30rpx;
		width:468rpx;
		height: 222rpx;
		background-color: red;
		margin-right: 150rpx;
	}
	.optionsItem{
		height: 40rpx;
		display: flex;
		align-items: center;
	}
	.optionsItem .dot{
		width:10rpx;
		height:10rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 50rpx;
	}
	.optionsItem .optionsText{
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.options{
		padding-bottom: 42rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.problem:last-child .options{
		border:none;
	}
	.problem1{
		border-bottom: 2rpx solid #EAEAEA;
		padding-bottom: 40rpx;
	}
	.itemView .problem1:last-child{
		border: none;
	}
	.text_{
		font-weight: 600;
	}
</style>
