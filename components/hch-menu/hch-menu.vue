<!--
 * @Description: 悬浮菜单组件
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-15 22:03:28
 * @LastEditors: hch
 * @LastEditTime: 2020-08-15 22:12:17
-->
<template>
	<view class="menu-content">
		<image class="menu icon" @click="change"  :class="{'menuOpen':isOpen}" src="/static/hch-menu/menu.png" alt="" srcset="">
		<image class="bg-menu icon" :class="{'open open1':isOpen}" src="/static/hch-menu/bg.png" alt="" srcset="" @click="clickItem(1)">
		<image class="pic-menu icon" :class="{'open open2':isOpen}" src="/static/hch-menu/pic.png" alt="" srcset="" @click="clickItem(2)" >
		<image class="text-menu icon" :class="{'open open3':isOpen}" src="/static/hch-menu/text.png" alt="" srcset="" @click="clickItem(3)">
		
	</view>
</template>

<script>
	export default {
		data() {
			return  {
 		         isOpen:false
		           //是否展开菜单
                }
		},
		methods: {
			  
          clickItem(i){
			  this.isOpen = false;
			  // 需要绑定的方法，在使用的时候，和属性值一起赋值，
			  // 参数1: 方法名字
			  // 参数2: 方法参数
			  
			  this.$emit("clickItem",i)
		  },
		  
	
            change:function(e){
		this.isOpen = !this.isOpen
 	  }
		}
	}
</script>

<style lang="scss" scoped>
	.menu-content {
    .icon{
      position: fixed;
      bottom: 100rpx;
      right: 60rpx;
      width: 80rpx;
      height: 80rpx;
      opacity: 0;
      transform: rotate(0deg);
      transition: all 0.5s ease-out 0s;
    }
    .text-menu{
      width: 86rpx;
      height: 86rpx;
    }
    .menu{
      z-index: 1;
      opacity: 1;
    }
    .menuOpen{
      transform: rotate(180deg);
      animation-fill-mode:forwards;
      transition: all 0.5s ease-out 0s;
    }
    .open {
      opacity: 1;
      transform: rotate(360deg);
      animation-fill-mode:forwards;
      transition: all 0.5s ease-out 0s;
    }
    .open1{
      right: 60rpx;
      bottom: 230rpx;
    }
    
    .open2{
      right: 170rpx;
      bottom: 190rpx;
    }
    .open3{
      right: 210rpx;
      bottom: 80rpx;
    }
    .open4{
       right: 150rpx;
      bottom: 100rpx;
    }
    .bg-menu{
    }
	}
</style>
