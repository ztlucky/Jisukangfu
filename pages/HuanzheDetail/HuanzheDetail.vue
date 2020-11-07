<template>
	<view class="contentView">
		<scroll-view scroll-y="true"  :style="[{height:viewHeight + 'px'}]"  >
		<view class="huanzheview"  >
			 	<view class="huanzheTopview">
			 		<image src="../../static/gongzuotai/icon_nv.png" ></image>
					<view class="huanzherightview">
						<view class="firstView">
							<text class="name">刘胡兰</text>
													<text class="detail">性别：女 年龄：56</text>
						</view>
						<view class="secodview">
							<view class="zhenduanview">
								<image class="zhenduanimage" src="../../static/gongzuotai/icon_zhenduan1.png" ></image>
								<text>诊断：心脏病</text>
							</view>
							<text class="timetext">时间:2020-05-22 06:52</text>
						</view>
												
					</view> 
			 	</view>
 	
			 </view>
<!-- 			 //康复目标
 -->			  <view class="kangfubgview">
			  	<view class="titleView">
					<view class="leftview">
						<image class="image1" src="../../static/Huanzhexiangqing/icon_mubiao.png"></image>
						<text >康复目标</text>
					</view>
			  	<view class="rightview">
					<image src="../../static/Huanzhexiangqing/icon_tiaozhengmubiao.png" class="image2"></image>
					
			  		<text  >调整目标</text>
			  	</view>
					
			  	</view>
				<view class="lineview">
					
				</view>
				<view class="mubiaoview">
					<view class="upview">
						<view class="dot">
							
						</view>
						<text class="dotTitle">短期目标</text>
					</view>
					<text class="mubiaodetail">站立平衡达到三级，十天。</text>
				</view>
				<view class="mubiaoview">
					<view class="upview">
						<view class="dot">
							
						</view>
						<text class="dotTitle">长期目标</text>
					</view>
					<text class="mubiaodetail">可独立行走。</text>
				</view>
			  </view> 
			  <!-- //康复项目 -->
			  <view class="kangfubgview">
			  	<view class="titleView">
			  					<view class="leftview">
			  						<image class="image1" src="../../static/Huanzhexiangqing/icon_kangfuxiangmu.png"></image>
			  						<text >康复项目</text>
			  					</view>
			  	<view class="rightview">
			  					<image src="../../static/Huanzhexiangqing/icon_tiaozhengmubiao.png" class="image2"></image>
			  					
			  		<text  >调整项目</text>
			  	</view>
			  					
			  	</view>
			  		<view class="hview">
			  			<text>时间</text>
						<view class="v_lineView">
						</view>
						<text  >项目</text>
						<view class="v_lineView">
							
						</view>
						<text>状态</text>
			  		</view>	
				 <view   v-for='(item,index) in kangfuxiangmu' :key= 'index'>	
			  		<view class="zhiliaoxiangmu" >
			  			<text class="time">{{item.time}}</text>
						<view class="v_lineView1">
							
						</view>
						<text class="xiangmu">{{item.title}}</text>
						<view class="v_lineView1">
							
						</view>
						<text class="redstatus" v-if="item.status == '已结束'">{{item.status}}</text>
						<text class="greenstatus" v-if="item.status == '进行中'">{{item.status}}</text>
						<text class="status" v-if="item.status == '未开始'">{{item.status}}</text>
						
			  		</view>	
						 <view class="line">
						 	
						 </view>
						
						</view>  
			  				 
			  </view>
			  <!-- //康复评定 -->
			  <view class="kangfubgview">
			  			  	<view class="titleView">
			  					<view class="leftview">
			  						<image class="image1" src="../../static/Huanzhexiangqing/icon_pingding.png"></image>
			  						<text >康复评定</text>
			  					</view>
			  			  	<view class="rightview">
			  					 
			  					
			  			  		<text  >全部评定</text>
			  			  	</view>
			  					
			  			  	</view>
			  				<view class="lineview">
			  					
			  				</view>
			  				<view class="mubiaoview">
			  					<view class="upview">
			  						<view class="dot">
			  							
			  						</view>
			  						<text class="dotTitle">评定结果1</text>
			  					</view>
			  					<text class="mubiaodetail">患者身体比较虚弱，需要谨慎治疗。</text>
			  				</view>
			  				<view class="mubiaoview">
			  					<view class="upview">
			  						<view class="dot">
			  							
			  						</view>
			  						<text class="dotTitle">评定结果2</text>
			  					</view>
			  					<text class="mubiaodetail">患者身体比较虚弱，需要谨慎治疗。。</text>
			  				</view>
			  			  </view>
			  <!-- //患者记录-->
			  <view class="kangfubgview">
			  			  	<view class="titleView">
			  					<view class="leftview">
			  						<image class="image1" src="../../static/Huanzhexiangqing/icon_jilu.png"></image>
			  						<text >患者记录</text>
			  					</view>
			  			  	<view class="rightview">
			  					 
			  					
			  			  		<text  >全部记录</text>
			  			  	</view>
			  					
			  			  	</view>
			  				<view class="lineview">
			  					
			  				</view>
			  				<view class="mubiaoview">
			  					<view class="upview">
			  						<view class="dot">
			  							
			  						</view>
			  						<text class="huanzhejiluTitle">患者记录1</text>
									 
			  					</view>
			  					<text class="huanzhejilushijian">2020-06-30 06:00</text>
								<view class="huanzhelineView">
									
								</view>
			  				</view>
			  				<view class="mubiaoview">
			  					<view class="upview">
			  						<view class="dot">
			  							
			  						</view>
			  						<text class="huanzhejiluTitle">患者记录1</text>
			  						 
			  					</view>
			  					<text class="huanzhejilushijian">2020-06-30 06:00</text>
			  					<view class="huanzhelineView">
			  						
			  					</view>
			  				</view>
			  			  </view>
		<view class="kejianview">
			<text>其他人可见</text>
			<switch class="switchView" checked="true" style='zoom:.75;' :color="switchColor" />
		</view> 
		</scroll-view>
		<view class="bottomview">
			<text class="huanzhepingding">患者评定</text>
			<text class="kangfujilu">康复记录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  switchColor:'#4CD964'	,
			  viewHeight:0,
			  kangfuxiangmu:[{
				  time:'2020-06-13',
				  title:'治疗项目1',
				  status:'已结束'
				  
			  },{
				time:'2020-06-18',
				title:'治疗项目2',
				status:'进行中'  
			  },
				  
			  {
				  time:'2020-06-31',
				  title:'治疗项目3',
				  status:'未开始'
				  
			  }]
			  
			}
		},
		onShow:function(){
			this.viewHeight = this.$app.getwindowHeight()-69
		 
		},
		methods: {
			
		}
	}
