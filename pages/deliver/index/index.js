
var Zan = require('../../../dist/index');
var checkHouse = require('../../../utils/api')
var app = getApp()
Page(Object.assign({}, Zan.NoticeBar, {
  data: {
    movable: {
      text: '图片轻松传--帮您轻松传递PC端和手机端的数据，还有丰富的实验性小工具等你来发现！'
    },
    text: "只需三步，轻松传送"
  },

  btnOnClick: function () {
    wx.navigateTo({
      url: '../step1/index',
    })
  },
  showDialog: function () {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.show();
  },
  hideDialog: function () {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onConfirm: function () {
    this.hideDialog()
    var that = this.data;
    var THIS = this;

    wx.navigateTo({
      url: '/pages/share/jump/index?houseCode=' + that.houseCode,
    })
  },
  onCancel: function () {
    this.hideDialog()
  },
  inputChange: function (e) {
    this.setData({
      houseCode: e.detail.value
    })
  },

  onLoad() {
    var that = this;
    wx.request({
      url: 'https://wx.coderr.cn/api/notice',
      data: {
        mode: 'get',
        func: '1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var ret = res.data;
        if (ret.code == 0) {
          that.setData({
            movable: {
              text: ret.data.info
            }
          })
        }
      },
    });
  },

  onShow() {
    // 滚动通告栏需要initScroll
    this.initZanNoticeBarScroll('movable');
  },
  onShareAppMessage: function (res) {
    return {
      path: "/pages/deliver/index/index",
      title: '在PC和手机间轻松传递图片~',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
}));



