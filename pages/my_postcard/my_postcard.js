const request = require('/../../request/request.js')
var toast = require("/../../utils/toast.js")
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    luckList: [],
    toast: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getUserInfo()
    this.luckList()
  },
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
   * 充值
   */
  yue() {
    wx.navigateTo({
      url: '../../pages/voucher_center/voucher_center',
    })
  },
  /**
   * 我的换购
   */
  my_replace() {
    wx.navigateTo({
      url: '../../pages/my_replacement/my_replacement',
    })
  },
  /**
   * 交易明细
   */
  transaction_details() {
    wx.navigateTo({
      url: '../../pages/transaction_details/transaction_details',
    })
  },
  /**
   * 获取用户信息 余额 收入
   */
  getUserInfo() {
    request.requestjSON(url.connect.baseURL + "/user_info", ).then(res => {

      this.setData({
        list: res.data
      })
    })
  },
  /**
   * 优惠券列表
   */
  luckList() {
    request.requestjSON(url.connect.baseURL + "/profile_coupon_list", {
      page: 1,
      page_amount: 100
    }).then(res => {
      console.log(res)
      this.setData({
        luckList: res.data.list
      })
      wx.hideLoading()
    })
  },
  /**
   * 兑换优惠券
   */
  coupon(e) {
    var id = e.currentTarget.dataset.id
    request.requestPost(url.connect.baseURL + "/profile_coupon_exchange", {
      coupon_id: id
    }).then(res => {
      if(res.data.saved==1){
        this.toast('兑换成功')
        this.getUserInfo()
      }
      if (res.data.saved == 0) {
        this.toast(res.message)
      }
      
    })
  },
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