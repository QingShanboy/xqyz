import axios from '../utils/request'

/**
 * 获取所有文章
 *
 *
 */

export const getAllArticles = (id, data) => {
  return axios.get('/articles', data)
}
/**
 * 获取频道列表的文章
 */

export const getArticles = (id, data) => {
  return axios.get(`/channels/${id}/artic`, data)
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

/**
 * 获取文章的内容
 */

export const getArticlesText = (id) => {
  return axios.get(`/articles/${id}`)
}

/**
 * 关注文章作者
 */

export const onFollowAuthor = (id) => {
  return axios.put(`/users/following/${id}`)
}
export const unFollowAuthor = (id) => {
  return axios.delete(`/users/following/${id}`)
}
export const addCollect = (id) => {
  return axios.put(`/users/collectArticle/${id}`)
}
export const unCollect = (id) => {
  return axios.delete(`/users/cancelCollectArticle/${id}`)
}
export const addLike = (id) => {
  return axios.put(`/users/likeArticle/${id}`)
}
export const unLike = (id) => {
  return axios.delete(`/users/unlikeArticle/${id}`)
}
