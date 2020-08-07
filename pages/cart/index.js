// pages/cart/index.js
Page({

  data: {
    address:[],
    cart:[],
    allchecked:false,
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
    this.setCart(cart)
    this.setData({
      address,
    })

  },
  //获取收货地址
  handleChooseAddress(){
    //获取权限状态
    wx.getSetting({
      success:(result)=>{
        const scopeAddress = result.authSetting["scope.address"]
        if(scopeAddress==true||scopeAddress==undefined){
          wx.chooseAddress({
            success: (result1) => {
              //存入收货地址到缓存
              const address = result1
              wx.setStorageSync('address', address)
            },
          })
        }else{
          //用户拒绝过授权
          wx.openSetting({
            success:(result2)=>{
              wx.chooseAddress({
                success: (result3) => {
                  //存入收货地址到缓存
                  const address = result3
                  wx.setStorageSync('address', address)
                }
              })
            }
          })
        }
      }
    })
  },
  //商品选中
  handelItemChange(e){
    //获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id
    //获取购物车数组
    let {cart} = this.data
    //找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id==goods_id)
    //选中按钮取反
    cart[index].checked = !cart[index].checked 
    this.setCart(cart)
  },
  //商品全选
  handleItemAllCheck(){
    //获取data中的数据
    let {cart,allchecked} = this.data
    //修改allchecked
    allchecked = !allchecked
    //循环修改cart数组
    cart.forEach(v=>v.checked=allchecked)
    this.setCart(cart)
  },
  //商品数量改变
  handleItemNum(e){
    let {operation,id} = e.currentTarget.dataset
     //获取购物车数组
    let {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id == id)
    //数量增减
    cart[index].num+=operation
    //判断是否要执行删除
    if(cart[index].num<=0&&operation==-1){
      //弹窗提示删除商品
      wx.showModal({
        cancelColor: 'cancelColor',
        title:"提示",
        content:"您是否要删除？",
        success:res=>{
          if(res.confirm){
            cart.splice(index,1)
            this.setCart(cart)
          }else if(res.cancel){
            cart[index].num = 1
            console.log(cart[index].num);
            this.setCart(cart)
          }
        }
      })
    }
    //设置回缓存和data
    this.setCart(cart)

  },

  //更新data数据和缓存数据的封装
  setCart(cart){
    let allchecked = true
    let totalNum = 0
    let totalPrice = 0 
    cart.forEach(v=>{
      if(v.checked==true){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num
      }else{
        allchecked=false
      }
    })
    //判断数组是否为空
    allchecked=cart.length!=0?allchecked:false
    //数据设置回data和缓存
    this.setData({
      cart,totalNum,totalPrice,allchecked
    })
    wx.setStorageSync('cart', cart)
  },
  //点击结算
  handlePay(){
    //判断收货地址和商品
    const {address,totalNum} = this.data
    if (!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(totalNum == 0){
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})