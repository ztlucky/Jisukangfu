<template>
	<view class="view">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="评定量表问题分类" type="ordinary">
			<view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view>
		</nav-bar>
		<view class="list" v-if="list.length!=0">
			<view class="item" @click="toPage(isEdit?k:'/pages/work/pingDingLiangBiaoInfo/pingDingLiangBiaoInfo?id='+v.id+'&title='+v.name,!isEdit)" v-for="(v,k) in list" :key="k">
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
		<view class="bottom" v-if="!isEdit" @click="setNowStatus">编辑量表问题分类</view>
		<view class="bottomNav" v-else>
			<view class="" @click="deleteItem">删除选中的分类({{num}})</view>
			<view class="" @click="toPage('/pages/work/createProblemType/createProblemType?id='+id)">添加新的分类</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/util.js'
	export default {
		data() {
			return {
			isEdit:false,
			list:[],
			num:0,
			index: 1,
			size: 20,
			id:-1,
			isGetMoreList: true
			}
		},
		onShow() {
			console.log('onShow')
			if(this.id !=-1){
				this.getList(true);
				this.isEdit = false;
			}	
		},
		onLoad(data){
			console.log('onLoad')
			if(data.id){
				this.id = data.id;
				this.getList();
			}else{
				this.typeId = data.typeid;
				this.typename = data.typename;
				this.name = data.name;
				this.addEvent()
			}
		},
		onUnload(){
			uni.$off("addItem",this.setList);
		},
		methods: {
			deleteItem(){
				let that = this;
				if(this.num == 0){
					uni.showToast({
						title:"请选择要删除的分类",
						mask:true,
						duration:1500,
						icon:"none"
					})
					return false;
				}
				if(this.id == -1){
					let list = [];
					this.list.map(v=>{
						if(!v.isSelected){
							list.push(v)
						}
					})
					this.list = list;
					this.num = 0;
				}else{
					let ids = [];
					this.list.map(v=>{
						if(v.isSelected){
							ids.push(v.id);
						}
					})
					ids = ids.join(",");
					return request({
						url:getApp().$api.pingdingliangbiao.deleteQuestionType+`?ids=${ids}`,
						type:"DELETE",
						data:{
							
						}
					}).then(data=>{
						uni.showToast({
							title:'操作成功',
							duration:1500
						});
						setTimeout(()=>{
							that.isEdit = false;
							that.getList(true);
						},1000);
					})
				}
			},
			addEvent(){
				uni.$on("addItem",this.setList)
			},
			setList(data){
				console.log(data);
				this.list.push({
					name:data
				});
			},
			setNowStatus(){
				this.isEdit = !this.isEdit;
			},
			save(){
				if(this.list.length == 0){
					this.setNowStatus();
				}else{
					let data = {};
					let list = [];
					data.typeId = this.typeId;
					data.typeName = this.typename
					data.name = this.name;
					console.log(this.list);
					if(this.list.length == 0){
						
					}else{
						this.list.map(v=>{
							list.push({
								name:v.name
							})
						})
					}
					data.questionClassifyList = list;
					data.userId = getApp().globalData.userId;
					return request({
						url:getApp().$api.pingdingliangbiao.add,
						type:"POST",
						data
					}).then(data=>{
						// uni.showToast({
						// 	title:'保存成功',
						// 	duration:1500,
						// 	mask:1500
						// });
						setTimeout(()=>{
							uni.navigateBack({
								delta:2
							})
						},500)
					}).catch(err=>{
						console.log(err)
					})
				}
				
				
			},
			toPage(url,f = true){
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
				}
				if(this.isRun) return;
				this.isRun = true;
				let that = this;
				return request({
					url:getApp().$api.pingdingliangbiao.getQuestionType,
					type:"GET",
					data:{
						pageNo:that.index,
						pageSize:that.size,
						ratingScaleId:that.id
					}
				},true,true).then(data=>{
					
					if(data.records.length >= that.size){
						that.isGetMoreList = true;
					}else{
						that.isGetMoreList = false
					}
					that.list = that.list.concat(data.records);
					that.index++;
					that.isRun = false;
				}).catch(err=>{
					that.isRun = false;
				})
			}
		}
	}
</script>

<style scoped>
	.view{
		min-height: 100vh;
		background-color: #f6f6f6;
		padding-bottom: 120rpx;
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
		color: #999999;
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
</style>
