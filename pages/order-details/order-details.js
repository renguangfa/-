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
        // this.data.orderid
        id: this.data.orderid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if(res.statusCode == 200){
          console.log(res);

          this.setData({
            orderSetailArr: res.data
          })
          console.log(this.data.orderSetailArr);
        }
       
        
      }
    })

  },
// 跳转到帮助中心
  goCenter: function(){
    wx.navigateTo({
      url: '../help-center/help-center',
    });
  },
  // 复制订单编号
  fuzhi: function(){
    // console.log(this.data.orderSetailArr.order_sn)
    wx.setClipboardData({
      data: this.data.orderSetailArr.order_sn,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 再次使用扫码
  goShare: function () {
    // console.log(this.data.order_status)
    // 判断是否有正在使用的订单 ，如果有，就不允许扫码
    if (app.globalData.order_status == 1) {
      wx.showToast({
        title: '您有正在进行中的订单,请先归还充电宝再下单',
        icon: 'none',
        mask: true,
        duration: 2000
      })

    } else if (app.globalData.order_status == 2) {
       
        wx.scanCode({
          success: (res) => {
  

            var pl = res.result
            var a = pl.split('?')[1].split('=')[1]
            app.globalData.device_id = a
            console.log('扫描二维码中设备id为=' + app.globalData.device_id)

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
          complete: (res) => { }
        });
    }

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