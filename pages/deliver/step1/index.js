
var util = require('../../../utils/util')
var checkHouse = require('../../../utils/api')

Page({
  data: {
    input_state: [
      true, false, false, false
    ],
    inputValue: '',
    btnDisabled: false,
    disabled: false,
    disabledText: '自动获取',
    placeholder: "4位数字",
    time: ["10分钟", "15分钟", "20分钟"],
    timeIndex: 0,
    nextPage: {},
    switchState: true,
    steps: [
      {
        current: true,
        done: true,
        text: '步骤一',
        desc: '创建房间'
      },
      {
        done: false,
        current: false,
        text: '步骤二',
        desc: '上传文件'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: 'PC端查看'
      }
    ],
  },
  bindPickerChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindSwitchChange: function (e) {
    this.setData({
      switchState: e.detail.value
    })
  },
  formSubmit: function (e) {
    // console.log(e)
    // 检查房号是否正确，不正确立即返回
    if (e.detail.value['houseCode'].length < 4) {
      wx.showToast({
        title: '检查“房间号码”选项',
        icon: 'none',
        mask: true,
        duration: 2000
      });
      return;
    }


    var THIS = this;
    var that = this.data;
    var houseCode = e.detail.value['houseCode'];
    THIS.setData({
      btnDisabled: true
    })
    var params = {
      houseCode: e.detail.value['houseCode'],
      retCode_0: function () {
        // 一切正确,继续
        // console.log('houseCode为：', houseCode);
        var l = ['houseCode=', '&timeMins=', '&switchState='];
        var timeMins = 10;
        if (that.timeIndex > 0) {
          timeMins = that.timeIndex > 1 ? 20 : 15;
        }
        var param = l[0] + houseCode + l[1] + timeMins + l[2] + that.switchState;
        THIS.setData({
          nextPage: {
            url: '../step2/index?' + param
          }
        });
        wx.navigateTo(that.nextPage);
      },
      retCode_1: function () {
        wx.showToast({
          title: '该房号太火爆，눈_눈，已被他人占有',
          icon: 'none',
          duration: 2000
        });
      },
      retCode_2: function () {
        wx.showToast({
          title: '服务器开小差，눈_눈，稍安勿躁',
          icon: 'none',
          duration: 2000
        });
      },
      complete: function(){
        THIS.setData({
          btnDisabled: false
        })
      }
    }

    checkHouse.checkHouse(params)

  },
  autoGetCode: function () {
    var that = this.data;
    var THIS = this;
    if (that.disabled) {
      THIS.setData({
        disabled: false,
        disabledText: '自动获取',
        inputValue: '',
        placeholder: "4位数字",
      })
    } else {
      var randomCode = util.createNonceStr();

      THIS.setData({
        disabled: true,
        inputValue: randomCode,
        disabledText: '手动填写',
        placeholder: randomCode,

      })
    }
  }
});