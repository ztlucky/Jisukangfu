<template>
	<view class="contentView">
		<view class="navview" :style="[{paddingTop: statusBarHeight+5 + 'px',paddingBottom: statusBarHeight+5 + 'px'}]">
			<image class="imageview" src="../../static/Huanzhexiangqing/fanhui.png" mode="" @click="returnBack"></image>
			<text class="title">患者详情</text>
			<view class="navRight" @click="endZhiliao(1)" v-if="zhiliaoStaut == 0">
				结束治疗
			</view>
			<view class="navRight" @click="endZhiliao(0)" v-if="zhiliaoStaut == 1">
				治疗已结束
			</view>
		</view>
		<scroll-view scroll-y="true" @scroll="scroll" :style="[{height:viewHeight + 'px'}]">
			<view class="huanzheview">
				<view class="huanzheTopview">
					<image src="../../static/gongzuotai/icon_nv.png"></image>
					<view class="huanzherightview">
						<view class="firstView">
							<text class="name">{{info.name}} <text class="num">{{info.bunk}}床</text></text>
							<text class="detail">性别：{{info.sex == 1?'男':'女'}} 年龄：{{info.age}}</text>
						</view>
						<view class="secodview">
							<view class="zhenduanview">
								<image class="zhenduanimage" src="../../static/gongzuotai/icon_zhenduan1.png"></image>
								<text class="hidden">诊断：{{info.illnessName}}</text>
							</view>
							<text class="timetext">时间:{{info.createTime}}</text>
						</view>

					</view>
				</view>

			</view>

			<view class="kangfubgview">
				<view class="titleView">
					<view class="leftview">
						<image class="image1" src="../../static/Huanzhexiangqing/icon_mubiao.png"></image>
						<text>病历</text>
					</view>
					<view class="rightview" @click="toPage('/pages/HuanzheDetail/addCaseHistory/addCaseHistory')">
						<image src="../../static/Huanzhexiangqing/icon_tiaozhengmubiao.png" class="image2"></image>

						<text>填写病历</text>
					</view>

				</view>
				<view class="lineview">

				</view>
				<view class="mubiaoview">
					<view class="upview">
						<view class="dot">

						</view>
						<text class="dotTitle">诊断</text>
					</view>
					<text class="mubiaodetail">{{info.diagnose?info.diagnose:'无'}}</text>
				</view>
				<view class="mubiaoview">
					<view class="upview">
						<view class="dot">

						</view>
						<text class="dotTitle">诊疗意见</text>
					</view>
					<text class="mubiaodetail">{{info.medicalOpinion?info.medicalOpinion:'无'}}</text>
				</view>
				<image :src="item.url" mode="aspectFill" class="viewImage" v-for="(item , index) in info.file"></image>
			</view>


			<!-- 			 //康复目标
 -->
			<view class="kangfubgview">
				<view class="titleView">
					<view class="leftview">
						<image class="image1" src="../../static/Huanzhexiangqing/icon_mubiao.png"></image>
						<text>康复目标</text>
					</view>
					<view class="rightview" @click="toPage('/pages/KangfuMubiao/KangfuMubiao')" v-if="my != 1">
						<image src="../../static/Huanzhexiangqing/icon_tiaozhengmubiao.png" class="image2"></image>

						<text>调整目标</text>
					</view>

				</view>
				<view class="lineview">

				</view>
				<view class="mubiaoview">
					<view class="upview">
						<view class="dot">

						</view>
						<text class="dotTitle">短期目标</text>
					</view>
					<text class="mubiaodetail">{{info.shortTermGoals?info.shortTermGoals:'暂未设置'}}</text>
				</view>
				<view class="mubiaoview">
					<view class="upview">
						<view class="dot">

						</view>
						<text class="dotTitle">长期目标</text>
					</view>
					<text class="mubiaodetail">{{info.longTermGoals?info.longTermGoals:'暂未设置'}}</text>
				</view>
			</view>
			<!-- //康复项目 -->


			<view class="kangfubgview">
				<view class="titleView">
					<view class="leftview">
						<image class="image1" src="../../static/Huanzhexiangqing/icon_kangfuxiangmu.png"></image>
						<text>康复项目</text>
					</view>
					<view class="rightview" @click="toPage('/pages/HuanzheDetail/kangfuxiangmu/kangfuxiangmu')">
						<image src="../../static/Huanzhexiangqing/icon_tiaozhengmubiao.png" class="image2"></image>
						<text>调整项目</text>
					</view>
				</view>
				<view class="lineview">

				</view>
				<view class="xiangmuList" v-if="info.treatmentList.length>=1">
					<view v-for="(item , index) in info.treatmentList" :key="index">
						<view class="xiangmuItem" v-for="(v,k) in item.subproject" :key="k">
							<view class="dot"></view>
							<view class="xiangmuItemRight">
								<view style="display: flex;align-items: center;">
									<view class="itemRightTitle">{{v.name}} </view>
									<view class="itemRightTime">{{v.start}} - {{v.end}}</view>
								</view>
								<view class="itemRightRun itemRightRun1" v-if="v.type == 1" >完成</view>
								<view class="itemRightRun itemRightRun2" v-else-if="v.type == 2" >暂停</view>
								<view class="itemRightRun" v-else @click="runXiangMu(k,index)">执行</view>
							</view>
						</view>
					</view>

				</view>
				<view class="notData" v-if="info.treatmentList.length == 0">暂无数据</view>
				<!-- <view class="hview">
					<text>时间</text>
					<view class="v_lineView">
					</view>
					<text>项目</text>
					<view class="v_lineView">

					</view>
					<text>状态</text>
				</view> -->
				<!-- <view v-for='(item,index) in kangfuxiangmu' :key='index'>
					<view class="zhiliaoxiangmu">
						<text class="time">{{item.time}}</text>
						<view class="v_lineView1">

						</view>
						<text class="xiangmu">{{item.title}}</text>
						<view class="v_lineView1">

						</view>
						<text class="redstatus" v-if="item.status == '已结束'">{{item.status}}</text>
						<text class="greenstatus" v-if="item.status == '进行中'">{{item.status}}</text>
						<text class="status" v-if="item.status == '未开始'">{{item.status}}</text>

					</view>
					<view class="line">

					</view>

				</view> -->

			</view>
			<!-- //康复评定 -->
			<view class="kangfubgview" v-if="my != 1">
				<view class="titleView">
					<view class="leftview">
						<image class="image1" src="../../static/Huanzhexiangqing/icon_pingding.png"></image>
						<text>康复评定</text>
					</view>
					<view class="rightview" @click="toPage('/pages/HuanzheDetail/kangFuJiLu/kangFuJiLu')">


						<text>全部评定</text>
					</view>

				</view>
				<view class="lineview">

				</view>
				<view class="xiangmuList">
					<view class="xiangmuItem" @click="toPage('/pages/HuanzheDetail/evaluation/evaluation',v.id)" v-for="(v,k) in info.assessResults"
					 :key="k">
						<view class="dot"></view>
						<view class="xiangmuItemRight">
							<view class="itemRightTitle itemRightTitle1 hidden">{{v.ratingScaleName}}</view>
							<image class="itemRightImage" src="../../static/f_my_kecheng_arrow.png"></image>
						</view>
					</view>
				</view>
				<view class="notData" v-if="info.assessResults.length == 0">暂无数据</view>
				<!-- <view class="mubiaoview">
					<view class="upview">
						<view class="dot">

						</view>
						<text class="dotTitle">评定结果1</text>
					</view>
					<text class="mubiaodetail">患者身体比较虚弱，需要谨慎治疗。</text>
				</view> -->
				<!-- <view class="mubiaoview">
					<view class="upview">
						<view class="dot">

						</view>
						<text class="dotTitle">评定结果2</text>
					</view>
					<text class="mubiaodetail">患者身体比较虚弱，需要谨慎治疗。。</text>
				</view> -->

			</view>
			<!-- //患者记录-->
			<view class="kangfubgview" v-if="my != 1">
				<view class="titleView">
					<view class="leftview">
						<image class="image1" src="../../static/Huanzhexiangqing/icon_jilu.png"></image>
						<text>患者记录</text>
					</view>
					<view class="rightview" @click="toPage('/pages/HuanzheDetail/record/record')">


						<text>全部记录</text>
					</view>

				</view>
				<view class="lineview">

				</view>
				<view class="mubiaoview" @click="toPage('/pages/HuanzheDetail/recordInfo/recordInfo',v.id)" v-for="(v,k) in info.patientRecords"
				 :key="k">
					<view class="upview">
						<view class="dot">
						</view>
						<text class="huanzhejiluTitle hidden">{{v.content}}</text>

					</view>
					<text class="huanzhejilushijian">{{v.createTime}}</text>
					<view class="huanzhelineView">

					</view>
				</view>
				<view class="notData" v-if="info.patientRecords.length == 0">暂无数据</view>
			</view>
			<view class="kejianview" v-if="my != 1">
				<text>其他人可见</text>
				<switch class="switchView" checked="true" style='zoom:.75;' :color="switchColor" />
			</view>
			<view style="width:100%;height:120rpx"></view>
		</scroll-view>
		<view class="bottomview" v-if="my != 1">
			<text class="huanzhepingding" @click="toPage('/pages/KangfuPingdingListPage/KangfuPingdingListPage')">患者评定</text>
			<text class="kangfujilu" @click="toPage('/pages/HuanzheDetail/addRecord/addRecord',0)">添加康复记录</text>
		</view>
		<xiangmu v-if="isShowPerformWindow"  :referrer="referrer" :short="short" :long="long" :number="number" @setNumber="setNumber"
		 @setShowPerformWindowStatus="setShowPerformWindowStatus" @stopProgress="stopProgress" @setShowFinishWindowStatus="setShowFinishWindowStatus"></xiangmu>
		<complete-target v-if="isShowFinishWindow" @confirmFinish="confirmFinish" :number="nowScore" :referrer="referrer"></complete-target>
		<view class="controlview" :style="[{top:navheight+statusBarHeight+ 'px'}]" @click="endZhiListTips" v-show="zhiliaoStaut == 1">

		</view>
	</view>
