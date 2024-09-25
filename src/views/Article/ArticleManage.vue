<script setup>
import { onMounted, ref } from 'vue'
import Drawer from './components/ArticleDrawer.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import pagecontainer from './components/PageContainer.vue'
import { useArticleStore } from '@/stores/useArticleStore'
import ChannelsSelect from './components/ChannelsSelect.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticleDetailService } from '@/apis/Article'

const articleStore = useArticleStore()
const drawerRef = ref() // 获取抽屉
const publishState = ref() //重置状态
// 当前页面的相关数据
const articleParams = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 编辑文章
const onEditArticle = async (row) => {
  const {
    data: { data }
  } = await getArticleDetailService(row.id)
  drawerRef.value.open(row, data)
}

// 删除文章
const onDeleteArticle = async (row) => {
  const { id, title } = row
  await ElMessageBox.confirm(`你确定删除《${title}》吗？`, '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  articleStore.delArticleList(id)
  articleStore.getArticlesList(articleParams.value)
  ElMessage.success('删除成功')
}

// 发布文章
const onPublish = (row) => {
  drawerRef.value.open(row)
}

// 重置
const onReset = () => {
  publishState.value = ''
  articleParams.value.cate_id = ''
  articleStore.getArticlesList(articleParams.value)
}

// 搜索
const onSearch = () => {
  articleStore.getArticlesList(articleParams.value)
}

// 数据总数改变
const onSizeChange = (val) => {
  articleParams.value.pagenum = val
  articleStore.getArticlesList(articleParams.value)
}

// 页码切换
const onCurrentChange = (val) => {
  articleParams.value.size = val
  articleStore.getArticlesList(articleParams.value)
}

onMounted(() => {
  articleStore.getArticlesList(articleParams.value)
})
</script>

<template>
  <pagecontainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onPublish">发布文章</el-button>
    </template>
    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <ChannelsSelect v-model="articleParams.cate_id" />
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select
          placeholder="请选择"
          size="large"
          style="width: 240px"
          v-model="articleParams.state"
        >
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="articleStore.articlesList"
      style="width: 100%"
      v-loading="articleStore.loading"
    >
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="onEditArticle(row)">{{
            row.title
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"> </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="articleParams.pagenum"
      v-model:page-size="articleParams.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="articleStore.total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    ></el-pagination>

    <!-- 抽屉 -->
    <Drawer ref="drawerRef"></Drawer>
  </pagecontainer>
</template>

<style lang="scss" scoped></style>
