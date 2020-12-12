<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')

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
		globalData: {
			userId: uni.getStorageSync('userid') ? uni.getStorageSync('userid') : 1,
			userName: uni.getStorageSync('name') ? uni.getStorageSync('name') : '游客',
            livesku:""
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
