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
    const deleteHistory = () => {
      allHistory.value = []
    }

    //增加聊天记录
    const addHistory = (newVal) => {
      const temp = Date.now()
      const date = new Date(temp) // 创建一个 Date 对象

      // 格式化输出日期和时间
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      allHistory.value.push({ id: formattedDateTime, chat: newVal })
      console.log('这是添加的值', newVal)
      console.log('这是所有的值', allHistory.value)
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
      deleteHistory,
      addHistory
    }
  },
  {
    persist: true
  }
)
