<script setup>
import RightSidebar from '@/views/UserCenter/components/RightSidebar.vue'
</script>

<template>
  <div class="container">
    <el-descriptions title="X光胸片报告" class="label-item" :column="1">
      <el-descriptions-item label="患者姓名">张三</el-descriptions-item>
      <el-descriptions-item label="患者手机号码"
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item label="患者病症">症状A</el-descriptions-item>
      <el-descriptions-item label="X光胸片">
        <div class="img-item">
          <img src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg" alt="" />
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="诊断建议">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <RightSidebar />
</template>

<style scoped lang="scss">
.container {
  width: 80%;
  height: 100%;
  .img-item {
    align-items: center;
    justify-content: center;
    position: relative;
    left: 10%;
  }
}
</style>
