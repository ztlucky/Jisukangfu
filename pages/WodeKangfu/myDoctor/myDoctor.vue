<template>
	<view class="viewPage">
		<view class="list">
			<expert :isshow="(k == expertList.length-1)" v-for="(v,k) in expertList" :key="k"></expert>
		</view>
	</view>
</template>

<script>
	import expert from "../../../components/experts/experts.vue"
	import request from "../../../utils/util.js"
	export default {
		components:{
			expert
		},
		data() {
			return {
				expertList:[],
				index:1,
				size:10,
				isGetMoreDataList:true
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync('phone');
			if(this.phone){
				this.init();
			}
			
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
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
		methods: {
			init(){
				this.getList();
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getDoctorList,
					type:"GET",
					data:{
						pageNo:that.index,
						pageSize:that.size,
						phone:that.phone
					}
				},true,true).then(data=>{
					if(data.records && data.records.length>=that.size){
						that.isGetMoreDataList = true;
					}else{
						that.isGetMoreDataList = false;
					}
					that.expertList = that.expertList.concat(data.records);
					that.index++;
				})
			}
		}
	}
</script>

<style scoped>
	.list{
		width:690rpx;
		padding:30rpx;
	}
</style>
