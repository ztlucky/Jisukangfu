

function request(options = {},isShowLoading = true,isBackData = false) {
	if(isShowLoading){
		uni.showLoading({
		    title: '加载中...',
			mask:true
		});
	}
	options = filterUrl(options);
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
					rejected(err);
				},
				complete(data) {
					if(isShowLoading){
						uni.hideLoading();
					}
				}
			});
		})
		
		
	}
	function filterUrl(config){
		switch(config.type){
			case 'GET':
				if(!config.data.userId){
					config.data.userId  = getApp().globalData.userId
				}
			break;
			case 'POST':
				if(!config.data.userId){
					config.data.userId  = getApp().globalData.userId
				}
			break;
		}
		return config;
	}
export default request;
