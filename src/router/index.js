import Vue from 'vue'
import { Dialog } from 'vant'
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
    component: () => import('@/views/Login/'),
    meta: { requiresAuth: false }
  },
  { // 一级路由渲染到根组件中的 router-view
    path: '/',
    component: () => import('@/views/ButtonTabbar/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'Home',
        component: () => import('@/views/Home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/Leisure',
        name: 'Leisure',
        component: () => import('@/views/Leisure/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/Video',
        name: 'Video',
        component: () => import('@/views/Video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/My',
        name: 'My',
        component: () => import('@/views/My/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/Forget',
    name: 'Forget',
    component: () => import('@/views/Forget/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('@/views/Search/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/Article/:articleId',
    name: 'Article',
    component: () => import('@/views/Article/'),
    props: true,
    meta: { requiresAuth: true }
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
  base: process.env.BASE_URL,
  routes
})

// to: 要访问的页面路由信息
// from: 来自哪个页面的路由信息
// next：放行的标记
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { // 判断该路由是否需要登录权限
    store.state.token = localStorage.getItem('token')
    if (store.state.token !== '') { // 通过vuex state获取当前的token是否存在
      return next()
    }
    // 没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => { // 确认执行这里
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => { // 取消执行这里
      // 取消了，中断路由导航
      next(false)
    })
  } else {
    next()
  }
})
export default router
