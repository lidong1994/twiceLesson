var common = require("../../common/common.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaddingHidden:true,
    currentTab: 0,
    indicatorDots: true,
    ipad: "41",
    tabLength: [0, 1],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    winHeight: '',
    toolsType: [], //工具分类
    imgUrls: [], //轮播；；；；sssss
    scrollWidth: '',
    toolsList:[],//工具列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getToolsInfo()
  },
  caleWidth() {
    let query = wx.createSelectorQuery();
    query.select('.swiper-tab-item').boundingClientRect(rect => {
      let clientHeight = parseInt(rect.width);
      var haha = common.isCales(this.data.toolsType, clientHeight)
      this.setData({
        scrollWidth: haha + 106
      })
    }).exec();
  },

  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    let touchId=[]
    touchId = this.data.toolsType
    let id=touchId[this.data.currentTab].id
    this.getToolsLists(id)
  },
  clickTab: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      this.getToolsLists(id)
    }
  },

  /**
   * 根据工具id获取数据
   */

  getToolsLists(id) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    request.requestjSON(url.connect.baseURL + "/tools_list", {
      page: '1',
      page_amount: '2',
      category_id: id
    }).then(res => {
     let length=Number(res.data.length)
     console.log(res)
      that.setData({
        toolsList:res.data,
        winHeight:(60*length)
      })
      wx.hideLoading()
    })

  },
  /**
   * 兼容ipd等大机型
   */
  ipad() {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        if (res.screenHeight > 1000) {
          that.setData({
            ipad: 48
          })
        }
      },
    })
  },
  /**
   * 获取工具分类信息
   */
  getToolsInfo() {
    let that = this
      wx.showLoading({
        title: '加载中',
      })
    request.requestjSON(url.connect.baseURL + "/tools_index", {}).then(res => {
      console.log(res)
      let id=res.data.category[0].id
      that.setData({
        imgUrls: res.data.banner,
        toolsType: res.data.category,
        tabLength: res.data.category.length
      })
      that.getToolsLists(id)
      that.caleWidth()
      that.ipad()


    })
  },
  /**
   * 跳转工具详情
   * 
   */
  tools_details(e) {
    var id=e.currentTarget.dataset.id 
    wx.navigateTo({
      url: '../../pages/tools_details/tools_details?id='+id,
    })
  },
  /**
   * 获取数据
   * tab内容从后台获取 每一个类带一个id  通过点击或者滑动获取当前选项的id  传给后台  封装一个请求函数id 作为参数  获取到数据后  拿到数据的长度封装的  检测长度的函数判读长度  然后给出  所需要的高度 
   */
  getDatas() {},
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