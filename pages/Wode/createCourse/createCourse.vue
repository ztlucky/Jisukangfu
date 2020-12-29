<template>
	<view class="viewPage">
		<view class="list border">
			<view class="item">
				<view class="itemLeft">
					<image src="/static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">课程标题</view>
				</view>
				<view class="itemRight">
					<input class="input" placeholder="请输入课程标题" v-model="zhiboTitle"></input>
					 <image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="itemLeft">
					<image src="/static/zhibo/icon_fenlei.png"></image>
					<view class="hidden">选择分类</view>
					  
				</view>
				<view class="itemRight">
					<picker @change="bindPickerChange" :value="index" :range="category" range-key="name">
					                 <view class="hidden">{{selectCategroy}}</view> 
					                  </picker>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		<view class="onLoadCover border" @click="getCover">
			<image mode="aspectFill" :src="cover.imageList.length!=0?cover.imageList[0]:'/static/zhibo/img_fengmian.png'"></image>
			<view >上传封面</view>
		</view>
		<view class="course border">
			<!-- <view class="selectedItem">
				<view class="selectedTitle" @click="selectedFilePDF">
					<image src="/static/icon_shipin.png"></image>
					<view class="">上传课程视频</view>
				</view>
				<view class="selectedFile border_">
					<video :src="item" v-for="(item , index) in material.videoList"></video>
					<image src="/static/zhibo/img_tianjia.png" @click="getMaterial"></image>
				</view>
			</view> -->
			<view class="top">
				<textarea placeholder="请输入课程的文字内容（选填）…" @input="input"></textarea>
				<!-- <view class="topImageList">
					<view v-for="(v,k) in imageList" :key="k" :class="'imageItem '+((k)%3 == 1?'imageItem1':'imageItem')" >
						<image mode="aspectFill" :src="v"></image>
						<image src="/static/icon_delete.png" class="delete" @click="deleteImage(k)"></image>
					</view>
					<image  src="/static/zhibo/img_tupian.png" :class="'imageItem imageAdd '+((imageList.length)%3 == 1?'imageItem1':'imageItem')" @click="getImages"></image>
				</view> -->
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/zhibo/icon_zhuchiren.png"></image>
					<view class="">选择主持人</view>
				</view>
				<view class="selectedFile" @click="chooseHost">
					 
				  <view  v-for="(item,index) in hostList" :key= "index" class="hostview">
					  <image :src="item.sex == 1 ?'/static/gongzuotai/icon_nan.png':'/static/gongzuotai/icon_nv.png'" ></image>
 					<text>{{item.name}}</text>
				  	
				  </view>
					<image src="/static/zhibo/img_tianjia.png"></image>
					
				</view>
			</view>
			<view class="selectedItem">
				<view class="selectedTitle">
					<image src="/static/zhibo/icon_sucai.png"></image>
					<view class="">选择素材（仅限MP4和PDF文件）</view>
				</view>
				<view class="selectedFile">
					<view  v-for="(item,index) in material.videoFile" @click="lookFileInfo('video',index)" :key= "index" class="hostview">
						 <image  src="/static/icon_wenjian@2x.png"></image>
						<view class="fileName hidden">{{item.name}}</view>
					</view>
					<view  v-for="(item,index) in material.pdfFile" @click="lookFileInfo('pdf',index)" :key= "index + 1568" class="hostview">
						 <image  src="/static/icon_wenjian@2x.png"></image>
						<view class="fileName hidden">{{item.name}}</view>
					</view>

					<image class="addFile" src="/static/zhibo/img_tianjia.png" @click="getMaterial"></image>
					<view style="width:20rpx;height: 10rpx;"></view>
				</view>
			</view>
		</view>
		<view class="price border selectedItem">
			<view class="selectedTitle notBorder">
				<image src="/static/zhibo/icon_jine.png"></image>
				<view class="">金额</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">价格</view>
				<view class="priceItemRight">
					<input class="priceItemInput"  placeholder="输入价格" v-model="cost"></input>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">会员价格</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入会员价格" v-model="memberCost"> </input>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">优惠券个数</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入优惠券个数" v-model="couponsNumber"></input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="priceItem">
				<view class="priceItemLeft">优惠券价格</view>
				<view class="priceItemRight">
					<input class="priceItemInput" placeholder="输入优惠券价格" v-model="couponsPrice"> </input>
					<image src="../../../static/icon/me_lise_more.png"></image>
				</view>
			</view>
			<view class="item" style="margin-left: 0;border-bottom: 0;">
				<view class="itemLeft">
					<image src="/static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">邀请码人数</view>
				</view>
				<view class="itemRight">
					<input class="input" placeholder="请输入邀请码人数" v-model="code"></input>
					 <image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view>
		</view>
		
		<view class="list border">
			<view class="item">
				<view class="itemLeft">
					<image src="/static/zhibo/icon_biaoti.png"></image>
					<view class="hidden">课程可见性</view>
				</view>
				<view class="itemRight">
					<view class="hidden2" v-if="isvisiable == 1"> 全部可见</view>
					<view class="hidden2" v-if="isvisiable !=1"> 部分可见</view>
					
					<switch  color="#09BB07" style="transform:scale(0.7,0.7) ;"  @change="switchChange" checked="true"  ></switch>
					 
				</view>
			</view>
			<!-- <view class="item">
				<view class="itemLeft">
					<image src="/static/zhibo/icon_guankan.png"></image>
					<view class="hidden">如何查看</view>
				</view>
				<view class="itemRight">
					<picker @change="bindPickerChangeChakan" :value="chakanIndex" :range="chakanType">
					                 <view class="hidden2">{{chakanType[chakanIndex]}}</view>
					                  </picker>
					<image src="/static/icon/me_lise_more.png"></image>
				</view>
			</view> -->
		</view>
		<view class="save" @click="creatCourseAction">创建课程</view>	
		<choose ref="chooesFile" :image="isAddImage" :count="count" :video="isAddVideo" :pdf="isAddPDF"></choose>
		<w-picker
		         :visible.sync="visibleTime"
		         mode="shortTerm" 
		         startYear="2017" 
		         endYear="2030"
		         :value="rangeVal"
		         :current="true"
				  fields="day"
			     :second="false"
 		         @confirm="confirmtime"
		         @cancel="onCancel"
		         ref="starttimeTerm" 
		     ></w-picker>
			  
			 
				 <w-picker
				        :visible.sync="visble"
				        mode="time"
  				        :current="false"
						:second="false"
				        :disabledAfter="false"
				        @confirm="confirmEndtime"
				        @cancel="onEndtimeCancel"
				        ref="endtimeTerm" 
				    ></w-picker>
	</view>
