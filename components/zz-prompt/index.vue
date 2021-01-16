<template>
  <view class="prompt-box" v-if="visible" @touchmove="true">
    <view class="prompt">
      <view class="prompt-top">
        <text class="prompt-title">{{title}}</text>
        <input v-if="!isMutipleLine" class="prompt-input" :style="inputStyle" :type="type" :placeholder="placeholder" v-model="value" :password="password">
        <textarea v-else class="prompt-input" :style="inputStyle" type="text" :placeholder="placeholder" v-model="value"></textarea>
		<text class="tiptext" v-if="showTip == true">{{tiptext}}</text>
		
      </view>
      <slot></slot>
       <view  class="prompt-buttons">
        <view class="prompt-cancle" :style="'color:' + mainColor" @click="close">取消</view>
        <view class="prompt-confirm" :style="'background:' + mainColor" @click="confirm">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
	  name:"Prompt",
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true,
      },
	  showTip:{
		 type: Boolean,
		 default: false, 
	  },
	  tiptext:{
		  type: String,
		  default: '',
	  },
	  password:{
		  type: Boolean,
		  default: false,
	  },
	  type:{
		  type: String,
		  default: 'number',
	  },
      title: {
        type: String,
        default: '提示',
      },
      placeholder: {
        type: String,
        default: '请输入内容',
      },
      mainColor: {
        type: String,
        default: '#e74a39',
      },
      defaultValue: {
        type: String,
        default: '',
      },
      inputStyle: {
        type: String,
        default: '',
      },
      // 是否多行输入的textarea
      isMutipleLine: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        value: '',
      }
    },
    watch: {
      visible(val) {
        if(val) {
          this.value = this.defaultValue
        }
      }
    },
    mounted() {
      this.value = this.defaultValue === 'true' ? '' : this.defaultValue
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
      confirm() {
        this.$emit('confirm', this.value)
        this.value = ''
      },
    }
  }
</script>

<style scoped>
  view,
  button,
  input {
    box-sizing: border-box;
  }

  .prompt-box {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .7);
    transition: opacity .2s linear;
	z-index: 99999999999;
  }

  .prompt {
    position: relative;
    display: flex;
    flex-direction: column;
     align-items: center;
    width: 600upx;
    min-height: 320upx;
    background: white;
    border-radius: 20upx;
    overflow: hidden;
   }

  .prompt-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .prompt-title {
    margin: 25upx 0;
    color: #333;
  }
.tiptext{
	font-size: 9px;
	color: #999999;
	width: 600upx;
	margin-top: 15rpx;
	padding-left: 90rpx;
 	
}
  .prompt-input {
    width: 520upx;
    min-height: 72upx;
    padding: 8upx 16upx;
    border: 2upx solid #ddd;
    border-radius: 8upx;
    font-size: 28upx;
    text-align: left;
  }

  .prompt-buttons {
    display: flex;
	position: absolute;
	bottom: 30rpx;
    width: 100%;
	height: 60rpx;
 	justify-content: space-around;
      }
  
  
/*  view {
    width: 35%;
    background: white;
  } */

  .prompt-cancle {
	  width: 35%;
	  
    background: white;
 	border-radius: 30rpx;
 	font-size: 28rpx;
 	line-height: 60rpx;
	text-align: center;
	border-color: #FF0000;
	border: 2upx solid #ddd;
	
 	background-color: #FFFFFF;
   }

  .prompt-confirm {
	  width: 35%;
	  
    color: white;
 	border-radius: 30rpx;
	font-size: 28rpx;
	text-align: center;
 	line-height: 60rpx;

  }
</style>
