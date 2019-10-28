// pages/order-details/order-details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    orderSetailArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    // console.log(event);
    this.setData({
      orderid:event.orderid
    });
    console.log('orderid='+event.orderid);
    
     this.getIndexArr();//获取订单详情
  },
  //获取订单详情
  getIndexArr() {
    wx.request({
      url: app.globalData.domain + 'orderfind',
      data:{
        id: this.data.orderid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if(res.statusCode == 200){
          // console.log(res);

          this.setData({
            orderSetailArr: res.data
          })
          console.log(this.data.orderSetailArr);
        }
       
        
      }
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})