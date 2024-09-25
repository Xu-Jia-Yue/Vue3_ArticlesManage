<script setup>
defineProps(['title'])
</script>

<template>
  <div class="userInfo">
    <el-card style="width: 750px; height: 500px" shadow="always">
      <!-- 标题 -->
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <!-- 信息展示 -->
      <div class="main">
        <slot name="main"></slot>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  justify-content: center;
  align-self: center;
  .card-header {
    font-weight: bold;
    text-align: center;
  }
  .main{
    margin-top: 50px;
  }
}
</style>
