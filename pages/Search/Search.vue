<template>
	<view class="contentview">
		<view class="header header1">
			<view class="sousuo">
				<image src="/static/homesearch.png"></image>
				<input placeholder="搜索" v-model="value" focus="true" @blur="getList()"/>
			</view>
			<view class="allList">
				<view class="list" v-if="allList.user.records.length !=0">
					<view class="listTitle">
						<view class="titleLeft hidden">{{name}}</view>
						<view class="titleRight"> - 用户</view>
					</view>
					<view class="user" v-for="(item,index) in allList.user.records" @click="openInfo(item.id)" :key="index">
						<view class="userItem">
							<view class="headerLeft">
								<view class="name">
									<view class="nameText hiden">{{item.name}}</view>
									<view class="nameType">{{item.jobTitle}}</view>
								</view>
								<view class="text">{{item.role == 2?'康复师':'普通用户'}}</view>
								<view class="text text2">
									<view> </view>
									<view> </view>
								</view>
							</view>
							<image class="headerRight" mode="aspectFill" :src="item.headUrl?item.headUrl:'/static/gongzuotai/icon_nv.png'"></image>
						</view>
					</view>
				</view>
				<view class="list" v-if="allList.live.records.length !=0">
					<view class="listTitle">
						<view class="titleLeft hidden">{{name}}</view>
						<view class="titleRight"> - 直播</view>
					</view>
					<live :list="allList.live.records"></live>
				</view>
				<view class="list " v-if="allList.course.records.length !=0">
					<view class="listTitle">
						<view class="titleLeft hidden">{{name}}</view>
						<view class="titleRight"> - 课程</view>
					</view>
					<view class="courseList">
						<view class="item" v-for="(item , index) in allList.course.records" :key="index">
							<course  :info="item"></course>
						</view>
					</view>
				</view>
				<view class="list " v-if="allList.class.records.length !=0">
					<view class="listTitle">
						<view class="titleLeft hidden">{{name}}</view>
						<view class="titleRight"> - 班级</view>
					</view>
					<view class="classList">
						<ban-ji :itemObject="item" v-for="(item , index) in allList.class.records" :key="index"></ban-ji>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import expert from "@/components/experts/experts.vue";
	import request from '../../utils/util.js';
	import live from "@/components/live/live";
	import banJi from "@/components/banJi/banJi";
	import course from "@/components/course/course"
	export default {
		components:{
			expert,
			live,
			banJi,
			course
		},
		data() {
			return {
				name:'',
				value:'',
				info:{},
				allList:{
					'class':{
						records:[]
					},
					'course':{
						records:[]
					},
					'live':{
						records:[]
					},
					'user':{
						records:[]
					}
				}
			}
		},
		methods: {
			getList(){
				if(this.value == '')return false;
				this.name = this.value;
				let that = this;
				return request({
					url:getApp().$api.shouye.search,
					type:"GET",
					data:{
						paegNo:1,
						pageSize:30,
						name:that.name
					}
				},true,true).then(data=>{
					that.allList = data;
				})
			},
			openInfo(index){
				uni.navigateTo({
					url: '/pages/Daxue/TeacherDetail/TeacherDetail?id=' + index,
					animationType: "slide-in-right",
					animationDuration: 300
				})
			}
		}
	}
</script>

<style scoped>
	.contentview{
		width:750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.header .title{
		padding-top: 22rpx;
		text-align: center;
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 50rpx;
	}
	.header .sousuo{
		
		transform: translateY(30%);
		display: flex;
		align-items: center;
		width: 690rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		margin-left: 30rpx;
	}
	.sousuo image{
		width:26rpx;
		height: 26rpx;
		margin-left: 24rpx;
		margin-right: 16rpx;
	}
	.sousuo input{
		width: 600rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 40px;
	}
	.allList{
		
		width:750rpx;
		background-color: #FFFFFF;
		margin-top: 40rpx;
	}
	.list{
		/* padding-left:30rpx; */
		padding-top:30rpx;
	}
	.listTitle{
		padding-left: 30rpx;
		display: flex;
		align-items: center;
		height: 40rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.listTitle .titleLeft{
		max-width: 500rpx;
		color: #31D880;
		margin-right: 10rpx;
	}
	.userItem{
		display: flex;
		justify-content: space-between;
		
	}
	.name{
		display: flex;
	}
	.name view:nth-child(1){
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		margin-right: 12rpx;
	}
	.name view:nth-child(2){
		padding-top:4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 28rpx;
	}
	.text{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 24rpx;
		margin:20rpx 0;
		display: flex;
		margin-bottom: 0;
	}
	.headerRight{
		width:120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
	.user{
		width:630rpx;
		/* height: 260rpx; */
		margin:30rpx;
		padding:0 30rpx;
		border-radius: 4rpx;
		background-color: #FFFFFF;
		padding-top:30rpx;
	}
	.allList .list:last-child{
		padding-bottom: 30rpx;
	}
	.courseList{
		display: flex;
		flex-wrap: wrap;
		
	}
	.courseList{
		width:720rpx;
		padding:30rpx;
		padding-right: 0;
		display: flex;
		flex-wrap: wrap;
	}
	.courseList .item{
		margin-right: 30rpx;
	}
</style>
