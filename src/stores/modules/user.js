import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFormattedDate } from '@/utils/dateUtils.js'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const getId = (tempId) => {
      getFormattedDate(tempId)
    }
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
    const deleteHistoryById = (id) => {
      console.log(id)
      console.log('删除前', allHistory.value)
      id = id.value
      const test = allHistory.value.filter((item) => item.id !== id)
      if (test.length === allHistory.value.length) console.log('哈哈哈')
      allHistory.value = allHistory.value.filter((item) => item.id !== id)
      console.log('删除后', allHistory.value)
    }

    //增加聊天记录
    const addHistory = (newVal) => {
      const formattedDateTime = ref('')
      getId(formattedDateTime)
      allHistory.value.push({ id: formattedDateTime, chat: newVal })
      console.log('这是添加的值', newVal)
      console.log('这是所有的值', allHistory.value)
    }
    const allDoctor = ref([])
    const addDoctor = (newDoctor) => {
      const formattedDateTime = ref('')
      getId(formattedDateTime)
      if (!allDoctor.value.some((item) => item.doctor === newDoctor)) {
        allDoctor.value.push({ id: formattedDateTime, doctor: newDoctor })
      }
    }
    const deleteDoctor = () => {
      allDoctor.value = []
    }

    return {
      token,
      user,
      allHistory,
      registerModel,
      registerType,
      allDoctor,
      setToken,
      removeToken,
      setUser,
      setRegisterModel,
      setRegisterType,
      deleteHistory,
      deleteHistoryById,
      addHistory,
      addDoctor,
      deleteDoctor
    }
  },
  {
    persist: true
  }
)
