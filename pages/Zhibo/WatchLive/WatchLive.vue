<template>
	<view class="contentview" :style="[{height:windowHeight+ 'px'}]">
		<video :style="[{width:videoWidth + 'px' },{height:videoHeight + 'px'}]" :src="videoUrl"  autoplay="true"></video>
		<view class="middleview"  >
			<zzx-tabs  style="width:70%; height: 40px;margin-top: 10px;" :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" :activeColor="activeColor"
			:lineWidth="line_width" :lineColor="line_color">
			           </zzx-tabs>
				<text class="guanzhuview" style="width: 30%;height: 50px;">
					 添加关注</text>		  
		</view>
		<view class="xiaoxiview" :style="[{height:bottomheight+ 'px'}]" v-if="current == 0" >
			<view class="inputview">
				<input v-model="danmuValue" :adjust-position="true" class="input" type="text" placeholder="在此处输入弹幕内容" />
				<text>发送</text>
			</view>

		</view>
		<image  class="dashangimgeview" src ="../../../static/zhibo/icon_dashang.png" mode=""></image>
		<image  class="yaoqingimgeview" src ="../../../static/zhibo/icon_yaoqing.png" mode=""></image>
		
	</view>
</template>

<script>
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	
	export default {
		data() {
			return {
				videoHeight:0 ,
				videoWidth:0 ,
				danmuValue:"",
				windowHeight:0,
				items:["互动","PPT" ,"老师介绍"],
				activeColor:'#000000',
				 current:0,
				line_width:"9%",
				line_color:'#31D880',
				streamName:'',
				videoUrl:'rtmp://ll.huaxiakangfu.com/JSKF/JSKF1337238485873983484?auth_key=1607673185570-0-0-46d9d982df9ac566afa71df0a770e46f',
				bottomheight:0
				
			}
		},
		onLoad:function(e){
			this.streamName = e.streamName;
 			var that = this;
			uni.getSystemInfo({
				success(res) {
					 that.videoWidth = res.screenWidth
					 that.videoHeight = that.videoWidth/16.0*9 
  					 that.windowHeight = res.windowHeight
					 that.bottomheight = res.windowHeight-that.videoHeight-50
					 
				}
			})
			//获取直播拉流地址
			 this.getPullurl();
		},
		onReady() {
			
		},
		methods: {
			onClickItem(e){
				if (this.current !== e.currentIndex) {
				    this.current = e.currentIndex;
				}
			},
		
			//获取直播拉流地址
			getPullurl(){
				var that = this;
				this.$app.request({
					url: this.$api.zhibo.livePullurl,
					data: {
						'流名称':this.streamName 
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						if (res.code ==200) {
						   that.videoUrl =  res.result.Strp;
							console.log(res.result)
						 
						}
					},
					fail: res => {
					},
					complete: res => {
					}
				});
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
	.dashangimgeview{
		width:62rpx;
		height: 62rpx;
		position: absolute;
		z-index: 9999;
		bottom: 220rpx;
		right: 30rpx;
 	}
	
	.yaoqingimgeview{
		width: 62rpx;
		height: 62rpx;
		position: absolute;
		z-index: 9999;
		bottom: 150rpx;
		right: 30rpx;
 	}
	.middleview{
		display: flex;
		flex-direction: row;
 		 align-items: center;
		 background-color: #FFFFFF;
		.guanzhuview{
			display: flex;
			align-items: center;
 			justify-content: center;
			background-color: #31D880;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
   		}
	}
	.xiaoxiview{
		display: flex;
		flex-direction: column;
		position: relative;
		.inputview{
			display: flex;
			position: absolute;
			bottom: 10rpx;
			flex-direction: row;
			.input{
				width: 552rpx;
				height: 64rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #E6E6E6;
				
				margin-left: 30rpx;
				padding-left: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
			}
			 
		}
		
	}
}

</style>
