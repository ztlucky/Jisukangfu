<template>
	<view class="viewPage">
		<view class="list" v-if="list.length >=1">
			<view class="item" @click="toPage('/pages/HuanzheDetail/recordInfo/recordInfo?recordid='+v.id)"  v-for="(v,k) in list" :key="k">
				<view class="itemLeft"></view>
				<view class="itemRight">
					<view class="text">
						<view class="title hidden">{{v.content}}</view>
						<view class="time">{{v.createTime}}</view>
					</view>
					<image src="../../../static/f_my_kecheng_arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="save" @click="toPage('/pages/HuanzheDetail/addRecord/addRecord?illnessid='+illnessId+'&id='+id)">添加记录</view>
	</view>
</template>

<script>
	import request from '../../../utils/util.js'
	import tool from "../../../utils/tool.js"
	export default {
		data() {
			return {
				pageNo:1,
				pageSize:20,
				list:[],
				isGetMoreList:true
			}
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			if (this.isGetMoreList) {
				this.getList();
			} else {
				uni.showToast({
					title: "暂无更多数据",
					duration: 1500,
					icon:"none"
				})
			}
		},
		onShow() {
			this.getList(true);
		},
		onLoad(options) {
			this.illnessId = options.illnessid?options.illnessid:0;
			this.id = options.id?options.id:0;
		},
		methods: {
			getList(f = false){
				if(f){
					this.pageNo = 1;
					this.list = [];
					this.isGetMoreList = true;
				}
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getRecordList,
					type:"GET",
					data:{
						pageNo:that.pageNo,
						pageSize:that.pageSize,
						patientId:that.id,
						illnessId:that.illnessId
					}
				},true,true).then(data=>{
					if(data.records.length>=that.size){
						that.isGetMoreList = true
					}else{
						that.isGetMoreList = false
					}
					if(data.records.length >=1){
						data.records.map((v,k)=>{
							data.records[k].createTime = new tool().formDate(new Date(data.records[k].createTime),'yy:mm:dd hh:qq')
						})
					}
					that.list = that.list.concat(data.records);
					that.index++;
				})
			},
			toPage(url) {
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
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
		padding-bottom: 180rpx;
		overflow: hidden;
	}
	.list{
		width:690rpx;
		margin: 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding-bottom: 36rpx;
	}
	.item{
		width:630rpx;
		padding:0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* height: 118rpx; */
		overflow: hidden;
	}
	.item .itemLeft{
		width:8rpx;
		height: 8rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.itemRight{
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.itemRight image{
		width:32rpx;
		height: 32rpx;
	}
	.title{
		width: 540rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
		padding-top:40rpx;
	}
	.time{
		padding-bottom: 20rpx;
		margin-top:8rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 32rpx;
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
</style>
