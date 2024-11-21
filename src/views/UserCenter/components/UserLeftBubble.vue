<script setup>
import { ref, onMounted, reactive, toRefs } from 'vue'
//获得时间，用于渲染
const formattedTime = ref('')
const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  formattedTime.value = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateTime()
})
const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})
const { squareUrl } = toRefs(state)
</script>

<template>
  <div class="left-bubble">
    <div class="bubble-time-left">
      {{ formattedTime }}
    </div>
    <div class="left-bubble-avatar">
      <div class="left-bubble-username">用户-医生</div>
      <el-avatar :size="50" :src="squareUrl" shape="square" />
    </div>
    <div class="left-bubble-content">
      这是您的诊断方案。这是您的诊断方案div中
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
      这是您的诊断方案。这是您的诊断方案。加时向左扩展
    </div>
  </div>
</template>

<style scoped lang="scss">
.bubble-time-left {
  background-color: #cccccc;
  width: fit-content;
  padding: 5px;
  border-radius: 3px;
  position: relative;
  left: 45%;
}
.left-bubble {
  display: grid;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  .left-bubble-avatar {
    position: relative;
    justify-items: left;
    .left-bubble-username {
      position: relative;
      left: 55px;
      top: 10px;
      font-size: 15px;
      color: gray;
    }
  }
  .left-bubble-content {
    position: relative;
    width: fit-content;
    max-width: 70%;
    border-radius: 10px;
    background-color: wheat;
    padding: 15px;
    justify-items: left;
    left: 5.5%;
    bottom: 25px;
  }
}
</style>
