<template>
	<view class="contentview">
		<text class="text">{{info}}
 		</text>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:''
			}
		},
		onLoad(e) {
			this.info = e.info;
		},
		methods: {
			
		}
	}
</script>

<style>
	.contentview{
		display: flex;
		flex-direction: column;
	}
.text{
	display: flex;
 	margin-left: 30rpx;
	margin-right: 30rpx;
	margin-top: 30rpx;
	font-size: 32rpx;
 	word-break: break-all;
}
</style>
