<template>
	<view class="viewPage">
		<view class="headerNav" v-if="type == 2">
			<view :class="nowIndex == 0?'navItem':'navItem navItem1'" @click="setNowStatus(0)">
				<view class="text">已购买</view>
				<view class="border"></view>
			</view>
			<view :class="nowIndex == 1?'navItem':'navItem navItem1'" @click="setNowStatus(1)">
				<view class="text">收藏</view>
				<view class="border"></view>
			</view>
		</view>
		<view class="list" v-if="list.length >=1">
			<view class="item" v-for="(v,k) in list">
				<course :info="v"  ></course>
			</view>
		</view>
		<view class="save" v-if="type == 1" @click="toPage('/pages/Wode/createCourse/createCourse')">新建课程</view>
	</view>
</template>

<script>
	import course from "../../../components/course/course.vue";
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				index:1,
				size:20,
				isGetMoreDataList:true,
				list:[],
				type:2,
				nowIndex:0,
			}
		},
		onReachBottom() {
			if (this.isGetMoreDataList) {
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
			if(options.type == 1){
				this.type = options.type?options.type:2;
			}
		},
		components:{
				course
		},
		methods: {
			setNowStatus(index){
				if(index == this.nowIndex) return false;
				this.nowIndex = index;
				this.getList(true);
			},
			toPage(url){
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})	
			},
			getList(f = false){
				if(f){
					this.index = 1;
					this.list = [];
					this.isGetMoreData = true;
				}
				let that = this;
				return request({
					url:getApp().$api.course.getList,
					type:"GET",
					data:{
						pageNo:that.index,
						pageSize:that.size,
						condition1:this.type == 2 && that.nowIndex == 0,
						condition2:this.type == 2 && that.nowIndex == 1,
						column:'createTime',
						order:'desc'
					}
				},true,true).then(data=>{
					console.log(data.records);
					if (data.records.length >= that.size) {
						this.isGetMoreDataList = true;
					} else {
						this.isGetMoreDataList = false;
					}
					that.list = that.list.concat(data.records);
					that.page++;
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
	}
	.headerNav{
		width: 100%;
		display: flex;
		width:690rpx;
		height: 80rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
	}
	.navItem{
		width:100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 40rpx;
	}
	.text{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}
	.border{
		margin-top: 6rpx;
		width: 32rpx;
		height: 4rpx;
		background-color: #31D880;
		border-radius: 4rpx;
	}
	.navItem1 .text{
		color:#999999;
	}
	.navItem1 .border{
		background-color: #FFFFFF;
	}
	.list{
		width:720rpx;
		padding:30rpx;
		padding-right: 0;
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		padding-bottom: 40rpx;
	}
	.item{
		margin-right: 30rpx;
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
