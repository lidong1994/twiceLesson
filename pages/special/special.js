var common = require("../../common/common.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tab:[],
    tabLength:[0,1,2],
    tabId:'',
    list: [],
    winHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTabList()
  },
/**
 * 获取系列专题列表
 */
  getLessonList(id){

    request.requestjSON(url.connect.baseURL + "/subject_package", { page: 1, page_amount:20,cid:id}).then(res => {
    console.log(res)
    if(res.data==[]||res.data==""){
      this.setData({
        winHeight: 350,
        list:[]
      })
      wx.hideLoading();
      return false;
    }else{
      this.setData({
        list: res.data,
      })
      this.caleHeight(res.data.length)
    }
  

    })
  },
  /**\
   * 动态计算高度
   */
  caleHeight(length) {
    let query = wx.createSelectorQuery();
    query.select('.special_content_c').boundingClientRect(rect => {
      let clientHeight = parseInt(rect.height);
      console.log(clientHeight)
      this.setData({
        winHeight: (clientHeight+25)*length
      })
    }).exec();
    setTimeout(() => {
      wx.hideLoading();
    }, 1100);
  },
  /**
   * 获取标签分类
   */
  getTabList(){
    wx.showLoading({
      title: '加载中',
    })
    request.requestjSON(url.connect.baseURL + "/subject_package_category",).then(res => {
      console.log(res)
        this.setData({
          tab:res.data,
          tabLength:res.data.length,
        })
      this.getLessonList(res.data[0].id)
    })
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    let tabId = []
    tabId = this.data.tab
    let id = tabId[this.data.currentTab].id
    this.getLessonList(id)
  },
  clickTab: function (e) {
    var id=e.currentTarget.dataset.id
    console.log(id)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      this.getLessonList(id)
    }
  },
  /**
   * 专题跳转详情
   */
  special_details(e){
    var id=e.currentTarget.dataset.id
    var image = e.currentTarget.dataset.image
    console.log(id)
    wx.navigateTo({
      url: '../../pages/special_details/special_details?id='+id+'&image='+image,
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

  }
})