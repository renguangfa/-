// pages/order-setup/order-setup.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceInfo: [],
    price: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(app.globalData.device_id)
    this.getDeviceInfo();
    console.log(app.globalData.shouquanType);
    console.log(app.globalData.order_status);
    console.log(app.globalData.options);




  },
  // 获取充电柜的信息
  getDeviceInfo: function() {
    wx.request({
      url: app.globalData.domain + 'getonedevice',
      data: {
        device_id: app.globalData.device_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          // console.log('uid'+app.globalData.userid);
          console.log(res);
          console.log(Number(res.data.price) / 100)
          this.setData({
            deviceInfo: res.data,
            price: Number(res.data.price) / 100
          });

          console.log('充电柜的信息' + this.data.deviceInfo);
        }


      }
    });


  },
  // 生成订单
  OrderSet: function() {





    // 判断是否从外面进入的
    if (app.globalData.options != '') {
      console.log(1231321312313213)
      if (app.globalData.shouquanType == 0) { //没有授权跳到授权页面

        // var a = options.split('?')[1].split('=')[1]

        app.globalData.device_id = 'C101904003242';
        console.log('扫描二维码中设备id为=' + app.globalData.device_id);
        wx.navigateTo({
          url: '../share/share',
        });
        console.log("~~~~~~~~~~~~~~~~~~~~~~~")

      } else {
        // 判断是否有正在使用的订单 ，如果有，就不允许扫码
        if (app.globalData.order_status == 1) {
          wx.showToast({
            title: '您有正在进行中的订单,请先归还充电宝再下单',
            icon: 'none',
            mask: true,
            duration: 2000
          })

        } else if (app.globalData.order_status == 2) {


          // console.log(app.globalData.userid)
          wx.request({
            url: app.globalData.domain + 'sumbitOrder',
            data: {
              device_id: app.globalData.device_id,
              member_id: app.globalData.userid
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success: res => {
              if (res.statusCode == 200) {

                let data_id = res.data.data;
                // console.log(res);
                console.log('货道id=' + data_id);
                wx.showToast({
                  title: '数据加载中',
                  icon: 'loading',
                  duration: 3000
                });
                setTimeout(function() {
                  // 查看借出状态
                  wx.request({
                    url: app.globalData.domain + 'lendtype',
                    data: {
                      id: data_id //货道id
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    method: 'POST',
                    success: res => {
                      if (res.statusCode == 200) {
                        // console.log('uid'+app.globalData.userid);
                        // app.globalData.lend_type = res.data.data;
                        // console.log(res.data.data);
                        // console.log('app.globalData.lend_type = '+ app.globalData.lend_type);
                        app.globalData.order_id = res.data.id

                        wx.reLaunch({
                          url: '../lend-success/lend-success?lend_type=' + res.data.data
                        });
                      }


                    }
                  });


                }, 3000)


              }


            }
          });



        }

      }


    } else {





      // console.log(app.globalData.userid)
      wx.request({
        url: app.globalData.domain + 'sumbitOrder',
        data: {
          device_id: app.globalData.device_id,
          member_id: app.globalData.userid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: res => {
          if (res.statusCode == 200) {

            let data_id = res.data.data;
            // console.log(res);
            console.log('货道id=' + data_id);
            wx.showToast({
              title: '数据加载中',
              icon: 'loading',
              duration: 3000
            });
            setTimeout(function() {
              // 查看借出状态
              wx.request({
                url: app.globalData.domain + 'lendtype',
                data: {
                  id: data_id //货道id
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                success: res => {
                  if (res.statusCode == 200) {
                    // console.log('uid'+app.globalData.userid);
                    // app.globalData.lend_type = res.data.data;
                    // console.log(res.data.data);
                    // console.log('app.globalData.lend_type = '+ app.globalData.lend_type);
                    app.globalData.order_id = res.data.id

                    wx.reLaunch({
                      url: '../lend-success/lend-success?lend_type=' + res.data.data
                    });
                  }


                }
              });


            }, 3000)


          }


        }
      });



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
  // goLendSuccess: function() {
  //   wx.navigateTo({
  //     url: '../lend-success/lend-success',
  //   });
  // },
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