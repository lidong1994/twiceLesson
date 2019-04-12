var toast = require('/../../utils/toast.js'); //引用封装好的加密解密js
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    radioCheckVal: '男士',
    name: '',
    phone: '',
    zhiwei: '',
    brand: '',
    id: '',
    remark: '',
    sex: [{
        id: 1,
        sex: '先生',

      },
      {
        id: 0,
        sex: '女士',

      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
  },
  /**
   * 性别
   */
  radioChange(e) {
    this.setData({
      radioCheckVal: e.detail.value
    })
    console.log(e.detail.value)
  },
  /**
   * 报名信息
   */
  inputValue(e) {
    if (e.currentTarget.dataset.id == "name") {

      this.setData({
        name: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == "phone") {

      this.setData({
        phone: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == "zhiwei") {

      this.setData({
        zhiwei: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == "brand") {

      this.setData({
        brand: e.detail.value
      })
    }
    if (e.currentTarget.dataset.id == "remark") {

      this.setData({
        remark: e.detail.value
      })
    }
  },
  /**
   * 提交表单
   */
  btn() {
    var mobile = toast.mobile(this.data.phone)
    if (this.data.radioCheckVal == "") {
      toast.toast("请选择性别")
      return false;
    }
    if (!this.data.name) {

      toast.toast("称呼不能为空");
      return false;
    }
    if (!this.data.phone) {
      toast.toast("联系方式不为空");
      return false;
    }
    if (!mobile) {
      toast.toast("手机格式不正确");
      return false;
    }
    this.senForm()
  },
  /**
   * 提交表单
   */
  senForm() {
    request.requestPost(url.connect.baseURL + "/underline_apply", {
      call_name: this.data.name,
      phone: this.data.phone,
      gender: this.data.radioCheckVal,
      un_id: this.data.id,
      remark: this.data.remark,
      company: this.data.brand,
      job: this.data.zhiwei
    }).then(res => {
          console.log(res)

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