const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_null: true, //输入框填写为空时
    seach_null: true, //搜索结果为空时
    input_value: '', //提示内容
    seach_value: '', //输入的内容,
    ipad: 20,
    types: '全部',
    tab: 0,
    hidden: true,
    type: [{
        title: '全部',
        id: 0
      },
      {
        title: '课程',
        id: 1
      },
      {
        title: '工具',
        id: 2
      },
      {
        title: '咨询',
        id: 3
      }
    ], //搜索类型
    hotSeach: [],

    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotSeach()
  },
  /**
   * 获取搜素结果
   */
  getSeachValue() {
    request.requestjSON(url.connect.baseURL + "/search", {
      keyword: this.data.seach_value,
      type: this.data.tab,
      page: 1,
      page_amount: 20
    }).then(res => {
      if (res.data.subject == "" && res.data.tools == "") {
        this.setData({
          input_null: false,
          input_value: '抱歉，没有发现相关内容'
        })
      } else {
        wx.navigateTo({
          url: '../../pages/seach_result/seach_result?type=' + this.data.tab + '&keyword=' + this.data.seach_value,
        })
      }
    })
  },
  /**
   * **********************************
   */
  getSeachValues() {
    request.requestjSON(url.connect.baseURL + "/search", {
      keyword: this.data.seach_value,
      type: this.data.tab,
      page: 1,
      page_amount: 20
    }).then(res => {
      if (res.data == "" || res.data == []) {
        this.setData({
          input_null: false,
          input_value: '抱歉，没有发现相关内容'
        })
      } else {
        wx.navigateTo({
          url: '../../pages/seach_result/seach_result?type=' + this.data.tab + '&keyword=' + this.data.seach_value,
        })
      }
    })
  },
  /**
   * 
   * input失去焦点函数
   */
  routeToSearchResPage: function(e) {

    //对历史记录的点击事件 已忽略
    let _this = this;
    let _searchKey = this.data.seach_value;
    if (!this.data.seach_value) {
      return
    }

    let history = wx.getStorageSync("history") || [];
    history.push(this.data.seach_value)
    wx.setStorageSync("history", history);
  },
  //每次显示钩子函数都去读一次本地storage
  onShow: function() {
    this.getHotSeach()
    this.ipad()
  },
  /**
   * 兼容ipd等大机型
   */
  ipad() {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        if (res.screenHeight > 1000) {
          that.setData({
            ipad: 27
          })
        }
      },
    })
  },
  /**
   * 选择课程类型
   */
  select_type(e) {
    this.setData({
      tab: e.currentTarget.dataset.id,
      types: e.currentTarget.dataset.name,
      hidden: true
    })
  },
  /**
   * 历史搜索 点击
   */
  seach_history(e){
    var words=e.currentTarget.dataset.words
    this.setData({
      seach_value: words
    })
    this.seach()
  },
  /**
   * 搜索类型
   * 
   */
  seach_type() {
    this.setData({
      hidden: !this.data.hidden
    })
  },
  /**
   *  清空page对象data的history数组 重置缓存为[]
   */
  clearHistory: function() {
    this.setData({
      history: []
    })
    wx.setStorageSync("history", [])
  },
  /**
   * 清空历史搜索
   */
  search_clear_history(){
    request.requestPost(url.connect.baseURL + "/search_clear_history").then(res => {
      this.clearHistory()
    })
  
  },
  /**
   * 获取/历史搜索/热门搜索
   */

  getHotSeach() {
    request.requestjSON(url.connect.baseURL + "/search_keywords", ).then(res => {
      this.setData({
        hotSeach: res.data.hot_keywords,
        history: res.data.history_keywords
      })
    })

  },
  /**
   * 点击搜索
   */
  seach() {
    if (!this.data.seach_value) {
      this.setData({
        input_null: false,
        input_value: '请填写搜索内容'
      })
    } else {
      this.setData({
        input_null: true,
      })
      if (this.data.tab == 0) {
        this.getSeachValue()
      } else {
        this.getSeachValues()
      }
      //调取搜索接口 如果返回数据为空则 弹出提示页 否则则携带搜索字段跳转搜索结果页进行接口请求
    }
  },
  seach_input(e) {
    this.setData({
      seach_value: e.detail.value
    })
  },
  /**
   * 热门搜索点击
   */
  seach_hot(e) {
    var title = e.currentTarget.dataset.title
    this.setData({
      seach_value: title
    })
    this.seach()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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