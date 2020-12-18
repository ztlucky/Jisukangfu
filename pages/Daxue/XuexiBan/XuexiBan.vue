<template>
	<view class="viewPage">
		<view class="list">
			<ban-ji v-for="(v,k) in banjiList" :itemObject="v"></ban-ji>
		</view>
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
 
</style>
