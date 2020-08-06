// pages/goods_list/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  //接口参数
  QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  //获取商品数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    //获取总条数
    const total = res.total
    //计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新窗口  没触发关闭也不报错
    wx.stopPullDownRefresh()
  },

  //标题点击事件  从子组件传递过来
  tabsItemChange(e){
    //获取被点击的标题索引
    const {index} = e.detail;
    //修改原数组
    let {tabs} = this.data
    tabs.forEach((v,i)=>{
      i===index? v.isActive=true:v.isActive=false
    })
    this.setData({
      tabs
    })
  }, 

  //页面滚动条触底 wx生命周期事件
  onReachBottom(){
    // console.log('页面加载完');
    //判断有无下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      //没有下一页数据
      // console.log('没有下一页数据了');
      wx.showToast({
        title: '到底了哦',
        icon:'none'
      })
    }else{
      // console.log('还有下一页数据');
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  //下拉刷新事件 wx页面生命周期事件
  onPullDownRefresh(){
    this.QueryParams.pagenum=1
    //重置数组
    this.setData({
      goodsList:[]
    })
    //发请求
    this.getGoodsList()
    
  }
})