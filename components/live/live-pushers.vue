<style scoped>

</style>
<template>
	<live-pusher
	 id='livePusher'
	 ref="livePusher" 
	 class="livePusher" 
	 :url="push_url"
	  mode="FHD" 
	 :muted="muted"
	 :enable-camera="true" 
	 :auto-focus="true" 
	 :beauty="beauty" 
	 :whiteness="whiteness" 
	 aspect="9:16" device-position="front"
	 @statechange="statechange"
	  @netstatus="netstatus" 
	  @error="error" 
	  style="width: 750rpx;position: absolute;" 
	  :style="{height:systemInfo.screenHeight + 'px'}"
	  ></live-pusher>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	var liveContext = null;
	export default {
		components: {},
		computed: {
			...mapState([
				'systemInfo'
			]),
		},
		props: {
			push_url: {
				default: false
			}
		},
		data() {
			return {
				whiteness: 2,
				beauty: 2,
				muted: false,
				screenHeight:0
			}
		},
		created() {
			uni.$on('updateLiveBeauty', (data) => {
				this.beauty = data.value;
				//console.log("美颜级别:", this.beauty);
			});
			uni.$on('updateLiveWhiteness', (data) => {
				this.whiteness = data.value;
				//console.log("美白级别:", this.whiteness);
			});
			uni.$on('updateLiveMuted', (data) => {
				this.muted = data.value;
				console.log("声音开关:", this.muted);
			});
			uni.$on('updateLiveSwitchCamera', (data) => {
				liveContext.switchCamera({
					success: (res) => {
						console.log("已切换摄像头");
					},
					fail: (res) => {
						console.error("切换摄像头失败");
					}
				});
			});
			uni.$on('updateLivePusherMode', (data) => {
				this.mode = data.value;
				console.log("切换推流视频模式:", this.mode);
			});
			// setTimeout(()=>{
			// 	this.playLive();
			// }, 10)
		},
	 
		methods: {
			playLive: function() {
				this.$nextTick(() => {
					liveContext = uni.createLivePusherContext("livePusher", this);
					liveContext.startPreview({
						success: (res) => {
							console.log("摄像头开启成功");
							console.log(res)
							liveContext.start({
								success: (res) => {
									//this.live_start = true;
									console.log("开启推流", res);
									setTimeout(() => {
										this.$parent.startLiveStatus(res);
									}, 1000);
								},
								fail: (res) => {
									console.error("开启推流失败", res);
								}
							});
						},
						fail: (res) => {
							console.error("摄像头开启失败");
						}
					});
				})
			},
			statechange(e) {
				//console.log("statechange:" + JSON.stringify(e));
			},
			netstatus(e) {
				//console.log("netstatus:" + JSON.stringify(e));
			},
			error(e) {
				console.log("error:" + JSON.stringify(e));
			},
			start: function() {
				liveContext.start({
					success: (a) => {
						console.log("livePusher.start:" + JSON.stringify(a));
					}
				});
			},
			close: function() {
				liveContext.close({
					success: (a) => {
						console.log("livePusher.close:" + JSON.stringify(a));
					}
				});
			},
			snapshot: function() {
				liveContext.snapshot({
					success: (e) => {
						console.log(JSON.stringify(e));
					}
				});
			},
			resume: function() {
				liveContext.resume({
					success: (a) => {
						console.log("livePusher.resume:" + JSON.stringify(a));
					}
				});
			},
			pause: function() {
				liveContext.pause({
					success: (a) => {
						console.log("livePusher.pause:" + JSON.stringify(a));
					}
				});
			},
			stop: function() {
				liveContext.stop({
					success: (a) => {
						console.log(JSON.stringify(a));
					}
				});
			},
			switchCamera: function() {
				liveContext.switchCamera({
					success: (a) => {
						console.log("livePusher.switchCamera:" + JSON.stringify(a));
					}
				});
			},
			startPreview: function() {
				liveContext.startPreview({
					success: (a) => {
						console.log("livePusher.startPreview:" + JSON.stringify(a));
					}
				});
			},
			stopPreview: function() {
				liveContext.stopPreview({
					success: (a) => {
						console.log("livePusher.stopPreview:" + JSON.stringify(a));
					}
				});
			}
		}
	}
</script>
