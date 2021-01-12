<template>
	<view class="bgview">
		<nav-bar bgColor="#FFFFFF" fontColor="#333333" title="直播详情">
			<image slot="right" class="rightImage" @click="share" src="/static/share.png"></image>
		</nav-bar>
		  <scroll-view scroll-y="true" :style="[{height:scrollviewHeight + 'px',paddingBottom:'120rpx'}]"   >  
			<view class="videoImageview" :style="[{height:videoImageHeight + 'px'}]">
				<image v-if="!showVideo" :src="detailInfo.cover" mode="aspectFill" :style="[{height:videoImageHeight + 'px'}]"></image>
				<!-- <video v-else :src="videoUrl" initial-time='0'></video> -->
			</view>
			<video v-if="showVideo" class="videoImageviewVideo" :style="[{height:videoImageHeight + 'px',top:66+'px'}]" :src="videoUrl"
			 initial-time='0'></video>
			<view class="secondView">
				<view class="priceview">
					<text class="price1">¥</text>
					<text class="price">{{detailInfo.cost}}</text>
					<text class="huiyuanprice">会员价：¥ {{detailInfo.memberCost}}</text>
				</view>
				<view class="tipview">
					<text class="tiptext">会员价¥ {{detailInfo.memberCost}}</text>
					<text class="tiptext">直播结束后可回放</text>
				</view>
				<view class="timeview">
					<image src="../../../static/zhibo/icon_shijian.png"></image>
					<text>{{detailInfo.startTime}}</text>
					<text class="buynumber">{{detailInfo.buyCount}}人购买</text>
				</view>
				<text class="livelessonTitle">{{detailInfo.title}}</text>
			</view>
			<!-- //讲师 -->

			<view class="teacherView">
				<view class="sectionview">
					<view class="iconview">

					</view>
					<text>讲师</text>
				</view>
				<scroll-view scroll-x="true" class="teacherscrollview">
					<block v-for="(item, index) in detailInfo.lecturerList" :key="index">
						<view class="item" @click="openInfo(item.id)">

							<image class="teacherImage" :src="item.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"
							 mode="">
							</image>
							<text>{{item.name}}</text>
						</view>
					</block>
				</scroll-view>
			</view>

			<!-- 下载课件 -->
			<view class="downloadView" v-if="pdfFile.length !=0 || videoFile.length !=0">
				<view class="sectionview">
					<view class="iconview">

					</view>
					<text>课件</text>
				</view>
				<view class="lineview">

				</view>
				<view class="downLoadItemView" @click="openFile(item.value)" v-for="(item , index) in pdfFile" :key="index">
					<image src="../../../static/zhibo/icon_pdf.png" class="downImage"></image>
					<text class="downtitle">{{item.name}}</text>
					<image class="rightimage" src="../../../static/zhibo/icon_jiantou1.png"></image>
				</view>
				<view class="middleLineview">

				</view>
				<view class="downLoadItemView" @click="setVideoUrl(true,item.value)" v-for="(item , index) in videoFile" :key="index+100">
					<image src="../../../static/zhibo/icon-shipin.png" class="downImage"></image>
					<text class="downtitle">{{item.name}}</text>
					<image class="rightimage" src="../../../static/zhibo/icon_jiantou1.png"></image>
				</view>
			</view>
			<!-- 选择 -->
			<view class="lastview">
				<zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" :activeColor="activeColor"
				 :lineWidth="line_width" :lineColor="line_color">
				</zzx-tabs>
				<view class="detailText" v-show="current === 0">{{detailInfo.presentation}}</view>
				<view v-show="current === 1">
					<scroll-view id="scrollview" :scroll-top="scrollTop" class="messageView"   scroll-y="true"   @scroll="scroll" @scrolltolower="lower">
						<view class="m-item" v-for="(item , index) in messageList" :key="index" :id="index == messageList.length -1?'end':'aa'+index">
							<view class="messageItem messageLeft" v-if="item.sendId != userid">
								<image :src="item.sendUser.headUrl" mode="aspectFill" class="messageItemImage"></image>
								<view class="messageItemName">
									<view class="messageItemNameTitle hidden">{{item.sendUser.name}}</view>
									<view class="messageItemNameText">{{item.content}}</view>
								</view>
							</view>

							<view class="messageItem messageRight" v-if="item.sendId == userid">
								<view class="messageItemName">
									<view class="messageItemName">
										<view class="messageItemNameTitle hidden">我</view>
										<view class="messageItemNameText">{{item.content}}</view>
									</view>
								</view>
								<image :src="item.sendUser.headUrl?item.sendUser.headUrl:item.sendUser.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"
								 mode="aspectFill" class="messageItemImage"></image>

							</view>

						</view>

						<view class="messageInput" v-if="isbuy || detailInfo.userId == userid">
							<input placeholder="请输入您的留言" v-model="messageValue" />
							<view class="sendMessage" :class="messageValue?'sendMessage_':''" @click="sendMessage">发送</view>
						</view>
					</scroll-view>
				</view>



			</view>
		  </scroll-view>  
		<view class="bottomview" v-if="current == 0">
			<text class="price">原价 ¥ {{detailInfo.cost}}/会员价 ¥ {{detailInfo.memberCost}}</text>
			<view class="favview" @click="favAction">
				<image :src="isfav == true ?'../../../static/zhibo/icon_yishoucang.png':'../../../static/zhibo/icon_shoucang.png'"></image>
				<text>收藏本课</text>
			</view>
			<text class="buy" :style="{background:buyBackColor}" @click="comfirmOrder">{{buyBtnText == '已购买'?detailInfo.status == 1?'进入直播':buyBtnText:buyBtnText}}</text>
		</view>
		<!-- <view class="showVideo" v-if="showVideo">
			<view class="showVideoView" @click="setVideoUrl(false)"></view>
			<video :src="videoUrl" initial-time='0'></video>
		</view> -->
	</view>

