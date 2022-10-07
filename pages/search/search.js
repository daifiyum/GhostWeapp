// pages/search/search.js
const {http} = require('../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: [],
    searchRes: []
  },
  clearData() {
    this.setData({
      searchRes: []
    })
  },
  onChange(e) {
    if (e.detail != '') {
      this.clearData();
      this.getSearch(e.detail);
    }else{
      this.clearData();
    }
  },
  getSearch(searchKey) {
    let list = this.data.searchData.posts;
    let reg = new RegExp(searchKey);
    for (var i = 0; i <= list.length - 1; i++) {
      if (reg.test(list[i].title) || reg.test(list[i].excerpt)) {//判断搜索是否有结果？
        var c = 1;
        for (var a = 0; a <= this.data.searchRes.length - 1; a++) {//判断搜索结果是否已显示？
          if (list[i].id == this.data.searchRes[a].id) {
            c = 0;
          }
        }
        if(c == 1){//有结果并且还没有显示才可以显示
          this.setData({
            searchRes: this.data.searchRes.concat(list[i])
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //参考ghost官方搜索接口
    const searchData = await http(
      '/posts', {
        'limit': 10000,
        'fields': 'id,slug,title,excerpt,url,updated_at,visibility',
        'order': 'updated_at DESC'
      })
    this.setData({
      searchData: searchData
    })

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