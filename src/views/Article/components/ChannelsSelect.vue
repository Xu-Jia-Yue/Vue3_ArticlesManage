<script setup>
import { useChannelsStore } from '@/stores/useChannelsStore'
import { onMounted } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const myEmit = defineEmits(['update:modelValue'])
const channelsStore = useChannelsStore()
onMounted(() => channelsStore.getChannelsList())
</script>

<template>
  <el-select
    :modelValue="modelValue"
    placeholder="请输入"
    size="large"
    style="width: 240px"
    @update:modelValue="myEmit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelsStore.channelsList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
