<script>
	import {
		mapMutations
	} from 'vuex';
	import request from "./utils/util.js"
	export default {
		onLaunch: function() {
			
			// #ifdef APP-PLUS
			this.getShareData();
			this.getClientInfo();

			const _self = this;
			const _handlePush = function(message) {
				/**
				 * 通过 vuex 来同步页面的数据，仅做演示。
				 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。
				 */
				_self.updatePushMessage(message);
			};
			// var ispush = false;
			// plus.push.addEventListener('click', function(message) {
			// 	//plus.nativeUI.toast('push click');
			// 	_handlePush(message);
			// 	if (message.title == "UA54963") {
			// 		//检查更新
			// 		ispush = true;
			// 		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			// 			_self.onUpdate(uni.getSystemInfoSync().platform, widgetInfo)
			// 		});
			// 	}

			// });
			// plus.push.addEventListener('receive', function(message) {
			// 	plus.nativeUI.toast('push receive');
			// 	_handlePush(message);
			// });
			// //没有点击推送，接口请求检测版本更新
			// if (ispush == false) {
			// 	console.log(ispush)
			// 	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {

			// 		_self.onUpdate(uni.getSystemInfoSync().platform, widgetInfo)
			// 	});
			// }


			// #endif
		},
		onShow: function() {
			console.log('App Show');

		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['updatePushMessage']),
			checkUpdate(downloadUrl, tipmessage) {
				var that = this
				uni.showModal({
					title: "提示",
					showCancel: false,
					content: tipmessage,
					confirmText: '更新',
					success: function(result) {
						// 更新
						if (result.confirm) {

							that.onDownloadApp(downloadUrl);

						}
					}
				});
			},
			getShareData: function() {
				if (!uni.getStorageSync('userid')) {
					return false;
				}
				let userId = uni.getStorageSync('userid');
				// var args1 ='jisukangfu://pages/Daxue/Zhibodetail/Zhibodetail?id=20&rebateType=ZB78965&couponCode=0&invitationCode=762812';
				let args1 =  plus.runtime.arguments;
				let info = this.getUrlQuery(args1);
				info.rebatetype = info.rebatetype == 'zb78965'?'ZB78965':info.rebatetype == 'bj   36987'?'BJ36987':'KC14789';
				if(info.rebatecode && info.rebatecode.length >=10){
					request({
						url:getApp().$api.share.addRebateBind,
						type:"POST",
						data:{
							rebateCode:info.rebatecode,
							userId
						}
					})
				}
				if (info.couponcode == '0' && (!info.invitationcode || info.invitationcode.length <= 3)) {
					this.toPage(info.rebatetype,info.id);
				} else if (info.couponcode != '0' && (info.invitationcode && info.invitationcode.length >= 3)) {
					this.addTicket(info.id, info.rebatetype, 2, info.couponcode).then(data => {
						this.addTicket(info.id, info.rebatetype, 1, info.invitationcode).then(() => {
							this.toPage(info.rebatetype,info.id);
						});
					})
				} else if (info.couponcode != '0' && (!info.invitationcode || info.invitationcode.length <= 3)) {
					this.addTicket(info.id, info.rebatetype, 2, info.couponcode).then(data => {
						this.toPage(info.rebatetype,info.id);
					})
				} else if (info.couponcode == '0' && (info.invitationcode && info.invitationcode.length >= 3)) {
					this.addTicket(info.id, info.rebatetype, 1, info.invitationcode).then(() => {
						this.toPage(info.rebatetype,info.id);
					});
				}
			},
			addTicket(goodsId, goodsSku, type, value) {
				return request({
					url:getApp().$api.share.addTicket,
					type:'POST',
					data:{
						goodsId,
						goodsSku,
						type,
						value
					}
				})
			},
			toPage(rebatetype, id) {
				switch (rebatetype) {
					case "ZB78965":
						uni.navigateTo({
							url: "/pages/Daxue/Zhibodetail/Zhibodetail?id=" + id,
							animationDuration: 300,
							animationType: 'slide-in-right'
						})
						break;
					case "BJ36987":
						uni.navigateTo({
							url: "/pages/Wode/banJiDesc/banJiDesc?id=" + id,
							animationDuration: 300,
							animationType: 'slide-in-right'
						})
						break;
					case "KC14789":
						uni.navigateTo({
							url: "/pages/Daxue/KechengDetail/KechengDetail?id=" + id,
							animationDuration: 300,
							animationType: 'slide-in-right'
						})
						break;
				}
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
						order: "desc"
					},
					dataType: 'json',
					success: res => {
						if (res.code == 200) {
							let item = res.result.records[0]
							if (widgetInfo.versionCode != item.versionNumber) {
								that.checkUpdate(item.downloadUrl, item.remark)

							}

						} else {}
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
					let dTask = plus.downloader.createDownload(url, {}, function(d, status) {
						// 下载完成
						if (status == 200) {
							let path = d.filename;
							plus.runtime.install(path); // 安装下载的apk文件
						} else {
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
			getClientInfo() {
				let clientInfo = plus.push.getClientInfo();
				if (clientInfo && clientInfo.clientid) {
					uni.setStorageSync('clientInfo', clientInfo);
				} else {
					setTimeout(() => {
						this.getClientInfo();
					}, 500)
				}
				console.log(clientInfo);
			},
			getUrlQuery: function(url) {
				// 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
				let queryString = url.split('?')[1];
				// str = queryString;
				// 用来存储我们所有的参数
				let obj = {};
				// 如果没有传参，返回一个空对象
				if (!queryString) {
					return obj;
				}
				// stuff after # is not part of query string, so get rid of it
				queryString = queryString.split('#')[0];
				// 将参数分成数组
				let arr = queryString.split('&');
				for (let i = 0; i < arr.length; i++) {
					// 分离成key:value的形式
					let a = arr[i].split('=');
					// 将undefined标记为true
					let paramName = a[0];
					let paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
					// 如果调用对象时要求大小写区分，可删除这两行代码
					paramName = paramName.toLowerCase();
					if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
					// 如果paramName以方括号结束, e.g. colors[] or colors[2]
					if (paramName.match(/\[(\d+)?\]$/)) {
						// 如果paramName不存在，则创建key
						let key = paramName.replace(/\[(\d+)?\]/, '');
						if (!obj[key]) obj[key] = [];
						// 如果是索引数组 e.g. colors[2]
						if (paramName.match(/\[\d+\]$/)) {
							// 获取索引值并在对应的位置添加值
							let index = /\[(\d+)\]/.exec(paramName)[1];
							obj[key][index] = paramValue;
						} else {
							// 如果是其它的类型，也放到数组中
							obj[key].push(paramValue);
						}
					} else {
						// 处理字符串类型
						if (!obj[paramName]) {
							// 如果如果paramName不存在，则创建对象的属性
							obj[paramName] = paramValue;
						} else if (obj[paramName] && typeof obj[paramName] === 'string') {
							// 如果属性存在，并且是个字符串，那么就转换为数组
							obj[paramName] = [obj[paramName]];
							obj[paramName].push(paramValue);
						} else {
							// 如果是其它的类型，还是往数组里丢
							obj[paramName].push(paramValue);
						}
					}
				}
				return obj;
			}
		},
		globalData: {
			userId: uni.getStorageSync('userid') ? uni.getStorageSync('userid') : null,
			userName: uni.getStorageSync('name') ? uni.getStorageSync('name') : '用户' + uni.getStorageSync('userid') ? uni.getStorageSync(
				'userid') : null,
			livesku: "ZB78965", //zhibo
			classsku: "BJ36987",
			course: 'KC14789',
			member: 'HY32522',
			reword: 'DS12546',
			clientid: ''

		}
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
