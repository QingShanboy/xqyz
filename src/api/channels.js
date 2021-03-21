import axios from '../utils/request'
/**
 * 获取所有频道
 */

export const getAllChannels = () => {
  return axios.get('/channels')
}
/**
 * 移除我的频道
 */

export const unChannels = (id) => {
  return axios.delete(`/users/unChannels/${id}`)
}
/**
 * 添加我的频道
 */

export const addChannels = (id) => {
  return axios.put(`/users/addChannels/${id}`)
}
