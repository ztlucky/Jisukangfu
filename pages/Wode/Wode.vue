<template>
	<view>
 

 	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow:function(){
			if(getApp().globalData.userId){
				
				
			}else{
				//未登陆
				uni.navigateTo({
 						url:'../Login/Login/Login',
							 animationType:'slide-in-bottom',
							  animationDuration: 300
			});
			}
			
		},
		onLoad:function(){
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
                                                 