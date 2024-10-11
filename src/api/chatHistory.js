//这里应该是医患之间聊天记录的相关操作，先饼着
import instance from '@/utils/request.js'

//医生/患者对话页面发送信息
export const sendChatMessage = ({ userId, message, doctorId, picUrl }) => {
  return instance.post('/sendChatMessage', {
    userId, //患者的id，其中为患者在个人中心的手机号码 string
    message, //输入框中的内容 string
    doctorId, //医生的id，为医生手机号码或者医师证号码 string
    picUrl //传输图片的url，若没有则为null string
  })
}
