var common=require("../../common/common.js")
Page({
  data: {
    currentTab: 0,
    winHeight: '',
    lesson: [{
      images: '../../images/fengmian.jpg',
      title: "像KFC一样建立数据中心",
      time: 26,
      people: 88
    },
    {
      images: '../../images/fengmian.jpg',
      title: "像KFC一样建立数据中心",
      time: 26,
      people: 88
    },
    {
      images: '../../images/fengmian.jpg',
      title: "像KFC一样建立数据中心",
      time: 26,
      people: 88
    },
    {
      images: '../../images/fengmian.jpg',
      title: "像KFC一样建立数据中心",
      time: 26,
      people: 88
    },
    {
      images: '../../images/fengmian.jpg',
      title: "像KFC一样建立数据中心",
      time: 26,
      people: 88
    },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        time: 26,
        people: 88
      },
      {
        images: '../../images/fengmian.jpg',
        title: "像KFC一样建立数据中心",
        time: 26,
        people: 88
      }

    ]
  },
  onLoad() {
    var that = this;
    this.caleHeight()
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