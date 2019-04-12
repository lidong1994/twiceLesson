const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
const time = require('/../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  /**
   * 交易明细
   */
  transaction_details() {
    request.requestjSON(url.connect.baseURL + "/profile_account_log", {
      page: 1,
      page_amount: 20
    }).then(res => {
      var datas = res.data.list
      for (var i = 0; i < datas.length; i++) {
        datas[i]["create_time"] = time.formatTime(datas[i]["create_time"])
      }
      this.setData({
        list: datas
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.transaction_details()
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