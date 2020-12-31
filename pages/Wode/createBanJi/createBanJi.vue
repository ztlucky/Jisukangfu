<template>
	<view class="viewPage">
		<view class="list border">
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">班级标题</view>
				</view>
				<view class="itemRight">
					<input class="input" placeholder="请输入班级标题" v-model="zhiboTitle"></input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<!-- <view class="item">
				<view class="itemLeft">
					<image src="/static/live/icon_banjizhuti.png"></image>
					<view class="hidden">班级主题</view>

				</view>
				<view class="itemRight">
					<picker @change="bindPickerChange" :value="index" :range="category" range-key="name">
						<view class="hidden">{{selectCategroy}}</view>
					</picker>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view> -->
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_fenlei.png"></image>
					<view class="hidden">选择分类</view>
					  
				</view>
				<view class="itemRight">
					<picker @change="bindPickerChange" :value="index" :range="category" range-key="name">
					                 <view class="hidden">{{selectCategroy}}</view> 
					                  </picker>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<!-- <view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_time.png"></image>
					<view class="hidden">开课时间</view>
				</view>
				<view class="itemRight" @click="showTimeChoose">
					<view class="hidden2">{{starttime}}</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_time.png"></image>
					<view class="hidden">结束时间</view>
				</view>
				<view class="itemRight" @click="showendTimeChoose">
					<view class="hidden2">{{endtime}}</view>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view> -->
		</view>
		<view class="onLoadCover border" @click="getCover">
			<image :src="cover.imageList.length!=0?cover.imageList[0]:'../../../static/zhibo/img_fengmian.png'" mode="aspectFill"></image>
			<view>上传封面</view>
		</view>
		<view class="course border">

			<view class="top">
				<textarea placeholder="请输入班级的文字内容（选填）…" @input="input"></textarea>
				<view class="topImageList">
					<view v-for="(v,k) in imageList" :key="k" :class="'imageItem '+((k)%3 == 1?'imageItem1':'imageItem')">
						<image mode="aspectFill" :src="v"></image>
						<image src="/static/icon_delete.png" class="delete" @click="deleteImage(k)"></image>
					</view>
					<image src="/static/zhibo/img_tupian.png" :class="'imageItem imageAdd '+((imageList.length)%3 == 1?'imageItem1':'imageItem')"
					 @click="getImages"></image>
				</view>
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/zhibo/icon_zhuchiren.png"></image>
					<view class="">选择老师</view>
				</view>
				<view class="selectedFile" @click="chooseHost">

					<view v-for="(item,index) in hostList" :key="index" class="hostview">
						<image :src="item.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"></image>
						<text>{{item.name}}</text>

					</view>
					<image src="/static/zhibo/img_tianjia.png"></image>

				</view>
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/live/icon_kecheng.png"></image>
					<view class="">选择课程</view>
				</view>
				<view class="selectedCourseList">
					<view class="selectedCourseItem" v-for="(item , index) in courseList" :key="index">
						<view class="courseItemTitle hidden">{{item.name}}</view>
						<image src="/static/live/icon_shanchu.png" @click="deleteItem(index,'course')"></image>
					</view>
					<view class="selectedCourseAdd" @click="toPage('/pages/Wode/selectCourse/selectCourse')">添加课程</view>
				</view>
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/live/icon_kecheng.png"></image>
					<view class="">选择直播</view>
				</view>
				<view class="selectedCourseList">
					<view class="selectedCourseItem" v-for="(item,index) in liveList" :key="index + 1200">
						<view class="courseItemTitle hidden">{{item.title}}</view>
						<image src="/static/live/icon_shanchu.png" @click="deleteItem(index,'live')"></image>
					</view>
					<view class="selectedCourseAdd" @click="toPage('/pages/Wode/selectLIve/selectLIve')">添加直播</view>
				</view>
			</view>
		</view>

		<view class="price border selectedItem lecture">
			<view v-for="(item,index) in lectureList" :key="index">
				<view class="selectedTitle notBorder" v-if="index == 0">
					<image src="/static/zhibo/icon_jine.png"></image>
					<view class="">线下讲座（选填）</view>
				</view>
				<view class="priceItem">
					<view class="priceItemLeft">时间</view>
					<view class="priceItemRight">
						<view class="" @click="setLectureTimeStatus(index)">{{item.date?item.date:'请选择时间'}}</view>
						<image src="../../../static/icon/me_lise_more.png"></image>
					</view>
				</view>
				<view class="priceItem">
					<view class="priceItemLeft">主持人</view>
					<view class="priceItemRight" @click="chooseHost(true,index)">
						<view>{{item.user.name?item.user.name:'请选择主持人'}}</view>
						<image src="../../../static/icon/me_lise_more.png"></image>
					</view>
				</view>
				<view class="priceItem">
					<view class="priceItemLeft">标题</view>
					<view class="priceItemRight">
						<input class="priceItemInput" placeholder="输入标题" v-model="item.title"> </input>
						<image src="../../../static/icon/me_lise_more.png"></image>
					</view>
				</view>
				<view class="priceItem">
					<view class="priceItemLeft">地址</view>
					<view class="priceItemRight">
						<input class="priceItemInput" placeholder="输入地址" v-model="item.address"> </input>
						<image src="../../../static/icon/me_lise_more.png"></image>
					</view>
				</view>
				<view class="selectedCourseAdd " @click="addLecture(index)">{{index == lectureList.length - 1?'添加讲座':'删除讲座'}}</view>
			</view>
		</view>

		<view class="price border selectedItem">
			<view class="selectedTitle notBorder">
				<image src="/static/zhibo/icon_jine.png"></image>
				<view class="">金额</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">价格</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入价格" v-model="cost"></input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">会员价格</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入会员价格" v-model="memberCost"> </input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">优惠券个数</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入优惠券个数" v-model="couponsNumber"></input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">优惠券价格</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入优惠券价格" v-model="couponsPrice"> </input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" style="margin-left: 0;border-bottom: 0;">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">邀请码人数</view>
				</view>
				<view class="itemRight">
					<input class="input" placeholder="请输入邀请码人数" v-model="code"></input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>

		<view class="list border">
			<view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">课程可见性</view>
				</view>
				<view class="itemRight">
					<view class="hidden2" v-if="isvisiable == 1"> 全部可见</view>
					<view class="hidden2" v-if="isvisiable !=1"> 部分可见</view>

					<switch color="#09BB07" style="transform:scale(0.7,0.7) ;" @change="switchChange" checked="true"></switch>

				</view>
			</view>
			<!-- <view class="item">
				<view class="itemLeft">
					<image src="../../../static/zhibo/icon_guankan.png"></image>
					<view class="hidden">如何查看</view>
				</view>
				<view class="itemRight">
					<picker @change="bindPickerChangeChakan" :value="chakanIndex" :range="chakanType">
						<view class="hidden2">{{chakanType[chakanIndex]}}</view>
					</picker>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view> -->
		</view>
		<view class="save" @click="creatLiveAction">创建班级</view>
		<l-file ref="lFile"></l-file>
		<choose ref="chooesFile" :image="isAddImage" :count="count" :video="isAddVideo" :pdf="isAddPDF"></choose>
		<w-picker :visible.sync="visibleTime" mode="shortTerm" startYear="2017" endYear="2030" :value="rangeVal" :current="true"
		 fields="day" :second="false" @confirm="confirmtime" @cancel="onCancel" ref="starttimeTerm"></w-picker>
		<w-picker :visible.sync="lectureTime" mode="shortTerm" startYear="2017" endYear="2030" :value="lectureList[nowIndex].date"
		 :current="true" fields="day" :second="false" @confirm="confirmLectureTime" ref="lectureTime"></w-picker>

		<w-picker :visible.sync="visble" mode="time" :current="false" :second="false" :disabledAfter="false" @confirm="confirmEndtime"
		 @cancel="onEndtimeCancel" ref="endtimeTerm"></w-picker>
	</view>
