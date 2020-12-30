<template>
	<view class="viewPage">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="医生设置" type="ordinary">
			<!-- <view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view> -->
		</nav-bar>
		<view class="title">设置擅长项目</view>
		<view class="content">
			<yealuo @getBackVal="getBackVal1" the-style="font-size: 46upx;" :isShowIcon="false"  :selectIco="false" overflow="hide" :isSetUrl="true" placeholder="请选择" width="690" :binData="binData1"
			 :isShowAllBack="false" checkType="checkbox" padding="30rpx" textAlign="right"></yealuo>
		</view>
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
				}]
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getBackVal1(e){
				console.log(e)
			},
			getList(){
				let that = this;
				return request({
					url:getApp().$api.shouye.getcourseCategoryList,
					data:{
						
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
</style>
