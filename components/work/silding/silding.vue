<template>
	<view class="sild" >
		<view class="sildLeft" @click.stop="" :style="'width:'+(!isRun?'640':'500')+'rpx'" >
			<view class="text hidden" :style="'width:'+(!isRun?'494':'442')+'rpx;color:'+(data.title?'#333333':'#888888')" v-if="!isEdit">{{data.title?data.title:' '}}</view>
			<input placeholder="请输入选项内容" class="text" :focus="true" @blur="blur()" :style="'width:'+(!isRun?'494':'442')+'rpx'" v-else v-model="data.title"/>
			<image src="" @click="setEditStatus()"></image>
		</view>
		<image src="" v-if="isRun" @click="deleteItem"  class="delete"></image>
		<!-- <view class="back"></view> -->
	</view>
</template>

<script>
	export default {
		props:{
			data:{
				type:Object,
				default:()=>{
					return {
						title:'默认文字'
					}
				}
			},
			isRun:{
				type:Boolean,
				default:true
			},
			index:{
				type:Number,
				default:-1
			}
		},
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
				this.$emit('reset',{});
				if(!this.isRun){
					return false;
				}
				this.startLeft = e.changedTouches[0].clientX;
				this.moveLeft = e.changedTouches[0].clientX;
				this.isShow = false;
				this.isReset = false;
			},
			move(e){
				if(!this.isRun){
					return false;
				}
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
				if(!this.isRun){
					return false;
				}
				this.startLeft = 0;
				this.moveLeft = 0;
				if(this.isShow){
					this.left = -50;
					this.right = 100;
				}else{
					this.left = 0;
					this.right = 50;
				}
				this.isReset = true;
				
			},
			resetLeft(){
				if(this.isReset){
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
			},
			deleteItem(){
				let that = this;
				uni.showModal({
					title:"温馨提示",
					content:"确定要删除该选项？",
					confirmColor:'#31D880',
					mask:true,
					success(e) {
						if(!e.cancel){
							that.$emit('deleteItem',this.index)
						}
						
					}
				})
				
			},
			setEditStatus(){
				this.isEdit = !this.isEdit;
			},
			blur(){
				let that = this;
				this.setEditStatus();
				this.$emit('editTitle',{
					index:that.index,
					value:that.data.title
				})
			}
		}
	}
</script>

<style scoped>
	.sild{
		width:640rpx;
		height: 80rpx;
		/* position: relative;
		left: 0;
		top:0; */
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
		/* position: absolute;
		top:0;
		left: 0; */
	}
	.sildLeft > image{
		width:32rpx;
		height: 32rpx;
		background-color: #000000;
	}
	.sild .delete{
		/* position: absolute; */
		/* top:0; */
		/* transform: translateY(80%); */
		/* right: 14rpx; */
		width: 30rpx;
		height: 30rpx;
		background-color:#E02020;
		margin-right: 22rpx;
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
