const request = require('/request/request.js')
const url = require('/url/url.js')
App({
  onLaunch: function () {
    this.user_token_validate()
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
/**
 * 校验token
 * 
 */
  user_token_validate(){
    request.requestPost(url.connect.baseURL + "/user_token_validate").then(res => {
      if (res.result_code==200){
        console.log(222)
        wx.navigateTo({
          url: '../../pages/index/index',
        })
      }
      if (res.result_code==401){
        wx.getSetting({
          success:res=>{
            if (res.authSetting['scope.userInfo']) {
              wx.reLaunch({
                url: '../../pages/wx_logon_phone/wx_logon_phone',
              })
            }else{
              wx.reLaunch({
                url: '../../pages/phone_login/phone_login',
              })
            }
          }
        })
  
      }
    })
  },
  globalData: {
    userInfo: null
  }
})