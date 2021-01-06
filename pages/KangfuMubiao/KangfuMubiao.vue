<template>
	<view class="contentview">
		<scroll-view scroll-y="true" :style="[{height:mainscrollvieheight + 'px'}]" class="mainscrollview">
			<view class="bgview">
				<text class="title">短期目标</text>
				<textarea @blur="bindTextAreaBlur" class="duanqimubiao" placeholder="请输入患者的短期目标" style="height: 100px;" maxlength="-1"
				 v-model="duanqimubiao" adjust-position="true" />
				<text class="kuaijiebiaoqian">快捷标签</text>
			<view class="kuaijiebiaoqianview">
				<uni-grid :column="2"   :square="false"  :showBorder = "false" :highlight="false">
					<uni-grid-item  v-for="(item ,index) in kuaijiebianqianArray[kuaijiebianqianArrayIndex]" :key ="index" :index= "index"   >
					
					 <text  class="bianqiantext" @click="duanqikuaijiebianqianclick(index)">
					 	 
					 	 {{item}} 
					 						 
					 </text>
					 	
					 </uni-grid-item>
				</uni-grid>
			</view>
			<view class="huanyipi">
				<view class="centerview" @click="setStatus(1)">
					<image src="../../icon_gongzuotai_xuanzhong.png"class="image"></image>
					<text class="text">换一批</text>					
				</view>
			</view>
			<text class="title">长期目标</text>
			<textarea  @blur="bindChangqiTextAreaBlur" class="duanqimubiao" placeholder="请输入患者的长期目标"  style="height: 100px;" maxlength="-1" v-model="changqimubiao"
			 adjust-position="true"/>
			<text class="kuaijiebiaoqian">快捷标签</text>
			<view class="kuaijiebiaoqianview">
				<uni-grid :column="2"  :square="false"   :showBorder="false"  :highlight="false">
					<uni-grid-item  v-for="(item ,index) in (kuaijiebianqianArray1[kuaijiebianqianArrayIndex1])" :key ="index" :index= "index" >
					
					 <text  class="bianqiantext" @click="duanqikuaijiebianqianclick1(index)">{{item}} </text>
					 	
					 </uni-grid-item>
				</uni-grid>
			</view>
			<view class="huanyipi">
				<view class="centerview" @click="setStatus(2)">
					<image src="../../icon_gongzuotai_xuanzhong.png"class="image"></image>
					<text class="text">换一批</text>
					
				</view>
			</view>
		</view>
	</scroll-view>
 		<view class="saveBtn" @click="save">保存</view>
		<s-popup custom-class="demo-popup" position="center" v-model="visible">
			<view class="bgtanchuangview">
				<text class="greenBtn">设立目标</text>
				<text class="greenBtn">继续评定</text>
				<text class="whiteBtn">结束评定</text>
				
			</view>
		</s-popup>
	</view>
	
</template>

