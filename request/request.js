var Dec = require('../aes_ecb/test.js'); //引用封装好的加密解密js
let sign=function(){
  var timestamp = Date.parse(new Date());
  console.log(timestamp)
  var s=""
  var token = wx.getStorageSync("token") || "";
  wx.getSystemInfo({
    success(res) {
      let sign = {
        token: token,
        app_version: '1.1.0',
        device_brand: res.brand,
        device_id: '789565',
        device_name: res.model,
        device_system: res.system,
        device_type: '3',
        timestamp: timestamp
      }
      if (sign) {
        var sign_str = JSON.stringify(sign);
        var jsonS = Dec.Encrypt(sign_str)
        s=jsonS
      }
    }
  })
  return s;
}
let requestPost = function (url, data = {}, method = "POST", ct = "application/x-www-form-urlencoded;charset=utf-8") {
  var sign_hs = sign()
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
      'Content-Type': ct,
        sign: sign_hs
      },
      success: (response) => {
        if (response.statusCode == 200) {
          resolve(response.data);
        } else {
          reject(response.errMsg);
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
/**
 * 封装微信get
 */
let requestjSON = function (url, data = {}, method = "GET", ct = "application/json") {
  var sign_hs=sign()
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': ct,
        'sign': sign_hs
      },
      success: (response) => {
        if (response.statusCode == 200) {
          resolve(response.data);
        } else {
          reject(response.errMsg);
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
module.exports = {
  requestPost,
  requestjSON,
  sign
};