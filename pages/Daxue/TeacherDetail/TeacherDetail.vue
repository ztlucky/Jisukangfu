<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacherId:''
				
			}
		},
		onLoad:function(e){
			this.teacherId = e.id;
 			uni.showToast({
				title:"老师id="+e.id
			})
			},
		methods: {
			
		}
	}
</script>

<style>

</style>
