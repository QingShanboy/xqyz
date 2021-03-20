import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 格式化时间，体积远小于moment
import Copy from 'vue-to-copy'
// SEO的插件
import MetaInfo from 'vue-meta-info'
// 骨架屏组件
import skeleton from 'tb-skeleton'
// 加载vant
import Vant from 'vant'
import 'vant/lib/index.css'
//  加载全局样式
import './styles/index.less'

import './utils/dayjs'
// 自动设置REM基准值
import 'amfe-flexible'

// 骨架屏组件的样式
import 'tb-skeleton/dist/skeleton.css'

Vue.use(Copy)
Vue.use(skeleton)
Vue.use(MetaInfo)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
