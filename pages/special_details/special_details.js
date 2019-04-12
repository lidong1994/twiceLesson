const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.setData({
        image:options.image
      })
    this.getSpecialDetails(options.id)
  },
  /**
   * 获取专题详情
   */
  getSpecialDetails(id) {
    var obj = []
    request.requestjSON(url.connect.baseURL + "/packageid_subjects", {
      page: 1,
      page_amount: 20,
      pid: id
    }).then(res => {
      let list = res.data
      for (var i = 0; i < list.length; i++) {
        let s = {}
        s['tag_name'] = list[i][0].tag_name
        s['lists'] = list[i]
        obj = obj.concat(s);
        console.log(obj)
      }
      this.setData({
        list: obj
      })
    })
  },
  /**
   * 跳转课程详情
   */
  lesson_tab(e){
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id='+e.currentTarget.dataset.id,
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