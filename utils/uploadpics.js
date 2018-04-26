
var app = getApp();
//多张图片上传
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
  const uploadTask = wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'img',//这里根据自己的实际情况改
    formData: data.formData,//这里是上传图片时一起上传的数据
    success: (res) => {
      var ret = JSON.parse(res.data);
      if (ret.code == 0)
      {
        success++;//图片上传成功，图片上传成功的变量+1
      }else
      {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        wx.showToast({
          title: '出现错误，上传失败',
        });
      }
      // console.log(i);
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
      // console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      // console.log(i);
      i++;//这个图片执行完上传后，开始上传下一张
      if (i == data.path.length) {   //当图片传完时，停止调用      
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)    
     
        typeof data.cb == "function" && data.cb(true);
       
      } else {
        wx.showLoading({
          title: '上传中',
        })

        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }

    }
  });
  // uploadTask.onProgressUpdate((res) => {
  //   console.log('上传进度', res.progress)
  //   console.log('已经上传的数据长度', res.totalBytesSent)
  //   console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  // })
}


module.exports.uploadimg = uploadimg