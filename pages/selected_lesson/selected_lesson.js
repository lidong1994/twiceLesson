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
    winHeight: '',
    winHeight1: '',
    select_lesson: [],
    free_lesson:[],
    getLessonTab:["在线精选","限免精选"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab:options.id
    })
    if (this.data.currentTab==0){
      this.getLessonList()
    }
    if (this.data.currentTab == 1) {
      this.getLessonFreeList()
    }
  
   

  },
  caleHeight(length) {
    let query = wx.createSelectorQuery();
    query.select('.all_lesson_content').boundingClientRect(rect => {
      let clientHeight = parseInt(rect.height);
      console.log(clientHeight)
      this.setData({
        winHeight: clientHeight * length
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
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id=' + id
    })
  },

  /**
   * 获取在线精选课程列表
   */
  getLessonList() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    request.requestjSON(url.connect.baseURL + "/online_select_subject", {
      page: 1,
      page_amount: 20,
    }).then(res => {
      if (res.data==[]||res.data==""){
        this.setData({
          select_lesson:[],
          winHeight:350

        })
        return false;
      }
      console.log(res.data)
      this.setData({
        select_lesson: res.data
      })
      this.caleHeight(res.data.length)

    })
  },
  /**
   * 获取限时免费列表
   */
  getLessonFreeList() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    request.requestjSON(url.connect.baseURL + "/limit_subjects", {
      page: 1,
      page_amount: 20,
    }).then(res => {
      console.log(res.data)
      this.setData({
        free_lesson: res.data
      })
      this.caleHeight(res.data.length)

    })
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

  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (this.data.currentTab == 0) {
      this.getLessonList()
    }
    if (this.data.currentTab == 1) {
      this.getLessonFreeList()
    }
  },
  clickTab: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.currentTab == 0) {
      this.getLessonList()
    }
    if (this.data.currentTab == 1) {
      this.getLessonFreeList()
    }

  },
})