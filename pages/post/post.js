// pages/post/post.js
const {http} = require('../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postContent: [],
    tagStyle: {
      p: 'font-size: 33rpx;margin: 10rpx 0 10rpx 0;',
      h1: 'font-size: 58rpx;font-weight: 500;margin: 10rpx 0 10rpx 0;',
      h2: 'font-size: 53rpx;font-weight: 500;margin: 10rpx 0 10rpx 0;',
      h3: 'font-size: 48rpx;font-weight: 500;margin: 10rpx 0 10rpx 0;',
      h4: 'font-size: 43rpx;font-weight: 500;margin: 10rpx 0 10rpx 0;',
      h5: 'font-size: 38rpx;font-weight: 500;margin: 10rpx 0 10rpx 0;',
      h6: 'font-size: 33rpx;font-weight: 500;margin: 10rpx 0 10rpx 0;',
      table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
      th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;background-color: #f4f8fb;font-weight: 700;font-size: 30rpx;padding: 10rpx;',
      td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;font-size: 30rpx;padding: 10rpx;',
      li: 'margin: 5px 0;',
      ul: 'padding-left: 70rpx;',
      blockquote: 'border-left: 7rpx solid rgba(0,0,0,.12);padding: 10rpx;background-color: rgba(0,0,0,.1);margin: 10rpx 0 10rpx 0;'
    },
    likeData: []
  },
  
  like: function () {
    var localLike = wx.getStorageSync('like');
    var addlike = (localLike != '') ? localLike.concat(this.data.likeData) : this.data.likeData;
    var flag = 0;
    for (var i=0;i<=localLike.length-1;i++){
      if(localLike[i].id == this.data.likeData[0].id){
        flag = 1
        break
      }
    }
    if(flag == 0){
      wx.setStorageSync('like', addlike);
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '收藏过了',
        icon: 'success',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中...',
    })
    const postData = await http('/posts/'+options.id);
    let {id, feature_image, title, excerpt} = postData.posts[0];
    let {name} = postData.posts[0].tags[0];
    this.setData({ 
      postContent: postData.posts,
      likeData: [{
        'id': id,
        'feature_image': feature_image,
        'title': title,
        'excerpt': excerpt,
        'tag': name
      }]
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})