// pages/cart/index.js
Page({

  data: {
  },

  onLoad: function (options) {
  },
  click(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success: (result) => {
        console.log('获取成功');
        console.log(result); 
      },
      fail: (res) => {
        console.log('获取失败');
        
      },
    })
  }
})