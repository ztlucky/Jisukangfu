import axios from 'axios';
import request from './util.js'
import config from '../config/api.js';
class loadImage {
	init(data, fn = () => {}) {
		console.log(data);
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
		if (this.imageList.length == this.nowCount) {
			this.fn(this);
		} else {
			if (this.imageList[this.nowCount].type && this.imageList[this.nowCount + 1].type == 'video') {
				this.uploadVideo(this.imageList[this.nowCount]);
			} else {
				this.uploadImage(this.imageList[this.nowCount]);
			}
		}
	}
	uploadImage() {
		let that = this;
		let file_type = '.' + (this.imagePathList[this.nowCount].split(".")[this.imagePathList[this.nowCount].split(".").length -1]);
			console.log()
		return request({
			url: config.oss.getPictureUrl,
			type: "GET",
			data: {
				file_type,
				author: that.author
			}
		}, false).then(data => {
			that.getFile(data.result);
		})
	}
	getFile(obj) {
		let file = this.imageList[this.nowCount]; //注意：直接上传file文件，不要用FormData对象的形式传
		let that = this;
		let config = {
			headers: {
				'Content-Type':'application/octet-stream',
				"x-oss-meta-author":that.author
			}
		};
		axios.put(obj.add_url, file, config)
			.then(res => {
				if (res.status == 200) {
					that.imageUrl.push(obj.get_url);
					that.nowCount++;
					that.upload();
				}
			}).catch(
				err => {
					console.log(err.response)
					console.log(err)
				}
			)
	}

}

module.exports = new loadImage()
