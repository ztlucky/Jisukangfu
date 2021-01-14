<template>
	<view class="viewPage">
		<view class="bg">
			<image mode="aspectFill" src="../../../static/Me/bg_huiyuan_top.png"></image>
			<view class="bgView">
				<image class="bgViewLeft" src="../../../static/gongzuotai/icon_nan.png"></image>
				<view class="bgViewRight">
					<view class="">{{info.name}}</view>
					<view class="">{{info.userType == 2?'会员 VIP':info.userType == 3?'超级会员 SVIP':'普通用户'}}</view>
					<view class="">{{info.userType == 2||info.userType == 3?info.membershipDue + ' 到期':''}}</view>
				</view>
			</view>
		</view>
		<view class="typeNav">
			<view :class="type == 1?'typeItem':'typeItem typeItem1'" @click="setVipType(1)">
				<view class="typeItemTitle">超级会员SVIP</view>
				<view class="border"></view>
			</view>
			<view :class="type == 2?'typeItem':'typeItem typeItem1'" @click="setVipType(2)">
				<view class="typeItemTitle">会员VIP</view>
				<view class="border"></view>
			</view>
		</view>
		<!-- <view class="tips">
			<image mode="aspectFill" src="../../../static/Me/icon_gonggao.png"></image>
			<view class="tipsText">购买超级连续包年/包季/包月，分别立减10元/38元/89元</view>
		</view> -->
		<view class="cardList">
			<view :class="v.isSelected?'cardItem cardItem1':'cardItem'" v-for="(v,k) in list" :key="k" @click="setItemStatus(k)">
				<!-- <view class="cardTips">{{v.tips}}</view> -->
				<view class="cardName">{{v.name}}</view>
				<view class="cardPrice">
					<view class="priceTips">¥</view>
					<view class="priceText">{{v.price}}</view>
				</view>
				<view class="text">{{v.remark}}</view>
			</view>
			<view class="borderView"></view>
		</view>
		<!-- <view class="tipsView">选择连续包月可省10元/月，连续包月可随时取消；取消后不再享受优惠资格以实际支付金额为准。</view> -->
		<view class="pay" @click="pay">以{{list[nowMemberIndex]?list[nowMemberIndex].price:''}}元的价格支付</view>
		<view class="bottomBorder"></view>
		<view class="title">会员权益</view>
		<view class="interestsList">
			<view class="interestsItem">
				<image src="../../../static/Me/icon_chaoda.png"></image>
				<view class="">超大</view>
				<view>视频空间</view>
			</view>
			<view class="interestsItem">
				<image src="../../../static/Me/icon_huifang.png"></image>
				<view class="">专属</view>
				<view>直播回放</view>
			</view>
			<view class="interestsItem">
				<image src="../../../static/Me/icon_tuijian.png"></image>
				<view>推荐立省</view>
			</view>
			<view class="interestsItem">
				<image src="../../../static/Me/icon_gongzuotai.png"></image>
				<view class="">专属</view>
				<view>工作台</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from "../../../utils/util.js"
	export default {
		data() {
			return {
				info: {},
				cardList: [],
				otherCardList: [],
				list: [],
				type: 1,
				nowMemberIndex: 0,
			}
		},
		onLoad() {
			this.getUserInfo().then((data) => {
				this.getMemberList();
			});
		},
		methods: {
			getUserInfo() {
				let that = this;
				return request({
					url: getApp().$api.user.getUserInfo,
					type: "GET",
					data: {
						condition: true,
						id: getApp().globalData.userId
					}
				}, true, true).then(data => {
					that.info = data.data;
				})
			},
			getMemberList() {
				let that = this;
				return request({
					url: getApp().$api.user.getMemberList,
					type: "GET",
					data: {
						pageNo: 1,
						pageSize: 50
					}
				}, true, true).then(data => {
					let cardList = [];
					let otherCardList = [];
					if (data.records) {
						data.records.map(v => {
							if (v.type == 1) {
								cardList.push(v);
							} else if (v.type == 2) {
								otherCardList.push(v);
							}
						});
						cardList[0].isSelected = true;
						otherCardList[0].isSelected = true;
						that.cardList = cardList;
						that.otherCardList = otherCardList;
						that.list = cardList;

					}
				})
			},

			setVipType(type) {
				if (this.type == type) return false;
				this.type = type;
				if (type == 1) {
					this.list = this.cardList;
				} else {
					this.list = this.otherCardList;
				}
				console.log(this.list);
			},
			setItemStatus(index) {
				if (this.type == 1) {
					this.cardList.map((v, k) => {
						this.cardList[k].isSelected = false;
						this.$set(this.list, k, this.cardList[k])
					});
					this.cardList[index].isSelected = true;
					this.list[index].isSelected = true;
					this.$set(this.list, index, this.cardList[index])
				} else {
					this.otherCardList.map((v, k) => {
						this.otherCardList[k].isSelected = false;
						this.list[k].isSelected = false;
						this.$set(this.list, k, this.otherCardList[k])
					});
					this.otherCardList[index].isSelected = true;
					this.list[index].isSelected = true;
					this.$set(this.list, index, this.otherCardList[index])
				}
				this.nowMemberIndex = index;
			},
			pay() {
				let that = this;
				// customerId:getApp().globalData.userId,
				// goodsId:this.liveid,
				// goodsSku:getApp().globalData.reword,
				// originalPrice:parseFloat(this.dashangMoney)
				uni.showModal({
					title: '温馨提示',
					content: '是否购买该会员!',
					success(res) {
						if (res.confirm) {
							return request({
								url: getApp().$api.dingdan.creatOrder,
								type: "POST",
								data: {
									customerId: getApp().globalData.userId,
									goodsId: that.list[that.nowMemberIndex].id,
									goodsSku: getApp().globalData.member
								}
							}, true, true, false).then(data => {
								uni.showToast({
									title: '购买成功'
								})
								setTimeout(() => {
									that.getUserInfo();
								}, 1000)
							})
						}
					}
				})


			}
		}
	}
