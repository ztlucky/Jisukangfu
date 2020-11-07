<template>
	<view class="coontentView" >
		<scroll-view scroll-y="true" class="leftScrollview" :style="[{height:mainscrollviewHeight + 'px'}]">
			<view  v-for="(item,index) in kangdinglist" :key = 'index' @click="changecurrentIndex(index)" >
				<view class="categroyItem" :style="[{background:currenCateIndex == index? '#FFFFFF':'#F8F8F8'}]" >
					<view class="leftline" v-show="currenCateIndex == index">
						
					</view>
					<text :class="currenCateIndex == index? 'categroy_greenTitle':'categroyTitle'"  >{{item.name}}</text>
					<text :class="currenCateIndex == index? 'number_greentext':'numbertext'" >{{item.number}}</text>
				</view>
				
			</view>
		</scroll-view>
 			
		<scroll-view scroll-y="true"   :style="[{height:mainscrollviewHeight + 'px'}]">
			<uni-grid :column="2"  :square="false"   :showBorder="false" @change="listdidclick" :highlight="false"  >
				<uni-grid-item  v-for="(item ,index) in pingdingItemList" :key ="index" :index= "index" >
				   <view class="gridviewItem">
				   	<image src="../../static/wodehuanzhe/icon_pingding.png"  class="iconimage" ></image>
							<text class="nametext">{{item.name}}</text>
				   </view>
				 	
				 </uni-grid-item>
			</uni-grid> 
		</scroll-view>
 			
 	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
	
	components: {uniGrid,uniGridItem},

		data() {
			return {
				mainscrollviewHeight:'',
				currenCateIndex:0,
				pingdingItemList :[],
				kangdinglist:[],
			}
		},
		onShow:function(){
			this.mainscrollviewHeight = this.$app.getwindowHeight()
			this.pingdingItemList = [];
			this.kangdinglist = [];
			this.getPingdingList();
			//this.getPingDingItemList();
		},
		methods: {
			listdidclick: function(e){
				//e.detail.index
				uni.navigateTo({
					url:'../KangfuMubiao/KangfuMubiao',
					animationType:"slide-in-right",
					animationDuration:300
				})	
			},
			// 评定列表下的分类
			getPingDingItemList(){
				this.$app.request({
					url: this.$api.pingdingliangbiao.getPingDingItemList,
					data: {
						ratingscaleid: this.kangdinglist[this.currenCateIndex].id,
						pagenum:1,
						pagesize:10,
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						
						if (res.code == 200) {
								this.pingdingItemList  = this.pingdingItemList.concat(res.data.records);
 						} else {
							this.$alert(res.msg);
						}
					},
					fail: res => {
						
					},
					complete: res => {
						//this.$refs.hrPullLoad.reSet();
						
					}
				});
			},
			//评定列表的总分类	
			getPingdingList(){
				this.$app.request({
					url: this.$api.pingdingliangbiao.getPingDingliebiaoList,
					data: {
						userid: 11,//getApp().globalData.userId
 						pagenum:1,
						pagesize:10,
 					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						
						if (res.code == '200') {
								 this.kangdinglist = this.kangdinglist.concat(res.data.records);
								 this.getPingDingItemList();
 								
						} else {
							this.$alert(res.msg);
						}
					},
					fail: res => {
						
					},
					complete: res => {
						//this.$refs.hrPullLoad.reSet();
						
					}
				});
			},	
			changecurrentIndex(index){
				this.currenCateIndex = index
			}
		}
	}
</script>

<style scoped lang="scss">
	.coontentView{
		display: flex;
		flex-direction: row;
	 
			.gridviewItem{
				width: 200rpx;
				margin-left: 50rpx;
				align-items: center;
				border-radius: 8px;
				border: 2px solid #F2F2F2;
				display: flex;
				flex-direction: column;
				margin-top: 50rpx;
				padding-bottom: 20rpx;
			      .iconimage{
			  margin-top: 36rpx;
			width: 46rpx;
			height: 54rpx;
			      }
				  .nametext{
					  margin-left:28rpx;
					  margin-right:28rpx;
					  margin-top: 14rpx;
					  font-size: 24rpx;
					  font-family: PingFangSC-Regular, PingFang SC;
					  font-weight: 400;
					  color: #333333;
					  text-align: center;
					  max-lines: 2;
				  }
				
			}
		 
	
	}
.leftScrollview{
	display: flex;
	flex-direction: column;
	width: 200rpx;
 	.categroyItem{
		display: flex;
		flex-direction: column;
		position: relative;
		margin-top: 2rpx;
		height:150rpx ;
		align-items: center;
		background-color: #F8F8F8;
		.leftline{
			position: absolute;
			width: 4rpx;
			height: 44rpx;
			background: #36DB97;
			border-radius: 3rpx;
			left:2rpx ;
			margin-top: 53rpx;
		}
		.categroyTitle{
			margin-top:30rpx;
			margin-left: 16rpx;
			margin-right: 16rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			max-lines: 2;
		}
		.categroy_greenTitle{
			margin-top: 30rpx;
			margin-left: 16rpx;
			margin-right: 16rpx;
			text-align: center;
			
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #0ED482;;
			max-lines: 2;
		}
		.numbertext{
			
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			margin-top: 5rpx;
			text-align: center;
		}
			
		.number_greentext{
			
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #0ED482;
			margin-top: 5rpx;
			text-align: center;
		}
 	}
		
	
}
</style>
