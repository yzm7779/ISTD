<script setup>
import {
  UserFilled,
  Film,
  Search,
  Promotion,
  ChatDotRound
} from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="el-container">
<!--    <el-aside width="200px">-->
<!--      <el-menu-->
<!--        active-text-color="orange"-->
<!--        background-color="cornsilk"-->
<!--        text-color="black"-->
<!--        router-->
<!--      >-->
<!--        <el-menu-item index="/personalCenter/home">-->
<!--          <el-icon><UserFilled /></el-icon>-->
<!--          <span>个人信息</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/personalCenter/partner">-->
<!--          <el-icon><Film /></el-icon>-->
<!--          <span>我的医生/患者</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/personalCenter/search">-->
<!--          <el-icon><Search /></el-icon>-->
<!--          <span>历史记录</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/personalCenter/report">-->
<!--          <el-icon><Promotion /></el-icon>-->
<!--          <span>我的报告</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/personalCenter/review">-->
<!--          <el-icon><ChatDotRound /></el-icon>-->
<!--          <span>我的评价</span>-->
<!--        </el-menu-item>-->
<!--      </el-menu>-->
<!--    </el-aside>-->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  height: 100vh;
  background-color: lightgoldenrodyellow;
  .el-aside {
    background: cornsilk;
  }
}
</style>
