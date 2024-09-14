<script setup>
import router from '@/router/index.js'

const toHomepage = async () => {
  await router.push('/homepage')
}
const toLogin = async () => {
  await router.push('/login')
}
</script>

<template>
  <div class="main-container">
    <p>
      1.游客登录，不用注册即可使用一次 阿巴阿巴阿巴
      <el-link @click="toHomepage">点击前往主页</el-link>
    </p>
    <p>
      2.前往注册页面 阿巴阿巴阿巴
      <el-link @click="toLogin">点击前往注册</el-link>
    </p>
    <p>3.详细使用教程 阿巴阿巴阿巴</p>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  position: relative;
  width: 80%;
  height: 80%;
  background: indianred;
  left: 10%;
}
</style>
