<template>
	<view class="page">
		<!-- <view class="status-bar"></view> -->
		<view class="top" :style="[{height:topheight + 'px'}]">

			<view class="search">
				<navigator class="input" url="../Search/Search" hover-class="none" open-type="navigate">
					<image mode="aspectFill" class="searchImage" src="../../static/icon_search.png"></image>

					<text>搜索课程</text>
				</navigator>
				<navigator class="user" url="../Message/Message" hover-class="none">
					<image src="../../static/icon_message.png"></image>
					<text v-if="messageCount > 0">{{messageCount}}</text>
				</navigator>
			</view>


			<!-- 导航 -->
			<view class="navbar" :class="showNavFloat ? 'floatbar' : ''">
				<view class="menu" v-if="category.length > 0">
					<view class="category">
						<scroll-view :scroll-x="true" :scroll-with-animation="true" :scroll-into-view="scroll_category_id" @scroll="navFloatShow()">
							<view class="item" v-for="(item, index) in category" :key="index" :class="category_id == item.id ? 'current' : ''"
							 :id="'category_id-' + index" :style="'width:' + (category.length <= 4 ? 100 / category.length + '%' : '')" @tap="categoryChange(item.id, index)">
								<view class="text">
									<text>{{item.name }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="list" @tap="menuShow(!showMenu)">
						<image src="../../static/icon_tab.png"></image>
					</view>
				</view>
			</view>


			<view class="mainscrollview" @touchmove.stop.prevent>

				<hr-pull-load @refresh='loadData' :pullHeight='50' :maxHeight='100' :lowerThreshold='20' :bottomTips='bottomTips'
				 :isAllowPull="true" :isTab='false' ref='hrPullLoad' :style="[{height:mainscrollviewHeight + 'px'}]">

					<uni-swiper-dot :info="slider" :dots-styles="dotsStyles" :current="current">
						<swiper class="swiper" :autoplay="true" :circular="true" @change="change" :style="[{height:swiperHeight + 'px'}]">
							<swiper-item v-for="(item, index) in slider" :key="index">
								<navigator class="item" hover-class="none" :url="'/pages/article/detail?id=' + item.id">
									<image :lazy-load="true" :src="item.picturesUrl" mode="aspectFill" :style="[{height:swiperHeight + 'px'}]"></image>

								</navigator>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>


					<uni-grid :column="4" class="tikubgview" :square="false" :showBorder="false" @change="secondCategroy" :highlight="false">
						<uni-grid-item v-for="(item ,index) in cateArray" :key="index" :index="index">

							<view class="catebgview">
								<image class="tikuicon" mode="aspectFill" :src="item.icon"></image>
								<text class="tikutitle">{{item.name}}</text>

							</view>

						</uni-grid-item>
					</uni-grid>
					<view class="lineview" v-show="pengyouzaikanList.length>0">

					</view>

					<!-- 				  //横向滚动 朋友在看				  -->
					<view class="bookshelf" v-show="pengyouzaikanList.length>0">
						<view class="sectiontitleview">
							<text class="sectiontitle">朋友在看</text>
						</view>
						<scroll-view scroll-x="true" class="bookshelf-content">
							<block v-for="(item, index) in pengyouzaikanList" :key="index">
								<view class="item" @tap="goDetail(item.id)">
									<view class="img">
										<image :src="item.headUrl" mode="aspectFill">
										</image>
										<text class="biaoqian">医师</text>
									</view>
									<text class="item-title text-over-1">{{item.name}}</text>
									<text class="item-subtitle">{{item.jobTitle}}</text>
								</view>
							</block>
						</scroll-view>
					</view>
					<view class="lineview" v-show="list.length >0">
					</view>

					<!-- //直播 -->
					<view v-show="list.length >0" cla0-ss="sectiontitleview">
						<text class="sectiontitle">直播 </text>
						<text class="sectionrighttitle">查看更多></text>

					</view>
					<articleList class="mainlist" :list="list" />
					<view v-show="recommendCourseList.length >0" class="lineview">

					</view>
					<view v-show="recommendCourseList.length >0" class="sectiontitleview" @click="jumpRecommendPage">
						<text class="sectiontitle">推荐课程</text>
						<text class="sectionrighttitle">查看更多></text>


					</view>

					<uni-grid :column="2" class="recommendgridview" :square="false" :showBorder="false" @change="kechengItemClick">
						<uni-grid-item v-for="(item ,index) in recommendCourseList" :key="index" :index="index">
							<view class="recomendbgview">
								<view class="recomengimageview">
									<image :src="item.coverUrl" mode="aspectFill"></image>
									<text>课程</text>
								</view>
								<text class="recommendtitle_text">{{item.name}}</text>
								<view class="recomendpricebottomView">
									<text class="recommemdpricetext">¥{{item.cost}}元/会员价¥{{item.memberCost}}元</text>
									<!-- <text class="recommendbuynumtext">{{item.name}}人购买</text> -->
								</view>
							</view>

						</uni-grid-item>
					</uni-grid>
					<view v-show="banjiList.length >0" class="lineview">
					</view>
					<view v-show="banjiList.length >0" class="sectiontitleview" @click="jumpRecommedBanjiPage">
						<text class="sectiontitle">班级推荐</text>
						<text class="sectionrighttitle">查看更多></text>
					</view>
					<banjiList class="mainlist" :list="banjiList" />

				</hr-pull-load>
			</view>


		</view>

	</view>
</template>

<script>
	import articleList from '@/components/article/list.vue';
	import banjiList from '@/components/article/banji.vue';
	import hrPullLoad from '@/components/hr-pull-load/hr-pull-load.vue';
	import pageLoading from '@/components/loading/pageLoading.vue';
	import iconfont from '@/components/iconfont/iconfont.vue';
	import util from '@/common/util.js';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
 
	export default {
		components: {
			articleList,
			pageLoading,
			iconfont,
			banjiList,
			hrPullLoad

		},
		data() {
			return {
				bottomTips: '',
				topheight: 90,
				statusBarHeight: 20,
				swiperHeight: 144,
				mainscrollviewHeight: 0,
				messageCount: 0,
				recommendCourseList: [],
				info: [{
						name: '车新颖',
						colorClass: 'uni-bg-red',
						url: 'http://39.99.215.169:8090/sys/common/static/temp/aa_1598422546786.jpg',
						content: '内容 A',
						id: "1"
					},
					{
						name: '车新颖',
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B',
						id: "2"
					},
					{
						name: '车新颖',
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C',
						id: "3"
					},
					{
						name: '车新颖',
						colorClass: 'uni-bg-red',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '内容 A',
						id: "4"
					},
					{
						name: '车新颖',
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B',
						id: "5"
					},
					{
						name: '车新颖',
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C',
						id: "6"
					}

				],
				category_id: 1,
				category_index: 0,
				scroll_category_id: 'scroll_category_id_0',
				currentSliderIndex: 0,
				category: [],
				banjiList: [],
				pengyouzaikanList: [],
				//考试直播课程，学习班
				cateArray: [{
						icon: '../../static/icon_kaoshi.png',

						name: "考试"
					},
					{
						icon: "../../static/icon_zhibo.png",
						name: "直播"
					},
					{
						icon: "../../static/icon_kecheng.png",
						name: "课程"
					},
					{
						icon: "../../static/icon_xuexiban.png",
						name: "学习班"
					}
				],
				imageurl: 'http://39.99.215.169:8090/sys/common/static/',
				showMenu: false,
				slider: [],
				list: [],
				showNoData: false,
				showPageLoading: false,
				showNavFloat: false,
				navBarHeight: '',
				current: 0,
				mode: 'long',
				dotsStyles: {
					backgroundColor: 'rgba(255, 255, 255,1)',
					border: '1px #31D8B1 solid',
					color: '#fff',
					selectedBackgroundColor: '#31D8B1',
					selectedBorder: '1px #31D8B1 solid',
					bottom: 10
				}
			};
		},
		 
		onShow() {
			//this.$initPageTitle(); //初始化页面标题
			let systemInfo = uni.getSystemInfoSync();
			const system = systemInfo.platform
			this.statusBarHeight = systemInfo.statusBarHeight

			this.topheight += this.statusBarHeight;
			/*导航栏高度*/
			if (this.navBarHeight == '') {
				this.navBarHeight = this.$app.getNaviBarHeight();

				console.log("高度" + this.navBarHeight);
			}
			this.mainscrollviewHeight = this.$app.getwindowHeight() - this.navBarHeight - this.statusBarHeight - 10;
			this.swiperHeight = (this.$app.getwindowWidth() - 60) * 0.417;
			/*来源是登录时更新*/
			let source = uni.getStorageSync('source');
			if (source == 'login') {
				uni.removeStorageSync('source');
				this.loadData();
			}
		},
		onShareAppMessage() {
			uni.reques
			return {
				path: '/pages/article/index',
				success: function(e) {},
				title: '开心品生活'
			};
		},
		onLoad(e) {
			// #ifdef H5
			if (e.category_id > 0) {
				this.category_id = e.category_id;
			}
			if (e.category_index > 0) {
				this.category_index = e.category_index;
			}
			// #endif
			this.getCategory();
			this.loadData()
		},

		methods: {
			/*初始化滚动*/
			initScroller(scroller) {
				this.scroller = scroller;
			},
			change(e) {
				this.current = e.detail.current
			},
			/*刷新数据*/
			refreshData() {
				// uni.showLoading({
				// 	title: 'dingbu刷新中'
				// });
				console.log("refreshdata")
				this.scroller.resetUpScroll();
			},

			/*加载数据*/
			loadData() {
				this.recommendCourseList = [];
				this.banjiList = [];
				this.getRecommendCoureData();
				this.getRecommendClassList();
				this.getpengyouZaikan();
				this.getBannerData();
			},
			//获取朋友在看

			getpengyouZaikan() {
				console.log("dudhi" + getApp().globalData.userId)
				var that = this
				this.$app.request({
					url: this.$api.shouye.getPengyouzaikanList,
					method: 'GET',
					data: {
						user_id: 10
					},
					dataType: 'json',
					success: res => {
						console.log("++++" , res)
						if (res.code == 200) {
							that.pengyouzaikanList = res.result

						} else {
							this.$alert(res.msg);
						}
					},
					complete: res => {}
				});
			},
			/*获取子类别数据*/
			getCategory() {
				var that = this;
				this.$app.request({
					url: this.$api.shouye.getcourseCategoryList,
					method: 'GET',
					dataType: 'json',
					success: res => {
						console.log("dddddd")
						console.log(res)
						if (res.code == 200) {
							console.log(res)
							that.category = res.result.records;
							if (that.category_index > -1) {
								let nextIndex = that.category_index - 1;
								nextIndex = nextIndex <= 0 ? 0 : nextIndex;
								that.scroll_category_id = `category_id-${nextIndex}`; //动画滚动,滚动至中心位置
							}
						} else {
							this.$alert(res.msg);
						}
					},
					complete: res => {}
				});
			},

			/*获取推荐课程数据*/
			getRecommendCoureData() {
				console.log('getdata' + this.category_id)
				var that = this;
				this.$app.request({
					url: this.$api.shouye.getRecommendcourseList,
					data: {
						course_type: that.category_id,
						pageNo: 1,
						pageSize: 10,
						user_id: 10 //getApp().globalData.userId
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						console.log(res)

						that.$refs.hrPullLoad.reSet();
						if (res.code == 200) {

							that.recommendCourseList = res.result;
							that.showPageLoading = false;

						} else {
							that.$alert(res.msg);
						}
					},
					fail: res => {
						console.log("ffff" + res)

					},
					complete: res => {

					}
				});
			},
			//获取宣传图
			getBannerData() {
				this.$app.request({
					url: this.$api.shouye.getBannerImageList,
					method: 'GET',
					dataType: 'json',
					success: res => {

						if (res.code == 200) {
							this.slider = res.result;

						} else {
							this.$alert(res.msg);
						}
					},
					fail: res => {

					},
					complete: res => {
						this.$refs.hrPullLoad.reSet();

					}
				});

			},
			// 获取推荐学习班 //推荐花费的
			getRecommendClassList() {
				var that = this;
				this.$app.request({
					url: this.$api.shouye.getRecommendClassList,
					data: {
						class_type: this.category_id,
						pageNo: 1,
						pagenum: 1,
						pageSize: 10,
						user_id: 10 //getApp().globalData.userId
					},
					method: 'GET',
					dataType: 'json',
					success: res => {

						if (res.code == 200) {


							that.banjiList = res.result;

						} else {
							this.$alert(res.msg);
						}
					},
					fail: res => {

					},
					complete: res => {
						this.$refs.hrPullLoad.reSet();

					}
				});
			},
			/*切换导航*/
			categoryChange(category_id, index) {
				this.showMenu = false;
				this.category_index = index;
				this.category_id = category_id;
				var nextIndex = index - 1;
				nextIndex = nextIndex <= 0 ? 0 : nextIndex;
				this.scroll_category_id = `category_id-${nextIndex}`; //动画滚动,滚动至中心位置
				this.loadData();
				// #ifdef H5
				// uni.navigateTo({
				// 	url: '/pages/article/list?category_id=' + this.category_id + '&category_index=' + this.category_index
				// });
				// #endif
			},
			//点击考试/直播/课程/学习班
			secondCategroy: function(e) {
				switch (e.detail.index) {
					case 0:
						{

							uni.navigateTo({
								url: 'Kaoshi/Kaoshi',
								animationType: "slide-in-right",
								animationDuration: 300
							})

						}
						break;
					case 1:
						{

							uni.navigateTo({
								url: '../Zhibo/Zhibo',
								animationType: "slide-in-right",
								animationDuration: 300
							})

						}
						break;
					case 2:
						{
							uni.navigateTo({
								url: 'Kecheng/Kecheng',
								animationType: "slide-in-right",
								animationDuration: 300
							})


						}
						break;
					case 3:
						{

							// uni.navigateTo({
							// 	url: 'XuexiBan/XuexiBan',
							// 	animationType: "slide-in-right",
							// 	animationDuration: 300
							// })

						}
						break;

				}
			},
			//点击 朋友在看item

			goDetail(index) {
				// url:'../../goods/gooddetail/gooddetail?id='+this.zhibokeArray[e.detail.index].id,
				console.log(index)

				uni.navigateTo({
					url: 'TeacherDetail/TeacherDetail?id=' + index,
					animationType: "slide-in-right",
					animationDuration: 300
				})
			},
			//点击推荐课程

			kechengItemClick: function(e) {
				uni.navigateTo({

					url: '/pages/Daxue/KechengDetail/KechengDetail?id=' + e.detail.index,
					animationType: "slide-in-right",
					animationDuration: 300
				})
			},

			/*广告切换*/
			sliderChange: function(e) {
				this.currentSliderIndex = e.detail.current;
			},

			/*滚动时导航栏浮动*/
			navFloatShow(scroller) {
				if (scroller) {
					if (scroller.scrollTop > 60) {
						if (!this.showNavFloat) {
							this.showNavFloat = true;
						}
					} else {
						if (this.showNavFloat) {
							this.showNavFloat = false;
						}
					}
				}
			},
			/*菜单框展示*/
			menuShow(value) {
				this.showMenu = value;
			},
			/*隐藏导航浮动*/
			navFloatHide() {
				this.showNavFloat = false;
			},
			///跳转推荐课程页面
			jumpRecommendPage() {
				uni.navigateTo({
					url: 'RecommendCourse/RecommendCourse',
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			jumpRecommedBanjiPage() {
				uni.navigateTo({
					url: 'BanjiTuijian/BanjiTuijian',
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}

		}
	};
</script>
<style>

</style>
<style scoped lang="scss">
	page {
		height: 100%;

	}

	/deep/.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	.page {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.content {
		width: 100%;
		position: fixed;
		height: 90%;


	}

	.testview {
		flex-direction: column;
		display: flex;
	}

	/*头部*/
	.top {
		background-color: #FFFFFF;
		position: fixed;
		width: 100%;
 		/*页面标题*/
		.page-title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90rpx;
			text-align: center;
			border-bottom: 1rpx solid #efefef;
			z-index: 9999;
			line-height: 1;

			image {
				height: 50rpx;
				width: 280rpx;
				margin-left: -35rpx;
			}
		}

		/*搜索*/
		.search {
			margin-top: var(--status-bar-height);
			padding: 24rpx 24rpx 0 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.searchImage {
				width: 26rpx;
				height: 26rpx;
				margin-left: 22rpx;
			}

			.logo {
				height: 60rpx;
				width: 474rpx;
				margin-right: 30rpx;
			}

			.input {
				margin-left: 0 !important;
				display: flex;
				align-items: center;
				height: 64rpx;
				width: 100%;
				background: #F1F1F1;
				border-radius: 34rpx 34rpx 34rpx 34rpx;

				/deep/ .icon {
					margin-left: 28rpx;
					color: #aaaaaa;
					font-size: 32rpx;
					line-height: 1;
				}

				text {
					margin-left: 14rpx;
					font-size: 28rpx;
					color: #666666;
					line-height: 1;
				}
			}

			.user {
				display: flex;
				position: relative;

				/deep/ .icon {
					margin-left: 24rpx;
					color: #aaaaaa;
					font-size: 38rpx;
					margin-top: 4rpx;
				}

				text {
					background-color: #FF5C5C;
					color: #FFFFFF;
					font-size: 14rpx;
					position: absolute;
					right: -10rpx;
					top: -10rpx;
					padding-left: 8rpx;
					padding-right: 8rpx;
					height: 22rpx;
					text-align: center;
					line-height: 22rpx;
					border-radius: 11rpx;
				}

				image {
					width: 46rpx;
					height: 36rpx;
					margin-left: 18rpx;
				}
			}
		}

		/* 顶部navbar */
		.navbar {

			/*分类*/
			.menu {
				position: relative;
				height: 75rpx;
				white-space: nowrap;
				padding: 15rpx 0 6rpx;
				z-index: 10;
				display: flex;
				align-items: center;
				justify-content: space-between;

				/*分类*/
				.category {
					width: 89%;
					margin-left: 30rpx;
					white-space: nowrap;
					position: relative;

					scroll-view {
						width: auto;

						.item {
							position: relative;
							display: inline-block;
							margin: 0 20rpx 0;
							height: 80rpx;
							text-align: left;
							padding-top: 7rpx;

							//line-height: 80rpx;
							&:first-child {
								margin-left: 10rpx;
							}

							&:after {
								content: '';
								width: 0;
								height: 0;
								position: absolute;
								left: 50%;
								bottom: 0;
								transform: translateX(-50%);
								transition: 0.3s;
							}

							.text {
								position: relative;
								width: auto;
								height: auto;
								line-height: auto;
								display: inline-block;

								text {
									font-size: 28rpx;
									font-weight: bold;
									color: #666;
								}

								image {
									position: absolute;
									top: 10rpx;
									right: -14rpx;
									width: 40rpx;
									height: 40rpx;
									display: none;
								}
							}
						}

						.current {
							position: relative;

							&:after {
								content: " ";
								width: 25upx;
								height: 6upx;
								background: #31D8B1;
								position: absolute;
								bottom: 20upx;
								left: 50%;
								border-top-right-radius: 4upx;
								border-top-left-radius: 4upx;
								border-bottom-left-radius: 4upx;
								border-bottom-right-radius: 4upx;

								transform: translateX(-50%); //居中处理
							}

							.text {

								text {
									font-size: 32rpx;
									font-weight: bold;
									color: #000;
								}

								image {
									display: block;
								}

								display: block;
								width: 50%;
							}
						}
					}
				}

				.list {
					width: 100%;

					display: flex;
					align-items: center;
					background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);

					//box-shadow: -4rpx 0 0 #e9ebee;
					//box-shadow: -2px 0 0 #262626;
					/deep/ .icon {
						font-size: 22rpx;
						margin-top: 0rpx;
					}

					image {
						width: 28upx;
						height: 20upx;
						position: absolute;
						right: 25upx;

					}

					margin-top: -20rpx;
				}
			}
		}
	}

	.menu-block {
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		border-bottom: 1rpx solid #f5f5f5;
		padding: 20rpx 0 50rpx;
		z-index: 100;
		width: 100%;

		//box-shadow: 0 15rpx 10rpx -15rpx #e9ebee;
		.list {
			padding-left: 10rpx;

			text {
				background: #f5f7fa;
				border-radius: 8rpx;
				font-size: 32rpx;
				margin: 12rpx 20rpx;
				display: inline-block;
				height: 72rpx;
				width: 144rpx;
				line-height: 72rpx;
				text-align: center;
			}

			.current {
				color: #fff;
				background: #8cc7b5;
				//font-size: 32rpx;
			}
		}
	}

	.mainscrollview {
		width: 100%;
		position: fixed;


	}

	.scroll {
		display: flex;
		padding-bottom: 20px;
	}

	/*幻灯片广告 */
	.swiper {
		margin: 0rpx 30rpx 0;

		image {
			width: 100%;
			border-radius: 8rpx;

			//box-shadow: 0 0 12px #dddee1;
		}

		.current {
			width: 97%;
			height: 350rpx;
			margin: 1.5% 1.5%;
			transition: all 0.2s ease-in 0s;
		}

		.item {
			position: relative;

			.title {
				position: absolute;
				left: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				width: 100%;

				text {
					margin: 7% 6%;
					display: flex;
					align-items: center;
					//background-image: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
					//background-image: linear-gradient(90deg,rgba(255, 181, 19,.8),rgba(255, 181, 19,.2));
					color: #fff;
					display: -webkit-box;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					font-size: 34rpx;
					padding: 14rpx 20rpx;
					max-width: 610rpx;
					line-height: 1.3;
					border-radius: 5rpx;
				}
			}
		}
	}

	.mainlist {
		background-color: #FFFFFF;
		margin-top: 10upx;
	}

	/*浮动navbar*/
	.floatbar {
		//border-bottom: 1rpx solid #e8e8e8;
		box-shadow: 0px 2px 2px -2px #e8e8e8;
		padding-bottom: 12rpx;
	}

	/deep/ .no-data {
		margin-top: 200rpx;
	}

	//第二个
	.tikubgview {
		width: 100%;
		margin-top: 20upx;
		background-color: #FFFFFF;
	}

	.tikuicon {
		width: 80rpx;
		height: 48rpx;
	}

	.tikutitle {
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		justify-content: center;
		text-align: center;
	}

	.catebgview {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		height: auto;
		justify-content: center;
		align-items: center;
	}

	.sectiontitleview {
		margin-top: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.sectiontitle {
			margin-left: 30rpx;
			font-size: 32rpx;
			color: #000000;
			font-weight: 600;


		}

		.sectionrighttitle {
			margin-right: 15px;
			font-size: 18rpx;
			color: #999;
			text-align: center;

		}
	}

	//朋友在看
	.bookshelf {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;

		.bookshelf-content {
			white-space: nowrap; // 滚动必须加的属性
			width: 100%;
			padding-top: 10upx;

			.item {
				margin-top: 20upx;
				margin-left: 30upx;
				display: inline-block;
				vertical-align: top;

				.img {
					display: inline-block;
					position: relative;
					width: 192upx;
					height: 232upx;

					image {
						width: 192upx;
						height: 232upx;
						border-radius: 8upx;
					}

					.biaoqian {
						position: absolute;
						bottom: 15rpx;
						right: 10rpx;
						background-color: #777;
						font-size: 16rpx;
						color: #fff;
						padding-left: 8rpx;
						padding-right: 8rpx;
						border-radius: 5rpx;
						line-height: 22upx;
						text-align: center;

					}
				}

				.item-title {
					display: block; // 让字体换行
					width: 90%;
					font-size: 24upx;
					line-height: 40upx;
					font-weight: 500;
					margin-top: 12upx;
				}

				.item-subtitle {
					display: block; // 让字体换行
					width: 90%;
					font-size: 18upx;
					line-height: 26upx;
					color: #999;
				}
			}
		}
	}

	//推荐课程
	.recommendgridview {
		height: auto;
		margin-bottom: 20upx;
		margin-top: 10upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding-left: 15upx;
		padding-right: 15upx;

	}

	.recomendbgview {
		flex-direction: column;
		display: flex;
		padding-left: 15upx;
	}

	.recomengimageview {

		margin-top: 22upx;
		position: relative;
		width: 330upx;
		height: 220upx;

		image {
			width: 330upx;
			height: 220upx;
			border-radius: 8upx;

		}

		text {
			position: absolute;
			background-color: #777;
			font-size: 16upx;
			color: #FFFFFF;
			width: 46upx;
			height: 24upx;
			border-radius: 4px;
			right: 14upx;
			bottom: 12upx;
			text-align: center;
			line-height: 24upx;
		}

	}

	.recommendtitle_text {

		font-size: 28upx;
		height: auto;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		margin-top: 20upx;
		width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/

	}

	.recomendpricebottomView {
		width: 90%;
		height: auto;
		margin-top: 10upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.recommemdpricetext {
		font-size: 20upx;
		font-weight: 500;
		color: rgba(250, 6, 17, 1);
		line-height: 26upx;
	}

	.recommendbuynumtext {
		font-size: 15upx;
		font-family: FZHTK;
		font-weight: normal;
		color: rgba(106, 106, 106, 1);
		line-height: 34upx;
	}

	.lineview {
		width: 100%;
		height: 8upx;
		background-color: #F9F9F9;
		margin-top: 30rpx;
	}
</style>
