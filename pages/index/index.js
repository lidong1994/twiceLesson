const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
    loaddingHidden: true, //等待加载显示隐藏
    actEndTimeList: [],
    timeList: [],
    imgUrls: [], //轮播
    meunList: [], //主菜单
    jingxuan: [], //精选专题
    tools: [], //工具优选
    underlineLesson: {}, //线下课程
    recommendSubjectsVedio: {}, //精选课程
    recommendSubjectsList: [],
    timeLimitSubjects: [], //免费课程时间
    timeLimitList: [],
    timeLimitList1: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getIndexInfo()
  },
  /**
   * 轮播图跳转详情
   */
  banner_details(e) {
    var type = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    if (type == 1) {
      wx.navigateTo({
        url: '../../pages/lesson_details/lesson_details?id='+id,
      })
    }
    if (type == 2) {
      wx.navigateTo({
        url: '../../pages/tools_details/tools_details?id='+id,
      })
    }
  },
  /**
   * 时间补0
   */
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },

  /********************************************
   * 获取限时免费精选课程************************************************
   */

  /**********************************************************************************
   * 首页信息接口获取
   */
  getIndexInfo() {
    this.setData({
      loaddingHidden: false
    })
    request.requestjSON(url.connect.baseURL + "/index", {
      page: 1,
      page_amount: 20
    }).then(res => {
      console.log(res)
      if (res.result_code == 200) {
        let bannerList = []
        bannerList = res.data
        bannerList.forEach(o => {
          if (o.blockType == "slider") {
            this.setData({
              imgUrls: o.data
            })
          }
          if (o.blockType == "menu") {
            this.setData({
              meunList: o.data
            })
          }
          if (o.blockType == "subjectPackages") {
            this.setData({
              jingxuan: o.data
            })
          }
          if (o.blockType == "tools") {
            this.setData({
              tools: o.data
            })
          }
          if (o.blockType == "underline") {
            this.setData({
              underlineLesson: o.data
            })
          }
          if (o.blockType == "recommendSubjects") {
            let arr = []
            arr = o.data.slice(1)
            this.setData({
              recommendSubjectsVedio: o.data[0],
              recommendSubjectsList: arr
            })
          }
          if (o.blockType == "timeLimitSubjects") {
            this.setData({
              timeLimitList: o.data
            })
            var list = this.data.timeLimitList
            let endTimeList = []
            list.forEach(o => {
              endTimeList.push(o.deadline)
            })
            this.setData({
              timeLimitSubjects: endTimeList,
            })
            this.countDown();

          }
        })
        this.setData({
          loaddingHidden: true
        })
      }
    })
  },
  /**
   * 跳转搜索
   */
  seach() {
    wx.navigateTo({
      url: '../../pages/seach/seach',
    })
  },
  /**
   * 倒计时
   */
  countDown() {
    let that = this
    let newTime = Math.round(new Date() / 1000)
    let endTimeList = this.data.timeLimitSubjects;
    let countDownArr = [];
    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let obj = null;
      if (o - newTime > 0) {
        let time = (o - newTime);
        //获取时分秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)

        }
      } else {
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    that.setData({
      countDownList: countDownArr
    })

    var arr = that.data.timeLimitList
    var arrs = []
    arr.map(i => {
      i.list = countDownArr
      arrs.push(i); //属性
      that.setData({
        timeLimitList1: arrs
      })
    })

    setTimeout(that.countDown, 1000);

  },
  /**
   * 线下更多
   */
  line_more() {
    wx.navigateTo({
      url: '../../pages/underline_lesson/underline_lesson',
    })
  },
  /**
   * 在线精选更多跳转
   */
  select_more() {
    wx.navigateTo({
      url: '../../pages/selected_lesson/selected_lesson?id=0',
    })
  },
  /**
   * 限免精选
   */
  free_more() {
    wx.navigateTo({
      url: '../../pages/selected_lesson/selected_lesson?id=1',
    })
  },
  /**
   * 限免精选跳转详情
   */
  free_details(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id=' + id,
    })
  },
  /**
   * 工具优选跳转详情
   */
  tools_details(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/tools_details/tools_details?id=' + id,
    })
  },
  /**
   * 精选专题跳转更多
   */
  special_more() {
    wx.navigateTo({
      url: '../../pages/special/special',
    })
  },
  /**
   * 专题列表跳转详情
   */
  special_detials(e) {
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id=' + e.currentTarget.dataset.id,
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
   * 线下课程跳转详情
   * 
   */
  online_down(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/underline_lesson_details/underline_lesson_details?id=' + id
    })
  },
  /**
   * 在线精选跳转详情
   */
  online_details(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/lesson_details/lesson_details?id=' + id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 运营工具跳转
   */
  utils(e) {
    var target = e.currentTarget.dataset.id
    if (target === "subjects_list") {
      wx.navigateTo({
        url: '../../pages/catering_course/catering_course',
      })
      return
    }
    if (target === "tools_list") {
      wx.navigateTo({
        url: '../../pages/operation_tools/operation_tools',
      })
      return
    }


  },
  catering() {
    wx.navigateTo({
      url: '../../pages/catering_course/catering_course',
    })
  }
})