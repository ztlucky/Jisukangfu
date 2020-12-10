<template>
	<view class="list" v-if="list.length > 0">
		<navigator :url="'/pages/Daxue/Zhibodetail/Zhibodetail?id=' + item.id" class="item" v-for="(item, index) in list" :key="index" hover-class="none">
	 <view  class="topview">
 		 <image class="newimage" :src="item.cover" v-if='item.cover.length>0' ></image>
		 <image class="newimage" :src="item.photo_url" v-if='item.photo_url!=null' ></image>
		 
		 <text class="liveview">· 直播中</text>
 				 <view class="newrightText">
					 <view class="newtitle">{{ item.title }}</view> 
					 	<view class="newSubtitle" v-if="item.source">{{ item.source }}</view>
						<view class="newBottomView">
							<text class="newprice">¥20/会员价¥15元 </text>
							<text class="newpeopleCount">{{ item.read }}人观看</text>
							
							
						</view>
					 <text class="enterview">
					 	进入
					 </text>
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
			<!-- <view class="line"></view> -->
		</navigator>
	</view>
</template>

<script>
export default {
	name: 'articleList',
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
 	.item {
		width: 100%;
		margin-left: 30upx;
 		display: flex;
		flex-direction: column;
 		.topview{
			margin-top: 20upx;
			display: flex;
			flex-direction: row;
			position: relative;
			padding-right: 30upx;
			
				.newimage{
   				height: 160rpx;
				width: 240rpx;
				border-radius: 8rpx;
 			
				
			}
			.liveview{
				position: absolute;
				font-size: 18upx;
				width: 94upx;
				height: 28upx;
				border-radius:4upx;
				background-color: #31D880;
				color: #FFFFFF;
				top: 16upx;
				left: 12upx;
				text-align: center;
				font-weight: 600;
			}	
			.newrightText{
				
				position: relative;
				width: 60%;
				display: flex;
				flex-direction: column;
				justify-content:space-around ;
				 margin-left: 30upx;
					margin-right: 30upx;	
					.newtitle{
						font-size: 28rpx;
						font-weight: 500;
						color: #000000;
 					}
						
					.newSubtitle{
 						color:#999 ;
						font-size: 24upx;
						font-weight:400 ;
					}
						
					.newBottomView{
						display: flex;
                        flex-direction: row;
						.newpeopleCount{
							color:#999999 ;
							font-size: 18upx;
							margin-left: 46upx;
						}
							
						.newprice{
  							font-size: 18rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #FF2828;
 						}
					}	
					
						
					.enterview{
						position: absolute;
						right: 0upx;
						bottom: 0upx;
						width: 74upx;
						height: 36upx;
						border-radius: 18upx;
						background-color: #EBEBEB;
                         color: #000000;
                 font-size: 20upx;
                font-weight: bold;
				text-align: center;
				line-height: 36upx;
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
