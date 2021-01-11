 
 // let apiRoot = 'http://kfy.huaxiakangfu.com/';
  let apiRoot = 'http://3237632k3k.goho.co/jeecg-boot/';
 
let api = {
	common: {
		aboutUs: apiRoot + 'common/aboutUs.html',
		verify: apiRoot + "common/verify.html",
		//检测版本更新
		checkVersion:apiRoot+'app_update/appUpdate/list',
	},
	article: {
		index:  'https://life.weisite.org/api/article/index.html',
		category:  'https://life.weisite.org/api/article/category.html',
		detail: apiRoot + 'article/detail.html',
		comment: apiRoot + 'article/comment.html',
		commentDetail: apiRoot + "article/commentDetail.html",
		commentReply: apiRoot + "article/commentReply.html",
		addComment: apiRoot + 'article/addComment.html',
		addReply: apiRoot + 'article/addReply.html',
		like: apiRoot + "article/like.html",
		commentLike: apiRoot + "article/commentLike.html",
		commentReplyLike: apiRoot + "article/commentReplyLike.html",
		favorite: apiRoot + "article/favorite.html",
		favoriteList: apiRoot + "article/favoriteList.html",
	},
		
	shouye:{
		//首页接口
		//获取课程类型列表
		getcourseCategoryList:apiRoot + "datatype/datatype/list",
		//推荐课程列表
		getRecommendcourseList:apiRoot + "app/home_page/recommendedCourses",
		//推荐学习班
		getRecommendClassList:apiRoot + "app/home_page/recommendedClass",
		//朋友在看
		getPengyouzaikanList:apiRoot +"app/home_page/getFriendLook",
		//轮播图
		getBannerImageList:apiRoot +"app/home_page/queryList",
		search:`${apiRoot}app/search/searchByNameLike`
	},
	zhibo:{
		//直播详情
		getLivecourseDetailInfo:apiRoot +"live/live/queryById",
		//收藏直播 
 		favLivecourse:apiRoot +"user_live_bind/userLiveBind/add",
		//取消收藏直播
		unfavLivecourse:apiRoot +"user_live_bind/userLiveBind/delMyLive",
		//添加创建直播
		addlive:apiRoot +"live/live/add",
		//获取直播列表
		livelist:apiRoot +"live/live/list",
		//获取直播推流地址
		livePushurl:apiRoot +"live/live/getPushUrl",
		//获取直播拉流地址
		livePullurl:apiRoot +"live/live/getPullUrl",
		//开始直播，修改直播状态
		startLive:apiRoot +"live/live/startLive",
		//结束直播
		endLive:apiRoot +"live/live/startLive",
		//发送消息
		sendMessage:apiRoot +"message/message/add",
		//获取消息列表
		getMessageList:apiRoot +"message/message/list",
		//获取在看观看直播人数
		
		getOnlineNumber:apiRoot+"live/live/seeLiveCount"
		
	},
	dingdan:{
		//获取优惠券
		getcoupon:apiRoot +"ticket/appTicket/list",
		//创建订单
		creatOrder:apiRoot +"order/appOrder/add",
		//微信充值
		weixinChongzhi:apiRoot +"app/recharge",
		//微信提现
		weixinentPay :apiRoot+"app/entPay"
		
		
	},
	pingdingliangbiao:{
		//获取评定列表List
	    getPingDingliebiaoList:apiRoot + "app/ratingScale/listByUser",
		//评定量表下的分类
		getPingDingItemList:apiRoot + "app/questionType/listByRatingScale",
		addQuestion:`${apiRoot}question/question/add`,
		getTypeList:`${apiRoot}rating_scale_classify/ratingScaleClassify/list`,
		getList:`${apiRoot}rating_scale/ratingScale/list`,
		getQuestionList:`${apiRoot}question/question/list`,
		getQuestionType:`${apiRoot}question_classify/questionClassify/list`,
		add:`${apiRoot}rating_scale/ratingScale/add`,
		addQuestionType:`${apiRoot}question_classify/questionClassify/add`,
		deleteQuestionType:`${apiRoot}rating_scale_classify/ratingScaleClassify/deleteBatch`,
		deleteQuestion:`${apiRoot}question/question/deleteBatch`,
		getQuestionInfo:`${apiRoot}question/question/queryById`,
		editQuestionInfo:`${apiRoot}question/question/edit`,
		getInfo:`${apiRoot}rating_scale/ratingScale/queryById`,
		addResult:`${apiRoot}assess_result/assessResult/add`,
		getResult:`${apiRoot}assess_result/assessResult/queryById`,
		getResultList:`${apiRoot}assess_result/assessResult/list`
		
	},
	user: {
		//获取验证码
		getcode:apiRoot + "app/msg/sendcode",
		//手机验证码登陆
		loginCode: apiRoot + "app/user/loginByPhoneCode",
		//手机密码登陆
		loginPwd: apiRoot + "user/user/loginByAccount",
		//密码重置
		resetPwd: apiRoot + "app/user/updateByPhoneCode",
		//设置密码
		setPwd:apiRoot + "user/user/updatePWD",
		//获取 用户-康复师列表
		hostList:apiRoot + "user/user/list",
		login: apiRoot + "user/login.html",
		register: apiRoot + "user/register.html",
		index: apiRoot + "user/index.html",
		userInfo: apiRoot + "user/userInfo.html",
		updateAvatar: apiRoot + "user/updateAvatar.html",
		upload: apiRoot + "user/upload.html",
		setting: apiRoot + "user/setting.html",
		updatePassword: apiRoot + "user/updatePassword.html",
		forgot: apiRoot + "user/forgot.html",
		updatePasswordByMobile: apiRoot + "user/updatePasswordByMobile.html",
		feedback: apiRoot + "user/feedback.html",
		logout: apiRoot + "user/logout.html",
		getOrderList:`${apiRoot}order/appOrder/list`,//获取用户订单列表
		getUserInfo:`${apiRoot}user/user/queryById`,
		editUserInfo:`${apiRoot}user/user/edit`,
		setUserPhone:`${apiRoot}user/user/updatePhone`,
		login:`${apiRoot}user/user/loginByPhoneCode`,//手机号登陆 注册以及短信验证
		addQualification:`${apiRoot}qualification_audit/qualificationAudit/add`,//资质审核
		getMemberList:`${apiRoot}member/member/list`,
		getQualificationList:`${apiRoot}qualification_audit/qualificationAudit/list`,
		getNowMemory:`${apiRoot}user/user/updateMemoryUsedQuantity`,//获取当前储量
		//移除消息
		 removeuserFormessage:`${apiRoot}message/message/delNeedPushOfUser`,
		getBillList:`${apiRoot}bill/bill/list`,
		decideQualification:`${apiRoot}qualification_audit/qualificationAudit/decideQualification`,//资质判断
		isUseWorkbench:`${apiRoot}doctor/doctor/isUseWorkbench`,//是否有权限使用工作台
		getTicketList:`${apiRoot}ticket/appTicket/list`,
		addConcern:`${apiRoot}concern/concern/add`,
		deleteConcern:`${apiRoot}concern/concern/unfollow`
		
	},
	huanzhe:{
		//获取病症
		getillnessList:apiRoot+"illness/illness/list",
		//我的患者列表
		getMyPatientsList:`${apiRoot}patient/patient/list`,
		getInfo:`${apiRoot}patient/patient/queryById`,
		getSymptomsList:`${apiRoot}symptom/symptom/list`,
		addHuanZhe:`${apiRoot}patient/patient/add`,//添加患者
		addResult:`${apiRoot}assess_result/assessResult/add`,
		addMedical:`${apiRoot}medical_history/medicalHistory/add`,//添加病历
		addIllness:`${apiRoot}illness/illness/add`,
		addSymptom:`${apiRoot}symptom/symptom/add`,
		deleteIllness:`${apiRoot}illness/illness/deleteBatch`,
		editHuanZhe:`${apiRoot}patient/patient/edit`,
		getRehabilitationList:`${apiRoot}treatment/treatment/list`,//康复项目列表
		getRecordList:`${apiRoot}patient_record/patientRecord/list`,
		deleteSymptom:`${apiRoot}symptom/symptom/deleteBatch`,
		addRecord:`${apiRoot}patient_record/patientRecord/add`,
		getRecordInfo:`${apiRoot}patient_record/patientRecord/queryById`,
		addProgram:`${apiRoot}treatment_program/treatmentProgram/add`,//添加治疗项目
		getProgramList:`${apiRoot}treatment_program/treatmentProgram/list`,//获取治疗项目列表
		deleteProgram:`${apiRoot}treatment_program/treatmentProgram/deleteBatch`,
		addTreatment:`${apiRoot}treatment/treatment/add`,
		endXiangMu:`${apiRoot}treatment_record/treatmentRecord/add`,//结束项目
		editProgram:`${apiRoot}treatment/treatment/edit`,//编辑治疗项目
		getHomeInfo:`${apiRoot}user/user/hzHomePageData`,//获取咨询首页数据
		getDoctorList:`${apiRoot}user/user/queryYS`,
		getAllDoutorList:`${apiRoot}doctor/doctor/list`,
 	},
	wechat: {
		miniAppLogin: apiRoot + 'wechat/miniAppLogin',
		mpLogin: apiRoot + 'wechat/mpLogin',
		devLogin: apiRoot + 'wechat/devLogin',
		mpConfig: apiRoot + 'wechat/mpConfig',
	},
	oss:{
		'getPictureUrl':`${apiRoot}app/ali_oss/getPictureUrl`,
		'onLoadFile':`${apiRoot}app/ali_oss/uploadFile`,
		'onLoadVideo':`${apiRoot}app/ali_vod/uploadVideo`,
		'getVideoUrl':`${apiRoot}/app/ali_vod/getPlayInfoList`
			},
	notes:{
		"addNotes":`${apiRoot}study_notes/studyNotes/add`,
		"getList":`${apiRoot}study_notes/studyNotes/list`,
		"getInfo":`${apiRoot}study_notes/studyNotes/queryById`
	},
	work:{
 
		'getInfo':`${apiRoot}patient/patient/YSWorkbench`,
		'getCompareList':`${apiRoot}patient/patient/queryAKeyToCompare`,
		'workEndDate':`${apiRoot}doctor/doctor/queryById`,
		'editForte':`${apiRoot}doctor/doctor/editForte`
	},
	course:{
		"addCourse":`${apiRoot}course/course/add`,
		"getList":`${apiRoot}course/course/list`,
		//获取课程详情
		"getCoursedetail":`${apiRoot}course/course/queryById`,
		//课程关联
		"favCourse":`${apiRoot}user_course_bind/userCourseBind/add`,
		///取消关联
		"unfavCourse":`${apiRoot}user_course_bind/userCourseBind/delMyCourseList`
	},
	banji:{
		"getbanjiList":`${apiRoot}class/class/list`,
		"creatbanjiList":`${apiRoot}class/class/add`,
		"getInfo":`${apiRoot}class/class/queryById`,
		"favCourse":`${apiRoot}user_class_bind/userClassBind/add`,
		"unfavCourse":`${apiRoot}user_class_bind/userClassBind/delMyClass`
	},
	sys:{
		"onloadFile":`${apiRoot}sys/common/upload`,
		"getCustomerInfo":`${apiRoot}sys_set/sysSet/queryServiceInfo`
	},
	share:{
		'rebate':`${apiRoot}rebate/rebate/add`,
		'addTicket':`${apiRoot}ticket/appTicket/add`,
		'addRebateBind':`${apiRoot}user_rebate_bind/userRebateBind/add`
	}
 
};
export default api;
