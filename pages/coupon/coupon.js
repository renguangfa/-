var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置

//获取应用实例
const app = getApp();
Page({
  data: {
    tabs: ["充电优惠券", "商家优惠券"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function (event) {
    console.log(event);
    this.setData({
      activeIndex:event.uid
      
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  gotoast: function(){
    if (app.globalData.shouquanType ==0){
      wx.showToast({
        title: '您还未登录，请先进行登录',
        icon: 'none',
        mask: true,
        duration: 2000
      })

    }else {
      wx.showToast({
        title: '兑换码不正确',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }
    
  }
});