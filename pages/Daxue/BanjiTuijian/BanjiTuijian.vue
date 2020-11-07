 <template>
 	<view class="contentview" :style="[{height:mainscrollviewHeight + 'px'}]">
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
 		
 		     <hr-pull-load  class="mainscrollview"
 		         @refresh='loadData'
 				 @loadMore='loadMore'
 		         :pullHeight='50'
  		         :lowerThreshold='20'
 		         :bottomTips='bottomTips'
 		         :isAllowPull="true"
 		         :isTab='false'
 		         ref='hrPullLoad' :style="[{height:mainscrollviewHeight*0.95 + 'px'}]" >
  					 
 				 	 <banjiList  class="mainlist" :list="banjiList" />
 				 	 
    		
 		 </hr-pull-load>
 		 </view>
 	</view>
 </template>
 
 <script>
	 import banjiList  from '@/components/article/banji.vue';
	 
 	export default {
		components: {
			  
			banjiList
 		
		},
 		data() {
 			return {
 				page:0,
 				mainscrollviewHeight:0,
 				banjiList:[],
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
 			this.getRecommendClassList()
 			
 		},
 		onShow:function(){
 			this.mainscrollviewHeight = this.$app.getwindowHeight()
  		},
 		methods: {
			/*切换导航*/
			categoryChange(category_id, index) {
 				this.category_index = index;
				this.category_id = category_id;
				var nextIndex = index - 1;
				nextIndex = nextIndex <= 0 ? 0 : nextIndex;
				this.scroll_category_id = `category_id-${nextIndex}`; //动画滚动,滚动至中心位置
				this.banjiList = []
				this.getRecommendClassList()
				// #ifdef H5
				// uni.navigateTo({
				// 	url: '/pages/article/list?category_id=' + this.category_id + '&category_index=' + this.category_index
				// });
				// #endif
			},
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
 				
 			loadMore(){
 				this.page++;
 				this.getRecommendClassList();
 			},
 			loadData(){
				this.banjiList =  [];
 				this.page =1;
 				this.getRecommendClassList()
 			},
 			/*获取推荐班级数据*/
 			getRecommendClassList() {
 			 			this.$app.request({
 							url: this.$api.shouye.getRecommendClassList,
 							data: {
 								classtype: this.category_id,
 								costtype:1,
 								pagenum:this.page,
 								pagesize:10,
 								sorttype:1
 							},
 							method: 'POST',
 							dataType: 'json',
 							success: res => {
 								
 			 					if (res.code == 200) {
 									 
 										
 									 
 										
 								 
 										this.banjiList = this.banjiList.concat(res.data.records);
 										
 									 
 			 						
 			 						
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
 
 
 	 
 </style>
 