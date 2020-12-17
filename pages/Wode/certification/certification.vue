<template>
	<view class="viewPage">
		<view class="list">
			<view class="item" @click="toPage('work')">
				<view class="itemTitle">工作单位</view>
				<view class="itemRight" >
					<view class="itemRightText">{{work}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('school')">
				<view class="itemTitle" >毕业院校</view>
				<view class="itemRight" >
					<view class="itemRightText hidden">{{school}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">学历</view>
				<view class="itemRight">
					<view class="itemRightText">
						<yealuo @getBackVal="getBackVal" the-style="font-size: 46upx;" :isShowIcon="false" backColor="#FFFFFF"  :selectIco="false" overflow="hide" :isSetUrl="true" placeholder="请选择" width="400" :binData="binData"
						 :isShowAllBack="false" padding="0rpx" textAlign="right"></yealuo>
					</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('idNo')">
				<view class="itemTitle">身份证</view>
				<view class="itemRight" >
					<view class="itemRightText">{{idNo}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="showSelectView">
				<view class="itemTitle">职称</view>
				<view class="itemRight">
					<view :class="positionItem && positionItem.id?'itemRightText':'itemRightText itemRightText1'  ">{{positionItem && positionItem.id?positionItem.value:'请选择您的职称'}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="chooseFile">
				<view class="itemTitle">资质证书</view>
				<view class="itemRight">
					<view class="itemRightText"></view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">工作证书</view>
				<view class="itemRight">
					<view class="itemRightText"></view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemTitle">擅长领域</view>
				<view class="itemRight">
					<view class="itemRightText">
						<yealuo @getBackVal="getBackVal1" the-style="font-size: 46upx;" :isShowIcon="false" backColor="#FFFFFF"  :selectIco="false" overflow="hide" :isSetUrl="true" placeholder="请选择" width="400" :binData="binData1"
						 :isShowAllBack="false" checkType="checkbox" padding="0rpx" textAlign="right"></yealuo>
					</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage('remark')">
				<view class="itemTitle">备注</view>
				<view class="itemRight" >
					<view class="itemRightText">{{remark}}</view>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="save" @click="save()">提交审核</view>
		<w-picker mode="selector" :visible.sync="visible"
        value="住院医师"
        default-type="name"
        :default-props="defaultProps"
        :options="position"
        @confirm="onConfirm($event,'selector')"
        ref="selector"></w-picker>
	</view>
</template>

<script>
	import yealuo from "@/components/yealuo-select/yealuo-select.vue"
	import request from "../../../utils/util.js";
	import choose from "../../../utils/androidChooseFile.js";
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components:{
			yealuo,
			wPicker
		},
		data() {
			return {
				defaultProps:{"label":"value","value":"id"},
				visible:false,
				idNo:'',
				school:'',
				remark:'',
				work:'',
				binData:[{
					id:1,
					value:'初中'
				},{
					id:2,
					value:'高中'
				},{
					id:3,
					value:'大专'
				},{
					id:4,
					value:'本科'
				},{
					id:5,
					value:'研究生'
				},{
					id:6,
					value:'博士研究生'
				},{
					id:0,
					value:'其他'
				}],
				position:[{
					id:1,
					value:'住院医师'
				},{
					id:2,
					value:'主治医师'
				},{
					id:3,
					value:'副主任医师'
				},{
					id:4,
					value:'主任医师'
				}],
				positionItem:null,
				xueLi:null,
				shanChangLingYu:null,
				binData1:[]
			}
		},
		onLoad() {
			this.addEvent();
			this.getIllnessList();
		},
		onUnload() {
			uni.$off();
		},
		methods: {
			addEvent(){
				let that = this;
				uni.$on('addInfoText',function(data){
				        that[data.key] = data.value;
				})
				uni.$on('result',function(data){
					console.log(data);
				})
			},
			getInfo(){
				
			},
			toPage(key){
				uni.navigateTo({
					url:'/pages/work/addOtherCertification/addOtherCertification?key='+key+'&value='+this[key],
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			save(){
				console.log(this.idNo,'---',this.school,'----',this.remark,'------',this.work)
				let str = '';
				let that = this;
				if(this.work == ''){
					str = '请输入毕业院校'
				}else if(this.xueLi == null){
					str = '请选择您的学历'
				}else if(this.idNo == ''){
					str = '请输入您的身份证号'
				}else if(!this.check(this.idNo)){
					str = '您的身份证身份格式不正确'
				}else if(this.positionItem = null){
					str = '请选择您的职称'
				}else if(this.shanChangLingYu == null){
					str = '请选择您的擅长领域'
				}
				if(str){
					uni.showToast({
						title:str,
						icon:'none'
					});
					return false;
				}
				return request({
					url:getApp().$api.user.addQualification,
					type:"POST",
					data:{
						forte:JSON.stringify(that.shanChangLingYu),
						idNo:that.idNo,
						school:that.work,
						education:that.xueLi.id,
						remark:that.remark
					}
				}).then(data=>{
					uni.showToast({
						title:'提交成功',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						uni.navigateBack();
					},1200)
					console.log(data);
				})
			},
			check(id){
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(reg.test(id) === false) return false; 
				return true;
			},
			getBackVal(data){
				this.xueLi = {
					id:data.split("|")[1],
					value:data.split("|")[0]
				}
			},
			getBackVal1(data){
				console.log(data);
				// this.shanChangLingYu 
				let shanChangLingYu = []
				if(data){
					data.map(v=>{
						shanChangLingYu.push({
							id:v.split("|")[1],
							value:v.split("|")[0]
						})
					});
					this.shanChangLingYu = shanChangLingYu;
				}else{
					this.shanChangLingYu = []
				}
			},
			chooseFile(){
				new choose().init((data)=>{
					console.log("999999")
					
					console.log(data)
				});
			},
			showSelectView(){
				this.visible = true;
			},
			onConfirm(data){
				this.positionItem = data.obj;
			},
			getIllnessList(){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getillnessList,
					type:'GET',
					data:{
						pageNo:1,
						pageSize:200
					}
				},true,true).then(data=>{
					data.records.map((v,k)=>{
						data.records[k].value = v.name;
					})
					that.binData1 = data.records;
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:100%;
		min-height: 100vh;
		background-color: #F6F6F6;
	}
	.list{
		width:750rpx;
		background-color: #FFFFFF;
	}
	.item{
		margin-left: 30rpx;
		width:690rpx;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		padding-right: 30rpx;
		align-items: center;
		border-bottom: 2rpx solid #ECECEC;
	}
	.item:last-child{
		border:none;
	}
	.item .itemTitle{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.itemRight{
		display: flex;
		align-items: center;
	}
	.itemRight image{
		width:14rpx;
		height: 24rpx;
		margin-left: 20rpx;
	}
	.itemRightText{
		max-width: 400rpx;
	}
	.itemRightText1{
		color:grey;
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
</style>
