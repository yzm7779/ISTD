<script setup>
import { Setting, User } from '@element-plus/icons-vue'
import router from '@/router/index.js'
import { inject, computed, provide, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Connection } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/index.js'

const toLayout = async () => {
  await router.push('/homepage')
}
const toPersonal = async () => {
  await router.push('/personalCenter/home')
}

const toHelp = async () => {
  await router.push('/help')
}

const toLogin = async () => {
  await router.push('/login')
  console.log('第一次点击按钮的值', isLogin.value)
}

const useStore = useDataStore()
const toArticle = async () => {
  if (useStore.state.hasLogin === false) {
    ElMessage.error('请登录以使用该功能')
    return
  }
  await router.push('/article')
}

const props = defineProps({
  message: String
})

const fontSize = inject('fontSize')
const increaseFontSize = () => {
  if (fontSize.value >= 30) {
    ElMessage.error('字体大小达到最大值')
    return
  }
  fontSize.value += 2
}
const decreaseFontSize = () => {
  if (fontSize.value <= 10) {
    ElMessage.error('字体大小达到最小值')
    return
  }
  fontSize.value -= 2
}
const resetFontSize = () => {
  fontSize.value = 16
}

// 颜色模式切换
const isDarkMode = ref(false)
const toggleColorMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
}
// 语音播放
const synth = window.speechSynthesis

// 启用点击文本功能
const enableTextClick = ref(false)

const playText = (text) => {
  if (synth.speaking) {
    ElMessage.error('语音正在播放，请稍后...')
    return
  }
  const utterance = new SpeechSynthesisUtterance(text)
  synth.speak(utterance)
}

const startTextSelection = () => {
  enableTextClick.value = true
  document.body.style.cursor = 'pointer'
  ElMessage.info('点击文本播放语音，点击任意空白区域取消此功能')
}

const stopTextSelection = () => {
  enableTextClick.value = false
  document.body.style.cursor = 'default'
  ElMessage.info('文本选择已停止')
}

// 监听点击事件
const handleClick = (event) => {
  if (!enableTextClick.value) return

  const target = event.target
  if (target && target.textContent.trim() !== '') {
    playText(target.textContent.trim())
  } else {
    ElMessage.warning('没有文本可以播放')
  }
}
//只在指定路由中显示的按钮
const route = useRoute()
const isHomepage = computed(() => {
  return route.name === 'doctorfind' || route.name === 'homepage'
})
//控制左侧弹窗的变量
const dataStore = useDataStore()
const sendIsDrawer = () => {
  if (dataStore.state.hasLogin === false) {
    ElMessage.error('请登录以使用该功能')
    return
  }
  const isShowDrawer = ref(false)
  isShowDrawer.value = true
  dataStore.setSharedData()
}
//设置右上角内容，false为登录/注册按钮，true为个人中心头像和提示
const isLogin = computed(() => dataStore.state.hasLogin)
</script>

<template>
  <el-header class="header">
    <div class="nav-container">
      <div class="nav-left">
        <!--        <div class="connection-item" v-if="isHomepage" @click="sendIsDrawer">-->
        <!--          <el-icon><Connection /></el-icon>-->
        <!--        </div>-->
        <el-tooltip content="点击前往主页" placement="bottom" effect="light">
          <img
            src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg"
            alt="Logo"
            class="nav-logo circular-image"
            @click="toLayout"
          />
        </el-tooltip>
        <el-link :underline="false" class="nav-link" @click="playText('下载')"
          >下载</el-link
        >
        <el-link :underline="false" class="nav-link" @click="toArticle"
          >专栏</el-link
        >
        <el-link :underline="false" class="nav-link" @click="toHelp">
          帮助
        </el-link>
        <el-link :underline="false" class="nav-link">联系我们</el-link>
      </div>
      <span class="word" @click="playText('遇到问题请先尝试刷新网页')"
        >遇到问题请先尝试刷新网页</span
      >
      <div class="nav-right" v-show="!isLogin">
        <el-button round color="black" @click="toLogin">登录/注册</el-button>
      </div>
      <div class="nav-right" v-show="isLogin">
        <div
          class="message"
          @click="
            playText(
              '欢迎使用智影透诊，我们在这里帮助您！请点击任意文本内容听相应语音'
            )
          "
        >
          欢迎使用智影透诊！
        </div>
        <el-popover
          placement="bottom"
          title=""
          :width="200"
          trigger="hover"
          content=""
        >
          <template #reference>
            <el-icon class="icon-link"><Setting /></el-icon>
          </template>
          <div class="icon-setting">
            <span @click="resetFontSize">字体大小</span>
            <el-button style="margin-left: 15px" @click="decreaseFontSize"
              >－</el-button
            >
            <el-button @click="increaseFontSize">＋</el-button>
          </div>
          <div class="setting-item">
            <el-button size="small" @click="toggleColorMode">
              {{ isDarkMode ? '切换至亮色模式' : '切换至深色模式' }}
            </el-button>
          </div>
          <div class="setting-item">
            <el-button size="small" @click="startTextSelection"
              >启用：点击文本播放语音</el-button
            >
          </div>
          <div class="setting-item">
            <el-button size="small" @click="stopTextSelection"
              >停止：点击文本播放语音</el-button
            >
          </div>
        </el-popover>

        <el-tooltip
          content="点击前往个人中心"
          placement="bottom"
          effect="light"
        >
          <el-icon class="icon-link" @click="toPersonal"><User /></el-icon>
        </el-tooltip>
      </div>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.header {
  background-color: white;
  width: 100vw;
}
.nav-container {
  border-style: solid;
  border-width: 1.25px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px; /* 为左右两侧增加空隙 */
  background: white;
  margin-top: 20px;
}
.nav-left {
  display: flex;
  align-items: center;
}

.nav-logo {
  width: 30px; /* 调整logo的大小 */
  margin-right: 20px;
}
.circular-image {
  border-radius: 50%;
  width: 40px; /* 确保图片大小合适 */
  height: 40px; /* 确保图片大小合适 */
  object-fit: cover; /* 保持图片比例 */
}

.nav-left el-link {
  margin-right: 20px;
}

.nav-right {
  display: flex;
  align-items: center;
  margin-left: auto;
  .message {
    margin-left: 20px;
    width: 150px;
  }
}

.nav-right el-icon,
.nav-right el-avatar {
  margin-left: 20px;
}

.nav-link,
.icon-link {
  margin-right: 20px; /* 为每个链接添加空隙 */
}

.icon-setting {
}

.connection-item {
  display: flex;
  border-width: 1px;
  border-style: solid;
  margin-right: 25px;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
}
.word {
  color: lightgray;
  font-size: 15px;
}
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 深色模式样式 */
body.dark-mode {
  background-color: #121212;
  color: #ffffff;
}
.header.dark-mode {
  background-color: #1e1e1e;
  box-shadow: none;
}
</style>
