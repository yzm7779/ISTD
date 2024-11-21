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
  <div style="width: 100%; background-color: cornsilk">
    <div class="main-container">
      <div class="contact-section">
        <p>
          1.游客登录，不用注册即可使用一次
          <el-link @click="toHomepage">点击前往主页</el-link>
        </p>
        <p>
          2.前往注册页面
          <el-link @click="toLogin">点击前往注册</el-link>
        </p>
      </div>
      <br />
      <div class="tutorial-section">
        <h2>1. 游客登录与人机对话</h2>
        <p>
          游客登录流程作为游客，您无需注册即可使用部分系统功能。进入首页：系统会为游客提供一个临时身份，您无需注册即可立即进入。启动人机对话：游客可以与系统中的智能助手进行一对一对话。不计入历史记录：游客与系统的对话内容不会保存到历史记录中，登录后进行的对话仅限当次会话。
          注意：游客对话内容不会保存，退出或刷新页面后，所有对话内容将会丢失。
        </p>
      </div>

      <div class="tutorial-section">
        <h2>2. 登录后查看历史记录与进行医患对话</h2>
        <p>
          登录后功能介绍在您成功登录后，系统会为您提供完整的功能，包括查看历史记录、与医生/患者对话。
          查看历史记录登录后，点击界面中的“历史记录”按钮，您可以查看之前的所有会话记录。历史记录包括与医生/患者的所有对话内容，以及上传的图片和生成的报告。
          医患对话您可以与医生或患者进行一对一的对话。不同身份的用户之间会有不同的权限：医生：可以查看并回复患者的消息。患者：可以选择医生并发起对话。
        </p>
      </div>

      <div class="tutorial-section">
        <h2>3. 医生功能</h2>
        <p>
          医生角色介绍作为医生，您拥有更多权限，除了可以与患者进行对话，还可以执行以下操作：发布专栏。登录后，点击“专栏发布”按钮，您可以发布医学知识文章，分享您的专业经验。文章可以包括文本、图片、链接等内容，帮助患者和其他医生更好地理解相关知识。
          查看患者信息医生可以查看与自己近期对话的患者信息。您可以选择查看某个患者的详细信息，包括：对话记录、报告结果、上传的胸片图片等。通过患者的历史记录，您可以更好地了解患者的健康情况，进行精准诊疗。
        </p>
      </div>

      <div class="tutorial-section">
        <h2>4. 患者功能</h2>
        <p>
          患者角色介绍作为患者，您可以选择医生并与其进行沟通。选择医生进行对话登录后，您可以浏览系统中注册的医生列表，选择您感兴趣的医生进行对话。点击“选择医生”按钮，您将能够查看医生的专栏和个人简介，帮助您决定是否进行对话。
          开始对话一旦您选择了医生，您可以直接通过系统与医生开始对话。医生将回复您的问题并提供医学建议。
        </p>
      </div>

      <div class="tutorial-section">
        <h2>常见问题解答</h2>
        <div class="faq-item">
          <h3>问题1：我忘记了我的密码怎么办？</h3>
          <p>答：您可以点击“忘记密码”链接进行密码重置。</p>
        </div>

        <div class="faq-item">
          <h3>问题2：如何联系客服人员？</h3>
          <p>答：您可以发送邮件至9011177@qq.com或拨打客服电话123-4567-8900。</p>
        </div>

        <div class="faq-item">
          <h3>问题3：是否有免费试用期？</h3>
          <p>答：是的，我们提供免费试用期为30天。请访问我们的官网注册试用。</p>
        </div>
      </div>
      <div class="contact-section">
        <h2>联系我们</h2>
        <p>
          如果您在使用过程中遇到任何问题或有建议，请随时联系我们。您可以通过以下方式与我们取得联系：
        </p>
        <ul>
          <li>电子邮件：9011177@qq.com</li>
          <li>客服电话：123-4567-8900</li>
          <li>在线客服：请访问我们的官网并点击右下角的聊天窗口。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.tutorial-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.tutorial-section h2 {
  font-size: 1.5em;
  color: #333;
}

.tutorial-section p {
  line-height: 1.6;
}

.contact-section {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #007bff;
  border-radius: 8px;
  background-color: #e7f3ff;
}

.contact-section h2 {
  font-size: 1.5em;
  color: #007bff;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.navigation-buttons button {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.navigation-buttons button:hover {
  background-color: #0056b3;
}

.faq-section {
  margin-top: 40px;
  padding: 15px;
  border: 1px solid #28a745;
  border-radius: 8px;
  background-color: #d4edda;
}

.faq-item {
  margin-top: 20px;
}

.faq-item h3 {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 5px;
}

.faq-item p {
  line-height: 1.6;
}
</style>
