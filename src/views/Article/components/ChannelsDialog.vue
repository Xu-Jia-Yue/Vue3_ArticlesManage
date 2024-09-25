<script setup>
import { ref } from 'vue'
import { useChannelsStore } from '@/stores/useChannelsStore'

const dialogVisible = ref(false)
const formRef = ref()
const channelsStore = useChannelsStore()

// 表单数据
const ChannelsFromModel = ref({
  cate_name: '',
  cate_alias: ''
})

// 添加/修改 逻辑
const onSubmit = async () => {
  const { cate_name, cate_alias, id } = ChannelsFromModel.value
  await formRef.value.validate()
  if (ChannelsFromModel.value.id) {
    channelsStore.editChannelsList(id, cate_name, cate_alias)
  } else {
    ChannelsFromModel.value.cate_alias = ''
    ChannelsFromModel.value.cate_name = ''
    channelsStore.addChannelsList(cate_name, cate_alias)
  }
  dialogVisible.value = false
}

// 暴露显隐方法
const open = async (row) => {
  dialogVisible.value = true
  if (row.id) {
    ChannelsFromModel.value = { ...row }
  }
}

defineExpose({
  open
})

// 定义表单规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="ChannelsFromModel.id ? '编辑分类' : '添加分类'" width="30%">
    <!-- 表单 -->
    <el-form
      ref="formRef"
      :model="ChannelsFromModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="ChannelsFromModel.cate_name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="ChannelsFromModel.cate_alias" minlength="1" maxlength="15"></el-input>
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
