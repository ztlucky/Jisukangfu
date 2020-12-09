<template>
	<view class="viewPage">
		<view class="content">
			<view class="header">
				<image src="/static/Huanzhexiangqing/icon_jilu.png"></image>
				<view class="">评价项目</view>
			</view>
			<view class="List">
				<view class="Item" v-for="(Item,index) in info.questionClassifyList" :key="index">
					<view class="ItemTitle hidden">{{Item.name}}</view>
					<view v-for="(item,i) in Item.questionList" :key="i">
						<view class="item" v-if="item.type == 1">
							<view class="itemTitle hidden">{{i+1}}.{{item.title}}（单选）</view>
							<image mode="aspectFill" class="itemImage" :src="v" v-for="(v,ii) in item.file" :key="ii"></image>
							<view class="itemOptions" @click="setSelectedStatus(index,i,k)" v-for="(v,k) in item.content" :key="k">
								<view class="itemOptionsText">
									<view :class="v.isSelected?'optionDot optionDot1':'optionDot'">
										<view></view>
									</view>
									<view class="optionText">{{v.title}}</view>
								</view>
								<image mode="aspectFill" class="itemImage" :src="vv" v-for="(vv,ii) in v.imgList" :key="ii"></image>
							</view>
						</view>
						<view class="item" v-if="item.type == 2">
							<view class="itemTitle hidden">{{i+1}}.{{item.title}}（多选）</view>
							<image mode="aspectFill" class="itemImage" :src="v" v-for="(v,ii) in item.file" :key="ii"></image>
							<view class="itemOptions" @click="setSelectedStatus(index,i,k)" v-for="(v,k) in item.content" :key="k">
								<view class="itemOptionsText">
									<view :class="v.isSelected?'optionDot optionDot1':'optionDot'">
										<view></view>
									</view>
									<view class="optionText">{{v.title}}</view>
								</view>
								<image mode="aspectFill" class="itemImage" :src="vv" v-for="(vv,ii) in v.imgList" :key="ii"></image>
							</view>
						</view>
						<view class="item" v-if="item.type == 3">
							<view class="itemTitle">{{i+1}}.{{item.title}}</view>
							<textarea placeholder="请输入内容" v-model="item.content"></textarea>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="save" @click="save()">保存</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(options) {
			this.id = options.id ? options.id : 0;
			this.patientId = options.patientid?options.patientid:0;
			this.name = options.name?options.name:'';
			this.getInfo();
		},
		methods: {
			getInfo() {
				let that = this;
				return request({
					url: getApp().$api.pingdingliangbiao.getInfo,
					data: {
						id: that.id
					}
				}, true, true).then(data => {
					data.questionClassifyList
					if (data.questionClassifyList) {
						data.questionClassifyList.map((Item, Index) => {
							if (data.questionClassifyList[Index].questionList) {
								data.questionClassifyList[Index].questionList.map((item, index) => {
									data.questionClassifyList[Index].questionList[index].content = JSON.parse(data.questionClassifyList[Index].questionList[index].content);
									if (data.questionClassifyList[Index].questionList[index].file) {
										data.questionClassifyList[Index].questionList[index].file = JSON.parse(data.questionClassifyList[Index]
											.questionList[index].file);
									}
								})
							}
						})
					}
					console.log(data);
					that.info = data;
				})
			},
			save() {
				let data = this.checkData();
				let that = this;
				if(!data.isSubmit){
					uni.showToast({
						title:'不要提交一份空的评定呦',
						duration:1500,
						icon:"none",
						mask:true
					});
					return false;
				}
				return request({
					url:getApp().$api.pingdingliangbiao.addResult,
					type:"POST",
					data:{
						patientId:that.patientId,
						ratingScaleId:that.id,
						result:JSON.stringify(data),
						ratingScaleName:that.name
					}
				}).then(data=>{
					uni.showToast({
						title:'提交成功',
						duration:1500,
						mask:true
					})
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/HuanzheDetail/HuanzheDetail?id="+that.patientId
						})
					},1500)
				})
				console.log(data);
				
			},
			setSelectedStatus(Index, index, k) {
				let type = this.info.questionClassifyList[Index].questionList[index].type;
				let isSelected = this.info.questionClassifyList[Index].questionList[index].content[k].isSelected;
				if (type == 1) {
					console.log(this.info.questionClassifyList[Index].questionList[index].content[k]);
					this.info.questionClassifyList[Index].questionList[index].content.map((v, kk) => {
						this.info.questionClassifyList[Index].questionList[index].content[kk].isSelected = false;
						this.$set(this.info.questionClassifyList[Index].questionList[index].content, kk, this.info.questionClassifyList[
							Index].questionList[index].content[kk])
					});
					this.info.questionClassifyList[Index].questionList[index].content[k].isSelected = true;
					this.$set(this.info.questionClassifyList[Index].questionList[index].content, k, this.info.questionClassifyList[
						Index].questionList[index].content[k])

				} else {

					this.info.questionClassifyList[Index].questionList[index].content[k].isSelected = !isSelected;
					this.$set(this.info.questionClassifyList[Index].questionList[index].content, k, this.info.questionClassifyList[
						Index].questionList[index].content[k])
				}
			},
			checkData() {
				let data = this.info;
				let notList = [];
				let selectedList = [];
				let selectedList1 = []
				let selectedProblemList = [];
				let isSubmit = false;
				if (data.questionClassifyList) {
					data.questionClassifyList.map((Item, Index) => {
						let selected_item = [];
						let selected_item1 = [];
						let selectedProblem_item = {};
						if (data.questionClassifyList[Index].questionList) {
							data.questionClassifyList[Index].questionList.map((item, index) => {
								let isSelected = false;
								if(item.type == 1 || item.type == 2){
									let selectedItem = [];
									let selectedItem1 = [];
									data.questionClassifyList[Index].questionList[index].content.map((vv,kk)=>{
										if(vv.isSelected){
											selectedItem.push({
												text:vv.text
											})
											selectedItem1.push({
												text:vv.text1
											})
											isSelected = true;
											isSubmit = true;
										};
									})
									if(selectedItem.length >=1){
										selected_item.push(selectedItem);
										selected_item1.push(selectedItem1);
										selectedProblem_item = {
											content:JSON.stringify(item)
										}
										selectedProblemList.push(selectedProblem_item);
									}
									
									if(!isSelected){
										notList.push({
											name:data.questionClassifyList[Index].name,
											index,
											type:item.type
										})
									}
								}else{
									if(!data.questionClassifyList[Index].questionList[index].content){
										notList.push({
											name:data.questionClassifyList[Index].name,
											index,
											type:item.type
										})
									}else{
										selectedProblemList.push({
											content:JSON.stringify(item)
										});
										isSubmit = true;
									}
								}
								
								
							})
							if(selected_item.length >=1){
								selectedList.push(...selected_item);
								selectedList1.push(...selected_item1);
							}
							
						}
					});
					
					
				}
				return {
					notList,
					selectedList,
					isSubmit,
					selectedProblemList,
					selectedList1
				};
			}
		}
	}
