const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    list: [],
    text: [],
    ids: '',
    total: '',
    toast: true
  },
  /**
   * 选择金币充值
   */
  select_money(e) {
    this.setData({
      tab: e.currentTarget.dataset.id,
      ids: e.currentTarget.dataset.ids,
      total: e.currentTarget.dataset.total
    })
    console.log(e.currentTarget.dataset.ids)
  },

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

  voucher() {
    request.requestjSON(url.connect.baseURL + "/recharge_list").then(res => {
      this.setData({
        list: res.data,
        total: res.data[0].total_fee,
      })
    })
  },
  pay(e) {
    var id = this.data.ids
    var total =this.data.total
    if (total == "" || total==undefined) {
      this.toast('充值金额不能为空');
      return false;
    }
    request.requestPost(url.connect.baseURL + "/recharge_money", {
      uid: id,
      money: total,
    }).then(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.voucher()
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