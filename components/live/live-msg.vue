<style scoped>
	.msg-main {
		padding: 10rpx;
		flex: 1;
		background-color: rgba(0, 0, 0, 0); 
 		
	}

	.msg-list {
		max-height: 400rpx;
	}

	.msg-item {
		flex-direction: row;
		margin-bottom: 12rpx;
		padding: 10rpx;
		width: 750rpx;
 		
	}

	.msg-body {
		  background-color: rgba(0, 0, 0, 0.3); 
		flex-direction: row;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 8rpx;
		padding-bottom: 8rpx;
		border-radius: 10rpx;
 		
	}

	.msg-nick {
 		
		font-size: 26rpx;
		align-items: center;
		line-height: 40rpx;
		justify-content: center;
		padding-right: 10rpx;
		max-width: 160rpx;
		lines: 1;
		font-family: PingFangSC-Medium;
	}

	.msg-content {
		
		font-size: 26rpx;
		align-items: center;
		line-height: 40rpx;
		justify-content: center;
		max-width: 350rpx;
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

	.join-nick {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 26rpx;
		color: #ffaa00;
		align-items: center;
		height: 46rpx;
		line-height: 46rpx;
		justify-content: center;
		padding-left: 10rpx;
		max-width: 150rpx;
	}

	.join-msg {
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 26rpx;
		color: #ffffff;
		align-items: center;
		border-bottom-right-radius: 10rpx;
		border-top-right-radius: 10rpx;
		height: 46rpx;
		line-height: 46rpx;
		justify-content: center;
		padding-right: 10rpx;
		padding-left: 10rpx;
		max-width: 400px;
	}
</style>
<template>
	<view class="msg-main" @touchstart.stop="stopFunc" @touchmove.stop="stopFunc" @touchend.stop="stopFunc"
	 @touchcancel.stop="stopFunc">
		<!-- <list>
			<cell v-for="(item, index) in msg" :key="index">
				<room-gift :item="item" :index="index" :display.sync="item.display" :num="item.num" v-if="!item.display && item.type == 'gift'"></room-gift>
			</cell>
		</list> -->
		<view class="" style="flex-direction: row;">
			<list class="msg-list" :show-scrollbar="false" :scrollable="true">
				<cell class="msg-item"
				 :ref="'msg-item-'+index" 
				 :id="'msg-item-'+index" v-for="(item, index) in msg" 
				 :key="index">
					 <!-- <room-msg-gift :item="item" v-if="item.type == 'gift'" :num="item.num"></room-msg-gift> -->
					<room-msg-chat :item="item" ></room-msg-chat>
				</cell>
			</list>
		</view>
		<view ref="joinPop" class="join-body">
			<text class="join-nick">{{join_msg.nickname}}</text>
			<text class="join-msg">{{join_msg.content}}</text>
		</view>
	</view>
</template>

<script>
	// import RoomGift from './room-gift';
	// import RoomMsgGift from './room-msg-gift';
	import RoomMsgChat from './room-msg-chat';
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
	var timer = null;
	export default {
		components: {
			//RoomGift,
			//RoomMsgGift,
			RoomMsgChat
		},
		data() {
			return {
				position: 0,
				msg: [],
				join_msg: {}
			}
		},
		created() {

		},
		destroyed() {

		},
		methods: {
			stopFunc: function(e) {
				//console.log("sadsa", e);
			},
			addMsg: function(data_msg) {
				if (data_msg.type == 'gift') {
					if (this.msg.length <= 0) {
						this.msg = this.msg.concat(data_msg);
					} else {
						//console.log("1111");
						let msg_list = this.msg;
						let num = 0;
						for (var i = 0; i < msg_list.length; i++) {
							if (msg_list[i].uuid == data_msg.uuid && msg_list[i].type == 'gift') {
								msg_list[i].display = false;
								msg_list[i].num = data_msg.click_num;
								num = num + 1;
								break;
							} else {
								//msg_list[i].display = true;
							}
						}
						if (num <= 0) {
							this.msg = this.msg.concat(data_msg);
						}
					}
				} else {
					this.msg = this.msg.concat(data_msg);
				}
				this.position = this.msg.length - 1;
				this.msgScroll(this.position);
			},
			addJoinMsg: function(res) {
				this.join_msg = res;
				this.animationJoinMsg();
			},
			msgScroll: function(id) {
				setTimeout(() => {
					const ref = this.$refs['msg-item-' + id];
					const el = ref ? ref[0] : null;
					if (el) {
						dom.scrollToElement(el, {
							offset: 0,
							animated: true
						});
					}
				}, 200)
			},
			animationJoinMsg: function() {
				this.$nextTick(() => {
					animation.transition(
						this.$refs['joinPop'], {
							styles: {
								transform: 'translateX(-400rpx)'
							},
							duration: 0,
							delay: 0
						},
						() => {}
					);
					animation.transition(
						this.$refs['joinPop'], {
							styles: {
								transform: 'translateX(0)'
							},
							duration: 1000,
							delay: 100
						}, () => {
							animation.transition(
								this.$refs['joinPop'], {
									styles: {
										transform: 'translateX(-400rpx)'
									},
									duration: 1000,
									delay: 2000
								},
								() => {

								}
							);
						}
					);
				})
			},
		},
	}
</script>
