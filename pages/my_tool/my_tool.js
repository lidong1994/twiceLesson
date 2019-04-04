// pages/my_tool/my_tool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        image: '../../images/fengmian.jpg',
        title: '明确知道门店每月的各项成本及利润',
        text: [{
            text: '利润'
          },
          {
            text: '成本'
          }
        ]
      },
      {
        image: '../../images/fengmian.jpg',
        title: '明确知道门店每月的各项成本及利润',
        text: [{
            text: '利润'
          },
          {
            text: '成本'
          }
        ]
      },
      {
        image: '../../images/fengmian.jpg',
        title: '明确知道门店每月的各项成本及利润',
        text: [{
            text: '利润'
          },
          {
            text: '成本'
          }
        ]
      },
      {
        image: '../../images/fengmian.jpg',
        title: '明确知道门店每月的各项成本及利润',
        text: [{
            text: '利润'
          },
          {
            text: '成本'
          }
        ]
      },
      {
        image: '../../images/fengmian.jpg',
        title: '明确知道门店每月的各项成本及利润',
        text: [{
            text: '利润'
          },
          {
            text: '成本'
          }
        ]
      },
      {
        image: '../../images/fengmian.jpg',
        title: '明确知道门店每月的各项成本及利润',
        text: [{
            text: '利润'
          },
          {
            text: '成本'
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 产看工具详情
   */
  tools_details() {
    wx.navigateTo({
      url: '../../pages/tools_details/tools_details',
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'XXX小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})