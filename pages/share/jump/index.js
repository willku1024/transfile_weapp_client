
var checkHouse = require('../../../utils/api')
// var app = getApp()


Page({
  data: {
    show: false,
    title: '',
    tip: 'Sorry...'
  },
  goToIndex: function () {
    wx.navigateTo({
      url: '/pages/deliver/index/index'
    })
  },
  onLoad: function (options) {
    var THIS = this;
    var houseCode = options.houseCode;
    var params = {
      houseCode: houseCode,
      user_uuid: wx.getStorageSync('user_uuid'),
      retCode_0: function () {
        THIS.setData({
          show: true,
          title: '该房间不存在或已失效，눈_눈'
        })
      },
      retCode_1: function () {
        wx.redirectTo({
          url: '../index/index?houseCode=' + houseCode,
        })
      },
      retCode_2: function () {
        THIS.setData({
          show: true,
          title: '服务器开小差，눈_눈，稍安勿躁',
        })
      },
      retCode_3: function () {
        THIS.setData({
          show: true,
          title: '该房间为私密,无法查看',
        })
      },
    }

    checkHouse.checkHouse(params)
  },

})