</template>

<script>
	import lFile from "@/components/l-file/l-file.vue"
	import choose from "@/components/chooes-file/chooes-file.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	import onloadImage from "../../../utils/loadImage.js"
	import request from '../../../utils/util.js'

	export default {
		data() {
			return {
				zhiboTitle: '',
				imageList: [],
				tempFile: [],
				rangeVal: '',
				value: '',
				visble: false,
				starttime: "",
				endtime: "",
				year: 0,
				month: 0,
				day: 0,
				hour: 0,
				minte: 0,
				endHour: 0,
				endMinute: 0,
				index: 0,
				selectCategroy: "分类",
				category: [],
				cost: "", //价格
				memberCost: "",
				isvisiable: 1, //是否全部可见
				ischeck: true, //默认全部可见
				chakanType: ["无限查看", "邀请码查看", "收费查看"],
				hostList: [], //主持人列表
				chakanIndex: 0,
				currentDay: "",
				visibleTime: false,
				isAddImage: true,
				isAddVideo: false,
				isAddPDF: false,
				count: 1,
				code: "",
				cover: {
					imageList: [],
					tempFile: []
				},
				material: {
					videoList: [],
					videoFile: [],
					pdfList: [],
					pdfFile: []
				},
				uploadImageUrls: [], //获取的最终的图片链接
				courseList: [],
				liveList: [],
				lectureList: [{
					date: '',
					user: {},
					title: '',
					address: ''
				}],
				nowIndex: 0, //当前的讲课
				lectureTime: false,
				couponsPrice:'',
				couponsNumber:''
			}
		},
		components: {
			lFile,
			choose
		},
		onShow() {
			this.getCourseAndLiveList();
			this.lectureList[this.nowIndex].user = uni.getStorageSync('lectureHost');
			console.log(this.lectureList[this.nowIndex].user)
		},
		onLoad() {
			this.addEvent();
			this.getCategory();
		},
		onUnload() {
			// uni.clearStorage();
			uni.removeStorageSync('lectureHost');
			uni.removeStorageSync('courseAndLiveList');
			uni.$off();
		},
		methods: {
			setLectureTimeStatus(index) {
				this.lectureTime = true;
				this.nowIndex = index;
			},
			confirmLectureTime(data) {
				this.lectureList[this.nowIndex].date = data.value;
				this.$set(this.lectureList, this.nowIndex, this.lectureList[this.nowIndex])
			},
			addLecture(index) {
				if (this.lectureList.length - 1 == index) {
					this.lectureList.push({
						date: '',
						user: {},
						title: '',
						address: ''
					})
				} else {
					this.lectureList.splice(index, 1);
				}
			},
			deleteItem(index, str) {
				if (str == 'course') {
					this.courseList.splice(index, 1);
				} else if (str == 'live') {
					this.liveList.splice(index, 1)
				}
			},
			getCourseAndLiveList() {
				let list = uni.getStorageSync('courseAndLiveList');
				if (list) {
					this.courseList = list.courseList;
					this.liveList = list.liveList;
				}
				console.log(list);
			},
			showTimeChoose() {
				this.visibleTime = !this.visibleTime
			},
			addCourse() {

			},
			showendTimeChoose() {
				if (this.starttime.length == 0) {
					uni.showToast({
						title: "请先选择开始时间",
						icon: 'none'
					})
				} else {
					this.visble = !this.visble

				}

			},
			confirmtime(e) {
				this.starttime = e.result
				var date = new Date(Date.parse(e.result.replace(/-/g, "/")));
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
				this.year = date.getFullYear();
				this.hour = date.getHours()
				this.minte = date.getMinutes()
			},
			onCancel() {

			},
			onEndtimeCancel() {

			},
			confirmEndtime(e) {
				this.endHour = e.result.substring(0, 2);
				this.endMinute = e.result.substring(3, 5);
				console.log(parseInt(this.endHour))
				if (parseInt(this.endHour) < parseInt(this.hour)) {
					this.endtime = "";
					uni.showToast({
						title: "结束时间必须大于开始时间",
						icon: 'none'
					})
				} else if (parseInt(this.endHour) == parseInt(this.hour)) {
					if (parseInt(this.endMinute) <= parseInt(this.minte)) {
						uni.showToast({
							title: "结束时间必须大于开始时间",
							icon: 'none'
						})
						this.endtime = "";


					} else {
						this.endtime = this.year + "-" + this.month + "-" + this.day + " " + e.result

					}
				} else {
					this.endtime = this.year + "-" + this.month + "-" + this.day + " " + e.result

				}
			},
			//获取分类
			getCategory() {
				var that = this;
				this.$app.request({
					url: this.$api.shouye.getcourseCategoryList,
					method: 'GET',
					dataType: 'json',
					success: res => {
						if (res.code == 200) {
							console.log("sss")

							console.log(res)
							that.category = res.result.records;
							console.log(that.category[0].name)

						} else {
							this.$alert(res.msg);
						}
					},
					complete: res => {}
				});
			},
			//选择主讲人
			chooseHost(f, index) {
				console.log(f, index);
				let testStr = [];
				if (f == true) {
					console.log('>>>>>>>>>>>>>')
					this.nowIndex = index;
					uni.setStorageSync('lectureHost', this.lectureList[this.nowIndex].user);
					testStr = encodeURIComponent(JSON.stringify(this.lectureList[this.nowIndex].user)); //JSON.stringify(数组)来把这个数组变成一个字符串
				} else {
					testStr = encodeURIComponent(JSON.stringify(this.hostList)); //JSON.stringify(数组)来把这个数组变成一个字符串
				}
				uni.navigateTo({
					url: '/pages/Zhibo/ChooseHost/ChooseHost?hostlist=' + testStr + `&isLecture=${f == true?1:2}`,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.selectCategroy = this.category[this.index].name
			},
			//可见按钮点击
			switchChange() {
				this.ischeck = !this.ischeck
				if (this.ischeck) {
					this.isvisiable = "全部可见"

				} else {
					this.isvisiable = "部分可见"
				}
			},
			bindPickerChangeChakan: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.chakanIndex = e.target.value
			},
			//可见按钮点击
			switchChange() {
				this.ischeck = !this.ischeck
				if (this.ischeck) {
					this.isvisiable = 1

				} else {
					this.isvisiable = 2
				}
			},
			addEvent() {
				let that = this;
				uni.$on("getImage", res => {
					switch (that.fileType) {
						case 'cover':
							that.cover.imageList = res.res.tempFilePaths;
							that.cover.tempFile = res.res.tempFiles;
							console.log(res.res);
							break;
					}
				})
				uni.$on("getVideo", res => {
					console.log(res);
					switch (that.fileType) {
						case 'material':
							that.material.videoList.push(res.res.tempFilePath);
							that.material.videoFile.push(res.res.tempFile);
							console.log(res.res, res.res)
							break;
					}
				})
				//选择主持人
				uni.$on("chooseHost", (options) => {
					that.hostList = JSON.parse(options.selectList)
				})

			},
			showChoose() {
				this.$refs.chooesFile.cancel(true);
			},
			getCover() {
				let that = this;
				console.log(that.cover.imageList)
				if(this.cover.imageList.length !=0){
					uni.showModal({
						title:"提示",
						content:'请选择你的操作',
						confirmText:'更换图片',
						cancelText:'查看原图',
						success(res) {
							if(res.confirm){
								that.isAddImage = true;
								that.isAddVideo = false;
								that.isAddPDF = false;
								that.count = 1;
								that.fileType = 'cover';
								that.showChoose();
							}else{
								console.log(that.cover.imageList)
								uni.previewImage({
									current:0,
									urls:that.cover.imageList
								})
							}
						}
					})
				}else{
					that.isAddImage = true;
					that.isAddVideo = false;
					that.isAddPDF = false;
					that.count = 1;
					that.fileType = 'cover';
					that.showChoose();
				}
				
				
			},
			getMaterial() {
				this.isAddImage = false;
				this.isAddVideo = true;
				this.isAddPDF = true;
				this.count = 9;
				this.fileType = 'material';
				this.showChoose();
			},
			getImages() {
				let that = this;
				uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						console.log(res);
						// 预览图片
						that.imageList = that.imageList.concat(res.tempFilePaths);
						that.tempFile = that.tempFile.concat(res.tempFiles)
					}
				});
			},
			deleteImage(index) {
				this.tempFile.splice(index, 1);
				this.imageList.splice(index, 1);
			},
			input(e) {
				this.value = e.detail.value
			},
			checklecture() {
				let list = this.lectureList;
				let notList = [];
				let confirmList = [];
				let notIndexList = []
				list.map((v, k) => {
					if (v.date != '' && v.user.name && v.title != '' && v.address != '') {
						confirmList.push(v);
					} else {
						notIndexList.push(k);
						notList.push(v);
					}
				})
				return {
					notList,
					notIndexList,
					confirmList
				};
			},
			//创建班级
			creatLiveAction() {
				let that = this;
				let lectureList = this.checklecture();
				if (this.zhiboTitle.length == 0) {
					uni.showToast({
						title: '请输入班级标题',
						icon: 'none'
					})
				} else if (this.selectCategroy == "分类") {
					uni.showToast({
						title: '请选择班级分类',
						icon: 'none'
					})
				} else if (this.cover.imageList.length == 0) {
					uni.showToast({
						title: '请设置该班级封面',
						icon: 'none'
					})
				} else if (this.hostList.length == 0) {
					uni.showToast({
						title: '请选择老师',
						icon: 'none'
					})
				} else if (this.cost.length == 0) {
					uni.showToast({
						title: '请输入班级价格',
						icon: 'none'
					})
				} else if (this.memberCost.length == 0) {
					uni.showToast({
						title: '请输入班级会员价格',
						icon: 'none'
					})
				} else if (this.code == '') {
					uni.showToast({
						title: '请输入邀请码人数',
						icon: 'none'
					})
				} else {
					let tempFiles = that.cover.tempFile;
					let tempFilePaths = that.cover.imageList;
					tempFiles = tempFiles.concat(that.tempFile)
					tempFilePaths = tempFilePaths.concat(that.imageList);
					onloadImage.init({
						tempFiles,
						tempFilePaths
					}, (res, str) => {
						let coverUrl = res.imageUrl[0];
						let file = [];
						if (that.imageList) {
							that.imageList.map((v, k) => {
								file.push({
									type: 'img',
									value: res.imageUrl[k + 1]
								})
							})
						}
						file = JSON.stringify(file);
						
						this.creatLive(coverUrl, file, JSON.stringify(lectureList.confirmList?lectureList.confirmList:[]));
					}).upload();
				}
			},
			async creatLive(coverUrl, file, classtAble) {
				let that = this;
				console.log(coverUrl, file);
				// await this.getHostList(); 
				let type = this.category[this.index].id
				var lecIds = "";
				for (var i = 0; i < this.hostList.length; i++) {
					let item = this.hostList[i]

					lecIds += item.id + ",";
				}
				let liveIds = [];
				let courseIds = [];
				if(this.courseList.length !=0){
					this.courseList.map(v=>{
						courseIds.push(v.id)
					});
					
				}
				if(this.liveList.length !=0){
					this.liveList.map(v=>{
						liveIds.push(v.id);
					});
					
				}
				courseIds = courseIds.join(',')
				liveIds = liveIds.join(',')
				console.log(classtAble);
				return request({
					url: getApp().$api.banji.creatbanjiList,
					type: 'POST',
					data: {
						cost: that.cost,
						memberCost: that.memberCost,
						cover: that.uploadImageUrls[0],
						expertIds: lecIds, //主持人
						title: that.zhiboTitle,
						userId: getApp().globalData.userId,
						presentation: that.value,
						type: type,
						createUserId: getApp().globalData.userId,
						isVisible: that.isvisiable,
						coverUrl,
						file,
						classTable:classtAble,
						invitationCodeCount:that.code,
						couponCount:that.couponsNumber?that.couponsNumber:0,
						coupon:that.couponsPrice?that.couponsPrice:0,
						liveIds,
						courseIds
					}
				},true,true).then(data=>{
					uni.navigateBack();
					console.log(data)
				}).catch(err=>{
					console.log(err);
				})
			},

			//上传图片
			uploadCover() {

				let that = this;

				onloadImage.init({
					tempFiles: that.cover.tempFile.concat(that.tempFile),
					tempFilePaths: that.cover.imageList.concat(that.imageList)
				}, (data, str) => {
					console.log(data.imageUrl, str);

				}).upload();
			},
			selectedFilePDF() {
				console.log("1111")
				this.showChoose();
			},
			toPage(url) {
				let list = {
					courseList: this.courseList,
					liveList: this.liveList
				}
				uni.setStorageSync("courseAndLiveList", list);
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			}


		}
	}
