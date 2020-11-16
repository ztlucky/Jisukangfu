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
					title:"评定量表",
					subtitle:"选择创建的题库打造合适的评定量表",
					image:'../../../static/gongzuotai/icon_pingdingliangbiao.png'
				},
				{
					title:"疾病诊断、症状表现、一键比较",
					subtitle:"创建常见的疾病诊状",
					image:'../../../static/gongzuotai/icon_jibingzhenduan.png'
				},
				{
					title:"治疗项目",
					subtitle:"创建常用的疾病治疗项目",
					image:'../../../static/gongzuotai/icon_zhiliaoxiangmu.png'
				}
				
				]
			}
		},
		methods: {
				
			jumpNext(k){
					
				if(k==0){
					uni.navigateTo({
						url:'../pingDingLiangBiao/pingDingLiangBiao',
						animationDuration:300,
						animationType:'slide-in-right'
					})
					
				}else if(k == 1){
					uni.navigateTo({
						url:'../pingDingLiangBiaoType/pingDingLiangBiaoType',
						animationDuration:300,
						animationType:'slide-in-right'
					})
				}else{
					uni.navigateTo({
						url:'/pages/work/xiangMu/xiangMu',
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
