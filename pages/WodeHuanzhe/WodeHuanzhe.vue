<template>
	<view>
		<scroll-view scroll-y="true" :style="[{height:viewHeight + 'px'}]" @scroll="scroll" @scrolltolower="addMoreData">
			<view class="topview">
				<image src="../../static/wodehuanzhe/bg_wodehuanzhe.png" class="topimageview" mode="aspectFill"></image>

				<view class="topitemView">
					<image src="../../static/wodehuanzhe/img_touxiang.png" class="userImage"></image>
					<text class="username">潮汐海灵</text>
					<view class="tipText">
						<text class="blackText">当前患者</text>
						<text class="greenText">{{info.currentTotal?info.currentTotal:0}}</text>
						<text class="blackText">名，</text>
						<text class="blackText"> 新增患者</text>
						<text class="greenText">{{info.newTotal?info.newTotal:0}}</text>
						<text class="blackText">名</text>
					</view>
					<view class="tipText">
						<text class="blackText">一共有</text>
						<text class="greenText">{{info.total?info.total:0}}</text>
						<text class="blackText">名康复患者</text>

					</view>
					<view class="hlineView">

					</view>
					<uni-grid :column="4" :square="false" :showBorder="false" @change="" :highlight="false">
						<uni-grid-item v-for="(item ,index) in currentHuanzhetongji" :key="index" :index="index">
							<view class="huanzhetongjiView">
								<text class="numberText">{{item.total}}</text>
								<text class="bingyin hidden">{{item.illness_name?item.illness_name:'双方尽快释放减肥是咖啡·'}}</text>
								<view class="lineview" v-if="index%4 !=3 ">
								</view>
							</view>


						</uni-grid-item>
					</uni-grid>
					<view class="moreview" @click="moreaction">
						<view>{{ishowMore?'收起':'展开'}}</view>
						<image src="../../static/f_my_kecheng_arrow.png"></image>
					</view>
					<view class="defenview">
						<view class="defenrightview">
							<text class="defenText">{{info.month?info.month:0}}</text>
							<text class="benyuedefen">本月得分</text>
						</view>
						<text class="jinridefen">今日得分 {{info.day?info.day:0}} 分</text>
					</view>

				</view>
				<!-- 			//患者列表 -->
				<text class="huanzheliebiaoTitle">患者列表</text>

				<block v-for="(item,index) in huanzhelist" :key='index'>
					<view class="huanzheview" v-if="item.status != 1">
						<view class="huanzheTopview">
							<image :src="item.sex== 1?'../../static/gongzuotai/icon_nan.png' :'../../static/gongzuotai/icon_nv.png'"></image>
							<view class="huanzherightview">
								<view class="firstView">
									<text class="name">{{item.name}}</text>
									<text class="detail">性别：{{item.sex== 1?'男':'女'}} 年龄：{{item.age}}</text>
								</view>
								<view class="zhenduanview">
									<image class="zhenduanimage" src="/static/gongzuotai/icon_zhenduan1.png"></image>
									<text>诊断：{{item.illnessName?item.illnessName:''}}</text>

								</view>
								<text class="bianhao">编号：{{item.num}}</text>
								<text class="chakanhuanzheview" @click="huanzheXiangqing(index)">查看患者</text>
							</view>
						</view>
						<view class="Hlinew">

						</view>
						<uni-grid v-if="item.treatmentList.length >=1&&item.treatmentList[0].subproject" :column="2" :square="false"
						 :showBorder="false" @change="" :highlight="false">
							<uni-grid-item v-for="(Item ,Index) in item.treatmentList[0].subproject" :key="Index" :index="Index">
								<view class="huanzheBottomItem">
									<view class="greendot"></view>
									<view class="title">
										<view class="hidden">{{Item.name}}</view>
										<view>{{Item.start}}-{{Item.end}}</view>
									</view>
									<view class="zhixing zhixing1" v-if="Item.type == 1">完成</view>
									<view class="zhixing zhixing2" v-else-if="Item.type == 2">暂停</view>
									<view class="zhixing" v-else @click="runXiangMu(index,Index)">执行</view>
								</view>
							</uni-grid-item>
						</uni-grid>

					</view>
				</block>
			</view>

		</scroll-view>
		<xiangmu v-if="isShowPerformWindow" :short="short" :long="long" :number="number" @setNumber="setNumber"
		 @setShowPerformWindowStatus="setShowPerformWindowStatus" @stopProgress="stopProgress" @setShowFinishWindowStatus="setShowFinishWindowStatus"></xiangmu>
		<complete-target v-if="isShowFinishWindow" @confirmFinish="confirmFinish" :number="nowScore"></complete-target>
	</view>
