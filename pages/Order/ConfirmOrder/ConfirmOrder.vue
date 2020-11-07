<template>
	<view class="contentview">
		<scroll-view scroll-y="true" :style="[{height:scrollviewHeight + 'px'}]">
				 
				<view class="orderLessonview">
					<image  class="lessonImage" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603357169774&di=0a278af01c174d7a9fb8da2c368bd1c1&imgtype=0&src=http%3A%2F%2Fwww.ceopx.cn%2Fuploadfile%2F2018%2F0511%2F20180511025611243.jpg"></image>
					
					<view class="lessonTextView">
						<text class="lessonTitle">失语症初步诊疗</text>
						<view class="middleview">
							<text class="timeview">2020-06-21 08:00</text>
							<text class="stautusview">可回放</text>
						</view>
						<view class="priceview">
							<text class="price1">¥</text>
							<text class="price">356</text>
						</view>
					</view>
					
				</view>  
				 <view class="secondPriceView">
				 	<view class="secondItemview">
				 		<text class="lefttext">课程价格</text>
						<text class="righttext">¥400</text>
				 	</view>
					<view class="secondItemview">
						<text class="lefttext">优惠价格</text>
										<text class="righttext">-¥44</text>
					</view>
					<view class="secondlineview">
						
					</view>
					<view class="secondItemview" @click="showCouponview">
						<text class="lefttext">优惠券</text>
										<text class="righttext1">暂无可用 ></text>
					</view>
					 
				 </view>
				  <view class="payview" @click="choosePayaction">
					  <image class="payIcon" src="../../../static/weixin.png" ></image>
				  	<text class="paytitle">微信支付</text>
					<image  :src="ischoosePay? '../../../static/order/icon_xuanzhong.png':'../../../static/order/icon-weixuanzhong.png'" class="chooseicon"></image>
				  </view>
				 
		</scroll-view>
		<view class="bottomView">
			<text class="totalprice">合计</text>
			<text class="price1">¥</text>
			
			<text class="price">356</text>
			<view class="paynowview">立即支付
				
			</view>
			
		</view>
		<uni-popup ref="popup" type="bottom">
		<view class="couponbgview" :style="[{height:couponviewheight + 'px'}]">
			<view class="couponTopview">
				<image  class="closeImage" @click="closeCouponview"></image>
				<text class="toptitle">选择优惠券</text>
				<zzx-tabs  class="barview" :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" :activeColor="activeColor"
				:lineWidth="line_width" :lineColor="line_color">
				           </zzx-tabs>
			</view>
 				
				<scroll-view    :style="[{height:couponscrollviewHeight + 'px'}]" scroll-y="true" v-show="current === 0"  >
				   <view class="couponitemBgview" v-for="(item,index) in info " :key = "index" @click="choosecounponWithindex(index)" > 
				    	<image src="../../../static/order/bg_youhuiquan.png"  class="couponBGimage"></image>
						<text class="coupontiptitle">不可与其他优惠券共同使用</text>
						<image v-show="index == currentCouponindex" src="../../../static/order/xuanzhong.png"  class="couponChooseimage" ></image>
				<image src="../../../static/order/icon_huiyuan.png" class="couponicon"></image>
				<text class="coupontitle">尊享会员优惠券</text>
				<text class="coupontime">有效期至2020-06-21 </text>
				<view class="couponprice">
					<text class="price1">¥</text>
					<text class="price">67</text>
				</view>
				<text class="use">无门槛</text>
				 <!--  <image :src="item.url" ></image>
				   
 				     <text v-show="2 == index">测试数据</text> -->
				  
				    </view>
				</scroll-view>	  
				<view class="invvitecodeview" :style="[{height:couponscrollviewHeight + 'px'}]"   v-show="current === 1"  >
 
				   <text class="invitecodetip">请输入邀请码</text>
				    <input type="text" value="" class="invitecode"  v-model="invitecode" />
				    </view>
					
 		 <text class="sureview" @click="chooseCouponwithSure">确定</text>
			 
		</view>
		</uni-popup>
	</view>
	
	 
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				scrollviewHeight:0,
				couponviewheight:0,
				couponscrollviewHeight :0,
				currentCouponindex:null,
				ischoosePay:false,//判断是否勾选支付方式
				items:["优惠券","邀请码"],
				invitecode:'',
				activeColor:'#000000',
				current:0,
				line_width:"8%",
				line_color:'#31D880',
				info:[{
					name:'车新颖',
										colorClass: 'uni-bg-red',
										url: 'http://39.99.215.169:8090/sys/common/static/temp/aa_1598422546786.jpg',
										content: '内容 A',
										id:"1"
									},
									{
										name:'车新颖',
										colorClass: 'uni-bg-green',
										url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
										content: '内容 B',
										id:"2"
									},
									{
										name:'车新颖',
										colorClass: 'uni-bg-blue',
										url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
										content: '内容 C',
										id:"3"
									},
									{
										name:'车新颖',
															colorClass: 'uni-bg-red',
															url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
															content: '内容 A',
															id:"4"
														},
														{
															name:'车新颖',
															colorClass: 'uni-bg-green',
															url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
															content: '内容 B',
															id:"5"
														},
														{
															name:'车新颖',
															colorClass: 'uni-bg-blue',
															url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
															content: '内容 C',
															id:"6"
														}
													
								]
			}
		},
		onShow:function(e){
 				this.scrollviewHeight = this.$app.getwindowHeight()-44;
				this.couponviewheight = this.$app.getwindowHeight()*0.87;
				this.couponscrollviewHeight = this.$app.getwindowHeight()*0.87*0.70;
				
		},
		methods: {
				//勾选支付方式
			choosePayaction(){
				this.ischoosePay = !this.ischoosePay;
				
			},
			//弹出优惠券选择界面
			showCouponview(){
				var that = this
				
				that.$refs.popup.open()
			},
			//选择优惠券bar切换
			onClickItem(e) {
			           if (this.current !== e.currentIndex) {
			               this.current = e.currentIndex;
			           }
			         },
					//优惠券切换选择	 
					 choosecounponWithindex(index){
						 this.currentCouponindex = index;
					 },
					// 选好优惠券，点击确定
					chooseCouponwithSure(){
						var that = this
						
						that.$refs.popup.close()
						
					},
						
					closeCouponview(){
						var that = this
						
						that.$refs.popup.close()
					}
					 
		}
	}
