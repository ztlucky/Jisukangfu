<template>
	<view>
		<scroll-view scroll-y="true" :style="[{height:viewHeight + 'px'}]" @scroll="scroll">
			<view class="topview">
				<image src="../../static/wodehuanzhe/bg_wodehuanzhe.png" class="topimageview" mode="aspectFill"></image>
				<text class="title1">请输入</text>
				<text class="title2">患者信息、诊断结果</text>
				<view class="line1">

				</view>
				<view class="topitemView">
					<text class="huanzhexinxi">患者信息</text>
					<view class="greenline">

					</view>
					<text class="name">姓名</text>
					<input adjust-position="true" class="inputview" placeholder="请输入患者名字" v-model="huanzhename" />
					<view class="sexview">
						<image class="sexImage" @click="changeSelectIndex(1)" :src="selectIndex == 1?'../../static/wodehuanzhe/selectedcopy.png':'../../static/wodehuanzhe/unselectedcopy.png'"></image>
						<text :class="selectIndex ==1?'selecttext':'unselecttext'" @click="changeSelectIndex(1)"> 男</text>
						<image class="sexImage" @click="changeSelectIndex(2)" :src="selectIndex == 2?'../../static/wodehuanzhe/selectedcopy.png':'../../static/wodehuanzhe/unselectedcopy.png'"></image>
						<text :class="selectIndex ==2?'selecttext':'unselecttext'" @click="changeSelectIndex(2)">女</text>
					</view>


					<text class="name">身份证号</text>
					<input adjust-position="true" class="inputview" placeholder="请输入患者身份证号" v-model="huanzheIDNumber" />
					<text class="name">手机号</text>
					<input adjust-position="true" class="inputview" placeholder="请输入患者手机号" v-model="huanzheMobile" />
					<text class="name">地址</text>
					<pickers @address="address" @close="close">
						<view class="chooseshengshiqu">
							<input adjust-position="true" class="input" placeholder="请选择省市区" v-model="res" :disabled="true">

							</input>
							<image src="../../static/wodehuanzhe/below.png" class="rightImage"></image>
						</view>



					</pickers>
					<text class="name">地址</text>
					<textarea @blur="bindTextAreaBlur" class="detailAdressView" placeholder="请输入详细地址" style="height: 130px;" maxlength="-1"
					 adjust-position="true" />
					<text class="name">患者来源</text>
					 <yealuo-select class="inputview" 
					 the-style="margin: 20upx auto;font-size: 46upx;  " 
					       
					         placeholder='请选择患者来源' 
					         :binData="sourceData"
					         overflow="hide"
					         @getBackVal="getBackVal2"
					         :selectIco="false"
					         >
					         </yealuo-select>
					 <text class="name">床位</text>
					 <input adjust-position="true" type="number" class="inputview" placeholder="请输入床位" v-model="beds" />
					<text class="huanzhexinxi">患者信息</text>
		 <view class="greenline">
		 	
		 </view>
		<text class="name">诊断</text>
		<yealuo-select class="inputview" 
		the-style="margin: 20upx auto;font-size: 46upx;  " 
		      
		        placeholder='请选择诊断结果' 
		        :binData="illnessData"
  		        overflow="hide"
		        @getBackVal="getBackVal"
		        :selectIco="false"
		        >
		        </yealuo-select>
				<text class="name">症状</text>
				<yealuo-select class="inputview" 
				the-style="margin: 20upx auto;font-size: 46upx;  " 
				      
				        placeholder='请选择症状结果' 
				        :binData="symptomsData"
				        overflow="hide"
				        @getBackVal="getBackVal1"
				        :selectIco="false"
						checkType="checkbox"
				        >
				        </yealuo-select>
				<view class="bottomview">
					<text class="baocun" @click="save()">保存</text>
					<text class="jixupingding" @click="pingdingAction">继续评定</text>
				</view>
		 

 			</view>
 		  
		</view>
		
		 </scroll-view>
 	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import yealuoInputs from '@/components/yealuo-select/yealuo-select.vue'
	import request from "../../utils/util.js"
 	export default {
		components: {pickers,
		            yealuoInputs

 		},
		data() {
			return {
			    illnessData:[
					
				],
				symptomsData:[],
				sourceData:[{//患者来源
					id:1,
					value:'门诊'
				},
				{
					id:2,
					value:'住院'
				},
				{
					id:3,
					value:'互联网'
				}],
				sourceValue:null,
				illnessValue:null,
				symptomsValue:null,
				viewHeight:0,
 				 huanzhename:'',
				 huanzheIDNumber:'',
				 huanzheMobile:'',
				 selectIndex:1,//1代表男2代表女
			 detailAdress:'',
 				//选中后的显示值
				res:"请选择省市区",
				selecValue: '双皮奶',
				beds:''//床位

			}
		},
		onLoad:function(e){
			this.getillnessUserList();
			
		},
		onShow:function(){
		 
  			
			this.viewHeight =parseInt(this.$app.getwindowHeight())+parseInt(this.$app.getNaviBarHeight());
		 
		},
		methods: {
			//选中值传（值可自定义，初始id与value用|分割，根据实际用途定义）
		  getBackVal:function(data){
			  this.illnessValue = {
			  	id:data.split('|')[1],
			  	value:data.split('|')[0]
			  }
			    this.getSymptomsData();
			},
						
		getBackVal1(data){
			let str = [];
			let str1 = [];
			if(data){
				data.map(v=>{
					str.push(v.split('|')[1]);
					str1.push(v.split('|')[0]);
				})
			}
			str = str.join(",");
			str1 = str1.join(",")
			this.symptomsValue = {
				id:str,
				value:str1
			}
		},
		getBackVal2(data){
			this.sourceValue = {
				id:data.split('|')[1],
				value:data.split('|')[0]
			}
		},
		//获取症状列表
		getSymptomsData(){
			let that = this;
			 return request({
				 url:that.$api.huanzhe.getSymptomsList,
				 type:"GET",
				 data:{
					 pageNo:1,
					 pageSize:40,
					 userId:getApp().globalData.userId,
					 illnessId:that.illnessValue.id
				 }
			 },true,true).then(data=>{
				 let list = [];
				 data.records.map(v=>{
					 list.push({
						 id:v.id,
						 value:v.name
					 })
				 });
				 that.symptomsData = list;
				 that.symptomsValue = null;
			 })
		},
         //获取病症 
		 getillnessUserList(){
			 let that = this;
			 return request({
				 url:that.$api.huanzhe.getillnessList,
				 type:"GET",
				 data:{
					 pageNo:1,
					 pageSize:40,
					 userId:getApp().globalData.userId,
					 type:1
				 }
			 },true,true).then(data=>{
				 let list = [];
				 data.records.map(v=>{
					 list.push({
						 id:v.id,
						 value:v.name
					 })
				 });
				 that.illnessData = list;
			 })
		 // this.$app.request({
		 		
		 // 		url: this.$api.huanzhe.getillnessList,
			// 	//getApp().globalData.userId
		 // 		data: {
			// 		pageNo:1,
			// 		pageSize:40,
		 // 			userId:0 ,
 		//  		},
		 // 		method: 'GET',
		 // 		success: res => {
		 // 			console.log(res)
		 				 
		 // 			if(res.code == 200){
		 // 				 //  this.illnessData = res.data.records;
 		// 		  	// this.illnessData.concat(res.data.records);
			// 		for (var i = 0; i < res.result.records.length; i++) {
			// 			this.illnessData.push(res.result.records[i]);
 		// 			}
			// 			//  this.illnessData.push(res.data.records[1]);
						
			// 			console.log("789789")
						
			// 				console.log( this.illnessData)
									  
		 // 			}
		 			
		 // 		},
		 // 		fail: res => {
		 // 		},
		 // 		complete: res => {
		 			 
		 // 		}
		 // 	});
		 
		 },
			address(e){
			  console.log("点击了确认")
			  this.res=e.value.join("-");
			},
			close(){
			  console.log("点击了取消")
			},
			changeSelectIndex(index){
				this.selectIndex = index;
			},
			 bindTextAreaBlur: function (e) {
			            console.log(e.detail.value)
						this.detailAdress = e.detail.value;
			        },
			 scroll: function(e) {
				 
 						if(e.detail.scrollTop >this.$app.getNaviBarHeight()){
							
							 uni.setNavigationBarColor({
							                      // 字体颜色 仅支持 #ffffff 和 #000000
							                      frontColor: '#ffffff',
							                      //     背景颜色值，有效值为十六进制颜色
							                      backgroundColor: '#31D880',
							                      // animation 结构
							                     animation: {
							                          // duration: 动画时间
							                          duration: 2000,
							                          // timingFunc:动画效果
							                              // linear    动画从头到尾的速度是相同的。
							                              // easeIn    动画以低速开始
							                              // easeOut    动画以低速结束。
							                             // easeInOut    动画以低速开始和结束
							                          timingFunc: 'easeIn'
							                      }
							                  });
							
						}else{
							uni.setNavigationBarColor({
							                     // 字体颜色 仅支持 #ffffff 和 #000000
							                     frontColor: '#ffffff',
							                     // 背景颜色值，有效值为十六进制颜色
							                     backgroundColor: 'rgba(0,0,0,0)',
							                     // animation 结构
							                    animation: {
							                         // duration: 动画时间
							                         duration: 2000,
							                         // timingFunc:动画效果
							                             // linear    动画从头到尾的速度是相同的。
							                             // easeIn    动画以低速开始
							                             // easeOut    动画以低速结束。
							                            // easeInOut    动画以低速开始和结束
							                         timingFunc: 'easeIn'
							                     }
							                 });
						}
 			        },
			 pingdingAction(){
				
				 this.save(false)
				 
				 
			 },
			 save(f = true){
			 		 let str = "";
			 		//  if(!this.huanzhename){
			 		// 	 str = '请输入患者姓名'
			 		//  }else if(!this.huanzheIDNumber){
			 		// 	 str = "请输入患者身份证号"
			 		//  }else if(!this.checkCode(this.huanzheIDNumber)){
						//  str = "请输入患者正确身份证号"
					 // }else if(!this.huanzheMobile){
			 		// 	 str = "请输入患者手机号"
			 		//  }else if(this.res == "请选择省市区"){
			 		// 	 str = "请选择地区"
			 		//  }else if(!this.detailAdress){
			 		// 	 str = "请输入详细地址"
			 		//  }else if(!this.sourceValue){
			 		// 	 str = "请选择患者来源"
			 		//  }else if(this.sourceValue.id == 2 &&!this.beds){
			 		// 	str = "请输入床位"
			 		//  }else if(!this.illnessValue){
			 		// 	 str = "请选择诊断结果"
			 		//  }else if(!this.symptomsValue){
			 		// 	 str = "请选择症状结果"
			 		//  }
					if(!this.sourceValue){
						str = "请选择患者来源"
					}else if(this.sourceValue.id == 2 &&!this.beds){
						str = "请输入床位"
					}
			 		 if(str){
						 uni.showToast({
							title: str,
							icon:'none',
							duration: 2000
						})
			 		 }else{
						 let that = this;	 
			 		 let age = that.discriCard(that.huanzheIDNumber);
					 return request({
						 url:that.$api.huanzhe.addHuanZhe,
						 type:"POST",
						 data:{
								 name:that.huanzhename,
								 age,
								 sex:that.selectIndex,
								 bunk:that.beds,
								 idNo:that.huanzheIDNumber,
								 phoneNumber:that.huanzheMobile,
								 detailedAddress:that.detailAdress,
								 patientsSource:that.sourceValue?that.sourceValue.id:'',
								 illnessId:Number.parseInt(that.illnessValue?that.illnessValue.id:'0'),
								 symptomId:that.symptomsValue?that.symptomsValue.id:'',
								 illnessName:that.illnessValue?that.illnessValue.value:'',
								 symptomName:that.symptomsValue?that.symptomsValue.value:'',
								 province:that.res?that.res.split("-")[0]:'',
								 city:that.res?that.res.split("-")[1]:'',
								 county:that.res?that.res.split("-")[2]:'',
								 userId:getApp().globalData.userId
						 }
					 }).then(data=>{
						 uni.showToast({
						 	title:data.message,
						 	duration:1500,
						 	success(data) {
						 		setTimeout(()=>{
									if(f){
										uni.navigateBack();
									}else{
										uni.navigateTo({
											url:'../KangfuPingdingListPage/KangfuPingdingListPage',
															animationDuration:300,
															animationType:'slide-in-right'
										})
									}
						 		},1500);
						 	}
						 })
					 })
					 
					 }
			 		 
			 },
			 discriCard(UUserCard){ 
				UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14); 
					var myDate = new Date(); 
					var month = myDate.getMonth() + 1; 
					var day = myDate.getDate(); 
					var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1; 
					if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) { 
					age++; 
					} 
					return age;
				},
				checkCode(val) {
				        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				        var code = val.substring(17);
				        if(p.test(val)) {
				            var sum = 0;
				            for(var i=0;i<17;i++) {
				                sum += val[i]*factor[i];
				            }
				            if(parity[sum % 11] == code.toUpperCase()) {
				                return true;
				            }
				        }
				        return false;
				    }
			 
			 }
			 
			 
	}
