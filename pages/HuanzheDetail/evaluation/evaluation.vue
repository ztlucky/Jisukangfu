<template>
	<view class="viewPage">
		<view class="content">
			<view class="itemView">
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">结果</text>
				</view>
				<view v-for="(v,k) in info.selectedProblemList" :key="k">
					<view class="problem" v-if="v.content.type == 1|| v.content.type == 2">
						<text class="title">问题</text>
						<view class="text text_">{{v.content.title}}</view>
						<image class="image" mode="aspectFill" :src="item" v-for="(item,index) in v.content.file" :key="index"></image>
						<view class="title">选项</view>
						<view class="options">
							<view v-for="(vv,kk) in v.content.content" :key="kk">
								<view class="optionsItem" v-if="vv.isSelected">
									<view class="dot"></view>
									<view class="optionsText">{{vv.title}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="problem" v-if="v.content.type == 3" style="padding-bottom: 40rpx;">
						<text class="title">问题</text>
						<view class="text text_">{{v.content.title}}</view>
						<view class="text">{{v.content.content}}</view>
					</view>
				</view>
			</view>

			<view class="itemView">
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">注意问题</text>
				</view>
				<view class="problem problem1" v-for="(v,k) in info.selectedList" :key="k">
					<view class="titleList">
						<text class="title">问题{{k+1}}</text>
						<text class="title" @click="setNowStatus(k,true,1)" v-if="my != 1">编辑</text>
					</view>
					<block v-for="(vv,kk) in v">
						<view class="text" v-if="!vv.isSelected">{{vv.text}}</view>
						<textarea class="text text_textarea" :focus="true" v-if="vv.isSelected" @blur="setNowStatus(-1,false,-1)"
						 @confirm="setNowStatus(-1,false,-1)" v-model="vv.text"></textarea>
					</block>

				</view>
			</view>
			<view class="itemView">
				<view class="titleView">
					<image src="../../../static/Huanzhexiangqing/icon_pingding.png"></image>
					<text class="titleText">治疗方案</text>
				</view>
				<view class="problem problem1" v-for="(v,k) in info.selectedList1" :key="k">
					<view class="titleList">
						<text class="title">问题{{k+1}}</text>
						<text class="title" @click="setNowStatus(k,true,2)" v-if="my != 1">编辑</text>
					</view>
					<block v-for="(vv,kk) in v">
						<view class="text" v-if="!vv.isSelected">{{vv.text}}</view>
						<textarea class="text text_textarea" :focus="true" v-if="vv.isSelected" @blur="setNowStatus(-1,false,-1)"
						 @confirm="setNowStatus(-1,false,-1)" v-model="vv.text"></textarea>
					</block>

				</view>
			</view>
		</view>
		<view class="bottom" @click="save" v-if="isSave">保存</view>
	</view>
</template>

<script>
	import request from '../../../utils/util.js'
	export default {
		data() {
			return {
				info: {},
				nowIndex: 0,
				listIndex: 0,
				isSave: false,
				my: 0
			}
		},
		onLoad(options) {
			this.id = options.assessid ? options.assessid : 0;
			this.my = options.my;
			this.getInit();
		},
		methods: {
			getInit() {
				let that = this;
				return request({
					url: getApp().$api.pingdingliangbiao.getResult,
					type: "GET",
					data: {
						id: that.id
					}
				}, true, true).then(data => {
					data = JSON.parse(data.result);

					data.selectedProblemList.map((v, k) => {
						data.selectedProblemList[k].content = JSON.parse(data.selectedProblemList[k].content);
					})
					this.info = data;
					console.log(data)
				})
			},
			setNowStatus(index, f, listIndex) {
				console.log(...arguments)
				index = index == -1 ? this.nowIndex : index;
				listIndex = listIndex == -1 ? this.listIndex : listIndex;
				let data = this.info;
				if (f) {
 
					if (listIndex == 1) {
						data.selectedList[index][0].isSelected = true;
						let item = data.selectedList[index];
						this.$set(this.info.selectedList, index, item)
					} else {
						data.selectedList1[index][0].isSelected = true;
						let item = data.selectedList1[index];
						console.log(item)
						this.$set(this.info.selectedList1, index, item)
					}

				} else {
					this.isSave = true;
					if (listIndex = 1) {
						data.selectedList[index][0].isSelected = false;
						let item = data.selectedList[index];
						this.$set(this.info.selectedList, index, item)
					} else {
						data.selectedList1[index][0].isSelected = false;
						let item = data.selectedList1[index];
						this.$set(this.info.selectedList1, index, item)
					}
				}
				this.nowIndex = index;
				this.listIndex = listIndex;
			},
			save() {
				if (this.info.selectedProblemList && this.info.selectedProblemList.length >= 1) {
					this.info.selectedProblemList.map((v, k) => {
						this.info.selectedProblemList[k].content = JSON.stringify(this.info.selectedProblemList[k].content);
					})
				}

				let result = JSON.stringify(this.info);
				let that = this;
				return request({
					url: getApp().$api.pingdingliangbiao.editResult,
					type: 'PUT',
					data: {
						result,
						id: that.id
					}
				}).then(data => {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					});
					setTimeout(() => {
						that.isSave = false;
						that.nowIndex = 0;
						that.listIndex = 0;
						that.getInit();
					}, 1000)
				})
			}
		}
	}
</script>

<style scoped>
	.viewPage {
		width: 100vw;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding-bottom: 120rpx;
	}

	.content {
		width: 690rpx;
		margin: 30rpx
	}

	.itemView {
		width: 690rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		/*display: flex; 
		flex-direction: column; */
	}

	.titleView {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.titleView image {
		width: 26rpx;
		height: 30rpx;
		margin-left: 40rpx;
		margin-right: 16rpx;
	}

	.titleView view {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}

	.title {
		display: inline-block;
		padding: 0 22rpx;
		height: 36rpx;
		border-radius: 8rpx;
		background-color: #31D880;
		text-align: center;
		line-height: 36rpx;
		margin: 30rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.text {
		width: 630rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		word-break: break-all;
	}

	.image {
		margin: 10rpx 30rpx;
		width: 468rpx;
		height: 222rpx;
		margin-right: 150rpx;
	}

	.optionsItem {
		height: 40rpx;
		display: flex;
		align-items: center;
	}

	.optionsItem .dot {
		width: 10rpx;
		height: 10rpx;
		background-color: #31D880;
		border-radius: 50%;
		margin-left: 50rpx;
	}

	.optionsItem .optionsText {
		margin-left: 20rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.options {
		padding-bottom: 42rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.problem:last-child .options {
		border: none;
	}

	.problem1 {
		border-bottom: 2rpx solid #EAEAEA;
		padding-bottom: 40rpx;
	}

	.itemView .problem1:last-child {
		border: none;
	}

	.text_ {
		font-weight: 600;
	}

	.titleList {
		display: flex;
		justify-content: space-between;
	}

	.text_textarea {
		height: 120rpx;
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
</style>
