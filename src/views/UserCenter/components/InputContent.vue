<script setup>
import { ref, defineEmits, watch } from 'vue'
import { ElMessage } from 'element-plus'
const centerInput = ref('')
const emit = defineEmits(['input'])
const sendInformation = () => {
  if (id.value === undefined) {
    ElMessage.error('请在右侧边栏中选择聊天对象')
  }
  if (centerInput.value === '') {
    ElMessage.error('请输入内容')
  } else {
    emit('input', centerInput.value)
  }
}
const props = defineProps({
  testId: {
    type: Number,
    required: true
  }
})
const id = ref()
watch(
  () => props.testId,
  (newVal) => {
    id.value = newVal
  },
  { immediate: true }
)
//禁用拖拽
</script>

<template>
  <div class="inp">
    <el-input
      placeholder="请输入内容"
      style="height: 100%; width: 90%"
      type="textarea"
      :autosize="{ minRows: 4.5, maxRows: 4.5 }"
      v-model="centerInput"
      v-disable-resize
      @keydown.enter="sendInformation"
    >
    </el-input>
    <el-button
      type="primary"
      style="width: 10%; height: 100%"
      @click="sendInformation"
      >发送</el-button
    >
  </div>
</template>

<style scoped lang="scss">
.inp {
  position: relative;
  bottom: 0;
  width: 80%;
  height: 20%;
}
</style>