</template>

<script>
	import request from '../../utils/util.js'
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
				statusBarHeight: 20,
				navheight: 34,
				isShowPerformWindow: false,
				number: 1,
				isShowFinishWindow: false,
				short: '',
				long: '',
				switchColor: '#4CD964',
				viewHeight: 0,
				referrer:0,
				kangfuxiangmu: [{
						time: '2020-06-13',
						title: '治疗项目1',
						status: '已结束'

					}, {
						time: '2020-06-18',
						title: '治疗项目2',
						status: '进行中'
					},

					{
						time: '2020-06-31',
						title: '治疗项目3',
						status: '未开始'

					}
				],
				bgColor: "rgba(49, 216, 128, 1)",
				id: 0,
				nowIndex: 0,
				info: {},
				zhiliaoStaut: 0,
				nowScore: 0,
				my:0
			}
		},
		onShow: function() {
			this.viewHeight = this.$app.getwindowHeight() - 69;
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			//this.navheight = this.navheight+this.statusBarHeight;
			if (this.id) {
				this.init();
			}

		},
		onLoad(options) {
			this.id = options.id ? options.id : 1;
			this.my = options.my;
		},
		methods: {
			endZhiListTips() {
				uni.showToast({
					title: '治疗已结束',
					duration: 1500,
					icon: 'none'
				})
			},
			init() {
				this.getInfo();
			},
			returnBack() {
				uni.navigateBack({

				});
			},
			runXiangMu(k, index) {
				if(this.my == 1) return false;
				let item = this.info.treatmentList[index];
				this.short = item.shortGoals;
				this.long = item.longGoals;
				this.nowIndex = k;
				this.nowIndex__ = index;
				this.number = 1;
				this.nowScore = item.subproject[k].score;
				this.setShowPerformWindowStatus();
			},
			//结束治疗
			endZhiliao(status) {
				let that = this;
				if (status == 1) {
					uni.showModal({
						title: '温馨提示',
						content: '是否结束本次治疗',
						success(res) {
							if (res.confirm) {
								return request({
									url: that.$api.huanzhe.editHuanZhe,
									type: "PUT",
									data: {
										id: that.id,
										status,

									}
								}, true, true).then(data => {
									uni.showToast({
										title: '编辑成功',
										icon: 'none'
									})
									that.zhiliaoStaut = status;
								});
							}
						}
					})
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '是否重新开始本次治疗',
						success(res) {
							if (res.confirm) {
								return request({
									url: that.$api.huanzhe.editHuanZhe,
									type: "PUT",
									data: {
										id: that.id,
										status,

									}
								}, true, true).then(data => {
									uni.showToast({
										title: '编辑成功',
										icon: 'none'
									})
									that.zhiliaoStaut = status;
								});
							}
						}
					})
				}


			},
			getInfo() {
				let that = this;
				return request({
					url: that.$api.huanzhe.getInfo,
					type: "GET",
					data: {
						id: that.id
					}
				}, true, true).then(data => {
					console.log(data.status)
					if (data.status != null) {
						that.zhiliaoStaut = data.status;

					}
					console.log(that.zhiliaoStaut)

					if (data.file) {
						data.file = JSON.parse(data.file);
					}
					if (data.treatmentList.length >= 1) {
						data.treatmentList.map((vv, kk) => {
							if (data.treatmentList[kk].subproject) {
								data.treatmentList[kk].subproject = JSON.parse(data.treatmentList[kk].subproject);
								data.treatmentList[kk].subproject.map((v, k) => {
									let time = new Date(v.value).getTime() + v.time * 60 * 1000;
									let start = new tool().formDate(new Date(v.value), 4);
									let end = new tool().formDate(new Date(time), 4);
									data.treatmentList[kk].subproject[k].start = start;
									data.treatmentList[kk].subproject[k].end = end;
								})
							}
						})


					}
					// if(data.patientRecords.length >=1){
					// data.patientRecords.map((v,k)=>{
					// console.log(data.patientRecords[k].createTime);
					// data.patientRecords[k].createTime = new tool().formDate(new Date(data.patientRecords[k].createTime),'2')
					// })
					// }
					that.info = data;
					console.log(that.info);
				})
			},
			scroll(e) {
				// let top = e.detail.scrollTop>=100?100:e.detail.scrollTop;
				// top = top==0?1:top;
				// let color = (top/100);
				// this.bgColor = `rgba(49, 216, 128, ${color == 0?1:color})`;
			},
			toPage(url, id) {
				let that = this;
				switch (url) {
					case '/pages/HuanzheDetail/addCaseHistory/addCaseHistory':
						url = `/pages/HuanzheDetail/addCaseHistory/addCaseHistory`
						let file = that.info.file;
						let data = {
							file,
							title: that.info.diagnose,
							content: that.info.medicalOpinion
						}
						uni.setStorageSync("cases", {
							data
						});
						break;
					case '/pages/HuanzheDetail/kangfuxiangmu/kangfuxiangmu':
						let data1 = {
							name: that.info.name,
							sex: that.info.sex,
							age: that.info.age,
							illnessName: that.info.illnessName,
							userId: that.info.userId
						};
						uni.setStorageSync("huanZheInfo", {
							huanZheInfo: data1
						});
						break;
				}
				console.log(url);
				if (url == '/pages/HuanzheDetail/recordInfo/recordInfo' || url =='/pages/HuanzheDetail/addRecord/addRecord') {
					uni.navigateTo({
						url: `${url}?id=${this.info.id}&illnessid=${this.info.illnessId}&recordid=${id}`,
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
				} else if (url == '/pages/HuanzheDetail/evaluation/evaluation') {
					uni.navigateTo({
						url: `${url}?id=${this.info.id}&illnessid=${this.info.illnessId}&assessid=${id}&my=${this.my}`,
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
				} else {
					uni.navigateTo({
						url: `${url}?id=${this.info.id}&illnessid=${this.info.illnessId}&my=${this.my}`,
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
				}

			},
			setShowPerformWindowStatus() {
				this.isShowPerformWindow = !this.isShowPerformWindow;
			},
			endXiangMu(index) {
				this.nowIndex = index;
				this.number = 1;
				this.setShowPerformWindowStatus();
				this.short = this.list[index].shortGoals;
				this.long = this.list[index].longGoals;
				console.log(this.list[index]);
			},
			setNumber(data) {
				this.number = data.num;
			},
			confirmProgress() {
				this.setShowPerformWindowStatus();
				this.setShowFinishWindowStatus();
			},
			stopProgress() {
				this.setResults(false).then(() => {
					this.getInfo();
				})
				this.setShowPerformWindowStatus();
			},
			setShowFinishWindowStatus() {
				this.setResults().then(() => {
					this.getInfo();
					this.isShowFinishWindow = !this.isShowFinishWindow;
				})

			},
			confirmFinish() {
				this.isShowFinishWindow = !this.isShowFinishWindow;
				// this.setShowFinishWindowStatus();
			},
			completeXiangMu(f = true) {
				let that = this;
				let id = this.info.treatmentList[that.nowIndex__].subproject[this.nowIndex].id;
				return request({
					url: getApp().$api.huanzhe.editProgram,
					type: "PUT",
					data: {
						doctorId: that.info.userId,
						patientId: that.info.id,
						treatmentId: id,
						tscore: that.number,
						result: f ? 1 : 2
					}
				}).then(data => {
					console.log(data);
				})
			},
			setResults(f = true){
				let that = this;
				let subprojectId = this.info.treatmentList[that.nowIndex__].subproject[this.nowIndex].id;
				let treatmentId = this.info.treatmentList[that.nowIndex__].id;
				let tscore = f?this.number:0;
				let patientId = this.info.id;
				let pscore = f?this.info.treatmentList[that.nowIndex__].subproject[this.nowIndex].score:0;
				
				return request({
					url:getApp().$api.huanzhe.endXiangMu,
					type:"POST",
					data:{
						subprojectId,
						treatmentId,
						tscore,
						patientId,
						pscore,
						doctorId:getApp().globalData.userId,
						result: f ? 1 : 2
					}
				},true,true).then(data=>{
					that.referrer = data.referrer;
					if(data.referrer == data.total){
						 that.setProgress(f);
					}else{
						
					}
					
				})
			},
			setProgress(f = true) {
				console.log('修改当前状态');
				let that = this;
				this.info.treatmentList[that.nowIndex__].subproject[this.nowIndex].type = f ? 1 : 2
				let id = this.info.treatmentList[that.nowIndex__].id;
				let subproject = JSON.stringify(this.info.treatmentList[that.nowIndex__].subproject);
				return request({
					url: getApp().$api.huanzhe.editProgram,
					type: "PUT",
					data: {
						id,
						subproject
					}
				}, false)
			},
			save() {
				console.log('治疗结束')
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
	.contentView {
		display: flex;
		flex-direction: column;
	}

	.controlview {
		z-index: 999;
		width: 100%;
		background-color: rgba(1, 1, 1, 0);
		position: fixed;
		height: 100vh;


	}

	.navview {
		position: relative;
		background-color: #31D880;
		display: flex;
		// flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 68rpx;

		.imageview {
			width: 36rpx;
			height: 36rpx;
			// margin-top: 10rpx;
			margin-left: 30rpx;
		}

		.title {
			position: absolute;
			top: 50%;
			transform: translate(-50%, -50%);
			left: 50%;
			font-size: 36rpx;
			color: #FFFFFF;
		}

		.navRight {
			width: 134rpx;
			height: 48rpx;
			text-align: center;
			line-height: 48rpx;
			font-size: 26rpx;
			color: #2CD571;
			background-color: #FFFFFF;
			border-radius: 8rpx;
			margin-right: 30rpx;
		}


	}

	.notData {
		text-align: center;
		line-height: 60rpx;
		color: #ccc;
		padding-top: 20rpx;
	}

	.bottomview {
		width: 100%;
		height: 69px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;

		.huanzhepingding {
			width: 332rpx;
			height: 80rpx;
			border-radius: 40rpx;
			border: 2rpx solid #2AD36A;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #27D061;
			line-height: 80rpx;
			text-align: center;
		}

		.kangfujilu {
			width: 332rpx;
			height: 80rpx;
			background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
			box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
			border-radius: 40rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
		}
	}

	.huanzheview {
		background: #FFFFFF;
		border-radius: 16rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;

		.huanzheTopview {
			display: flex;
			flex-direction: row;

			image {
				width: 118rpx;
				height: 118rpx;
				margin-top: 20rpx;
				margin-left: 30rpx;
				margin-bottom: 20rpx;
			}

			.huanzherightview {
				display: flex;
				flex-direction: column;
				flex: 1;

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

				.secodview {
					display: flex;
					flex-direction: row;
					position: relative;
					align-items: center;

					.zhenduanview {
						width: fit-content;
						background: #F0F0F0;
						height: 36rpx;
						border-radius: 22rpx;
						display: flex;
						flex-direction: row;
						margin-left: 10rpx;
						padding-right: 15rpx;
						margin-top: 9rpx;
						padding-top: 5rpx;
						display: flex;

						.zhenduanimage {
							width: 28rpx;
							height: 28rpx;
							margin-top: 0rpx;
							margin-left: 5rpx;

						}

						text {
							width: 200rpx;
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-left: 8rpx;
						}
					}

					//

					.timetext {
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-top: 8rpx;
						margin-left: 10rpx;
						position: absolute;
						right: 15rpx;

					}

				}


			}
		}



	}

	.kangfubgview {
		background: #FFFFFF;
		border-radius: 16rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;

		.titleView {
			display: flex;
			flex-direction: row;
			height: 90rpx;
			align-items: center;
			position: relative;

			.leftview {
				display: flex;
				flex-direction: row;
				align-items: center;

				.image1 {
					width: 30rpx;
					height: 26rpx;
					margin-left: 40rpx;
				}

				text {
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-left: 10rpx;
				}
			}

			.rightview {
				display: flex;
				flex-direction: row;
				position: absolute;
				align-items: center;
				right: 32rpx;

				.image2 {
					width: 24rpx;
					height: 24rpx;
				}

				text {
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #2CD571;
					margin-left: 15rpx;
				}
			}


		}

		.viewImage {
			width: 530rpx;
			height: 300rpx;
			// background-color: red;
			margin-left: 82rpx;
			margin-top: 24rpx;
			margin-bottom: 14rpx;
		}

		.lineview {
			height: 2rpx;
			background-color: #EAEAEA;
		}

		//目标

		.mubiaoview {
			display: flex;
			flex-direction: column;

			.upview {
				display: flex;
				flex-direction: row;

				.dot {
					width: 8rpx;
					height: 8rpx;
					background: #31D880;
					border-radius: 4rpx;
					margin-left: 40rpx;
					margin-top: 46rpx;
				}

				.huanzhejiluTitle {
					width: 580rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-left: 30rpx;
					margin-top: 30rpx;
				}

				.dotTitle {

					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-left: 30rpx;
					margin-top: 30rpx;
				}
			}

			.huanzhejilushijian {

				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: 80rpx;
				margin-top: 10rpx;

			}

			.huanzhelineView {
				height: 2rpx;
				background-color: #EAEAEA;
				margin-left: 80rpx;
				margin-top: 20rpx;
			}

			.mubiaodetail {
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-left: 80rpx;
				margin-top: 10rpx;
			}
		}

		.hview {
			display: flex;
			flex-direction: row;
			height: 64rpx;

			text {
				background-color: #E6E6E6;
				color: #000000;
				font-size: 28rpx;
				flex: auto;
				text-align: center;
				line-height: 64rpx;
			}

			.v_lineView {
				width: 2rpx;
				background: #FFFFFF;
			}

		}

		.zhiliaoxiangmu {
			display: flex;
			flex-direction: row;
			height: 50rpx;

			background-color: #FFFFFF;

			.time {

				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				flex: 1;
				text-align: center;
				line-height: 50rpx;
			}

			.v_lineView1 {
				width: 2rpx;
				background: #F5F5F5;
			}

			.xiangmu {

				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				flex: 1;
				text-align: center;
				line-height: 50rpx;
			}

			.redstatus {

				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 50rpx;
				color: #E92C2C;
				flex: 1;
				text-align: center;
			}

			.greenstatus {

				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 50rpx;
				color: #2CD571;
				flex: 1;
				text-align: center;
			}

			.status {

				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 50rpx;
				color: #2F2F2F;
				flex: 1;
				text-align: center;
			}

		}

		.line {
			height: 2rpx;
			background-color: #F5F5F5;
		}
	}

	.kejianview {
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		border-radius: 16rpx;
		align-items: center;
		flex-direction: row;
		margin-bottom: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;
		position: relative;

		text {
			color: #000000;
			font-size: 28rpx;
			margin-left: 30rpx;
			font-weight: 500;
		}

		.switchView {

			position: absolute;
			right: 30rpx;
		}

	}


	.xiangmuList {
		padding-bottom: 8rpx;
	}

	.xiangmuItem {
		width: 690rpx;
		//height: 100rpx;
		display: flex;
		align-items: center;

		.dot {
			width: 8rpx;
			height: 8rpx;
			background-color: #31D880;
			border-radius: 50%;
			margin-left: 40rpx;
			margin-right: 24rpx;
		}

		.xiangmuItemRight {
			flex: 1;
			display: flex;
 			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #f5f5f5;
			font-size: 28rpx;
			color: #333;
padding-top: 10rpx;
padding-bottom: 10rpx;
			.itemRightTitle {
				display: flex;
				max-width: 250rpx;
				margin-right: 22rpx;
  			}

			.itemRightTitle1 {
				width: 500rpx;
			}

			.itemRightImage {
				width: 24rpx;
				height: 30rpx;
				margin-right: 30rpx;
				// background-color: red;
			}

			.itemRightTime {
				font-size: 24rpx;
				color: #999999;
			}

			.itemRightRun {
				width: 80rpx;
				height: 40rpx;
				background-color: #31D880;
				border-radius: 20rpx;
				margin-right: 30rpx;
				text-align: center;
				line-height: 40rpx;
				color: #FFFFFF;
				font-size: 24rpx;
			}

			.itemRightRun1 {
				width: 80rpx;
				height: 40rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				margin-right: 30rpx;
				text-align: center;
				line-height: 40rpx;
				color: #31D880;
				font-size: 24rpx;
			}

			.itemRightRun2 {
				width: 80rpx;
				height: 40rpx;
				background-color: #CCCCCC;
				border-radius: 20rpx;
				margin-right: 30rpx;
				text-align: center;
				line-height: 40rpx;
				color: #FFFFFF;
				font-size: 24rpx;
			}
		}
	}

	.num {
		display: inline-block;
		margin-top: 10rpx;
		margin-left: 16rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
</style>
