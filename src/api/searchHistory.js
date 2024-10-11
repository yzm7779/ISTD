//这里应该是使用模型分析胸片的历史记录相关的操作，比如评价，接着历史记录进行新的提问什么的，先饼着
import instance from '@/utils/request.js'

//用户-AI对话发送新消息
export const sendAIMessage = ({ userId, message, picUrl }) => {
  return instance.post('/sendAIMessage', {
    userId, //患者的id，其中为患者在个人中心的手机号码 string
    message, //输入框中的内容 string
    picUrl //传输图片的url，若没有则为null string
  })
}
//用户对AI生成内容的评价
export const sendAIReportReview = ({ userId, review, degree, chatId }) => {
  return instance.post('/sendAIReportReview', {
    userId, //用户的id string
    review, //用户提供的评价 string
    degree, //评分 number
    chatId //用于标识一次完整的对话，即每新增一次聊天，这一id++ number
  })
}
