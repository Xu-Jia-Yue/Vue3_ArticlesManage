<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <div class="app">
    <!-- 国际化处理 -->
    <el-config-provider :locale="zh">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<style lang="scss" scoped></style>
