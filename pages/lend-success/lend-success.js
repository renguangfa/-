// pages/lend-success/lend-success.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lend_type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(event) {
    console.log(event)
    this.setData({
      lend_type: event.lend_type
    })
    console.log('借出状态id （1 为成功  0 为失败） = ' + this.data.lend_type);
  },
  goHome: function() {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  // 二维码扫描
  goShare: function() {
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        // that.setData({
        //   show: this.show
        // });
        var pl = res.result
        var a = pl.split('?')[1].split('=')[1]
        app.globalData.device_id = a
        wx.navigateTo({
          url: '../order-setup/order-setup'
        });
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        })
      },
    })
  },
  // 回到帮助中心
  goCenter: function(){
    wx.navigateTo({
      url: '../help-center/help-center'
    });
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