</template>

<script>
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	import request from '../../../utils/util.js'
	import navBar from "@/components/zhouWei-navBar/index.vue"
	import appShare from "@/plugins/share/index.js"
	export default {
		components: {
			zzxTabs,
			navBar
		},
		data() {
			return {
				courseID: '',
				videoImageHeight: 411,
				scrollviewHeight: 0,
				items: ["详情", "评论"],
				detailInfo: '',
				isfav: false,
				cover: "", //封面
				activeColor: '#000000',
				current: 0,
				line_width: "8%",
				line_color: '#31D880',
				isbuy: false,
				buyBtnText: '立即购买',
				buyBackColor: '#ff0000',
				enableCamera: false,
				context: null,
				pdfFile: [],
				videoFile: [],
				videoFileId: [],
				videoUrl: '',
				showVideo: false,
				messageValue: '',
				messageList: [],
				userid: '',
				intoView: 'end',
				scrollTop: 0,
				mainscrolltop:0,
				page:1,
				scrollbottom:false,
				style:{
					pageHeight:0,
					contentViewHeight:0
				}
			}
		},
		onLoad: function(e) {
			//获取直播详情
			this.courseID = this.id = e.id;
			console.log(this.courseID)
			this.getLivedetail();
			this.getMessageList();
			this.userid = getApp().globalData.userId;
			
		},
		onShow: function(e) {
			this.videoImageHeight = this.$app.getwindowWidth() * 0.763 - 44
			this.scrollviewHeight = this.$app.getwindowHeight() - 44;
		this.style.pageHeight = 500;
		this.style.contentViewHeight = 500;
			this.getLivedetail();
		},

		methods: {
			lower: function(e) {
			 				  this.scrollbottom = true;
							 // this.page = 1;
							  this.getMessageList()
			      },
			/*获取直播详情*/
			getLivedetail() {
				let that = this;

				return request({
					url: getApp().$api.zhibo.getLivecourseDetailInfo,
					type: 'GET',
					data: {
						id: this.courseID,
						user_id: getApp().globalData.userId
					}
				}, true, true).then(data => {
					console.log("eee")
					that.detailInfo = data.data;
					that.isbuy = data.isBuy;
					that.isfav = data.isCollect;
					if (data.data.file != '') {
						let file = JSON.parse(data.data.file);
						let videoFileId = [];
						let videoFile = [];
						that.pdfFile = [];
						file.map(v => {
							if (v.type == 'pdf') {
								that.pdfFile.push({
									value: v.value,
									name: v.name
								})
							} else if (v.type == 'video') {
								videoFileId.push(v.value);
								videoFile.push(v)
							}
						});
						that.videoFileId = videoFileId;
						if (videoFileId.length != 0) {
							that.videoFile = [];
							console.log(videoFile)
							that.getVideoUrlList(videoFile);
						}
						that.$forceUpdate();
					}

					if (data.data.userId == getApp().globalData.userId) {
						if (data.data.status == 1) {

							this.buyBtnText = "直播中"
							this.buyBackColor = '#999999'

						} else {
							this.buyBtnText = "开始直播"
							this.buyBackColor = '#ff0000'

						}

						//判断时间
					} else {
						if (data.isBuy == true) {
							this.buyBtnText = "已购买"
							if (this.detailInfo.status == 1) {
								this.buyBackColor = '#ff0000'
							} else {
								this.buyBackColor = '#999999'
							}

						} else {
							this.buyBtnText = "立即购买"
							this.buyBackColor = '#ff0000'


						}
					}
					uni.showToast({
						title: data,
						icon: null
					})
				})

			},
			getVideoUrlList(file) {
				let that = this;
				return request({
					url: getApp().$api.oss.getVideoUrl,
					data: {
						v_ids: this.videoFileId
					},
					type: "POST"
				}, false, true).then(data => {
					that.videoFile = [];
					data.map((v, k) => {
						that.videoFile.push({
							value: v[0].url,
							name: file[k].name
						});
					});
					that.$forceUpdate();
					console.log(that.videoFile, that.pdfFile)
				})
			},
			scroll(event) {
							//距离每个边界距离
 							if(event.detail.scrollTop == 0){
								this.page=this.page+1
							this.scrollbottom =false
							this.getMessageList()
							}
						},
			scrollToBottom() {
 				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
							that.style.mitemHeight = 0;
							console.log(res[0])
							if(res[0].length==0){
                           setTimeout(() => {
                          that.scrollToBottom()
                          	 
                          }, 400)
								 return
								}
							res[0].forEach((rect) =>
							 that.style.mitemHeight = that.style.mitemHeight + rect.height + 100) //获取所有内部子元素的高度
							// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
							
							setTimeout(() => {
								
						 
								if (that.style.mitemHeight > (that.style.contentViewHeight - 80)) { //判断子元素高度是否大于显示高度
   									 that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
									 console.log("高度", that.scrollTop)
								}else{
  									
								}
							}, 400)
							
						})
					},
					setVideoUrl(f, src) {
						if (!this.isbuy && getApp().globalData.userId != this.detailInfo.userId) {
							uni.showToast({
								title: '请购买后进行查看',
								duration: 1500,
								icon: 'none'
							});
							return false;
						}
						if (f) {
							this.videoUrl = src;
						}
						console.log(this.videoUrl);
						this.showVideo = f;
					},
					getUrlName(url) {
						let name = url.split('/')[url.split('/').length - 1];
						return name.split('.')[1];
					},

					//添加收藏
					favAction() {
						let that = this;
						if (that.isfav == true) {
							//取消收藏
							this.$app.request({
								url: getApp().$api.zhibo.unfavLivecourse,
								method: 'POST',
								data: {
									userid: getApp().globalData.userId,
									bindtype: 1,
									liveid: that.courseID
								},
								dataType: 'json',
								success: res => {
									if (res.code == 200) {
										that.isfav = false;
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

							this.$app.request({
								url: getApp().$api.zhibo.favLivecourse,
								method: 'POST',
								data: {
									userid: getApp().globalData.userId,
									bindtype: 1,
									liveid: that.courseID
								},
								dataType: 'json',
								success: res => {
									if (res.code == 200) {
										that.isfav = true;
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

					onClickItem(e) {
						var that = this
						if (this.current !== e.currentIndex) {
							this.current = e.currentIndex;
							if (this.current == 1) {
								that.mainscrolltop = 5000
								this.scrollToBottom();
							}
						}

					},
					openFile(url) {
						if (!this.isbuy && getApp().globalData.userId != this.detailInfo.userId) {
							uni.showToast({
								title: '请购买后进行查看',
								duration: 1500,
								icon: 'none'
							});
							return false;
						}
						uni.showModal({
							title: '操作提示',
							content: '是否查看这个文件',
							success(res) {
								if (res.confirm) {
									uni.downloadFile({
										url,
										success: function(res) {
											var filePath = res.tempFilePath;
											uni.openDocument({
												filePath: filePath,
												success: function(res) {}
											});
										}
									});
								}
							}
						})
					},
					//确认订单	传递所需的参数
					comfirmOrder() {
						if (getApp().globalData.userId == this.detailInfo.userId) {
							console.log("ttttt")
							const item = {
								streamName: this.detailInfo.streamName,
								liveid:  this.courseID,
  								title: this.detailInfo.title,
 							}
							uni.navigateTo({
								url: '../../Zhibo/StarLive/StarLive?item=' + encodeURIComponent(JSON.stringify(item)),
								animationType: 'slide-in-right',
								animationDuration: 300
							})
							return false;
						}
						if (this.buyBtnText == "开始直播") {
							console.log(this.courseID)
							const item = {
								streamName: this.detailInfo.streamName,
								liveid:  this.courseID,
								title: this.detailInfo.title,
							}
							uni.navigateTo({
								url: '../../Zhibo/StarLive/StarLive?item=' + encodeURIComponent(JSON.stringify(item)),
								animationType: 'slide-in-right',
								animationDuration: 300
							})

						} else if (this.buyBtnText == "立即购买") {

							const item = {
								sku: getApp().globalData.livesku,
								courseID: this.courseID,
								cover: this.detailInfo.cover,
								cost: this.detailInfo.cost,
								title: this.detailInfo.title,
								time: this.detailInfo.beginTime
							}
							uni.navigateTo({
								url: '../../Order/ConfirmOrder/ConfirmOrder?item=' + encodeURIComponent(JSON.stringify(item)),
								animationType: 'slide-in-right',
								animationDuration: 300
							})


						} else if (this.buyBtnText == '已购买') {
							if (this.detailInfo.status == 1) {
								const item = {
									liveid: this.courseID,
									streamName: this.detailInfo.streamName,
									title: this.detailInfo.title
								}
								uni.navigateTo({
									url: '../../Zhibo/WatchLive/WatchLive?item=' + encodeURIComponent(JSON.stringify(item)),
									animationType: 'slide-in-right',
									animationDuration: 300
								})
							} else {
								uni.showToast({
									title: '直播未开始',
									icon: 'none'
								})
							}


						}



					},
					openInfo(index) {
						uni.navigateTo({
							url: '/pages/Daxue/TeacherDetail/TeacherDetail?id=' + index,
							animationType: "slide-in-right",
							animationDuration: 300
						})
					},
					share() {
						let goodsId = this.courseID;
						let rebateType = getApp().globalData.livesku;
						let couponCode = this.detailInfo.coupon;
						let invitationCode = this.detailInfo.invitationCode;
						if (this.detailInfo.invitationCodeCount == this.detailInfo.invitationCodeUsedCount) {
							invitationCode = 0
						}
						if (this.detailInfo.couponCount == this.detailInfo.couponUsedCount) {
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
								shareUrl: `http://jskf.huaxiakangfu.com/app_share/index.html#/?id=${goodsId}&rebateType=${rebateType}&couponCode=${couponCode}&invitationCode=${invitationCode}&rebateCode=${result}`,
								shareTitle: `${name}: 分享了直播《${that.detailInfo.name}》`,
								shareContent: "直播简介: " + that.detailInfo.presentation,
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
					sendMessage() {
						if (this.messageValue == '') return false;
						let that = this;
						return request({
							url: getApp().$api.zhibo.sendMessage,
							data: {
								type: getApp().globalData.livesku,
								content: that.messageValue,
								sendId: getApp().globalData.userId,
								createBy: getApp().globalData.userName,
								objectId: that.id,
							},
							type: "POST"
						}, true, true).then(data => {
							console.log(data)
							that.messageValue = '';
							that.getMessageList();
							that.scrollbottom = true
						})
					},
					getMessageList() {
						let that = this;
						let mess= []
						return request({
							url: getApp().$api.zhibo.getMessageList,
							type: "GET",
							data: {
								c_id: uni.getStorageSync('clientInfo').clientid,
								type: getApp().globalData.livesku,
								  //sendId: getApp().globalData.userId,
								condition: true,
								objectId: that.id,
								column: 'createTime',
								order: 'desc',
								pageNo: 1,
								pageSize: that.page *20
							}
						}, true, true).then(data => {
							console.log(data)
							
							console.log(mess.length)
 								that.messageList = data.records
								 
							 if(that.scrollbottom == true){
								 that.scrollToBottom();
								 
							 }
						})
					}
			}
		}
</script>
<style>
	page {
		background-color: #F7F7F7;
	}
</style>
<style scoped lang="scss">
	.bgview {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.secondView {
 		background: #FFFFFF;
		border-radius: 4rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;

		.priceview {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 30rpx;

			.price1 {
				font-size: 20rpx;
				font-weight: 500;
				color: #E02020;
				margin-left: 20rpx;
			}

			.price {

				font-size: 36rpx;
				font-weight: 700;
				color: #E02020;
				margin-left: 5rpx;
			}

			.huiyuanprice {

				height: 38rpx;
				background: #E02020;
				border-radius: 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;

				font-size: 18rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 38rpx;
				text-align: center;
				margin-left: 16rpx;
			}

		}

		.tipview {
			display: flex;
			flex-direction: row;
			margin-top: 12rpx;

			.tiptext {
				height: 36rpx;
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

		.timeview {
			display: flex;
			flex-direction: row;
			margin-top: 12rpx;
			align-items: center;
			position: relative;

			image {
				width: 22rpx;
				height: 22rpx;
				margin-left: 28rpx;
			}

			text {

				font-size: 20rpx;
				font-weight: 400;
				color: #666666;
				margin-left: 10rpx;
			}

			.buynumber {
				position: absolute;
				height: 34rpx;
				background: #F2F2F2;
				border-radius: 4rpx;
				text-align: center;
				font-size: 20rpx;
				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
				padding-left: 16rpx;
				padding-right: 16rpx;
				right: 10rpx;
			}

		}

		.livelessonTitle {
			margin-top: 12rpx;
			margin-left: 22rpx;
			margin-right: 22rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			overflow: hidden;
			text-overflow: ellipsis;
			/* 超出部分省略号 */
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-line-clamp: 2;
			/** 显示的行数 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			margin-bottom: 30rpx;

		}
	}

	.teacherView {

		background: #FFFFFF;
		border-radius: 4rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
 		.sectionview {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 14rpx;

			.iconview {

				width: 4rpx;
				height: 27rpx;
				background: #E02020;
				border-radius: 4rpx;
				margin-left: 20rpx;
			}

			text {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 40rpx;
				margin-left: 10rpx;
			}
		}

		.teacherscrollview {
			white-space: nowrap; // 滚动必须加的属性
			width: 100%;
			padding-top: 20upx;
			margin-bottom: 22rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 20upx;
				margin-left: 24rpx;
				display: inline-block;
				vertical-align: top;

				.teacherImage {
					display: inline-block;

					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
				}

				text {
					display: block;

					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					text-align: center;
				}
			}
		}

	}

	.downloadView {
		display: flex;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		background: #FFFFFF;
		border-radius: 4px;
		flex-direction: column;
		position: relative;
 		.sectionview {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 14rpx;

			.iconview {

				width: 4rpx;
				height: 24rpx;
				background: #E02020;
				border-radius: 4rpx;
				margin-left: 20rpx;
			}

			text {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 40rpx;
				margin-left: 10rpx;
			}
		}

		.lineview {
			width: 100%;
			height: 2rpx;
			background: #F9F9F9;
			margin-top: 20rpx;
		}

		.downLoadItemView {
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;

			.downImage {
				width: 22rpx;
				height: 22rpx;
				margin-left: 20rpx;
				margin-top: 46rpx;
				margin-bottom: 46rpx;
			}

			.rightimage {
				width: 14rpx;
				height: 27rpx;
				position: absolute;
				right: 26rpx;
			}

			.downtitle {
				font-size: 24rpx;
				font-weight: bold;
				color: #666666;
				margin-right: 100rpx;
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-line-clamp: 1;
				/** 显示的行数 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				margin-left: 12rpx;

			}


		}

		.middleLineview {
			width: 100%;
			height: 2rpx;
			background: #F9F9F9;
			margin-left: 20rpx;
			margin-right: 20rpx;
		}




	}

	.lastview {
 		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		padding-top: 20rpx;
		// padding-bottom: 30rpx;
		min-height: 500rpx;

		.detailText {
			margin-left: 24rpx;
			margin-right: 24rpx;
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #666666;
		}

		.studentBgview {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 30rpx;
			margin-bottom: 30rpx;

			image {
				width: 68rpx;
				height: 68rpx;
				border-radius: 34rpx;
				margin-left: 38rpx;

			}

			text {

				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				margin-left: 20rpx;
			}

		}
	}

	.bottomview {
		height: 88rpx;
		width: 100%;
		bottom: 0px;
		right: 0px;
		position: fixed;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;

		.price {
			font-size: 28rpx;
			font-weight: 600;
			color: #E02020;
			line-height: 40rpx;
		}

		.favview {
			display: flex;
			align-items: center;
			flex-direction: row;

			image {
				width: 44rpx;
				height: 44rpx;
				border-radius: 8rpx;
			}

			text {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				line-height: 40rpx;
				margin-left: 10upx;
			}



		}


		.buy {
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

	.videoImageviewVideo {
		position: fixed;
		left: 0;
		width: 100%;
		height: 570rpx;
	}

	.videoImageview {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 400rpx;
		align-items: center;
		position: relative;

		// margin-bottom: 40rpx;
		image {
			width: 100%;
			height: 370rpx;
		}

		video {
			width: 100%;
			height: 370rpx;
		}

		.playImageView {

			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 50%;
			left: 50%;
			margin-top: -50rpx;
			margin-left: -50rpx;
			background: #09BB07;

			image {
				width: 100rpx;
				height: 100rpx;

			}

		}
	}

	.rightImage {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}

	.showVideo {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background-color: rgba(0, 0, 0, .2);
	}

	.showVideo video {
		position: relative;
		z-index: 10;
		width: 690rpx;
		height: 400rpx;
	}

	.showVideoView {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2;
	}

	.messageView {
		position: relative;
		width: 100%;
		height: 500rpx;
		background-color: #F7F7F7;
 		// overflow-y: scroll;
		// padding-bottom: 120rpx;
 	}
 
	.messageView .messageItem {
		padding-top: 40rpx;
		display: flex;
 	}

	.messageItemImage {
		width: 68rpx;
		height: 68rpx;
		border-radius: 50%;
 		margin-right: 20rpx;
	}

	.messageItemNameTitle {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.messageItemNameText {
		margin-top: 16rpx;
		width: 450rpx;
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 8px;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}

	.messageRight {
		justify-content: flex-end;
	}

	.messageRight .messageItemNameTitle {
		text-align: right;
	}

	.messageRight .messageItemImage {
		margin-right: 0;
		margin-left: 20rpx;
	}

	.messageInput {
		width: 690rpx;
		padding: 20rpx 30rpx;
		position: fixed;
		// width: 100%;
		bottom: 0rpx;
		left: 0;
		padding-top: 0;
		display: flex;
		height: 70rpx;
		align-items: center;
	}

	.messageInput input {
		flex: 1;
		background: #FFFFFF;
		border-radius: 4px;
		border: 2px solid #E6E6E6;
		padding: 0 24rpx;
		line-height: 70rpx;
		height: 70rpx;
		margin-right: 20rpx;
	}

	.messageInput view {
		width: 120rpx;
		height: 70rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		border-radius: 8rpx;
		background-color: #CCCCCC;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.messageInput .sendMessage_ {
		background-color: #00D67B;
	}
</style>
