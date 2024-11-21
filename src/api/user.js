// 这里大概需要实现一下几个请求，后端看着办
import instance from '@/utils/request.js'

//注册功能，向数据库传递数据，post中的链接是假的，参数列表应该是真的，下同
//数据库中的字段也要做调整
export const userRegisterService = ({
  phone,
  password,
  repassword,
  code,
  certificate,
  name
}) => {
  return instance.post('/api/reg', {
    phone,
    password,
    repassword,
    code,
    certificate,
    name
  })
}

//登录，和数据库中的数据做校验
export const userLoginService = ({ phone, password, code }) => {
  return instance.post('/api/login', {
    phone,
    password,
    code
  })
}

//以下功能都不太准确，后续还要调整，先解释一下
//这个功能在页面上有一个按钮完善个人信息，从前端获取来数据后再向后端和数据库发送
export const userGetInfoService = () => {
  return instance.get('/my/userinfo')
}

//这个是修改个人信息
export const userUpdateService = ({ nickname, gender, age, email }) => {
  return instance.post('/updateInf', {
    nickname,
    gender,
    age,
    email
  })
}

//这个是修改头像 先饼着
export const userUploadAvatarService = (avatar) =>
  instance.patch('/my/update/avatar', { avatar })

//修改登录密码，同样饼着
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  instance.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
