<template>
	<view class="viewPage">
		<view class="list">
			<view class="item" v-for="(v,k) in [1,2,3,4,5,6,7,8,9]">
				<course ></course>
			</view>
		</view>
		<view class="save" @click="toPage('/pages/Wode/createCourse/createCourse')">新建课程</view>
	</view>
</template>

<script>
	import course from "../../../components/course/course.vue"
	export default {
		data() {
			return {
				
			}
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
