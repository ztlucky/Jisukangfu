import axios from 'axios';
import request from './util.js'
import config from '../config/api.js';
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log(response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}
class loadImage {
	init(data, fn = () => {}) {
		this.imageList = data.tempFiles;
		this.imagePathList = data.tempFilePaths;
		this.author = data.author ? data.author : 'labi'
		this.count = data.tempFiles.length;
		this.imageUrl = []
		this.nowCount = 0
		this.fn = fn;
		return this;
	}

	upload() {
		// this.checkFileSize().then(()=>{
			uni.showLoading({
			title: `文件上传中（${this.nowCount}/${this.imageList.length}）`,
			mask: true
		})
		if (this.imageList.length == this.nowCount) {
			let file = [];
			this.imageList.map((v, k) => {
				file.push({
					type: v.type ? v.type : 'img',
					url: this.imageUrl[k]
				})
			})
			this.fn(this, JSON.stringify(file));
			uni.hideLoading();
		} else {
			if (this.imageList[this.nowCount].type && this.imageList[this.nowCount].type == 'video') {
				this.uploadVideo(this.imageList[this.nowCount].value);
			} else {
				if (this.imagePathList[this.nowCount].substring(0, 5) == 'https') {
					this.imageUrl.push(this.imagePathList[this.nowCount]);
					this.nowCount++;
					this.upload();
					return false;
				}
				this.uploadImage(this.imageList[this.nowCount]);
			}
		}
		// });
		
	}
	checkFileSize(){
		//查看文件大小
		let size = '';
		this.imageList.map((v,i)=>{
			size+=v.value?v.value.size:v.size
		});
		size = (size/1024).toFixed(2)
		return request({
			url:getApp().$api.user.getNowMemory,
			type:"GET",
			data:{
				user_id:getApp().globalData.userId,
				condition:false,
				size
			}
		},false)
	}
	buf2hex(buffer) { // buffer is an ArrayBuffer
		return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
	}
	uploadImage() {
		let that = this;
		// let file_type = '.' + (this.imagePathList[this.nowCount].split(".")[this.imagePathList[this.nowCount].split(".").length -1]);
		//app图片选择异常
		let file_type = '.png'
		return request({
			url: config.oss.getPictureUrl,
			type: "GET",
			data: {
				file_type,
				author: that.author
			}
		}, false).then(data => {
			console.log('获取上传连接成功')
			that.getFile(data.result);
		}).catch(err => {
			console.log(err);
			console.log(err.response)
		})
	}
	getFile(obj) {
		// console.log(obj)
		
		let file = this.imageList[this.nowCount].value ? this.imageList[this.nowCount].value : this.imageList[this.nowCount];
		let filePath = this.imagePathList[this.nowCount]; //注意：直接上传file文件，不要用FormData对象的形式传
		let fileName = '';
		fileName = filePath.split('/')[filePath.split('/').length-1]
		let that = this;
		let config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		console.log(file);
		console.log(filePath);
		console.log(getApp().globalData.userId);
		uni.uploadFile({
			url:getApp().$api.oss.onLoadFile,
			file,
			filePath,
			name:'file',
			formData:{
				user_id:getApp().globalData.userId?getApp().globalData.userId:1
			},
			success:function(res){
				console.log(res);
				if (res.statusCode == 200) {
					res.data = JSON.parse(res.data)
					
					that.imageUrl.push(res.data.result[0].get_url);
					that.nowCount++;
					that.upload();
				}
			},
			complete:function(res){
				console.log(res);
			}
		})
		//h5可以使用
		// let reader = new FileReader();
		// reader.readAsArrayBuffer(file);
		// reader.onload = function(e) {
		// 	let buffer = e.target.result //此时是arraybuffer类型
		// 	// let hex = that.buf2hex(buffer);
		// 	console.log(buffer);
		// 	axios.put(obj.add_url, buffer, config)
		// 		.then(res => {
		// 			console.log(res);
		// 			if (res.status == 200) {
		// 				that.imageUrl.push(obj.get_url);
		// 				that.nowCount++;
		// 				that.upload();
		// 			}
		// 		}).catch(
		// 			err => {
		// 				console.log(err.response)
		// 				console.log(err)
		// 			}
		// 		)
		// }
	}

}

module.exports = new loadImage()
