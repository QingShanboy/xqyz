import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component: () => import('@/views/Leisure')
      },
      {
        path: '/Video',
        name: 'Video',
        component: () => import('@/views/Video')
      },
      {
        path: '/My',
        name: 'My',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/Forget',
    name: 'Forget',
    component: () => import('@/views/Forget')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  routes
})

export default router
