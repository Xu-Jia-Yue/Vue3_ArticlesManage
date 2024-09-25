<script setup>
import { loginService, registerService } from '@/apis/Login'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const loginForm = ref()

const loginFormModel = ref({
  username: 'Yue666',
  password: '111111',
  repassword: ''
})

// 制定表单检验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      pattern: /^\S{6,15}$/,
      required: true,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    {
      validator: (rule, val, callback) => {
        if (val === loginFormModel.value.password) {
          callback()
        } else {
          callback(new Error('两次输入的密码不一致'))
        }
      }
    }
  ]
}

// 注册事件
const onRegister = async () => {
  await loginForm.value.validate()
  await registerService(loginFormModel)
  ElMessage.success('注册成功')
  isRegister.value = false
}

// 登录事件
const userStore = useUserInfoStore()
const router = useRouter()
const onLogin = async () => {
  const { username, password } = loginFormModel.value
  await loginForm.value?.validate()
  const { data } = await loginService({ username, password })
  userStore.setToken(data.token)
  ElMessage.success('登录成功')
  router.replace('/')
}

// 监视isRegister 改变将loginFormModel清空
watch(isRegister, () => {
  loginFormModel.value.username = ''
  loginFormModel.value.password = ''
  loginFormModel.value.repassword = ''
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册板块 -->
      <el-form
        ref="loginForm"
        :model="loginFormModel"
        :rules="rules"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="loginFormModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginFormModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="loginFormModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="onRegister">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录板块 -->
      <el-form
        ref="form"
        :model="loginFormModel"
        :rules="rules"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="loginFormModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            v-model="loginFormModel.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="onLogin" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/image/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/image/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
