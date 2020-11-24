<template>
	<view class="viewPage">
		<view class="header">
			<view>心脏病</view>
			<view>心脏病心脏病</view>
			<view>心脏</view>
			<view>心脏病心脏病</view>
			<view>心脏病</view>
			<view class="view">心脏病心脏病</view>
			<view>心脏</view>
			<view>心脏病心脏病</view>
		</view>
		<view class="list">
			<expert :isshow="(k == expertList.length-1)" v-for="(v,k) in expertList" :key="k"></expert>
		</view>
	</view>
</template>

<script>
	import expert from "../../../components/experts/experts.vue"
	export default {
		components:{
			expert
		},
		data() {
			return {
				expertList:[1,2,3,4,5,6,7,8,9]
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init(){
				this.getNavHdight();
			},
			getNavHdight(){
				
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width: 750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.list{
		width:690rpx;
		padding:30rpx;
		background-color: #FFFFFF;
		
	}
	.header{
		/* position: fixed;
		top:0;
		left: 0;
		z-index: 2; */
		background-color: #FFFFFF;
		width:690rpx;
		padding:30rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 0;
	}
	.header view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		margin-bottom: 16rpx;
		margin-right: 30rpx;
	}
	.header .view{
		color:#31D880;
	}
</style>
