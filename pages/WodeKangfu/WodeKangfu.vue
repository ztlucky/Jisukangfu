<template>
	<view class="contentview">
		<view class="header header1" :style="'padding-top:'+topheight+'px'">
			<view class="title">咨询</view>
			<view class="sousuo" @click="toPage('/pages/WodeKangfu/searchDoctor/searchDoctor')">
				<image src="../../static/homesearch.png"></image>
				<input placeholder="搜索医生" :disabled="true"/>
			</view>
		</view>
		<view class="header header2" :style="'padding-top:'+topheight+'px'">
			<view class="title">咨询</view>
		</view>
		<view class="topNav">
			<view class="navItem" v-for="(v,k) in topNav" :key="k" @click="toPage(v.url)">
				<image :src="v.icon"></image>
				<view>{{v.name}}</view>
			</view>
		</view>
		<view class="hot">
			<view class="hotTitle">热门专家</view>
			<view class="hotList" >
				<view class="hotItem" v-for="(v,k) in hot" :key="k" @click="toPage('/pages/Daxue/TeacherDetail/TeacherDetail?id='+v.id)">
					<image mode="aspectFill" :src="v.headUrl" ></image>
					<view class="hotName hidden">{{v.name}}</view>
					<view class="hotType hidden">{{v.jobTitle?v.jobTitle:' '}}</view>
				</view>
			</view>
		</view>
		<view class="recommended">
			<view class="recommendedTitle">推荐专家</view>
			<view class="recommendedList" >
				<expert :info="v" :isshow="(k == expertList.length-1)" v-for="(v,k) in expertList" :key="k"></expert>
			</view>
		</view>
	</view>

</template>

<script>
	import uniRichtext from '../../components/uni-richtext.vue';
	import expert from "../../components/experts/experts.vue";
	import request from '../../utils/util.js';
	export default {
		components: {
			uniRichtext,
			expert
		},
		data() {
			return {
				content: '',
				richList: [],
				hot:[],
				uploadUrl: "http://120.78.87.84:8080/conduit/file/uploadFile",
				topheight:0,
				topNav:[
					{
						name:'我的病例',
						url:'/pages/HuanzheDetail/HuanzheDetail?is_edit=0',
						icon:'/static/zixun/icon_anli.png'
					},
					// {
					// 	name:'我的方案',
					// 	url:'/pages/Wode/plan/plan',
					// 	icon:'/static/zixun/icon_fangan.png'
					// },
					{
						name:'我的医生',
						url:'/pages/WodeKangfu/myDoctor/myDoctor',
						icon:'/static/zixun/icon_yisheng.png'
					},
					{
						name:'全部医生',
						url:'/pages/WodeKangfu/allDoctor/allDoctor',
						icon:'/static/zixun/icon_quanbu.png'
					}
				],
				expertList:[],
				phone:''
			}
		},
		onLoad() {
			
			this.init();
		},
		methods: {
			init() {
				this.initHeight();
				this.phone = uni.getStorageSync('phone');
				if(this.phone !=''){
					this.getInfo();
				}
			},
			initHeight() {
				let systemInfo = uni.getSystemInfoSync();
				const system = systemInfo.platform
				this.statusBarHeight = systemInfo.statusBarHeight;
				console.log(this.statusBarHeight,this.topheight)
				this.topheight += this.statusBarHeight;
			},
			toPage(url){
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getHomeInfo,
					type:"GET",
					data:{
						phone:that.phone
					}
				},true,true).then(data=>{
					that.hot = data.hot;
					that.expertList = data.recommend;
					
				})
			}
		},
		watch: {
			richList: function(newValue, oldValue) {
				console.log("dhhdhd")
				console.log(newValue)
			}
		},
		computed: {

		}
	}
</script>

<style>
	.contentview {
		/* display: flex; */
		width:100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.contentview .header{
		width: 100%;
		background-color: #31D880;
		padding-bottom: 72rpx;
		position: relative;
		
	}
	.contentview .header1{
		position: fixed;
		top:0;
		z-index: 2;
	}
	.header2{
		opacity: 0;
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
		position: absolute;
		bottom: 0rpx;
		transform: translateY(50%);
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
	.topNav{
		/* margin-top: 78rpx; */
		width:650rpx;
		height: 172rpx;
		display: flex;
		justify-content: space-between;
		padding:78rpx 50rpx;
		background-color: #F6F6F6;
		padding-bottom: 30rpx;
	}
	.topNav .navItem{
		display: flex;
		width: 112rpx;
		height: 172rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.navItem image{
		width:112rpx;
		height: 112rpx;
	}
	.navItem view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
		text-align: center;
	}
	.hot{
		width: 720rpx;
		/* padding:0 30rpx; */
		background-color: #FFFFFF;
		padding-top:32rpx;
		padding-left: 30rpx;
	}
	.hot .hotTitle ,.recommendedTitle{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
		
	}
	.hotList{
		width: 100%;
		overflow-x: scroll;
		padding-top:24rpx;
		display: flex;
	}
	.hotItem{
		flex-wrap: nowrap;
		width:192rpx;
		height: 262rpx;
		margin-right: 30rpx;
	}
	.hotItem:last-child{
		margin-right: 0;
		padding-right: 30rpx;
	}
	.hotItem image{
		width: 192rpx;
		height: 192rpx;
		border-radius: 20rpx;
	}
	.hotName{
		width:192rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 34rpx;
	}
	.hotType{
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 26rpx;
	}
	.recommended{
		background-color: #FFFFFF;
		margin-top: 8rpx;
		width: 690rpx;
		padding:10rpx 30rpx;
	}
	.recommendedList{
		
		padding-bottom: 0;
	}
</style>
