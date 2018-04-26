
var uploadimg = require('../../../utils/uploadpics')
var app = getApp()

Page({
  data: {
    pics: [],
    btnDisabled: false,
    houseCode: '',
    switchState: true,
    timeMins: 10,
    steps2: [
      {
        current: false,
        done: true,
        text: '步骤一',
        desc: '创建房间'
      },
      {
        done: true,
        current: true,
        text: '步骤二',
        desc: '选择图片'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: 'PC端查看'
      }
    ],
  },
  chooseImage: function (e) {
    var that = this;
    var pics = this.data.pics;

    wx.chooseImage({
      count: 9 - pics.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pics: that.data.pics.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    // console.log("previewImage", e, this.data.pics)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.pics // 需要预览的图片http链接列表
    })
  },
  uploadOnClick: function () {
    var that = this.data;
    var THIS = this;
    var pics = that.pics;

    if (pics.length <= 0) {
      wx.showToast({
        title: '别急눈_눈，还没选择图片',
        icon: 'none',
        mask: true,
        duration: 2000
      });
      return;
    }

    THIS.setData({
      btnDisabled: true
    })

    // 上传图片完成Callback，跳转Page
    function taskOver(ret) {
      if (ret == true) {
        wx.navigateTo({
          url: '../step3/index?houseCode=' + that.houseCode,
        })
      }
    }
    // 上传图片
    uploadimg.uploadimg({
      url: 'https://wx.coderr.cn/api/uploadimg',//这里是你图片上传的接口
      path: pics,//这里是选取的图片的地址数组
      cb: taskOver,
      formData: {
        'houseCode': that.houseCode,
        'switchState': that.switchState,
        'timeMins': that.timeMins,
        'user_uuid': wx.getStorageSync('user_uuid')
      }
    })


  },
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      houseCode: options.houseCode,
      switchState: options.switchState,
      timeMins: options.timeMins,
    })
  },
  openActionSheet: function (e) {
    var that = this;

    wx.showActionSheet({
      itemList: ['取消本张', '全部取消'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            var newpics = that.data.pics;
            newpics.splice(e.currentTarget.id, 1);
            that.setData({
              pics: newpics
            })
          } else {
            that.setData({
              pics: []
            })
          }
        }
      }
    });
  }
});