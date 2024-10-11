import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const registerModel = ref({
      phone: '',
      password: '',
      repassword: '',
      code: '',
      certificate: '',
      name: ''
    })
    const registerType = ref('')
    const setRegisterType = (type) => {
      registerType.value = type
    }
    const setRegisterModel = (model) => {
      registerModel.value = model
    }
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

    //存放所有记录
    const allHistory = ref([])
    //记录的个数
    const historyCnt = ref(1)
    //增加聊天记录
    const addHistory = (newVal) => {
      const temp = historyCnt.value
      allHistory.value.push({ id: temp, chat: newVal })
      console.log('这是添加的值', newVal)
      console.log('这是所有的值', allHistory.value)
      historyCnt.value++
    }

    return {
      token,
      user,
      allHistory,
      registerModel,
      registerType,
      setToken,
      removeToken,
      setUser,
      setRegisterModel,
      setRegisterType,
      addHistory
    }
  },
  {
    persist: true
  }
)
