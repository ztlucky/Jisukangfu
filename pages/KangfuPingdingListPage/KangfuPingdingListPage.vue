<template>
	<view class="coontentView" >
		<scroll-view scroll-y="true" class="leftScrollview" :style="[{height:mainscrollviewHeight + 'px'}]">
			<view  v-for="(item,index) in kangdinglist" :key = 'index' @click="changecurrentIndex(index)" >
				<view class="categroyItem " :style="[{background:currenCateIndex == index? '#FFFFFF':'#F8F8F8'}]" >
					<view class="leftline" v-show="currenCateIndex == index">
						
					</view>
					<text :class="currenCateIndex == index? 'categroy_greenTitle hidden2':'categroyTitle hidden2'">{{item.name}}</text>
					<text :class="currenCateIndex == index? 'number_greentext hidden':'numbertext hidden'" >{{item.ratingScaleSize?item.ratingScaleSize:0}}个</text>
				</view>
				
			</view>
		</scroll-view>
 			
		<view style="position: relative;padding-bottom: 70px;width: 100%;" class="liangBiaoList"  :style="[{height:(mainscrollviewHeight - 70) + 'px'}]">
			<!-- <uni-grid :column="2"  :square="false"   :showBorder="false" @change="listdidclick" :highlight="false"  >
				<uni-grid-item  v-for="(item ,index) in pingdingItemList" :key ="index" :index= "index" > -->
				   <view class="gridviewItem" v-for="(item ,index) in pingdingItemList" @click="listdidclick(index)" :key ="index" :index= "index">
						<image src="../../static/wodehuanzhe/icon_pingding.png"  class="iconimage" ></image>
						<view class="nametext hidden2">{{item.name}}</view>
				   </view>
				 <!-- </uni-grid-item>
			</uni-grid> -->
			<view class="bottomView">
				<view class="viewItem">结束</view>
				<view class="viewItem" @click="toPage('/pages/KangfuMubiao/KangfuMubiao?id='+id)">设定康复目标</view>
			</view>
		</view>
 			
 	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import request from "../../utils/util.js";
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
			
			
		},
		onLoad(options) {
			this.pingdingItemList = [];
			this.kangdinglist = [];
			this.getillnessList().then(()=>{
				this.getPingDingLiangBiao();
			});
			this.id = options.id?options.id:0;
		},
		methods: {
			listdidclick: function(index){
				let id = this.pingdingItemList[index].id;
				let name = this.pingdingItemList[index].name;
				this.toPage(`/pages/Wode/measurement/measurement?id=${id}&patientid=${this.id}&name=${name}`);
			},
			getillnessList(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getillnessList,
					type:"GET",
					data:{
						paseNo:1,
						pageSize:200,
						c_r:true,
						c_s:false
					}
				},true,true).then(data=>{
					let ratingScaleSize = 0;
					if(data.records){
						data.records.map(v=>{
							ratingScaleSize+=v.ratingScaleSize;
						})
					}
					data.records.unshift({
						name:'全部',
						ratingScaleSize
					})
					that.kangdinglist = data.records;
				})
			},
			getPingDingLiangBiao(){
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.getList,
					type:"GET",
					data:{
						pageNo:1,
						pageSize:100,
						typeId:that.kangdinglist[that.currenCateIndex].id
					}
				},true,true).then(data=>{
					that.pingdingItemList = data.records;
				})
			},
			changecurrentIndex(index){
				this.currenCateIndex = index;
				this.getPingDingLiangBiao();
			},
			toPage(url){
				uni.navigateTo({
					url,
					animationType:"slide-in-right",
					animationDuration:300
				})	
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
					  max-width: 160rpx;
					  // display: block;
					  align-items: center;
					  // height: 68rpx;
					  line-height: 28rpx;
					  // margin-left:28rpx;
					  // margin-right:28rpx;
					  margin-top: 14rpx;
					  font-size: 24rpx;
					  font-family: PingFangSC-Regular, PingFang SC;
					  font-weight: 400;
					  color: #333333;
					  text-align: center;
					  white-space: pre-wrap;
					  // max-lines: 2;
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
		text{
			// display: flex;
			// justify-content: center;
			text-align: center;
			width:140rpx;
		}
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

.bottomView{
	position: fixed;
	bottom: 0rpx;
	right: 30rpx;
	padding-bottom: 30rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width:480rpx;
	padding-left: 20rpx;
	.viewItem{
		width:222rpx;
		height: 80rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #2AD36B;
		border-radius: 40rpx;
		border: 2rpx solid #2AD36B;
		line-height: 80rpx;
		text-align: center;
	}
	.viewItem:nth-child(2){
		width:226rpx;
		color:#FFFFFF;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10px 14px 0px rgba(49,216,128,0.33);
	}
}
</style>
<style scoped>
	.liangBiaoList{
		width:550rpx;
		display: flex;
		flex-wrap:wrap;
		overflow-y: scroll;
		align-content:flex-start;
	}
	.liangBiaoList .gridviewItem{
		width:200rpx;
		height: 160rpx;
	}
</style>