</template>

<script>
	import request from "../../utils/util.js";
	import tool from "../../utils/tool.js"
	import xiangmu from "@/components/confirmTarget/confirmTarget.vue"
	import completeTarget from "@/components/completeTarget/completeTarget.vue"
	export default {
		components: {
			xiangmu,
			completeTarget
		},
		data() {
			return {
				isShowPerformWindow: false,
				number: 1,
				isShowFinishWindow: false,
				short: '',
				long: '',
				viewHeight: 0,
				currentHuanzhetongji: [],
				zhixing: ["1", "2", "3", "4"],
				ishowMore: false,
				huanzhetongji: [],
				huanzhelist: [],
				index: 1,
				size: 10,
				isGetMoreHuanZheList: true,
				nowIndex: 0,
				nowIndex1: 0,
				nowScore: 0,
				info: {}
			}
		},
		onShow: function() {

			// this.resetData();

			this.viewHeight = parseInt(this.$app.getwindowHeight()) + parseInt(this.$app.getNaviBarHeight());

		},
		onLoad() {
			this.init();
		},
		onReachBottom() {
			if (this.isGetMoreHuanZheList) {
				this.getMyPatientsList();
			} else {
				uni.showToast({
					title: "暂无更多数据",
					duration: 1500,
					icon: "none"
				})
			}
		},
		methods: {
			init() {
				this.getMyPatientsList();
			},
			setShowPerformWindowStatus() {
				this.isShowPerformWindow = !this.isShowPerformWindow;
			},
			setNumber(data) {
				this.number = data.num;
			},
			confirmProgress() {
				this.setShowPerformWindowStatus();
				this.setShowFinishWindowStatus();
			},
			stopProgress() {
				this.setProgress(false).then(() => {
					this.getMyPatientsList(true);
				})
				this.setShowPerformWindowStatus();
			},
			setShowFinishWindowStatus() {
				this.setProgress().then(() => {
					this.isShowFinishWindow = !this.isShowFinishWindow;

					this.getMyPatientsList(true);
				})

			},
			confirmFinish() {
				this.isShowFinishWindow = !this.isShowFinishWindow;
				// this.setShowFinishWindowStatus();
			},
			setProgress(f = true) {
				let that = this;
				this.huanzhelist[this.nowIndex].treatmentList[0].subproject[this.nowIndex1].type = f ? 1 : 2
				let id = this.huanzhelist[this.nowIndex].treatmentList[0].id;
				let subproject = JSON.stringify(this.huanzhelist[this.nowIndex].treatmentList[0].subproject);
				return request({
					url: getApp().$api.huanzhe.editProgram,
					type: "PUT",
					data: {
						id,
						subproject
					}
				}, false).then(() => {

				})
			},
			runXiangMu(k, kk) {
				let item = this.huanzhelist[k].treatmentList[0];
				this.short = item.shortGoals;
				this.long = item.longGoals;
				this.nowIndex = k;
				this.nowIndex1 = kk;
				this.number = 1;
				this.nowScore = item.subproject[kk].score;
				this.setShowPerformWindowStatus();
			},
			addMoreData() {
				if (this.isGetMoreHuanZheList) {
					this.getMyPatientsList();
				} else {
					uni.showToast({
						title: "暂无更多数据",
						duration: 1500,
						icon: "none"
					})
				}
			},
			getMyPatientsList(f = false) {
				let that = this;
				if (f) {
					this.isGetMoreHuanZheList = true;
					this.huanzhelist = [];
					this.index = 1;
				}
				return request({
					url: that.$api.huanzhe.getMyPatientsList,
					data: {
						pageNo: that.index,
						pageSize: that.size,
						userId: getApp().globalData.userId,
						condition: true,
						status:0
						
					},
					type: 'GET'
				}, true, true).then(data => {
					console.log(data)
					data.records = data.data.records;
					
					if (data.records) {
						data.records.map((vv, kk) => {
							if (vv.treatmentList.length >= 1) {
								if (vv.treatmentList[0].subproject) {
									data.records[kk].treatmentList[0].subproject = JSON.parse(data.records[kk].treatmentList[0].subproject);
									vv.treatmentList[0].subproject.map((v, k) => {
										let time = new Date(v.value).getTime() + v.time * 60 * 1000;
										let start = new tool().formDate(new Date(v.value), 4);
										let end = new tool().formDate(new Date(time), 4);
										data.records[kk].treatmentList[0].subproject[k].start = start;
										data.records[kk].treatmentList[0].subproject[k].end = end;
									})
								}

							}
						})
					}
					if (data.records && (data.records.length) >= that.size) {
						that.isGetMoreHuanZheList = true;
					} else {
						that.isGetMoreHuanZheList = false;
					}
					  that.huanzhelist = that.huanzhelist.concat(data.records);
 					  that.info = data;
					  console.log(data)
					that.huanzhetongji = data.illness_total;
					that.resetData();
					this.index++;
				})
			},
			scroll: function(e) {

				if (e.detail.scrollTop > this.$app.getNaviBarHeight()) {

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

				} else {
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
			resetData() {
				this.currentHuanzhetongji = [];
				if (this.ishowMore || this.huanzhetongji.length <= 4) {
					this.currentHuanzhetongji = this.huanzhetongji
				} else {
					for (var i = 0; i < 4; i++) {
						this.currentHuanzhetongji.push(this.huanzhetongji[i])
					}

				}
			},
			moreaction() {
				this.ishowMore = !this.ishowMore;
				this.resetData();
			},

			//跳转患者详情

			huanzheXiangqing(index) {
				uni.navigateTo({
					url: '../HuanzheDetail/HuanzheDetail?id=' + this.huanzhelist[index].id,
					animationDuration: 300,
					animationType: 'slide-in-right'
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
	.topview {
		display: flex;
		flex-direction: column;
		position: relative;

		.topimageview {
			width: 100%;
			height: 376rpx;
		}

		.topitemView {
			position: relative;
			display: flex;
			flex-direction: column;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: -150rpx;
			z-index: 1;
			border-radius: 16rpx;
			background-color: #FFFFFF;

			.userImage {
				width: 96rpx;
				height: 96rpx;
				margin-left: 42rpx;
				margin-top: -40rpx;
			}

			.username {
				margin-left: 42rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-top: 16rpx;
				max-width: 400rpx;
				margin-bottom: 20rpx;
			}

			.tipText {
				display: flex;
				flex-direction: row;
				margin-left: 42rpx;

				.blackText {

					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}

				.greenText {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 600;
					color: #31D880;
				}
			}

			.defenview {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				right: 38rpx;
				top: 38rpx;

				.defenrightview {
					width: 122rpx;
					height: 122rpx;
					border-radius: 61rpx;
					background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
					box-shadow: 0px 10px 14px 0px rgba(49, 216, 128, 0.33);
					display: flex;
					flex-direction: column;

					align-items: center;

					.defenText {
						margin-top: 20rpx;
						font-size: 40rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
					}

					.benyuedefen {
						font-size: 18rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						color: #FFFFFF;

					}


				}

				.jinridefen {

					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-top: 16rpx;
				}

			}

			.hlineView {
				height: 2rpx;
				margin-top: 40rpx;
				background-color: #EAEAEA;
			}

			.huanzhetongjiView {
				margin-top: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				.numberText {

					font-size: 44rpx;
					font-style: italic;
					color: #333333;


					font-weight: bold;
				}

				.bingyin {
					display: inline-block;
					max-width: 150rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-top: 10rpx;

				}

				.lineview {
					position: absolute;
					right: 0;
					top: 20rpx;
					width: 2rpx;
					height: 26rpx;
					background-color: #E3E3E3;
				}

			}

			.moreview {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				text-align: center;
				padding-bottom: 20rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					transform: rotate(90deg);
					margin-left: 10rpx;
				}
			}

		}

		.huanzheliebiaoTitle {

			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-left: 30rpx;
			margin-top: 30rpx;
		}

		.huanzheview {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 30rpx;
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: column;

			.huanzheTopview {
				display: flex;
				flex-direction: row;

				image {
					width: 118rpx;
					height: 118rpx;
					margin-top: 30rpx;
					margin-left: 30rpx;

				}

				.huanzherightview {
					display: flex;
					flex-direction: column;
					flex: 1;
					position: relative;

					.firstView {
						display: flex;
						flex-direction: row;
						position: relative;

						.name {
							font-size: 28rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-left: 26rpx;
							margin-top: 34rpx;
						}

						.detail {

							font-size: 20rpx;
							font-weight: 400;
							color: #666666;
							margin-top: 36rpx;
							position: absolute;
							right: 30rpx;

						}

					}

					.zhenduanview {
						width: fit-content;
						background: #F0F0F0;
						height: 36rpx;
						border-radius: 22rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-left: 10rpx;
						padding-right: 15rpx;
						margin-top: 9rpx;
						padding-top: 5rpx;

						.zhenduanimage {
							width: 28rpx;
							height: 28rpx;
							margin-top: 0rpx;
							margin-left: 5rpx;

						}

						text {
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-left: 8rpx;
						}
					}

					.bianhao {

						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						margin-top: 15rpx;
						margin-left: 24rpx;

					}

					.chakanhuanzheview {
						width: 154rpx;
						height: 36rpx;
						background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
						box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
						border-radius: 18rpx;

						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 36rpx;
						text-align: center;
						position: absolute;
						right: 30rpx;
						top: 136rpx;
					}

				}
			}

			.Hlinew {
				height: 2rpx;
				background-color: #EAEAEA;
				margin-top: 30rpx;
				margin-bottom: 15rpx;
			}

			.huanzheBottomItem {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-top: 10rpx;
				padding-bottom: 5rpx;
				position: relative;

				.greendot {
					width: 6rpx;
					height: 6rpx;
					border-radius: 3rpx;
					background: #29D267;
					margin-left: 24rpx;
				}

				.title {
					width: 240rpx;
					display: flex;
					font-size: 16rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-left: 10rpx;
					margin-right: 90rpx;

				}

				.title>view:nth-child(1) {
					max-width: 100rpx;
					margin-right: 10rpx;
				}

				.zhixing {
					width: 72rpx;
					height: 24rpx;
					background-color: #28D165;
					border-radius: 16rpx;
					font-size: 18rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 24rpx;
					text-align: center;
					position: absolute;
					right: 15rpx;
				}

				.zhixing1 {
					background-color: #FFFFFF;
					color: #28D165;
				}

				.zhixing2 {
					background-color: #CCCCCC;
					color: #FFFFFF;
				}
			}

			.huanzheleftview {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 46rpx;



				text {

					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-top: 15rpx;
					margin-bottom: 20rpx;
				}
			}


		}
	}
</style>
