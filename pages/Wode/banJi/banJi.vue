<template>
	<view class="viewPage">
		<view class="list">
			<ban-ji v-for="(v,k) in banjiList" :itemObject="v"></ban-ji>
		</view>
		<view class="save"  @click="creatBanji">新建班级</view>
	</view>
</template>

<script>
	import banJi from "../../../components/banJi/banJi.vue"
	import request from '../../../utils/util.js'
	
	export default {
		data() {
			return {
				banjiList:[ 
				],
			}
		},
		components:{
				banJi,
				
		},
		onLoad:function(e){
			if(options.type == 1){
				this.type = options.type?options.type:2;
			}
			this.getList()
		},
		 
		methods: {
			creatBanji(){
				uni.navigateTo({
					url:'../createBanJi/createBanJi',
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			getList(){
				let that = this;
				return request({
					url: getApp().$api.banji.getbanjiList,
					type: 'GET',
					data:{
						 createUserId:getApp().globalData.userId,
					condition1:this.type == 1,
					condition2:this.type == 2
						 
					}
				},true,true).then(data=>{
 					console.log(data)
     					that.banjiList = data.records
				 
				});
			},
		}
	}
</script>

<style scoped>
	.list{
		padding:0 30rpx;
		padding-bottom: 140rpx;
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
