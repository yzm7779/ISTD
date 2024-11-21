<script setup>
import { reactive, toRefs, defineProps, computed } from 'vue'

const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})
const { squareUrl } = toRefs(state)

const props = defineProps({
  message: {
    type: {},
    required: true
  }
})
const target = computed(() => props.message.id.slice(-7))
</script>

<template>
  <div class="right-bubble">
    <div class="right-bubble-avatar">
      <div class="right-bubble-username">用户</div>
      <el-avatar :size="50" :src="squareUrl" shape="square" />
    </div>
    <div style="text-align: right">
      <div class="right-bubble-content">
        <el-image
          :src="message.message"
          alt="Selected Image"
          class="pic"
          fit="contain"
          v-show="target === 'picture'"
        />
        <div v-show="target === 'message'">{{ message.message }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    max-width: 65%;
    border-radius: 10px;
    background-color: wheat;
    padding: 15px;
    bottom: 25px;
    right: 8%;
    text-align: left;
  }
}
</style>
