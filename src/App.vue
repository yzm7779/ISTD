<script setup>
import TopNavigation from '@/components/TopNavigation.vue'
import FooterNotice from '@/components/FooterNotice.vue'
import { ref, provide } from 'vue'
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'

const fontSize = ref(16)
provide('fontSize', fontSize)
</script>

<template>
  <div :style="{ fontSize: `${fontSize}px` }">
    <TopNavigation />
    <el-config-provider :locale="zh">
      <router-view />
    </el-config-provider>
    <FooterNotice />
  </div>
</template>

<style scoped></style>
