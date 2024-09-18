<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const test1 = ref([
  { id: 1, name: '医生1' },
  { id: 2, name: '医生2' },
  { id: 3, name: '医生3' },
  { id: 4, name: '医生4' },
  { id: 5, name: '医生5' },
  { id: 6, name: '医生6' },
  { id: 7, name: '医生7' },
  { id: 8, name: '......' }
])
</script>

<template>
  <div class="doctor-search">
    <el-input
      placeholder="请输入医生姓名/症状名称"
      class="doctor-input"
    ></el-input>
    <el-icon class="icon-search"><Search /></el-icon>
  </div>

  <div
    style="display: flex; width: 100%; background-color: lightgoldenrodyellow"
  >
    <div class="doctor-list">
      <h2>名医推荐</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in test1" :key="item.id">
          <div class="doctor-member">{{ item.name }}</div>
        </el-col>
      </el-row>
    </div>
  </div>

  <br />
  <hr />
  <br />

  <div
    style="display: flex; width: 100%; background-color: lightgoldenrodyellow"
  >
    <div class="doctor-list">
      <h2>常用医生</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in test1" :key="item.id">
          <div class="doctor-member">{{ item.name }}</div>
        </el-col>
      </el-row>
    </div>
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
    margin-left: 220px;
  }
}
.doctor-list {
  width: 80%;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 10%;
  .doctor-member {
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    background-color: orange;
    height: 60px;
    margin-top: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
