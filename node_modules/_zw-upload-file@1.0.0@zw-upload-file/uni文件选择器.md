# 文件选择器
### 文件选择器
组件名：zw-upload-file。
#### 使用方式
> 在==script==中引用

```
import zwUploadFile from '@/components/zw-upload-file/zw-upload-file.vue'
import tkiFileManager from '@/components/tki-file-manager/tki-file-manager.vue';
export default {
    components: {zwUploadFile,tkiFileManager}
}
```
> 用法

```
<zw-upload-file title="附件(工作票)" :ip="http://10.86.1.110:8080/upload/" :step="1" :dataPaths="dataPaths"></zw-upload-file>
<tki-file-manager ref="fileSelect" @result="dataPath"></tki-file-manager>
```
> zw-upload-file 属性说明

|属性名 | 类型 | 默认值 | 说明|
| :---------: | :-----------: |:---:|---|
| title | String | 文档(选填,总大小10M以下) | 标题 |
| ip | String | - | 图片上传的地址(不包括文件名) |
| step | Number | 1 | step为1选择文件后文件名后为==×==按钮;为2文件名后为==↓==按钮 |
| dataPaths | Array | - | 存放文件路径数组 |
| @removePro="removePro($event)" | function | - | 点击删除单个文件,removePro(msg) {this.dataPaths = msg;} |
| @bingUpFile="bingUpFile" | function | - | 见下 |

> tki-file-manager 属性说明

|属性名 | 类型 | 默认值 | 说明|
| :---------: | :-----------: |:---:|---|
| @result="dataPath" | function | - | 赋值,dataPath(e){this.dataPaths.push(e)} |



> Tips
- @bingUpFile 函数体

```
bingUpFile() {
	if (uni.getSystemInfoSync().platform === 'android') {
		uni.showActionSheet({
			itemList: this.listEvents,
			success: res => {
				let ind = res.tapIndex;
				if (ind == 0) {
					//常用文件
					uni.navigateTo({
						url: '../uploadFile/fileList/fileList?path=' + this.path,(this.path为当前页面路径,fileList页面路径根据自己所放位置调整)
					});
				} else if (ind == 1) {
					//本地存储
					console.log(this.$refs.fileSelect)
					this.$refs.fileSelect._openFile();
				}
			}
		});
	} else {
		uni.showModal({
			title: '提示',
			content: '暂不支持除Android外系统上传本地文件',
			showCancel: false,
			confirmText: '确定'
		});
	}
}
```
