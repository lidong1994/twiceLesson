// pages/member_center/member_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddens: true,
    tab:'0',
    pirce:'',
    ipad:'-25',
    list: [{
      title: '月会员',
      price: '98',
      time: '月'

    },
    {
      title: '季会员',
      price: '388',
      time: '季'

    },
    {
      title: '年会员',
      price: '588',
      time: '年'

    }]
  },
  /**
   * 开通会员
   */
  xufei_btn() {
    this.setData({
      hiddens: false
    })
  },
  /**
   * 选择套餐
   */
  set_meal(e){
this.setData({
  tab:e.currentTarget.dataset.id,
  price: e.currentTarget.dataset.price
})
  },
  /**
   * 取消弹框
   */
  cancel_dialog(){
    this.setData({
      hiddens:true
    })
  },
  /**
   * 确认开通会员
   */
  sure_open_vip(){
    if(this.data.price){
    
      this.setData({
        hiddens: true
      })

    } else {
      wx.showToast({
        title: '请选择套餐',
        image:'../../images/gantanhao.png'
      })
      }

  },
  /**
 * 兼容ipd等大机型
 */
  ipad() {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        if (res.screenHeight > 1000) {
          that.setData({
            ipad: -32
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.ipad()
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