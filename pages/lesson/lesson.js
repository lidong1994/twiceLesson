var common=require("../../common/common.js")
const request = require('/../../request/request.js')
const url = require('/../../url/url.js')
Page({
  data: {
    currentTab: 0,
    winHeight: '',
    lesson: [],
    zhuanti:[]
  },
  onLoad() {
    var that = this;
    this.getzhuantiList()
    this.getLessonList()
  },
  /**
   * 我的课程
   */
  getLessonList() {
    request.requestjSON(url.connect.baseURL + "/exclusive_recommend",).then(res => {
      console.log(res)
      this.setData({
        zhuanti: res.data
      })
    })
  },
  /**
   * 我的专题
   */
  getzhuantiList(){
    request.requestjSON(url.connect.baseURL + "/my_package_subjects", { page:1,page_amount:20}).then(res => {
         this.setData({
           lesson:res.data
         })
    })
  },
   caleHeight() {
    let query = wx.createSelectorQuery();
    query.select('.study_c_left').boundingClientRect(rect => {
      let clientHeight = parseInt(rect.height);
      if (this.data.currentTab == 0) {
        var haha = common.isCale(this.data.lesson, clientHeight)
        this.setData({
          winHeight: haha
        })
      }
    }).exec();
  },

  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})