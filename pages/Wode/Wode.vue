<template>
	<view>
 <view class="contentview">
 	<view class="topview">
 		<view class="topHview" @click="jumptoPersonal">
 			<image  class="userIcon"></image>
			<view class="toprightV">
				<view class="up">
					<text class="name">刘医生</text>
					<text class="huiyuan">普通会员</text>
				</view>
				<text class="bianji">编辑个人资料</text>
			</view>
 		</view>
		<view class="lineview">
			
		</view>
		<uni-grid :column="4"  :square="false"   :showBorder="false" @change="" :highlight="false">
			<uni-grid-item  v-for="(item ,index) in  tongjidata" :key ="index" :index= "index" >
			  <view class="tongjiView">
			  	<text class="numberText">{{item.number}}</text>
				<text class="tip">{{item.title}}</text>
				<view class="line1" v-if="index%4 !=3 "></view>
			  </view>
			 </uni-grid-item>
		</uni-grid>
 	</view>
	 <view class="bgview">
	 	<view class="vipview">
			<image  class="bgimage" src="../../static/Me/bg_huiyuan.png" mode=""></image>
			<text class="vipTitle1">康复医疗·</text>
			<text class="vipTitle2">VIP会员</text>
			
			<text class="buynow">立即购买</text>
		</view>
	 	<view class="iconview">
	 		<image class="iconimage" src="../../static/Me/icon_qianbao.png" mode=""></image>
			<text class="icontitle">我的钱包</text>
 	 	</view>	
	 	<view class="qianbaoview">
	 		<text class="money">{{money}}</text>
			<text class="yuan" v-if="!ismoneySecret">元</text>
			<view class="secretImage"  @click="changeSecret">
				<image :src="ismoneySecret?'../../static/Me/icon_yanjing.png':'../../static/Me/kejian.png'" mode="" ></image>
				
			</view>
			<text class="chongzhi">充值</text>
			<text class="tixian">提现</text>
	 	</view>
		<view class="lineview">
		</view>
		<view class="jifen">
			<view class="jifenview">
				<view class="iconview">
					
					<image class="iconimage" src="../../static/Me/icon_kaquan.png" mode=""></image>
					<text class="icontitle">我的卡券</text>
					<text class="bluetext">1张</text>
					
				</view>
				 
			</view>
			<view class="v_line">
				
			</view>
			<view class="jifenview">
				<view class="iconview">
					
					<image class="iconimage" src="../../static/Me/jifen.png" mode=""></image>
					<text class="icontitle">积分</text>
					<text class="bluetext" style="right:30px ;">1000</text>
					
				</view>
				 
			</view>
		</view>
		
		
		<view class="lineview">
			
		</view>
		<view class="iconview" @click="toPage('/pages/Wode/orderList/orderList')">
			<image class="iconimage" src="../../static/Me/icon_dingdan.png" mode=""></image>
			<text class="icontitle">全部订单</text>
			<image src="../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
		</view>
	 </view>
	 <view class="bgview">
	 	 
	 	<view class="iconview" @click="toPage('/pages/Wode/live/live')">
	 		<image class="iconimage" src="../../static/Me/icon_zhibo.png" mode=""></image>
	 			<text class="icontitle">我的直播</text>
				<image src="../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
				
	 	</view>	
	 	 
	 		<view class="lineview">
	 		</view>
	 		<view class="iconview" @click="toPage('/pages/Wode/course/course')">
	 			<image class="iconimage" src="../../static/Me/icon_kecheng.png" mode=""></image>
	 			<text class="icontitle">我的课程</text>
	 			<image src="../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
	 		</view>
	 		<view class="lineview">
	 			
	 		</view>
	 		<view class="iconview" @click="toPage('/pages/Wode/banJi/banJi')">
	 			<image class="iconimage" src="../../static/Me/icon_banji.png" mode=""></image>
	 			<text class="icontitle">我的班级</text>
	 			<image class="rightIcon" src="../../static/icon_jiantou.png" mode=""></image>
	 		</view>
	 </view>
	 <view class="bgview">
	 	 
	 	<view class="iconview iconview1" @click="toPage('')">
	 		<image class="iconimage" src="../../static/Me/icon_zhibo.png" mode=""></image>
	 			<text class="icontitle">我的创建直播</text>
	 				<image src="../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
	 				
	 	</view>	
	 	 
	 		<view class="lineview">
	 		</view>
	 		<view class="iconview iconview1" @click="toPage('')">
	 			<image class="iconimage" src="../../static/Me/icon_kecheng.png" mode=""></image>
	 			<text class="icontitle">我的创建课程</text>
	 			<image src="../../static/icon_jiantou.png" mode="" class="rightIcon"></image>
	 		</view>
	 		<view class="lineview">
	 			
	 		</view>
	 		<view class="iconview iconview1" @click="toPage('')">
	 			<image class="iconimage" src="../../static/Me/icon_banji.png" mode=""></image>
	 			<text class="icontitle">我的创建班级</text>
	 			<image class="rightIcon" src="../../static/icon_jiantou.png" mode=""></image>
	 		</view>
			<view class="lineview">
				
			</view>
			<view class="iconview iconview1" @click="toPage('/pages/Wode/plan/plan')">
				<image class="iconimage" src="/static/plan.png" mode=""></image>
				<text class="icontitle">我的方案</text>
				<image class="rightIcon" src="../../static/icon_jiantou.png" mode=""></image>
			</view>
	 </view>
	 <view style="width:100%;height:30rpx"></view>
 </view>

 	</view>
