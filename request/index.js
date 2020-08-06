//定义同时处理多个请求的弹窗计数
let ajaxTimes = 0;
export const request=(params)=>{
  ajaxTimes++;
  //定义公共的url
  const baseUrl='https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject)=>{
    //显示加载中效果
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        reject(err);
      },complete:()=>{
        ajaxTimes--;
        if(ajaxTimes == 0){
          wx.hideLoading()
        } 
      }
    })
  })
}