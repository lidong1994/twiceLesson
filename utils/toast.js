
let toast=function(title){

  wx.showToast({
    title: title,
    image:'../../images/gantanhao.png'
  })
}
let toastSuccess = function (title) {
  wx.showToast({
    title: title,
  })
}
let mobile=function(mobile){
  return /^1[34578]\d{9}$/.test(mobile)
}

module.exports = {
  toast,
  mobile,
  toastSuccess
};