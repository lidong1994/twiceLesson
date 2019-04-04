
const app = getApp()
var Dec = require('/../../aes_ecb/test.js'); //引用封装好的加密解密js
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
phone:'18615247756',
    phone_one:'',
    phone_two:'',
    phone_three: '',
    code:'',
    Length: 6, 
    alreadySend:'',       //输入框个数
    isFocus: true,    //聚焦
    Value: "",        //输入的内容
    ispassword: false, //是否密文显示 true为密文， false为明文。
    btns:false,
    second:10,
    dis:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phone = options.phone
    var phone_one = phone.substring(0, 3)
    var phone_two = phone.substring(3, 7)
    var phone_three = phone.substring(7, 11)
    this.setData({
      phone_one: phone_one,
      phone_two: phone_two,
      phone_three: phone_three,
      phone: options.phone

    })
    this.sendMsg()
  },
  /**
   * 聚焦
   */
  Focus(e) {
    var that = this;
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    })
    console.log(this.data.Value)
    if (this.data.Value.length == 6) {
      this.setData({
        btns: true
      })
    }
  },
  /**
   * 向后台请求验证码
   */

  getPhoneCode() {
    var that=this
    request.requestPost(url.connect.baseURL + "/phone_login", { phone: this.data.phone }).then(res => {
      if(res.result_code==200){
        wx.showToast({
          title: '发送成功',
          success(){
            that.timer();
          }
        })
      }
    })
  },
  /**
   * 重新发送验证码
   */
  sendMsg: function () {
    console.log('发送获取验证码')
    this.setData({
      alreadySend: false,
      dis:true
    })
    this.getPhoneCode()
  },

/**
 * 倒计时
 */
  timer: function () {
    console.log("aaa")
    //Promise:ES6将其写进了语言标准 获取异步操作的消息
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              dis: false,
              second: 10,
              alreadySend: true,
           
            })
            // resolve异步操作成功
            resolve(setTimer)
          }
        }
        , 1000)
    })
    // 将Promise对象的状态从“未完成”变为“成功”
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  Tap(e) {
    var that = this;
    console.log(e.currentTarget.dataset.id)
    that.setData({
      isFocus: true,
     })
  },
  formSubmit(e) {
    this.setData({
      code: e.detail.value.password
    })
    if (this.data.code.length<6){
      wx.showToast({
        title: '验证码不完整',
      })
      return false;
    }
 
    console.log(this.data.code)



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})