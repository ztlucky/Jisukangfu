<template>
	<view class="yealuo-select" :style="getStyle">
		<view class="yealuo-background" @tap="isShow=false" v-show="isShow"></view>
		<view class="yealuo-con" :style="isShowAllBack?'background-color:#F5F5F5':''">
			<slot name='left'></slot>
			<input class="input" :style="'padding: 0 '+padding" :disabled="theDisabled" :placeholder="placeholder" v-model="theValue" @input="theInput" @tap='isShow=data.length' @focus="theFocus" @blur="theBlur" autocomplete="off" />
			<image :src='!isShow? "/static/wodehuanzhe/below.png":"/static/wodehuanzhe/top.png"' class="rightImage"></image>
			<!-- <slot name='right' v-if="selectIco">
				<svg class="icon" v-if="!isShow" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="530"><path d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z" p-id="531"></path></svg>
				<svg class="icon" v-else style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1927"><path d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z" p-id="1928"></path></svg>
			</slot> -->
		</view>
		<view class="yealuo-select" v-show="show">
			<view class="data">
				<radio-group v-if="checkType=='radio'"  @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in data" :key="index" >
					<label class="item-text" :class="{active: theValue==item.value}">
					<radio name="name1" color="#31D880" checked v-if="theValue==item.value" :value="item.value+'|'+item.id"></radio>
					<radio name="name1"  v-else :value="item.value+'|'+item.id"></radio>
					{{item.value}}
					</label>
				</view>
				</radio-group>
				<checkbox-group v-else-if="checkType=='checkbox'" @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in data" :key="index" >
					<label class="item-text" :class="{active: theValue.indexOf(item.value)!=-1 }">
					<checkbox name="name1" color="#31D880" checked v-if="theValue.indexOf(item.value)!=-1 " :value="item.value+'|'+item.id"></checkbox>
					<checkbox name="name1" v-else :value="item.value+'|'+item.id"></checkbox>
					{{item.value}}
					</label>
				</view>
				</checkbox-group>
				<radio-group v-else  @change="selectCheckbox">
				<view class="select-item" :class="'item-'+overflow" v-for="(item, index) in data" :key="index" >
					<label class="item-text" :class="{active: theValue==item.value}">
					<radio name="name1" style="display: none;" checked v-if="theValue==item.value" :value="item.value+'|'+item.id"></radio>
					<radio name="name1" style="display: none;" v-else :value="item.value+'|'+item.id"></radio>
					{{item.value}}
					</label>
				</view>
				</radio-group>
			</view>
			<view class="item-close" @tap="isShow=false">收起</view>
		</view>
	</view>
</template>

<script>
	/**
	 * v1.0.0
	 * 最后修改: 2020.9.30
	 * 创建: 2020.9.30
	 * Author:yealuo.com
	 * contact:470797533@qq.com
	 */
	let fontUnit = 'upx'
	// #ifdef MP-WEIXIN
	fontUnit = 'rpx'
	// #endif
	export default {
		name: 'yealuoInputs',
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: ''
			},
			checkType: {
				type: String,
				default: ''
			},
			itemKey: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '600'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			theStyle: {
				type: String,
				default: ''
			},
			overflow: {
				type: String,
				default: 'auto'
			},
			binData:{
				type:Array,
				default: ()=>{
					return []
				}
			},
			selectIco:{
				type: Boolean,
				default: false
			},
			padding:{
				type:String,
				default:'0rpx'
			},
			isShowAllBack:{
				type:Boolean,
				default:false
			},
			isSetUrl:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				data: this.binData,
				odData:this.binData,
				isShow: false,
				theValue: this.value,
				theDisabled: this.disabled
			}
		},
		created() {

		},
		watch: {
			value(val){
				this.theValue = val;
			}
			
		},
		computed: {
			show(){
				return this.isShow && this.data.length
			},
			getStyle(){
				let style = this.theStyle.replace(/upx/g,fontUnit)
				let width = 'width:' + (!isNaN(Number(this.width)) ? this.width + fontUnit : this.width) + ';'
				return style + width
			},
		},
		methods: {
			//获取焦点
			theFocus(e){
				this.data=this.odData;
			},
			//失去焦点
			theBlur(e){
				// this.$emit('blur',e);
				this.$emit('blur',this.theValue)
			},
			//获取输入值
			theInput(e) {
				var val=e.detail.value;
				let data = [];
				var odData=this.odData;
				for(var i=0;i<odData.length;i++){
					var isHas=false;
					if(odData[i].value.indexOf(val)!=-1){
						data.push(odData[i])
						if(odData[i].value==val){
							isHas=true;
							var arr=[];
							arr.push(odData[i].value+"|"+odData[i].id)
						  this.$emit('getBackVal',arr);
						}
					}
					if(!isHas){
						var arr=[];
						arr.push(val)
						 this.$emit('getBackVal',arr);
					}
				}
				this.data=data;
			},
			//下拉选中
			selectCheckbox(e){
				var val=e.target.value;
				var str=val;
				if(typeof(str)!="string"){
					str="";
					for(var i=0;i<val.length;i++){
						var vt=val[i].split("|");
						str+=i>0?","+vt[0]:vt[0];
					}
				}
				else{
					this.isShow = false;
					str=str.split("|")[0];
				}
				this.$emit('getBackVal',val)
				
				this.theValue = str;
			}
		},
	}
</script>

<style lang="scss" scoped>
	
.yealuo-select{
	max-width: 100%;
	position: relative;
	.yealuo-background{position: fixed;top:0;left:0;width: 750upx;height: 100%;}
	.yealuo-con{display: flex;align-items: center;justify-content: center;
	padding-right: 20upx;
		input{ flex: 1;margin:  0 6upx  ;
		}
			
		image{
			width: 26rpx;
			height: 26rpx;
		}
	}
		
	.input{
		 height: 80rpx;
						  background: #F5F5F5;
						  border-radius: 8rpx;
 						  margin-right: 38rpx;
 						  margin-top: 20rpx;
						  font-size: 28rpx;
						  font-family: PingFangSC-Regular, PingFang SC;
						  font-weight: 400;
						  color: #000000;
						// background-color: #FF0000;
		 			    
	}
	.yealuo-select {
		border: 1px solid #f3f3f4;
		position: absolute;
		z-index: 999;
		background: #FFFFFF;
		width: 100%;
		left: 0rpx;
		top: 80upx;
 		.data{
			max-height: 600upx;
			padding: 10upx;
			overflow: auto;
			.select-item {width: 100%;
				.item-text{padding: 10upx 0; font-size: 28upx;}
				.active{font-weight: bold;}
			}
			.item-auto{overflow: auto;
				.item-text{width: max-content;}
			}
			.item-hide .item-text{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.item-close {
			padding: 20upx;
			text-align: center;
			font-size: 30upx;
			border-top: 1px solid #f3f3f4;
			color:#8F8F94;
		}
	}
	radio{
		margin-bottom: 20rpx;
	}
}
</style>