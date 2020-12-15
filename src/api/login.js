import axios from '../utils/request'

/**
 * 获取图形验证码
 */
export const getCaptchas = () => {
  return axios.get('/getCaptcha')
}
