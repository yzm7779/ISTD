import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index.js'
import { ElementPlus } from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/assets/main.scss'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/' // 你的后端 API 地址
axios.defaults.headers.post['Content-Type'] = 'application/json'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// 自定义指令：禁用textarea的拖拽功能
app.directive('disable-resize', {
  mounted(el) {
    const textarea = el.querySelector('textarea')
    if (textarea) {
      textarea.style.resize = 'none' // 禁用拖拽
      textarea.addEventListener('mousedown', (event) => {
        if (
          event.offsetX > textarea.clientWidth - 20 &&
          event.offsetY > textarea.clientHeight - 20
        ) {
          event.preventDefault() // 禁用拖拽
        }
      })
    }
  }
})
