<script setup>
import RightSidebar from '@/components/RightSidebar.vue'
import InputContent from '@/components/InputContent.vue'
</script>

<template>
  <div class="main-content">我是 我的评价</div>
  <InputContent/>
  <RightSidebar />
</template>

<style scoped lang="scss">
.main-content {
  background-color: orange;
  position: relative;
  width: 80%;
  height: 70%;
}
</style>
