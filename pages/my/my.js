//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{
      image: '../../images/love.png',
      text: "我的收藏",
      path: '../../pages/my_love/my_love'

    },
    {
      image: '../../images/postmoney.png',
      text: "我的钱包",
      path: '../../pages/my_postcard/my_postcard'

    },
    {
      image: '../../images/my_utils.png',
      text: "我的工具",
      path: '../../pages/my_tools/my_tools'

    },
    {
      image: '../../images/vip_center.png',
      text: "会员中心",
      page: '../../pages/member_center/member_center'

    },
    {
      image: '../../images/fuwu.png',
      text: "客户服务",

    },]
  },
  /**
   *我的 ——》》》》跳转
   */
  my_bat(e) {
    var tab = e.currentTarget.dataset.tab
    wx.navigateTo({
      url: tab,
    })

  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // /**
  //  * 获取验签
  //  * author:Lee
  //  * 2019/3/18
  //  */
  // getSign() {
  //   var timestamp = Date.parse(new Date());
  //   wx.getSystemInfo({
  //     success(res) {
  //       let sign = {
  //         token: '',
  //         app_version: '1.1.0',
  //         device_brand: res.brand,
  //         device_id: '789565',
  //         device_name: res.model,
  //         device_system: res.system,
  //         device_type: '3',
  //         timestamp: timestamp
  //       }
  //       if (sign) {
  //         var sign_str = JSON.stringify(sign);
  //         var jsonS = Dec.Encrypt(sign_str)
  //         wx.setStorageSync('sign', jsonS)
  //       }
  //     }
  //   })
  // },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
