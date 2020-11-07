<template>
	 <view  class="bgview" >
	   <scroll-view scroll-y="true" :style="[{height:scrollviewHeight + 'px'}]">
		   <view class="videoImageview"  :style="[{height:videoImageHeight + 'px'}]">
 		   	<image  ></image>
			<image class="playImageView"></image>
		  </view>
		  <view class="secondView">
		  	<view class="priceview">
				<text class="price1">¥</text>
		  		<text class="price">156</text>
				<text class="huiyuanprice">会员价：¥100</text>
		  	</view>
			<view class="tipview">
				<text class="tiptext">会员价¥100</text>
				<text class="tiptext">直播结束后可回放</text>
			</view>
			<view class="timeview">
				<image src="../../../static/zhibo/icon_shijian.png"></image>
				<text>2020-06-31（周五）21:00</text>
				<text class="buynumber">286人购买</text>
			</view>
			<text class="livelessonTitle">华南地区较早开展种植诊疗业务规范化的医疗中心华南地区较早开展种植诊疗</text>
		  </view>
		  <!-- //讲师 -->
		  
		 <view class="teacherView">
		 	<view class="sectionview">
		 		<view class="iconview">
		 			
		 		</view>
				<text>讲师</text>
		 	</view>
			<scroll-view  scroll-x="true" class="teacherscrollview" >
			  <block v-for="(item, index) in info" :key="index">
			    <view class="item" @tap="goDetail(item.id)">
 			        <image class="teacherImage" :src="item.url" mode="">	
					</image>
 			      <text  >{{item.name}}</text>
 			    </view>
			  </block>
			</scroll-view>
		 </view>
		  
		  <!-- 下载课件 -->
		  <view class="downloadView">
			  <view class="sectionview">
			  	<view class="iconview">
			  		
			  	</view>
			  	<text>课件</text>
				</view>
		  	  <view class="lineview">
		  	  	
		  	  </view>
			  <view class="downLoadItemView">
			  	<image src="../../../static/zhibo/icon_pdf.png" class="downImage"></image>
				<text class="downtitle">华南地区较早开展种植诊疗业.pdf</text>
				<image class="rightimage" src="../../../static/zhibo/icon_jiantou1.png"></image>
			  </view>
			  <view class="middleLineview">
			  	
			  </view>
			  <view class="downLoadItemView">
			  	<image src="../../../static/zhibo/icon-shipin.png" class="downImage"></image>
			  				<text class="downtitle">华南地区较早开展.mp4</text>
			  				<image class="rightimage" src="../../../static/zhibo/icon_jiantou1.png"></image>
			  </view>
		  </view>
		  <!-- 选择 -->
		  <view class="lastview">
		  <zzx-tabs   :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" :activeColor="activeColor" 
		  :lineWidth="line_width" :lineColor="line_color">
		             </zzx-tabs>
		  	 <view class="detailText" v-show="current === 0">{{largetext}}
		  	           
		  	            </view>
		  	            <view v-show="current === 1">
		  	               <view class="studentBgview" v-for="(item,index) in info " :key = "index" >
		  	                	
		  	               <image :src="item.url"></image>
		  	               
		  	                	<text  >{{item.name}}</text>
		  	                 
 		  	              
		  	                </view>
		  	            </view>
		  	            
		  </view>
		 
	 </scroll-view>	
	 <view class="bottomview">
	 	<text class="price">原价100/会员价90</text>
		<view class="favview">
			<image src="../../../static/zhibo/icon_shoucang.png"></image>
			<text >收藏本课</text>
			
		</view>
		<text class="buy" :style="{background:isbuy?'#D0D0D0':'#FF0000'}" @click="comfirmOrder">立即购买</text>
	 </view>
	 </view>
	
</template>

