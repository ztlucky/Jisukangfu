<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
			var args= plus.runtime.arguments;
			   if(args){  
			       // 处理args参数，如直达到某新页面等  
			 console.log(args)
								
			   }  
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
		 					 userId : uni.getStorageSync('userid')? uni.getStorageSync('userid'):'',
 							 userName :uni.getStorageSync('name')? uni.getStorageSync('name'):'游客',
									 
				     
						},
	}
</script>

<style>
	/*每个页面公共css */
/* 	//控制滚动条
 */	::-webkit-scrollbar{
		  display: none;
	}
</style>
