// var app = getApp()

Page({
  data: {
    //是否采用衔接滑动  
    circular: true,
    //是否显示画板指示点  
    indicatorDots: true,
    //选中点的颜色  
    indicatorcolor: "#000",
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: true,
    //所有图片的高度  
    imgheights: [],
    //图片宽度  
    imgwidth: 750,
    //默认  
    current: 0,
    interval: 2000,
    duration: 1000,
    houseCode: '',
    imgUrls: [],
    houseCode: ''
  },
  imageLoad: function (e) {
    //获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里  
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,// 当前显示图片的http链接 
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  onLoad: function (options) {
    var THIS = this;
    var that = this.data;

    wx.showLoading({
      title: '缓存中，请等待',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 618 * that.imgUrls.length) //延迟时间


    THIS.setData({
      houseCode: options.houseCode
    })
    var requstUrl = 'https://wx.coderr.cn/api/downloadimg/' + that.houseCode + '/';
    wx.request({
      url: requstUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var imgUrls = [];
        var ret = res.data;
        // 得到image的get链接
        if (ret.code == 0) {
          imgUrls = ret.data.urls;
          // 链接不为空，跳转
          if (imgUrls) {
            THIS.setData({
              imgUrls: imgUrls
            })
          }
        }
      },
    })
  },
  onShareAppMessage: function (res) {
    var that = this.data;
    return {
      path: '/pages/share/jump/index?houseCode=' + that.houseCode,
      title: '好友给你分享图片啦~',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})