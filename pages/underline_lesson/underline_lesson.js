const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLineLesson()
  },

  /**
   * 获取线下课
   */
  getLineLesson() {
    request.requestjSON(url.connect.baseURL + "/underline_list", {
      page: 1,
      page_amount: 20
    }).then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  /**
   * 线下课跳转详情
   */
  line_btn(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/underline_lesson_details/underline_lesson_details?id='+id,
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