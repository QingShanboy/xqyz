import axios from '../utils/request'

/**
 * 获取个人资料
 */
export const getUser = (id) => {
  return axios.get(`/users/${id}`)
}

export const updataUser = (id, userInfo) => {
  return axios.patch(`/users/${id}`, {
    ...userInfo
  })
}
