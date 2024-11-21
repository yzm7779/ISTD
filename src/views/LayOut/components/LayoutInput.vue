<script setup>
import { ElInput, ElMessage } from 'element-plus'
import { ref, defineEmits } from 'vue'
import { defineProps } from 'vue'
import { Promotion, Mic } from '@element-plus/icons-vue'
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
const mainInput = ref('')

// 语音识别相关
const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)()
recognition.lang = 'zh-CN' // 设置为中文识别

const startSpeechRecognition = () => {
  recognition.start() // 启动语音识别
  ElMessage.info('请开始说话...')
}

// 语音识别事件处理
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript
  mainInput.value = transcript // 将识别到的文本赋值给输入框
  ElMessage.success('识别成功！')
}

recognition.onerror = (event) => {
  console.error('语音识别失败:', event.error)
  ElMessage.error(`语音识别失败：${event.error}`)
}

recognition.onend = () => {
  console.log('语音识别结束')
}

const changeIsSend = () => {
  isSend.value = true
  emit('input', isSend.value)
  emit('send', mainInput.value)
  mainInput.value = ''
}
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
    <!-- 语音输入按钮 -->
    <div
      style="padding-top: 7px; margin-left: 7px"
      @click="startSpeechRecognition"
    >
      <el-tooltip content="点击开始语音输入" placement="bottom" effect="light">
        <el-icon><Mic /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
