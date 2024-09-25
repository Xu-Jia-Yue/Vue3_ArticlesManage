import { request } from '@/utils/request'

// 登录
export const loginService = (userInfo) => {
  return request.post('/api/login', userInfo)
}

// 注册
export const registerService = (userInfo) => {
  return request.post('/api/reg', userInfo)
}
