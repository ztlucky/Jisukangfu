<template>
	<view class="page">
 		 
	 

			<!-- 导航 -->
			<view class="navbar" :class="showNavFloat ? 'floatbar' : ''">
				<view class="menu" v-if="category.length > 0">
					<view class="category">
						<scroll-view   :scroll-x="true" :scroll-with-animation="true" :scroll-into-view="scroll_category_id" @scroll="navFloatShow()">
							<view
								class="item"
								v-for="(item, index) in category"
								:key="index"
								:class="category_id == item.id ? 'current' : ''"
								:id="'category_id-' + index"
								:style="'width:' + (category.length <= 4 ? 100 / category.length + '%' : '')"
								@tap="categoryChange(item.id, index)"
							>
								<view class="text">
									<text>{{ item.name }}</text>
 								</view>
							</view>
						</scroll-view>
					</view>
					<view class="list" @tap="menuShow(!showMenu)"><image src="../../static/icon_tab.png"></image></view>
				</view>
			</view>
		
 	<view class="mainscrollview"  >
 		 
 	 <scroller  class="scroll" @init="initScroller" @down="refreshData" @up="getData" :up="optUp" @scroll="navFloatShow(scroller)" :fixed="false">
 			 

 					 		
 		<articleList   class="mainlist" :list="list"   />
 					                             				
 						 
  	
 		</scroller>
  </view> 
	 
		
		 
 	
 
 </view>
</template>

