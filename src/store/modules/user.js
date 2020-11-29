import WebSocketClient from '@/utils/websocket'
import { INIT_WEBBSOCKET, SET_SID, SET_USER, SER_ISLOGIN, SET_TOKEN, SET_MSG, SET_HIDDE } from '@/store/mutation-types'
export default {
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    num: 0

  },
  mutations: {
    [INIT_WEBBSOCKET] (state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    [SET_SID] (state, value) {
      state.sid = value
    },
    [SET_TOKEN] (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    [SET_USER] (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    [SER_ISLOGIN] (state, value) {
      state.isLogin = value
    },
    [SET_MSG] (state, value) {
      state.num = value
    },
    [SET_HIDDE] (state, value) {
      state.isHide = value
    }
  },
  actions: {
  },
  modules: {
  }
}
