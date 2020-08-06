import {request} from "../../request/index.js"
wx-Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航数据
    catesList:[],
    //楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载 create
   */
  onLoad: function (options) {
    this.getSwiperList(),
    this.getCatesList(),
    this.getFloorList()
  },
  //获取轮播图数据
  getSwiperList(){
      //获取轮播图  修改为promise
      // request({
      //   url: '/home/swiperdata',
      //   success: (result) => {
      //     this.setData({
      //       swiperList:result
      //     })
      //   },
      // })
      request({
        url:'/home/swiperdata', 
      }).then(result=>{
        this.setData({
          swiperList:result
        })
      })
  },
  //获取首页导航数据
  getCatesList(){
    request({
      url:'/home/catitems', 
    }).then(result=>{
      this.setData({
        catesList:result
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({
      url:'/home/floordata', 
    }).then(result=>{
      this.setData({
        floorList:result
      })
    })
  }
})