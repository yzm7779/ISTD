<script setup>
import router from '@/router/index.js'
import { Back } from '@element-plus/icons-vue'

const toHome = async () => {
  await router.push('/homepage')
}
</script>

<template>
  <div style="align-items: center" @click="toHome">
    <el-icon color="gray" size="15px"><Back /></el-icon>
    <span class="back-button">点击返回主页</span>
  </div>
</template>

<style scoped lang="scss">
.back-button {
  color: gray;
  font-size: 15px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