</script>

<style scoped>
	.bg {
		position: relative;
		width: 750rpx;
		height: 258rpx;
	}

	.bg image {
		width: 750rpx;
		height: 258rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.bgView .bgViewLeft {
		width: 92rpx;
		height: 92rpx;
		border-radius: 50%;
		margin-top: 106rpx;
		margin-left: 50rpx;
	}

	.bgViewRight>view:nth-child(1) {
		position: absolute;
		top: 106rpx;
		left: 174rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #E8B96E;
		line-height: 40rpx;
	}

	.bgViewRight>view:nth-child(2) {
		position: absolute;
		top: 152rpx;
		left: 174rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #B69258;
		line-height: 34rpx;
	}

	.bgViewRight>view:nth-child(3) {
		position: absolute;
		top: 192rpx;
		left: 174rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 28rpx;
	}

	.typeNav {
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 72rpx;
	}

	.typeItem {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.typeItemTitle {
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 50rpx;
	}

	.typeItem1 .typeItemTitle {
		color: #999999;
	}

	.typeItem1 .border {
		background-color: #FFFFFF;
	}

	.border {
		width: 50rpx;
		height: 6rpx;
		background: #323232;
		border-radius: 4rpx;
		margin-top: 20rpx;
	}

	.tips {
		margin: 0 52rpx;
		margin-top: 40rpx;
		display: flex;
		height: 42rpx;
		background-color: #F8EDD9;
		border-radius: 20rpx;
		align-items: center;
	}

	.tips image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 8rpx;
		margin-right: 14rpx;
	}

	.tips .tipsText {

		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.cardList {
		padding-top: 50rpx;
		display: flex;
		width: 720rpx;
		padding-left: 30rpx;
		flex-wrap: nowrap;
		overflow-x: scroll;
	}

	.cardItem {
		flex-shrink: 0;
		position: relative;
		width: 182rpx;
		height: 198rpx;
		border: 2rpx solid #E6E6E6;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 20rpx;
	}

	.cardItem1 {
		border: 4rpx solid #EACA88;
		background-color: #F9F1DD;
	}

	.cardTips {
		width: 140rpx;
		height: 28rpx;
		background: #FF4F59;
		border-radius: 6rpx;
		line-height: 28rpx;
		text-align: center;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.cardName {
		margin-top: 34rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 36rpx;
	}

	.cardPrice {
		margin-top: 12rpx;
		display: flex;
		height: 40rpx;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FF4F59;
		line-height: 40px;
	}

	.cardPrice>view:nth-child(1) {
		font-size: 20rpx;
		margin-top: 6rpx;
	}

	.cardPrice>view:nth-child(2) {

		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
	}

	.cardItem .text {
		text-align: center;
		width: 100rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 24rpx;
		margin-top: 12rpx;
	}

	.borderView {
		flex-shrink: 0;
		width: 1rpx;
		height: 198rpx;
	}

	.tipsView {
		width: 690rpx;
		padding: 0 30rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
		margin-top: 16rpx;
		margin-bottom: 34rpx;
	}

	.pay {
		margin: 0 auto;
		margin-top: 30rpx;
		width: 602rpx;
		height: 80rpx;
		background: linear-gradient(90deg, #EEC987 0%, #D3A45E 100%);
		border-radius: 40rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		text-align: center;
		line-height: 80rpx;
		margin-bottom: 36rpx;
	}

	.bottomBorder {
		width: 100%;
		height: 8rpx;
		background-color: #EDEDED;
	}

	.title {
		margin-top: 26rpx;
		margin-left: 30rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 44rpx;
	}

	.interestsList {
		margin-top: 36rpx;
		display: flex;
		padding: 0 58rpx;
		justify-content: space-between;
		padding-bottom: 82rpx;
	}

	.interestsItem {
		width: 104rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 28rpx;
	}

	.interestsItem image {
		width: 104rpx;
		height: 104rpx;
		margin-bottom: 12rpx;
	}
</style>