</script>
<style>
		
	page{
		background-color: #F7F7F7;
	}
	 
	</style>
<style scoped lang="scss">
		
	.topview{
		display: flex;
		flex-direction: column;
		position: relative;
		.topimageview{
			width: 100%;
			height: 562rpx;
		 } 
		 .title1{
			 
			 font-size: 32rpx;
			 font-family: PingFangSC-Regular, PingFang SC;
			 font-weight: 400;
			 color: #FFFFFF;
			 margin-left: 40rpx;
			 position: absolute;
			  top: 150rpx;
			 
 		 }
		 .title2{	 
		 			 font-size: 44rpx;
		 			 font-family: PingFangSC-Semibold, PingFang SC;
		 			 font-weight: 600;
		 			 color: #FFFFFF;
		 			 margin-left: 40rpx;
		 			 position: absolute;
		 			  top: 200rpx;
		 			 
		 }
		 .line1{
			width: 70rpx;
			height: 4rpx; 
			position: absolute;
			 top: 280rpx;
			 margin-left: 40rpx;
			 background-color: #FFFFFF;
		 }
		 
		 
		 .topitemView{
			 display: flex;
			 flex-direction: column;
			 position: absolute;
			 top: 360rpx;
		     left: 30rpx;
		     right: 30rpx;
			 margin-bottom:96rpx;
			 
   			 border-radius: 16rpx;
 		 	 background-color: #FFFFFF;	 
			 
 			 .huanzhexinxi{
				 
				 font-size: 36rpx;
				 font-family: PingFangSC-Semibold, PingFang SC;
				 font-weight: 600;
				 color: #333333;
				 margin-left: 38rpx;
				 margin-top: 78rpx;
				 
			 }
			 .greenline{
				 width: 64rpx;
				 height: 4rpx;
				 background: #2DD575;
				 border-radius: 5rpx;
				 margin-left: 38rpx;
				 margin-top: 18rpx;
			 }
			
		 .name{
			 
			 font-size: 32rpx;
			 font-family: PingFangSC-Regular, PingFang SC;
			 font-weight: 400;
			 color: #666666;
			 margin-left: 38rpx;
			 margin-top: 30rpx;
		   }
		   .inputview{
 				  height: 80rpx;
				  background: #F5F5F5;
				  border-radius: 8rpx;
				  margin-left:38rpx ;
				  margin-right: 38rpx;
				  padding-left:28rpx ;
				  margin-top: 20rpx;
				  font-size: 28rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #000000;	  
 			    
		   }
		   .chooseshengshiqu{
			   display: flex;
			   flex-direction: row;
			   position: relative;
			   align-items: center;
 			   margin-top: 20rpx;
			   .input{
				   height: 80rpx;
				   flex: 1;
 			   				  background: #F5F5F5;
			   				  border-radius: 8rpx;
 			   				  margin-right: 38rpx;
							  margin-left: 38rpx;
							  
			   				  padding-left:28rpx ;
			   				  font-size: 28rpx;
			   				  font-family: PingFangSC-Regular, PingFang SC;
			   				  font-weight: 400;
			   				  color: #000000;	  
			    			    
			   }
			  .rightImage{
			  					  width: 26rpx;
			  					  height: 26rpx;
			  					  position: absolute;
			  					  right: 50rpx;
			  }	 
		   }
			
			.chooseAdressView{
				height: 80rpx;
				background: #F5F5F5;
				border-radius: 8rpx;
				margin-left:38rpx ;
				margin-right: 38rpx;
				padding-left:28rpx ;
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 80rpx;
			}	
			  .detailAdressView{
				  width: 86.5%;
   				  margin-left: 38rpx;
				  margin-right: 380rpx;
  				  margin-top: 20rpx;
 				  background: #F5F5F5;
				  border-radius: 8rpx;
				  font-size: 28rpx;
				  font-family: PingFangSC-Regular, PingFang SC;
				  font-weight: 400;
				  color: #000000;
				  padding-top: 20rpx;
				  padding-left: 20rpx;
			  }
			  .sexview{
				  display: flex;
				  flex-direction: row;
				  align-items: center;
				  margin-top: 40rpx;
				  .sexImage{
				  			  width: 24rpx;
				  			  height: 24rpx; 
							  margin-left: 38rpx;
 				  }
					  
				  .selecttext{
					  
					  font-size: 32rpx;
					  font-family: PingFangSC-Semibold, PingFang SC;
					  font-weight: 600;
					  color: #333333;
					  margin-left: 15rpx;
					  margin-right: 20rpx;
				  }
					  
				  .unselecttext{
					  font-size: 32rpx;
					  font-family: PingFangSC-Semibold, PingFang SC;
					  font-weight: 600;
					  color: #666666;
					  margin-left: 15rpx;
					  margin-right: 20rpx;
					  
				  }
			  } 
		.bottomview{
			margin-top: 52rpx;
						  display: flex;
						  flex-direction: row;
		   justify-content: space-around;
						margin-bottom: 68rpx;	 
						 .baocun{
							 width: 280rpx;
							 height: 80rpx;
							 border-radius: 40rpx;
							 border: 2px solid #2AD36B;
							 
							 font-size: 28rpx;
							 font-family: PingFangSC-Medium, PingFang SC;
							 font-weight: 500;
							 color: #2AD36B;
							 line-height: 80rpx;
		 					 text-align: center;
							 
						 } 
						 .jixupingding{
							 width: 280rpx;
							 height: 80rpx;
							 background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
							 background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
							 box-shadow: 0px 10rpx 14rpx 0rpx rgba(49, 216, 128, 0.33);
							 border-radius: 40rpx;
							 text-align: center;
							 font-size: 28rpx;
							 font-family: PingFangSC-Medium, PingFang SC;
							 font-weight: 500;
							 color: #FFFFFF;
							 line-height: 80rpx;
							 
						 }
		}
		  
		  }
			  
		  
	}

</style>
