// pages/goods_detail/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goodsObj:[]
  },
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const res = await request({url:"/goods/detail",data:{goods_id}})
    this.setData({
      goodsObj:{
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        goods_introduce:res.goods_introduce,
        pics:res.pics,
        goods_id
      }
    })
  },
  //轮播图放大预览
  handlePreview(e){
    const urls = this.data.goodsObj.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.img
    wx.previewImage({
      current,
      urls
    })
  },
  //加入购物车
  handleCartAdd(){
    //获取缓存的购物车数组
    let cart = wx.getStorageSync('cart')||[]
    //判断商品是否在购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.data.goodsObj.goods_id)
    if(index===-1){
      this.data.goodsObj.num=1
      this.data.goodsObj.checked=true
      cart.push(this.data.goodsObj)
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加成功',
      icon:'success',
      //防止用户手抖
      mask:false
    })
  }
})