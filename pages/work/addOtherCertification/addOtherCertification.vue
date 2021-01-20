<template>
	<view class="viewPage" >
		<nav-bar :bgColor="bgColor" fontColor="#000000" title="认证信息">
			<view slot="right" @click="save" class="navRight" :style="'background:'+(value?'#0091FF;color:#ffffff':'')">确认</view>
		</nav-bar>
		<view class="input">
			<input  :name="value" v-model="value" placeholder="请输入内容"  />
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
				if(this.key == 'idNo' && !this.check(this.value)){
					uni.showToast({
						title:'身份证格式异常，请检查后重试!',
						icon:'none'
					})
					return false;
				}
				uni.$emit("addInfoText",{
					key:this.key,
					value:this.value
				});
				setTimeout(function() {
					// 登录成功
					uni.navigateBack();
					
				}, 1000)
			},
			check(id) {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (reg.test(id) === false) return false;
				return true;
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
