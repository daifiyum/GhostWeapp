// pages/tag/tag.js
const {http} = require('../../utils/request')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: [],
    pageNum: 1,
    pageLimit: 15,
    slug: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
    async onLoad(options) {
      this.setData({
        slug: options.slug
      })
      wx.setNavigationBarTitle({
        title: options.name
      });
      wx.showLoading({
        title: '加载中...',
      })
      const postList = await http(
        '/posts', 
        {
          'limit': this.data.pageLimit,
          'filter': 'tag:' + options.slug
        }
      )
      this.setData({ 
        postData: this.data.postData.concat(postList.posts)
      });
      wx.hideLoading();
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
  onReachBottom: async function () {
    this.data.pageNum++
    const postList = await http(
      '/posts', 
      {
        'limit': this.data.pageLimit,
        'page': this.data.pageNum,
        'filter': 'tag:' + this.data.slug
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
  onShareAppMessage() {

  }
})