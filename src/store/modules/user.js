import WebSocketClient from '@/utils/websocket'
import { INIT_WEBBSOCKET, SET_SID, SET_USER, SER_ISLOGIN, SET_TOKEN, SET_MSG, SET_HIDDE } from '@/store/mutation-types'
import { getCaptchas } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'

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
  getters: {
    user: state => state.userInfo,
    isLogin: state => state.isLogin,
    token: state => state.token,
    sid: state => state.sid,
    isHide: state => state.isHide
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    },
    async getCaptchas ({ commit }) {
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = localStorage.getItem('sid')
      } else {
        sid = uuidv4()
        localStorage.setItem('sid', sid)
      }
      commit('SET_SID', sid)
      const result = await getCaptchas(sid)
      if (result.code === 200) {
        return result.data
      }
    }
  },
  modules: {
  }
}
