<script setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/useUserInfoStore'

const userInfoStore = useUserInfoStore()
const myProps = defineProps(['info'])
const dialogVisible = ref(false)
const formRef = ref()

// 表单数据
const infoFromModel = ref({ ...myProps.info })

// 暴露显隐方法
const open = async () => {
  dialogVisible.value = true
}

// 修改
const onSubmit = async () => {
  await formRef.value.validate()
  await userInfoStore.editUserInfo(infoFromModel.value)
  await userInfoStore.setUserInfo()
  ElMessage.success('设置成功')
  dialogVisible.value = false
}

defineExpose({
  open
})

// 定义表单规则
const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
const rules = {
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern,
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <el-dialog v-model="dialogVisible" width="30%">
    <!-- 表单 -->
    <el-form
      ref="formRef"
      :model="infoFromModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="infoFromModel.username" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="infoFromModel.nickname" minlength="1" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="infoFromModel.email" minlength="1"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