</script>
<style>
	page{
		background-color: #F7F7F7;
	}
	</style>
<style scoped lang="scss">
		
	.contentView{
		display: flex;
		flex-direction: column;
	}
		
	.bottomview{
		 height: 69px;
		 display: flex;
		 flex-direction: row;
		 justify-content: space-around;
		 align-items: center;
			
			 background-color: #FFFFFF;
		 .huanzhepingding{
			 width: 332rpx;
			 height: 80rpx;
			 border-radius: 40rpx;
			 border: 2rpx solid #2AD36A;
			 font-size: 28rpx;
			 font-family: PingFangSC-Medium, PingFang SC;
			 font-weight: 500;
			 color: #27D061;
			 line-height: 80rpx;
			 text-align: center;
		 }
			 
		 .kangfujilu{
			 width: 332rpx;
			 height: 80rpx;
			 background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
			 box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
			 border-radius: 40rpx;
			 text-align: center;
			 font-size: 28rpx;
			 font-family: PingFangSC-Medium, PingFang SC;
			 font-weight: 500;
			 color: #FFFFFF;
			 line-height: 80rpx;
		 }
	}
	 .huanzheview{
  		background: #FFFFFF;
		border-radius: 16rpx; 
		margin-left:30rpx ;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
				
			.huanzheTopview{
				display: flex;
				flex-direction: row;
				image{
					width:118rpx ;
					height: 118rpx;
					margin-top:20rpx ;
					margin-left: 30rpx;
					margin-bottom: 20rpx;
				}
				.huanzherightview{
					display: flex;
					flex-direction: column;
					flex: 1;
						
					.firstView{
						display: flex;
						flex-direction: row;
						position: relative;
						.name{
  							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-left: 26rpx;
							margin-top: 34rpx;
 						}
						.detail{
							
							font-size: 20rpx;
							font-weight: 400;
							color: #666666;
							margin-top:36rpx;
 							position: absolute;
							right:30rpx ;
							 
						}
				
					}
						
					.secodview{
						display: flex;
						flex-direction: row;
						position: relative;
 						align-items: center;
						.zhenduanview{
							width: fit-content;
							background: #F0F0F0;
							height: 36rpx;
							border-radius: 22rpx;
							display: flex;
							flex-direction: row;
 							margin-left: 10rpx;
							padding-right: 15rpx;
							margin-top: 9rpx;
							padding-top: 5rpx;
 							.zhenduanimage{
								width: 28rpx;
								height: 28rpx;
								margin-top: 0rpx;
								margin-left: 5rpx;
								
							}
							text{
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-left: 8rpx;
							}
						}
						//
							
						.timetext{
							font-size: 20rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-top: 8rpx;
 							margin-left: 10rpx;
							position: absolute;
							right: 15rpx;

						}					
						
					}	
			
 			
				}
		 	}
			 
	 
 
	 }
	 .kangfubgview{
		 background: #FFFFFF;
		 border-radius: 16rpx; 
		 margin-left:30rpx ;
		 margin-right: 30rpx;
		 margin-top: 30rpx;
		 display: flex;
		 flex-direction: column;
		 padding-bottom: 20rpx;
		 .titleView{
			 display: flex;
			 flex-direction: row;
			 height: 90rpx;
			 align-items: center;
				position: relative; 
			 .leftview{
				 display: flex;
				 flex-direction: row;
				 align-items: center;
				 .image1{
				 				width:30rpx ;
				 				height: 26rpx;
								margin-left: 40rpx;
				 }
				text {
				 				 font-size: 30rpx;
				 				 font-family: PingFangSC-Medium, PingFang SC;
				 				 font-weight: 500;
				 				 color: #333333;
								 margin-left: 10rpx;
				 }
			 }
				
			.rightview{
				display: flex;
				flex-direction: row;
				position: absolute;
				align-items: center;
				right: 32rpx;
				.image2{
								 width: 24rpx;
								 height: 24rpx;
				}
								 
				text{
								 font-size: 26rpx;
								 font-family: PingFangSC-Regular, PingFang SC;
								 font-weight: 400;
								 color: #2CD571;
								 margin-left: 15rpx;
				}
			}
			
			
		 }
		 .lineview{
		 	height: 2rpx;
		 	background-color: #EAEAEA;
		 }
		 //目标
			 
		 .mubiaoview{
			 display: flex;
			 flex-direction: column;
				 
			 .upview{
				display: flex;
				 flex-direction: row;
				 .dot{
					 width: 8rpx;
					 height: 8rpx;
					 background: #31D880;
					 border-radius: 4rpx;
					 margin-left: 40rpx;
					 margin-top: 46rpx;
				 }
				.huanzhejiluTitle{
					
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-left: 30rpx;
					margin-top: 30rpx;
 				}	
				 
				 .dotTitle{
					 
 					font-size: 26rpx;
					 font-family: PingFangSC-Regular, PingFang SC;
					 font-weight: 400;
					 color: #333333;
					 margin-left: 30rpx;
					 margin-top: 30rpx;
 				 }
			 }
				.huanzhejilushijian{
									 
									 font-size: 22rpx;
									 font-family: PingFangSC-Regular, PingFang SC;
									 font-weight: 400;
									 color: #999999;
									 margin-left: 80rpx;
									 margin-top: 10rpx;
									 
				}
				 .huanzhelineView{
					 height: 2rpx;
					 background-color: #EAEAEA;
					 margin-left: 80rpx;
					 margin-top: 20rpx;
				 }
			 .mubiaodetail{
				 font-size: 26rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #666666;
				 margin-left: 80rpx;
				 margin-top: 10rpx;
 			 }
		 }
		 
		 .hview{
 			 display: flex;
			 flex-direction: row;
 				height: 64rpx;  
			  text{
				  background-color:#E6E6E6 ;
				  color:#000000 ;
				  font-size: 28rpx;
				  flex: auto;
 				  text-align: center;
				  line-height: 64rpx;
			  }
				.v_lineView{
					width: 2rpx;
					background: #FFFFFF;
				}  
			  
		 }
			 
		 .zhiliaoxiangmu{
			 display: flex;
			 flex-direction: row;
			 height: 50rpx;
			 
 				background-color: #FFFFFF;
			 .time{
				 
				 font-size: 24rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #666666;
				 flex: 1;
				 text-align: center;
				 line-height: 50rpx;
  			 }
				.v_lineView1{
					width: 2rpx;
					background: #F5F5F5;
				}   
			 .xiangmu{
				 
				 font-size: 24rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #666666;
				 flex: 1;
				 text-align: center;
 				 line-height: 50rpx;
 			 }
				 
			 .redstatus{
				 
				 font-size: 24rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 line-height: 50rpx;
				 color: #E92C2C;
				 flex: 1;
				 text-align: center;
 			 }
			 .greenstatus{
			 				 
			 				 font-size: 24rpx;
			 				 font-family: PingFangSC-Regular, PingFang SC;
			 				 font-weight: 400;
			 				 line-height: 50rpx;
			 				 color: #2CD571;
			 				 flex: 1;
			 				 text-align: center;
			 }
			 .status{
			 				 
			 				 font-size: 24rpx;
			 				 font-family: PingFangSC-Regular, PingFang SC;
			 				 font-weight: 400;
			 				 line-height: 50rpx;
			 				 color: #2F2F2F;
			 				 flex: 1;
			 				 text-align: center;
			 }
			 
		 }
		 
		 .line{
			 height: 2rpx;
			 background-color:#F5F5F5 ;
		 }
	 }
	 .kejianview{
 	 	 height: 80rpx;
	 	 background-color: #FFFFFF;
	 	 display: flex;
		 border-radius: 16rpx;
		 align-items: center;
	 	 flex-direction: row;
		 margin-bottom: 20rpx;
	 		margin-left: 30rpx;
	 		margin-right: 30rpx;
	 		margin-top: 20rpx;
			position: relative;
	 	 text{
	 		 color: #000000;
	 		 font-size: 28rpx;
	 		 margin-left: 30rpx;
 			 font-weight: 500;
	 	 }
			
	 	.switchView{
			 
			position: absolute;
			right: 30rpx;
		} 
	 	 
	 }
</style>
