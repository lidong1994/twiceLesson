const request = require('/../../request/request.js')
var toast = require("/../../utils/toast.js")
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    list:[]
  },
  // /**
  //  * 换购详情
  //  */
  // replaceBuy() {
  //   this.setData({
  //     hidden: false,
  //   })
  // },
  /**
   * 接受子组件传值取消
   */

  // cancel(e) {
  //   this.setData({
  //     hidden: e.detail.hiddens
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.replaceInfo()
  },
  /**
   * 换购信息
   */
  replaceInfo(){
 
    request.requestjSON(url.connect.baseURL + "/profile_user_coupon_list", {
      page:'1',
      page_amount:80
    }).then(res=>{
      this.setData({
        list:res.data.list
      })
    })
  },
replace(e){
  var id = e.currentTarget.dataset.id
  request.requestPost(url.connect.baseURL + "/coupon_member", {user_coupon_id: id }).then(res=>{
    console.log(res)
    this.replaceInfo()
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

  }
})