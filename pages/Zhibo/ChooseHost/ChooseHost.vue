<template>
	<view class="conteview">
		<view class="searchbgview">
			<input class="input" placeholder="请输入手机号" confirm-type="search" @confirm="confirm" v-model="searchString" @input="onInput"></input>
		</view>
		<view class="list" v-show="mainlist.length>0">
			<view class="studentBgview" v-for="(item,index) in mainlist" :key="index" @click="selectItem(index)">
				<image :src="item.sex == 1 ?'../../../static/gongzuotai/icon_nan.png':'../../../static/gongzuotai/icon_nv.png'"></image>
				<text>{{item.name}}</text>
				<image class="selectImage" :src="item.checked == true?'../../../static/zhibo/icon_xuanzhong.png':'../../../static/zhibo/icon_weixuanzhong.png'"></image>


			</view>
		</view>

		<view class="save" @click="sureAction">确认</view>
	</view>

</template>

<script>
	import request from 'utils/util.js'

	export default {
		data() {
			return {
				mainlist: [],
				selectList: [],
				originArray: [],
				searchString: ""
			}
		},
		onLoad: function(e) {
			if (e.hostlist != null) {
				this.originArray = JSON.parse(e.hostlist)
			}

			this.getHostList();
		},
		methods: {
			//搜索
			confirm() {
				this.getHostList()
			},
			onInput(e) {
				console.log(e.detail.value)
				if (e.detail.value.length == 0) {
					this.getHostList()
					console.log("2555")

				}
			},
			selectItem(index) {
				var item = this.mainlist[index];
				item.checked = !item.checked;
				if (item.checked == true) {
					this.selectList.push(item)
				} else {
					this.selectList.splice(item)

				}

			},
			//获取主持人列表
			getHostList() {
				let that = this;
				return request({
					url: getApp().$api.user.hostList,
					type: 'GET',
					data: {
						pageNo: 1,
						pageSize: 500,
						phone: this.searchString
					}
				}, true, true).then(data => {
					that.mainlist = data.records;
					for (var i = 0; i < that.mainlist.length; i++) {
						var item = that.mainlist[i];
						if (that.originArray.length > 0) {
							for (var j = 0; j < that.originArray.length; i++) {
								var itemj = that.originArray[i];
								if (itemj.name == item.name) {
									this.$set(item, 'checked', true)
									this.selectList.push(item)
								} else {
									this.$set(item, 'checked', false)

								}
							}
						} else {
							this.$set(item, 'checked', false)

						}

					}

				})
			},
			sureAction() {
				if (this.selectList.length > 0) {

					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2];
					var select_List = JSON.stringify(this.selectList)

					uni.$emit("chooseHost", {
						selectList: select_List,
					})

					uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
						delta: 1
					});
				} else {
					uni.showToast({
						title: '你还未选择任何主持人',
						icon: 'none'
					})
				}
			}
		}
	}
</script>
<style>
	page {
		background-color: #F7F7F7;
	}
</style>
<style scoped lang="scss">
	.conteview {
		display: flex;
		flex-direction: column;
		align-items: center;

		.searchbgview {
			width: 690rpx;
			height: 80rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			border: 2rpx solid #FFFFFF;
			margin-top: 30rpx;

			.input {
				width: 500rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
				margin-top: 20rpx;
				margin-left: 20rpx;

			}
		}

		.list {
			padding-bottom: 140rpx;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			width: 690rpx;

			.studentBgview {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 30rpx;
				position: relative;

				.selectImage {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
					border-radius: 18rpx;
					right: 30rpx;
				}

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
					margin-left: 38rpx;

				}

				text {

					font-size: 32rpx;
					font-weight: 400;
					color: #000000;
					margin-left: 20rpx;
				}

			}
		}

		.save {
			position: fixed;
			bottom: 28rpx;
			left: 50%;
			z-index: 3;
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

	}
</style>
