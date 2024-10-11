import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatHistoryStore = defineStore('chat-history', () => {
  const chatHistoryList = ref([])
  //是否是第一次加载的标志
  const flag = ref(false)
  //携带的id
  const chatHistoryId = ref(null)
  const setHistoryList = (newVal) => {
    chatHistoryList.value = newVal
  }
  const addChatHistory = (newVal) => {
    chatHistoryList.value.push(newVal)
  }

  return {
    chatHistoryList,
    flag,
    chatHistoryId,
    setHistoryList,
    addChatHistory
  }
})
