<template>
	<view class="viewPage">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="项目" type="ordinary">
			<view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view>
		</nav-bar>
		<view class="list">
			<view class="item" v-for="(v,k) in [1,2,3,4,5,6,7,8,9]" :key="k">
				<view class="itemTop">
					<view class="left">
						<view class="dot"></view>
						<view class="leftTitle hidden">PTWPEWE</view>
					</view>
					<image src="" v-if="isEdit"></image>
				</view>
				<view class="xiangMuList">
					<view class="xiangMuItem" >
						<view class="name">项目一</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">时间：90min</view>
						</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">费用：50</view>
						</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">得分：50</view>
						</view>
					</view>
					<view class="xiangMuItem">
						<view class="name">项目一</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">时间：90min</view>
						</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">费用：50</view>
						</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">得分：50</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="!isEdit" @click="setNowStatus">编辑评定量表分类</view>
		<view class="bottomNav" v-else>
			<view class="">删除选中的分类</view>
			<view class="">添加新的分类</view>
		</view>
	</view>
</template>

<script>
	import navBar from "../../../components/zhouWei-navBar/index.vue"
	export default {
		data() {
			return {
				isEdit:false
			}
		},
		methods: {
			setNowStatus(){
				this.isEdit = !this.isEdit;
			},
			save(){
				this.setNowStatus();
			}
		},
		components:{
			navBar
		}
	}
</script>

<style scoped>
	.viewPage{
		width:100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-bottom: 120rpx;
		overflow: hidden;
	}
	.list{
		width:690rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin:30rpx;
		padding-top:46rpx;
		padding-bottom: 40rpx;
	}
	.item{
		padding-bottom: 8rpx;
	}
	.itemTop{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40rpx;
	}
	.item .left{
		display: flex;
		align-items: center;
	}
	.item .left .dot{
		width:8rpx;
		height: 8rpx;
		border-radius: 50%;
		background-color: #31D880;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}
	.xiangMuList{
		width: 618rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin-left: 72rpx;
		border-bottom:2rpx solid #EAEAEA;
	}
	.xiangMuItem{
		display: flex;
		width:618rpx;
		height: 40rpx;
		/* padding-left: 72rpx; */
		padding-bottom: 20rpx;
		
	}
	.leftTitle{
		max-width: 540rpx;
	}
	.xiangMuItem .name{
		
		height: 40rpx;
		line-height: 40rpx;
		padding:0 14rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #31D880;
		border-radius: 8rpx;
	}
	.xiangMuzItem{
		display: flex;
		align-items: center;
		height: 40rpx;
		margin-left: 30rpx;
		font-size: 22rpx;
		line-height: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		
	}
	.xiangMuzItem .dot{
		width:8rpx;
		height: 8rpx;
		border-radius: 50%;
		background-color: #31D880;
		margin-right: 10rpx;
	}
	.bottom{
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		color:#FFFFFF
	}
	.bottomNav{
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		display: flex;
		width:690rpx;
		/* margin-left: 30rpx; */
		justify-content: space-between;
		
	}
	.bottomNav >view{
		line-height: 80rpx;
		text-align: center;
	}
	.bottomNav >view:nth-child(1){
		width: 330rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border:2rpx solid #E02020;
		font-size:28rpx;
		color:#E02020;
		background-color: #FFFFFF;
	}
	.bottomNav >view:nth-child(2){
		width: 330rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		font-size:28rpx;
		color:#FFFFFF;
	}
	.navRight{
		width:104rpx;
		height: 40rpx;
		text-align: center;
		font-size:24rpx;
		color:#31D880;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 30rpx;
	}
	.itemTop image{
		width:24rpx;
		height: 24rpx;
		background-color: red;
		margin-right: 30rpx;
		border-radius: 50%;
	}
</style>
