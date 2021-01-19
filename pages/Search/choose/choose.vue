<template>
	<view >
		<nav-bar bgColor="#ffffff" backState="1000" fontColor="#7fcca8" title="选择分类">
			<view slot="right" @click="save" class="navRight">确认</view>
		</nav-bar>
		<view class="itemList">
			<view class="item hidden2" :class="item.isSelected?'item_':''" @click="setStatus(index,item.isSelected)" v-for="(item , index) in list" :key="index">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					
				]
			}
		},
		created() {
			this.list = uni.getStorageSync('chooseData');
			console.log(this.list)
		},
		methods: {
			setStatus(index,f){
				this.list[index].isSelected = !f;
				this.$set(this.list,index,this.list[index]);
			},
			save(){
				let selectedList = [];
				let list = this.list;
				list.map((v,k)=>{
					if(v.isSelected){
						selectedList.push(v);
					}
				});
				uni.setStorageSync('chooseData',{
					selectedList,
					list
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #fefefe;
	}
.navRight {
		width: 104rpx;
		height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
		background-color: #7fcca8;
		border-radius: 8rpx;
		margin-right: 30rpx;
	}
	.itemList{
		padding:40rpx 0;
		margin-left: 20px;
		display: flex;
		flex-wrap: wrap;
	}
	.item{
		width: 146rpx;
		padding:0 10rpx;
		height: 90rpx; 
		/* display: flex; */
		/* padding:20rpx 0; */
		line-height: 36rpx;
		justify-content: center;
		align-items: center;
		font-size:22rpx;
		margin-right: 8rpx;
		background-color: #F6F6F6;
		margin-bottom: 8rpx;
		text-align: center;
		border-radius: 10rpx;
	}
	.item_{
		background-color: #7bc6a5;
		color:#FFFFFF;
	}
</style>
