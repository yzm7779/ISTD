import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      user,
      setToken,
      removeToken,
      setUser
    }
  },
  {
    persist: true
  }
)
