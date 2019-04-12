var toast = require("/../../utils/toast.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageHeight:'',
    tools_details:{},
    title:'',
    id:'',
    toos_img:[],
    lesson: [],
    loves:'',
    zan:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
        var id=options.id
    request.requestjSON(url.connect.baseURL + "/tool", {tid:id}).then(res => {
      console.log(res.data)
        this.setData({
          tools_details:res.data.info,
          lesson: res.data.relative_subjects,
          toos_img:res.data.info.preview_big_path,
          id: res.data.info.tid,
          title: res.data.info.title,
          loves: res.data.is_collected,
          zan: res.data.thump
        })
        wx.hideLoading()
    })
  },
  /**
   * 点赞
   */
/***
 * 点击预览大图
 */
  previewImg: function (e) {
var that=this
let arr=this.data.toos_img.split(",")
console.log(arr)
    wx.previewImage({
      urls: arr,     //当前图片地址              //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 动态获取图片高度
   */
  imageHeight(e){
  this.setData({
    imageHeight:e.detail.height
  })
  },
/**
 * 收藏
 */

  yilove() {
    var love = this.data.loves
    var id = this.data.id
    if (love == 0) {
      request.requestPost(url.connect.baseURL + "/action_collection", {
        id: id,
        type: 1
      }).then(res => {
        console.log(res)
        if (res.result_code == 200) {
          toast.toastSuccess('已收藏')
          this.setData({
            loves: 1
          })
        }

      })
    }
    if (love == 1) {
      request.requestPost(url.connect.baseURL + "/action_collection", {
        id: id,
        type: 1
      }).then(res => {
        if (res.result_code == 200) {
          toast.toastSuccess('取消收藏')
          this.setData({
            loves: 0
          })
        }
      })
    }
  },
  /**
   * 赞
   */
  zan(e){ 
    var id = this.data.id
    request.requestjSON(url.connect.baseURL + "/tools_thumb_action", { tid: id, action:1 }).then(res => {
        if(res.data.saved==1){
          toast.toastSuccess("已点赞")
        }
        this.setData({
          zan:1
        })
    })
  },
/**
 * 取消点赞
 */
  cancel_zan(){
    var id = this.data.id
    request.requestjSON(url.connect.baseURL + "/tools_thumb_action", { tid: id, action: 0 }).then(res => {
      if (res.data.saved == 1) {
        toast.toastSuccess("取消点赞")
      }
      this.setData({
        zan: 0
      })
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
  onShareAppMessage: function (ops) {
var title=this.data.title
var id=this.data.id
      if (ops.from === 'button') {
        // 来自页面内转发按钮
        console.log(ops.target)
      }
      return {
        title: title,
        path: 'pages/tools_details/pages_details?id='+id,
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