<template>
	<view class="viewPage">
		<nav-bar bgColor="#FFFFFF" fontColor="#333333" title="班级详情">
			<image slot="right" class="rightImage" @click="share" src="/static/share.png"></image>
		</nav-bar>
		<view class="desc">
			<view class="title">班级简介</view>
			<view class="descText">{{info.presentation}}</view>
		</view>
		<view class="live" v-if="info.liveList.length !=0">
			<view class="title">直播</view>
			<live :list="info.liveList" :notpay="!isbuy"></live>
		</view>
		<view class="course" v-if="info.courseList.length >= 0">
			<view class="title">课程</view>
			<view class="list">
				<view class="item" v-for="(v,k) in info.courseList">
					<course :info="v" :notpay="!isbuy"></course>
				</view>
			</view>
		</view>
		<view class="teacherView" v-if="info.expertList !=null">
			<view class="sectionview">
				<view class="iconview">

				</view>
				<text>老师</text>
			</view>
			<scroll-view scroll-x="true" class="teacherscrollview">
				<block v-for="(item, index) in info.expertList" :key="index">
					<view class="item" @click="openInfo(item.id)">

						<image class="teacherImage" :src="item.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"
						 mode="">
						</image>
						<text>{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="lastview">
			<zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" :activeColor="activeColor"
			 :lineWidth="line_width" :lineColor="line_color">
			</zzx-tabs>
			<view class="detailText" v-show="current === 0">{{info.presentation}}

			</view>
			<view v-show="current === 1">
				<view class="studentBgview" v-for="(item,index) in info.studentList" :key="index">

					<image :src="item.headUrl"></image>

					<text>{{item.name}}</text>


				</view>
			</view>
			<view v-show="current === 2">
				<scroll-view id="scrollview" :scroll-top="scrollTop" class="messageView" scroll-y="true" @scroll="scroll" @scrolltolower="lower">
					<view v-for="(item , index) in messageList" :key="index" class="m-item">
						<view class="messageItem messageLeft" v-if="item.sendId != userid">
							<image :src="item.sendUser.headUrl" mode="aspectFill" class="messageItemImage"></image>
							<view class="messageItemName">
								<view class="messageItemNameTitle hidden">{{item.sendUser.name}}</view>
								<view class="messageleftTime">{{item.createTime}}</view>
								
								<view class="messageItemNameText">{{item.content}}</view>
							</view>
						</view>

						<view class="messageItem messageRight" v-if="item.sendId == userid">
							<view class="messageItemName">
								<view class="messageItemName">
									<view class="messageItemNameTitle hidden">我</view>
									<view class="messageTime">{{item.createTime}}</view>
									
									<view class="messageItemNameText">{{item.content}}</view>
								</view>
							</view>
							<image :src="item.sendUser.headUrl?item.sendUser.headUrl:item.sendUser.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"
							 mode="aspectFill" class="messageItemImage"></image>

						</view>

					</view>

					<view class="messageInput" v-if="isbuy || info.userId == userid">
						<input placeholder="请输入您的留言" v-model="messageValue" />
						<view class="sendMessage" :class="messageValue?'sendMessage_':''" @click="sendMessage">发送</view>
					</view>
				</scroll-view>

			</view>

		</view>
		<view class="lecture" v-if="info.classTable && info.classTable.length !=0">
			<view class="title">线下讲座</view>
			<view class="lectureList">
				<view class="lectureItem" v-for="(v,k) in info.classTable" :key="k">
					<view class="lectureTitle">
						<view class="dot"></view>
						<view class="">{{v.name}}</view>
					</view>
					<view class="lectureText">时间：{{v.date}}</view>
					<view class="lectureTypes">
						<view class="lectureType">{{v.user.role_dictText}}：{{v.user.name}}</view>
					</view>
					<view class="lectureAddress hidden">地点：{{v.address}}</view>
				</view>
			</view>

		</view>
		<view class="bottom" v-if="current == 0">
			<view>原价¥{{info.cost}}/会员价¥{{info.memberCost}}</view>
			<view class="" @click="favAction">
				<image :src="isfav == true ?'../../../static/zhibo/icon_yishoucang.png':'../../../static/zhibo/icon_shoucang.png'"></image>
				<view class="">收藏本课</view>
			</view>
			<view class="buy" :style="{background:buyBackColor}" @click="comfirmOrder">{{buyBtnText}}</view>
		</view>
	</view>
</template>

<script>
	import live from "../../../components/live/live.vue";
	import course from "../../../components/course/course.vue"
	import request from "../../../utils/util.js"
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	import appShare from "@/plugins/share/index.js"
	export default {
		data() {
			return {
				info: {},
				isfav: false,
				items: ["详情", "学生", "评论"],
				messageValue: '',
				messageList: [],
				userid: '',
				current: 0,
				activeColor: '#000000',
				line_width: "8%",
				line_color: '#31D880',
				scrollTop: 0,
				page:1,
				scrollbottom:false,
				style:{
					pageHeight:0,
					contentViewHeight:0
				}
			}
		},
		components: {
			live,
			course,
			zzxTabs
		},
		onLoad(options) {
			this.id = options.id;
			this.getMessageList();
			this.userid = getApp().globalData.userId;
			this.style.pageHeight = 500;
			this.style.contentViewHeight = 500;
			this.scrollbottom = true
		},
		onShow() {
			this.getInfo();
		},
		methods: {
			lower: function(e) {
			 				  this.scrollbottom = true;
							 // this.page = 1;
							  this.getMessageList()
			      },
			scroll(event) {
							//距离每个边界距离
							if(event.detail.scrollTop == 0){
								this.page=this.page+1
							this.scrollbottom =false
							this.getMessageList()
							}
						},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					if (this.current == 2) {
						this.scrollToBottom();
					}
				}
			},
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
							that.style.mitemHeight = 0;
							if(!res[0]) return false;
							res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 100) //获取所有内部子元素的高度
							// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
							
							setTimeout(() => {

								if (that.style.mitemHeight > (that.style.contentViewHeight - 80)) { //判断子元素高度是否大于显示高度
									that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
								}
							}, 200)
						})
					},
			getInfo() {
				let that = this;
				return request({
					url: getApp().$api.banji.getInfo,
					type: "GET",
					data: {
						id: this.id,
						user_id: getApp().globalData.userId
					}
				}, true, true).then(data => {
					data.data.classTable = JSON.parse(data.data.classTable);
					this.info = this.detailInfo = data.data;
					that.isbuy = data.isBuy;
					that.isfav = data.isCollect;

					if (data.isBuy == true) {
						this.buyBtnText = "已购买"
						this.buyBackColor = '#999999'

					} else {
						this.buyBtnText = "立即购买"
						this.buyBackColor = '#ff0000'


					}
				})
			},
			comfirmOrder() {
				if (this.buyBtnText == "立即购买") {
					if (getApp().globalData.userId  && getApp().globalData.userId != -2) {
									 
					              const item = {
					              	sku: getApp().globalData.classsku,
					              	courseID: this.id,
					              	cover: this.info.coverUrl,
					              	cost: this.info.cost,
					              	title: this.info.name,
					              	time: this.info.createTime
					              }
					              console.log(item)
					              uni.navigateTo({
					              	url: '../../Order/ConfirmOrder/ConfirmOrder?item=' + encodeURIComponent(JSON.stringify(item)),
					              	animationType: 'slide-in-right',
					              	animationDuration: 300
					              })
					              
					              
								} else {
									console.log("登陆")
									//未登陆
									uni.navigateTo({
										url: '../../Login/Login/Login?type='+'detail',
										animationType: 'slide-in-bottom',
										animationDuration: 300
									});
								}
												
				
				} else if (this.buyBtnText == '已购买') {



				}
			},
			favAction() {
				let that = this;
				if (that.isfav == true) {
					//取消收藏
					this.$app.request({
						url: getApp().$api.banji.unfavCourse,
						method: 'POST',
						data: {
							userId: getApp().globalData.userId,
							bindType: 1,
							classId: (that.id) * 1
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
						url: getApp().$api.banji.favCourse,
						method: 'POST',
						data: {
							userId: getApp().globalData.userId,
							bindType: 1,
							classId: (that.id) * 1
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
			openInfo(index) {
				uni.navigateTo({
					url: '/pages/Daxue/TeacherDetail/TeacherDetail?id=' + index,
					animationType: "slide-in-right",
					animationDuration: 300
				})
			},
			sendMessage() {
				if (this.messageValue == '') return false;
				let that = this;
				return request({
					url: getApp().$api.zhibo.sendMessage,
					data: {
						type: getApp().globalData.classsku,
						content: that.messageValue,
						sendId: getApp().globalData.userId,
						createBy: getApp().globalData.userName,
						objectId: that.id,
					},
					type: "POST"
				}, true, true).then(data => {
					that.messageValue = '';
					that.getMessageList();
				})
			},
			getMessageList() {
				let that = this;
				return request({
					url: getApp().$api.zhibo.getMessageList,
					type: "GET",
					data: {
						c_id: uni.getStorageSync('clientInfo').clientid,
						type: getApp().globalData.classsku,
						// sendId: getApp().globalData.userId,
						condition: true,
						objectId: that.id,
						column: 'createTime',
						order: 'desc',
						pageNo: 1,
						pageSize: that.page*20
					}
				}, true, true).then(data => {
					that.messageList = data.records;
						
					if(that.scrollbottom == true){
						that.scrollToBottom();
						
					}
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
					url:getApp().$api.share.rebate,
					data:{
						goodsId,
						rebateType
					},
					type:"POST"
				},false).then(res=>{
					let result = res.result;
					let shareData = {
						type: 0,
						shareUrl: `http://jskf.huaxiakangfu.com/app_share/index.html#/?id=${goodsId}&rebateType=${rebateType}&couponCode=${couponCode}&invitationCode=${invitationCode}&rebateCode=${result}`,
						shareTitle: `${name}: 分享了班级《${that.detailInfo.name}》`,
						shareContent: "班级简介: "+that.detailInfo.presentation,
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
				
			}
		}
	}
</script>

<style scoped>
	.viewPage {
		width: 750rpx;
		min-height: 100vh;
		background-color: #F9F9F9;
		padding-bottom: 80rpx;
	}

	.desc {
		width: 690rpx;
		background-color: #FFFFFF;
		padding: 10rpx 30rpx;
		margin-bottom: 8rpx;
	}

	.title {
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 44rpx;
		padding: 30rpx 0;
	}

	.live,
	.course {
		width: 750rpx;
		background-color: #FFFFFF;
		margin-bottom: 8rpx;
		padding-bottom: 30rpx;
		/* padding:0rpx 30rpx; */
	}

	.lecture {
		width: 720rpx;
		background-color: #FFFFFF;
		padding-left: 30rpx;
	}

	.course {
		padding-left: 30rpx;
		width: 720rpx;
		margin-bottom: 8rpx;
	}

	.course .list {
		display: flex;
		flex-wrap: wrap;
	}

	.list .item {
		margin-right: 30rpx;
	}

	.live .title {
		padding-left: 30rpx;
		padding-bottom: 0;
	}

	.descText {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		padding-bottom: 10rpx;

	}

	.lectureList {
		width: 720rpx;
		padding-bottom: 20rpx;
		/* padding-left: 30rpx; */
	}

	.lectureTitle .dot {
		width: 8rpx;
		height: 8rpx;
		background-color: #31D880;
		margin-right: 12rpx;
		border-radius: 50%;
	}

	.lectureItem {
		border-bottom: 2rpx solid #F9F9F9;
		padding-bottom: 26rpx;
		margin-bottom: 20rpx;
	}

	.lectureItem:last-child {
		border: none;
	}

	.lectureItem .lectureTitle {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
		margin-bottom: 22rpx;
	}

	.lectureText {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
		margin-bottom: 12rpx;
		padding-left: 20rpx;
	}

	.lectureTypes {
		width: 670rpx;
		margin-left: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		overflow-y: scroll;
		margin-bottom: 20rpx;
	}

	.lectureType {
		padding: 0 16rpx;
		height: 40rpx;
		background: #F0F0F0;
		border-radius: 8rpx;
		white-space: nowrap;
		margin-right: 10rpx;

		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}

	.lectureAddress {
		width: 670rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 26rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 690rpx;
		height: 88rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.bottom>view:nth-child(1) {
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #E02020;
	}

	.bottom>view:nth-child(2) {
		display: flex;
		align-items: center;
	}

	.bottom>view:nth-child(2)>image {
		width: 44rpx;
		height: 44rpx;
		margin-right: 14rpx;
	}

	.bottom>view:nth-child(2)>view {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.bottom>view:nth-child(3) {
		width: 214rpx;
		height: 54rpx;
		background: #E02020;
		border-radius: 28rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		text-align: center;
		line-height: 54rpx;
	}
</style>
<style scoped lang="scss">
	.teacherView {
		// overflow: hidden;
		background: #FFFFFF;
		border-radius: 4rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 30rpx;
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
	.messageView {
		position: relative;
		width: 100%;
		height: 500rpx;
		overflow-y: scroll;
		// padding-bottom: 120rpx;
		background-color: #FFF7F7;
	}

	.messageView .messageItem {
		padding-top: 40rpx;
		display: flex;
	}

	.messageItemImage {
		width: 68rpx;
		height: 68rpx;
		border-radius: 50%;
		background-color: red;
		margin-right: 20rpx;
	}

	.messageItemNameTitle {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
.messageTime{
 	width: 450rpx;
  	font-size:20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #656565;
	text-align: right;
	
}
.messageleftTime{
 	width: 450rpx;
  	font-size:20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #656565;
	text-align: left;
	
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
	.rightImage {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}
</style>
