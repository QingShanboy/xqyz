
import Vue from 'vue'

import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置中文语言包
dayjs.locale('zh-cn')
// 配置使用处理相对时间
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  // const val = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  // console.log(val)
  return dayjs(value).from(dayjs())
})
