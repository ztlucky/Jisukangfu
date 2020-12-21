<template>
	<view class="courseItem" @click="toPage(info.id)">
		<image mode="aspectFill" :src="info.coverUrl"></image>
		<view class="title hidden2">{{info.name?info.name:'京东卡风急浪大附近的发苏里科夫健身卡索科洛夫将阿凡达索科洛夫将阿说个事各类数据公开了世界观快乐'}}</view>
		<view class="tips">课程</view>
		<view class="price">
			<view>¥{{info.cost}}元/会员价¥{{info.memberCost}}元</view>
			<image v-if="isSelect" class="selectImage" :isSelect="info.isSelect"  :src="info.isSelect == true?'/static/zhibo/icon_xuanzhong.png':'/static/zhibo/icon_weixuanzhong.png'" />
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			info:{
				type:Object
			},
			isSelect:{
				type:Boolean,
				default:false
			},
			index:{
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toPage(id) {
				if(this.isSelect){
					// console.log(this.info.isSelect)
					// this.info.isSelect = this.info.isSelect;
					// console.log(this.info.isSelect)
					this.$emit('setNowItemStatus',{index:this.index});
					this.$forceUpdate()
					return false;
				}
				uni.navigateTo({
					url: "/pages/Daxue/KechengDetail/KechengDetail?id="+id,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>

<style scoped>
	.courseItem{
		position: relative;
		width: 330rpx;
		height: 352rpx;
	}
	.courseItem image{
		width: 330rpx;
		height: 220rpx;
		border-radius: 8rpx;
	}
	.courseItem .title{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}
	.tips{
		position: absolute;
		top:184rpx;
		right: 14rpx;
		background-color: rgba(0,0,0,.4);
		border-radius: 4rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 24rpx;
		padding:0 8rpx;
	}
	.courseItem .price{
		display: flex;
		justify-content: space-between;
		font-size: 18rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF2828;
		line-height: 26rpx;
	}
	.courseItem .selectImage{
		width:24rpx;
		height: 24rpx;
		border-radius: 50%;
	}
</style>