<script>
import scroller from '@/components/scroller/scroller.vue';
  import articleList from '@/components/article/list.vue';
  import banjiList  from '@/components/article/banji.vue';

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
		scroller,
		iconfont,
		banjiList
	},
	data() {
		return {  
 			statusBarHeight:20,
 			scroller: {},
			optUp: { auto: true, onScroll: true, page: { size:10 }, empty: { tip: '暂无文章~' } },
			category_id: 1,
			category_index: 0,
			scroll_category_id: 'scroll_category_id_0',
			currentSliderIndex: 0,
			category: [],
			 
			
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
									bottom:10
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
			 
			 console.log("高度"+this.navBarHeight);
		}
    // this.mainscrollviewHeight = this.$app.getwindowHeight();
 	


		/*来源是登录时更新*/
		let source = uni.getStorageSync('source');
		if (source == 'login') {
			uni.removeStorageSync('source');
			this.loadData();
		}
	},
	onShareAppMessage() {
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
	},
	onPullDownRefresh() {
		uni.showLoading({
			title: '刷新中'
		});
		this.loadData();
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
			uni.showLoading({
				title: '刷新中'
			});
			this.scroller.resetUpScroll();
		},

		/*加载数据*/
		loadData() {
			this.slider = [];
			this.list = [];
			this.currentSliderIndex = 0;
 			this.scroller.resetUpScroll();
		},

		/*获取子类别数据*/
		/*获取子类别数据*/
		getCategory() {
			var that = this;
			this.$app.request({
				url: this.$api.shouye.getcourseCategoryList,
				method: 'GET',
				dataType: 'json',
				success: res => {
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
		
		/*获取数据*/
		getData() {
			this.$app.request({
				
				url: this.$api.article.index,
				data: {
					category_id: this.category_id,
					page_index:this.scroller.num,
					page_size: this.scroller.size
				},
				method: 'POST',
				dataType: 'json',
				success: res => {
					if (res.code == 0) {
						if (this.scroller.num == 1) {
							this.list = [];
						}
						if (this.slider.length == 0) {
							this.slider = res.data.slider;
						}
						console.log(res.data.list);
					   this.list = this.list.concat(res.data.list);
						  // this.list =  res.data.list ;
						
						this.scroller.endByPage(res.data.list.length, res.data.page);
						this.showPageLoading = false;
					} else {
						this.scroller.endSuccess();
						this.$alert(res.msg);
					}
				},
				fail: res => {
					this.scroller.endErr();
				},
				complete: res => {
					uni.stopPullDownRefresh();
					uni.hideLoading();
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
secondCategroy:function(e){
	 switch(e.detail.index){
		 case 0:{
				
			uni.navigateTo({
				url:'Kaoshi/Kaoshi',
				animationType:"slide-in-right",
				animationDuration:300
			})			
			 
		 }
		 break;
		 case 1:{
		 				
		 	uni.navigateTo({
		 		url:'../Zhibo/Zhibo',
				animationType:"slide-in-right",
				animationDuration:300
		 	})			
		 			 
		 }
		 break;
		 case 2:{
		 		uni.navigateTo({
		 			url:'Kecheng/Kecheng',
		 			animationType:"slide-in-right",
		 			animationDuration:300
		 		})				
		 				
		 			 
		 }
		 break;
		 case 3:{
		 				
		 		uni.navigateTo({
		 			url:'XuexiBan/XuexiBan',
		 			animationType:"slide-in-right",
		 			animationDuration:300
		 		})				
		 			 
		 }
		 break;
		 
	 }
},
//点击 朋友在看item
		
        goDetail(index){
			// url:'../../goods/gooddetail/gooddetail?id='+this.zhibokeArray[e.detail.index].id,
			console.log(index)
			
			uni.navigateTo({
				url:'TeacherDetail/TeacherDetail?id='+index,
				animationType:"slide-in-right",
				animationDuration:300
			})	
		},
		//点击推荐课程
			
		kechengItemClick: function(e){
			uni.navigateTo({
				url:'KechengDetail/KechengDetail?id='+e.detail.index,
				animationType:"slide-in-right",
				animationDuration:300
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
		}
	}
};
</script>

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
	
.testview{
	flex-direction: column;
	display: flex;
	width: 100upx;
	height: 200upx;
	background-color: #FF0000;
 }
/*头部*/
 
	 
	 

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
							width:25upx;
							height: 6upx;
							background: #31D8B1;
							position: absolute;
 							bottom: 20upx;
							left: 50%;
							border-top-right-radius: 4upx;
							border-top-left-radius: 4upx;
							border-bottom-left-radius: 4upx;
							border-bottom-right-radius: 4upx;
							
  							transform: translateX(-50%);//居中处理
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
					
				image{
					width: 28upx;
					height: 20upx;
					position: absolute;
					right: 25upx;
 
 				}
			 margin-top: -20rpx;
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
	
.mainscrollview{
 	 
	height: 95%;
  	
}
.scroll {
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
.mainlist{
 	 // margin-top: 10upx;
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
.tikubgview{
	width: 100%;
	margin-top: 20upx;
	background-color: #FFFFFF;
 	}
 .tikuicon{
	 width: 80rpx;
	 height: 48rpx;
 }
 .tikutitle{
 	 margin-top: 16rpx;
	 font-size:24rpx;
	 font-family:SourceHanSansCN;
	 font-weight:bold;
	 color:#000000;
 	 width: 80%;                                  
	 overflow: hidden;
	 text-overflow: ellipsis;
	 	white-space: nowrap;
	 	display: block;
	 	justify-content: center;
		text-align: center;
 }
 .catebgview{
 	margin-top: 20rpx;
 	display: flex;
 	flex-direction: column;	
  	height: auto;
 	justify-content: center;
 	align-items: center;
  	} 
	 
	.sectiontitleview{
		margin-top: 20upx;
		display: flex;
flex-direction: row;
justify-content: space-between;
 align-items: center; 
           .sectiontitle{
 			margin-left: 30rpx;
			font-size: 32rpx;
			color: #000000;
			font-weight: 600;
			 
  		 
 		}
			
		.sectionrighttitle{
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
		
				.biaoqian{
					position:absolute;
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
.recommendgridview{
 	height: auto;
	margin-bottom: 20upx;
	margin-top: 10upx;
	background-color: #FFFFFF;
	box-sizing: border-box;
	padding-left: 15upx;
	padding-right:15upx;
 	
}	 
 .recomendbgview{
	 flex-direction: column;
	 display: flex;
padding-left: 15upx;
  }
 .recomengimageview{
	
	 margin-top: 22upx;
		position: relative; 
		width:330upx;
		height: 220upx;
	 image{
		 width:330upx;
		 height: 220upx;
		 border-radius:8upx;
		 
	 }
		 
	 text{
		 position: absolute;
		 background-color: #777;
		 font-size:16upx ;
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
	
 .recommendtitle_text{
	  
	 font-size:28upx;
	 height:auto ;
	 font-weight:bold;
	 color:rgba(0,0,0,1);
	 margin-top: 20upx;
	 width: 90%;
 	  overflow: hidden;
	      text-overflow: ellipsis;  /* 超出部分省略号 */
	     display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	      -webkit-line-clamp: 2; /** 显示的行数 **/
	       -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
 
 }
.recomendpricebottomView{
	width: 90%;	 
	height: auto;	
	margin-top: 10upx;
  	 display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
	} 	 
	 
 .recommemdpricetext{
	 font-size:20upx;
 	 font-weight:500;
	 color:rgba(250,6,17,1);
	 line-height:26upx;
 }
 
 .recommendbuynumtext{
	font-size:15upx;
	font-family:FZHTK;
	font-weight:normal;
	color:rgba(106,106,106,1);
	line-height:34upx; 
 }
	 
 .lineview{
	 width: 100%;
	 height: 8upx;
	 background-color: #F9F9F9;
	 margin-top: 30rpx;
 }
</style>
