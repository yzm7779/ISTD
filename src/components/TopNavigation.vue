<script setup>
import { Setting, User } from '@element-plus/icons-vue'
import router from '@/router/index.js'
import { inject } from 'vue'
import { ElMessage } from 'element-plus'
const toLayout = async () => {
  await router.push('/homepage')
}
const toPersonal = async () => {
  await router.push('/personalCenter/home')
}

const toHelp = async () => {
  await router.push('/help')
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
</script>

<template>
  <el-header style="background-color: white; width: 100vw">
    <div class="nav-container">
      <div class="nav-left">
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

      <div class="nav-right">
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
</style>
