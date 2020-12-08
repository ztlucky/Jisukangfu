<template>
	<view class="list">
		<view class="item" :style="'margin-right:'+right+'rpx;width:'+height+'rpx;'+'height:'+height+'rpx'" v-for="(v,k) in list" :key="k">
			<image :style="'margin-right:'+right+'rpx;width:'+height+'rpx;'+'height:'+height+'rpx'" src="/static/zixun/wujiaoxing.png"></image>
			<view class="itemView" :style="'width:'+v.width+'rpx'+';height:'+v.height+'rpx'"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			height:{
				type:String
			},
			right:{
				type:String
			},
			value:{
				type:Number,
				default:4.5
			}
		},
		data() {
			return {
				list:[]
			}
		},
		created() {
			this.init();
		},
		methods: {
			init(){
				let num = this.value.toFixed(1);
				let num1 = Number.parseInt(num.split('.')[0]);
				let num2 = Number.parseInt(num.split('.')[1]);
				for(let i = 1;i<=5;i++){
					if(i<=num1){
						this.list.push({
							width:this.height,
							height:this.height,
							right:this.right
						})
					}else if(i == (num1+1)){
						console.log(i,num1)
						this.list.push({
							width:(this.height * num2)/10,
							height:this.height,
							right:this.right
						})
					}else{
						this.list.push({
							width:0,
							height:0,
							right:this.right
						})
					}
				}
			}
		}
	}
</script>

<style scoped>
	.list{
		display: flex;
	}
	.item{
		position: relative;
	}
	.item view{
		/* overflow: hidden; */
		position: absolute;
		top:0;
		left: 0;
		z-index: 0;
		background-color: #E02020;
	}
	.item image{
		position: absolute;
		top:0;
		left: 0;
		z-index: 1;
	}
	
</style>
