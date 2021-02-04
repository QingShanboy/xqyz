import WebSocketClient from '@/utils/websocket'
import { INIT_WEBBSOCKET, SET_SID, SET_USER, SER_ISLOGIN, SET_TOKEN, SET_MSG, SET_HIDDE, SET_USERID } from '@/store/mutation-types'
import { getCaptchas } from '@/api/login'
import { getItem, setItem } from '@/utils/storage'
import { v4 as uuidv4 } from 'uuid'

export default {
  state: {
    sid: '',
    isLogin: false,
    token: getItem('token') || '',
    userInfo: {},
    isHide: false,
    userId: '',
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
      console.log(`token${value}`)
      state.token = value
      setItem('token', state.token)
    },
    [SET_USER] (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信息
      setItem('userInfo', state.userInfo)
    },
    [SET_USERID] (state, value) {
      state.userId = value
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
    token: state => {
      if (!state.token) {
        state.token = getItem('token')
      }
      return state.token
    },
    sid: state => state.sid,
    isHide: state => state.isHide,
    userId: state => state.userId
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    },
    async getCaptchas ({ commit }) {
      let sid = ''
      if (localStorage.getItem('sid')) {
        sid = getItem('sid')
      } else {
        sid = uuidv4()
        setItem('sid', sid)
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
