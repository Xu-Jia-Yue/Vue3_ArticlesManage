import {
  addChannelsService,
  delChannelsService,
  editChannelsService,
  getChannelsService
} from '@/apis/Channels'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChannelsStore = defineStore('channels', () => {
  // 定义缓冲动画
  const loading = ref(false)
  const channelsList = ref()

  // 获取分类列表
  const getChannelsList = async () => {
    loading.value = true
    const { data } = await getChannelsService()
    channelsList.value = data.data
    loading.value = false
  }

  // 删除分类
  const delChannelsList = async ({ id }) => {
    await delChannelsService(id)
    ElMessage.success('删除成功')
    getChannelsList()
  }

  // 新增分类
  const addChannelsList = async (cate_name, cate_alias) => {
    await addChannelsService({ cate_alias, cate_name })
    ElMessage.success('添加成功')
    getChannelsList()
  }

  // 修改分类
  const editChannelsList = async (id, cate_name, cate_alias) => {
    await editChannelsService({ id, cate_name, cate_alias })
    ElMessage.success('修改成功')
    getChannelsList()
  }

  return {
    channelsList,
    loading,
    getChannelsList,
    delChannelsList,
    addChannelsList,
    editChannelsList
  }
})
