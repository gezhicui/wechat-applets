// pages/cart/index.js
Page({

  data: {
    address:[],
    cart:[],
    totalNum:0,
    totalPrice:0
  },

  onLoad: function (options) {
  },
  onShow(){
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync('address')
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart')||[]
    //过滤后的购物车数组
    let checkCart = cart.filter(v=>v.checked)
    this.setCart(checkCart)
    this.setData({
      address,
    })
  },
  //更新data数据和缓存数据的封装
  setCart(cart){
    let totalNum = 0
    let totalPrice = 0 
    cart.forEach(v=>{
      if(v.checked==true){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
      }
    })

    //数据设置回data和缓存
    this.setData({
      cart,totalNum,totalPrice
    })
  },
  handlePay(){
    wx.showToast({
      title: '非企业账号，暂不支持该功能',
      icon: 'none',
      duration: 2000
    })
  }

})