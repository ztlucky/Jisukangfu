<template>
	<view class="view">
		<nav-bar bgColor="#31D880" backState="1000" fontColor="#ffffff" title="学习笔记" type="ordinary">
			<!-- <view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view> -->
		</nav-bar>
		<view class="list" v-if="list.length !=0">
			<view class="item" @click="toPage('/pages/work/notesInfo/notesInfo',v.id)" v-for="(v,k) in list" :key="k">
				<view class="itemLeft"></view>
				<view class="itemRight">
					<view class="rightText hidden">{{v.content}}</view>
					<view class="rightView">
						<!-- <view>100</view> -->
						<image src="../../../static/f_my_kecheng_arrow.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" @click="toPage('/pages/work/addNotes/addNotes')">添加新的笔记</view>
	</view>
</template>

<script>
	import request from '../../../utils/util.js';
	export default {
		data() {
			return {
				isGetMoreList: true,
				isOnLoad: false,
				index: 1,
				size: 10,
				list:[]
			}
		},
		created() {
			this.init();
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
		onPullDownRefresh() {
 			this.index = 1;
			this.list= []
			this.getList();
			
		},
		onShow() {
			this.index = 1;
			this.list= []
			this.getList();
		},
		methods: {
			toPage(url,id) {
				if(url == "/pages/work/notesInfo/notesInfo"){
					url+=`?id=${id}`
				}
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			init() {
			this.getList();
			},
			getList() {
				let that = this;
				if (this.isOnLoad) return false;
				this.isOnLoad = true;
				return request({
					url: that.$api.notes.getList,
					type: "GET",
					data: {
						pageNo: that.index,
						pageSize: that.size,
						userId: getApp().globalData.userId
					}
				},true,true).then(data => {
					uni.stopPullDownRefresh()
					if(data.records.length >= that.size){
						that.isGetMoreList = true;
					}else{
						that.isGetMoreList = false;
					}
					that.list = that.list.concat(data.records);
					that.index++;
					that.isOnLoad = false;
				}).catch(err => {
					that.isOnLoad = false;
					uni.stopPullDownRefresh()
					
				})
			}
		}
	}
</script>

<style scoped>
	.view {
		min-height: 100vh;
		background-color: #f6f6f6;
	}

	.navRight {
		width: 104rpx;
		height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #31D880;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 30rpx;
	}

	.list {
		width: 690rpx;
		margin: 30rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		padding-bottom: 46rpx;
	}

	.list .item {
		height: 102rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding-bottom: 46rpx; */
	}

	.item .itemLeft {
		width: 8rpx;
		height: 8rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 32rpx;
	}

	.item .itemRight {
		display: flex;
		width: 620rpx;
		border-bottom: 2rpx solid #EAEAEA;
		;
	}

	.itemRight {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 102rpx;
	}

	.itemRight .rightText {
		max-width: 500rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.rightView {
		display: flex;
		align-items: center;
	}

	.rightView view {
		margin-right: 32rpx;
	}

	.rightView image {
		width: 24rpx;
		height: 24rpx;
		/* background-color: red; */
		margin-right: 28rpx;
	}

	.bottom {
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF
	}

	.bottomNav {
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		display: flex;
		width: 690rpx;
		/* margin-left: 30rpx; */
		justify-content: space-between;

	}

	.bottomNav>view {
		line-height: 80rpx;
		text-align: center;
	}

	.bottomNav>view:nth-child(1) {
		width: 330rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border: 2rpx solid #E02020;
		font-size: 28rpx;
		color: #E02020;
		background-color: #FFFFFF;
	}

	.bottomNav>view:nth-child(2) {
		width: 330rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}
</style>
