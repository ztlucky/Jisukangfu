<script>
	import {
		mapMutations
	} from 'vuex';
	
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
			var ispush = false;
			plus.push.addEventListener('click', function(message) {
				//plus.nativeUI.toast('push click');
				_handlePush(message);
				if(message.title == "UA54963"){
					//检查更新
					ispush = true;
					plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					 		 _self.onUpdate(uni.getSystemInfoSync().platform,widgetInfo)				 
					});
 				}
					 
			});
			plus.push.addEventListener('receive', function(message) {
				 plus.nativeUI.toast('push receive');
				_handlePush(message);
			});
			//没有点击推送，接口请求检测版本更新
			if(ispush == false){
				console.log(ispush)
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					 
 				 			_self.onUpdate(uni.getSystemInfoSync().platform,widgetInfo)				 
				});
			}
  			
			
 			// #endif
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			  var args = plus.runtime.arguments;
			if (args) {
			  	// 处理args参数，如直达到某新页面等  
			 	console.log(args)
				// uni.showModal({
				// 	title:'提示',
				// 	content:JSON.stringify(args)
				// })
			}
			// #endif
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		  methods:{
			  ...mapMutations(['updatePushMessage']),
			  checkUpdate(downloadUrl,tipmessage){
				  var that = this
				  uni.showModal({
				  title: "提示",
				  showCancel:false ,
				  content:tipmessage,
				  confirmText: '更新',
				  success: function (result) {
				  // 更新
				  if (result.confirm) {
				   
				      that.onDownloadApp(downloadUrl);
				   
				  }
				  }
				  });
			  },
			  //请求接口检查更新
			onUpdate(platform, widgetInfo) {
  				
			// 检查更新
			var that = this
			this.$app.request({
				url: this.$api.common.checkVersion,
				method: 'GET',
				data: {
					column: "createTime",
					order:"desc"
				},
				dataType: 'json',
				success: res => {
					console.log("++++" , res)
					if (res.code == 200) {
 			           let item = res.result.records[0]
					   if(widgetInfo.versionCode != item.versionNumber){
						   that.checkUpdate(item.downloadUrl,item.remark)
						   
					   }
			
					} else {
 					}
				},
				complete: res => {
					
				},
			});
 		// 	if (widgetInfo.version != data.vv) {
			// uni.showModal({
			// title: data.t,
			// showCancel: data.f ? false : true,
			// content: data.c,
			// confirmText: ‘更新’,
			// success: function (result) {
			// // 更新
			// if (result.confirm) {
			// let isWgt = data.u.substring(data.u.length - 3);
			// if (isWgt == ‘wgt’) {
			// //_this.onDownloadWgt(data.u);
			// } else {
			// _this.onDownloadApp(data.u);
			// }
			// }
			// }
			// });
			// }
			 
			},
			onDownloadApp(url) {
			// app 整包下载
			if (uni.getSystemInfoSync().platform == 'ios') {
			// ios
			plus.runtime.openURL(url);
			} else {
			// 安卓包
			uni.showLoading({
			title: '正在更新，大约需要1-5分钟'
			});
			let dTask = plus.downloader.createDownload(url, {}, function(d, status){
			// 下载完成
			if(status == 200){
			let path = d.filename;
			plus.runtime.install(path); // 安装下载的apk文件
			}else{
			uni.showModal({
			title: '提示',
			content: '更新失败',
			showCancel: false
			})
			}
			uni.hideLoading();
			});
			// 开始下载
			dTask.start();
			}
			},
		  },
		globalData: {
			userId: uni.getStorageSync('userid') ? uni.getStorageSync('userid') : null,
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
