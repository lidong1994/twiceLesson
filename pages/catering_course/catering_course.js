var common = require("../../common/common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: '',
    lesson: [{
      images: '../../images/fengmian.jpg',
      title: "像KFC一样建立数据中心",
      name: '张三',
      position: '百慕大公司执行总监',
      time:26,
      people:88
    },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        name: '张三',
        position: '百慕大公司执行总监',
        time: 26,
        people: 88
      },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        name: '张三',
        position: '百慕大公司执行总监',
        time: 26,
        people: 88
      },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        name: '张三',
        position: '百慕大公司执行总监',
        time: 26,
        people: 88
      },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        name: '张三',
        position: '百慕大公司执行总监',
        time: 26,
        people: 88
      },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        name: '张三',
        position: '百慕大公司执行总监',
        time: 26,
        people: 88
      }, {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        name: '张三',
        position: '百慕大公司执行总监',
        time: 26,
        people: 88
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.caleHeight();

  },
    caleHeight(){
    let query = wx.createSelectorQuery();
    query.select('.all_lesson').boundingClientRect(rect => {
      let clientHeight = parseInt(rect.height);
      if (this.data.currentTab == 0) {
        var haha = common.isCales(this.data.lesson, clientHeight)
        this.setData({
          winHeight: haha
        })
      }
    }).exec();
  },
/**
 * 跳转课程详情
 */
  lesson_details(){
wx.navigateTo({
  url: '../../pages/lesson_details/lesson_details',
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
    // 这里调caleHeight（e）
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})