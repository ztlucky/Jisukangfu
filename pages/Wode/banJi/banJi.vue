<template>
	<view class="viewPage">
		<view class="list">
			<ban-ji v-for="(v,k) in [1,2,3,4,5,6,7,8,9]"></ban-ji>
		</view>
		<view class="save" >新建班级</view>
	</view>
</template>

<script>
	import banJi from "../../../components/banJi/banJi.vue"
	export default {
		data() {
			return {
				
			}
		},
		components:{
				banJi
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.list{
		padding:0 30rpx;
		padding-bottom: 140rpx;
	}
	.save {
		position: fixed;
		bottom: 28rpx;
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
