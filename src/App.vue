<script setup>
import TopNavigation from '@/components/TopNavigation.vue'
import FooterNotice from '@/components/FooterNotice.vue'
import { ref, provide } from 'vue'

const fontSize = ref(16)
provide('fontSize', fontSize)
</script>

<template>
  <div :style="{ fontSize: `${fontSize}px` }">
    <TopNavigation />
    <router-view></router-view>
    <FooterNotice />
  </div>
</template>

<style scoped></style>
