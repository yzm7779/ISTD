<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps({
  placeholder: String
})


</script>

<template>
  <div class="doctor-search">
    <el-input
      :placeholder="placeholder"
      class="doctor-input"
    ></el-input>
    <el-icon class="icon-search"><Search /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.doctor-search {
  display: flex;
  width: 100%;
  .doctor-input {
    width: 60%;
    left: 18%;
  }
  .icon-search {
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    background-color: #66ccff;
    height: 30px;
    width: 30px;
    margin-left: 275px;
  }
}
</style>
