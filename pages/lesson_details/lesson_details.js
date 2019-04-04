// pages/lesson_details/lesson_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight:'',
    winHeight0: '',
    imgheight:'',
    tab:2,
    images:"../../images/11.26c4f4f.jpg",
    jingxuan: [
      '../../images/jingxuan.jpg',
      '../../images/jingxuan1.jpg',
      '../../images/jingxuan2.jpg'

    ],
    lesson: [{
        num: '01',
        title:'面试的流程和技巧（1）',
      },
      {
        num: '01',
        title:'面试的流程和技巧（2）',
      },
      {
        num: '01',
        title:'面试的流程和技巧（3）',
      },
      {
        num: '01',
        title:'面试的流程和技巧（4）',
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function () {
    // 页面渲染完成  
    this.caleHeight()
  },
  /**
   * 计算高度
   */
  caleHeight() {
    var _this = this;
    let query = wx.createSelectorQuery();
    if (this.data.currentTab == 0) {
      wx.getImageInfo({
        src: _this.data.images,
        success: function (res) {
          _this.setData({
            imgheight: res.height,
            winHeight0: res.height + 390 + 'rpx'
          })
        }
      });
    }
    if(this.data.currentTab==1){
      query.select('.lesson_cc').boundingClientRect(rect => {
        let clientHeight = parseInt(rect.height);
        console.log(clientHeight)
        this.setData({
          winHeight0: clientHeight + 140+'px'
        })
      }).exec();
    }


  },
  /**
   * 课程选中
   */
  lessonTab(e){
    var tab = e.currentTarget.dataset.id
    console.log(tab)
    this.setData({
      tab:tab
    })

  },
  /**
   * 滑动  点击切换
   */
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.caleHeight()
  },
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      this.caleHeight()
    }
   
  },
})