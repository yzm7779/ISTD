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
  <div class="left-bubble">
    <div class="left-bubble-avatar">
      <div class="left-bubble-username">ISTD</div>
      <el-avatar :size="50" :src="squareUrl" shape="square" />
    </div>
    <div class="left-bubble-content">
      这是您的诊断方案。 1，这是您的诊断方案 1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案 这是您的诊断方案。
      1，这是您的诊断方案 1，这是您的诊断方案 1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案
      1，这是您的诊断方案1，这是您的诊断方案 这是您的诊断方案。
      1，这是您的诊断方案 1，这是您的诊断方案 1，这是您的诊断方案
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
    max-width: 65%;
    border-radius: 10px;
    background-color: wheat;
    padding: 15px;
    justify-items: left;
    left: 8%;
    bottom: 25px;
  }
}
</style>
