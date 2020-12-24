<template>
	<view>
		<scroll-view scroll-y="true" :style="[{height:viewHeight + 'px'}]">


			<view class="bgview">
				<!-- <image class="bgimage" src="../../static/gongzuotai/bg_gongzuotai.png" :style="[{height:topImageHeight + 'px'}]"></image> -->
				<view class="bgimage" :style="'width:100%;'+'height:'+topImageHeight +'px'"></view>
				<text class="maintitle">工作台</text>
				<text class="nametitle">{{info.name}} > </text>
				<text class="time">{{info.createTime}}</text>
				<text class="loginout" @click="loginoutaction">退出</text>
				<view class="hview">
					<view class="v_view">
						<text class="uptitle">{{info.score?info.score:0}}</text>
						<text class="downtitle">得分</text>
					</view>
					<view class="v_line">

					</view>
					<view class="v_view">
						<text class="uptitle">{{info.time?info.time:0}}</text>
						<text class="downtitle">服务时长</text>
					</view>
					<view class="v_line">

					</view>
					<view class="v_view">
						<text class="uptitle">{{info.people?info.people:0}}人</text>
						<text class="downtitle">服务人数</text>
					</view>
				</view>
				<view class="secondview">
					<view class="secondH_view">
						<view class="secondV_view" v-for="(item,index) in huanzheTitle" @click="huanzheAction(index)" :key='index'>
							<image :src="item.icon"></image>
							<text>{{item.title}}</text>
						</view>
					</view>
					<view class="zhiboHview">


						<view class="zhiboview" :style="[{height:zhiboimageheight + 'px',width:zhiboimagewidth + 'px'}]" @click="zhiboaction(0)">
							<image src="../../static/gongzuotai/bg_zhibo.png" class="zhiboimage" :style="[{height:zhiboimageheight + 'px',width:zhiboimagewidth + 'px'}]"></image>
							<text class="zhibotitle">名医科普直播</text>
							<text class="zhibosubtitle">健康知识科普</text>
							<text class="tipview">看直播</text>
						</view>
						<view class="zhiboview" :style="[{height:zhiboimageheight + 'px',width:zhiboimagewidth + 'px'}]" @click="zhiboaction(1)">
							<image src="../../static/gongzuotai/bg_huiyuan.png" class="zhiboimage" :style="[{height:zhiboimageheight + 'px',width:zhiboimagewidth + 'px'}]"></image>
							<text class="zhibotitle">升级成为会员</text>
							<text class="zhibosubtitle">工作台使用</text>
							<text class="huiyuantipview">升级会员</text>
						</view>


					</view>
					<view class="lineview">

					</view>
					<view class="secondH_view">
						<view class="secondV_view2" v-for="(item,index) in wodehuanzhe" :key='index' @click="wodehuanzheAction(index)">
							<image :src="item.icon"></image>
							<text>{{item.title}}</text>
						</view>



					</view>
				</view>
				<view class="listtipview">
					<text class="listtitle">患者列表</text>
					<text class="listrighttitle" @click="toPage('/pages/work/patientsList/patientsList')">查看更多 > </text>
				</view>


				<view class="huanzheview" v-for="(item,index) in list" :key="index" @click="huanzheXiangqing(item.id)">
					<view class="huanzheTopview">
						<image :src="item.sex == 1?'../../static/gongzuotai/icon_nan.png':'../../static/gongzuotai/icon_nv.png'"></image>
						<view class="huanzherightview">
							<view class="firstView">
								<text class="name">{{item.name}}</text>
								<text class="detail">性别：{{item.sex == 1?'男':'女'}} 年龄：{{item.age?item.age:''}}</text>
							</view>
							<view class="zhenduanview">
								<image class="zhenduanimage" src="../../static/gongzuotai/icon_zhenduan1.png"></image>
								<text>诊断：{{item.illnessName}}</text>
							</view>
						</view>
					</view>
					<view class="Hlinew">

					</view>
					<view class="huanzheBottomView">

						<view class="timeview">
							<image src="../../static/gongzuotai/icon_shijian_hong.png" mode=""></image>
							<text>输入时间：{{item.createTime}}</text>
						</view>
						<text class="bianhao">编号：{{item.num}}</text>
					</view>

				</view>
			</view>

		</scroll-view>

	</view>

</template>