<script>
	import sPopup from '../../components/s-popup/index.vue';
	import request from "../../utils/util.js"
	export default {
		 components: {
		    sPopup
		  },
		data() {
			return {   
				status:1,
				status1:1,
				visible: false,
				kuaijiebianqianArrayIndex:0,
				kuaijiebianqianArrayIndex1:0,
				mainscrollvieheight:0,
				duanqimubiao:'',
				changqimubiao:'',
				kuaijiebianqianNowIndex:-1,
				kuaijiebianqianNowIndex1:-1,
				kuaijiebianqianArray:[
					['坐位静态平衡达二级',
					'独立站立30秒',
					'可独立站立两分钟以上',
					'可单腿站立30秒',
					'在辅助下可行走10米',
					'可独立行走5米'],
					['可独立行走20米以上',
					'会独自翻身',
					'可自己由坐位到站立位',
					'上肢可上举90度以上',
					'肘关节可做分离运动',
					'手指可抓握乒乓球大小的东西']
				],
				kuaijiebianqianArray1:[
					['可实现基本自理',
					'可独自如厕',
					'可独自穿衣',
					'可单独行走100米以上',
					'上肢关节活动度基本正常',
					'可独自站立5分钟以上'],
					['能够独立吃饭',
					'吃饭不呛咳',
					'能够独自上下楼梯',
					'能够表达简单的言语']
				]
			}
		},
		onLoad(options) {
			this.id = options.id?options.id:0;
		},
		onShow:function(){
	      this.mainscrollvieheight = this.$app.getwindowHeight()-100
		},
		methods: {
			bindTextAreaBlur: function (e) {
				this.duanqimubiao = e.detail.value;
		   },
		   bindChangqiTextAreaBlur: function (e) {
				this.changqimubiao = e.detail.value;
			}, 
		  duanqikuaijiebianqianclick(index){
			  this.duanqimubiao = this.kuaijiebianqianArray[this.kuaijiebianqianArrayIndex][index];
			  this.kuaijiebianqianNowIndex = index;
		  }, 
		  duanqikuaijiebianqianclick1(index){
			  this.changqimubiao = this.kuaijiebianqianArray1[this.kuaijiebianqianArrayIndex1][index];
			  this.kuaijiebianqianNowIndex1 = index;
		  },
		  changqikuaijiebianqianclick(index){		  
			this.changqimubiao = this.kuaijiebianqianArray[index]						  
		  },
		  setStatus(type){
			  if(type == 1){
				  if(this.kuaijiebianqianArray.length-1 == this.kuaijiebianqianArrayIndex){
					  this.status = -1;
				  }else if(this.kuaijiebianqianArrayIndex == 0){
					  this.status = 1;
				  }
				  this.kuaijiebianqianArrayIndex += this.status;
			  }else{
				  if(this.kuaijiebianqianArray1.length-1 == this.kuaijiebianqianArrayIndex1){
				  					  this.status1 = -1;
				  }else if(this.kuaijiebianqianArrayIndex1 == 0){
				  					  this.status1 = 1;
				  }
				  this.kuaijiebianqianArrayIndex1 += this.status1;
			  }
		  },
		  save(){
			  let that = this;
			  if(this.duanqimubiao == ''){
				  uni.showToast({
				  	title:'请填写短期目标',
				  	duration:1500,
				  	icon:"none"
				  });
				  return false;
			  }else if(this.changqimubiao == ''){
				  uni.showToast({
				  	title:'请填写长期目标',
				  	duration:1500,
				  	icon:"none"
				  });
				  return false;
			  }
			  
			  return request({
				  url:getApp().$api.huanzhe.editHuanZhe,
				  type:'PUT',
				  data:{
					  id:that.id,
					  shortTermGoals:that.duanqimubiao,
					  longTermGoals:that.changqimubiao
				  }
			  }).then(()=>{
				  uni.showToast({
				  	title:'保存成功',
				  	duration:1500
				  })
				  setTimeout(()=>{
				  	uni.navigateBack();
				  },1500)
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
	
.contentview{
	display: flex;
	flex-direction: column;
		
	.mainscrollview{
		display: flex;
		flex-direction: column;
 		.bgview{
			margin-left: 40rpx;
			margin-right: 40rpx;
			margin-top: 30rpx;
			padding-bottom: 48rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 30rpx 0px rgba(229, 229, 229, 0.5);
			border-radius: 24rpx;
			display: flex;
			flex-direction: column;
				
			.title{
				
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-left:40rpx ;
				margin-top: 58rpx;
			}
				
			.duanqimubiao{
				width:540rpx;
				background: #F6F6F6;
				border-radius: 10px;
				border: 2rpx solid #EAEAEA;
				margin-left: 40rpx;
				margin-top: 28rpx;
				padding: 24rpx;
			}
				
			.kuaijiebiaoqian{
				
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 34rpx;
				margin-left: 40rpx;
				margin-top: 16rpx;
			}
			.kuaijiebiaoqianview{
  					margin-top: 10rpx;
					padding-left: 25rpx;
					padding-right: 25rpx;
				.bianqiantext{
					height: 50rpx;
					  margin-top: 12rpx;
 					margin-left: 15rpx;
					margin-right: 15rpx;
					border-radius: 10rpx;
					border: 2rpx solid #F0F0F0;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					padding-left:24rpx ;
					line-height: 50rpx;				 
					    overflow: hidden;
					    text-overflow: ellipsis;  /* 超出部分省略号 */
					   display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					    -webkit-line-clamp: 1; /** 显示的行数 **/
					     -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

					
				}
			}
				
			.huanyipi{
				display: flex;
				flex-direction: column;
				align-items:center ;
				height: 56rpx;
 				margin-top: 10rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				border-radius: 10rpx;
				border: 2rpx solid #F0F0F0;
					
				.centerview{
					display: flex;
					flex-direction: row;
					align-items: center;
					.image{
						width:24rpx ;
						height: 24rpx;
					}
					.text{
						
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						height: 56rpx;
						line-height: 56rpx;
						margin-left: 15rpx;
					}
				}
			
			}
		}
	}
	.demo-popup{
		z-index: 5;
	  .bgtanchuangview{
		  display: flex;
		  flex-direction: column;
		  justify-content: center;
		  align-items: center;
  		 width: 586rpx;
  		 height: 712rpx;
 		 border-radius: 21rpx;
  		 
		 .greenBtn{
		 		  width: 362rpx;
		 		  height: 80rpx;
		 		  background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		 		  box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		 		  border-radius: 40rpx;
		  		  font-size: 28rpx;
		 		  font-family: PingFangSC-Medium, PingFang SC;
		 		  font-weight: 500;
		 		  color: #FFFFFF;
		 		  line-height:80rpx;
		 		  text-align: center;
				  margin-top: 40rpx;
 		 		  
		 }
		 .whiteBtn{
			 width: 362rpx;
			 height: 80rpx;
			 box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
			 border-radius: 40rpx;
			 border: 2rpx solid #29D267;
			 
 			 font-size: 28rpx;
			 font-family: PingFangSC-Medium, PingFang SC;
			 font-weight: 500;
			 color: #00D67B;
			 line-height: 80rpx;
			 text-align: center;
			 margin-top: 40rpx;
		 }
	  }
	 
	}
  	.saveBtn{
		display:flex;
		flex-direction: column;
		align-items: center;
 		margin-left:76rpx ;
		margin-right: 76rpx;
		margin-top: 60rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		height:80rpx ;
		line-height:80rpx ;
		text-align: center;
		
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
 		//bottom: 60rpx;
 	}
}

</style>
