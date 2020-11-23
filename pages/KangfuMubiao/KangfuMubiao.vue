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
					<uni-grid-item  v-for="(item ,index) in kuaijiebianqianArray" :key ="index" :index= "index"   >
					
					 <text  class="bianqiantext" @click="duanqikuaijiebianqianclick(index)">
					 	 
					 	 {{item}} 
					 						 
					 </text>
					 	
					 </uni-grid-item>
				</uni-grid>
			</view>
			<view class="huanyipi">
				<view class="centerview">
					<image src="../../icon_gongzuotai_xuanzhong.png"class="image"></image>
					<text class="text">换一批</text>					
				</view>
			</view>
			<text class="title">长期目标</text>
			<textarea  @blur="bindChangqiTextAreaBlur" class="duanqimubiao" placeholder="请输入患者的长期目标"  style="height: 100px;" maxlength="-1" v-model="changqimubiao"
			 adjust-position="true"/>
			<text class="kuaijiebiaoqian">快捷标签</text>
			<view class="kuaijiebiaoqianview">
				<uni-grid :column="2"  :square="false"   :showBorder="false" @change="duanqikuaijiebianqianclick" :highlight="false">
					<uni-grid-item  v-for="(item ,index) in kuaijiebianqianArray" :key ="index" :index= "index" >
					
					 <text  class="bianqiantext" @click="changqikuaijiebianqianclick(index)">
					 	 
					 	 {{item}} 
					 						 
					 </text>
					 	
					 </uni-grid-item>
				</uni-grid>
			</view>
			<view class="huanyipi">
				<view class="centerview">
					<image src="../../icon_gongzuotai_xuanzhong.png"class="image"></image>
					<text class="text">换一批</text>
					
				</view>
			</view>
		</view>
	</scroll-view>
 		<view class="saveBtn">保存</view>
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

	export default {
		 components: {
		    sPopup
		  },
		data() {
			return {   
				
				visible: false,

				mainscrollvieheight:0,
				duanqimubiao:'',
				changqimubiao:'',
				kuaijiebianqianArray:['平稳站立30s',
				'永久站立，跑五公里',
				'马拉松比赛拿到名次',
				'平稳站立30s马拉松比赛拿到名次',
				'永久站立，跑五公里',
				'马拉松比赛拿到名次马拉松比赛拿到名次马拉松比赛拿到名次']
			}
		},
		onShow:function(){
	      this.mainscrollvieheight = this.$app.getwindowHeight()-100
		},
		methods: {
			bindTextAreaBlur: function (e) {
			           console.log(e.detail.value)
									this.duanqimubiao = e.detail.value;
			       },
				   bindChangqiTextAreaBlur: function (e) {
				              console.log(e.detail.value)
				   						this.changqimubiao = e.detail.value;
				          },
							  
						  duanqikuaijiebianqianclick(index){
							  console.log(this.duanqimubiao)
							  
							  this.duanqimubiao = this.kuaijiebianqianArray[index]
							  
						  },
						  changqikuaijiebianqianclick(index){
 						  							  
						  							  this.changqimubiao = this.kuaijiebianqianArray[index]
						  							  
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
