<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'
import { Plus } from '@element-plus/icons-vue'
import tx from '@/assets/image/default.png'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { editAvatarService } from '@/apis/UserInfo'

const userInfoStore = useUserInfoStore()
const formRef = ref()
const profileForm = ref({
  avatar: ''
})

// 图片上传
const imageUrl = ref()
const onUploadFile = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  // 将图片文件转化为base64格式
  const reader = new FileReader()
  reader.onload = function (e) {
    const base64 = e.target.result
    profileForm.value.avatar = base64
  }
  reader.readAsDataURL(file.raw)
}

const onSubmit = async () => {
  formRef.value.validate()
  await editAvatarService(profileForm.value)
  imageUrl.value = ''
  userInfoStore.setUserInfo()
  ElMessage.success('修改头像成功')
}

const rules = {
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }]
}
</script>

<template>
  <UserCard title="更改头像">
    <template #main>
      <div class="main">
        <!-- 原始头像 -->
        <div class="ininAvatar">
          <b>当前头像</b>
          <img :src="userInfoStore.userInfo.user_pic || tx" class="avatar" />
        </div>
        <!-- 更新头像 -->
        <el-form ref="formRef" :model="profileForm" class="avatarForm" :rules="rules">
          <b>更新头像</b>
          <el-form-item prop="avatar">
            <el-upload
              class="avatar-uploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onUploadFile"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button type="primary" @click="onSubmit" class="submit">更新</el-button>
      </div>
    </template>
  </UserCard>
</template>

<style lang="scss" scoped>
.main {
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  b {
    display: block;
    margin: 10px;
  }
  .ininAvatar {
    width: 200px;
    height: 200px;
    img {
      width: 160px;
      height: 160px;
    }
  }
  .avatarForm {
    width: 200px;
    height: 200px;
    .avatar-uploader {
      width: 160px;
      height: 160px;
      border: 1px dashed var(--el-border-color);
      margin: 5px auto;
      .avatar {
        width: 160px;
        height: 160px;
        display: block;
      }
      .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }
      .el-upload:hover {
        border-color: var(--el-color-primary);
      }
      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        text-align: center;
      }
    }
  }
}
.submit {
  text-align: center;
}
</style>
