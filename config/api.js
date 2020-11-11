let apiRoot = 'http://www.huaxiakangfu.com:8090/';
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
		getcourseCategoryList:apiRoot + "app/course/getCourseType",
		//推荐课程列表
		getRecommendcourseList:apiRoot + "app/course/AllCourseList",
		//推荐学习班
		getRecommendClassList:apiRoot + "app/class/classList",
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
		getillnessList:apiRoot+"app/illness/listByUser",
		//添加患者
 	},
	wechat: {
		miniAppLogin: apiRoot + 'wechat/miniAppLogin',
		mpLogin: apiRoot + 'wechat/mpLogin',
		devLogin: apiRoot + 'wechat/devLogin',
		mpConfig: apiRoot + 'wechat/mpConfig',
	},
};
export default api;
