import { createPinia, defineStore } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import { ref, reactive } from 'vue'

const pinia = createPinia()
pinia.use(persist)

//控制主页左侧弹窗的变量
export const useDataStore = defineStore('data', () => {
  const sharedData = ref(false)

  const state = reactive({
    hasLogin: false
  })
  // 加载本地存储的 hasLogin 值
  const loadHasLogin = () => {
    const storedValue = localStorage.getItem('hasLogin')
    if (storedValue !== null) {
      state.hasLogin = JSON.parse(storedValue)
    }
  }
  const setHasLogin = async () => {
    state.hasLogin = !state.hasLogin
    localStorage.setItem('hasLogin', JSON.stringify(state.hasLogin))
  }
  const setSharedData = async () => {
    sharedData.value = !sharedData.value
  }

  // 在 store 初始化时加载 hasLogin 的值
  loadHasLogin()
  return {
    sharedData,
    state,
    setSharedData,
    loadHasLogin,
    setHasLogin
  }
})

export default pinia

import { useUserStore } from '@/stores/modules/user.js'
export { useUserStore }

import { useChatHistoryStore } from '@/stores/modules/chat.js'
export { useChatHistoryStore }
