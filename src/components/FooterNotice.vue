<script setup>
import { InfoFilled, Message } from '@element-plus/icons-vue'
</script>

<template>
  <el-footer>
    <div class="footer-container">
      <div class="footer-left">
        <span style="font-size: 14px;">
          All rights reserved.   确保用户数据均经过加密，遵守HIPAA.   所有内容均由AI模型输出，仅供参考.
        </span>
      </div>
      <div class="footer-right">
        <el-icon class="icon-link"><InfoFilled /></el-icon>
        <el-icon class="icon-link"><Message /></el-icon>
      </div>
    </div>
  </el-footer>
</template>

<style scoped lang="scss">
el-footer {
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
}

.footer-container {
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 120px;
  background-color: #66ccff;
  margin-top: 20px;
}

.footer-left {
  display: flex;
  align-items: center;
}

.footer-right {
  display: flex;
  align-items: center;
}

.footer-right el-icon {
  margin-left: 20px;
  font-size: 24px;
}
.icon-link {
  margin-right: 20px; /* 为每个链接添加空隙 */
}
</style>
