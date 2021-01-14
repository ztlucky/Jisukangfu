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
				<text class="guanzhuview" style="width: 30%;height: 50px;" v-if="isConcern ==false" @click="favAction()">
					 + 关注</text>	
						   <text class="guanzhuview" style="width: 30%;height: 50px;" v-if="isConcern ==true" @click="favAction()">
						   	 已关注</text>
		</view>
		<view class="xiaoxiview" :style="[{height:bottomheight+ 'px'}]" v-if="current == 0" >
			<scroll-view  scroll-with-animation="true" @scroll="scroll"
			 id="scrollview" scroll-y="true"  :style="[{height:scrollviewHeight+ 'px'}]" class="scrollview" :scroll-top="scrollTop" @scrolltolower="lower">
			  <view  class="m-item" v-for="(item, index) in messageList" :key="index" >
				<view class="itemviewLeft" v-if="item.sendId != userID" >
					<image src="../../../static/gongzuotai/icon_nan.png" mode="" class="messageIconView"></image>
					<view class="messageDetailview">
						 <text class="messageName"> {{item.createBy}}</text>
						 <view class="messageleftTime">{{item.createTime}}</view>
						 
						 <view class="messageContent"> {{item.content}}</view>
						
					</view>
				</view>
				<view class="itemviewRight" v-if="item.sendId == userID" >
					
					<image  v-if="item.sendUser.headUrl.length>0" :src="item.sendUser.headUrl" mode="" class="messageIconView"></image>
					<image  v-if="item.sendUser.headUrl.length==0" :src="item.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'" mode="" class="messageIconView"></image>
					 
					<view class="messageDetailview">
						 <text class="messageName"> 我</text>
						 <view class="messageTime">{{item.createTime}}</view>
						 
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
		<image  class="yaoqingimgeview" src ="../../../static/zhibo/icon_yaoqing.png" mode="" @click="share"></image>
		<prompt :visible.sync="promptVisible" title="提示"  placeholder="请输入打赏金额" @confirm="clickPromptConfirm" mainColor="#0ED482">
 		</prompt>
	</view>

</template>

