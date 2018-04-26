function checkHouse(data) {

  var houseCode = data.houseCode;
  var user_uuid = wx.getStorageSync('user_uuid') || ''

  var retCode_0 = data.retCode_0 || function () { console.log('retCode_0 is null') };
  var retCode_1 = data.retCode_1 || function () { console.log('retCode_1 is null') };
  var retCode_2 = data.retCode_2 || function () { console.log('retCode_2 is null') };
  var retCode_3 = data.retCode_3 || function () { console.log('retCode_3 is null') };
  var complete = data.complete || function () { console.log('complete is null') };



  wx.request({
    url: 'https://wx.coderr.cn/api/checkhouse',
    data: {
      'houseCode': houseCode,
      'user_uuid': user_uuid
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        var ret = res.data;
        if (ret.code == 0) {
          retCode_0();
        } else if (ret.code == 1) {
          retCode_1();
        } else if (ret.code == 2) {
          retCode_2();
        } else if (ret.code == 3) {
          retCode_3();
        }
      }
      else {
        retCode_2();
      }
    },
    fail:function(res){
      retCode_2();
    },
    complete:function(){
      complete()
    }
  })

}


module.exports.checkHouse = checkHouse