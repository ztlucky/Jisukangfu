<template>
	<view class="viewPage">
		<view class="list">
			<live  :item="item" v-for="(item ,index) in list" :index="index" :isSelect="true" @setNowItemStatus="setNowItemStatus" :key="index"></live>
		</view>
		<view class="save" @click="save">确认</view>	
	</view>
</template>

<script>
	import live from "../../../components/selectLive/selectLive.vue"
	export default {
		data() {
			return {
				list:[]
			}
		},
		components:{
			live
		},
		onShow() {
			this.getCourseAndLiveList();
		},
		onLoad() {
			this.getData();
			console.log(11111)
		},
		methods: {
			//获取直播数据
 			getData() {
				this.$app.request({
					
					url: this.$api.zhibo.livelist,
					data: {
						userId: 1
					},
					method: 'GET',
					dataType: 'json',
					success: res => {
						if (res.code ==200) {
							 
							if(this.liveList){
								this.liveList.map(v=>{
									if(res.result.records){
										res.result.records.map((vv,kk)=>{
											if(vv.id == v.id){
												res.result.records[kk].isSelect = true;
											}
										})
									}
								})
							}
						    this.list =  res.result.records;
 							
						 
						}
					},
					fail: res => {
					},
					complete: res => {
					}
				});
			},
			create(){
				uni.navigateTo({
					url:"/pages/Zhibo/createLive/createLive",
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			setNowItemStatus(data){
				let index = data.index;
				this.list[index].isSelect = !this.list[index].isSelect;
				this.$set(this.list,index,this.list[index]);
			},
			save(){
				if(this.list){
					let list = [];
					this.list.map(v=>{
						if(v.isSelect) list.push(v);
					});
					let arr = {
						courseList:this.courseList,
						liveList:list
					}
					uni.setStorageSync('courseAndLiveList',arr);
				}
				uni.navigateBack();
			},
			getCourseAndLiveList(){
				let list = uni.getStorageSync('courseAndLiveList');
				if(list){
					this.courseList = list.courseList;
					this.liveList = list.liveList;
				}
			}
		}
	}
</script>

<style scoped>
	.list{
		padding-bottom: 140rpx;
	}
	.save {
		position: fixed;
		bottom: 38rpx;
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
