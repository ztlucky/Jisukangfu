<template>
	<view class="contentview" :style="[{height:windowHeight+ 'px'}]">
		<video :style="[{width:videoWidth + 'px' },{height:videoHeight + 'px'}]" :src="videoUrl"  autoplay="true" v-show="promptVisible == false">
			 
		</video>
		<view :style="[{width:videoWidth + 'px' },{height:videoHeight + 'px'}]" class="controls-title" v-show="promptVisible == true">
			
		</view>
		<view class="middleview"  >
			<zzx-tabs  style="width:100%; height: 40px;margin-top: 10px;" :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" :activeColor="activeColor"
			:lineWidth="line_width" :lineColor="line_color">
			           </zzx-tabs>
				<!-- <text class="guanzhuview" style="width: 30%;height: 50px;">
					 添加关注</text>	 -->	  
		</view>
		<view class="xiaoxiview" :style="[{height:bottomheight+ 'px'}]" v-if="current == 0" >
			<scroll-view :scroll-y="true"  :style="[{height:scrollviewHeight+ 'px'}]" class="scrollview">
			  <view  class="item" v-for="(item, index) in messageList" :key="index" >
				<view class="itemviewLeft" v-if="item.sendId != userID" >
					<image src="../../../static/gongzuotai/icon_nan.png" mode="" class="messageIconView"></image>
					<view class="messageDetailview">
						 <text class="messageName"> {{item.createBy}}</text>
						 <view class="messageContent"> {{item.content}}</view>
						
					</view>
				</view>
				<view class="itemviewRight" v-if="item.sendId == userID" >
					
					<image  v-if="item.sendUser.headUrl.length>0" :src="item.sendUser.headUrl" mode="" class="messageIconView"></image>
					<image  v-if="item.sendUser.headUrl.length==0" :src="item.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'" mode="" class="messageIconView"></image>
					 
					<view class="messageDetailview">
						 <text class="messageName"> 我</text>
						 <view class="messageContent">  {{item.content}}</view>
						
					</view>
				</view>
			</view >  
				
				
			</scroll-view>
			<view class="inputview">
				<input   style="height: 32px;" v-model="inputvalue" :adjust-position="false" class="input" type="text" placeholder="在此处输入评论内容" />
				<text @click="sendMessage">发送</text>
			</view>

		</view>
		<image  class="dashangimgeview" src ="../../../static/zhibo/icon_dashang.png" mode="" @click="dashangAction"></image>
		<image  class="yaoqingimgeview" src ="../../../static/zhibo/icon_yaoqing.png" mode=""></image>
		<prompt :visible.sync="promptVisible" title="提示"  placeholder="请输入打赏金额" @confirm="clickPromptConfirm" mainColor="#0ED482">
 		</prompt>
	</view>

</template>

