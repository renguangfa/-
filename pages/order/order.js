// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    orderid: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getIndexArr() //获取我的订单列表

  },
  //获取我的订单列表
  getIndexArr() {
    if (app.globalData.shouquanType==1){
      wx.request({
        url: app.globalData.domain + 'myorder',
        data: {
          member_id: app.globalData.userid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: res => {
          if (res.statusCode == 200) {
            // console.log('uid'+app.globalData.userid);

            this.setData({
              orderList: res.data.data
            })
            console.log(this.data.orderList);
          }


        }
      })
    }
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})