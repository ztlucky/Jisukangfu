<template>
	<view class="view">
		<view class="content">
			<view class="title">评定量表分类</view>
			<yealuo @getBackVal="getBackVal" the-style="font-size: 46upx;"  :selectIco="true" overflow="hide" :isSetUrl="true" placeholder="请选择分类" width="590" :binData="binData" 
			 :isShowAllBack="true" padding="20rpx"></yealuo>
			<view class="title">评定量表标题</view>
			<input placeholder="请输入要创建的评定量表的标题" v-model="title"/>
		</view>
		<view class="bottom" @click="next">下一步</view>
	</view>
</template>

<script>
	// import {Component ,Vue} from 'vue-property-decorator';
	// console.log(Component ,Vue)
	import yealuo from "../../../components/yealuo-select/yealuo-select.vue";
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				binData: [
				],
				nowIndex:-1,
				title:''
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			getBackVal(data) {
				this.nowIndex = data.split('|')[1];
				let nowIndex = 0;
				this.binData.map((v,k)=>{
					if(v.id == this.nowIndex){
						nowIndex = k;
					}
				});
				this.nowIndex = nowIndex;
			},
			init(){
				this.getList();
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getillnessList,
					type:"GET",
					data:{
						pageNo:1,
						pageSize:200,
						userId:getApp().globalData.userId
					}
				},true,true).then(data=>{
					if(data.records.length !=0){
						data.records.map(v=>{
							v.value = v.name;
						})
					}
					that.binData = data.records;
				})
			},
			next(){
				if(this.nowIndex == -1){
					uni.showToast({
						title:'请选择分类',
						duration:1500,
						icon:"none",
						mask:true
					});
					return false;
				}else if(!this.title){
					uni.showToast({
						title:'请输入量表的标题',
						duration:1500,
						icon:"none",
						mask:true
					});
					return false;
				}
				let url = `/pages/work/pingDingLiangBiaoProblemType/pingDingLiangBiaoProblemType?typeid=${this.binData[this.nowIndex].id}&name=${this.title}&typename=${this.binData[this.nowIndex].name}`;
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		},
		components: {
			yealuo
		}

	}
</script>

<style scoped>
	.view {
		width: 100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
	}

	.content {
		width: 590rpx;
		margin: 32rpx 30rpx;
		padding: 50rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}

	.title {
		color: #666666;
		font-size: 32rpx;
		line-height: 44rpx;
		padding-top: 10rpx;
		padding-bottom: 20rpx;
	}

	.content input {
		width: 534rpx;
		line-height: 80rpx;
		height: 80rpx;
		color: #333333;
		border-radius: 8rpx;
		background-color: #F5F5F5;
		font-size: 28rpx;
		padding: 0 28rpx;
	}

	.bottom {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	}
</style>
