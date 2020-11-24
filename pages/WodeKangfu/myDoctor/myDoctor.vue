<template>
	<view class="viewPage">
		<view class="list">
			<expert :isshow="(k == expertList.length-1)" v-for="(v,k) in expertList" :key="k"></expert>
		</view>
	</view>
</template>

<script>
	import expert from "../../../components/experts/experts.vue"
	export default {
		components:{
			expert
		},
		data() {
			return {
				expertList:[1,2,3,4,5,6,7,8,9]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.list{
		width:690rpx;
		padding:30rpx;
	}
</style>
