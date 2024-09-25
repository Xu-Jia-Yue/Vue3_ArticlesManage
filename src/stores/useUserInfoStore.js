import { editUserInfoService, getUserInfoService } from '@/apis/UserInfo'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    let token = ref()
    let userInfo = ref({})

    // 添加token
    const setToken = (userToken) => {
      token.value = userToken
    }

    // 添加用户信息
    const setUserInfo = async () => {
      const { data } = await getUserInfoService()
      userInfo.value = data.data
    }

    // 修改用户信息
    const editUserInfo = async (data) => {
      await editUserInfoService(data)
    }

    // 退出登录
    const loginOut = () => {
      token.value = ''
      userInfo.value = {}
    }

    return {
      token,
      userInfo,
      setUserInfo,
      setToken,
      loginOut,
      editUserInfo
    }
  },
  {
    persist: true
  }
)
