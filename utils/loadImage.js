import axios from 'axios';
import request from './util.js'
import config from '../config/api.js';
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
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
	constructor() {
	    
	}
	init(data, fn = () => {}) {
		this.imageList = data.tempFiles;
		this.imagePathList = data.tempFilePaths;
		this.author = data.author ? data.author : 'labi'
		this.count = data.tempFiles.length;
		this.imageUrl = []
		this.nowCount = 0
		this.fn = fn;
		this.url = data.url?data.url:getApp().$api.oss.onLoadFile;
		console.log(this)
		return this;
	}

	upload() {
		this.checkFileSize().then(()=>{
			uni.showLoading({
			title: `文件上传中（${this.nowCount}/${this.imageList.length}）`,
			mask: true
		})
		console.log(this.imageList.length == this.nowCount)
		if (this.imageList.length == this.nowCount) {
			let file = [];
			this.imageList.map((v, k) => {
				file.push({
					type: v.type ? v.type : 'img',
					url: this.imageUrl[k]
				})
			})
			uni.hideLoading();
			console.log(file);
			this.fn(this, JSON.stringify(file));
		} else {
			console.log('继续',this.imageList[this.nowCount].type)
			if (this.imageList[this.nowCount].type && this.imageList[this.nowCount].type == 'video') {
				if (this.imagePathList[this.nowCount].value.substring(0, 5) == 'https') {
					this.imageUrl.push(this.imagePathList[this.nowCount].value);
					this.nowCount++;
					this.upload();
					return false;
				}
				this.uploadVideo();
			} else {
				if (this.imagePathList[this.nowCount].substring(0, 5) == 'https') {
					this.imageUrl.push(this.imagePathList[this.nowCount]);
					this.nowCount++;
					this.upload();
					return false;
				}
				this.uploadImage();
			}
		}
		});
		
	}
	checkFileSize(){
		//查看文件大小
		let size = 0;
		this.imageList.map((v,i)=>{
			size+=v.value?Number.parseInt(v.value.size):Number.parseFloat(v.size)
		});
		console.log(size);
		size = (size/1024).toFixed(2);
		console.log(size);
		console.log(getApp().globalData.userId)
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
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
		this.getFile();
	}
	uploadVideo(){
		this.getFile(getApp().$api.oss.onLoadVideo)
	}
	
	getFile(url) {
		
		let file = this.imageList[this.nowCount].value ? this.imageList[this.nowCount].value : this.imageList[this.nowCount];
		let filePath = this.imagePathList[this.nowCount];
		let fileName = '';
		fileName = filePath.split('/')[filePath.split('/').length-1]
		let that = this;
		let config = {
			header: {
				'Content-Type': 'multipart/form-data'
			}
		};
		this.sendFile(filePath,url);
	}
	// 发送文件方法
	sendFile(path,url_) {
		let that = this;
	    //filePath是文件的本地路径，调用plus.io.convertAbsoluteFileSystem方法可以将平台绝对路径转换成本地URL路径
	    const filePath = plus.io.convertAbsoluteFileSystem(path)
	    // 这是后端服务器的文件上传地址
	    const url = url_?url_:getApp().$api.oss.onLoadFile
	    // 这是创建上传任务时所需要到的配置参数
	    const uploadOptions = {
	        // 分块上传的大小单位kb，Android平台需设置分块上传才能准确触发statechanged返回上传进度，ios自动忽略
	        chunkSize: 100,
	        method: 'POST'
	    }
	    // 创建上传任务
	    this.uploadTask = plus.uploader.createUpload(url,uploadOptions,(data)=>{
			console.log(data);
			let res = (data.responseText)
			if(res){
				res = JSON.parse(res);
				that.imageUrl.push(res.result[0].get_url?res.result[0].get_url:res.result[0].v_id);
				that.nowCount++;
				that.upload();
			}
			
		})
	    // 往上传任务里添加文件，第二个参数的字段有默认值，可以传空对象{}即可，但是不能不传
	    this.uploadTask.addFile(filePath, {key:"file"})
	    // 这里可以将添加文件的返回值打印出来，true表示添加文件成功，false表示添加失败
	    // console.log('添加文件', this.uploadTask.addFile(filePath, {}))
	    // 往接口里添加其他额外的请求参数,第一个参数是key，第二个参数是value
	    // 这里可以将添加额外请求参数的返回值打印出来，true表示添加成功，false表示添加失败
		this.uploadTask.addData('user_id', `${getApp().globalData.userId}`)
		//this.uploadTask.addData('user_id', getApp().globalData.userId)  错误的  addData的value 要是String类型
	    // this.uploadTask.addData('string_key2', 'string_value2')
	    // 设置请求头信息,根据后端接口的要求设置
	    this.uploadTask.setRequestHeader('Content-Type', 'multipart/form-data')
	 
	    // 注意：上面addFile、addData中但凡有一个返回false，都不能上传成功。请检查是否设置错了
		console.log(this.uploadTask);
	    // 添加事件监听器用于监听实时进度和完成情况，第一个参数为“statechanged”，第二个参数是回调方法
	    this.uploadTask.addEventListener( "statechanged", (upload, status) =>{
	        switch (upload.state) {
	                case 1: // 上传任务开始请求
	                    break
	                case 2: // 上传任务请求已经建立
	                    break
	                case 3: // 上传任务提交数据,监听 statechanged 事件时可多次触发此状态。（重点）
	                    // uploadedSize表示当前已经上传了的数据大小，totalSize表示文件总大小，单位是字节b
	                    console.log('上传进度',parseInt(100 * upload.uploadedSize/upload.totalSize) )
	                    break
	                case 4: // 上传任务已完成, 无论成功或失败都会执行到 4 这里
	                    if (status === 200) {
	                        // 上传成功
							console.log(upload,status)
	                    } else {
	                        // 上传失败
	                    }
	        }
	    })
		this.uploadTask.onCompleted(data=>{
			console.log(data)
		})
	    // 开始执行上传任务
	    this.uploadTask.start()
	}

}

module.exports = new loadImage()
