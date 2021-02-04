import axios from 'axios'
import store from '@/store/'

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  // 获取axios配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
  }

  // 去设定拦截器
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      const token = store.state.user.token
      console.log(`user${store.state.user}`)
      token && (config.headers.Authorization = `Bearer ${token}`)
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
    // 添加响应拦截器
    instance.interceptors.response.use(res => {
      // 对响应数据做点什么
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.resolve(res.data)
      }
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  // 创建实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance.request(newOptions)
  }

  // 封装get请求
  get (url, config) {
    const optinos = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(optinos)
  }

  // 封装get请求
  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }

  // 封装get请求
  patch (url, data) {
    return this.request({
      method: 'patch',
      url: url,
      data: data
    })
  }

  // 封装delete请求
  delete (url, data) {
    return this.request({
      method: 'delete',
      url: url,
      data: data
    })
  }

  // 封装delete请求
  put (url, data) {
    return this.request({
      method: 'put',
      url: url,
      data: data
    })
  }
}
// const instance = axios.create({
//   baseURL: process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro,
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   timeout: 10000
// })

export default HttpRequest