<script>
	import request from '../../utils/util.js';
	export default {
		data() {
			return {
				viewHeight: 0,
				huanzheTitle: [{
						title: '新增患者',
						icon: '../../static/gongzuotai/icon_xinzeng.png'
					}, {
						title: '历史患者',
						icon: '../../static/gongzuotai/icon_lishi.png'
					},
					{
						title: '添加笔记',
						icon: '../../static/gongzuotai/icon_biji.png'
					}
				],

				wodehuanzhe: [{
						title: '我的患者',
						icon: '../../static/gongzuotai/icon_wodehuanzhe.png'
					},
					{
						title: '一键比较',
						icon: '../../static/gongzuotai/icon_bijiao.png'
					},
					{
						title: '学习笔记本',
						icon: '../../static/gongzuotai/icon_bijiben.png'
					},
					{
						title: '后台设置',
						icon: '../../static/gongzuotai/icon_houtai.png'
					}
				],
				topImageHeight: '',
				zhiboimagewidth: '',
				zhiboimageheight: '',
				info:{},
				list:[]

			}
		},

		onShow: function() {
			this.viewHeight = this.$app.getwindowHeight()
			this.topImageHeight = this.$app.getwindowWidth() * 0.73
			this.zhiboimagewidth = this.$app.getwindowWidth() * 0.4;
			this.zhiboimageheight = this.zhiboimagewidth * 0.5
			if (getApp().globalData.userId) {
			 
			
			} else {
				//未登陆
				uni.navigateTo({
					url: '../Login/Login/Login',
					animationType: 'slide-in-bottom',
					animationDuration: 300
				});
			}

		},
		onLoad() {
			this.getInfo().then(()=>{
				this.getHuanZheList();
			})
			
		},
		methods: {
			//退出登录
			loginoutaction() {
				uni.showModal({
					title: "提示",
					content: '确认退出当前登录账号？',
					success: function(e) {

						if (e.confirm) {
 							uni.setStorageSync('userid', null)
							uni.setStorageSync('name', null)
							uni.setStorageSync('roletype',null)
							uni.setStorageSync('headurl', null)
							uni.setStorageSync('phone', null)
							uni.setStorageSync("wxid",null);
							getApp().globalData.userId = null;
							 

						} else if (e.cancel) {
							console.log('用户点击取消');

						}
					}
				})
			},
			getInfo() {
				let that = this;
				return request({
					url: getApp().$api.work.getInfo,
					type: 'GET',
					data:{
						id:getApp().globalData.userId
					}
				},true,true).then(data=>{
					that.info = data;
					that.info.name = uni.getStorageSync('name')
					console.log(data);
				})
			},
			//新增患者 历史患者  添加笔记 等响应方法
			huanzheAction(index) {
				switch (index) {

					case 0:
						{

							uni.navigateTo({
								url: '../AddHuanzhe/AddHuanzhe',
								animationDuration: 300,
								animationType: 'slide-in-right'
							})
						}
						break;

					case 1:
						{
							uni.navigateTo({
								url: '../work/history/history',
								animationDuration: 300,
								animationType: 'slide-in-right'
							})
						}
						break;
					case 2:
						{
							uni.navigateTo({
								url: '/pages/work/addNotes/addNotes',
								animationDuration: 300,
								animationType: 'slide-in-right'
							})
						}
						break;


				}
			},
			//直播，成为会员点击响应方法
			zhiboaction(index) {

				if (index == 0) {
					uni.navigateTo({
						url: '../Zhibo/Zhibo',
						animationType: 'slide-in-right',
						animationDuration: 300
					})
				} else {
					uni.navigateTo({
						url: '/pages/Wode/members/members',
						animationType: 'slide-in-right',
						animationDuration: 300
					})
				}

			},
			//我的患者 一键比较 学习笔记本 后台设置
			wodehuanzheAction(index) {

				switch (index) {

					case 0:
						{
							uni.navigateTo({
								url: '../WodeHuanzhe/WodeHuanzhe',
								animationDuration: 300,
								animationType: "slide-in-right"
							})
						}
						break;
					case 1:
						{
							uni.navigateTo({
								url: '../work/compare/compare',
								animationDuration: 300,
								animationType: "slide-in-right"
							})
						}
						break;
					case 2:
						{
							uni.navigateTo({
								url: '/pages/work/notesList/notesList',
								animationDuration: 300,
								animationType: "slide-in-right"
							})
						}
						break;
					case 3:
						{
							uni.navigateTo({
								url: '../work/setBack/setBack',
								animationDuration: 300,
								animationType: "slide-in-right"
							})
						}
						break;
				}

			},
			//患者详情

			huanzheXiangqing(id) {
				uni.navigateTo({
					url: '../HuanzheDetail/HuanzheDetail?id='+id,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},

			init() {
				this.getHuanZheList();
			},
			getHuanZheList() {
				let that = this;
				return request({
					url: that.$api.huanzhe.getMyPatientsList,
					type: 'GET',
					data: {
						pageNo: 1,
						pageSize: 6
					},
					userId: getApp().globalData.userId
				},true,true).then(data => {
					that.list = data.records;
					console.log(that.list);
				})
			},
			toPage(url){
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>
<style>

</style>
<style scoped lang="scss">
	.bgview {
		display: flex;
		flex-direction: column;
		background-color: #F7F7F7;
		position: relative;
		padding-bottom: 30rpx;

		.bgimage {
			width: 100%;
			position: absolute;
			z-index: 0;
			background-color: #31D880;
		}

		.maintitle {
			font-size: 56rpx;
			font-weight: 600;
			color: #FFFFFF;
			margin-left: 56rpx;
			margin-top: 110rpx;
			line-height: 80rpx;
			z-index: 1;
		}

		.nametitle {

			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			margin-left: 56rpx;
			margin-top: 10rpx;
			z-index: 1;

		}

		.loginout {
			width: 166rpx;
			height: 48rpx;
			background: #D3FFF3;
			border-radius: 29rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #64E09F;
			line-height: 48rpx;
			text-align: center;
			position: absolute;
			z-index: 1;
			top: 146rpx;
			right: 30rpx;
		}

		.time {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #D3FFF3;
			margin-left: 56rpx;
			margin-top: 14rpx;
			z-index: 1;

		}

		.hview {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			margin-top: 34rpx;
			z-index: 1;

			.v_view {
				display: flex;
				flex-direction: column;
				align-items: center;

				.uptitle {
					font-size: 36rpx;
					font-weight: 600;
					color: #FFFFFF;
				}

				.downtitle {
					font-size: 24rpx;
					color: #CBFEF4;
					margin-top: 5rpx;
				}
			}

			.v_line {
				width: 2rpx;
				height: 54rpx;
				background-color: #C4FFF1;

			}
		}

		.secondview {
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 8rpx 0px rgba(233, 233, 233, 0.5);
			border-radius: 16rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 30rpx;
			z-index: 2;

			.secondH_view {
				display: flex;
				flex-direction: row;
				justify-content: space-around;

				.secondV_view {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 108rpx;
						height: 78rpx;
						margin-top: 30rpx;
					}

					text {
						font-size: 28rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #333333;
						margin-top: 20rpx;
					}
				}

				.secondV_view2 {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 62rpx;

					image {
						width: 72rpx;
						height: 72rpx;
						margin-top: 52rpx;
					}

					text {
						font-size: 24rpx;
						color: #333333;
						margin-top: 12rpx;
					}
				}

			}

			.zhiboHview {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-left: 30rpx;
				padding-right: 30rpx;
				margin-top: 36rpx;

				.zhiboview {
					display: flex;
					flex-direction: column;
					position: relative;

					.zhiboimage {
						position: absolute;
						z-index: -1;
					}

					.zhibotitle {

						font-size: 26rpx;
						font-weight: 500;
						color: #333333;
						margin-left: 24rpx;
						margin-top: 18rpx;
					}

					.zhibosubtitle {

						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-left: 24rpx;
						margin-top: 5rpx;

					}

					.huiyuantipview {
						width: 89rpx;
						height: 30rpx;
						background: #3FC5AA;
						border: 2px solid #3FC5AA;
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
						line-height: 30rpx;
						margin-left: 26rpx;
						margin-top: 16rpx;
					}

					.tipview {
						width: 89rpx;
						height: 30rpx;
						background: #32C5FF;
						border: 2px solid #32C5FF;
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
						line-height: 30rpx;
						margin-left: 26rpx;
						margin-top: 16rpx;
					}
				}

			}

			.lineview {
				height: 2px;
				margin-left: 30rpx;
				margin-right: 30rpx;
				margin-top: 30rpx;
				background-color: #E6E6E6;
			}
		}

		.listtipview {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 44rpx;
			align-items: center;

			.listtitle {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.listrighttitle {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
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




				}
			}

			.Hlinew {
				height: 2rpx;
				background-color: #EAEAEA;
				margin-top: 18rpx;
			}

			.huanzheBottomView {
				display: flex;
				flex-direction: row;
				margin-bottom: 15rpx;
				position: relative;

				.bianhao {

					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-top: 15rpx;
					position: absolute;
					right: 32rpx;

				}

				.timeview {
					margin-top: 15rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-left: 30rpx;

					text {

						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-left: 10rpx;
					}

					image {
						width: 28rpx;
						height: 28rpx;

					}
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
