<template>
	<view class="viewPage">
		<nav-bar bgColor="#FFFFFF" fontColor="#333333" title="个人信息">
			<image slot="right" class="rightImage" @click="toPage_('/pages/Wode/customerInfo/customerInfo?type=1')" src="/static/tips.png"></image>
		</nav-bar>
		<view class="list">
			<view class="item" @click="toPage('/pages/Wode/WorkUnits/WorkUnits')">
				<view class="itemTitle">工作单位</view>
				<view class="itemRight">
					<view class="itemRightText hidden"></view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('school')">
				<view class="itemTitle">毕业院校</view>
				<view class="itemRight">
					<view class="itemRightText hidden">{{school}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">学历</view>
				<view class="itemRight">
					<view class="itemRightText">
						<yealuo @getBackVal="getBackVal"  :value="xueLi.value"
						the-style="font-size: 46upx;" :isShowIcon="false" backColor="#FFFFFF" :selectIco="false"
						 overflow="hide" :isSetUrl="true" 
						 placeholder="请选择" width="400" :binData="binData" 
						 :isShowAllBack="false" padding="0rpx"
						 textAlign="right"></yealuo>
					</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('idNo')">
				<view class="itemTitle">身份证</view>
				<view class="itemRight">
					<view class="itemRightText">{{idNo}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('positionItem')">
				<view class="itemTitle">职称</view>
				<view class="itemRight">
					<view class="itemRightText">{{positionItem}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="showSelectView_">
				<view class="itemTitle">认证类型</view>
				<view class="itemRight">
					<view :class="positionItem_ && positionItem_.id?'itemRightText':'itemRightText itemRightText1'  "
					>{{positionItem_ && positionItem_.id?positionItem_.value:'请选择您的认证类型'}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('/pages/Wode/uploadCertificate/uploadCertificate')">
				<view class="itemTitle">资质证书</view>
				<view class="itemRight">
					<view class="itemRightText hidden">{{qualificationFile?qualificationFile.name:''}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('/pages/Wode/uploadCertificate/uploadCertificate')">
				<view class="itemTitle">工作证书</view>
				<view class="itemRight">
					<view class="itemRightText hidden">{{workFile?workFile.name:''}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('/pages/Search/choose/choose')">
				<view class="itemTitle">擅长领域</view>
				<view class="itemRight">
					<view class="itemRightText itemRightText_not" v-if="selectedList.length ==0">请选择</view>
					<view class="itemRightText itemRightText_" v-else>
						<text v-for="(v,k) in selectedList">{{v.name}} {{k< selectedList.length-1?'、':''}}</text>
						<text v-if="selectedList.length == 0">{{info.forte}}</text>
					</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('remark')">
				<view class="itemTitle">备注</view>
				<view class="itemRight">
					<view class="itemRightText hidden">{{remark}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="save" v-if="info && info.result == 0">审核中</view>
		<view class="save" v-else @click="save_tips()">{{info && info.result && info.result == 0?'未审核':info &&info.result == 1?'审核成功':info &&info.result == 2?'审核失败':'提交审核	'}}</view>
		<w-picker mode="selector" :visible.sync="visible" value="住院医师" default-type="name" :default-props="defaultProps"
		 :options="position" @confirm="onConfirm($event,'selector')" ref="selector"></w-picker>
		<w-picker mode="selector" :visible.sync="visible_" value="直播" default-type="name" :default-props="defaultProps"
		 :options="typeList" @confirm="onConfirm_($event,'selector')" ref="selector"></w-picker>
	</view>
</template>

<script>
	import yealuo from "@/components/yealuo-select/yealuo-select.vue"
	import request from "../../../utils/util.js";
	import choose from "../../../utils/androidChooseFile.js";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import onloadImage from "../../../utils/loadImage.js"
	export default {
		components: {
			yealuo,
			wPicker
		},
		data() {
			return {
				defaultProps: {
					"label": "value",
					"value": "id"
				},
				visible: false,
				visible_: false,
				idNo: '',
				school: '',
				remark: '',
				work: '',
				binData: [{
					id: 1,
					value: '初中'
				}, {
					id: 2,
					value: '高中'
				}, {
					id: 3,
					value: '大专'
				}, {
					id: 4,
					value: '本科'
				}, {
					id: 5,
					value: '研究生'
				}, {
					id: 6,
					value: '博士研究生'
				}, {
					id: 0,
					value: '其他'
				}],
				position: [{
					id: 1,
					value: '住院医师'
				}, {
					id: 2,
					value: '主治医师'
				}, {
					id: 3,
					value: '副主任医师'
				}, {
					id: 4,
					value: '主任医师'
				}],
				positionItem: '',
				xueLi: {},
				info: {},
				shanChangLingYu: null,
				binData1: [],
				qualificationFile: null,
				workFile: null,
				positionItem_: {},
				selectedList:[],
				typeList: [{
						id: 2,
						value: '康复师'
					},
					{
						id: 3,
						value: '主任康复师'
					},
					{
						id: 4,
						value: '医师'
					},
					{
						id: 5,
						value: '助理医师'
					},
					{
						id: 6,
						value: '康复医师'
					},
					{
						id: 7,
						value: '特教老师'
					},
					{
						id: 8,
						value: '主任医师'
					},
					{
						id: 9,
						value: '其他'
					}
				]
			}
		},
		onLoad() {
			//uni.removeStorageSync('chooseData');
			this.addEvent();
			this.getIllnessList();
			this.getInfo();
		},
		onUnload() {
			uni.$off();
			//uni.removeStorageSync('chooseData');
		},
		onShow() {
			
 			let data = uni.getStorageSync('chooseData');
 			if(data && data.selectedList){
				this.selectedList = data && data.selectedList?  data.selectedList:[];
			}
			if(data && data.list){
				this.binData1 = data && data.list ?data.list:[];
				
			}
			 
			this.$forceUpdate();
		},
		methods: {
			addEvent() {
				let that = this;
				uni.$on('addInfoText', function(data) {
					console.log(data)
					that[data.key] = data.value;
					uni.setStorageSync(data.key,data.value);
					
				})
				uni.$on('result', function(data) {
					console.log(data);
				})
			},
			getInfo() {
				let that = this;
				return request({
					url: getApp().$api.user.getQualificationList,
					type: "GET",
					data: {
						pageNo: 1,
						pageSize: 200,
						column: 'createTime',
						order: 'desc'
					}
				}, true, true).then(data => {
					console.log(data)
					if(data.records.length>0){
						that.info = data.records[0];
						that.school = that.info.school
						that.idNo = that.info.idNo
						that.xueLi ={
							id:0,
							value:that.info.education_dictText
							
						} 
 						
						that.positionItem_.id = that.info.type;
  						
 						that.positionItem_.value = that.typeList[parseInt(that.info.type)-2].value;
 						 
						 
  						//that.info.education_dictText;
						that.remark = that.info.remark;
						 that.positionItem= that.info.jobTitle
						
					}else{
						this.school =  uni.getStorageSync('school')
						this.idNo = uni.getStorageSync('idNo')
						this.positionItem = uni.getStorageSync('positionItem')
						this.remark = uni.getStorageSync('remark')
						this.xueLi = uni.getStorageSync("xueli");
						this.positionItem_ = uni.getStorageSync("renzhengleixing")
					}
 					
					
					
					
				})
			},
			toPage(key) {
				if (key == '/pages/Wode/WorkUnits/WorkUnits') {
					uni.navigateTo({
						url: key,
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
					return false;
				} else if (key == '/pages/Wode/uploadCertificate/uploadCertificate') {
					uni.navigateTo({
						url: key,
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
					return false;
				}else if(key == '/pages/Search/choose/choose'){
					uni.setStorageSync('chooseData',this.binData1)
					uni.navigateTo({
						url: key,
						animationDuration: 300,
						animationType: 'slide-in-right'
					})
					return false;
				}
				uni.navigateTo({
					url: '/pages/work/addOtherCertification/addOtherCertification?key=' + key + '&value=' + this[key],
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			toPage_(url) {
				
				uni.navigateTo({
					url,
					animationDuration: 300,
					animationType: 'slide-in-right'
				})
			},
			save_tips() {
 				if (this.info &&(this.info.result == 1 || this.info.result == 0)) {
 					
					let that = this;
					uni.showModal({
						title: '温馨提示',
						content: '本次提交将会覆盖当前的所拥有的资质，是否继续提交?',
						success(res) {
							if (res.confirm) {
								that.save();
							}
						}
					})
				} else {
					this.save();
				}

			},
			save() {
				let str = '';

				// if (this.info && this.info.result == ) return;
				let uploadCertificate = uni.getStorageSync('uploadCertificate');
				let company = uni.getStorageSync('workUnits');
				if (company) {
					company = JSON.stringify(company);
				}
				console.log(uploadCertificate)
				
				if (uploadCertificate) {
					console.log(uploadCertificate)
					if (uploadCertificate.work.length == 0) {
						str = '请选择工作证书'
					} else if (uploadCertificate.qualification.length == 0) {
						str = '请选择资质证书'
					} else {
						this.qualificationFile = uploadCertificate.qualification;
						this.workFile = uploadCertificate.work
					}
				}
				let that = this;
				if (this.school == '') {
					str = '请输入毕业院校'
				} else if (this.xueLi == null) {
					str = '请选择您的学历'
				} else if (this.idNo == '') {
					str = '请输入您的身份证号'
				} else if (!this.check(this.idNo)) {
					str = '您的身份证身份格式不正确'
				} else if (this.positionItem == '') {
					str = '请选择您的职称'
				} else if (this.positionItem_ == null) {
					str = '请选择您的认证类型'
				} else if (this.selectedList.length == 0) {
					str = '请选择您的擅长领域'
				}else if(this.qualificationFile.length == 0){
					str = '请上传资质证书'
				}
				if (str) {
					uni.showToast({
						title: str,
						icon: 'none'
					});
					return false;
				}
				let forte = [];
				that.selectedList.map(v => {
					forte.push(v.name)
				})
				forte = forte.join(',');
				let tempFiles = [];
				let tempFilePaths = [];
				this.qualificationFile.map((v, k) => {
					tempFiles.push(v);
					tempFilePaths.push(v.fullPath)
				});
				this.workFile.map((v, k) => {
					tempFiles.push(v);
					tempFilePaths.push(v.fullPath)
				});
				onloadImage.init({
					tempFiles,
					tempFilePaths
				}, (res) => {
					console.log(res);
					let file = res.imageUrl.join(',');
					console.log(file);
					console.log(company)
					return request({
						url: getApp().$api.user.addQualification,
						type: "POST",
						data: {
							forte,
							idNo: that.idNo,
							school: that.school,
							education: that.xueLi.id,
							remark: that.remark,
							type: that.positionItem_.id,
							jobTitle: that.positionItem,
							file,
							company,
							name:uni.getStorageSync('name')?uni.getStorageSync('name'):''
						}
					}).then(data => {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 1500
						})
						uni.removeStorageSync('workUnits');
						uni.removeStorageSync('uploadCertificate');
						setTimeout(() => {
							uni.navigateBack();
						}, 1200)
						console.log(data);
					}).catch(err => {
						console.log(err);
					})
				}).upload()

			},
			check(id) {
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (reg.test(id) === false) return false;
				return true;
			},
			getBackVal(data) {
				this.xueLi = {
					id: data.split("|")[1],
					value: data.split("|")[0]
				}
		   uni.setStorageSync('xueli',this.xueLi);
				
			},
			getBackVal1(data) {
				console.log(data);
				// this.shanChangLingYu 
				let shanChangLingYu = []
				if (data) {
					data.map(v => {
						shanChangLingYu.push({
							id: v.split("|")[1],
							value: v.split("|")[0]
						})
					});
					this.shanChangLingYu = shanChangLingYu;
				} else {
					this.shanChangLingYu = []
				}
			},
			chooseFile(str) {
				let that = this;
				new choose().init((data) => {
					console.log(data)
					let type = data.type;
					if (type.indexOf('doc') != -1 || type.indexOf('image') != -1 || type.indexOf('pdf') != -1) {
						that[str] = data;
					} else {
						uni.showToast({
							title: '只支持 .doc .pdf 和图片',
							icon: 'none',
							duration: 2000
						})
					}

				});
			},
			showSelectView() {
				this.visible = true;
			},
			showSelectView_() {
				this.visible_ = true;
			},
			onConfirm(data) {
				this.positionItem = data.obj;
			},
			onConfirm_(data) {
				this.positionItem_ = data.obj;
				uni.setStorageSync("renzhengleixing",this.positionItem_)
				
			},
			getIllnessList() {
				let that = this;
				return request({
					url: getApp().$api.shouye.getcourseCategoryList,
					type: 'GET',
					data: {
						pageNo: 1,
						pageSize: 200,
						type: 2
					}
				}, true, true).then(data => {
					console.log(data);
					if (data.records) {
						data.records.map((v, k) => {
							data.records[k].value = v.name;
						})
					}

					console.log(that.binData1);
					that.binData1 = data.records;
					console.log(that.binData1);
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage {
		width: 100%;
		min-height: 100vh;
		background-color: #F6F6F6;
	}

	.list {
		width: 750rpx;
		background-color: #FFFFFF;
	}

	.item {
		margin-left: 30rpx;
		width: 690rpx;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		padding-right: 30rpx;
		align-items: center;
		border-bottom: 2rpx solid #ECECEC;
	}

	.item:last-child {
		border: none;
	}

	.item .itemTitle {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.itemRight {
		display: flex;
		align-items: center;
	}

	.itemRight image {
		width: 14rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}

	.itemRightText {
		max-width: 400rpx;
	}

	.itemRightText1 {
		color: grey;
	}

	.save {
		position: fixed;
		bottom: 28rpx;
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

	.rightImage {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx;
	}
	.itemRightText_not{
		color: grey;
	}
</style>
