import router from '@/router'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import axios from 'axios'
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
export const request = axios.create({
  timeout: 5000,
  baseURL
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const userInfoStore = useUserInfoStore()
    if (userInfoStore.token) {
      // 登录后设置header参数
      config.headers.Authorization = userInfoStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (config) => {
    if (config.data.code === 0) {
      return config
    }
    // 处理业务失败
    ElMessage.error(config.data.message || '服务异常')
    return Promise.reject(config.data)
  },
  (error) => {
    // 处理401错误
    ElMessage.error(error.response?.data.message || '服务异常')
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
