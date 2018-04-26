// pages/user/scancode/index.js

Page({
  data: {

  },
  onAbnorTap: function () {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var url = res.result;
        function isContains(str, substr) {
          return new RegExp(substr).test(str);
        }

        if (isContains(url, 'wx.coderr.cn')) {
          var qruuid = url.split('?')[1];
          wx.request({
            url: 'https://wx.coderr.cn/api/qrcode',
            method: 'POST',
            data: {
              'qruuid': qruuid,
              'user_uuid': wx.getStorageSync('user_uuid'),
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              var ret = res.data;
              if (ret.code == 0)
              {
                if(qruuid.length == 5)
                {
                  wx.showLoading({
                    title: '同步数据',
                  });
                  setTimeout(function () {
                    wx.hideLoading()
                    wx.showToast({
                      title: '可在“上传记录”中查看房间',
                      icon: 'none',
                      duration: 2000
                    })
                  }, 618 * 3);

                }


              }else
              {
                wx.showToast({
                  title: '该二维码已失效，눈_눈',
                  icon: 'none',
                  duration:2000
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: '该二维码判定无效，눈_눈',
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  },
})