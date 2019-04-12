const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
const time = require('/../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getLoveList()
  },
  /**
   * 获取收藏列表
   */
  getLoveList(){
    request.requestjSON(url.connect.baseURL + "/profile_collection", {
      page: 1,
      page_amount: 20
    }).then(res => {
      var datas = res.data
      for (var i = 0; i < datas.length; i++) {
        datas[i]["create_time"] = time.formatTime(datas[i]["create_time"])
      }
      this.setData({
        list: datas
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 长按删除
   */
  longpress: function (e) {
  
    let that = this
    var id = e.currentTarget.dataset.id
    var ids='['+id+']';
    console.log(ids)
    wx.showModal({
      title: '确定删除吗',
      success(res) {
        if (res.confirm) {
          that.deleted(ids)
        } else if (res.cancel) {

        }
      }

    })
  },
  /**
   * 删除收藏
   */
  deleted(ids) {
    request.requestPost(url.connect.baseURL + "/collection_bundle_clear", { collection_ids:ids}).then(res => {
      if(res.data.saved==1){
        this.getLoveList()
      }
    })
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