import { createPinia, defineStore } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import { ref } from 'vue'

const pinia = createPinia()
pinia.use(persist)
export const useDataStore = defineStore('data', () => {
  const sharedData = ref(false)

  const setSharedData = async () => {
    sharedData.value = !sharedData.value
  }

  return {
    sharedData,
    setSharedData
  }
})

export default pinia

import { useUserStore } from '@/stores/modules/user.js'
export { useUserStore }
