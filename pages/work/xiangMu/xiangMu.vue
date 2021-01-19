<template>
	<view class="viewPage">
		<nav-bar  bgColor="#31D880" backState="1000" fontColor="#ffffff" title="项目" type="ordinary">
			<view slot="right" v-if="isEdit" @click="save" class="navRight">保存</view>
		</nav-bar>
		<view class="list" v-if="list.length >=1">
			<view class="item"   @click="toPage(isEdit?k:('none'),!isEdit,k)" v-for="(v,k) in list" :key="k">
				<view class="itemTop">
					<view class="left">
						<view class="dot"></view>
						<view class="leftTitle hidden">{{v.name}}</view>
					</view>
					<image v-if="isEdit" :src="v.isSelected?'/static/order/icon_xuanzhong.png':' '"></image>
				</view>
				<view class="xiangMuList">
					<view class="xiangMuItem" v-for="(item,index) in v.treatmentProgramItemList">
						<view class="name hidden">{{item.title}}</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">时间：{{item.time}}min</view>
						</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">费用：{{item.cost}}</view>
						</view>
						<view class="xiangMuzItem">
							<view class="dot"></view>
							<view class="itemText">得分：{{item.score}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="!isEdit" @click="setNowStatus">编辑新的项目</view>
		<view class="bottomNav" v-else>
			<view class="" @click="deleteItem">删除选中的项目<text v-if="num">({{num}})</text></view>
			<view class="" @click="toPage('/pages/work/editXiangMu/editXiangMu')">添加新的项目</view>
		</view>
	</view>
</template>

<script>
	import navBar from "../../../components/zhouWei-navBar/index.vue";
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				isEdit:false,
				size:20,
				list:[
					{
						name:'PTWpeWE',
						isSelected:false,
						list:[{
							name:"项目一",
							time:'155min',
							price:'1586',
							score:'15'
						},
						{
							name:"项目15866",
							time:'155min',
							price:'1586',
							score:'15'
						}]
					},
					{
						name:'PTWpeWE',
						isSelected:false,
						list:[{
							name:"项目一",
							time:'155min',
							price:'1586',
							score:'15'
						},
						{
							name:"项目15866",
							time:'155min',
							price:'1586',
							score:'15'
						}]
					},
					{
						name:'PTWpeWE',
						isSelected:false,
						list:[{
							name:"项目一",
							time:'155min',
							price:'1586',
							score:'15'
						},
						{
							name:"项目15866",
							time:'155min',
							price:'1586',
							score:'15'
						}]
					}
				]
			}
		},
		onShow() {
			this.getList(true);
		},
		methods: {
			setNowStatus(){
				this.isEdit = !this.isEdit;
			},
			save(){
				this.setNowStatus();
			},
			toPage(url,f = true,index = 0){
				let that = this;
				if(!f){
					console.log(url);
					this.list[url].isSelected = !this.list[url].isSelected;
					this.$set(this.list,url,this.list[url])
					let num = 0;
					this.list.map((v,k)=>{
						if(v.isSelected){
							num++;
						}
					})
					this.num = num;
				}else{
					console.log(url)
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
					url:getApp().$api.huanzhe.getProgramList,
					type:'GET',
					data:{
						pageNo:that.index,
						pageSize:that.size,
						condition:true
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
									url: getApp().$api.huanzhe.deleteProgram+`?ids=${ids}`
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
		
		},
		components:{
			navBar
		}
	}
</script>

<style scoped>
	.viewPage{
		width:100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		padding-bottom: 120rpx;
		overflow: hidden;
	}
	.list{
		width:690rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		margin:30rpx;
		padding-top:32rpx;
		padding-bottom: 40rpx;
	}
	.item{
		margin-top:14rpx;
		padding-bottom: 8rpx;
	}
	.itemTop{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40rpx;
	}
	.itemTop image{
		background-color: #DDDDDD;
		border-radius: 50%;
	}
	.item .left{
		display: flex;
		align-items: center;
	}
	.item .left .dot{
		width:8rpx;
		height: 8rpx;
		border-radius: 50%;
		background-color: #31D880;
		margin-left: 32rpx;
		margin-right: 32rpx;
	}
	.xiangMuList{
		width: 618rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		margin-left: 72rpx;
		border-bottom:2rpx solid #EAEAEA;
		margin-top: 20rpx;
	}
	.xiangMuItem{
		display: flex;
		width:618rpx;
		height: 40rpx;
		/* padding-left: 72rpx; */
		padding-bottom: 20rpx;
		
		
	}
	.leftTitle{
		max-width: 540rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.xiangMuItem .name{
		max-width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		padding:0 14rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #31D880;
		border-radius: 8rpx;
	}
	.xiangMuzItem{
		display: flex;
		align-items: center;
		height: 40rpx;
		margin-left: 30rpx;
		font-size: 22rpx;
		line-height: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		
	}
	.xiangMuzItem .dot{
		width:8rpx;
		height: 8rpx;
		border-radius: 50%;
		background-color: #31D880;
		margin-right: 10rpx;
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
	.itemTop image{
		width:24rpx;
		height: 24rpx;
		margin-right: 30rpx;
		border-radius: 50%;
	}
</style>
