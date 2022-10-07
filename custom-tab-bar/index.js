// components/custom-tab-bar/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: [{
      "pagePath": "/pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "/pages/tags/tags",
      "text": "分类"
    }, {
      "pagePath": "/pages/collect/collect",
      "text": "收藏"
    }]
  },
  methods: {
    onChange(event) {
      let index = event.detail;
      this.setData({ active: index });
      wx.switchTab({
        url: this.data.list[index].pagePath
      })
    }
  }

})