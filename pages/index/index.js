const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
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
    lesson: [{

        image: '../../images/jingxuan.jpg',
        title: '建立餐厅数据分析的模型',
        time: '25',
        people: 88,
        daojishi: '1554199200000'
      },
      {

        image: '../../images/jingxuan.jpg',
        title: '建立餐厅数据分析的模型',
        time: '25',
        people: 88,
        daojishi: '1554899200000'
      },
      {

        image: '../../images/jingxuan.jpg',
        title: '建立餐厅数据分析的模型',
        time: '25',
        people: 88,
        daojishi: '1558199200000'
      },
      {

        image: '../../images/jingxuan.jpg',
        title: '建立餐厅数据分析的模型安',
        time: '25',
        people: 88,
        daojishi: '1554599200000'
      }
    ],
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
    request.requestjSON(url.connect.baseURL + "/index", {
      page: 1,
      page_amount: 20
    }).then(res => {
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
        console.log(res, '首页信息')
      }
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

  },
  /**
   * 运营工具跳转
   */
  utils() {
    wx.navigateTo({
      url: '../../pages/operation_tools/operation_tools',
    })
  },
  catering() {
    wx.navigateTo({
      url: '../../pages/catering_course/catering_course',
    })
  }
})