
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/Daxue/Daxue","pages/work/pingDingLiangBiaoType/pingDingLiangBiaoType","pages/work/symptoms/symptoms","pages/work/pingDingLiangBiaoProblemType/pingDingLiangBiaoProblemType","pages/work/pingDingLiangBiao/pingDingLiangBiao","pages/work/disease/disease","pages/work/diseaseType/diseaseType","pages/work/pingDingLiangBiaoInfo/pingDingLiangBiaoInfo","pages/Wode/ziZhi/ziZhi","pages/work/pingDingLiangBiaoProblem/pingDingLiangBiaoProblem","pages/work/addNotes/addNotes","pages/work/createProblemType/createProblemType","pages/work/problemInfo/problemInfo","pages/work/createTextProblem/createTextProblem","pages/work/addSymptoms/addSymptoms","pages/Wode/live/live","pages/Zhibo/createLive/createLive","pages/Wode/banJi/banJi","pages/Wode/banJiDesc/banJiDesc","pages/Wode/course/course","pages/Wode/planInfo/planInfo","pages/Wode/addPlan/addPlan","pages/Wode/plan/plan","pages/Wode/editPlan/editPlan","pages/Wode/members/members","pages/WodeKangfu/simpleDoctorDesc/simpleDoctorDesc","pages/work/selectedProblemType/selectedProblemType","pages/work/editXiangMu/editXiangMu","pages/HuanzheDetail/huanZheInfo/huanZheInfo","pages/work/notesInfo/notesInfo","pages/Wode/measurement/measurement","pages/HuanzheDetail/evaluation/evaluation","pages/HuanzheDetail/recordInfo/recordInfo","pages/work/notesList/notesList","pages/work/createProblemInfo/createProblemInfo","pages/work/xiangMu/xiangMu","pages/HuanzheDetail/kangFuJiLu/kangFuJiLu","pages/HuanzheDetail/record/record","pages/WodeKangfu/doctorInfo/doctorInfo","pages/HuanzheDetail/addRecord/addRecord","pages/WodeKangfu/myDoctor/myDoctor","pages/WodeKangfu/allDoctor/allDoctor","pages/HuanzheDetail/addCaseHistory/addCaseHistory","pages/HuanzheDetail/addXiangMu/addXiangMu","pages/HuanzheDetail/kangfuxiangmu/kangfuxiangmu","pages/work/createTitleType/createTitleType","pages/work/createProblem/createProblem","pages/work/setBack/setBack","pages/work/problemType/problemType","pages/work/compare/compare","pages/work/history/history","pages/Gongzuotai/Gongzuotai","pages/WodeKangfu/WodeKangfu","pages/Wode/Wode","pages/Search/Search","pages/Message/Message","pages/Zhibo/Zhibo","pages/Daxue/Kaoshi/Kaoshi","pages/Daxue/Kecheng/Kecheng","pages/Daxue/XuexiBan/XuexiBan","pages/Daxue/TeacherDetail/TeacherDetail","pages/Daxue/Zhibodetail/Zhibodetail","pages/Daxue/KechengDetail/KechengDetail","pages/Daxue/BanjiDetail/BanjiDetail","pages/Order/ConfirmOrder/ConfirmOrder","pages/Login/Login/Login","pages/Login/PasswordLogin/PasswordLogin","pages/Login/ForgotPassword/ForgotPassword","pages/Login/PasswordLogin/ResetPassword/ResetPassword","pages/Login/SetPassword/SetPassword","pages/WodeHuanzhe/WodeHuanzhe","pages/HuanzheDetail/HuanzheDetail","pages/AddHuanzhe/AddHuanzhe","pages/Daxue/RecommendCourse/RecommendCourse","pages/Daxue/BanjiTuijian/BanjiTuijian","pages/KangfuPingdingListPage/KangfuPingdingListPage","pages/work/addPingDingLiangBiaoType/addPingDingLiangBiaoType","pages/KangfuMubiao/KangfuMubiao","pages/AboutUs/AboutUs","pages/Wode/PersonalInfo/PersonalInfo","pages/Wode/Zizhirenzheng/Zizhirenzheng","pages/Wode/ResetPassword/ResetPassword","pages/Wode/orderList/orderList","pages/Zhibo/ChooseHost/ChooseHost","pages/Wode/orderInfo/orderInfo","pages/Zhibo/StarLive/StarLive","pages/Zhibo/StarLive/test/test","pages/Zhibo/WatchLive/WatchLive"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#333333","selectedColor":"#31D8B1","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/Daxue/Daxue","iconPath":"static/icon_xuexi_moren.png","selectedIconPath":"static/icon_xuexi_xuanzhong.png","text":"学习"},{"iconPath":"static/icon_gongzuotai_morem.png","pagePath":"pages/Gongzuotai/Gongzuotai","selectedIconPath":"static/icon_gongzuotai_xuanzhong.png","text":"工作台"},{"iconPath":"static/icon_zixun_moren.png","pagePath":"pages/WodeKangfu/WodeKangfu","selectedIconPath":"static/icon_zixun_xuanzhong.png","text":"咨询"},{"iconPath":"static/icon_wode_moren.png","pagePath":"pages/Wode/Wode","selectedIconPath":"./static/icon_wode_xuanzhong.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"JisuKangfu","compilerVersion":"2.9.3","entryPagePath":"pages/Daxue/Daxue","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/Daxue/Daxue","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleNView":"false","scrollIndicator":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/work/pingDingLiangBiaoType/pingDingLiangBiaoType","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/symptoms/symptoms","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/pingDingLiangBiaoProblemType/pingDingLiangBiaoProblemType","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/pingDingLiangBiao/pingDingLiangBiao","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/disease/disease","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/diseaseType/diseaseType","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/pingDingLiangBiaoInfo/pingDingLiangBiaoInfo","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/Wode/ziZhi/ziZhi","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/pingDingLiangBiaoProblem/pingDingLiangBiaoProblem","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/addNotes/addNotes","meta":{},"window":{"navigationBarTitleText":"学习笔记","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/createProblemType/createProblemType","meta":{},"window":{"navigationBarTitleText":"评定量表","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/problemInfo/problemInfo","meta":{},"window":{"navigationBarTitleText":"评定量表","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/createTextProblem/createTextProblem","meta":{},"window":{"navigationBarTitleText":"评定量表","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/addSymptoms/addSymptoms","meta":{},"window":{"navigationBarTitleText":"添加分类","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/Wode/live/live","meta":{},"window":{"navigationBarTitleText":"我的直播","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","titleNView":{"splitLine":{"color":"#f2f2f2","height":"2px"}}}},{"path":"/pages/Zhibo/createLive/createLive","meta":{},"window":{"navigationBarTitleText":"创建直播","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black"}},{"path":"/pages/Wode/banJi/banJi","meta":{},"window":{"navigationBarTitleText":"我的班级","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","titleNView":{"splitLine":{"color":"#f2f2f2","height":"2px"}}}},{"path":"/pages/Wode/banJiDesc/banJiDesc","meta":{},"window":{"navigationBarTitleText":"班级详情","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","titleNView":{"splitLine":{"color":"#f2f2f2","height":"2px"}}}},{"path":"/pages/Wode/course/course","meta":{},"window":{"navigationBarTitleText":"我的课程","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black","titleNView":{"splitLine":{"color":"#f2f2f2","height":"2px"}}}},{"path":"/pages/Wode/planInfo/planInfo","meta":{},"window":{"navigationBarTitleText":"治疗方案","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/Wode/addPlan/addPlan","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/Wode/plan/plan","meta":{},"window":{"navigationBarTitleText":"我的方案","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/Wode/editPlan/editPlan","meta":{},"window":{"navigationBarTitleText":"方案编辑","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/Wode/members/members","meta":{},"window":{"navigationBarTitleText":"我的会员","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black"}},{"path":"/pages/WodeKangfu/simpleDoctorDesc/simpleDoctorDesc","meta":{},"window":{"navigationBarTitleText":"医生详情","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/selectedProblemType/selectedProblemType","meta":{},"window":{"navigationBarTitleText":"选择题目","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/editXiangMu/editXiangMu","meta":{},"window":{"navigationBarTitleText":"项目","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/huanZheInfo/huanZheInfo","meta":{},"window":{"navigationBarTitleText":"患者详情","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/notesInfo/notesInfo","meta":{},"window":{"navigationBarTitleText":"学习笔记","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/Wode/measurement/measurement","meta":{},"window":{"navigationBarTitleText":"康复评定","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/evaluation/evaluation","meta":{},"window":{"navigationBarTitleText":"康复评定","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/recordInfo/recordInfo","meta":{},"window":{"navigationBarTitleText":"患者记录","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/notesList/notesList","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/work/createProblemInfo/createProblemInfo","meta":{},"window":{"navigationBarTitleText":"评定量表","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/xiangMu/xiangMu","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/HuanzheDetail/kangFuJiLu/kangFuJiLu","meta":{},"window":{"navigationBarTitleText":"康复评定","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/record/record","meta":{},"window":{"navigationBarTitleText":"患者记录","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/WodeKangfu/doctorInfo/doctorInfo","meta":{},"window":{"navigationBarTitleText":"医生详情","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/addRecord/addRecord","meta":{},"window":{"navigationBarTitleText":"患者记录","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/WodeKangfu/myDoctor/myDoctor","meta":{},"window":{"navigationBarTitleText":"我的医生","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/WodeKangfu/allDoctor/allDoctor","meta":{},"window":{"navigationBarTitleText":"全部医生","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/addCaseHistory/addCaseHistory","meta":{},"window":{"navigationBarTitleText":"病例","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/addXiangMu/addXiangMu","meta":{},"window":{"navigationBarTitleText":"添加项目","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/HuanzheDetail/kangfuxiangmu/kangfuxiangmu","meta":{},"window":{"navigationBarTitleText":"康复项目","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/createTitleType/createTitleType","meta":{},"window":{"navigationBarTitleText":"评定量表","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/createProblem/createProblem","meta":{},"window":{"navigationBarTitleText":"评定量表","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/setBack/setBack","meta":{},"window":{"navigationBarTitleText":"后台设置","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/problemType/problemType","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/work/compare/compare","meta":{},"window":{"navigationBarTitleText":"一键比较","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/history/history","meta":{},"window":{"navigationBarTitleText":"历史患者","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/Gongzuotai/Gongzuotai","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":"false","scrollIndicator":"none","bounce":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/WodeKangfu/WodeKangfu","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/Wode/Wode","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","titleNView":{"buttons":[{"text":"","fontSrc":"/static/uni.ttf","fontSize":"22px","color":"#000000"}]}}},{"path":"/pages/Search/Search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/Message/Message","meta":{},"window":{"navigationBarTitleText":"信息"}},{"path":"/pages/Zhibo/Zhibo","meta":{},"window":{"navigationBarTitleText":"直播"}},{"path":"/pages/Daxue/Kaoshi/Kaoshi","meta":{},"window":{"navigationBarTitleText":"考试"}},{"path":"/pages/Daxue/Kecheng/Kecheng","meta":{},"window":{"navigationBarTitleText":"课程"}},{"path":"/pages/Daxue/XuexiBan/XuexiBan","meta":{},"window":{"navigationBarTitleText":"学习班"}},{"path":"/pages/Daxue/TeacherDetail/TeacherDetail","meta":{},"window":{"navigationBarTitleText":"老师详情"}},{"path":"/pages/Daxue/Zhibodetail/Zhibodetail","meta":{},"window":{"navigationBarTitleText":"直播详情"}},{"path":"/pages/Daxue/KechengDetail/KechengDetail","meta":{},"window":{"navigationBarTitleText":"课程详情"}},{"path":"/pages/Daxue/BanjiDetail/BanjiDetail","meta":{},"window":{"navigationBarTitleText":"班级详情"}},{"path":"/pages/Order/ConfirmOrder/ConfirmOrder","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/Login/Login/Login","meta":{},"window":{"titleNView":"false","scrollIndicator":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/Login/PasswordLogin/PasswordLogin","meta":{},"window":{"titleNView":"false","scrollIndicator":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/Login/ForgotPassword/ForgotPassword","meta":{},"window":{"titleNView":"false","scrollIndicator":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/Login/PasswordLogin/ResetPassword/ResetPassword","meta":{},"window":{"titleNView":"false","scrollIndicator":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/Login/SetPassword/SetPassword","meta":{},"window":{"titleNView":"false","scrollIndicator":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/WodeHuanzhe/WodeHuanzhe","meta":{},"window":{"navigationBarTextStyle":"white","bounce":"none","navigationBarBackgroundColor":"rgba(0,0,0,0)","titleNView":{"type":"float","titleText":"我的患者"}}},{"path":"/pages/HuanzheDetail/HuanzheDetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/AddHuanzhe/AddHuanzhe","meta":{},"window":{"navigationBarTextStyle":"white","bounce":"none","navigationBarBackgroundColor":"rgba(0,0,0,0)","titleNView":{"type":"float","titleText":"添加患者"}}},{"path":"/pages/Daxue/RecommendCourse/RecommendCourse","meta":{},"window":{"navigationBarTitleText":"推荐课程"}},{"path":"/pages/Daxue/BanjiTuijian/BanjiTuijian","meta":{},"window":{"navigationBarTitleText":"推荐班级","scrollIndicator":"none","bounce":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/KangfuPingdingListPage/KangfuPingdingListPage","meta":{},"window":{"navigationBarTitleText":"康复评定","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/work/addPingDingLiangBiaoType/addPingDingLiangBiaoType","meta":{},"window":{"navigationBarTitleText":"添加分类","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/KangfuMubiao/KangfuMubiao","meta":{},"window":{"navigationBarTitleText":"康复目标","navigationBarBackgroundColor":"#31D880","navigationBarTextStyle":"white"}},{"path":"/pages/AboutUs/AboutUs","meta":{},"window":{"navigationBarTitleText":"关于我们","enablePullDownRefresh":false}},{"path":"/pages/Wode/PersonalInfo/PersonalInfo","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black"}},{"path":"/pages/Wode/Zizhirenzheng/Zizhirenzheng","meta":{},"window":{"navigationBarTitleText":"资质认证","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"black"}},{"path":"/pages/Wode/ResetPassword/ResetPassword","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/Wode/orderList/orderList","meta":{},"window":{"navigationBarTitleText":"我的订单","enablePullDownRefresh":false}},{"path":"/pages/Zhibo/ChooseHost/ChooseHost","meta":{},"window":{"navigationBarTitleText":"增加主讲人","enablePullDownRefresh":false}},{"path":"/pages/Wode/orderInfo/orderInfo","meta":{},"window":{"navigationBarTitleText":"订单详情","enablePullDownRefresh":false}},{"path":"/pages/Zhibo/StarLive/StarLive","meta":{"isNVue":true},"window":{"titleNView":"false","scrollIndicator":"none","bounce":"none","safearea":{"bottom":{"offset":"auto"}}}},{"path":"/pages/Zhibo/StarLive/test/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/Zhibo/WatchLive/WatchLive","meta":{},"window":{"navigationBarTitleText":"直播详情","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
