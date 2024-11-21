<script setup>
import RightSidebar from '@/views/UserCenter/components/RightSidebar.vue'
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { ChatDotRound } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import { ElInput, ElMessage } from 'element-plus'
import router from '@/router/index.js'
import { Tools, Share, MoreFilled, Picture, Mic } from '@element-plus/icons-vue'
import UserRightBubble from '@/views/UserCenter/components/UserRightBubble.vue'
import UserLeftBubble from '@/views/UserCenter/components/UserLeftBubble.vue'

const userStore = useUserStore()
// 当组件挂载时，根据路由参数选择好友
onMounted(() => {
  if (route.query.id) {
    console.log('query携带的id', route.query.id)
    selectedId.value = route.query.id
    console.log('跳转后的id', selectedId.value)
  }

  if (selectedId.value) {
    handleSelectPartner(selectedId.value)
  }
})
const handleSelectPartner = (id) => {
  selectedId.value = id
  console.log('selectedId', selectedId.value)
  // 更新浏览器地址
  window.history.pushState({}, '', `/personalCenter/partner/${id}`)
}
//有侧边栏中选中的id
const selectedId = ref(null)
const route = useRoute()
const inputValue = ref('')

//接受输入框的的数据
const handleInformation = (newVal) => {
  console.log(newVal)
  console.log(selectedId.value, '接受输入框数据')
  inputValue.value = newVal
  partnerInformation.value[selectedId.value - 1].chatHistory.push({
    type: 'user',
    content: inputValue.value
  })
  partnerInformation.value[selectedId.value - 1].chatHistory.push({
    type: 'partner',
    content: inputValue.value + '你好'
  })
  console.log(partnerInformation.value[selectedId.value - 1], '插入后的新数据')
}

//聊天框中渲染的数据
const partnerInformation = computed(() => userStore.allDoctor)

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
const mainInput = ref('')

const sendMessage = () => {

}


</script>

<template>
  <el-scrollbar class="main-content" max-height="500px">
    <div class="top-bar" v-if="!selectedId">
      <el-icon size="300px" color="lightgray" class="chat-icon">
        <ChatDotRound />
      </el-icon>
    </div>
    <div v-if="selectedId" class="chat-container">
      <UserRightBubble :message="mainInput" />
      <UserLeftBubble />
    </div>
  </el-scrollbar>
  <div class="chat-input" v-if="selectedId">
    <div class="input-container">
      <el-input
        class="input-content"
        type="textarea"
        :rows="4"
        v-disable-resize
        v-model="mainInput"
      >
        >这是输入框</el-input
      >
    </div>
    <div class="icon-group">
      <el-icon class="input-icon"><Tools /></el-icon>
      <el-icon class="input-icon"><Picture /></el-icon>
      <el-icon class="input-icon"><MoreFilled /></el-icon>
      <el-icon class="input-icon"><Share /></el-icon>
      <el-icon class="input-icon" @click="startSpeechRecognition"
        ><Mic
      /></el-icon>
    </div>
    <div class="button-group">
      <el-button class="input-button">上传图片</el-button>
      <el-button class="input-button" @click="sendMessage">发送</el-button>
    </div>
  </div>
  <RightSidebar
    :content="partnerInformation"
    @partnerSelect="handleSelectPartner"
  />
</template>

<style scoped lang="scss">
.main-content {
  position: relative;
  width: 85%;
  height: 80%;
  //background-color: #66ccff;
  border-radius: 5px;
  .chat-container {
    display: grid;
  }
  .top-bar {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-top: 25vh;
    width: 100%;
    height: 100%;
    //background-color: orange;
  }
  .chat-icon {
    display: flex;
    //justify-content: center;
    //align-items: center;
    //text-align: center;
  }
}
.chat-input {
  position: relative;
  width: 85%;
  height: 20vh;
  background-color: lightgray;
  border-radius: 5px;
  .icon-group {
    display: flex;
    position: absolute;
    left: 10px;
    bottom: 20px;
    .input-icon {
      width: 30px;
    }
  }
  .button-group {
    display: flex;
    position: absolute;
    right: 10px;
    bottom: 10px;
    .input-button {
      height: 30px;
      width: 80px;
    }
  }

  .input-content {
  }
}
</style>
