import { request } from '@/utils/request'

// 获取文章
export const getArticleService = (params) => {
  return request.get('/my/article/list', { params })
}

// 添加文章
export const addArticleService = (data) => {
  return request.post('/my/article/add', data)
}

// 删除文章
export const delArticleService = (id) => {
  return request.delete('/my/article/info', { params: { id } })
}

// 获取文章详情
export const getArticleDetailService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}

// 编辑文章
export const editArticleService = (data) => {
  return request.put('/my/article/info', data)
}