</template>

<script>
	export default {
		data() {
			return {
					
				tongjidata:[{
					number:0,
					title:"得分"
				},{
					number:0,
					title:"患者"
				},
				{
					number:0,
					title:"粉丝"
				},{
					number:0,
					title:"关注"
				}
				],
				ismoneySecret:false,
				money:"193.00"
			}
		},
		onShow:function(){
			if(getApp().globalData.userId){
				
				
			}else{
				//未登陆
				uni.navigateTo({
 						url:'../Login/Login/Login',
							 animationType:'slide-in-bottom',
							  animationDuration: 300
			});
			}
			
		},
		onNavigationBarButtonTap:function(e){
			this.jumptoPersonal();
		},
		onLoad:function(){
			
		},
		methods: {
			//跳转个人信息
			jumptoPersonal(){
				uni.navigateTo({
							url:'./PersonalInfo/PersonalInfo',
								 animationType:'slide-in-right',
								  animationDuration: 300
				});
			},
			//改变金额加密
			changeSecret(){
				this.ismoneySecret = !this.ismoneySecret;
					
				if(this.ismoneySecret){
					this.money = "****"
				}else{
					this.money = "193.00"
				}
			},
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
<style>
		
	page{
		background-color: #F7F7F7;
	}
	</style>
<style scoped lang="scss" >
.contentview{
	display: flex;
	flex-direction: column;
		
	.topview{
		background: #FFFFFF;
		border-radius: 22rpx;
		margin-left:30rpx ;
		margin-top: 30rpx;
		margin-right: 30rpx;
		display: flex;
		flex-direction: column;
		.topHview{
		 display: flex;
		 flex-direction: row;
			 
		 .userIcon{
			 width: 92rpx;
			 height: 92rpx;
			 border-radius: 46rpx;
			 margin-top:30rpx ;
			 margin-left: 30rpx;
			 background-color: red;
		 }
			 
		 .toprightV{
 			 margin-left: 30rpx;
			 display: flex;
			 flex-direction: column;
			 .up{
				 display: flex;
				 flex-direction: row;
			     .name{
					   font-size: 36rpx;
					   font-family: PingFangSC-Medium, PingFang SC;
					   font-weight: 500;
					   color: #333333;
					   margin-top: 30rpx;
				 }
					 
				 .huiyuan{
					 width: 140rpx;
					 height: 40rpx;
					 background: #F1F1F1;
					 border-radius: 21rpx;
					 font-size: 24rpx;
					 font-family: PingFangSC-Regular, PingFang SC;
					 font-weight: 400;
					 color: #333333;
					 text-align: center;
					 margin-left: 28rpx;
					 margin-top: 36rpx;
					 line-height: 40rpx;
				 }
			 }
				 
			 .bianji{
				 
				 font-size: 24rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #999999;
				 margin-top: 10rpx;
				 
			 }
		 }
		 
		}
			
		
		.tongjiView{
			margin-top: 20rpx;
			 display: flex;
			 flex-direction: column;
			 align-items: center;
				position: relative;
				padding-bottom: 30rpx; 
			 .numberText{
				 
				
				font-size: 36rpx;
				font-family: DIN-Medium, DIN;
				font-weight: bold;
				color: #333333;
 			 }
			 .tip{
				
				
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				
			 }
			 .line1{
				 position: absolute; 
				 right: 0;
				 top: 20rpx;
				 width: 4rpx;
				 height: 40rpx;
				 background-color: #ECECEC;
			 }
			
		}
	}
		
	.bgview{
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		 border-radius: 21rpx;
		 background-color: #FFFFFF;
		 padding-bottom: 30rpx;
		.vipview{
			
			height: 84rpx;
          position:relative;
		display: flex;
		flex-direction: row;
		.bgimage{
			height: 84rpx;
			width: 100%;
			border-radius: 21rpx,21rpx,0px,0px;
			
		}
	       .vipTitle1{
		position: absolute;
		
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #ECCFB5;
		 left: 50rpx;
		  top: 22rpx;
	          }
	.vipTitle2{
		position: absolute;
		
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 300;
		color: #ECCFB5;
 		top: 22rpx;
		left: 180rpx;
	}
.buynow{
	position: absolute;
	right: 40rpx;
	width: 172rpx;
	height: 42rpx;
	background: #ECCFB5;
	border-radius: 21rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
	line-height: 42rpx;
	text-align: center;
	margin-top: 22rpx;
}
		}
		.jifen{
			display: flex;
			flex-direction: row;
		}
		.v_line{
			width: 2rpx;
			height: 40rpx;
			background-color:#ECECEC ;
			margin-top: 34rpx;
		}
		.jifenview{
			display: flex;
			flex-direction: row;
			width: 50%;
  		}
		.iconview{
			width: 100%;
			display: flex;
			flex-direction: row;
			position: relative;
 		
			.iconimage{
				width:32rpx;
				height: 32rpx;
				margin-left:30rpx ;
				margin-top:38rpx ;
  			}
				
			.icontitle{
				
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-left: 20rpx;
				margin-top: 30rpx;
			}
				
			.rightIcon{
				position: absolute;
				right:30rpx ;
				margin-top:40rpx ;
 				width: 10rpx;
				height: 20rpx;
			}
			.bluetext{
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #0091FF;
				position: absolute;
				right: 28rpx;
				top: 30rpx;
			}
		} 
		.iconview1{
			.icontitle{
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: 20rpx;
				margin-top: 30rpx;
			}
		}
		.qianbaoview{
			 display:flex ;
			 flex-direction: row;
			 position: relative;
			 
 			 .money{
				 font-size:48rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: bold;
				 color: #333333;
				 margin-left:30rpx ;
				 margin-top: 12rpx;
			 }
			 .yuan{
				 font-size:28rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: bold;
				 color: #666666;
				 margin-top: 32rpx;
			 }
			 .secretImage{
				 margin-top: 28rpx;
				 margin-left: 18rpx;
 				 width:50rpx;
				 height: 50rpx;
 				 display: flex;
				 
				 align-items: center;
				 image{
					 width:28rpx;
					 height: 18rpx;
					 margin-left: 10rpx;
				 }
 			 }
			 .chongzhi{
				 position: absolute;
				 right: 30rpx;
				 margin-top: 18rpx;
				 width: 112rpx;
				 height: 48rpx;
				 background: #0091FF;
				 border-radius: 12rpx; 
				 font-size: 28rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #FFFFFF;
				 line-height: 48rpx;
				 text-align: center;
				 
			 }
			 .tixian{
				 position: absolute;
				 right: 162rpx;
				 margin-top: 18rpx;
				 width: 112rpx;
				 height: 48rpx;
				 border-radius: 12rpx;
				 border: 2rpx solid #0091FF; 
				 font-size: 28rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #0091FF;
				 line-height: 48rpx;
				 text-align: center;
			 }
		}
	}
	.lineview{
		margin-left: 30rpx;
	margin-right: 30rpx;
	background-color:#ECECEC ;
	height: 2rpx;
	margin-top: 30rpx;
	}
}
</style>
                                                 