<script setup>
import RightSidebar from '@/views/UserCenter/components/RightSidebar.vue'
import InputContent from '@/views/UserCenter/components/InputContent.vue'
import LeftBubble from '@/views/LayOut/components/LeftBubble.vue'
import RightBubble from '@/views/LayOut/components/RightBubble.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChatHistoryStore } from '@/stores/modules/chat.js'
import router from '@/router/index.js'
import { ChatDotRound } from '@element-plus/icons-vue'

// 当组件挂载时，根据路由参数选择好友
onMounted(() => {
  if (useStore.chatHistoryId !== null) {
    handleSelectHistory(useStore.chatHistoryId)
  }
})
const handleSelectHistory = async (id) => {
  selectedId.value = id
  // 更新浏览器地址
  window.history.pushState({}, '', `/personalCenter/search/${id}`)
  await router.push(`/personalCenter/search/${id}`)
}
//有侧边栏中选中的id
const selectedId = ref()

const inputValue = ref('')

//接受输入框的的数据
const handleInformation = (newVal) => {
  console.log(newVal)
  console.log(selectedId.value, '接受输入框数据')
  inputValue.value = newVal
  historyInformation.value[selectedId.value - 1].chatHistory.push({
    type: 'user',
    content: inputValue.value
  })
  historyInformation.value[selectedId.value - 1].chatHistory.push({
    type: 'partner',
    content: inputValue.value + '你好'
  })
  console.log(historyInformation.value[selectedId.value - 1], '插入后的新数据')
}

//聊天框中渲染的数据
const historyInformation = computed(() => useStore.chatHistoryList)
const useStore = useChatHistoryStore()
const setHistoryState = () => {
  useStore.addChatHistory({
    id: 1,
    name: '历史记录1',
    chatHistory: [
      { type: 'user', content: '你好' },
      { type: 'partner', content: '你好' }
    ]
  })
  useStore.addChatHistory({
    id: 2,
    name: '历史记录2',
    chatHistory: [
      { type: 'user', content: '你好111' },
      { type: 'partner', content: '你好111' }
    ]
  })
  useStore.addChatHistory({
    id: 3,
    name: '历史记录3',
    chatHistory: [
      {
        type: 'user',
        content:
          '你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222'
      },
      {
        type: 'partner',
        content:
          '你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222你好111222'
      }
    ]
  })
}
onMounted(() => {
  if (useStore.flag === false) {
    setHistoryState()
    useStore.flag = true
  }
})
</script>

<template>
  <el-scrollbar class="main-content">
    <div
      v-if="!selectedId"
      style="
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        margin-top: 25vh;
      "
    >
      <el-icon size="200px" color="lightgray" class="chat-icon"
        ><ChatDotRound
      /></el-icon>
    </div>
    <div v-else>
      <div
        v-for="item in historyInformation[selectedId - 1].chatHistory"
        :key="item.type"
      >
        <div v-if="item.type === 'user'">
          <RightBubble :message="item.content" />
        </div>
        <div v-else-if="item.type === 'partner'">
          <LeftBubble :messageLeft="item.content" />
        </div>
      </div>
    </div>
  </el-scrollbar>
  <RightSidebar
    :content="historyInformation"
    @historySelect="handleSelectHistory"
  />
</template>

<style scoped lang="scss">
.main-content {
  position: relative;
  width: 80%;
  height: 80%;
}
</style>
