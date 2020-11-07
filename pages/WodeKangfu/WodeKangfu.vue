<template>
	<view  class="contentview"> 
	 <!-- <uni-richtext class="editbgview" :richList.sync="richList" :uploadUrl="uploadUrl"></uni-richtext> -->
	 <text>开发中，敬请期待。。。。</text>
   
  
 	</view>
	 
</template>

<script>
 import uniRichtext from '../../components/uni-richtext.vue'
 
export default {
    components: {
		uniRichtext
     },
    data() {
        return {
            content: '',
           richList: [],
           uploadUrl:"http://120.78.87.84:8080/conduit/file/uploadFile"
        }
    },
    methods: {
       
    },
	watch:{
		richList:function (newValue,oldValue) {
			console.log("dhhdhd")
			console.log(newValue)
		}
	},
    computed: {
        
    }
}
</script>

<style>
.contentview{
	display:  flex;
   }
	   
   .editbgview{
	   width: 100%;
	  margin-left: 30rpx;
	  margin-right: 30rpx;
	  height: 500rpx;
    }
   
   .container {
         padding: 10px;
     }
 
     #editor {
         width: 100%;
         height: 300px;
         background-color: #CCCCCC;
     }
 
     button {
         margin-top: 10px;
     }
</style>
