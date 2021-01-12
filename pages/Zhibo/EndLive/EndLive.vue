<template>
	<view class="contentview">
		<image src="../../../static/zhibo/bg_end.png" mode="" class="bgimageview" 
		:style="{'height':windowHeight+'px'}" style="width: 100%;">
 		</image>
		<image v-if="userIcon.length == 0" src="../../../static/wodehuanzhe/img_touxiang.png" mode="" class="headIcon"></image>
		<image v-if="userIcon.length != 0" :src="userIcon" mode="" class="headIcon"></image>
		
		<text class="nametext">{{username}}</text>
		<text class="endtext">直播已结束</text>
		<text class="timetext">直播时长: {{timeTotal}}</text>
		
		<uni-grid :column="3" class="tongjiview" :square="false" :showBorder="false"  :highlight="false">
			<uni-grid-item v-for="(item ,index) in tongjititle" :key="index" :index="index">
		
				<view class="tongjiItem">
					<view class="tongjiitemleft">
						<text class="number" v-if="index == 0">{{buyCount}}</text>
						<text class="number" v-if="index == 1">{{seeTotal}}</text>
						<text class="number" v-if="index == 2">{{newFans}}</text>
						
 						<text class="title">{{item}}</text>
						
					</view>
				
		<view class="line" v-if="index != 2">
			
		</view>
				</view>
		
			</uni-grid-item>
		</uni-grid>
		<text class="returnview" @click="returnAction">返回</text>
 	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components:{
			uniGrid,
			uniGridItem,
			
		},
		data() {
			 
			return {
				result:{},
				seeTotal:0,
				username:'',
				userIcon:'',
				newFans:10,
				timeTotal:10,
				tongjititle:["购买人数","观看人次","新增粉丝"],
				buyCount:0
				
			}
		},
		onResize() {
			console.log("fffff")
			uni.getSystemInfo({
			    success: function (res) {
			   if (res.windowWidth > res.windowHeight) {  
			                           console.log('横屏');  
			                       } else {  
			                           console.log('竖屏');  
			                       }  
			    }
			});
		},
		onLoad(option) {
			// #ifdef APP-PLUS
				   plus.screen.lockOrientation('portrait-primary');
				// #endif
			this.username = uni.getStorageSync("name")
			this.userIcon = uni.getStorageSync("headurl")
			console.log(this.userIcon)
			this.windowHeight = this.$app.getwindowHeight()
		if (option.item != null) {
 		
			let objClone = JSON.parse(decodeURIComponent(option.item))
			console.log(objClone)
			 this.result = objClone
			 this.newFans = objClone.newFans
			 this.seeTotal = objClone.seeTotal
			 this.timeTotal = objClone.time
			 this.buyCount = objClone.buyCount
		}	
		},
		methods: {
			returnAction(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss">
.contentview{
	display: flex;
	flex-direction: column;
	position: relative;
	align-items: center;
	.headIcon{
		width: 148rpx;
		height: 148rpx;
		border-radius: 74rpx;
		margin-top: 200rpx;
	}
	.nametext {
 		 
 		 font-size: 28rpx;
 		 font-family: PingFangSC-Regular, PingFang SC;
 		 font-weight: 400;
 		 color: #FFFFFF; 
		 margin-top: 12rpx;
 	}
	.endtext{
		
		font-size: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-top: 30rpx;
		
	}
	.timetext{
		
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-top: 16rpx;
	}
	.bgimageview{
		position: absolute;
		width: 100%;
 		top: 0;
		left: 0;
		z-index: -110;
 	}
	.tongjiview{
		width: 100%;
		margin-top:60rpx ;
		.tongjiItem{
			display: flex;
			flex-direction: row;
			.tongjiitemleft{
				display: flex;
				flex-direction: column;
				width: 100%;
 				align-items: center;
				.number{
					
					font-size: 36rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				.title{
					
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top:16rpx ;
				}
			}
			.line{
				width: 2rpx;
				background-color: #f0f0f0;
				position: absolute;
				right: 0;
				height: 98rpx;
			}
		}
	}
	.returnview{
		width: 498rpx;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 44rpx;
		
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 88rpx;
		text-align: center;
		margin-top:150rpx ;
	}
	
}
</style>
