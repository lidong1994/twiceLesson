var common = require("../../common/common.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
const toast = require('/../../utils/toast.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_start: '',
    end_start: '',
    id: '',
    active_status: '',
    tools: [],//相关工具
    subjects: [],//相关课程   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id: id
    })
    this.getUnderLine(id)
  },
  /**
   * 时间戳转换字符串
   */
  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    return Y + M + D
  },
  getUnderLine(id) {
    request.requestjSON(url.connect.baseURL + "/underline", { un_id: id }).then(res => {
      console.log(res)
      var new_start = this.timestampToTime(res.data.start_time)
      var end_start = this.timestampToTime(res.data.end_time)
      this.setData({
        list: res.data,
        active_status: res.data.active_status,
        end_start,
        new_start
      })
      if (res.data.relat.length) {
        this.setData({
          tools: res.data.relat.tools,
          subjects: res.data.relat.subjects,
        })
      }
    })
  },
  /**
   * 去报名
   */
  baoming() {
    var id = this.data.id
    var active_status = this.data.active_status
    if (active_status == 0) {
      toast.toast("报名已结束");
      return false;
    }
    wx.navigateTo({
      url: '../../pages/sign_up_message/sign_up_message?id=' + id,
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