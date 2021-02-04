import axios from '../utils/request'

/**
 * 获取文章下的所有评论
 */
export const getArticlesComment = (id, data) => {
  return axios.get(`/articles/${id}/comments`, data)
}
export const addArticlesComment = (id, data) => {
  return axios.post(`/articles/${id}/comments`, data)
}