<script>
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	import Prompt from '@/components/zz-prompt/index.vue'
	import appShare from "@/plugins/share/index.js"
	import request from '../../../utils/util.js'
	
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
				scrollBottom:false,
				dashangMoney:'',
				livetitle:'',
				page:1,
				scrollTop:0,
				concern_id:'',
				style:{
					pageHeight:0,
					contentViewHeight:0
				},
				isConcern:false,
				couponCode:'',
				invitationCode:'',
				invitationCodeCount:'',
				invitationCodeUsedCount:'',
				couponCount:0,
				couponUsedCount:0,
				presentation:''
				 
				
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
			console.log(option.item)
			// const item = {courseID:2,cover:this.cover,cost:this.detailInfo.cost,title:this.detailInfo.title,time:this.detailInfo.beginTime}
			  if(option.item){
				  let objClone=  JSON.parse(decodeURIComponent(option.item))
				  this.liveid =   objClone.liveid
				  this.livetitle = objClone.title;
				  this.streamName = objClone.streamName;
				  this.userID = getApp().globalData.userId
				  this.isConcern = objClone.isConcern
				  this.concern_id = objClone.concern_id
				  this.couponCode = objClone.couponCode
				  this.invitationCode = objClone.invitationCode
				  this.invitationCodeCount = objClone.invitationCodeCount
				  this.invitationCodeUsedCount = objClone.invitationCodeUsedCount
				  this.couponCount = objClone.couponCount
				  this.couponUsedCount = objClone.couponUsedCount
				  this.presentation = objClone.presentation
				   
				 
				  
				  
			  }
			
  			var that = this;
   		
			uni.getSystemInfo({
				success(res) {
					 that.videoWidth = res.screenWidth
					 that.videoHeight = that.videoWidth/16.0*9 
  					 that.windowHeight = res.windowHeight
					 that.bottomheight = res.windowHeight-that.videoHeight-50
					 that.scrollviewHeight = that.bottomheight - 45
					 that.style.pageHeight = that.scrollviewHeight;
					 that.style.contentViewHeight = that.scrollviewHeight;
				}
			})
			//增加看直播的人数
			this.refreshLiveCount();
			//获取直播拉流地址
			 this.getPullurl();
			 this.getmessageList();
			 // this.time = setInterval(()=>{
				//  this.getmessageList();
			 // },1000*60);
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
			//添加收藏
			favAction() {
				let that = this;
				if (that.isConcern == true) {
					//取消关注
					this.$app.request({
						url: getApp().$api.zhibo.cancelGuanzhu,
						method: 'GET',
						data: {
							user_id: getApp().globalData.userId,
							concern_id:this.concern_id
 						},
						dataType: 'json',
						success: res => {
							if (res.code == 200) {
								that.isConcern = false;
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							}
						},
						complete: res => {}
					});
			
				} else {
					//添加收藏
			console.log(getApp().globalData.userId)
			console.log( this.concern_id)
					this.$app.request({
						url: getApp().$api.zhibo.guanzhu,
						method: 'POST',
						data: {
							userId: getApp().globalData.userId,
							concernId: this.concern_id,
 						},
						dataType: 'json',
						success: res => {
							if (res.code == 200) {
								that.isConcern = true;
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							}
						},
						complete: res => {}
					});
			
				}
			
			},
			  lower: function(e) {
 				  this.scrollBottom = true;
				 // this.page = 1;
				  this.getmessageList()
 			        },
			scroll(event) {
 							//距离每个边界距离
							if(event.detail.scrollTop == 0){
								this.page=this.page+1
							this.scrollBottom = false,
							this.getmessageList()
							}
						},
				connectSocket: function() {
					console.log(getApp().globalData.userId)
					var that = this
					socketLive = uni.connectSocket({
						
						url: getApp().globalData.BaseUrl+"webSocket/"+getApp().globalData.userId,
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
								that.scrollToBottom()
								
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
						  console.log("收到消息", data);
						  
						if (data.type == 'LS234') {
							 uni.showToast({
							 	title:'直播已结束',
								icon:'none'
							 })
						}
						if (data.type == 'ZB78965') {
							that.messageList.push(data)
							console.log(that.messageList)
							 that.scrollToBottom()
							 
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
				let goodsId = this.liveid;
				let rebateType = getApp().globalData.livesku;
				
				let couponCode = this.couponCode;
				let invitationCode = this.invitationCode;
				if (this.invitationCodeCount == this.invitationCodeUsedCount) {
					invitationCode = 0
				}
				if (this.couponCount == this.couponUsedCount) {
					couponCode = 0
				}
				let name = uni.getStorageSync('name');
				let that = this;
				return request({
					url: getApp().$api.share.rebate,
					data: {
						goodsId,
						rebateType
					},
					type: "POST"
				}, false).then(res => {
					let result = res.result;
					let shareData = {
						type: 0,
						shareUrl: ` http://jskf.huaxiakangfu.com/app_share/index.html#/?id=${goodsId}&rebateType=${rebateType}&couponCode=${couponCode}&invitationCode=${invitationCode}&rebateCode=${result}`,
						shareTitle: `${name}: 分享了直播《${that.livetitle}》`,
						shareContent: "直播简介: " + that.presentation,
						shareImg:'../../../static/logo.png'
						
					};
					console.log(shareData)
					// 调用
					let shareObj = appShare(shareData, res => {
						console.log("分享成功回调", res);
						// 分享成功后关闭弹窗
						// 第一种关闭弹窗的方式
						closeShare();
					});
					// setTimeout(() => {
					// 	// 第二种关闭弹窗的方式
					// 	shareObj.close();
					// }, 5000);
				})
				
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
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
							that.style.mitemHeight = 0;
							console.log(res)
							if(res[0].length==0){
															console.log("oooo")
							setTimeout(() => {
							that.scrollToBottom()
								 
							}, 400)
							 return
							}
							res[0].forEach((rect) =>
							that.style.mitemHeight = that.style.mitemHeight + rect.height + 40
						
							) //获取所有内部子元素的高度
							// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
 							
							setTimeout(() => {
 			console.log(that.style.contentViewHeight )
 								if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) { //判断子元素高度是否大于显示高度
 								
									that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
								}
							}, 1000)
						})
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
							//that.getmessageList()
												 
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
				let mess = [];
				uni.showLoading({
					 
				});
				console.log(this.page)
				 
				this.$app.request({
					url: this.$api.zhibo.getMessageList,
					data: {  
						c_id:uni.getStorageSync('clientInfo').clientid,
						type:getApp().globalData.livesku,
					    //sendId:getApp().globalData.userId,
 						objectId:that.liveid,
						column:'createTime',
						order:'desc',
						page:1,
						pageSize: that.page*20,
						condition:true
						
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						console.log(res)
						uni.hideLoading()
 						if (res.code ==200) {
 								that.messageList = res.result.records
							 
 						   if(that.scrollBottom == true){
							    that.scrollToBottom()
							   
						   }
 						}
					},
					fail: res => {
						uni.hideLoading()
						
					},
					complete: res => {
						uni.hideLoading()
						
						
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
		.m-item{
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
					 .messageleftTime{
					  	width: 450rpx;
					   	font-size:20rpx;
					 	font-family: PingFangSC-Regular, PingFang SC;
					 	font-weight: 400;
					 	color: #656565;
					 	text-align: left;
					 	margin-top: 10rpx;
					 	
					 }
					.messageName{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 34rpx;
						margin-top: 20rpx;
						
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
						margin-top: 10rpx;
						
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
					line-height: 34rpx;
					margin-top: 10rpx;
 					
				}
				.messageTime{
				 	width: 450rpx;
				  	font-size:20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #656565;
					text-align: right;
					margin-top: 10rpx;
					
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
					margin-top: 10rpx;
					
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
