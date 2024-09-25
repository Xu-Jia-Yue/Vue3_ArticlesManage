import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/article/category',
          name: 'AricleCategory',
          component: () => import('@/views/Article/ArticleCategory.vue')
        },
        {
          path: '/article/manage',
          name: 'AricleList',
          component: () => import('@/views/Article/ArticleManage.vue')
        },
        {
          path: '/user/userInfo',
          name: 'userInfo',
          component: () => import('@/views/User/UserInfo.vue')
        },
        {
          path: '/user/editProfile',
          name: 'editProfile',
          component: () => import('@/views/User/EditProfile.vue')
        },
        {
          path: '/user/resetPsw',
          name: 'resetPsw',
          component: () => import('@/views/User/ResetPsw.vue')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
