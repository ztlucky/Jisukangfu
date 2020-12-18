<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
// #ifdef APP-PLUS
	setTimeout(function(){
		 console.log(plus.push.getClientInfo())
		 
	},5000)

			const _self = this;
			const _handlePush = function(message) {
				/**
				 * 通过 vuex 来同步页面的数据，仅做演示。
				 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。
				 */
				_self.updatePushMessage(message);
			};
			plus.push.addEventListener('click', function(message) {
				plus.nativeUI.toast('push click');
				_handlePush(message);
			});
			plus.push.addEventListener('receive', function(message) {
				plus.nativeUI.toast('push receive');
				_handlePush(message);
			});
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			  var args = plus.runtime.arguments;
			if (args) {
			  	// 处理args参数，如直达到某新页面等  
			 	console.log(args)
			
			}
			// #endif
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			
		},
		globalData: {
			userId: uni.getStorageSync('userid') ? uni.getStorageSync('userid') : 1,
			userName: uni.getStorageSync('name') ? uni.getStorageSync('name') : '用户'+uni.getStorageSync('userid') ? uni.getStorageSync('userid') : null,
            livesku:"ZB78965",//zhibo
			classsku:"BJ36987",
			course:'KC14789',
			member:'HY32522',
		    reword:'DS12546'
			
		},
	}
</script>

<style>
	/*每个页面公共css */
	/* 	//控制滚动条
 */

	::-webkit-scrollbar {
		display: none;
	}

	.hidden {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.hidden2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-radio-input:hover {
		border-color: #31D880 !important;
	}


</style>
