var toast = require('/../../utils/toast.js'); //引用封装好的加密解密js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    food_item: '西餐',
    selectFoodName: '',
    selectPosition: '',
    hidden: true,
    tap: '', //判断组件使用哪一个
    restaurantHidden: true,
    hidden_positions: true,
    count_name: '', //账号
    phone_value: '', //手机号
    city: '', //城市
    address_value: '', //收货地址
    types: '',
    listData: [],
    position: [{
        name: '总监',
        id: 0
      },
      {
        name: '总经理',
        id: 1

      },
      {
        name: '区域经理',
        id: 2

      },
      {
        name: '店长',
        id: 3

      },
      {
        name: '厨师长',
        id: 4

      },
    ],
    food: [{
        name: '中餐',
        id: 0,
      },
      {
        name: '法餐',
        id: 1
      },
      {
        name: '西餐',
        id: 2
      }, {
        name: '中餐',
        id: 0,
      },
      {
        name: '法餐',
        id: 1
      },
      {
        name: '西餐',
        id: 2
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 餐饮种类
   */
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value.name)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 取消弹框 接受子组件传值
   */
  dialog(e) {
    this.setData({
      hidden: e.detail.hiddens,
      hidden_positions: e.detail.hiddens,

    })
  },
  /**
   * 选择职位向父组件传值
   */
  select_position() {
    this.setData({
      listData: this.data.position,
      types: '请选择职级',
      tap: 1
    })
    this.setData({
      hidden: false
    })
  },
  /**
   * 餐饮类型弹框
   */
  res_() {
    this.setData({
      listData: this.data.food,
      types: '请选择餐饮类型',
      tap: 2
    })
    this.setData({
      hidden: false
    })
  },
  /**
   * 选地址
   */
  select_address() {
    // 地图选择
    let that = this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          address: res.name
        })
      },
    })

  },
  /**
   * 接受子组件传值(餐饮类型)))
   */
  getcanyin(e) {
    let tapBs = e.detail.tapB
    if (tapBs == 1) {
      this.setData({
        selectPosition: e.detail.paramBtoA,
        hidden: true
      })
      console.log(this.data.selectPosition, '职称')
    }


    if (tapBs == 2) {
      this.setData({
        selectFoodName: e.detail.paramBtoA,
        hidden: true
      })
      console.log(this.data.selectFoodName, '餐饮类型')
    }


  },

  /**
   * 表单保存
   */
  count_name(e) {
    this.setData({
      count_name: e.detail.value
    })
  },

  phone_value(e) {
    this.setData({
      phone_value: e.detail.value
    })
  },
  city(e) {
    this.setData({
      city: e.detail.value
    })
  },
  address_value(e) {
    this.setData({
      address_value: e.detail.value
    })
  },
  /**
   * 保存提交
   */
  save_() {
    let mobile = toast.mobile(this.data.phone_value)
    if (!this.data.count_name) {
      toast.toast("账号不能为空")
      return false;
    }
    if (!this.data.phone_value) {

      toast.toast("手机号不能为空")
      return false;
    }
    if (!mobile) {
      toast.toast("手机号格式不正确")
      return false;
    }
    if (!this.data.selectFoodName) {
      toast.toast("餐饮类型不能为空")
      return false;
    }
    if (!this.data.selectPosition) {
      toast.toast("职称不能为空")
      return false;
    }
    if (!this.data.city) {
      toast.toast("城市不能为空")
      return false;
    }
    if (!this.data.address_value) {
      toast.toast("收货地址不能为空")
      return false;
    }
    console.log(this.data.count_name, this.data.phone_value, this.data.selectPosition, this.data.selectFoodName, this.data.city, this.data.address_value)
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