<script>
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	import Prompt from '@/components/zz-prompt/index.vue'
	import appShare from "@/plugins/share/index.js"
	var socketLive;
	var timer;
	export default {
		components: {
			Prompt
		
		},
		data() {
			return {
				videoHeight:0 ,
				videoWidth:0 ,
				userID:'',
				 
 				windowHeight:0,
				items:["互动","PPT" ,"老师介绍"],
				activeColor:'#000000',
				scrollviewHeight:0,
				 current:0,
				line_width:"9%",
 				line_color:'#31D880',
				streamName:'',
				liveid:'',
				videoUrl:'rtmp://ll.huaxiakangfu.com/JSKF/JSKF1337238485873983484?auth_key=1607673185570-0-0-46d9d982df9ac566afa71df0a770e46f',
				bottomheight:0,
			    messageList:[],
				inputvalue:"",
				promptVisible: false,
				dashangMoney:'',
				livetitle:'',
				
				
				 
				
			}
		},
		onHide:function(option){
			var that = this;
			this.$app.request({
				url: this.$api.user.removeuserFormessage,
				data: {
					object_id:that.liveid ,
					receive_id:getApp().globalData.userId,
					type:getApp().globalData.livesku
					
				},
				method: 'GET',
				dataType: 'json',
				success: res => {
					if (res.code ==200) {
					   
					 
					}
				},
				fail: res => {
				},
				complete: res => {
				}
			});
			
		},
		onLoad:function(option){
			// const item = {courseID:2,cover:this.cover,cost:this.detailInfo.cost,title:this.detailInfo.title,time:this.detailInfo.beginTime}
			  
			let objClone=  JSON.parse(decodeURIComponent(option.item))
 			this.liveid =   objClone.liveid
 			this.livetitle = objClone.title;
 			this.streamName = objClone.streamName;
 			this.userID = getApp().globalData.userId
  			var that = this;
   			
			uni.getSystemInfo({
				success(res) {
					 that.videoWidth = res.screenWidth
					 that.videoHeight = that.videoWidth/16.0*9 
  					 that.windowHeight = res.windowHeight
					 that.bottomheight = res.windowHeight-that.videoHeight-50
					 that.scrollviewHeight = that.bottomheight - 45
					 
				}
			})
			//增加看直播的人数
			this.refreshLiveCount();
			//获取直播拉流地址
			 this.getPullurl();
			 this.getmessageList();
			 this.time = setInterval(()=>{
				 this.getmessageList();
			 },1000*60);
			 this.addEvent();
			 this.connectSocket()
		},
		onUnload() {
			clearInterval(this.time);
			if (socketLive) {
				socketLive.close();
			}
		},
		onReady() {
			
		},
		methods: {
				connectSocket: function() {
					console.log(getApp().globalData.userId)
					socketLive = uni.connectSocket({
						
						url: "http://3237632k3k.goho.co/jeecg-boot/webSocket/"+getApp().globalData.userId,
						header: {},
						success: () => {
							console.log("connectSocket:初始化成功");
						},
						fail: (err) => {
							console.log("connectSocket:初始化失败");
							
							console.err(err);
						},
						complete: () => {}
					});
					uni.onSocketOpen(function(res){
						      console.log('WebSocket连接已打开！');
				
					})
					  uni.onSocketError(function (res) {
						  console.log(res);
						  
					      console.log('WebSocket连接打开失败，请检查！');
					    });
					socketLive.onOpen((res) => {
						console.log("打开连接成功");
						var data = JSON.stringify({
							event: "live",
							data: {
								type: 'login',
								token: uni.getStorageSync('token'),
							}
						});
						socketLive.send({
							// data: data,
							success: (res) => {
								console.log("直播间连接成功", res);
								timer = setInterval(() => {
									uni.sendSocketMessage({
										success: () => {
											//console.log("心跳发送成功");
										}
									});
								}, 2 * 1000);
							}
						})
					});
					socketLive.onMessage((res) => {
					
 					 
							//var data = JSON.parse(res.data);
						console.log("收到消息", res);
						
						  var data = JSON.parse(res.data);
						if (data.type == 'LS234') {
							 uni.showToast({
							 	title:'直播已结束',
								icon:'none'
							 })
						}
						if (data.type == 'ZB78965') {
							this.messageList.push(data)
							 
						}
						  
						// if (data.type == 'room-betting') {
						// 	console.log("下注消息");
						// 	this.addRoomMsg(data.data);
						// }
						// if (data.type == 'room-gift') {
						// 	this.addRoomMsg(data.data);
						// }
						// if (data.type == 'room-back') {
						// 	this.updateRoomOnline();
						// }
						// if (data.type == 'room-end') {
						// 	this.closeLive();
						// }
						// if (data.type == 'ping') {
						// 	//发送心跳
						// }
					});
					socketLive.onClose((res) => {
						console.log("直播间onClose");
					})
					socketLive.onError((res) => {
						console.log(res);
						
					})
				},					
			refreshLiveCount(){
				var that = this;
				this.$app.request({
					url: this.$api.zhibo.getOnlineNumber,	
					data: {
						count:1,
						live_id:that.liveid ,
						user_id:getApp().globalData.userId
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
 						console.log(res)
						 
					},
					fail: res => {
					},
					complete: res => {
					}
				});
			},
			share() {
				let shareData = {
					type: 0,
					shareUrl: `http://jskf.huaxiakangfu.com/app_share/index.html#/`,
					shareTitle: "极速康复",
					shareContent: "极速康复",
				};
				// 调用
				let shareObj = appShare(shareData, res => {
					console.log("分享成功回调", res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				
			},
			dashangAction(){
				this.promptVisible = true
			},
			 /**
			     * 点击弹出输入框确定
			     */
			clickPromptConfirm(val) {
				if(val.length == 0){
					uni.showToast({
						title:'请输入打赏金额',
						icon:'none'
					})
					return
				}
				this.dashangMoney = val;
				var that = this;
				this.$app.request({
					url: this.$api.dingdan.creatOrder,	
					data: {
 						customerId:getApp().globalData.userId,
						goodsId:this.liveid,
  						goodsSku:getApp().globalData.reword,
						originalPrice:parseFloat(this.dashangMoney)
					},
					method: 'POST',
					dataType: 'json',
					success: res => {
						this.promptVisible = false
 						console.log(res)
						if (res.code ==200) {
							  uni.showToast({
							  	title:'打赏成功',
								icon:'none'
							  })
							  
							  
 						}else{
							uni.showToast({
								title:res.message,
								 icon:'none'
							})
							
						}
					},
					fail: res => {
					},
					complete: res => {
					}
				});
			 
			    },
			sendMessage(){
					
				if(this.inputvalue.length == 0){
					uni.showToast({
						title:'评论内容不能为空',
						icon:'none'
					})
					return
				}
 				var that = this;
				this.$app.request({
					url: this.$api.zhibo.sendMessage,
					data: {
 						type:getApp().globalData.livesku,
						content:that.inputvalue,
						sendId:getApp().globalData.userId,
						createBy:getApp().globalData.userName,
						objectId:that.liveid,
					},
					method: 'POST',
					dataType: 'json',
					success: res => {
						if (res.code ==200) {
							that.inputvalue = "";
							uni.showToast({
								title:'发送成功',
								icon:'none'
							})
							that.getmessageList()
												 
						}
					},
					fail: res => {
					},
					complete: res => {
					}
				});
			},
			getmessageList(){
				var that = this;
				this.$app.request({
					url: this.$api.zhibo.getMessageList,
					data: {
						c_id:uni.getStorageSync('clientInfo').clientid,
						type:getApp().globalData.livesku,
						// sendId:getApp().globalData.userId,
						condition:true,
						objectId:that.liveid,
						column:'createTime',
						order:'asc'
						
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
 						if (res.code ==200) {
						   that.messageList =  res.result.records;
 						}
					},
					fail: res => {
					},
					complete: res => {
						
					}
				});
			},
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
			},
			addEvent(){
				let that = this;
				uni.$on('setMessageData',data=>{
					that.getmessageList();
				});
				console.log(' 开始监听')
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
	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}
	
   .contentview{
	display: flex;
	flex-direction: column;
	position: relative;
	   .controls-title {
	        width: 100%;
	        text-align: center;
	        color: #FFFFFF;
			background-color: #000000;
	    }
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
		.scrollview{
			background-color: #F7F7F7;
		}
		.item{
			.itemviewLeft{
 				margin-top: 20rpx;
					display: flex;
					flex-direction: row;
					padding-left: 30rpx;
					padding-right: 30rpx;
				.messageIconView{
 					margin-top: 20rpx;
					height: 68rpx;
					width: 68rpx;
					border-radius: 34rpx;
					 
					
				}
				.messageDetailview{
					display: flex;
					flex-direction: column;
 					 margin-left: 28rpx;
					 
					.messageName{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 34px;
						
					}
					.messageContent{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						max-width: 506rpx;
						min-width: 50rpx;
						background: #FFFFFF;
						border-radius: 8rpx;
						padding: 20rpx;
						
					}
				}
			}
			.itemviewRight{
				margin-top: 20rpx;
				display: flex;
				flex-direction: row-reverse;
				padding-left: 30rpx;
				padding-right: 30rpx;
			.messageIconView{
				margin-left: 30rpx;
				margin-top: 20rpx;
				height: 68rpx;
				width: 68rpx;
				border-radius: 34rpx;
				
			}
			.messageDetailview{
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				margin-left: 28rpx;
				 
				 
				.messageName{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 34px;
					
				}
				.messageContent{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					max-width: 506rpx;
					min-width: 50rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					padding: 20rpx;
					
				}
			}
			
			}
		}
		
		
		.inputview{
			display: flex;
			position: absolute;
			bottom: 10rpx;
			flex-direction: row;
			justify-content: center;
			.input{
				width: 552rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				border: 2rpx solid #E6E6E6;
				
				margin-left: 30rpx;
				padding-left: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
			}
			text{
				width: 120rpx;
				height: 60rpx;
				margin-left: 15rpx;
				background-color: #FFFFFF;
				border-color: #000000;
				border-width: 3rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 28rpx;
				border-radius: 10rpx;
				
				
			}
			 
		}
		
	}
}

</style>
