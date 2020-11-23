 let apiRoot = 'http://www.huaxiakangfu.com:8090/';
//let apiRoot = 'http://3237632k3k.goho.co/jeecg-boot/';
let api = {
	common: {
		aboutUs: apiRoot + 'common/aboutUs.html',
		verify: apiRoot + "common/verify.html",
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
		getcourseCategoryList:apiRoot + "/datatype/datatype/list",
		//推荐课程列表
		getRecommendcourseList:apiRoot + "app/home_page/recommendedCourses",
		//推荐学习班
		getRecommendClassList:apiRoot + "app/home_page/recommendedClass",
		//朋友在看
		getPengyouzaikanList:apiRoot +"app/home_page/getFriendLook",
		//轮播图
		getBannerImageList:apiRoot +"app/home_page/queryList"
	},
	pingdingliangbiao:{
		//获取评定列表List
	    getPingDingliebiaoList:apiRoot + "app/ratingScale/listByUser",
		//评定量表下的分类
		getPingDingItemList:apiRoot + "app/questionType/listByRatingScale",
		addQuestion:`${apiRoot}question/question/add`,
		addType:`${apiRoot}rating_scale_classify/ratingScaleClassify/add`,
		getTypeList:`${apiRoot}rating_scale_classify/ratingScaleClassify/list`
		
	},
	user: {
		//获取验证码
		getcode:apiRoot + "app/msg/sendcode",
		//手机验证码登陆
		loginCode: apiRoot + "app/user/loginByPhoneCode",
		//手机密码登陆
		loginPwd: apiRoot + "app/user/loginByPasswd",
		//密码重置
		resetPwd: apiRoot + "app/user/updateByPhoneCode",
		//设置密码
		setPwd:apiRoot + "app/user/setPasswd",
		
		
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
		addSymptom:`${apiRoot}symptom/symptom/add`
 	},
	wechat: {
		miniAppLogin: apiRoot + 'wechat/miniAppLogin',
		mpLogin: apiRoot + 'wechat/mpLogin',
		devLogin: apiRoot + 'wechat/devLogin',
		mpConfig: apiRoot + 'wechat/mpConfig',
	},
	oss:{
		'getPictureUrl':`${apiRoot}app/ali_oss/getPictureUrl`
	},
	notes:{
		"addNotes":`${apiRoot}study_notes/studyNotes/add`,
		"getList":`${apiRoot}study_notes/studyNotes/list`,
		"getInfo":`${apiRoot}study_notes/studyNotes/queryById`
	}
};
export default api;