</script>
<style>
	page{
		background-color: #F7F7F7;
	}
	</style>
<style scoped lang="scss">

	
.contentview{
	display: flex;
	flex-direction: column;
	position: relative;
}
	
.orderLessonview{
	display: flex;
	flex-direction: row;
	
	background: #FFFFFF;
	border-radius: 16rpx;
	margin-left:30rpx;
	margin-top: 30rpx;
	margin-right: 30rpx;
	padding-left: 30rpx;
	padding-right: 22rpx;
		padding-top:30rpx ;
		padding-bottom: 30rpx;
	.lessonImage{
		width: 240rpx;
		height: 160rpx;
 		border-radius: 16rpx;
		background-color: #FF0000;
	}
	.lessonTextView{
		width: 60%;
  		display: flex;
		flex-direction: column;
		margin-left:30rpx ;
		.lessonTitle{
			font-size: 28rpx;
 			font-weight: 400;
			color: #000000;
			overflow: hidden;
			text-overflow: ellipsis;  /* 超出部分省略号 */
			display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			-webkit-line-clamp: 2; /** 显示的行数 **/
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

 		}
		.middleview{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 15rpx;
			.timeview{
				font-size: 20rpx;
 				font-weight: 500;
				color: #999999;
 			}
				
			.stautusview{
				width: 82rpx;
				height: 30rpx;
				background: #F2F2F2;
				border-radius: 16rpx;
				font-size: 16rpx;
 				font-weight: 500;
				color: #333333;
				line-height: 30rpx;
				text-align: center;
			}
			
		}
		.priceview{
			display: flex;
			flex-direction: row;
			margin-top: 8rpx;
			.price1{
				
				font-size: 16rpx;
 				font-weight: 500;
				color: #E02020;
				margin-top: 10rpx;
 			}
				
			.price{
				font-size: 28rpx;
				font-weight: 500;
				color: #E02020;
				margin-left: 4rpx;
			}
		}
	}
	
}
.secondPriceView{
	background: #FFFFFF;
	border-radius: 16rpx;
	display: flex;
	flex-direction: column;
	margin-left: 30rpx;
	margin-top: 30rpx;
	margin-right: 30rpx;
		padding-bottom: 30rpx;
		
	.secondItemview{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
			
		.lefttext{
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 24rpx;
			margin-left: 28rpx;
 		}
		.righttext{
			
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-right: 30rpx;
			margin-top: 20upx;
 		}
		.righttext1{
			
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			margin-right: 30rpx;
			margin-top: 20rpx;
 		}
		
	}
	.secondlineview{
		margin-left:30rpx ;
		margin-right:30rpx;
        height: 3rpx;
		background:#CBCBCB ;
		margin-top: 26rpx;
	}
	
	
}
	
