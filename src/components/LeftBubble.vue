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
      {{ messageLeft }}
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
    background-color: #66ccff;
    border-radius: 10px;
    padding: 10px 15px;
    margin-right: 80px;
    margin-left: 10px;
    width: auto;

    /* 创建聊天气泡的箭头部分 */
    &::after {
      content: '';
      position: absolute;
      left: -10px; /* 调整箭头的垂直位置 */
      top: 10px; /* 调整箭头的水平位置 */
      border-width: 10px 10px 0;
      border-style: solid;
      border-color: #66ccff transparent transparent transparent;
    }
  }
}
</style>
