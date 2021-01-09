<template>
	<view class="msg-body" style="flex-wrap: wrap;">
		<!--<text class="msg-level" v-if="item.level">{{item.level}}级</text>-->
		<!-- <image v-if="item.level" 
		:src="'/static/imgs/level/level_charm_icon_'+item.level+'.png'" style="width: 60rpx;height: 30rpx;margin-top: 5rpx;margin-right: 7rpx;"
		 mode=""></image> -->
		<text class="msg-nick"
		 @tap="tapSubLiveUser" :data-user-id="item.uid" 
		 :style="{'color': item.nick_color ? item.nick_color : '#ffffff'}">{{item.nickname}}: </text>
		<text class="msg-content"
		 :style="{'color': item.content_color 
		 ? item.content_color : '#ffffff'}">{{item.content}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				default: false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			tapSubLiveUser: function(e) {
				var user_id = e.target.dataset.userId;
				if (user_id) {
					uni.$emit('updateSubRoomUser', {
						user_id: user_id
					});
					uni.getSubNVueById('subRoomUser').show('slide-in-bottom', 0);
				}
			}
		}
	}
</script>

<style scoped>
	.msg-body {
 		background-color: rgba(0, 0, 0, 0.3);
		flex-direction: row;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 16rpx;
		padding-bottom: 16rpx;
		border-radius: 40rpx;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.msg-nick {
		font-size: 28rpx;
		align-items: center;
		line-height: 40rpx;
		justify-content: center;
		padding-right: 10rpx;
		max-width: 160rpx;
		lines: 1;
		font-family: PingFangSC-Medium;
	}

	.msg-content {
		font-size: 28rpx;
		align-items: center;
		line-height: 40rpx;
		justify-content: center;
		max-width: 550rpx;
		font-family: PingFangSC-Medium;
	}

	.msg-level {
		border-radius: 5rpx;
		background-color: #23BB8E;
		font-size: 20rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin: 8rpx;
		color: #FFFFFF;
		line-height: 25rpx;
		height: 25rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-family: PingFangSC-Medium;
	}

	.join-body {
		flex-direction: row;
		margin-bottom: 12rpx;
		margin-top: 12rpx;
		padding-left: 10rpx;
		transform: translateX(-400rpx);
	}
</style>
