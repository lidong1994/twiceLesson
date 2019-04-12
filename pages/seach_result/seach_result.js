const request = require('/../../request/request.js')
const url = require('/../../url/url.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: [],
    all_subject: [],
    all_tools: [],
    hidden_more: false,
    hidden_more1: false,
    more:'点击加载更多',
    more1: '点击加载更多',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = options.type
    var value = options.keyword
    if (type == 0) {
      this.getSeachValue(type, value)
    }
    if (type == 1) {
      this.getLesson(type, value)
    }
    if (type == 2) {
      this.getTools(type, value)
    }

  },
  /**
   * 视频详情
   */
  lesson_details(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id='+id,
    })
  },
  /**
   * 点击加载更多
   */
  more_b(e) {
    var id = e.currentTarget.dataset.id
    if (id == 1) {
      if (this.data.all_subject.length<=3){
        this.setData({
          more:'没有更多数据了'
        })
      }else{
        this.setData({
          subject: this.data.all_subject,
          tools: [],
          hidden_more: true

        })
      }

    }
    if (id == 2) {
      if (this.data.all_tools.length <= 3){
        this.setData({
          more1: '没有更多数据了'
        })
      }else{
        this.setData({
          tools: this.data.all_tools,
          subject: [],
          hidden_more1: true
        })
      }

    }

  },
  /**
   * 获取工具搜索结果
   */
  getTools(type, value) {
    let that = this
    request.requestjSON(url.connect.baseURL + "/search", {
      keyword: value,
      type: type,
      page: 1,
      page_amount: 20
    }).then(res => {
      console.log(res)
      that.setData({
        tools: res.data,
        hidden_more1: true
      })
    })
  },
  /**
   * 获取课程搜索结果
   */
  getLesson(type, value) {
    let that = this
    request.requestjSON(url.connect.baseURL + "/search", {
      keyword: value,
      type: type,
      page: 1,
      page_amount: 20
    }).then(res => {
      console.log(res)
      that.setData({
        subject: res.data,
        hidden_more: true
      })
    })
  },

  /**
   * 获取搜索结果
   */
  getSeachValue(type, value) {
    let that = this
    request.requestjSON(url.connect.baseURL + "/search", {
      keyword: value,
      type: type,
      page: 1,
      page_amount: 20
    }).then(res => {
      console.log(res)

      that.setData({
        all_subject: res.data.subject,
        all_tools: res.data.tools,
        subject: res.data.subject.slice(0, 3),
        tools: res.data.tools.slice(0, 3)
      })
    })
  },
  /**
   * 工具详情跳转
   */
  tools_details(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/tools_details/tools_details?id=' + id,
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