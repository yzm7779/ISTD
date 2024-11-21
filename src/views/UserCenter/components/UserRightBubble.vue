<script setup>
import { ref, onMounted, reactive, toRefs, defineProps } from 'vue'

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

const props = defineProps({
  message: {
    type: String
  }
})
</script>

<template>
  <div class="right-bubble">
    <div class="bubble-time-right">
      {{ formattedTime }}
    </div>
    <div class="right-bubble-avatar">
      <div class="right-bubble-username">用户-患者</div>
      <el-avatar :size="50" :src="squareUrl" shape="square" />
    </div>
    <div style="text-align: right">
      <div class="right-bubble-content">
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        这是您的诊断方案。这是您的诊断方案。加时向左扩展
        {{ props.message }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bubble-time-right {
  background-color: #cccccc;
  width: fit-content;
  padding: 5px;
  border-radius: 3px;
  position: relative;
  left: 45%;
}
.right-bubble {
  display: grid;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  .right-bubble-avatar {
    position: relative;
    justify-items: right;
    .right-bubble-username {
      position: relative;
      right: 55px;
      top: 10px;
      font-size: 15px;
      color: gray;
    }
  }
  .right-bubble-content {
    float: right;
    display: flex;
    position: relative;
    width: auto;
    max-width: 70%;
    border-radius: 10px;
    background-color: wheat;
    padding: 15px;
    bottom: 25px;
    right: 5.5%;
    text-align: left;
  }
}
</style>
