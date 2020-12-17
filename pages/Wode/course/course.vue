<template>
	<view class="viewPage">
		<view class="list">
			<view class="item" v-for="(v,k) in list">
				<course :info="v"  ></course>
			</view>
		</view>
		<view class="save" @click="toPage('/pages/Wode/createCourse/createCourse')">新建课程</view>
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
				list:[]
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
		components:{
				course
		},
		methods: {
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
						pageSize:that.size
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
	.list{
		width:720rpx;
		padding:30rpx;
		padding-right: 0;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 140rpx;
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
