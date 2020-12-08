<template>
	<view class="viewPage">
		<view class="list">
			<view class="itemTitle inputView">
				<view class="text">项目名称</view>
				<input placeholder="请输入项目名称" v-model="title" />
			</view>
			<view class="item" v-for="(item,index) in list">
				<view class="inputView">
					<view class="text">项目{{indexList[index]}}标题</view>
					<input placeholder="请输入标题" v-model="item.name"/>
				</view>
				<view class="inputView">
					<view class="text">项目{{indexList[index]}}费用</view>
					<input placeholder="请输入完成项目的费用" v-model="item.price"/>
				</view>
				<view class="inputView">
					<view class="text">项目{{indexList[index]}}得分</view>
					<input placeholder="请输入完成项目的得分" v-model="item.score"/>
				</view>
				<view class="itemTitle inputView" @click="setTime(index)">
					<view class="text">项目{{indexList[index]}}时间</view>
					<input disabled placeholder="请选择项目持续时间" v-model="item.time" />
				</view>
				<view class="deleteItem" @click="deleteItem(index)" v-if="list.length>1">删除项目</view>
			</view>
			<view class="addItem" @click="addItem">添加项目</view>
		</view>
		<w-picker :visible.sync="visibleTime" mode="selector" :second="false" :value="`${list.length>=1 && list.length < nowIndex?list[nowIndex].time:''}`"
		 :current="false" @confirm="onConfirmTime" :default-props="defaultProps" :options="itemList" :disabled-after="false" ref="time"></w-picker>
		 <view class="bottom" @click="save">保存</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import request from "../../../utils/util.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				indexList:['一','二','三','四','五','六','七','八','九'],
				list:[{
					name:'',
					price:'',
					score:'',
					time:''
				}],
				itemList:[
					{
						id:'1',
						value:'10min'
					},
					{
						id:'2',
						value:'20min'
					},
					{
						id:'3',
						value:'30min'
					},
					{
						id:'4',
						value:'40min'
					},
					{
						id:'5',
						value:'50min'
					},
					{
						id:'6',
						value:'60min'
					},
					{
						id:'7',
						value:'90min'
					},
					{
						id:'8',
						value:'120min'
					},
					{
						id:'9',
						value:'180min'
					},
					{
						id:'10',
						value:'240min'
					}
				],
				defaultProps:{"label":"value","value":"id"},
				
				title:'',
				nowIndex:0,
				visibleTime:false
			}
		},
		methods: {
			onConfirmTime(e){
				console.log(e);
				this.list[this.nowIndex].time = e.result;
			},
			setTime(index){
				this.nowIndex = index;
				this.visibleTime = true;
			},
			addItem(){
				if(this.list.length>=this.indexList.length){
					uni.showToast({
						title:`最多可添加${this.indexList.length}个`,
						duration:1500,
						icon:"none"
					})
					return false;
				}
				this.list.push({
					name:'',
					price:'',
					score:'',
					time:''
				})
			},
			save(){
				let that = this;
				let list = [];
				let noList = [];
				let str = '';
				let textList = [];
				if(!this.title){
					str = '请选择项目名称'
				}
				this.list.map((v,k)=>{
					if(v.name !='' && v.time !='' && v.price !='' &&v.score !=''){
						let time = v.time.substring(0,v.time.length-3)
						list.push({
							title:v.name,
							time,
							cost:v.price,
							score:v.score
						})
					}else{
						textList.push(that.indexList[k])
						noList.push({
							index:k,
							indexName:that.indexList[k],
							value:v
						})
					}
				})
				if(list.length == 0){
					str = '至少填写一个完整的项目信息'
				}
				if(str){
					uni.showToast({
						title:str,
						icon:"none",
						duration:1500,
						mask:true
					})
					return false;
				}
				if(noList.length !=0){
					let text = textList.join("、")
					uni.showModal({
						title:'温馨提示',
						content:'您的'+text+'项目的信息不完整，不会被保存!',
						cancelText:'暂时取消',
						confirmText:'继续保存',
						confirmColor:'#31D880',
						success(res) {
							if(res.confirm){
								that.runSave(list);
							}
						}
					})
				}else{
					that.runSave(list);
				}
			},
			runSave(list){
				let that = this;
				return request({
					url:getApp().$api.huanzhe.addProgram,
					type:"POST",
					data:{
						name:that.title,
						treatmentProgramItemList:list,
						userId:getApp().globalData.userId
					}
				}).then(data=>{
					uni.showToast({
						title: '添加成功',
						duration: 1500,
						mask: true
					})
					setTimeout(() => {
						uni.navigateBack();
					}, 1000)
				})
			},
			deleteItem(index){
				
				let that = this;
				let item = this.list[index];
				let indexName = this.indexList[index];
				if(item.name !='' && item.time !='' && item.price !='' &&item.score !=''){
					uni.showModal({
						title:'温馨提示',
						content:'您的确认要删除项目'+indexName+'?',
						cancelText:'取消',
						confirmText:'确认删除',
						confirmColor:'#31D880',
						success(res) {
							if(res.confirm){
								that.list.splice(index,1);
							}
						}
					})
				}else{
					that.list.splice(index,1);
				}
				console.log(this.list);
			}
		}
	}
</script>

<style scoped>
	.viewPage{
		width:690rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding:30rpx;
		padding-bottom: 140rpx;
	}
	.list{
		width:690rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		/* margin: 30rpx; */
		padding-bottom: 60rpx;
	}
	.text{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 44rpx;
		margin-left: 30rpx;
		padding-top: 40rpx;
	}
	input{
		width: 570rpx;
		margin:0 30rpx;
		height: 80rpx;
		padding:0 30rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}
	.itemTitle{
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #f5f5f5;
	}
	.addItem{
		width: 252rpx;
		height: 80rpx;
		border-radius: 8rpx;
		border: 2rpx solid #31D880;
		margin-top: 50rpx;
		margin-left: 30rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #31D880;
	}
	.bottom {
		position: fixed;
		bottom: 28rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	}
	.deleteItem{
		
	}
</style>
