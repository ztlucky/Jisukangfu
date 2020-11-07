/**
 * 网络请求
 * @param {Object} req
 */
const request = function(req) {
	//console.log("+++++++++++++++++++++++++");
	let accessToken = uni.getStorageSync("accessToken");
	let platform = getPlatform();
	let header = {
		'platform': platform,
		'token': accessToken,
		'Content-type': 'application/x-www-form-urlencoded'
	};
	if (req.header) {
		header = Object.assign(header, req.header);
	}
	uni.request({
		url: req.url,
		data: req.data || {},
		header: header,
		method: req.method || "GET",
		dataType: req.dataType || "json",
		success: function(res) {
			if (res.data.code == '1000') {
				login(); //登录
			} else if (res.data.code == '1003') {
				bindMobile(); //绑定手机号码
			} else {
				if (req.success) {
					console.log(res)
					req.success(res.data);
				}
			}
		},
		fail: function(res) {
			console.warn('--- request fail >>>');
			console.warn(res);
			console.warn('<<< request fail ---');
			uni.showToast({
				title: '网络异常~',
				icon: 'none'
			});
			if (req.fail) {
				req.fail(res);
			}
		},
		complete: function(res) {
			if (res.statusCode != 200) {
				if (res.code == '1000') {
					login();
				}
				console.log('--- request http error >>>');
				console.log(res.statusCode);
				console.log(res.data);
				console.log('<<< request http error ---');
			}
			if (req.complete) {
				req.complete(res);
			}
		}
	});
}
