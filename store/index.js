import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		pushMessage: {},
		systemInfo: {},
		user: {},
		
	},
	mutations: {
		setSystemInfo(state, systemInfo) {
			state.systemInfo = systemInfo;
		},
		getSystemInfo({
			state,
			commit
		}) {
			let systemInfo = uni.getSystemInfoSync();
			commit('setSystemInfo', systemInfo);
		},
		setUser(state, user) {
			state.user = user;
		},
		updatePushMessage(state, message) {
			/**
			 * 注意：这里为了方便预览查看效果，始终对 payload 做了序列化的处理。
			 * 实际开发期中，请自行调整代码并注意发送的 payload 消息格式。
			 */ 
			let payload = message.payload;
			if (typeof payload !== 'string') {
				message.payload = JSON.stringify(payload);
			}
			state.pushMessage = message || {};
		}
	},
	actions: {
		getSystemInfo({
			state,
			commit
		}) {
			let systemInfo = uni.getSystemInfoSync();
			commit('setSystemInfo', systemInfo);
		},
		getUserInfo({
			state,
			commit
		}) {
			 console.log(getApp().globalData.userName);
			
			 commit('setUser',{name:getApp().globalData.userName})
		},
		getLiveList: (state, page) => {
		},
	}
})