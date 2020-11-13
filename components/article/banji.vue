<template>
	<view class="list" v-if="list.length > 0">
		<navigator :url="'/pages/Daxue/BanjiDetail/BanjiDetail?id=' + item.id" class="item" v-for="(item, index) in list" :key="index" hover-class="none">
	 <view  class="topview">
		 <view class="imageview">
		 	<image class="newimage" :src="item.coverurl"  ></image>
		 	<text class="liveview">班级</text>
		 </view>
		
 				 <view class="newrightText">
					 <view class="newtitle">{{ item.name }}</view> 
					 	<view class="newSubtitle">{{item.presentation}} </view>
					<text class="price">¥{{item.joincost}}元</text>
					<view class="bottomview">
					<text class="newpeopleCount">{{item.num }}人观看</text>
						<text class="lessonCount">共15节课</text>
						
					</view>
					  
				 </view>
				 </view>
 				 	
					<!-- <view class="other">
						<view class="left">
							<view class="source" v-if="item.source">{{ item.source }}</view>
							<view class="time">{{ item.create_time }}</view>
						</view>
						<view class="right" v-if="item.comment_count > 0">
							<image src="/static/images/icon_comment.png"></image>
							<text>{{ item.comment_count }}</text>
						</view>
						<view class="right view" v-else>
							<image src="/static/images/icon_view.png"></image>
							<text>{{ item.read }}</text>
						</view>
					</view> -->
 				
	 
 		</navigator>
	</view>
</template>

<script>
export default {
	name: 'banjiList',
	props: {
		list: {
			type: Array,
			default: function(e) {
				return [];
			}
		}
	}
};
</script>

<style lang="scss">
/*文章列表*/

.list {
	margin-top: 2rpx;
	.item {
		width: 100%;
 		display: flex;
		flex-direction: column;
			margin-left: 30upx;
			margin-top: 20upx;
		.topview{
			display: flex;
			flex-direction: row;
				
			.imageview{
				height: 240rpx;
				width: 160rpx;
				position: relative;
				.newimage{
						height: 240rpx;
						width: 160rpx;
						border-radius: 16rpx;
  						
					}
					.liveview{
						position: absolute;
						font-size: 18rpx;
						 width: 46rpx;
						 height: 24rpx;
						 line-height: 24rpx;
  						border-radius:8upx;
						background-color: #777;
						color: #FFFFFF;
						bottom: 14upx;
						right: 10upx;
						text-align: center;
						font-weight: bold;
					}	
			}
  		
			.newrightText{
				position: relative;
				width: 67%;
				display: flex;
				flex-direction: column;
				justify-content:space-around ;
				 margin-left: 30upx;
					margin-right: 30upx;	
					.newtitle{
						font-size: 28rpx;
						font-weight: bold;
						color: #000000;
 					}
						
					.newSubtitle{
 						color:#666666 ;
						font-size: 26upx;
						background-color: #F4F4F4;
						padding-left: 15upx;
						padding-right: 15upx;
						padding-top: 10upx;
						padding-bottom: 10upx;
						border-radius: 8upx;
					}
						
					
						
					.price{
						font-size: 20upx;
						color: #FF0000;
						font-weight: 500;
						
					}	
					.bottomview{
						display: flex;
						flex-direction: row;
						 .newpeopleCount{
						 	color:#999999 ;
						 	font-size: 20upx;
						 }
						 .lessonCount{
						 	color:#999999 ;
						 	font-size: 20upx;
							margin-left: 50upx;
						 }
						 
					}
					 
			}
		}
		 
		.line {
			display: bock;
			width: 100%;
			height: 1rpx;
			margin-top: 22rpx;
			background: #e8e8e8;
		}
		&:last-child {
			.line {
				//display: none;
			}
			//padding-bottom: 30rpx;
		}
	}
}
</style>
