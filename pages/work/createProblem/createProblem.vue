<template>
	<view class="view" @click="resetAll">
		<view class="content" @click="resetAll">
			<view class="title">问题标题</view>
			<silding @editTitle="editTitle" :isRun="false" ref="sildTitle" @reset="resetAll" :dataprops="title"></silding>
			<view class="title">评定量表选择题</view>
			<silding @editTitle="editTitle" @deleteItem="deleteItem" ref="sild" @reset="resetAll" v-for="(v,i) in checkbox" :key="i"
			 :dataprops="v" :index="i"></silding>
			<view class="addItem" @click="addItem">添加新的选项</view>
		</view>
		<view class="bottom" @click="setShowNext">保存</view>
		<view class="next" v-if="isShowNext">
			<view class="nextBack" @click="setShowNext"></view>
			<view class="nextContent">
				<view class="" @click="setShowNext()">继续添加题目</view>
				<view class="" @click="save()">结束{{edit == 2?'修改':''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sild from '../../../components/work/silding/silding.vue';
	import request from "../../../utils/util.js";
	export default {
		data() {
			return {
				isShowNext: false,
				title: {
					title: '',
					type: 'title',
					text: '',
					text1: '',
					imgList: []
				},
				checkbox: [

				],
				checkboxStr:''
			}
		},
		onLoad(data) {
			this.index = data.index;
			this.id = data.id;
			this.edit = data.edit?data.edit:1;
			this.addEvent();
			if(this.edit == 2){
				this.getInfo();
			}
		},
		onUnload() {
			this.chooseEvent();
		},
		methods: {
			getInfo(){
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.getQuestionInfo,
					type:"GET",
					data:{
						id:that.id
					}
				},true,true).then(data=>{
					that.checkbox = JSON.parse(data.content);
					that.title = {
						title:data.describes,
						type:'title',
						text:data.describes,
						text1:data.solution,
						imgList:JSON.parse(data.file)
						
					};
				})
			},
			addEvent() {
				uni.$on('addItem', (res) => {
					console.log(res);
					if(res.index == -1){
						this.title = res;
					}else{
						this.$set(this.checkbox, res.index, res);
					}
					
				})
			},
			chooseEvent() {
				uni.$off('addItem', () => {})
			},
			setShowNext() {
				if (this.isShowNext == false) {
					let d = this.validation();
					if (this.title.title == '') {
						uni.showToast({
							title: '请添加问题标题',
							duration: 1500,
							icon: 'none'
						});
						return false;
					} else if (!d.f) {
						uni.showToast({
							title: "请添加选项",
							duration: 1500,
							icon: "none"
						});
						return false;
					}
					this.checkboxStr = d.str;
				}
				this.isShowNext = !this.isShowNext;

			},
			upData(){
				let that = this;
				return request({
					type:'PUT',
					url:getApp().$api.pingdingliangbiao.editQuestionInfo,
					data:{
						content:that.checkboxStr,
						type:that.index,//0单选，1多选，2说明
						title:that.title.title,
						describes:that.title.title,
						existingProblem:that.title.text,
						solution:that.title.text1,
						file:JSON.stringify(that.title.imgList),
						id:that.id
					}
				}).then(data=>{
					uni.showToast({
						title:'修改成功',
						duration:1500,
						mask:true
					});
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
					console.log(data);
				})
			},
			save(){
				if(this.edit == 2){
					this.upData();
					return false;
				}
				let that = this;
				return request({
					type:'POST',
					url:getApp().$api.pingdingliangbiao.addQuestion,
					data:{
						content:that.checkboxStr,
						type:that.index,//0单选，1多选，2说明
						title:that.title.title,
						classifyId:that.id,
						describes:that.title.title,
						existingProblem:that.title.text,
						solution:that.title.text1,
						file:JSON.stringify(that.title.imgList)
					}
				}).then(data=>{
					uni.showToast({
						title:'添加成功',
						duration:1500,
						mask:true
					});
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
					console.log(data);
				})
			},
			getNowStatus(data) {

			},
			validation() {
				let f = false;
				let str = [];
				if (this.checkbox.length == 0) {

				} else {
					this.checkbox.map(v => {
						if (v.title) {
							str.push(v);
							f = true;
						}
					})
				}
				return {
					f,
					str: JSON.stringify(str)
				}
			},
			editTitle(data) {
				console.log("获取数据");
				if (data.index == -1) {
					this.title.title = data.value;
				} else {
					this.checkbox[data.index].title = data.value;
				}
				console.log(this.title, this.checkbox);
			},
			resetAll() {
				this.$refs.sildTitle.resetLeft();
				if (this.$refs.sild) {
					this.$refs.sild.map(v => {
						v.resetLeft();
					})
				}
				// this.$refs.sild.resetLeft();
			},
			addItem() {
				this.checkbox.push({
					title: '',
					index: this.checkbox.length,
					text: '',
					text1: '',
					imgList: []
				});
				console.log(this.checkbox);
			},
			deleteItem(index) {
				this.checkbox.splice(index, 1)
			}
		},
		components: {
			silding: sild
		}
	}
</script>

<style scoped>
	.view {
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-top: 52rpx;
		padding-bottom: 120rpx;
	}

	.content {
		width: 640rpx;
		padding: 0 30rpx;
		margin-left: 30rpx;
		/* margin-top: 32rpx; */
		background-color: #FFFFFF;
		padding-top: 24rpx;
		padding-bottom: 74rpx;
		overflow-x: hidden;
	}

	.title {
		padding-top: 16rpx;
		line-height: 44rpx;
		margin-bottom: 20rpx;
		color: #666666;
		font-size: 32rpx;
	}

	.addItem {
		width: 246rpx;
		height: 72rpx;
		border-radius: 8rpx;
		border: 2rpx solid #31D880;
		font-size: 28rpx;
		color: #31D880;
		text-align: center;
		line-height: 72rpx;
	}

	.bottom {
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		color: #FFFFFF;
		text-align: center;
		font-size: 28rpx;
		line-height: 80rpx;
	}

	.next {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.nextBack {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .2);
	}

	.nextContent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 590rpx;
		height: 402rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
	}

	.nextContent view {
		margin-left: 50%;
		transform: translateX(-50%);
	}

	.nextContent view:nth-child(1) {
		width: 362rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		margin-top: 98rpx;
		margin-bottom: 40rpx;
	}

	.nextContent view:nth-child(2) {
		width: 362rpx;
		height: 80rpx;
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		border: 2rpx solid #29D267;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #00D67B;
	}
</style>
