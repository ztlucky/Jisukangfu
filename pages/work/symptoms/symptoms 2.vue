<template>
	<view class="view">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="症状" type="ordinary">
			<view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view>
		</nav-bar>
		<!-- <view class="headerNav" v-if="!isEdit">
			<view :class="nowType == 0?'item item1':'item'" @click="setNowType(0)">疾病症状</view>
			<view :class="nowType == 1?'item item1':'item'" @click="setNowType(1)">一键比较分类</view>
		</view> -->
		<view class="list" v-if="list.length !=0 && nowType == 0">
			<view class="item" @click="toPage(isEdit?k:('none'),!isEdit,k)" v-for="(v,k) in list" :key="k">
				<view class="itemLeft"></view>
				<view class="itemRight">
					<view class="rightText hidden">{{v.name}}</view>
					<view class="rightView" v-if="!isEdit">
						<view>{{v.value}}</view>
						<image src="../../../static/f_my_kecheng_arrow.png"></image>
					</view>
					<view class="rightView rightView1" v-else>
						<image :src="v.isSelected?'/static/order/icon_xuanzhong.png':' '"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="list" v-if="list.length !=0 && nowType == 1">
			<view class="item" @click="toPage(isEdit?k:('/pages/work/pingDingLiangBiaoProblemType/pingDingLiangBiaoProblemType?id=' + v.id),!isEdit,k)" v-for="(v,k) in list" :key="k">
				<view class="itemLeft"></view>
				<view class="itemRight">
					<view class="rightText hidden">{{v.name}}</view>
					<view class="rightView" v-if="!isEdit">
						<view>{{v.value}}</view>
						<image src="../../../static/f_my_kecheng_arrow.png"></image>
					</view>
					<view class="rightView rightView1" v-else>
						<image :src="v.isSelected?'/static/order/icon_xuanzhong.png':' '"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="!isEdit && nowType == 0" @click="setNowStatus">编辑疾病症状</view>
		<view class="bottomNav" v-if="isEdit && nowType == 0">
			<view class="" @click="deleteItem">删除选中的症状({{num}})</view>
			<view class="" @click="toPage('/pages/work/addSymptoms/addSymptoms?id='+id)">添加新的症状</view>
		</view>
		<view class="bottom" v-if="!isEdit && nowType == 1" @click="setNowStatus">编辑比较分类</view>
		<view class="bottomNav" v-if="isEdit && nowType == 1">
			<view class="">删除选中的分类({{num}})</view>
			<view class="" @click="toPage('/pages/work/addSymptoms/addSymptoms?id='+id)">添加新的分类</view>
		</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js";
	export default {
		data() {
			return {
			isEdit:false,
			list:[],
			num:0,
			index:1,
			size:10,
			nowType:0
			}
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			if (this.isGetMoreList) {
				this.getList();
			} else {
				uni.showToast({
					title: "暂无更多数据",
					duration: 1500,
					icon:"none"
				})
			}
		},
		onShow() {
			this.getList(true);
		},
		onLoad(data) {
			this.id = data.id?data.id:6;
			// this.getList(true);
		},
		methods: {
			setNowType(index){
				if(this.nowType == index){
					return false;
				}
				this.num = 0;
				this.list = [];
				this.index = 1;
				this.nowType = index;
			},
			setNowStatus(){
				this.isEdit = !this.isEdit;
			},
			save(){
				this.setNowStatus();
			},
			toPage(url,f = true,index = 0){
				let that = this;
				if(!f){
					this.list[url].isSelected = !this.list[url].isSelected;
					let num = 0;
					this.list.map(v=>{
						if(v.isSelected){
							num++;
						}
					})
					this.num = num;
				}else{
					if(url == 'none') return
						uni.navigateTo({
							url,
							animationDuration: 300,
							animationType: 'slide-in-right'
						})
					
					
				}
			},
			getList(f = false){
				if(f){
					this.index = 1;
					this.list = [];
					this.num = 0;
					this.isEdit = false;
				}
				let that = this;
				return request({
					url:getApp().$api.huanzhe.getSymptomsList,
					type:'GET',
					data:{
						illnessId:that.id,
						pageNo:that.index,
						pageSize:that.size
					}
				},true,true).then(data=>{
					console.log(data);
					if(data.records.length>=that.size){
						that.isGetMoreList = true
					}else{
						that.isGetMoreList = false
					}
					that.list = that.list.concat(data.records);
					that.index++;
				})
			},
			deleteItem() {
				let that = this;
				if (this.num == 0) {
					uni.showToast({
						title: '请选择要删除的分类',
						duration: 1500,
						icon: "none",
						mask: true
					})
				} else {
					let ids = [];
					this.list.map(v => {
						if (v.isSelected) {
							ids.push(v.id)
						}
					});
					ids = ids.join(",");
					uni.showModal({
						title: '温馨提示',
						content: '您确定要删除所选分类？',
						confirmColor: '#31D880',
						success: function(res) {
							if (res.confirm) {
								return request({
									type: "DELETE",
									url: getApp().$api.huanzhe.deleteSymptom+`?ids=${ids}`
								}).then(data => {
									uni.showToast({
										title: '删除成功',
										duration: 1500,
										mask: true
									})
									setTimeout(() => {
										that.getList(true);
										that.isEdit = false;
										that.num = 0;
									}, 1000)
								})
							}
						}
					})

				}
			}
		
		}
	}

</script>

<style scoped>
	.view{
		min-height: 100vh;
		background-color: #f6f6f6;
	}
	.navRight{
		width:104rpx;
		height: 40rpx;
		text-align: center;
		font-size:24rpx;
		color:#31D880;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-right: 30rpx;
	}
	.list{
		width: 690rpx;
		margin:30rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		padding-bottom: 46rpx; 
	}
	.list .item{
		height: 102rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding-bottom: 46rpx; */
	}
	.item .itemLeft{
		width:8rpx;
		height: 8rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 32rpx;
	}
	.item .itemRight{
		display: flex;
		width:620rpx;
		border-bottom: 2rpx solid #EAEAEA;;
	}
	.itemRight{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 102rpx;
	}
	.itemRight .rightText{
		max-width: 440rpx;
		font-size:28rpx;
		color:#333333;
	}
	.rightView{
		display: flex;
		align-items: center;
	}
	.rightView view{
		margin-right: 32rpx;
		
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.rightView image{
		width:24rpx;
		height: 24rpx;
		/* background-color: red; */
		margin-right: 28rpx;
	}
	.bottom{
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		color:#FFFFFF
	}
	.bottomNav{
		position: fixed;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		display: flex;
		width:690rpx;
		/* margin-left: 30rpx; */
		justify-content: space-between;
		
	}
	.bottomNav >view{
		line-height: 80rpx;
		text-align: center;
	}
	.bottomNav >view:nth-child(1){
		width: 330rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border:2rpx solid #E02020;
		font-size:28rpx;
		color:#E02020;
		background-color: #FFFFFF;
	}
	.bottomNav >view:nth-child(2){
		width: 330rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
		font-size:28rpx;
		color:#FFFFFF;
	}
	.rightView1 image{
		background-color: #DDDDDD;
		border-radius: 50%;
	}
	.headerNav{
		width:690rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		margin: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		color: #31D880;
		overflow: hidden;
	}
	.headerNav .item{
		flex: 1;
		text-align: center;
		line-height: 80rpx;
	}
	.headerNav .item1{
		background-color: #31D880;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
</style>
