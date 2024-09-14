<script setup>
import { reactive, toRefs, defineProps } from 'vue'

const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})
const { squareUrl } = toRefs(state)

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="chat-item-user-right">
    <div class="avatar-container-right">
      <div class="message-bubble-right chat-bubble-right">
        {{ message }}
      </div>
      <div class="message-user-right">
        <div class="username">用户</div>
        <el-avatar :size="50" :src="squareUrl" shape="square" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-item-user-right {
  display: flex;
  justify-content: flex-end;
  .avatar-container-right {
    flex: 1;
    text-align: right;
    position: relative;
    .message-bubble-right {
      position: relative;
      flex: 1;
      right: 70px;
      top: 100px;
    }
    .message-user-right {
      position: relative;
      flex: 1;
      top: 10px;
    }
    .chat-bubble-right {
      display: inline-block;
      position: relative;
      background-color: #66ccff;
      border-radius: 10px;
      padding: 10px 15px;
      max-width: 600px;
      text-align: left;

      /* 创建聊天气泡的箭头部分 */
      &::after {
        content: '';
        position: absolute;
        right: -10px; /* 调整箭头的垂直位置 */
        top: 10px; /* 调整箭头的水平位置 */
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: #66ccff transparent transparent transparent;
      }
    }
  }
}
</style>
