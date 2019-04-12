var common = require("../../common/common.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
var toast = require("/../../utils/toast.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    _index: '',
    winHeight: '',
    end_time: 1,
    times: '',
    vedioId: '',
    id: '', //课程id
    zan: '',
    toast: true,
    yizan: '',
    go_loves: '',
    bottom_play: false,
    img_video: false,
    loves: '',
    winHeight0: '',
    dianzan: '',
    love: '',
    imgheight: 600, //图片原始高度
    title: '', //课程介绍标题
    images_url: '', //课程介绍图片
    vedio: [{}], //视频详情课程目录
    relevant_tools: [], //相关工具
    subject_introduce: [], //课程介绍
    aboutLesson: [], //相关课程
    vedioSrc: [],
    tab: 0,
    jingxuan: [
      '../../images/jingxuan.jpg',
      '../../images/jingxuan1.jpg',
      '../../images/jingxuan2.jpg'

    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      duration: 1200
    })
    this.subject_information(options.id)
    request.requestjSON(url.connect.baseURL + "/subject_directory", {
      sid: options.id
    }).then(res => {
      console.log(res)
      console.log(res.data[0])
      this.setData({
        vedio: res.data[0],
        relevant_tools: res.data[1],
        aboutLesson: res.data[2],
        vedioSrc: res.data[0][0].file_url,
        vedioId: res.data[0][0].vid,
        vedioImage: res.data[0][0].file_url,
      })
    })

  },
  /**
   * 弹框组件
   */
  toast(text) {
    let that = this
    this.setData({
      text: text,
      toast: false
    })
    setTimeout(function () {
      that.setData({
        toast: true
      })
    }, 1000)
  },
  /**
   * 播放 限制	【1】允许观看状态【0】在根据free_time判断
   */
  video_play(e) {
    var shi = wx.createVideoContext('myVideo1');
    var times = e.currentTarget.dataset.time;
    this.setData({
      times: times
    })

    if (e.currentTarget.dataset.type == 0) {
      this.toast("此课程开通会员后才可以观看");
      return false
    }
    if (e.currentTarget.dataset.type == 1) {
      shi.play()
      this.setData({
        img_video: true,
        bottom_play: true

      })
    }

  },
  /**
   * 获取实时播放进度
   */
  bindtimeupdate(e) {
    var times = this.data.times
    var times_play = e.detail.currentTime
    this.setData({
      end_time: e.detail.currentTime
    })
    if (times > 0) {
      if (times_play >= times) {
        var shi = wx.createVideoContext('myVideo1');
        shi.stop()
        this.toast("购买会员可观看全部视频")
        this.setData({
          img_video: false
        })
        return;
      }
    }

  },
  /**
   * 课程介绍
   */
  subject_information(id) {
    let that = this
    request.requestjSON(url.connect.baseURL + "/subject_information", {
      sid: id
    }).then(res => {
      this.setData({
        subject_introduce: res.data,
        images_urls: res.data.image_introduction,
        dianzan: res.data.thumb,
        love: res.data.collection,
        id: res.data.sid,
        title: res.data.title
      })
      setTimeout(function () {
        that.caleHeight()
      }, 500)

    })
  },

  /**
   * 收藏
   */
  yilove() {
    var love = this.data.love
    var id = this.data.id

    if (love == 0) {
      request.requestPost(url.connect.baseURL + "/action_collection", {
        id: id,
        type: 2
      }).then(res => {
        console.log(res)
        if (res.result_code == 200) {
          toast.toastSuccess(res.message)
          this.setData({
            love: 1
          })
        }

      })
    }
    if (love == 1) {
      request.requestPost(url.connect.baseURL + "/action_collection", {
        id: id,
        type: 2
      }).then(res => {
        if (res.result_code == 200) {
          toast.toastSuccess(res.message)
          this.setData({
            love: 0
          })
        }
      })
    }
  },
  yizan() {
    var dianzan = this.data.dianzan
    var id = this.data.id
    if (dianzan == 0) {
      request.requestPost(url.connect.baseURL + "/subject_thumb", {
        id: id
      }).then(res => {
        if (res.result_code == 200) {
          toast.toast(res.message)
          this.setData({
            dianzan: 1
          })
        }
      })
      return false;
    }
    if (dianzan == 1) {
      this.setData({
        dianzan: 0
      })
    }
  },
  /**
   * 计算高度
   */
  caleHeight() {
    var _this = this;
    let query = wx.createSelectorQuery();
    if (this.data.currentTab == 0) {
      wx.getImageInfo({
        src: _this.data.images_urls,
        success: function (res) {
          _this.setData({
            imgheight: res.height,
            winHeight0: res.height + 390 + 'rpx'
          })
        }
      });
    }
    if (this.data.currentTab == 1) {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          var content_h = "";
          let h = (750 * res.windowHeight / res.windowWidth) / 2
          query.select('.ssss').boundingClientRect(rect => {
            let top = rect.height
            content_h = parseInt(h - top)
          })

          query.select('.lesson_cc').boundingClientRect(rect => {
            let clientHeight = parseInt(rect.height);
            console.log(clientHeight)
            if (clientHeight <= content_h) {
              that.setData({
                winHeight0: content_h + 'px'
              })
              return false;
            }
            that.setData({
              winHeight0: clientHeight + 120 + 'px'
            })
          }).exec();
        }
      })

    }

  },

  /**
   * 暂停播放
   */
  videoPlay: function (e) {
    var shi = wx.createVideoContext('myVideo1');
    shi.pause()
  },
  /**
   * 开始
   */
  videoPlay1: function (e) {
    var shi = wx.createVideoContext('myVideo1');
    shi.play()
    this.add_recode()
  },
  /**
   * 添加视频播放记录
   */
  add_recode() {
    let vid = this.data.vedioId
    let endtime = Math.floor(this.data.end_time)
    request.requestPost(url.connect.baseURL + "/video_record", {
      vid: vid,
      start_time: 0,
      end_time: endtime
    }).then(res => {
      console.log(res)
    })
  },
  /**
   * 课程选中
   */
  lessonTab(e) {
    this.videoPlay()
    var src = e.currentTarget.dataset.src
    var tab = e.currentTarget.dataset.id
    this.setData({
      tab: tab,
      vedioSrc: src,
      vedioId: e.currentTarget.dataset.vid
    })
    this.videoPlay1()

  },

  /**
   * 滑动  点击切换
   */
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.caleHeight()
  },
  clickTab: function (e) {
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

  /**,
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
    var id = this.data.vedioId
    var title = this.data.title
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: title,
      path: 'pages/lesson_details/lesson_details?id=' + id,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
})