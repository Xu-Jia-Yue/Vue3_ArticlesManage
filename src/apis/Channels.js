import { request } from '@/utils/request'

// 获取分类
export const getChannelsService = () => {
  return request.get('/my/cate/list')
}

// 增加分类
export const addChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}

// 删除分类
export const delChannelsService = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}

// 修改分类
export const editChannelsService = (data) => {
  return request.put('/my/cate/info', data)
}
