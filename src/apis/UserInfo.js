import { request } from '@/utils/request'

// 获取用户基本资料
export const getUserInfoService = () => {
  return request.get('/my/userinfo')
}

// 更新用户资料
export const editUserInfoService = (data) => {
  return request.put('/my/userinfo', data)
}

//  修改密码
export const editPswService = (data) => {
  return request.patch('/my/updatepwd', data)
}

// 更新头像
export const editAvatarService = (data) => {
  return request.patch('/my/update/avatar', data)
}
