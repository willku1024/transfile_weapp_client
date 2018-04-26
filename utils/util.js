const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return {
    date: [year, month, day].map(formatNumber).join('-'),
    time: [hour, minute].map(formatNumber).join(':'),

  }
}
// string to timestamp
const strToDate = str => {
  // return Date.parse('2018-09-18 13:49') / (1000 * 60)
  var stringTime = Date.parse(str.replace(/-/g, "/")) / (1000 * 60);
  var currentTime = parseInt(Date.now() / (1000 * 60));
  return {
    currentTime: currentTime - 0,
    strTime: stringTime - 0,
    deltaTime: stringTime - currentTime
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const logsFormat = function (logData) {
  var logList = [];
  var keys = Object.keys(logData).sort(function (a, b) {
    var d1 = new Date(b.replace(/-/g, '/')).getTime();
    var d2 = new Date(a.replace(/-/g, '/')).getTime();
    return d1 - d2;
  });

  for (var i = 0, n = keys.length; i < n; ++i) {
    var tmp = {}
    tmp[logData[keys[i]]] = keys[i];
    logList.push({ tmp })
  }
  return logList;
}



// 生成uuid
const uuid = function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// 随机函数的产生：
const createNonceStr = function () {
  return Math.random().toString(36).substr((Math.floor(Math.random() * 10) % 7 + 2), 4)
}
// 时间戳产生的函数：

const createTimeStamp = function () {
  return parseInt(new Date().getTime() / 1000) + ''
}


module.exports = {
  formatTime: formatTime,
  createNonceStr: createNonceStr,
  createTimeStamp: createTimeStamp,
  uuid: uuid,
  strToDate: strToDate,
  logsFormat: logsFormat
}
