
var checkHouse = require('../../../utils/api')
var util = require('../../../utils/util')
var app = getApp()

Page({
  data: {
    logs: []
  },
  itemOnClick: function (e) {
    var houseCode = e.currentTarget.dataset.housecode;
    var that = this.data;
    var THIS = this;


    wx.navigateTo({
      url: '/pages/share/jump/index?houseCode=' + houseCode,
    })
  },
  onLoad: function (options) {
    var THIS = this;
    wx.request({
      url: 'https://wx.coderr.cn/api/getlog',
      data: {
        'user_uuid': wx.getStorageSync('user_uuid')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ret = res.data;
        if (ret.code === 0) {
          var logData = ret.data.logs;
          var logList = util.logsFormat(ret.data.logs);

          THIS.setData({
            logs: logList
          })
        } else {
          wx.showToast({
            title: '服务器开小差，눈_눈，稍安勿躁',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },
})