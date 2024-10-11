<script setup>
import { reactive, toRefs, defineProps } from 'vue'

const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})
const { squareUrl } = toRefs(state)

const props = defineProps({
  messageLeft: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="chat-item-user-left">
    <div class="avatar-container-left">
      <div class="username">ISTD</div>
      <el-avatar :size="50" :src="squareUrl" shape="square" />
    </div>
    <div class="message-bubble-left chat-bubble-left">
      这是您的诊断方案。
      1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      这是您的诊断方案。
      1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      这是您的诊断方案。
      1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-item-user-left {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  .avatar-container-left {
    flex: 1;
  }
  .message-bubble-left {
    flex: 11;
    top: 40px;
  }
  .chat-bubble-left {
    display: inline-block;
    position: relative;
    background-color: white;
    border-radius: 10px;
    padding: 10px 15px;
    margin-right: 80px;
    margin-left: 10px;
    width: auto;
  }
}
</style>
