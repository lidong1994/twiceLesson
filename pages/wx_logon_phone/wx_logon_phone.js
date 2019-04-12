const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
const Dec = require('/../../aes_ecb/test.js'); //引用封装好的加密解密js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toast: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getSign()
  },
  // getPhoneCode() {
  //   let that = this
  //   request.requestPost(url.connect.baseURL + "/phone_login", {
  //     phone: 19906413371,
  //     code: 111111
  //   }).then(res => {
  //     if (res.result_code == 200) {
  //       this.toast("登录成功")
  //       let token = res.data.token
  //       this.getSign(token)
  //       //登录成功后重新生成带token 的验签存入缓存
  //       wx.setStorageSync("token", token)
  //     } else {
  //       this.toast(res.message)
  //     }

  //   })
  // },
  /**
   * 提示框
   */

  toast(text) {
    let that = this
    this.setData({
      text: text,
      toast: false
    })
    setTimeout(function() {
      that.setData({
        toast: true
      })
    }, 1000)
  },
  /**
   * 获取手机号
   */
  getPhoneNumber(e) {
    let that = this
    wx.showLoading({
      title: '登录中',
    })
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: res => {
          console.log(res.code)
          request.requestPost(url.connect.baseURL + "/phone_xiaologin", {
            encrypted_data: e.detail.encryptedData,
            weichat_code: res.code,
            iv: e.detail.iv
          }).then(res => {
            if (res.result_code == 200) {
              wx.setStorageSync("token", res.data.token)
              wx.hideLoading()
              wx.switchTab({
                url: '../../pages/index/index',
              })
            } else {
              that.toast('登录失败,请尝试再次登录');
              wx.hideLoading()
            }

          })
        }
      })
    } else {

    }

    console.log(e)
  },
  /**
   * 生成验签
   */
  // getSign(token) {

  //   var timestamp = Date.parse(new Date());
  //   wx.getSystemInfo({
  //     success(res) {
  //       let sign = {
  //         token: token,
  //         app_version: '1.1.0',
  //         device_brand: res.brand,
  //         device_id: '789565',
  //         device_name: res.model,
  //         device_system: res.system,
  //         device_type: '3',
  //         timestamp: timestamp
  //       }
  //         var sign_str = JSON.stringify(sign);
  //         var jsonS = Dec.Encrypt(sign_str)
  //         wx.setStorageSync('sign', jsonS)
  //         wx.navigateTo({
  //           url: '../../pages/index/index',
  //           success:res=>{
  //             wx.hideLoading()
  //           }
  //         })

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