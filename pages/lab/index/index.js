//index.js
var base64 = require("../images/base64");

Page({
  data: {
    lab: false,
  },
  onLoad: function () {
    var that = this;
    this.setData({
      clock64: base64.clock64
    });

    wx.request({
      url: 'https://wx.coderr.cn/api/notice',
      data: {
        mode: 'get',
        func: '3'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ret = res.data;
        if (ret.code == 0) {
          if (ret.data.info == "true") {
            that.setData({
              lab: true
            })
          }
        }
      },
    });
  },
  onShareAppMessage: function (res) {
    return {
      path: "/pages/lab/index/index",
      title: '我在这里发现了好东东~',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});