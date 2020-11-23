<template>
	<view class="view">
		<view class="navList">
			<view class="item" v-for="(i,k) in list" :key="k" @click="jumpNext(k)">
				<view class="itemLeft">
					<view class="title">{{i.title}}</view>
					<view class="text hidden">{{i.subtitle}}</view>
				</view>
				<image  :src="i.image" class="itemRight"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					title:"单选题",
					subtitle:"创建评定量表的单选题",
					image:'../../../static/gongzuotai/icon_pingdingliangbiao.png'
				},
				{
					title:"多选题",
					subtitle:"创建评定量表的多选题",
					image:'../../../static/gongzuotai/icon_jibingzhenduan.png'
				},
				{
					title:"说明题",
					subtitle:"创建评定量表的说明题",
					image:'../../../static/gongzuotai/icon_zhiliaoxiangmu.png'
				}
				
				]
			}
		},
		methods: {
				
			jumpNext(k){
					
				if(k==0){
					uni.redirectTo({
						url:'/pages/work/createProblem/createProblem?index=1',
						animationDuration:300,
						animationType:'slide-in-right'
					})
					
				}else if(k == 1){
					uni.redirectTo({
						url:'/pages/work/createProblem/createProblem?index=2',
						animationDuration:300,
						animationType:'slide-in-right'
					})
				}else{
					uni.redirectTo({
						url:'/pages/work/createProblem/createProblem?index=3',
						animationDuration:300,
						animationType:'slide-in-right'
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	
	.view{
		background-color: #f6f6f6;
		min-height: 100vh;
	}
	.navList{
		width:690rpx;
		padding:30rpx;
	}
	.navList .item{
		width:610rpx;
		height: 92rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:44rpx 40rpx;
		border-radius: 8rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}
	.item .itemLeft .title{
		font-size: 32rpx;
		color:#333333;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
	.item .itemLeft .text{
		max-width: 400rpx;
		font-size:24rpx;
		margin-top: 14rpx;
	}
	.item .itemRight{
		width:80rpx;
		height: 80rpx;
 	}
</style>
