import Vue from 'vue'
// import { Dialog } from 'vant'
import store from '@/store/'
import VueRouter from 'vue-router'

// 解决路由重复的问题,获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/ButtonTabbar/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'Home',
        component: () => import('@/views/Home/')
      },
      {
        path: '/Leisure',
        name: 'Leisure',
        component: () => import('@/views/Leisure/')
      },
      {
        path: '/Video',
        name: 'Video',
        component: () => import('@/views/Video/')
      },
      {
        path: '/My',
        name: 'My',
        component: () => import('@/views/My/')
      }
    ]
  },
  {
    path: '/Forget',
    name: 'Forget',
    component: () => import('@/views/Forget/')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('@/views/Search/')
  },
  {
    path: '/Article/:articleId',
    name: 'Article',
    component: () => import('@/views/Article/'),
    props: true
  },
  {
    path: '/PersonalData',
    name: 'PersonalData',
    component: () => import('@/views/PersonalData/'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { // 判断该路由是否需要登录权限
    if (store.state.user.token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/Login',
        query: { redirect: to.path } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
