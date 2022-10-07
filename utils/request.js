const {serveApi, serveParams} = require('./env');

//GET请求封装
function http(url,params) {
  return new Promise((resolve, reject)=>{
    wx.request({
      url: serveApi + url,
      method: 'GET',
      data: {...serveParams, ...params},
      success: res => {
        resolve(res.data);
      },
      fail: function (res) {
        reject(res.data);
      }
    })
  })
}

module.exports = {
  http
};