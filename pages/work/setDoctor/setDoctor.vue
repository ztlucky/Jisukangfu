<template>
	<view class="viewPage">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="医生设置" type="ordinary">
			<!-- <view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view> -->
		</nav-bar>
		<view class="title title_">工作台到期时间：{{date}}</view>
		<view class="title">设置擅长项目</view>
		<view class="content">
			<yealuo @getBackVal="getBackVal1" the-style="font-size: 46upx;" :isShowIcon="false"  :selectIco="false" overflow="hide" :isSetUrl="true" placeholder="请选择" width="690" :binData="binData1"
			 :isShowAllBack="false" checkType="checkbox" padding="30rpx" textAlign="right"></yealuo>
		</view>
		<view class="save" @click="save()">保存</view>
	</view>
</template>

<script>
	import navBar from "../../../components/zhouWei-navBar/index.vue";
	import request from "../../../utils/util.js"
	import yealuo from "@/components/yealuo-select/yealuo-select.vue"
	export default {
		components:{
			navBar,
			yealuo
		},
		data() {
			return {
				binData1:[{
					name:'',
					id:0
				}],
				date:'',
				list:[]
				
			}
		},
		onLoad() {
			this.getInfo();
			this.getList();
		},
		methods: {
			getBackVal1(e){
				this.list = []
				e.map(v=>{
					this.list.push(v.split('|')[1])
				})
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.shouye.getcourseCategoryList,
					data:{
						pageNo:1,
						pageSize:50,
						type:2
					},
					type:'data'
				},true,true).then(data=>{
					// that.binData1 = data.records;
					let list = [];
					data.records.map((v,k)=>{
						data.records[k].value = v.name;
					})
					that.binData1 = data.records;
					// that.binData1 = list;
				})
			},
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.work.workEndDate,
					data:{
						// id:getApp().globalData.userId
					},
					type:"GET"
				},true,true).then(data=>{
					that.date = data.workbenchExpire;
				})
			},
			save(){
				if(this.list.length !=0){
					return request({
						url:getApp().$api.work.editForte,
						data:{
							forte:this.list.join(','),
							user_id:getApp().globalData.userId
						},
						type:'GET'
					}).then(data=>{
						uni.showToast({
							title:'保存成功',
							icon:'success',
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateBack();
						},1000)
					})
				}else{
					uni.showToast({
						title:'请选择擅长项目',
						icon:'none',
						duration:1500
					})
				}
			}
		}
	}
</script>

<style>
	.content{
		padding:30rpx;
	}
	.title{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		padding:30rpx;
		padding-bottom: 0;
	}
	.save {
		position: fixed;
		bottom: 68rpx;
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
