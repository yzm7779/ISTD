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
  <el-header style="background-color: white; width: 100vw">
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
        <el-link :underline="false" class="nav-link">下载</el-link>
        <el-link :underline="false" class="nav-link">专栏</el-link>
        <el-link :underline="false" class="nav-link" @click="toHelp">
          帮助
        </el-link>
        <el-link :underline="false" class="nav-link">联系我们</el-link>
      </div>
      <span class="word">遇到问题请先尝试刷新网页</span>
      <div class="nav-right" v-show="!isLogin">
        <el-button round color="black" @click="toLogin">登录/注册</el-button>
      </div>
      <div class="nav-right" v-show="isLogin">
        <div class="message">欢迎使用智影透诊！</div>
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
.nav-container {
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
</style>