<script>
	    import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"

	export default {
		components: {
		            zzxTabs
		        },
		data() {
			return {
				videoImageHeight:211,
				scrollviewHeight:0,
				items:["详情","学生"],
			activeColor:'#000000',
			current:0,
			line_width:"8%",
			line_color:'#31D880',
				isbuy:false,
				
				largetext:"自20世纪中期兴起的，与预防医学、保健医学、临床医学并称“四大医学”。其通过理疗、作业、运动等疗法减轻、弥补和重建人的功能障碍。按病种分，康复医疗包括：神经系统疾病康复（脑卒中等）、骨关节肌肉疾病和伤残康复（截肢骨折等）、心血管及呼吸系统疾病康复、老年康复、儿童疾病康复、精神残疾康复等六大类。与临床医学最大的重点区别在于，治疗对象与目的不同。临床医学以治愈疾病为主要目的，而康复主要针对功能障碍辅以对应的治疗训练，使得群体得以回归社会正常生活。治疗方式主要通过康复治疗组，含物理医学与康复医师（Physiatrist）,物理治疗师/士（PT）、作业治疗师/士（OT）、言语矫正师（ST）、心理治疗师、假肢与矫形器师（P&O）、文体治疗师（RT）、社会工作者（SW）。而在我国的康复治疗体系中，还引入了有我国特色的中医疗法。康复工作从业者的工作内容需要协同配合，由康复医师给予康复方案后，与康复治疗师等康复治疗组的其他人共同执行。目前通常将需要康复治疗的群体按照病情发展分为急性期、后急性期及长期照料期。因而与之对应的三级康复医疗网是目前较为健全的发达国家级地区康复体系的共有模式。",
				info: [{
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
													
								],
			}
		},
		onLoad:function(e){
 			uni.showToast({
				title:"直播课id="+e.id
			})
			},
	   onShow:function(e){
	   	this.videoImageHeight = this.$app.getwindowWidth()*0.563-44
		this.scrollviewHeight = this.$app.getwindowHeight()-44;
	   },	 
			
		methods: {
			 onClickItem(e) {
			            if (this.current !== e.currentIndex) {
			                this.current = e.currentIndex;
			            }
			          },
					  //确认订单
				
			comfirmOrder(){
				uni.navigateTo({
					url:'../../Order/ConfirmOrder/ConfirmOrder'
				})
			}	
		}
	}
</script>
<style>
	page{
		 background-color:#F7F7F7 ;
	}
	</style>
<style scoped lang="scss">
	 
 
		
	.bgview{
		display: flex;
		flex-direction: column;
		align-items: center;
  	} 	
		.secondView{
			 
			background: #FFFFFF;
			border-radius: 4rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top:30rpx;
			display: flex;
			flex-direction: column;
				
			.priceview{
				display: flex;
				flex-direction: row;
 				align-items: center;
				padding-top: 30rpx;
				.price1{
					font-size: 20rpx;
					font-weight: 500;
					color: #E02020;
					margin-left: 20rpx;
  				}
 				.price{
					
					font-size: 36rpx;
 					font-weight: 700;
					color: #E02020;
					margin-left: 5rpx;
    				}
				.huiyuanprice{
					
					height: 38rpx;
					background: #E02020;
					border-radius: 20rpx;
					padding-left:20rpx ;
					padding-right: 20rpx;
					
					font-size: 18rpx;
 					font-weight: 500;
					color: #FFFFFF;
					line-height: 38rpx;
					text-align: center;
					margin-left: 16rpx;
 				}
				
			}
			.tipview{
				display: flex;
				flex-direction: row;
				margin-top: 12rpx;
				.tiptext{
 					height:36rpx;
					background: #FFF7F7;
					border-radius: 4rpx;
					padding-left: 12rpx;
					padding-right: 12rpx;
			        text-align: center;
					font-size: 18rpx;
 					font-weight: 500;
					color: #E02020;
					line-height: 36rpx;
					margin-left: 20rpx;
					
				}
					
				 
			}
			.timeview{
				display: flex;
				flex-direction: row;
				margin-top: 12rpx;
				align-items: center;
				position: relative;
				image{
					width: 22rpx;
					height: 22rpx;
 					margin-left: 28rpx;
				}
				text{
					
 					font-size: 20rpx;
 					font-weight: 400;
					color: #666666;
					margin-left: 10rpx;
 				}
				.buynumber{
					position: absolute;
 					height: 34rpx;
					background: #F2F2F2;
					border-radius: 4rpx;
				text-align: center;
				font-size: 20rpx;
 				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
				padding-left:16rpx ;
				padding-right: 16rpx;
				right: 10rpx;
				}
				 
			}	
			.livelessonTitle{
				margin-top: 12rpx;
				margin-left: 22rpx;
				margin-right: 22rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				  overflow: hidden;
				    text-overflow: ellipsis;  /* 超出部分省略号 */
				   display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				    -webkit-line-clamp: 2; /** 显示的行数 **/
				     -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
					 margin-bottom: 30rpx;

 			}
		}
		.teacherView{
			
			background: #FFFFFF;
			border-radius: 4rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
				
			.sectionview{
				display: flex;
				flex-direction: row;
				align-items: center;
					margin-top: 14rpx;
				.iconview{
					
					width: 4rpx;
					height: 27rpx;
					background: #E02020;
					border-radius: 4rpx;
					margin-left: 20rpx;
				}
				text{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 40rpx;
					margin-left: 10rpx;
				}
			}
			.teacherscrollview{
				white-space: nowrap; // 滚动必须加的属性
				width: 100%;
				padding-top: 20upx;
				margin-bottom: 22rpx;	
				.item{
 					display: flex;
					flex-direction: column;
					align-items: center;
					margin-top: 20upx;
					margin-left: 24rpx;
            display: inline-block;
            vertical-align: top;
 					.teacherImage{
						display: inline-block;
						
						width: 100rpx;
						height: 100rpx;
                       border-radius: 50rpx;
					}
						
					text{
						display: block;
						
						font-size: 24rpx;
 						font-weight: 400;
						color: #333333;
						text-align: center;
  					}
				}
			}
			
		}
		.downloadView{
			display: flex;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 30rpx;
			background: #FFFFFF;
			border-radius: 4px;
			flex-direction: column;
 			position: relative;
			.sectionview{
				display: flex;
				flex-direction: row;
				align-items: center;
					margin-top: 14rpx;
				.iconview{
					
					width: 4rpx;
					height: 24rpx;
					background: #E02020;
					border-radius: 4rpx;
					margin-left: 20rpx;
				}
				text{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 40rpx;
					margin-left: 10rpx;
				}
			}
				
			.lineview{
				width: 100%;
				height: 2rpx;
				background:#F9F9F9 ;
				margin-top: 20rpx;
			}	
			.downLoadItemView{
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;
				.downImage{
					width: 22rpx;
					height: 22rpx;
					margin-left:20rpx ;
					margin-top: 46rpx;
					margin-bottom: 46rpx;
 				}
				.rightimage{
					width: 14rpx;
					height: 27rpx;
					position: absolute;
                   right: 26rpx;
 				}
				.downtitle{
 					font-size: 24rpx;
					font-weight: bold;
					color: #666666;
					margin-right: 100rpx;
					    text-overflow: ellipsis;  /* 超出部分省略号 */
					   display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					    -webkit-line-clamp: 1; /** 显示的行数 **/
					     -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
						 margin-left:12rpx ;
				
				}
					
				
			}
			.middleLineview{
				width: 100%;
				height: 2rpx;
				background:#F9F9F9 ;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
				
			 
				
			 
		}
			
		.lastview{
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 30rpx;
			margin-top: 30rpx;
			background: #FFFFFF;
			border-radius: 4rpx;
			padding-top: 20rpx; 
			padding-bottom: 30rpx;
			 .detailText{
				 margin-left: 24rpx;
				 margin-right: 24rpx;
				 margin-top: 20rpx;
				 font-size: 24rpx;
 				 color: #666666;
 			 }
				 
			 .studentBgview{
				 display: flex;
				 flex-direction: row;
					align-items: center;
					 margin-top: 30rpx;
					 margin-bottom: 30rpx;
				 image{
					 width: 68rpx;
					 height: 68rpx;
					 border-radius: 34rpx;
					 margin-left:38rpx ;
					 
				 }
				 text{
					 
					 font-size: 24rpx;
 					 font-weight: 400;
					 color: #000000;
					 margin-left:20rpx ;
 				 }
				 
			 }
		}
	.bottomview{
		height: 88rpx;
		width:100%;
 		 bottom: 0px;
		 right: 0px;
		 position: absolute;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
      justify-content: space-around;
	  align-items: center;
		  
	  .price{
		  font-size: 28rpx;
 		  font-weight: 600;
		  color: #E02020;
		  line-height: 40rpx;
	  }
			
		.favview{
			display: flex;
			align-items: center;
			flex-direction: row;
			image{
				width: 44rpx;
				height: 44rpx;
 				border-radius: 8rpx;
			}
			text{
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				line-height: 40rpx;
				margin-left: 10upx;
			}
				
			
			
		} 
	   
		  
	  .buy{
		  width: 214rpx;
		  height: 54rpx;
		  background: #D0D0D0;
		  border-radius: 28rpx;
		  font-size: 28rpx;
 		  font-weight: 400;
		  color: #FFFFFF;
		  line-height: 54rpx;
		  text-align: center;
	  }
	}
 .videoImageview{
	 display: flex;
	 flex-direction: row;
	 width: 100%;
 	align-items: center;
	position: relative;
 	image{
			width: 100%;
			height: 100%;
			background-color: #FF0000;
		} 
	 .playImageView{
		 
		 position: absolute;
  		 width: 100rpx;
		 height: 100rpx;
		 top: 50%;
		 left: 50%;
		 margin-top: -50rpx;
		 margin-left: -50rpx;
   		 background: #09BB07;
		 image{
			 width: 100rpx;
			 height: 100rpx;
			
		 }

	 }
 }
</style>
