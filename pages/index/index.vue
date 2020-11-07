<template>
	<view>
		<pickers @address="address" @close="close" :defaultAddress="defaultAddress">
        <view style="text-align: center;background-color: #42b983;color: #fff;">{{res||'点击我-->选择给五星好评的地址！'}}</view>
		</pickers>
	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	export default {
		data() {
			return {
        //默认选中
				defaultAddress:["广东省", "广州市", "番禺区"],
        //选中后的显示值
        res:""
			}
		},
		methods: {
      address(e){
        console.log("点击了确认")
        this.res=e.value.join("-");
      },
      close(){
        console.log("点击了取消")
      }
		},
		components: {
			pickers
		}
	}
</script>

<style scoped>

/* 	.box view {
		text-align: center;
		margin: 20px;
		background-color: #007AFF;
		color: #FFFFFF;
		border-radius: 3px;
		padding: 10px 0;
	} */
</style>
