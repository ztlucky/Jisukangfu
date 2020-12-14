<template>
	<view class="viewPage" >
		<nav-bar :bgColor="bgColor" fontColor="#000000" title="认证信息">
			<view slot="right" @click="save" class="navRight">保存</view>
		</nav-bar>
		<view class="input">
			<input type="text" :value="value" v-model="value" placeholder="请输入内容"  />
		</view>
	</view>
</template>

<script>
	
	import navBar from "../../../components/zhouWei-navBar/index.vue"
	export default {
		data() {
			return {
				bgColor:'#FFFFFF',
				value:''
			}
		},
		components:{
			navBar
		},
		onLoad(options) {
			this.key = options.key?options.key:'';
			this.value = options.value?options.value:'';
		},
		methods: {
			save(){
				uni.$emit("addInfoText",{
					key:this.key,
					value:this.value
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:750rpx;
		min-height: 100vh;
		background-color: #F9F9F9;
	}
	.navRight {
		width: 134rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		font-size: 26rpx;
		color: #333333;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 30rpx;
		border-radius: 8rpx;
		border: 2rpx solid #979797;
	}
	.input{
		width:690rpx;
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding:0 30rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
	}
	input{
		width:690rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
</style>
