<template>
  <div class="captcha-container">
    <!-- 显示验证码图片，点击时刷新验证码 -->
    <canvas ref="canvasRef" @click="refreshCaptcha" alt="验证码" />
    <!-- 下划线的文字，点击时再刷新验证码 -->
    <el-link type="primary" @click="refreshCaptcha">看不清？</el-link>
  </div>
</template>

<script setup>
// 导入 Vue 的 ref 和 computed 函数
import { ref, computed, defineEmits, onMounted } from 'vue'
const emits = defineEmits(['update:captchaValue'])

// 定义响应式变量，分别用于存储验证码值和用户输入
const captchaValue = ref('')
const canvasRef = ref(null)

// 生成随机验证码的函数
const generateCaptcha = () => {
  // 生成一个4位随机数字
  captchaValue.value = Math.floor(1000 + Math.random() * 9000).toString()
  drawCaptcha(captchaValue.value)
  //将验证码值传递给父组件
  emits('update:captchaValue', captchaValue.value)
}

// 计算属性，用于根据验证码值生成图片链接
// 绘制验证码到 Canvas
const drawCaptcha = (text) => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  // 设置 Canvas 尺寸
  canvas.width = 120 // 画布宽度
  canvas.height = 35 // 画布高度

  // 生成随机颜色
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const a = Math.random() // alpha 值在 0 到 1 之间
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  // 随机选择渐变的起始和结束点
  const x0 = Math.random() * canvas.width
  const y0 = Math.random() * canvas.height
  const x1 = Math.random() * canvas.width
  const y1 = Math.random() * canvas.height

  // 创建渐变
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1)
  gradient.addColorStop(0, getRandomColor()) // 开始颜色
  gradient.addColorStop(1, getRandomColor()) // 结束颜色
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 调整这里的字体大小
  const fontSize = 20 // 可以根据需要修改此值
  ctx.font = `${fontSize}px Arial` // 设置字体和大小

  // 自定义宽度和高度缩放比例
  const widthScale = 1.5 // 设置字体宽度缩放比例
  const heightScale = 1.0 // 设置字体高度缩放比例

  // 应用缩放
  ctx.save() // 保存当前状态
  ctx.scale(widthScale, heightScale) // 缩放

  // 绘制随机颜色的文字
  for (let i = 0; i < text.length; i++) {
    ctx.fillStyle = getRandomColor() // 获取随机颜色
    // 将调整后的 fontSize 应用到 fillText 的 y 坐标上以保证位置正确
    ctx.fillText(text[i], 10 + i * (fontSize * 0.8), 25) // 适当调整位置
  }
  ctx.restore() // 恢复到原始状态
}

// 刷新验证码的函数
const refreshCaptcha = () => {
  generateCaptcha() // 调用生成验证码的函数
}

// 初始化时生成第一个验证码
onMounted(() => {
  generateCaptcha()
})
</script>

<style scoped lang="scss">
.captcha-container {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
}
.captcha-container img {
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  margin-right: 10px; /* 图片与输入框之间的间距 */
}
.captcha-container .el-link {
  margin-left: 10px; /* 文字与输入框之间的间距 */
}
</style>
