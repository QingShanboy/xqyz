import axios from '../utils/request'

export const getUser = (id) => {
  return axios.get('/getCaptcha', {
    params: {
      _id: id
    }
  })
}
