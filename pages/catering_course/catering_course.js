var common = require("../../common/common.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    loaddingHidden: true, //加载中
    getLessonLength: [0, 1],
    winHeight: '',
    lessonTab: [], //课程标签
    lesson: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLessonTab()

  },
  caleHeight(length) {
    let query = wx.createSelectorQuery();
    query.select('.all_lesson_content').boundingClientRect(rect => {
      let clientHeight = parseInt(rect.height);
      console.log(clientHeight)
      this.setData({
        winHeight: clientHeight*length
      })
    }).exec();
    setTimeout(() => {
      wx.hideLoading();
    }, 1100);
  },

  /**
   * 跳转课程详情
   */
  lesson_details(e) {
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id='+id
    })
  },
  /**
   * 加载课程标签
   */
  getLessonTab() {
    wx.showLoading({
      title: '加载中',
    })
    request.requestjSON(url.connect.baseURL + "/subject_tags").then(res => {
      var id = res.data.normal[0].tag_id
      this.setData({
        getLessonTab: res.data.normal,
        getLessonLength: res.data.normal.length
      })
      this.getLessonList(id)

    })
  },
  /**
   * 根据标签id获取课程列表
   */
  getLessonList(id) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    request.requestjSON(url.connect.baseURL + "/tag_subjects", {
      page: 1,
      page_amount: 20,
      tag_id: id
    }).then(res => {
      console.log(res.data)
      this.setData({
        lesson: res.data
      })
      this.caleHeight(res.data.length)

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

  },
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    var id = that.data.getLessonTab[this.data.currentTab].tag_id
    this.getLessonList(id)

  },
  clickTab: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.getLessonList(id)
  },
})