<template>
	<view class="viewPage">
		<view class="header" :style="nowShowStatus?'height:auto':'height:120rpx'">
			<view :class="item.isSelected?'view':''" @click="setStatus(index)" v-for="(item , index ) in illnessList">{{item.name}}</view>
			<view class="setShowStatus" @click="setShowStatus()">{{nowShowStatus?'收起':'展开'}}</view>
		</view>
		<view class="list" v-if="expertList.length !=0">
			<expert :info="v" :isshow="(k == expertList.length-1)" v-for="(v,k) in expertList" :key="k"></expert>
		</view>
	</view>
</template>

<script>
	import expert from "../../../components/experts/experts.vue"
	import request from "../../../utils/util.js"
	export default {
		components:{
			expert
		},
		data() {
			return {
				expertList:[1,2,3,4,5,6,7,8,9],
				illnessList:[],
				nowIndex:0,
				nowShowStatus:false
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init(){
				this.getNavList().then(data=>{
					this.getList();
				})
				
			},
			setStatus(index){
				if(index == this.nowIndex) return false;
				this.illnessList[index].isSelected = true;
				this.illnessList[this.nowIndex].isSelected = false;
				this.$set(this.illnessList,index,this.illnessList[index]);
				this.$set(this.illnessList,this.nowIndex,this.illnessList[this.nowIndex]);
				this.nowIndex = index;
				this.getList();
			},
			setShowStatus(){
				this.nowShowStatus = !this.nowShowStatus;
			},
			getNavList(){
				let that = this;
				return request({
					url:getApp().$api.shouye.getcourseCategoryList,
					type:"GET",
					data:{
						type:2,
						pageNo:1,
						pageSize:200
					}
				},true,true).then(data=>{
					data.records[0].isSelected = true;
					that.illnessList = data.records;
				})
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getAllDoutorList,
					type:"GEt",
					data:{
						forte:that.illnessList[that.nowIndex].name,
						pageNo:1,
						pageSize:100
					}
				},true,true).then(data=>{
					that.expertList = data.records;
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width: 750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.list{
		width:690rpx;
		padding:30rpx;
		background-color: #FFFFFF;
		
	}
	.header{
		/* position: fixed;
		top:0;
		left: 0;
		z-index: 2; */
		 /* transition: height 2s; */
		position: relative;
		/* zoom:1; */
		background-color: #FFFFFF;
		width:690rpx;
		padding:30rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 0;
		overflow: hidden;
		
	}
	.header view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		margin-bottom: 16rpx;
		margin-right: 30rpx;
	}
	.header .view{
		color:#31D880;
	}
	.header .setShowStatus{
		position: absolute;
		bottom: -10rpx;
		right: -10rpx;
		color:#31D880;
	}
</style>
