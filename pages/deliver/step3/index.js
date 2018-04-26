
var Zan = require('../../../dist/index');

Page({
  data: {
    houseCode: '',
    steps3: [
      {
        current: false,
        done: true,
        text: '步骤一',
        desc: '创建房间'
      },
      {
        done: true,
        current: false,
        text: '步骤二',
        desc: '选择图片'
      },
      {
        done: true,
        current: true,
        text: '步骤三',
        desc: 'PC端查看'
      }
    ],
  },
  onLoad: function(options)
  {
    this.setData({
      houseCode: options.houseCode,
    })
  },
  onUnload: function () {
    wx.navigateBack({
      delta: 3
    })
  },
});