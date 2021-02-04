import axios from '../utils/request'

/**
 * 获取个人资料
 */
export const getUser = (id) => {
  return axios.get(`/users/${id}`)
}
/**
 * 更新个人资料
 */
export const updataUser = (id, userInfo) => {
  return axios.patch(`/users/${id}`, {
    ...userInfo
  })
}

/**
 * 上传图片
 */

export const uploadPhoto = (data) => {
  return axios.post('/home/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
/**
 * 获取用户频道
 */

export const getUserChannels = () => {
  return axios.get('/users/userChannels')
}

export const getDefaultChannels = () => {
  return axios.get('/channels/defaultChannels')
}