</template>

<script>
	import choose from "@/components/chooes-file/chooes-file.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
    import onloadImage from "../../../utils/loadImage.js"
 import request from '../../../utils/util.js'
 
	export default {
		data() {
			return {
				zhiboTitle:'',
				imageList:[],
				tempFile:[],
				rangeVal:'',
				value:'',
				visble:false,
				starttime:"",
				endtime:"",
				year:0,
				month:0,
				day:0,
				hour:0,
				minte:0,
				endHour:0,
				endMinute:0,
				index:0,
				selectCategroy:"分类",
				category:[],
				cost:"",//价格
				memberCost:"",
				isvisiable:1,//是否全部可见
				ischeck:true,//默认全部可见
				chakanType:["无限查看","验证码查看","收费查看"],
				hostList:[],//主持人列表
 				chakanIndex:0,
 				currentDay:"",
				visibleTime:false,
				isAddImage:true,
				isAddVideo:false,
				isAddPDF:false,
				count:1,
				code:"",
				cover:{
					imageList:[],
					tempFile:[]
				},
				material:{
					videoList:[],
					videoFile:[],
					pdfList:[],
					pdfFile:[]
				},
				uploadImageUrls:[],//获取的最终的图片链接
				couponsPrice:'',
				couponsNumber:''
			}
		},
		components:{
				choose
		},
		onShow() {
			 
			 
 		},
		onLoad() {
			this.addEvent();
			this.getCategory();
		},
		onUnload(){
			uni.$off();
		},
		methods: {
			showTimeChoose(){
				this.visibleTime = !this.visibleTime
			},
			showendTimeChoose(){
				if(this.starttime.length == 0){
					uni.showToast({
						title:"请先选择开始时间",
						icon:'none'
					})
				}else{
					this.visble = !this.visble
					
				}
				
			},
			lookFileInfo(type,index){
				let content = '';
				let that = this;
				if(type == 'pdf'){
					content = this.material.pdfFile[index].name
				}else{
					content = this.material.videoFile[index].name
				}
				uni.showModal({
					title:type == 'pdf'?'PDF':'视频'+'文件',
					content:`当前操作的文件为 ${content}`,
					confirmText:'删除文件',
					cancelText:'取消操作',
					success(res) {
						if(res.confirm){
							if(type == 'pdf'){
								that.material.pdfFile.splice(index,1);
								that.material.pdfList.splice(index,1);
							}else{
								that.material.videoFile.splice(index,1);
								that.material.videoList.splice(index,1);
							}
						}
					}
				})
			},
			confirmtime(e){
				this.starttime = e.result
				  var date = new Date(Date.parse(e.result.replace(/-/g, "/"))); 
				    this.month = date.getMonth() + 1; 
					this.day = date.getDate(); 
                     this.year = date.getFullYear(); 
                   this.hour = date.getHours()
				   this.minte = date.getMinutes()	
 			},
			onCancel(){
				
			},
			onEndtimeCancel(){
				
			},
			confirmEndtime(e){
 				this.endHour = e.result.substring(0,2);
				this.endMinute = e.result.substring(3,5);
				console.log(parseInt(this.endHour))
  				if(parseInt(this.endHour) <parseInt(this.hour)){
					this.endtime = "";
					uni.showToast({
						title:"结束时间必须大于开始时间",
						icon:'none'
					})
				}else if(parseInt(this.endHour) ==parseInt(this.hour)){
					if(parseInt(this.endMinute)<=parseInt(this.minte)){
						uni.showToast({
							title:"结束时间必须大于开始时间",
							icon:'none'
						})
						this.endtime = "";
							
						 
					}else{ 
						this.endtime = this.year+"-"+this.month+"-"+this.day+" "+e.result
						
					}
				}else{
					this.endtime = this.year+"-"+this.month+"-"+this.day+" "+e.result
					
				}
 			},
			//获取分类
			getCategory() {
				var that = this;
				this.$app.request({
					url: this.$api.shouye.getcourseCategoryList,
					method: 'GET',
					dataType: 'json',
					success: res => {
 						if (res.code == 200) {
							console.log("sss")
							
							console.log(res)
							that.category = res.result.records;
							console.log(that.category[0].name)
							 
						} else {
							this.$alert(res.msg);
						}
					},
					complete: res => {}
				});
			},
			//选择主讲人
			chooseHost(data){
				console.log(data);
				let testStr = encodeURIComponent(JSON.stringify(this.hostList));//JSON.stringify(数组)来把这个数组变成一个字符串

				uni.navigateTo({
					url:'/pages/Zhibo/ChooseHost/ChooseHost?hostlist='+testStr,
					animationDuration:300,
					animationType:'slide-in-right'
				})
			},
			  bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
						this.selectCategroy = this.category[this.index].name
			        },
					//可见按钮点击
					switchChange(){
						this.ischeck = !this.ischeck
						if(this.ischeck){
							this.isvisiable = "全部可见"
							
						}else{
							this.isvisiable = "部分可见"
						}
					},
					bindPickerChangeChakan: function(e) {
					          console.log('picker发送选择改变，携带值为', e.target.value)
					          this.chakanIndex = e.target.value
					      },
										//可见按钮点击
										switchChange(){
											this.ischeck = !this.ischeck
											if(this.ischeck){
												this.isvisiable =1
												
											}else{
												this.isvisiable =2
											}
										},
  			addEvent(){
				let that = this;
				uni.$on("getImage",res=>{
					switch (that.fileType){
						case 'cover':
						that.cover.imageList = res.res.tempFilePaths;
						that.cover.tempFile = res.res.tempFiles;
						console.log(res.res);
						break;
					}
				})
				uni.$on("getVideo",res=>{
					console.log(res);
					switch (that.fileType){
						case 'material':
							that.material.videoList.push(res.res.tempFilePath);
							that.material.videoFile.push({
								value:res.res,
								type:'video',
								name:res.res.tempFilePath.split('/')[res.res.tempFilePath.split('/').length-1]
							});
							console.log(that.material.videoList,that.material.videoFile)
						break;
					}
				})
				uni.$on("getFile",res=>{
					console.log(res);
					this.material.pdfList.push(res.res.fullPath);
					this.material.pdfFile.push(res.res);
				})
				//选择主持人
 				 uni.$on("chooseHost",(options)=>{
				         that.hostList =  JSON.parse(options.selectList)
						 console.log( that.hostList)
 				     })
				
			},
			showChoose(){
				this.$refs.chooesFile.cancel(true);
			},
			getCover() {
				let that = this;
				console.log(that.cover.imageList)
				if(this.cover.imageList.length !=0){
					uni.showModal({
						title:"提示",
						content:'请选择你的操作',
						confirmText:'更换图片',
						cancelText:'查看原图',
						success(res) {
							if(res.confirm){
								that.isAddImage = true;
								that.isAddVideo = false;
								that.isAddPDF = false;
								that.count = 1;
								that.fileType = 'cover';
								that.showChoose();
							}else{
								console.log(that.cover.imageList)
								uni.previewImage({
									current:0,
									urls:that.cover.imageList
								})
							}
						}
					})
				}else{
					that.isAddImage = true;
					that.isAddVideo = false;
					that.isAddPDF = false;
					that.count = 1;
					that.fileType = 'cover';
					that.showChoose();
				}
				
				
			},
			getMaterial(){
				this.isAddImage = false;
				this.isAddVideo = true;
				this.isAddPDF = true;
				this.count = 9;
				this.fileType = 'material';
				this.showChoose();
			},
			getImages(){
				let that = this;
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						console.log(res);
				        // 预览图片
				        that.imageList = that.imageList.concat(res.tempFilePaths);
						that.tempFile = that.tempFile.concat(res.tempFiles)
				    }
				    });
			},
			deleteImage(index){
				this.tempFile.splice(index,1);
				this.imageList.splice(index,1);
			},
			input(e){
				this.value = e.detail.value
			},
			//创建课程
			creatCourseAction(){
 				let that = this;
 				
				if(this.zhiboTitle==''){
					uni.showToast({
						title:'请输入课程标题',
						icon:'none'
					})
				}else if (this.selectCategroy == "分类"){
					uni.showToast({
						title:'请选择课程分类',
						icon:'none'
					})
				}else if(this.cover.imageList.length == 0){
                  uni.showToast({
						title:'请设置该课程封面',
						icon:'none'
					})
				}else if(this.hostList.length == 0){
                  uni.showToast({
						title:'请选择主持人',
						icon:'none'
					})
				}else if(this.cost.length==0){
                  uni.showToast({
						title:'请输入课程价格',
						icon:'none'
					})
				}else if(this.memberCost.length==0){
                  uni.showToast({
						title:'请输入会员价格',
						icon:'none'
					})
				}else if(this.code==''){
                  uni.showToast({
						title:'请输入邀请码人数',
						icon:'none'
					})
				}else{
					if(this.material.pdfFile.length == 0&& this.material.videoFile.length == 0){
						let tempFiles = that.cover.tempFile;
						let tempFilePaths = that.cover.imageList;
						onloadImage.init({
							tempFiles,
							tempFilePaths
						},(res,str)=>{
							let coverUrl = res.imageUrl[0];
							this.creatCourse(coverUrl,'');
						}).upload();
					}else{
						let tempFiles = that.cover.tempFile;
											let tempFilePaths = that.cover.imageList;
											tempFiles = tempFiles.concat(that.material.pdfFile)
											tempFiles = tempFiles.concat(that.material.videoFile);
											tempFilePaths = tempFilePaths.concat(that.material.pdfList)
											tempFilePaths = tempFilePaths.concat(that.material.videoList)

											onloadImage.init({
												tempFiles,
												tempFilePaths
											},(res,str)=>{
												let coverUrl = res.imageUrl[0];
												let file = [];
												let pdfFile = [];
												let videoFile = [];
												if(that.material.pdfFile){
													that.material.pdfFile.map((v,k)=>{
														pdfFile.push({
															type:'pdf',
															value:res.imageUrl[k+1]
														})
													})
												}
												if(that.material.videoFile){
													that.material.videoFile.map((v,k)=>{
														videoFile.push({
															type:'video',
															value:res.imageUrl[k+1+pdfFile.length]
														})
													})
												}
												file = pdfFile.concat(videoFile);
												file = JSON.stringify(file);
												this.creatCourse(coverUrl,file);
											}).upload();
					}
					
					
				  }
 			},
			async creatCourse(coverUrl,file){
				let that = this;
				
				// await this.getHostList(); 
 				let type = this.category[this.index].id
				var lecIds="";
				for (var i = 0; i < this.hostList.length; i++) {
					let item = this.hostList[i]
					
				  lecIds+=item.id+",";	
				}
  				
 					//调用创建课程的接口
			   this.$app.request({
			   	url: this.$api.course.addCourse,
			   	method: 'POST',
			   	data: {
			   		cost:that.cost,
			   		memberCost:that.memberCost,
			   		cover:that.uploadImageUrls[0],
			   		startTime:that.starttime,
			   		endTime:that.endtime,
			   		lecturerIds: lecIds,//主持人
			   		name:that.zhiboTitle,
			   		userId:getApp().globalData.userId,
			   		presentation:that.value,
			   		type:type,
			   		isVisible:that.isvisiable,
					invitationCodeCount:that.code,
					coverUrl,
					file,
					invitationCodeCount:that.code,
					couponCount:that.couponsNumber?that.couponsNumber:0,
					coupon:that.couponsPrice?that.couponsPrice:0,
			   	},
			   	dataType: 'json',
			   	success: res => {
 			   		if (res.code == 200) {
 			         uni.showToast({
			   	       title:res.message,
                        icon:"none"
			              });
						  setTimeout(()=>{
							  uni.navigateBack();
						  },500)
			   		} else {
			   			this.$alert(res.msg);
			   		}
			   	},
			   	complete: res => {}
			   });
	           
  
 			},
			 
			//上传图片
			uploadCover(){
 				
  				let that = this;
 				
 				onloadImage.init({
 					tempFiles:that.cover.tempFile.concat(that.tempFile),
 					tempFilePaths:that.cover.imageList.concat(that.imageList)
 				},(data,str)=>{
 					console.log(data.imageUrl,str);
 				 
 				}).upload();
			},
			selectedFilePDF(){
				console.log("1111")
				this.showChoose();
			}
			
			
		}
	}
