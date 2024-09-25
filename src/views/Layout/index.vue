<script setup>
import {
  Management,
  HomeFilled,
  User,
  UserFilled,
  Crop,
  EditPen,
  SwitchButton,
  Notebook,
  List,
  ArrowDownBold,
  ArrowUpBold,
  Expand
} from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import avatar from '@/assets/image/default.png'
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
const router = useRouter()
const route = useRoute()
const isCollapse = ref(false) // 切换的显隐
const arrowDown = ref(false) // 箭头的显隐

const toggleMenu = () => {
  isCollapse.value = !isCollapse.value
}

// 切换上下箭头
const onHover = (e) => {
  arrowDown.value = e
}

// 头部切换路由
const onCommand = async (val) => {
  if (val === '/login') {
    await ElMessageBox.confirm('你确定退出大事件吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
    userInfoStore.loginOut()
    router.push(val)
  } else {
    router.push(val)
  }
}

onMounted(() => {
  // 进行登录检测
  if (!userInfoStore.token) {
    ElMessage.warning('请先进行登录！')
    router.push('/login')
  } else {
    userInfoStore.setUserInfo()
  }
})

// 路由路径格式化
const pathFormat = (path) => {
  const pathName = {
    category: '文章分类',
    manage: '文章管理',
    userInfo: '基本资料',
    editProfile: '更换头像',
    resetPsw: '重置密码'
  }
  return pathName[path]
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside class="asideMenu">
      <div class="logo"></div>
      <!-- 侧边栏菜单 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        style="border: none"
        background-color="black"
        text-color="white"
        active-text-color="orange"
        router
      >
        <!-- 首页 -->
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <!-- 文章管理 -->
        <el-sub-menu index="/article">
          <template #title>
            <el-icon><Management /></el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item index="/article/manage">
            <el-icon><Notebook /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/article/category">
            <el-icon><List /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 个人中心 -->
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/userInfo">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/editProfile">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/resetPsw">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 二级路由 -->
    <el-container class="container">
      <el-header>
        <!-- 面包屑导航 -->
        <div class="Breadcrumb">
          <el-icon @click="toggleMenu" class="toggleMenu"><Expand /></el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
            <el-breadcrumb-item v-if="route.path.split('/')[2]">
              {{ pathFormat(route.path.split('/')[2]) }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 用户昵称 -->
        <div class="userName">
          用户名：<strong>{{
            userInfoStore.userInfo?.nickname || userInfoStore.userInfo?.username
          }}</strong>
        </div>
        <!-- 头像及下拉菜单 -->
        <el-dropdown placement="bottom-end" @command="onCommand" @visible-change="onHover">
          <span class="el-dropdown__box">
            <el-avatar :src="userInfoStore.userInfo?.user_pic || avatar" />
            <el-icon v-if="!arrowDown"><ArrowDownBold /></el-icon>
            <el-icon v-else><ArrowUpBold /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="/user/userInfo" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="/user/editProfile" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="/user/resetPsw" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="/login" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main style="background-color: rgb(245, 245, 245)">
        <RouterView />
      </el-main>
      <el-footer>大事件 ©2024 Created by XuJiaYue</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .logo {
    width: 150px;
    background-color: black;
    height: 120px;
    background: url('@/assets/image/logo.png') no-repeat center / 120px auto;
  }
  .asideMenu {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: white;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      background-color: black;
    }
    .toggleBtn {
      width: 120px;
      background-color: black;
      color: white;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .Breadcrumb {
      display: flex;
      align-items: center;
      font-weight: bold;
      width: 180px;
      .toggleMenu {
        font-size: 25px;
        cursor: pointer;
        margin-right: 20px;
      }
    }
    .userName {
      transform: translateX(-50%);
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;
      cursor: pointer;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }
      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
