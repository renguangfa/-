// pages/transaction/transaction.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transactionArr:[],
    number:0,
    pirce:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTransactionArr()
  },
  //获取交易明细列表
  getTransactionArr() {
    wx.request({
      url: app.globalData.domain + 'moneytransaction',
      data:{
        // app.globalData.userid 用户id
        c_id:app.globalData.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success:res => {
        if(res.statusCode == 200){
          console.log(res);
          

// 给自己定义的 transactionArr 赋值
          this.setData({
            transactionArr: res.data.data.data,
            number:res.data.data.rows
          })
          console.log(this.data.transactionArr);
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