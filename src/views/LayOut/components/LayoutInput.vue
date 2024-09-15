<script setup>
import { Promotion } from '@element-plus/icons-vue'
import { ElInput } from 'element-plus'
import { ref, defineEmits } from 'vue'
import { defineProps } from 'vue'
//禁用拖拽
const props = defineProps({
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

// 用于改变主界面内容的变量
const isSend = ref(false)
const emit = defineEmits(['input'])
const changeIsSend = () => {
  isSend.value = true
  emit('input', isSend.value)
  emit('send', mainInput.value)
  mainInput.value = ''
}
const addNewChat = () => {
  isSend.value = false
  emit('input', isSend.value)
}

const mainInput = ref('')
</script>

<template>
  <div :style="customStyle">
    <el-input
      placeholder="请输入内容"
      :autosize="{ minRows: 1, maxRows: 4 }"
      v-model="mainInput"
      type="textarea"
      @keydown.enter="changeIsSend"
      v-disable-resize
    ></el-input>
    <div style="padding-top: 7px; margin-left: 7px" @click="changeIsSend">
      <el-tooltip content="点击发送" placement="bottom" effect="light">
        <el-icon><Promotion /></el-icon>
      </el-tooltip>
    </div>
    <span style="padding-top: 4px; margin: 0 5px">|</span>
    <el-tooltip content="新增对话" placement="bottom" effect="light">
      <div style="padding-top: 1px; font-size: 20px" @click="addNewChat">
        ＋
      </div>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
