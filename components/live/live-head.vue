<style scoped>
	.head-body {
		padding-left: 30rpx;
		padding-right: 20rpx;
		position: absolute;
		width: 750rpx;
	}

	.head-main {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		/* justify-content: space-between; */
 	}

	.head-hd {
		flex-direction: row;
		align-items: center;
  		border-radius: 50rpx;
		 width: 290rpx;
  		 background-color: rgba(81, 81, 81, 0.5);
		 border-radius:50rpx;
		border-color: #FFFFFF;
		 border-width: 2rpx  ;
		 margin-top: 20rpx;
 	}

	.head-avatar {
		width: 66rpx;
		height:66rpx;
		border-radius: 33rpx;
		margin-left: 10rpx;
		margin-top: 12rpx;
		margin-bottom: 10rpx;
   	}
	.header_title{
 		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 20rpx;
 		margin-top: 30rpx;
		width: 400rpx;
		
	}
.headright{
	flex-direction: column;
	
	
}
.head_time{
	
	font-size: 22rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	margin-top: 6rpx;
	margin-left: 10rpx;
}
	.head-nick {
		font-size: 26rpx;
		margin-left: 10rpx;
		lines: 1;
		text-overflow: ellipsis;
		color: #ffffff;
		flex: 1;
	}

	.head-rank {
		height: 100rpx;
		line-height: 100rpx;
		flex-direction: row;
		flex: 1;
		flex-wrap: nowrap;
		align-items: center;
		text-align: center;
	}

	.head-rank-item {
		position: relative;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-right: 6rpx;
	}

	.head-rank-avatar {
		width: 48rpx;
		height: 48rpx;
		border-radius: 500rpx;
		margin-left: 10rpx;
	}

	.live-online {
		 
		
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-left: 10rpx;
	}

	.navigate-back {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 38rpx;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #FFFFFF;
		border-radius: 100rpx;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.btn-follow {
		align-items: center;
		justify-content: center;
		border-width: 0;
		text-align: center;
		text-decoration: none;
		font-size: 20rpx;
		padding: 0 20rpx;
		height: 48rpx;
		line-height: 48rpx;
		background-image: linear-gradient(to right, #f43f3b, #ec008c);
		color: #ffffff;
		border-radius: 100rpx;
		margin-right: 10rpx;
	}


	.pop-dian {
		border-radius: 10rpx;
		width: 460rpx;
		transform: translateX(-400rpx);
	}

	.pop-dian-head {
		background-color: rgba(0, 0, 0, 0.5);
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		padding-left: 20rpx;
	}

	.pop-dian-head2 {
		background-color: rgba(0, 0, 0, 0.3);
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		padding-left: 20rpx;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>

<template>
	<view class="head-body">
		<view class="head-main">
			<view class="head-hd">
				
 				   <image :lazy-load="true" :src="headimgurl" class="head-avatar" mode=""></image>
 			<!-- <image   src="../../static/gongzuotai/icon_nan.png" class="head-avatar" mode=""></image> -->
				<view class="headright">
					<text class="live-online">{{online}}人在观看</text>
					<text class="head_time">已播 {{result}}</text>
					 			 
					
				</view>
 			</view>
			<text class="header_title">{{nickname}}</text>
			<!-- <scroller class="head-rank" :show-scrollbar="false" scroll-direction="horizontal">
				<view class="head-rank-item" v-for="(item, index) in online_list" :key="index" @tap="tapSubLiveUser" :data-user-id="item.id">
					<image :lazy-load="true" class="head-rank-avatar" :src="item.headimgurl" mode=""></image>
				</view>
			</scroller> -->
			 <!-- <text class="iconfont navigate-back" @tap="navigateBack">&#xe61a;</text> -->
		</view>
		<!-- <view style="flex-direction: row;" v-if="online">
			<text class="live-online">{{online}}</text>
		</view> -->
		<!-- <view style="flex-direction: row;">
			<text @tap="tapGiftRank" class="live-online" style="background-image: linear-gradient(to right, #ff557f, #ff4bde);">礼物榜</text>
		</view> -->
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	var timer = null;
	 import $http from '../../utils/util.js';
	
	//import $http from '@/common/http/index.js';
	//const animation = weex.requireModule('animation');
	export default {
		props: {
			headimgurl: {
				default: ""
			},
			nickname: {
				default: false
			},
			room_id: {
				default: false
			},
			anchor_uid: {
				default: false
			}
		},
		data() {
			return {
				online: '0',
				online_list: [],
				secondNumber:0,
				result:'',
				 
				
			}
		},
		created() {
		 
			setInterval(() => {
				this.getOnline();
				
				this.addSecondNumber();
			},   1000)
		},
		destroyed() {
			clearInterval(timer);
		},
		computed: {
			...mapState([
				'user'
			]),
		},
		methods: {
			addSecondNumber(){
				this.secondNumber ++
 				 var theTime = this.secondNumber; // 秒
				  // 时
				 
				  var HH =  theTime /  3600;
				
				  // 分
				 
				  var mm = theTime %  3600 / 60;
				 
				  // 秒
				 
				  var SS = theTime %  60;
				   var  secStr =""   ; 
					   var  mmStr =""   ;
					   var  hhStr =""   ;
					   
					   
 				if(parseInt(SS)<10){
					secStr = "0"+parseInt(SS).toString()
				}else{
					secStr =  parseInt(SS)
				}
					
				if(parseInt(mm)<10){
					mmStr = "0"+parseInt(mm)
				}else{
					mmStr = parseInt(mm)
					
				}
				if(parseInt(HH)<10){
					hhStr = "0"+parseInt(HH)
				}else{
					hhStr = parseInt(HH)
					
				}
  				this.result =hhStr+":"+mmStr+ ":"+secStr
			},
			animationDian: function() {
				// this.$nextTick(() => {
				// 	animation.transition(
				// 		this.$refs['popDian'], {
				// 			styles: {
				// 				transform: 'translateX(-400rpx)'
				// 			},
				// 			duration: 0,
				// 			delay: 0
				// 		},
				// 		() => {}
				// 	);
				// 	animation.transition(
				// 		this.$refs['popDian'], {
				// 			styles: {
				// 				transform: 'translateX(0)'
				// 			},
				// 			duration: 1000,
				// 			delay: 3000
				// 		}, () => {
				// 			setTimeout(() => {
				// 				animation.transition(
				// 					this.$refs['popDian'], {
				// 						styles: {
				// 							transform: 'translateX(-400rpx)'
				// 						},
				// 						duration: 2000,
				// 						delay: 4000
				// 					},
				// 					() => {

				// 					}
				// 				);
				// 			}, 12 * 1000)
				// 		}
				// 	);
				// })
			},
			tapGiftRank: function() {
				uni.navigateTo({
					url: '/pages/live/rank?room_id=' + this.room_id
				})
			},
			getOnline: function() {
				//console.log("刷新在线观众");
				if (this.room_id) {
					var that = this
					//console.log(getApp().globalData.BaseUrl)
					uni.request({
						url: getApp().globalData.BaseUrl +'live/live/seeLiveCount',
						method: 'GET',
						dataType: 'json',
						data:{
							count:0,
							live_id:this.room_id 
						},
						success: res => {
							//console.log(res)
 							if (res.data.code == 200) {
							that.online = res.data.result 
								 
							} else {
							}
						},
						complete: res => {}
					})
					 
					 
					 
				}
			},
			tapSubLiveUser: function(e) {
				console.log(e);
				var user_id = e.target.dataset.userId;
				if (this.user.id == user_id) {
					return false;
				}
				console.log(user_id);
				uni.$emit('updateSubRoomUser', {
					user_id: user_id
				});
				uni.getSubNVueById('subRoomUser').show('slide-in-bottom', 0);
			},
			tapShowBetting: function() {
				uni.getSubNVueById('subRoomBetting').show('slide-in-bottom', 350);
			},
			navigateBack: function() {
				uni.showModal({
					title: "提示",
					content: "您确定需要退出直播吗？",
					success: (res) => {
						if (res.confirm) {
							this.$emit('back', this.room_id);
						}
					}
				})
			}
		},
	}
</script>
