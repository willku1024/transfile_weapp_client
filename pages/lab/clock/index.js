
const app = getApp()
var util = require('../../../utils/util');

var Zan = require('../../../dist/index');

Page(Object.assign({}, Zan.TopTips, {
  data: {
    date: '2018-01-01',
    time: '12:01',
    startdate: '2018-01-01',
    loading: false,
    formData: {
      formId: '',
      time: '',
      date: '',
      content: '',
      subject: '',
      position: ''
    }
  },
  bindTimeChange: function (e) {
    var that = this.data;

    this.setData({
      time: e.detail.value,
    })
    console.log(e.detail.value)
  },
  bindDateChange: function (e) {
    var that = this.data;
    this.setData({
      date: e.detail.value,
    })
  },
  formSubmit: function (e) {


    var THIS = this;
    var that = this.data;
    var subject = e.detail.value.subject.trim();
    var content = e.detail.value.content.trim();


    if (subject == '') {
      this.showZanTopTips('请补全“必填项”的内容');
      return;
    }


    var result = util.strToDate(that.date+' '+that.time);


    if ((result.deltaTime-0) < 0)
    {
      this.showZanTopTips('该时间已过期，请重新选择时间~');
      return;
    } else
    {
      if ((result.deltaTime-0) <= 2) {
        this.showZanTopTips('时间间隔太短，请重新选择时间~');
        return;
      }
    }

    THIS.setData({
      loading: true
    })

    var position = e.detail.value.position.trim();
    var formID = e.detail.formId;

    THIS.setData({
      loading: true,
      formData: {
        date: that.date,
        time: that.time,
        subject: subject,
        content: content,
        position: position,
        formID: formID
      }
    })


    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://wx.coderr.cn/api/login',
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            data: {
              code: res.code,
              formData: that.formData
            },
            success: function (res) {
              THIS.setData({
                loading: false
              })
              if (res.statusCode == '200')
              {
                wx.showToast({
                  title: '到时为您推送',
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(function () {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 1500)
              }else
              {
                wx.showToast({
                  title: '服务器开小差，눈_눈，稍安勿躁',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
          })
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            duration: 2000
          })

        }
      },
      fail:function(){
        wx.showToast({
          title: '服务器开小差，눈_눈，稍安勿躁',
          icon: 'none',
          duration: 2000
        });
      }
    });

  },

  onShow: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var data = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: data.date,
      time: data.time,
      startdate: data.date
    });


  },

}));
