export const getFormattedDate = (tempId) => {
  const temp = Date.now()
  const date = new Date(temp)

  // 格式化输出日期和时间
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  tempId.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
