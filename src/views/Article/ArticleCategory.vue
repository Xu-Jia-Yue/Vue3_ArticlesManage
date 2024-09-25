<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import pagecontainer from './components/PageContainer.vue'
import DialogVisible from './components/ChannelsDialog.vue'
import { useChannelsStore } from '@/stores/useChannelsStore'

const channelsStore = useChannelsStore()
const dialog = ref()

// 增加分类
const onAddChannels = (row) => {
  dialog.value.open(row)
}

// 修改分类
const onEditChannel = (row) => {
  dialog.value.open(row)
}

onMounted(() => channelsStore.getChannelsList())
</script>

<template>
  <pagecontainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannels">添加分类 </el-button>
    </template>

    <!-- 分类的数据 -->
    <el-table
      :data="channelsStore.channelsList"
      style="width: 100%"
      v-loading="channelsStore.loading"
    >
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="channelsStore.delChannelsList(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 对话框 -->
    <DialogVisible ref="dialog"></DialogVisible>
  </pagecontainer>
</template>

<style lang="scss" scoped></style>
