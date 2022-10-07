// pages/tags/tags.js
const {http} = require('../../utils/request')

Page({
  data: {
    'tagsData': []
  },

  async onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
    const tags = await http('/tags', {'limit': 'all'});
    this.setData({ 
      tagsData: this.data.tagsData.concat(tags.tags)
    });
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },
  onShow() {
    this.getTabBar().setData({
      active: 1
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      'tagsData': []
    })
    this.onLoad();
  },

})
