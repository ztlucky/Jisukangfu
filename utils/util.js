

function request(options = {},isShowLoading = true,isBackData = false) {
	if(isShowLoading){
		uni.showLoading({
		    title: '加载中...',
			mask:true
		});
	}
	return new Promise((resolved, rejected) => {
			uni.request({
				url: options.url,
				data: options.data,
				method: options.type,
				success: (res) => {
					if(res.data.code !== 200){
						uni.showToast({
							title:res.data.message,
							duration:1500,
							icon:'none'
						})
						rejected(res.data)
					}else{
						if(isBackData){
							resolved(res.data.result);
						}else{
							resolved(res.data);
						}
						
					}
					
				},
				fail:(err) => {
					rejected(err)
				},
				complete() {
					uni.hideLoading()
				}
			});
		})
	}
export default request;
