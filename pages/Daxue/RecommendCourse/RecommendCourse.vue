<template>
	<view  class="contentview" :style="[{height:mainscrollviewHeight + 'px'}]">
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
						<text>{{item.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="mainscrollview" @touchmove.stop.prevent  >
			 
		        <hr-pull-load  
		         @refresh='loadData'
				 @loadMore='loadMore'
		         :pullHeight='50'
		         :maxHeight='100'
		         :lowerThreshold='20'
		         :bottomTips='bottomTips'
		         :isAllowPull="true"
		         :isTab='false'
		         ref='hrPullLoad' :style="[{height:mainscrollviewHeight*0.95 + 'px'}]">
 					 
				 	<uni-grid :column="2" class="recommendgridview" :square = "false"  :showBorder="false" @change="kechengItemClick">
				 	<uni-grid-item v-for="(item ,index) in recommendCourseList" :key ="index" :index= "index">
				 	  <view  class="recomendbgview">
				 										   <view class="recomengimageview">
				 											   <image  :src="item.coverUrl" mode="aspectFill"></image>
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
   		
		 </hr-pull-load>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				mainscrollviewHeight:0,
				recommendCourseList:[],
				bottomTips:'',
				category_id: 1,
				category_index: 0,
				scroll_category_id: 'scroll_category_id_0',
				currentSliderIndex: 0,
				category: [],
			}
		},
		onLoad:function(){
			this.getCategory()
			this.getRecommenData()
			
		},
		onShow:function(){
			this.mainscrollviewHeight = this.$app.getwindowHeight()
 		},
		methods: {
				/*获取子类别数据*/
				getCategory() {
					this.$app.request({
						url: this.$api.shouye.getcourseCategoryList,
						method: 'GET',
						dataType: 'json',
						success: res => {
							if (res.code == 200) {
								this.category = res.data;
								this.category_id = this.category[0].id
								if (this.category_index > -1) {
									let nextIndex = this.category_index - 1;
									nextIndex = nextIndex <= 0 ? 0 : nextIndex;
									this.scroll_category_id = `category_id-${nextIndex}`; //动画滚动,滚动至中心位置
								}
							} else {
								this.$alert(res.msg);
							}
						},
						complete: res => {}
					});
				},	
			/*切换导航*/
			categoryChange(category_id, index) {
				this.category_index = index;
				this.category_id = category_id;
				var nextIndex = index - 1;
				nextIndex = nextIndex <= 0 ? 0 : nextIndex;
				this.scroll_category_id = `category_id-${nextIndex}`; //动画滚动,滚动至中心位置
				this.page = 1;
				this.recommendCourseList = []
				this.getRecommenData()
				// #ifdef H5
				// uni.navigateTo({
				// 	url: '/fet/article/list?category_id=' + this.category_id + '&category_index=' + this.category_index
				// });
				// #endif
			},	
			loadMore(){
				this.page++;
				this.bottomTips = 'loading'
				
				this.getRecommenData();
			},
			loadData(){
				this.recommendCourseList = [];
				this.page =1;
				this.getRecommenData()
			},
			/*获取推荐课程数据*/
			getRecommenData() {
				console.log(this.category_id)
   			this.$app.request({
				  	url: this.$api.shouye.getRecommendcourseList,
				  	data: {
						pageNo:1,
				 		pageSize:'20',
			 		     sorttype:'1',
						 pagenum:this.page,
						 coursetype:this.category_id
				  	},
				  	method: 'GET',
				 	dataType: 'json',
				  	success: res => {
				  		console.log("====")
				  		console.log(res)
 						
				 	      this.$refs.hrPullLoad.reSet();
 				 		if (res.code == 200) {
							 
								
						 
				  				this.recommendCourseList = this.recommendCourseList.concat(res.result) ;
								
									 
								 // if(res.result.length == 0 ||res.result.length<10){
									//  this.bottomTips = 'nomore'
									 
								 // }else  if(res.result.length == 10){
								 // this.bottomTips = 'more';
								 // }
 								 
							 
							
							 
							
 							
			 		} else {
							 
				  			this.$alert(res.message);
				  		}
				 	},
				 	fail: res => {
				  		console.log("ffff"+res)
						
				 	},
				 	complete: res => {
						
			 	}
				  });
				 },
				 kechengItemClick(e){
					 let index = e.detail.index;
					 let id = this.recommendCourseList[index].id;
					 uni.navigateTo({
					 	url: "/pages/Daxue/KechengDetail/KechengDetail?id="+id,
					 	animationDuration: 300,
					 	animationType: 'slide-in-right'
					 })
				 }
			  
			   
		}
	}
</script>

<style scoped lang="scss">
	.contentview{
			 display: flex;
			 flex-direction: column;
	  		 .mainlist{
			 	  background-color: #FFFFFF;
			 	  margin-top: 10upx;
			  }
			 	 
			  .mainscrollview{
				   
				  height: 94.4%;
	 		  }
			 /*分类*/
			 .category {
			 	margin-left: 30rpx;
			 	white-space: nowrap;
			 	position: relative;
			 	margin-right: 30rpx;
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
	 
</style>
