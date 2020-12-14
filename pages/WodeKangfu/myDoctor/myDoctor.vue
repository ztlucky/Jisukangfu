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
				expertList:[1,2,3,4,5,6,7,8,9],
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
				}).then(data=>{
					console.log(data);
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
