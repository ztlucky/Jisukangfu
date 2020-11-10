<template>
	<view class="view" @click="resetAll">
		<view class="content" @click="resetAll">
			<view class="title">问题标题</view>
			<silding :isRun="false" ref="sildTitle" @reset="resetAll" :data="title"></silding>
			<view class="title">评定量表选择题</view>
			<silding @deleteItem="deleteItem" ref="sild" @reset="resetAll" v-for="(v,i) in checkbox" :key="i" :data="v" :index="i"></silding>
			<view class="addItem" @click="addItem">添加新的选项</view>
		</view>
		<view class="bottom" @click="setShowNext">保存</view>
		<view class="next" v-if="isShowNext">
			<view class="nextBack" @click="setShowNext"></view>
			<view class="nextContent">
				<view class="">继续添加题目</view>
				<view class="">结束</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sild from '../../../components/work/silding/silding.vue'
	export default {
		data() {
			return {
				isShowNext:false,
				title:{
					title:'问题是开飞机上看'
				},
				checkbox:[
					{
						title:'可是飞机开始发1'
					},
					{
						title:'可是飞机开始发2'
					},
					{
						title:'可是飞机开始发3'
					}
				]
			}
		},
		methods: {
			setShowNext(){
				this.isShowNext = !this.isShowNext;
			},
			getNowStatus(data){
				
			},
			resetAll(){
				this.$refs.sildTitle.resetLeft();
				this.$refs.sild.map(v=>{
					v.resetLeft();
				})
				// this.$refs.sild.resetLeft();
			},
			addItem(){
				this.checkbox.push({
					title:''
				})
			},
			deleteItem(index){
				console.log(index);
				this.checkbox.splice(index,1)
			}
		},
		components:{
			silding:sild
		}
	}
</script>

<style scoped>
	.view{
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-top: 52rpx;
		padding-bottom: 120rpx;
	}
	.content{
		width:590rpx;
		padding:0 50rpx;
		margin-left: 30rpx;
		/* margin-top: 32rpx; */
		background-color: #FFFFFF;
		padding-top:24rpx;
		padding-bottom: 74rpx;
	}
	.title{
		padding-top:16rpx;
		line-height: 44rpx;
		margin-bottom: 20rpx;
		color:#666666;
		font-size:32rpx;
	}
	.addItem{
		width: 246rpx;
		height: 72rpx;
		border-radius: 8rpx;
		border: 2rpx solid #31D880;
		font-size:28rpx;
		color:#31D880;
		text-align: center;
		line-height: 72rpx;
	}
	.bottom{
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		color:#FFFFFF;
		text-align: center;
		font-size:28rpx;
		line-height: 80rpx;
	}
	.next{
		width:100vw;
		height: 100vh;
		position: fixed;
		top:0;
		left: 0;
		z-index: 10;
	}
	.nextBack{
		width: 100vw;
		height: 100vh;
		position: absolute;
		top:0;
		left: 0;
		background-color: rgba(0,0,0,.2);
	}
	.nextContent{
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width:590rpx;
		height: 402rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
	}
	.nextContent view{
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.nextContent view:nth-child(1){
		width: 362rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		color:#FFFFFF;
		margin-top:98rpx;
		margin-bottom: 40rpx;
	}
	.nextContent view:nth-child(2){
		width: 362rpx;
		height: 80rpx;
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		border: 2rpx solid #29D267;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		color:#00D67B;
	}
</style>
