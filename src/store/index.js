import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)
const modules = {}

// 动态加载vuex
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
console.log('modules', modules)
export default new Vuex.Store({
  state: {
    isLogin: false,
    cachePages: ['bottonTabbar']
  },
  mutations: {
    // 添加缓存页面
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 判断是否登录
    setLogin (state, value) {
      state.isLogin = value
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  modules
})
