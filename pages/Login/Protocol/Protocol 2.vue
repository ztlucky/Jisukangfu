<template>
	<view>
	<web-view :src="url"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				title:'隐私政策'
			}
		},
		onLoad:function(option){
			 if(option.item !=null){
			        
			     let objClone=  JSON.parse(decodeURIComponent(option.item))
			    this.url = objClone.url
			    this.title = objClone.title
			}

		
			uni.setNavigationBarTitle({
			    title:  this.title
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
