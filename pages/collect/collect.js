// pages/collect/collect.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    'postData': [],
    'show': true
  },
  show: function () {
    if (this.data.postData.length == 0) {
      this.setData({
        show: true
      })
    }else{
      this.setData({
        show: false
      })
    }
  },
  onClose: function (e) {
    var value = e.currentTarget.dataset
	  var id = value.id
    for (var i=0;i<=this.data.postData.length-1;i++){
      if(this.data.postData[i].id == id){
        this.data.postData.splice(i,1);
        break
      }
    }
    wx.removeStorageSync('like');
    wx.setStorageSync('like',this.data.postData);
    this.setData({
      postData: this.data.postData
    })

    this.show();
    e.detail.instance.close();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().setData({
      active: 2
    })
    let pllike = wx.getStorageSync('like');
    this.setData({
      postData: pllike
    })

    this.show();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})