</script>

<style scoped>
	.viewPage {
		width: 750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding-bottom: 174rpx;
	}

	.border {
		margin-top: 30rpx;
	}

	.list {
		width: 750rpx;
		background-color: #FFFFFF;
	}

	.item {
		width: 720rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		border-bottom: 4rpx solid #F0F0F0;
	}

	.list .item:last-child {
		border: none
	}

	.item .itemLeft {
		display: flex;
		align-items: center;
	}

	.itemLeft image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}

	.item .itemLeft view {
		width: 160rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28rpx;
	}

	.itemRight {
		display: flex;
		align-items: center;

	}

	.input {
		width: 400rpx;
		text-align: right;
		font-size: 26rpx;
		/* margin-right: 40rpx; */
		text-align: right;
	}

	.itemRight view {
		width: 300rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
		text-align: right;
	}

	.itemRight image {
		width: 16rpx;
		height: 30rpx;
		margin-right: 30rpx;
		margin-left: 24rpx;
	}

	.onLoadCover {
		width: 750rpx;
		height: 186rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
	}

	.onLoadCover image {
		width: 126rpx;
		height: 126rpx;
		padding-left: 30rpx;
		padding-right: 22rpx;
	}

	.top {
		width: 690rpx;
		padding: 34rpx 30rpx;
		background-color: #FFFFFF;
		padding-bottom: 4rpx;
	}

	.topImageList {

		display: flex;
		flex-wrap: wrap;
	}

	.top textarea {
		height: 100rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
	}

	.imageItem {
		position: relative;
		width: 184rpx;
		height: 184rpx;
		margin-bottom: 30rpx;
	}

	.imageItem1 {
		margin: 30rpx;
		margin-top: 0rpx;
	}

	.imageItem image:nth-child(1) {
		position: absolute;
		top: 0;
		left: 0;
		width: 184rpx;
		height: 184rpx;
	}

	.imageAdd {
		/* background-color: red; */

		background: #F5F5F5;
		border-radius: 8rpx;
		border: 2rpx dashed #DEDEDE;
	}

	.imageAdd image:nth-child(1) {
		width: 50rpx;
		height: 50rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.imageItem .delete {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		top: 8rpx;
		right: 8rpx;
		/* background-color: #007AFF; */
		border-radius: 50%;
	}

	.textView {
		width: 690rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding-bottom: 30rpx;
	}

	.title {
		color: #999999;
		font-size: 28rpx;
		padding-top: 24rpx;
	}

	.textView input {
		font-size: 28rpx;
		color: #333333;
		line-height: 60rpx;
		height: 60rpx;
		/* padding: 0 20rpx; */
	}

	.textView view:nth-child(3) {
		padding-top: 38rpx;
		border-top: 2rpx solid #E5E5E5;
	}

	.textView textarea {
		height: 80rpx;
		font-size: 28rpx;
		width: 100%;
		border-bottom: 2rpx solid #E5E5E5;
	}

	.selectedItem {
		width: 720rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
	}

	.selectedTitle {
		border-top: 2rpx solid #F0F0F0;
		display: flex;
		height: 98rpx;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.selectedTitle image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}

	.selectedFile {
		display: flex;
		padding-bottom: 34rpx;
	}

	.hostview {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 10rpx;
	}

	.hostview image {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;


	}

	.hostview text {
		font-size: 20rpx;
		margin-top: 10rpx;
		color: #000000;

	}

	.selectedFile image {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
	}

	.notBorder {
		border: none;
	}

	.priceItem {
		width: 690rpx;
		padding-right: 30rpx;
		display: flex;
		height: 54rpx;
		justify-content: space-between;
		align-items: center;
	}

	.priceItemLeft {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
	}

	.priceItemRight {
		display: flex;
		align-items: center;
	}

	.priceItemInput {
		text-align: right;
		font-size: 24rpx;
		margin-right: 30rpx;
	}

	.priceItemRight view {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34px;
		margin-right: 26rpx;
	}

	.priceItemRight image {
		width: 16rpx;
		height: 30rpx;
	}

	.save {
		position: fixed;
		bottom: 38rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;

		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}

	.border_ {
		border-bottom: 2rpx solid #F0F0F0;
	}

	.selectedCourseList {
		padding-bottom: 40rpx;
	}

	.selectedCourseItem {
		width: 690rpx;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.selectedCourseItem image {
		width: 30rpx;
		height: 30rpx;
	}

	.selectedCourseItem view {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.selectedCourseAdd {
		width: 134rpx;
		height: 42rpx;
		border-radius: 8rpx;
		border: 2rpx solid #DDDDDD;
		margin-top: 16rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		text-align: center;
		line-height: 42rpx;
	}

	.lecture {
		padding-bottom: 40rpx;
	}
</style>
