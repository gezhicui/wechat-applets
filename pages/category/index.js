// pages/category/index.js
import {request} from "../../request/index.js"
Page({
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧数据
    rightContent:[],
    //被点击的左侧菜单索引
    currentIndex:0
  },
  Cates:[],
  onLoad: function (options) {
    //获取本地存储中有旧的数据
    const Cates = wx.getStorageSync('cates');
    //判断
    if(!Cates){
      this.getCates()
    }else{
      //有旧的数据  定义一个过期时间 这里为了调试设置为1秒
      if(Date.now()-Cates.time>1000){
        this.getCates()
      }else{
        // console.log("旧数据");
        this.Cates=Cates.data
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  getCates(){
    request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/categories', 
    }).then(result=>{
      this.Cates=result.data.message;
      //把接口数据存入到本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  //点击切换左侧按钮
  handleItemTep(e){
    //获取被激活的索引
    const {index} = e.currentTarget.dataset
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex : index,
      leftMenuList,
      rightContent
    })
  }
})