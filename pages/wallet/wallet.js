// pages/wallet/wallet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:false,
    personArr: [] , //个人信息
    shouquan:0


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shouquan: app.globalData.shouquanType
    })
    console.log(app.globalData.shouquanType)
    this.getPersonArr();

  },
  //获取个人信息
  getPersonArr() {
    wx.request({
      url: app.globalData.domain + 'mycente',
      data: {
        // app.globalData.userid 用户id
        id: app.globalData.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          console.log(res);
          // 给自己定义的 transactionArr 赋值
          console.log(Number(res.data.data.money)/100);
          this.setData({
            personArr: res.data.data,
            money: Number(res.data.data.money) / 100
          })
          console.log(this.data.personArr);
        }


      }
    })

  },
  go:function(){
    if (this.data.shouquan==0){
      wx.showToast({
        title: '您还未登录，请先进行登录',
        icon: 'none',
        mask: true,
        duration: 2000
      })


    } else if (this.data.shouquan == 1){
      wx.navigateTo({
        url: '../recharge/recharge',
      });
    }
    
  },
  open:function(){
    if (this.data.shouquan == 0) {
      wx.showToast({
        title: '您还未登录，请先进行登录',
        icon: 'none',
        mask: true,
        duration: 2000
      })


    }else {
      this.setData({
        display: true
      })
    }
   
  },
  close:function(){
    this.setData({
      display:false
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