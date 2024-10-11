<template>
  <div class="lazy-image-container">
    <el-loading v-if="loading" :fullscreen="false">
      <span class="loading-text">加载中...</span>
    </el-loading>
    <img
      v-if="!loading"
      src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg"
      @load="handleLoad"
      @error="handleError"
      :style="{ display: loaded ? 'block' : 'none' }"
      alt=""
    />
    <div v-if="error" class="error-text">图片加载失败</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElLoading } from 'element-plus'

// 定义响应式变量
const loading = ref(true) // 初始状态为加载中
const loaded = ref(false) // 图片未加载标记
const error = ref(false) // 图片加载失败标记

// 图片加载成功处理函数
const handleLoad = () => {
  loading.value = false // 加载完成，隐藏 loading 动画
  loaded.value = true // 标记图片已加载
}

// 图片加载失败处理函数
const handleError = () => {
  loading.value = false // 加载失败，隐藏 loading 动画
  error.value = true // 标记发生了错误
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  height: 100%; /* 根据需要调整 */
}

.loading-text {
  text-align: center;
}

.error-text {
  color: red;
  text-align: center;
}
</style>
