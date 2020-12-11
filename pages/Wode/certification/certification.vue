<template>
	<view class="viewPage">
		<view class="list">
			<view class="item" @click="toPage('work')">
				<view class="itemTitle">工作单位</view>
				<view class="itemRight" >
					<view class="itemRightText">{{work}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('school')">
				<view class="itemTitle" >毕业院校</view>
				<view class="itemRight" >
					<view class="itemRightText hidden">{{school}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">学历</view>
				<view class="itemRight">
					<view class="itemRightText">
						<yealuo @getBackVal="getBackVal" the-style="font-size: 46upx;" :isShowIcon="false" backColor="#FFFFFF"  :selectIco="false" overflow="hide" :isSetUrl="true" placeholder="请选择" width="400" :binData="binData"
						 :isShowAllBack="false" padding="0rpx" textAlign="right"></yealuo>
					</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('idNo')">
				<view class="itemTitle">身份证</view>
				<view class="itemRight" >
					<view class="itemRightText">{{idNo}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">职称</view>
				<view class="itemRight">
					<view class="itemRightText">烟台毓璜顶医院</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="chooseFile">
				<view class="itemTitle">资质证书</view>
				<view class="itemRight">
					<view class="itemRightText"></view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">工作证书</view>
				<view class="itemRight">
					<view class="itemRightText"></view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">擅长领域</view>
				<view class="itemRight">
					<view class="itemRightText"></view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('remark')">
				<view class="itemTitle">备注</view>
				<view class="itemRight" >
					<view class="itemRightText">{{remark}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="save" @click="save()">提交审核</view>
		
	</view>
</template>

<script>
	import yealuo from "@/components/yealuo-select/yealuo-select.vue"
	import request from "../../../utils/util.js";
	import choose from "../../../utils/androidChooseFile.js"
	export default {
		components:{
			yealuo
		},
		data() {
			return {
				idNo:'',
				school:'',
				remark:'',
				work:'',
				binData:[{
					id:1,
					value:'初中'
				},{
					id:2,
					value:'高中'
				},{
					id:3,
					value:'大专'
				},{
					id:4,
					value:'本科'
				},{
					id:5,
					value:'研究生'
				},{
					id:6,
					value:'博士研究生'
				},{
					id:0,
					value:'其他'
				}]
			}
		},
		onLoad() {
			this.addEvent();
		},
		onUnload() {
			uni.$off();
		},
		methods: {
			addEvent(){
				let that = this;
				uni.$on('addInfoText',function(data){
				        that[data.key] = data.value;
				})
				uni.$on('result',function(data){
					console.log(data);
				})
			},
			getInfo(){
				
			},
			toPage(key){
				uni.navigateTo({
					url:'/pages/work/addOtherCertification/addOtherCertification?key='+key+'&value='+this[key],
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			save(){
				console.log(this.idNo,this.school,this.remark,this.work)
			},
			getBackVal(data){
				console.log(data);
			},
			chooseFile(){
				new choose().init();
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:100%;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.list{
		width:750rpx;
		background-color: #FFFFFF;
	}
	.item{
		margin-left: 30rpx;
		width:690rpx;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		padding-right: 30rpx;
		align-items: center;
		border-bottom: 2rpx solid #ECECEC;
	}
	.item:last-child{
		border:none;
	}
	.item .itemTitle{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.itemRight{
		display: flex;
		align-items: center;
	}
	.itemRight image{
		width:14rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}
	.itemRightText{
		max-width: 400rpx;
	}
	.save {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
