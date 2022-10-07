// index.js
const {http} = require('../../utils/request');

Page({

  data: {
    swiper: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    postData: [],
    pageNum: 1,
    pageLimit: 15
  },
  async onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
    const swiper = await http(
      '/posts', 
      {
        'limit': 5,
        'filter': 'featured:true'
      }
    )
    this.setData({
      swiper: swiper.posts
    });

    const postList = await http(
      '/posts', 
      {
        'limit': this.data.pageLimit
      }
    )
    this.setData({ 
      postData: this.data.postData.concat(postList.posts)
    });
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      active: 0
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      postData: [],
      pageNum: 1
    })
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    this.data.pageNum++
    const postList = await http(
      '/posts', 
      {
        'limit': this.data.pageLimit,
        'page': this.data.pageNum
      }
    )
    this.setData({ 
      postData: this.data.postData.concat(postList.posts)
    });
    if(postList.posts.length == 0) {
      this.data.pageNum--
      wx.showToast({
        icon: 'error',
        title: '没有了',
        duration: 1300,
        mask: false
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})