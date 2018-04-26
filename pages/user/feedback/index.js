
const app = getApp()
var Zan = require('../../../dist/index');
var util = require('../../../utils/util');

Page(Object.assign({}, Zan.TopTips, {
  data: {
    loading: false,  
  },

  formSubmit: function (e) {
    if (wx.getStorageSync('isFeedback') == util.formatTime(new Date()).date) {
      this.showZanTopTips('每天只能“用心”反馈一次哦~');
      return;
    }

    var formData = e.detail.value;
    formData.subject = formData.subject.trim();
    formData.content = formData.content.trim();
    if (formData.subject == '' || formData.content == '') {
      this.showZanTopTips('请不要调戏我，亲~');
      return;
    }

    var THIS = this;
    THIS.setData({
      loading: true
    })

    wx.request({
      url: 'https://wx.coderr.cn/api/feedback',
      method : 'POST',
      data: {
        'content': formData.content,
        'subject': formData.subject
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        var ret = res.data;
        // console.log(ret.code)
        if (ret.code == 0)
        {
          wx.showToast({
            title: '反馈成功',
            icon: 'success',
            duration: 2000
          });

          wx.setStorage({
            key: 'isFeedback',
            data: util.formatTime(new Date()).date,
          })

          THIS.setData({
            loading: false
          })

          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },1500)

        }
      },
      fail: function(){
        THIS.setData({
          loading: false
        })
        wx.showToast({
          title: '服务器开小差，눈_눈，稍安勿躁',
          icon: 'none',
          duration: 2000
        });
      }
    })

  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function () {
    wx.getStorageSync('feedBackDot') || wx.setStorageSync('feedBackDot', false);
  }
}))
