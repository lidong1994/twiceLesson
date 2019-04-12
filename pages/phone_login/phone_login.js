const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
const Dec = require('/../../aes_ecb/test.js'); //引用封装好的加密解密js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', //手机号
    iscode: null, //用于存放验证码接口里获取到的code
    btns: false,
    clearPhoneHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindGetUserInfo(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权')

          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              wx.redirectTo({
                url: '../../pages/wx_logon_phone/wx_logon_phone',
              })
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
   * 获取input输入框的值
   */
  getNameValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
    if (this.data.phone) {
      this.setData({
        clearPhoneHidden: false
      })
    } else {
      this.setData({
        clearPhoneHidden: true
      })
    }
    if (this.data.phone.length == 11) {
      this.setData({
        btns: true
      })
    } else {
      this.setData({
        btns: false
      })
    }
  },
  /**
   * 清除手机号
   */
  clearPhone() {
    this.setData({
      phone: ""
    })
  },
  /**
   * 获取code
   */
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 验证手机号
   */

  /**
   * 跳转发送验证码页面
   */
  // btn_e(){
  //   var phone=this.data.phone
  //   var _this = this;
  //   var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
  //  if(!phone){
  //    wx.showToast({
  //      title: '手机号不能为空',
  //    })
  //    return false;
  //  }
  //   if (!myreg.test(this.data.phone)){
  //     wx.showToast({
  //       title: '手机格式不正确',
  //     })
  //     return false;
  //   }
  //   this.btn_e_j(phone)
  // },
  /**
  //  * 跳转
  //  */
  // btn_e_j(phone) {

  //   wx.navigateTo({
  //     url: '../../pages/login_code/login_code?phone=' + phone,
  //   })
  //},
  // /**
  //  * 获取手机验证码
  //  */
  // getPhoneCode() {
  //   let that = this
  //   request.requestPost(url.connect.baseURL + "/phone_login", {
  //     phone: 19906413371,
  //     code: 111111
  //   }).then(res => {
  //     if (res.result_code == 200) {
  //       common.toastSuccess("登陆成功")
  //       let token = res.data.token
  //       this.getSign(token)
  //       //登录成功后重新生成带token 的验签存入缓存
  //       wx.setStorageSync("token", token)
  //     } else {
  //       common.toast(res.message)
  //     }

  //   })
  // },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})