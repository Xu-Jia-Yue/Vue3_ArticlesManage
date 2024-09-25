import {
  getArticleService,
  addArticleService,
  delArticleService,
  editArticleService
} from '@/apis/Article'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  // 定义缓冲动画
  const loading = ref(false)
  const articlesList = ref()
  const total = ref(0)
  const defaultParams = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
  }

  // 获取文章
  const getArticlesList = async (params = defaultParams) => {
    loading.value = true
    const { data } = await getArticleService(params)
    data.data.forEach((item) => {
      item.pub_date = dayjs(item.pub_date).format('YYYY年MM月DD日')
    })
    articlesList.value = data.data
    total.value = data.total
    loading.value = false
  }

  // 添加文章
  const addArticleList = async (data) => {
    await addArticleService(data)
  }

  // 删除文章
  const delArticleList = async (id) => {
    await delArticleService(id)
  }

  // 修改文章
  const editArticleList = async (data) => {
    await editArticleService(data)
  }

  return {
    articlesList,
    total,
    loading,
    getArticlesList,
    addArticleList,
    delArticleList,
    editArticleList
  }
})