</script>

<style scoped>
	.viewPage {
		width: 100%;
		min-height: 100vh;
		background: #F6F6F6;
		overflow: hidden;
		padding-bottom: 120rpx;
	}

	.content {
		width: 690rpx;
		margin: 30rpx;
		background: #FFFFFF;
		border-radius: 16px;
	}

	.header {
		height: 100rpx;
		padding-left: 40rpx;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.header image {
		width: 26rpx;
		height: 30rpx;
		margin-right: 16rpx;
	}

	.List {
		padding: 10rpx 30rpx;
		padding-bottom: 80rpx;
	}

	.Item {
		padding-top: 34rpx;
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.Item:last-child {
		border: none;
	}

	.ItemTitle {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #0ED482;
		line-height: 40rpx;
	}

	.itemTitle {
		margin-top: 16rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 44rpx;
		padding-bottom: 12rpx;
	}

	.itemOptions .itemOptionsText{
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}
	.itemOptions{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}

	.optionDot {
		width: 18rpx;
		height: 18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2rpx solid #999999;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.optionDot view {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #FFFFFF;
	}

	.optionDot1 {
		border: 2rpx solid #E02020;
	}

	.optionDot1 view {
		background-color: #E02020;
	}

	textarea {
		width: 570rpx;
		height: 224rpx;
		padding: 30rpx;
		background: #F6F6F6;
		border-radius: 12rpx;
		border: 2rpx solid #E7E7E7;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 36rpx;
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
	.itemImage{
		width:300rpx;
		height: 150rpx;
		margin-right: 40rpx;
	}
</style>
