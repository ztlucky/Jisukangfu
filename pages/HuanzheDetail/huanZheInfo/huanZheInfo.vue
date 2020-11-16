<template>
	<view class="viewPage">
		<view class="huanzheview">
			<view class="huanzheTopview">
				<image src="/static/gongzuotai/icon_nv.png"></image>
				<view class="huanzherightview">
					<view class="firstView">
						<text class="name">刘胡兰 <text class="num">5床</text></text>
						<text class="detail">性别：女 年龄：56</text>
					</view>
					<view class="secodview">
						<view class="zhenduanview">
							<image class="zhenduanimage" src="/static/gongzuotai/icon_zhenduan1.png"></image>
							<text>诊断：心脏病</text>
						</view>
						<text class="timetext">时间:2020-05-22 06:52</text>
					</view>
		
				</view>
			</view>
		
		</view>
		
		<view class="list">
			<view class="listTop">
				<image src="../../../static/Huanzhexiangqing/icon_jilu.png"></image>
				<view class="topText">患者记录</view>
			</view>
			<view class="item" @click="toPage('/pages/HuanzheDetail/recordInfo/recordInfo')"  v-for="(v,k) in [1,2,3,4]" :key="k">
				<view class="itemLeft"></view>
				<view class="itemRight">
					<view class="text">
						<view class="title hidden">患者记录患者记录患者记录患者记录患者记录患者记录患者记录1</view>
						<view class="time">2020-06-30 06:00</view>
					</view>
					<image src="../../../static/f_my_kecheng_arrow.png"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
			toPage(url) {
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width: 100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-bottom: 180rpx;
		overflow: hidden;
	}
	.list{
		width:690rpx;
		margin: 30rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding-bottom: 36rpx;
	}
	.item{
		width:630rpx;
		padding:0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* height: 118rpx; */
		overflow: hidden;
	}
	.item .itemLeft{
		width:8rpx;
		height: 8rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.itemRight{
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.itemRight image{
		width:32rpx;
		height: 32rpx;
	}
	.title{
		width: 540rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
		padding-top:40rpx;
	}
	.time{
		padding-bottom: 20rpx;
		margin-top:8rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 32rpx;
	}
	.listTop{
		display: flex;
		align-items: center;
		width: 630rpx;
		padding:0 30rpx;
		height: 92rpx;
		border-bottom: 2rpx solid #EAEAEA;
		
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.listTop image{
		width:24rpx;
		height: 28rpx;
		margin-right:26rpx;
	}
</style>
<style scoped lang="scss">
	.huanzheview {
		background: #FFFFFF;
		border-radius: 16rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
	
		.huanzheTopview {
			display: flex;
			flex-direction: row;
	
			image {
				width: 118rpx;
				height: 118rpx;
				margin-top: 20rpx;
				margin-left: 30rpx;
				margin-bottom: 20rpx;
			}
	
			.huanzherightview {
				display: flex;
				flex-direction: column;
				flex: 1;
	
				.firstView {
					display: flex;
					flex-direction: row;
					position: relative;
	
					.name {
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-left: 26rpx;
						margin-top: 34rpx;
					}
	
					.detail {
	
						font-size: 20rpx;
						font-weight: 400;
						color: #666666;
						margin-top: 36rpx;
						position: absolute;
						right: 30rpx;
	
					}
	
				}
	
				.secodview {
					display: flex;
					flex-direction: row;
					position: relative;
					align-items: center;
	
					.zhenduanview {
						width: fit-content;
						background: #F0F0F0;
						height: 36rpx;
						border-radius: 22rpx;
						display: flex;
						flex-direction: row;
						margin-left: 10rpx;
						padding-right: 15rpx;
						margin-top: 9rpx;
						padding-top: 5rpx;
	
						.zhenduanimage {
							width: 28rpx;
							height: 28rpx;
							margin-top: 0rpx;
							margin-left: 5rpx;
	
						}
	
						text {
							font-size: 20rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-left: 8rpx;
						}
					}
	
					//
	
					.timetext {
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-top: 8rpx;
						margin-left: 10rpx;
						position: absolute;
						right: 15rpx;
	
					}
	
				}
	
	
			}
		}
	
	
	
	}
	.num{
		display: inline-block;
		margin-top: 10rpx;
		margin-left: 16rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
</style>