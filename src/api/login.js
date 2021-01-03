import axios from '../utils/request'

/**
 * 获取图形验证码
 */
export const getCaptchas = (sid) => {
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

export const getLogin = (userInfo) => {
  debugger
  console.log(userInfo)
  return axios.post('/users/login', {
    ...userInfo
  })
}
