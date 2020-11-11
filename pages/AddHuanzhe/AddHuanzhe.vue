<template>
	<view>
		<scroll-view scroll-y="true"  :style="[{height:viewHeight + 'px'}]"  @scroll="scroll"  >
		<view class="topview">
			<image src="../../static/wodehuanzhe/bg_wodehuanzhe.png" class="topimageview" mode="aspectFill"></image>
				<text class="title1">请输入</text>	
					 <text class="title2">患者信息、诊断结果</text>
					 <view class="line1">
					 	
					 </view>
			<view class="topitemView"> 
				 <text class="huanzhexinxi"  >患者信息</text>
				  <view class="greenline">
				  	
				  </view>
 <text class="name">姓名</text>
		<input adjust-position="true" class="inputview" placeholder="请输入患者名字" v-model="huanzhename"/>	 
 <view class="sexview">
 	<image class="sexImage" @click="changeSelectIndex(1)" :src="selectIndex == 1?'../../static/wodehuanzhe/selectedcopy.png':'../../static/wodehuanzhe/unselectedcopy.png'"></image>
	<text :class="selectIndex ==1?'selecttext':'unselecttext'" @click="changeSelectIndex(1)"> 男</text>
	<image class="sexImage"  @click="changeSelectIndex(2)" :src="selectIndex == 2?'../../static/wodehuanzhe/selectedcopy.png':'../../static/wodehuanzhe/unselectedcopy.png'"></image>
	<text :class="selectIndex ==2?'selecttext':'unselecttext'"  @click="changeSelectIndex(2)">女</text>
 </view>
                      
										
		<text class="name">身份证号</text>
				<input adjust-position="true" class="inputview" placeholder="请输入患者身份证号" v-model="huanzheIDNumber"/>			  
				<text class="name">手机号</text>
						<input adjust-position="true" class="inputview" placeholder="请输入患者手机号" v-model="huanzheMobile"/>	
						<text class="name">地址</text>
								<pickers @address="address" @close="close">
									<view class="chooseshengshiqu">
										<input adjust-position="true" class="input" placeholder="请选择省市区" v-model="res" :disabled="true">
										
										</input>
 										<image src="../../static/wodehuanzhe/below.png" class="rightImage"></image>
									</view> 
						 
 								
 									
								</pickers>
								<textarea  @blur="bindTextAreaBlur" class="detailAdressView" placeholder="请输入详细地址"  style="height: 130px;" maxlength="-1" adjust-position="true"/>
		<text class="huanzhexinxi">患者信息</text>
		 <view class="greenline">
		 	
		 </view>
		<text class="name">病症</text>
		<yealuo-select class="inputview" 
		the-style="margin: 20upx auto;font-size: 46upx;  " 
		      
		        placeholder='请选择诊断结果' 
		        :binData="illnessData"
  		        overflow="hide"
		        @getBackVal="getBackVal"
		        :selectIco="false"
		        >
		        </yealuo-select>
				<view class="bottomview">
					<text class="baocun">保存</text>
					<text class="jixupingding" @click="pingdingAction">继续评定</text>
				</view>
		 

 			</view>
 		  
		</view>
		
		 </scroll-view>
 	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	    import yealuoInputs from '@/components/yealuo-select/yealuo-select.vue'

 	export default {
		components: {pickers,
		            yealuoInputs

 		},
		data() {
			return {
			    illnessData:[],
				viewHeight:0,
 				 huanzhename:'',
				 huanzheIDNumber:'',
				 huanzheMobile:'',
				 selectIndex:1,//1代表男2代表女
			 detailAdress:'',
 				//选中后的显示值
				res:"请选择省市区",
				selecValue: '双皮奶'

			}
		},
		onLoad:function(e){
			this.getillnessUserList();
			
		},
		onShow:function(){
		 
  			
			this.viewHeight =parseInt(this.$app.getwindowHeight())+parseInt(this.$app.getNaviBarHeight());
		 
		},
		methods: {
			//选中值传（值可自定义，初始id与value用|分割，根据实际用途定义）
		  getBackVal:function(e){
			                console.log(e)
			            },
         //获取病症 
		 getillnessUserList(){
		 this.$app.request({
		 		
		 		url: this.$api.huanzhe.getillnessList,
				//getApp().globalData.userId
		 		data: {
					pagenum:1,
					pagesize:10,
		 			userid:11 ,
 		 		},
		 		method: 'GET',
		 		success: res => {
		 			console.log(res)
		 				 
		 			if(res.code == 200){
		 				 //  this.illnessData = res.data.records;
 				  	// this.illnessData.concat(res.data.records);
					for (var i = 0; i < res.data.records.length; i++) {
						this.illnessData.push(res.data.records[i]);
 					}
						//  this.illnessData.push(res.data.records[1]);
						
						console.log("789789")
						
							console.log( this.illnessData)
									  
		 			}
		 			
		 		},
		 		fail: res => {
		 		},
		 		complete: res => {
		 			 
		 		}
		 	});
		 },
			address(e){
			  console.log("点击了确认")
			  this.res=e.value.join("-");
			},
			close(){
			  console.log("点击了取消")
			},
			changeSelectIndex(index){
				this.selectIndex = index;
			},
			 bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
						this.detailAdress = e.detail.value;
			        },
			 scroll: function(e) {
				 
 						if(e.detail.scrollTop >this.$app.getNaviBarHeight()){
							
							 uni.setNavigationBarColor({
							                      // 字体颜色 仅支持 #ffffff 和 #000000
							                      frontColor: '#ffffff',
							                      //     背景颜色值，有效值为十六进制颜色
							                      backgroundColor: '#31D880',
							                      // animation 结构
							                     animation: {
							                          // duration: 动画时间
							                          duration: 2000,
							                          // timingFunc:动画效果
							                              // linear    动画从头到尾的速度是相同的。
							                              // easeIn    动画以低速开始
							                              // easeOut    动画以低速结束。
							                             // easeInOut    动画以低速开始和结束
							                          timingFunc: 'easeIn'
							                      }
							                  });
							console.log(e.detail.scrollTop)
							
						}else{
							uni.setNavigationBarColor({
							                     // 字体颜色 仅支持 #ffffff 和 #000000
							                     frontColor: '#ffffff',
							                     // 背景颜色值，有效值为十六进制颜色
							                     backgroundColor: 'rgba(0,0,0,0)',
							                     // animation 结构
							                    animation: {
							                         // duration: 动画时间
							                         duration: 2000,
							                         // timingFunc:动画效果
							                             // linear    动画从头到尾的速度是相同的。
							                             // easeIn    动画以低速开始
							                             // easeOut    动画以低速结束。
							                            // easeInOut    动画以低速开始和结束
							                         timingFunc: 'easeIn'
							                     }
							                 });
						}
 			        },
			 pingdingAction(){
				 console.log('eeee')
				 uni.navigateTo({
				 	url:'../KangfuPingdingListPage/KangfuPingdingListPage',
					animationDuration:300,
					animationType:'slide-in-right'
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
<style scoped lang="scss">
		
	.topview{
		display: flex;
		flex-direction: column;
		position: relative;
		.topimageview{
			width: 100%;
			height: 562rpx;
		 } 
		 .title1{
			 
			 font-size: 32rpx;
			 font-family: PingFangSC-Regular, PingFang SC;
			 font-weight: 400;
			 color: #FFFFFF;
			 margin-left: 40rpx;
			 position: absolute;
			  top: 150rpx;
			 
 		 }
		 .title2{	 
		 			 font-size: 44rpx;
		 			 font-family: PingFangSC-Semibold, PingFang SC;
		 			 font-weight: 600;
		 			 color: #FFFFFF;
		 			 margin-left: 40rpx;
		 			 position: absolute;
		 			  top: 200rpx;
		 			 
		 }
		 .line1{
			width: 70rpx;
			height: 4rpx; 
			position: absolute;
			 top: 280rpx;
			 margin-left: 40rpx;
			 background-color: #FFFFFF;
		 }
		 
		 
		 .topitemView{
			 display: flex;
			 flex-direction: column;
			 position: absolute;
			 top: 360rpx;
		     left: 30rpx;
		     right: 30rpx;
			 margin-bottom:96rpx;
			 
   			 border-radius: 16rpx;
 		 	 background-color: #FFFFFF;	 
			 
 			 .huanzhexinxi{
				 
				 font-size: 36rpx;
				 font-family: PingFangSC-Semibold, PingFang SC;
				 font-weight: 600;
				 color: #333333;
				 margin-left: 38rpx;
				 margin-top: 78rpx;
				 
			 }
			 .greenline{
				 width: 64rpx;
				 height: 4rpx;
				 background: #2DD575;
				 border-radius: 5rpx;
				 margin-left: 38rpx;
				 margin-top: 18rpx;
			 }
			
		 .name{
			 
			 font-size: 32rpx;
			 font-family: PingFangSC-Regular, PingFang SC;
			 font-weight: 400;
			 color: #666666;
			 margin-left: 38rpx;
			 margin-top: 30rpx;
		   }
		   .inputview{
 				  height: 80rpx;
				  background: #F5F5F5;
				  border-radius: 8rpx;
				  margin-left:38rpx ;
				  margin-right: 38rpx;
				  padding-left:28rpx ;
				  margin-top: 20rpx;
				  font-size: 28rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #000000;	  
 			    
		   }
		   .chooseshengshiqu{
			   display: flex;
			   flex-direction: row;
			   position: relative;
			   align-items: center;
 			   margin-top: 20rpx;
			   .input{
				   height: 80rpx;
				   flex: 1;
 			   				  background: #F5F5F5;
			   				  border-radius: 8rpx;
 			   				  margin-right: 38rpx;
							  margin-left: 38rpx;
							  
			   				  padding-left:28rpx ;
			   				  font-size: 28rpx;
			   				  font-family: PingFangSC-Regular, PingFang SC;
			   				  font-weight: 400;
			   				  color: #000000;	  
			    			    
			   }
			  .rightImage{
			  					  width: 26rpx;
			  					  height: 26rpx;
			  					  position: absolute;
			  					  right: 50rpx;
			  }	 
		   }
			
			.chooseAdressView{
				height: 80rpx;
				background: #F5F5F5;
				border-radius: 8rpx;
				margin-left:38rpx ;
				margin-right: 38rpx;
				padding-left:28rpx ;
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 80rpx;
			}	
			  .detailAdressView{
				  width: 86.5%;
   				  margin-left: 38rpx;
				  margin-right: 380rpx;
  				  margin-top: 20rpx;
 				  background: #F5F5F5;
				  border-radius: 8rpx;
				  font-size: 28rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #000000;
				  padding-top: 20rpx;
				  padding-left: 20rpx;
			  }
			  .sexview{
				  display: flex;
				  flex-direction: row;
				  align-items: center;
				  margin-top: 40rpx;
				  .sexImage{
				  			  width: 24rpx;
				  			  height: 24rpx; 
							  margin-left: 38rpx;
 				  }
					  
				  .selecttext{
					  
					  font-size: 32rpx;
					  font-family: PingFangSC-Semibold, PingFang SC;
					  font-weight: 600;
					  color: #333333;
					  margin-left: 15rpx;
					  margin-right: 20rpx;
				  }
					  
				  .unselecttext{
					  font-size: 32rpx;
					  font-family: PingFangSC-Semibold, PingFang SC;
					  font-weight: 600;
					  color: #666666;
					  margin-left: 15rpx;
					  margin-right: 20rpx;
					  
				  }
			  } 
		.bottomview{
			margin-top: 52rpx;
						  display: flex;
						  flex-direction: row;
		   justify-content: space-around;
						margin-bottom: 68rpx;	 
						 .baocun{
							 width: 280rpx;
							 height: 80rpx;
							 border-radius: 40rpx;
							 border: 2px solid #2AD36B;
							 
							 font-size: 28rpx;
							 font-family: PingFangSC-Medium, PingFang SC;
							 font-weight: 500;
							 color: #2AD36B;
							 line-height: 80rpx;
		 					 text-align: center;
							 
						 } 
						 .jixupingding{
							 width: 280rpx;
							 height: 80rpx;
							 background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
							 background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
							 box-shadow: 0px 10rpx 14rpx 0rpx rgba(49, 216, 128, 0.33);
							 border-radius: 40rpx;
							 text-align: center;
							 font-size: 28rpx;
							 font-family: PingFangSC-Medium, PingFang SC;
							 font-weight: 500;
							 color: #FFFFFF;
							 line-height: 80rpx;
							 
						 }
		}
		  
		  }
			  
		  
	}

</style>
