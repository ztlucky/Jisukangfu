<template>
	<view class="view">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" :title="title" type="ordinary">
			<view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view>
		</nav-bar>
		<view v-for="(v,k) in list" :key="k">
			<view class="problem" v-if="v.type == 1" @click="setStatus(k)">
				<view class="title">
					<view class="titleText">问题</view>
					<image v-if="isEdit" :src="v.isSelected?'../../../static/order/icon_xuanzhong.png':''"></image>
				</view>
				<view class="text">
					{{v.title}}
				</view>
				<image class="image" v-for="(item , index) in v.file" :src="item"></image>
				<view class="title">
					<view class="titleText">选项</view>
					<!-- <image src="../../../static/order/icon_xuanzhong.png"></image> -->
				</view>
				<view class="options">
					<view class="optionsItem" v-for="(vv,kk) in v.content" :key="kk">
						<view class="dot"></view>
						<view class="optionsText">{{vv.title}}</view>
					</view>
				</view>
				<view class="edit">
					<view class="editText" @click="toPage('/pages/work/createProblem/createProblem?id='+v.id+'&edit=2')">编辑</view>
				</view>
			</view>
			<view class="problem" v-if="v.type == 2" @click="setStatus(k)">
				<view class="title">
					<view class="titleText">问题</view>
					<image v-if="isEdit" :src="v.isSelected?'../../../static/order/icon_xuanzhong.png':''"></image>
				</view>
				<view class="text">
					{{v.title}}
				</view>
				<image class="image" v-for="(item , index) in v.file" :src="item"></image>
				<view class="title">
					<view class="titleText">选项</view>
					<!-- <image src="../../../static/order/icon_xuanzhong.png"></image> -->
				</view>
				<view class="options">
					<view class="optionsItem" v-for="(vv,kk) in v.content" :key="kk">
						<view class="dot"></view>
						<view class="optionsText">{{vv.title}}</view>
					</view>
				</view>
				<view class="edit">
					<view class="editText" @click="toPage('/pages/work/createProblem/createProblem?id='+v.id+'&edit=2')">编辑</view>
				</view>
			</view>
			<view class="problem" v-if="v.type == 3" @click="setStatus(k)">
				<view class="title">
					<view class="titleText">问题</view>
					<image v-if="isEdit" :src="v.isSelected?'../../../static/order/icon_xuanzhong.png':''"></image>
				</view>
				<view class="text">
					{{v.title}}
				</view>
				
				<view class="edit">
					<view class="editText" @click="toPage('/pages/work/createTextProblem/createTextProblem?id='+v.id+'&edit=2')">编辑</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="!isEdit" @click="setNowStatus">编辑问题</view>
		<view class="bottomNav" v-else>
			<view class="" @click="deleteItem">删除选中的问题({{num}})</view>
			<view class="" @click="toPage('/pages/work/selectedProblemType/selectedProblemType?id='+id)">添加新的问题</view>
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
			size:10
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
			this.id = data.id?data.id:5;
			this.title = data.title?data.title:'评定量表'
		},
		methods: {
			setStatus(index){
				let isSelected = this.list[index].isSelected;
				this.list[index].isSelected = !isSelected;
				if(isSelected){
					this.num--;
				}else{
					this.num++;
				}
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
						content: '您确定要删除所选问题？',
						confirmColor: '#31D880',
						success: function(res) {
							if (res.confirm) {
								return request({
									type: "DELETE",
									url: getApp().$api.pingdingliangbiao.deleteQuestion+`?ids=${ids}`
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
			},
			setNowStatus(){
				if(this.list && this.list[0].isDel == -1){
					uni.showToast({
						title:'系统内容不支持该操作!',
						icon:'none'
					})
					return false;
				}
				this.isEdit = !this.isEdit;
			},
			save(){
				this.setNowStatus();
			},
			toPage(url,f = true,index = 0){
				if(this.list && this.list[0].isDel == -1){
					uni.showToast({
						title:'系统内容不支持该操作!',
						icon:'none'
					})
					return false;
				}
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
					url:getApp().$api.pingdingliangbiao.getQuestionList,
					type:'GET',
					data:{
						classifyId:that.id,
						pageNo:that.index,
						pageSize:that.size
					}
				},true,true).then(data=>{
					if(data.records.length !=0){
						data.records.map((v,k)=>{
							if(v.file){
								data.records[k].file = JSON.parse(data.records[k].file);
							}
							if(data.records[k].content){
								data.records[k].content = JSON.parse(data.records[k].content);
								let imgs = [];
								data.records[k].content.map(vv=>{
									imgs.concat(vv.imgList)
								})
								data.records[k].imgs = imgs;
								console.log(imgs);
							}
						})
					}
					if(data.records.length>=that.size){
						that.isGetMoreList = true
					}else{
						that.isGetMoreList = false
					}
					that.list = that.list.concat(data.records);
					that.index++;
					console.log(that.list);
					
				})
			}
		}
	}
	
</script>

<style scoped>
	.view{
		min-height: 100vh;
		background-color: #f6f6f6;
		padding-bottom: 140rpx;
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
	.problem{
		width:690rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		margin-left: 30rpx;
		margin-top:30rpx;
	}
	.titleView{
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.titleView image{
		width:26rpx;
		height: 30rpx;
		margin-left: 40rpx;
		margin-right:16rpx;
	}
	.titleView view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.title .titleText{
		padding:0 22rpx;
		height: 36rpx;
		border-radius: 8rpx;
		background-color: #31D880;
		text-align: center;
		line-height: 36rpx;
		margin:30rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.title image{
		width:36rpx;
		height: 36rpx;
		margin-right: 30rpx;
		background-color: #E0E0E0;
		border-radius: 50%;
	}
	.text{
		width:630rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.image{
		margin: 10rpx 30rpx;
		width:468rpx;
		height: 222rpx;
		margin-right: 150rpx;
	}
	.optionsItem{
		height: auto;
		display: flex;
		/* align-items: center; */
	}
	.optionsItem .dot{
		width:10rpx;
		height:10rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 50rpx;
		margin-top:16rpx;
	}
	.optionsItem .optionsText{
		max-width: 590rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.options{
		/* padding-bottom: 42rpx; */
		/* border-bottom: 2rpx solid #EAEAEA; */
	}
	.problem:last-child .options{
		border:none;
	}
	.problem1{
		border-bottom: 2rpx solid #EAEAEA;
		padding-bottom: 40rpx;
	}
	.itemView .problem1:last-child{
		border: none;
	}
	.edit{
		width: 100%;
		height: 56rpx;
		display: flex;
		justify-content: flex-end;
		padding-bottom: 40rpx;
	}
	.edit .editText{
		width: 188rpx;
		height: 56rpx;
		border-radius: 8rpx;
		border: 2rpx solid #31D880;
		
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #31D880;
		text-align: center;
		line-height: 56rpx;
		margin-right:30rpx;
	}
</style>