</script>

<style scoped>
	.viewPage{
		width: 750rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		overflow: hidden;
		padding-bottom: 174rpx;
	}
	.border{
		margin-top:30rpx;
	}
	.list{
		width: 750rpx;
		background-color: #FFFFFF;
	}
	.item{
		width:720rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 30rpx;
		border-bottom: 4rpx solid #F0F0F0;
	}
	.list .item:last-child{
		border:none
	}
	.item .itemLeft{
		display: flex;
		align-items: center;
	}
	.itemLeft image{
		width:40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.item .itemLeft view{
		width: 160rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28rpx;
	}
	 
	.itemRight{
		display: flex;
		align-items: center;
		 
	}
	 
	.input{
		width:400rpx ;
		text-align: right;
 		font-size:26rpx;
 		/* margin-right: 40rpx; */
		text-align: right;
 	}
	.itemRight view{
		width:300rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
		text-align: right;
	}
	.itemRight image{
		width:16rpx;
		height: 30rpx;
		margin-right: 30rpx;
		margin-left: 24rpx;
	}
	.onLoadCover{
		width: 750rpx;
		height: 186rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
	}
	.onLoadCover image{
		width:126rpx;
		height: 126rpx;
		padding-left: 30rpx;
		padding-right: 22rpx;
	}
	.top{
		width:690rpx;
		padding:34rpx 30rpx;
		background-color: #FFFFFF;
		padding-bottom: 4rpx;
	}
	.topImageList{
		
		display: flex;
		flex-wrap: wrap;
	}
	.top textarea{
		height: 100rpx;
		margin-bottom: 20rpx;
		font-size:28rpx;
	}
	.imageItem{
		position: relative;
		width:184rpx;
		height: 184rpx;
		margin-bottom: 30rpx;
	}
	.imageItem1{
		margin:30rpx;
		margin-top: 0rpx;
	}
	.imageItem image:nth-child(1){
		position: absolute;
		top:0;
		left: 0;
		width:184rpx;
		height: 184rpx;
	}
	.imageAdd{
		/* background-color: red; */
		
		background: #F5F5F5;
		border-radius: 8rpx;
		border: 2rpx dashed #DEDEDE;
	}
	.imageAdd image:nth-child(1){
		width:50rpx;
		height: 50rpx;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.imageItem .delete{
		width:28rpx;
		height: 28rpx;
		position: absolute;
		top:8rpx;
		right: 8rpx;
		/* background-color: #007AFF; */
		border-radius: 50%;	
	}
	.textView{
		width:690rpx;
		padding:0 30rpx;
		background-color: #FFFFFF;
		margin-top:30rpx;
		padding-bottom: 30rpx;
	}
	.title{
		color:#999999;
		font-size:28rpx;
		padding-top:24rpx;
	}
	.textView input{
		font-size:28rpx;
		color:#333333;
		line-height: 60rpx;
		height: 60rpx;
		/* padding: 0 20rpx; */
	}
	.textView view:nth-child(3){
		padding-top:38rpx;
		border-top:2rpx solid #E5E5E5;
	}
	.textView textarea{
		height: 80rpx;
		font-size:28rpx;
		width:100%;
		border-bottom: 2rpx solid #E5E5E5;
	}
	.selectedItem{
		width:720rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
	}
	.selectedTitle{
		border-top:2rpx solid #F0F0F0;
		display: flex;
		height: 98rpx;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.selectedTitle image{
		width:40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.selectedFile{
		width:710rpx;
		display: flex;
		padding-bottom: 34rpx;
		overflow-x: scroll;
	}
	.selectedFile >image , .selectedFile >view{
		flex-shrink: 0;
	}
	.addFile{
		/* padding-right: 40rpx; */
	}
	.fileName{
		max-width: 150rpx;
	}
	.hostview{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: 10rpx;
	}
	.hostview image{
		width:88rpx;
		height: 88rpx;
		border-radius: 50%;
		
		
	} 
	.hostview text ,.hostview view{
		 font-size: 20rpx;
		 margin-top: 10rpx;
		 color: #000000;
		
	} 
	.selectedFile image{
		width:88rpx;
		height: 88rpx;
		border-radius: 50%;
	}
	.notBorder{
		border: none;
	}
	.priceItem{
		width:690rpx;
		padding-right: 30rpx;
		display: flex;
		height: 54rpx;
		justify-content: space-between;
		align-items: center;
	}
	.priceItemLeft{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34rpx;
	}
	.priceItemRight{
		display: flex;
		align-items: center;
	}
	.priceItemInput{
		text-align: right;
		font-size: 24rpx;
		margin-right: 30rpx;
 	}
	.priceItemRight view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 34px;
		margin-right: 26rpx;
	}
	.priceItemRight image{
		width:16rpx;
		height: 30rpx;
 	}
	.save {
		position: fixed;
		bottom: 38rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #31D880 0%, #24CE59 100%);
		box-shadow: 0px 10rpx 14rpx 0px rgba(49, 216, 128, 0.33);
		border-radius: 40rpx;
	
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
	.border_{
		border-bottom:2rpx solid #F0F0F0;
	}
</style>
