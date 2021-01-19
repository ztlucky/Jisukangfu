<template>
	<view class="viewPage">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="医生设置" type="ordinary">
			<!-- <view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view> -->
		</nav-bar>
		<view class="title title_">工作台到期时间：{{date}}</view>
		<view class="title">设置擅长项目</view>
		<view class="content" @click="toPage()">
			<view class="itemRightText itemRightText_not" v-if="selectedList.length ==0">请选择</view>
			<view class="itemRightText itemRightText_" v-else>
				<text v-for="(v,k) in selectedList">{{v.name}} {{k< selectedList.length-1?'、':''}}</text>
			</view>
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
				list:[],
				selectedList:[],
				
			}
		},
		onLoad() {
			this.getInfo().then(()=>{
				this.getList();
			});
			
		},
		onShow() {
			let data = uni.getStorageSync('chooseData');
			this.selectedList = data && data.selectedList?  data.selectedList:[];
			this.binData1 = data && data.list ?data.list:[];
			this.$forceUpdate();
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
						pageSize:300,
						type:2
					},
					type:'data'
				},true,true).then(data=>{
					// that.binData1 = data.records;
					let list = [];
					data.records.map((v,k)=>{
						if(that.selectedList && that.selectedList.length !=0){
							that.selectedList.map(vv=>{
								if(vv.id == v.id){
									data.records[k].isSelected = true
								}
							})
						}
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
					that.info = data.records[0];
					that.date = data.records[0].workbenchExpire;
					that.selectedList = data.records[0].forteName?JSON.parse(data.records[0].forteName):[];
				})
			},
			save(){
				console.log(this.selectedList);
				console.log(JSON.stringify(this.selectedList))
				if(this.selectedList.length !=0){
					let selectedList = [];
					this.selectedList.map(v=>{
						selectedList.push(v.id);
					})
					return request({
						url:getApp().$api.work.editForte,
						data:{
							id:this.info.id,
							forte:selectedList.join(','),
							user_id:getApp().globalData.userId,
							forteName:JSON.stringify(this.selectedList)
						},
						type:'PUT'
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
			},
			toPage() {
					uni.setStorageSync('chooseData',this.binData1)
					uni.navigateTo({
						url: '/pages/Search/choose/choose',
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
				
			}
		}
	}
</script>

<style>
	.content{
		margin: 30rpx;
		width:650rpx;
		text-align: right;
		height: 100rpx;
		line-height: 100rpx;
		overflow-x: scroll;
		padding:0 20rpx;
		border-radius: 6rpx;
		background-color: #f6f6f6;
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
	.itemRightText_not{
		color: #999999;
	}
</style>
