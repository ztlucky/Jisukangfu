<template>
	<view class="sild" >
		<view class="sildLeft" :style="'left:'+left+'rpx'" @touchstart="start" @touchmove="move"  @touchend="end">
			<view class="text" v-if="!isEdit">徒手几十人检查</view>
			<input class="text" v-else />
			<image src=""></image>
		</view>
		<image src="" :style="'right:'+(-50 + right)+'rpx'" class="delete"></image>
		<view class="back"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit:false,
				isShow:false,
				left:0,
				right:50,
				startLeft:'',
				moveLeft:''
			}
		},
		methods: {
			start(e){
				this.startLeft = e.changedTouches[0].clientX;
				this.moveLeft = e.changedTouches[0].clientX;
				this.isShow = false;
			},
			move(e){
				let move = e.changedTouches[0].clientX;
				if(move < this.moveLeft){
					this.isShow = true;
				}else if(move > this.moveLeft){
					this.isShow = false;
				}
				
				this.setLeft(this.startLeft - move);
				this.moveLeft = move;
			},
			end(e){
				this.startLeft = 0;
				this.moveLeft = 0;
				if(this.isShow){
					this.left = -50;
					this.right = 100;
				}else{
					this.left = 0;
					this.right = 50;
				}
			},
			setLeft(num){
				num*=-2;
				if(this.left + num>0){
					this.left = 0
				}else if(this.left + num <=-50){
					this.left = -50;
				}else{
					this.left +=num;
				}
				this.right = 50-this.left;
			}
		}
	}
</script>

<style scoped>
	.sild{
		width:640rpx;
		height: 80rpx;
		position: relative;
		left: 0;
		top:0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		/* overflow: hidden; */
	}
	.sildLeft{
		width:536rpx;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		padding-left: 28rpx;
		padding-right: 26rpx;
		position: absolute;
		top:0;
		left: 0;
	}
	.sildLeft > image{
		width:32rpx;
		height: 32rpx;
		background-color: #000000;
	}
	.sild .delete{
		position: absolute;
		top:0;
		transform: translateY(80%);
		right: 14rpx;
		width: 30rpx;
		height: 30rpx;
		background-color:#E02020;
		/* margin:14rpx; */
	}
	.sild .back{
		width:52rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		position: absolute;
		right: -2rpx;
		top:0;
	}
</style>
