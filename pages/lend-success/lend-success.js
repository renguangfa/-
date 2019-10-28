// pages/lend-success/lend-success.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      lend_type:0
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