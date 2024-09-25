<script setup>
import tx from '@/assets/image/default.png'
import UserCard from './components/UserCard.vue'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import EditInfoDialog from './components/EditInfoDialog.vue'
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
const drawerRef = ref()
const editInfo = () => {
  drawerRef.value.open()
}
</script>

<template>
  <UserCard title="用户信息">
    <template #main>
      <!-- 左侧头像 -->
      <div class="photo">
        <img :src="userInfoStore.userInfo.user_pic || tx" alt="头像" />
      </div>
      <!-- 右侧信息 -->
      <div class="info">
        <p>用户名: {{ userInfoStore.userInfo.username || '暂未设置' }}</p>
        <p>昵称: {{ userInfoStore.userInfo.nickname || '暂未设置' }}</p>
        <p>邮箱: {{ userInfoStore.userInfo.email || '暂未设置' }}</p>
      </div>
      <!-- 更新数据 -->
      <div class="submit">
        <el-button type="success" @click="editInfo">修改信息</el-button>
      </div>
    </template>
  </UserCard>
  <EditInfoDialog ref="drawerRef" :info="userInfoStore.userInfo" />
</template>

<style lang="scss" scoped>
.photo {
  text-align: center;
  margin: 5px auto;
  width: 160px;
  height: 160px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.info {
  font-weight: bold;
  text-align: center;
}
.submit {
  text-align: center;
}
</style>