.payview{
	
	background: #FFFFFF;
	border-radius: 16px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 30rpx;
	margin-right: 30rpx;
	margin-top: 30rpx;
	position: relative;
	.payIcon{
		width: 48rpx;
		height: 48rpx;
		margin-left:48rpx;
		margin-top: 36rpx;
		margin-bottom: 36rpx;
	}
		
	.paytitle{
		
		font-size: 26rpx;
 		font-weight: 400;
		color: #333333;
		margin-left:18rpx ;
 	}
	.chooseicon{
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		right: 42rpx;
 	}
}
.bottomView{
	background-color: #FFFFFF;
	height: 88rpx;
	display: flex;
  align-items: center;
       justify-content: flex-end;
		   
	   .paynowview{
		   width: 214rpx;
		   height: 54rpx;
		   background: #E02020;
		   border-radius: 28rpx;
		   text-align: center;
		   font-size: 28rpx;
 		   font-weight: 400;
		   color: #FFFFFF;
		   line-height: 54rpx;
		   margin-right:30rpx ;
	   }
		   
	   .price{
		   font-size: 36rpx;
 		   font-weight: 600;
		   color: #E02020;
		   margin-right: 40rpx;
 	   }
	   .price1{
		   font-size: 28rpx;
		   font-weight: 400;
            widthcolor: #333333;
 			margin-top: 4rpx;
			margin-right: 4rpx;
 	   }
 .totalprice{
 		   font-size: 28rpx;
 		   font-weight: 400;
            widthcolor: #333333;
 			margin-right: 14rpx;
  }
 }
 //优惠券布局
	 
 .couponbgview{
	 width: 100%;
 	 background-color: #F7F7F7;
	 border-top-left-radius:36rpx ;
	 border-top-right-radius: 36rpx;
	 display: flex;
    flex-direction: column;
		align-items: center;
		position: relative;		
		 .couponTopview{
			 width: 100%;
			 background-color: #FFFFFF;
			 display: flex;
			 flex-direction: column;
			 align-items: center;
			 padding-bottom: 10rpx;
			 border-top-left-radius:36rpx ;
			 border-top-right-radius: 36rpx;
 			 justify-content: space-around;
			 position: relative;
				 
			 .closeImage{
				 width: 24rpx;
				 height: 24rpx;
				 position: absolute;
				 right:52rpx; 
				 top:40rpx;
				 background-color: #FF0000;
				 
			 }
			 .barview{
			 	width: 100%;
				margin-top: 20rpx;
 			 }
			 .toptitle{
			 	
			 	font-size: 32rpx;
			 	font-weight: 700;
			 	color: #333333;
				margin-top: 30rpx;
 			 }
		 }
				
		.sureview{
			position: absolute;
			bottom: 44rpx;
			width: 588rpx;
			height: 64rpx;
			background: #E02020;
			border-radius: 32rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 64rpx;
		}			 
			 
		 
			
 		.couponitemBgview{
			display: flex;
 			position:  relative;
 			margin-top: 30rpx;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 202rpx;
 			.couponBGimage{
				width: 690rpx;
				height: 202rpx;
				position: absolute;
				bottom: 0;
			}
			.couponChooseimage{
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				top: 0;
				right: 30rpx;
			}	
			.coupontiptitle{
				
				font-size: 18rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left:60rpx ;
				position: absolute;
				width: 100%;
				bottom:26rpx ;
 			}
			.couponicon{
				width: 26rpx;
				height: 20rpx;
				position: absolute;
				top: 40rpx;
				left: 60rpx;
			}
				
			.coupontitle{
				
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				position: absolute;
				top: 28rpx;
				left: 100rpx;
				
 			}
				
			.coupontime{
				font-size: 16rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				position: absolute;
				top: 76rpx;
				left: 60rpx;
 			}
			.couponprice{
				display: flex;
				flex-direction: row;
				position: absolute;
				top: 18rpx;
				right: 60rpx;
					
				.price1{
					
					font-size: 20rpx;
 					font-weight: 400;
					color: #333333;
					margin-top: 12rpx;
 				}					
				.price{
					font-size: 36rpx;
					font-weight: 600;
					color: #E02020;
					margin-left: 3rpx;
				}
			}
				
			.use{
				
				font-size: 16rpx;
 				font-weight: 400;
				color: #666666;
				position: absolute;
				right:66rpx ;
				top:76rpx ;
 			}
		}
			.invvitecodeview{
				display: flex;
				flex-direction: column;
				align-items: center;
				.invitecodetip{
								 
								 font-size: 28rpx;
 								 font-weight: 400;
								 color: #333333;
								 margin-top: 84rpx;
 				}
				.invitecode{
					width: 622rpx;
					height: 64rpx;
					background: #EFEFEF;
					border-radius: 10px;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 64px;
					margin-top: 38rpx;
					padding-left: 20rpx;
				}
			} 
			 
		
  }
</style>
