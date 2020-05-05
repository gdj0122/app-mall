import {BaseURL} from './config'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//网络请求
function request (parameters="",success,method="GET",header={} ) {
  wx.request({
    url:BaseURL+(method == "GET" ? "?" : "")+parameters,
    method:method,
    header:header? header : "application/json",
    success:(res)=>{
      console.log(res);
      success(res);
    }
  })
}
//成功提示
function showSuccess(title = "成功啦", duration = 2500){
  wx.wx.showToast({
    title: title,
    icon: 'none',
    image: 'success',
    duration: (duration <= 0) ? 2500 : duration
  });
}
function ShowLoading(title = "请稍后", duration = 5000){
  wx.showToast({
    title: title ,
    icon: 'loading',
    duration:(duration <= 0) ? 5000 : duration
  });
}
// 隐藏显示框
function hideToast(){
  wx.hideToast();
}
module.exports = {
  formatTime: formatTime,
  request:request,
  showSuccess,
  ShowLoading,
  hideToast
}
