<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelsSelect from './ChannelsSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useArticleStore } from '@/stores/useArticleStore'
import { imageUrlToFile } from '@/utils/imageUrlToFile'
import { baseURL } from '@/utils/request'

const visibleDrawer = ref(false) // 抽屉的显隐
const articleStore = useArticleStore()
const drawerTitle = ref()
const articleFormRef = ref(null)

// 文章内容
const articleFromModel = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: '已发布'
})

// 图片上传
const imageUrl = ref()
const onUploadFile = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  articleFromModel.value.cover_img = file.raw
  console.log(file.raw)
}

// 发布 与 草稿
const onPublish = async (state) => {
  await articleFormRef.value.validate()
  articleFromModel.value.state = state
  const fd = new FormData() // 转换 formData 数据
  for (let key in articleFromModel.value) {
    fd.append(key, articleFromModel.value[key])
  }
  // 编辑/发布文章
  if (articleFromModel.value.id) {
    articleStore.editArticleList(fd)
    articleStore.getArticlesList({ pagenum: 1, pagesize: 5, cate_id: '', state: '' })
    ElMessage.success('修改成功')
  } else {
    await articleStore.addArticleList(fd)
    articleStore.getArticlesList({ pagenum: 1, pagesize: 5, cate_id: '', state: '' })
    ElMessage.success('发布成功')
  }
  visibleDrawer.value = false
}

// 定义并暴露打开方法
const open = async (row, data) => {
  visibleDrawer.value = true
  if (row.id) {
    drawerTitle.value = '编辑文章'
    articleFromModel.value = data
    // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    imageUrl.value = baseURL + articleFromModel.value.cover_img
    // 网络图片转成 file 对象, 需要转换一下
    articleFromModel.value.cover_img = await imageUrlToFile(
      imageUrl.value,
      articleFromModel.value.cover_img
    )
  } else {
    articleFromModel.value.title = ''
    articleFromModel.value.cover_img = ''
    articleFromModel.value.content = ' '
    articleFromModel.value.cate_id = ''
    imageUrl.value = ''
    drawerTitle.value = '发布文章'
  }
}

defineExpose({
  open
})

// 制定表单检验规则
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传封面', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
}
</script>

<template>
  <el-drawer v-model="visibleDrawer" :title="drawerTitle" direction="rtl" size="50%">
    <el-form :model="articleFromModel" ref="articleFormRef" label-width="100px" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="articleFromModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelsSelect v-model="articleFromModel.cate_id" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
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
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <div class="editor">
            <quill-editor
              theme="snow"
              v-model:content="articleFromModel.content"
              contentType="html"
            >
            </quill-editor>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
