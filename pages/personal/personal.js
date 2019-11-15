// pages/personal/personal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取顶部的高度
    barheight: 0,
    flag: false,
    type: true,
    personArr: [] , //个人信息
    phoneNumber: app.globalData.phonenumber,
    screenWidth:0  //获取设备宽度

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('123132131=' + app.globalData.userid);
    console.log('shouquanType=' + app.globalData.shouquanType);
    // console.log('123132131=' + app.globalData.phoneNumber);

    wx.getSystemInfo({
      success: (res) => {
        console.log(res.statusBarHeight)
        console.log(res.screenWidth)
        var barheight = this.data.barheight;
        var screenWidth = this.data.screenWidth;

        this.setData({
          barheight: res.statusBarHeight + 10,
          screenWidth: res.screenWidth
        });
        console.log(this.data.barheight)
      }


    });

    this.getPersonArr();

  },
  //获取个人信息
  getPersonArr() {

    // 获取个人信息看有没有授权
    if (app.globalData.shouquanType==1){
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
            // console.log(res);
            // 给自己定义的 transactionArr 赋值
            this.setData({
              personArr: res.data.data,
            })
            console.log(this.data.personArr);
          }


        }
      })
    }else {
      this.setData({
        type:false
      })
    }
      
    
   

  },
  // 前往获取用户信息以及获取手机号
  goLogs: function(){
    wx.navigateTo({
      url: '../share/share?where='+99,
    });
  },
  goIndex: function() {
    wx.navigateBack({
      delta: 2
    });
  },
  // 遮罩层显示
  show: function() {
    this.setData({
      flag: true
    })
  },
  // 遮罩层隐藏
  conceal: function() {
    this.setData({
      flag: false
    })
  },
  //能量商城
  goNengliang: function () {
    wx.showToast({
      title: '此功能暂未开放',
      icon: 'none',
      mask: true,
      duration: 2000
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
    this.getPersonArr();
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