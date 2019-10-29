//index.js
//获取应用实例
const app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'QCRBZ-AEWC6-2BOSU-EIZZK-UKALO-6YBPK' // 必填
});

Page({
  data: {
    //首页充电宝列表
    guessArr: [], //首页列表
    latitude: '', //用户的经度
    longitude: '', //用户的纬度
    show: "",
    order_status: 2, //订单状态 1、未支付 2、已支付
    orderList: [],
    openid: '',
    shouquan: 0

  },
  onShow: function() {
    this.getorder(); //获取用户id
    this.getlocation();//获取当前经纬度以及首页充电宝列表
    console.log('我是onShow!!!!')
  },


  onLoad: function() {
    this.getlocation(); //获取当前的经纬度
    


    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              //用户已经授权过
              console.log('用户已经授权过')

              let userInfo = res.userInfo
              app.globalData.userInfo = res.userInfo
              app.globalData.nickName = userInfo.nickName;
              app.globalData.avatarUrl = userInfo.avatarUrl;
              // 跟我的关联，如果授权就自动获取个人信息，如果没有要自己点击登录账号
              app.globalData.shouquanType = 1;
              this.setData({
                shouquan: 1
              });
              // console.log(this.data.shouquan+'=======qeqweqweqwdqwdqw~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
              this.getUserId();

              // wx.reLaunch({
              //   url: '../index/index'
              // })
            }
          });
        }
      }
    })


    // 获取用户信息


  },
  // 获取用户的id 因为index.js先加载，获取不到userid 判断app.globalData.openid中是否已有，设置回调，有就获取userid，没有等会在获取userid
  getUserId: function() {
    console.log('获取用户id')

    if (app.globalData.openid) {
      console.log('第一次回调', app.globalData.openid);
      this.setData({
        openid: app.globalData.openid,
      });
      this.getweq();

    } else {
      app.callback = () => {
        console.log('再次回调', app.globalData.openid);
        this.setData({
          openid: app.globalData.openid,
        })
        console.log('再次回调', this.data.openid);
        this.getweq();
      };

    }

  },

  // 获取用户的id
  getweq: function() {
    wx.request({
      url: app.globalData.domain + 'getuserwx',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          // console.log(21312)
          console.log(app.globalData.openid);

          app.globalData.userid = res.data.data.id;
          app.globalData.nickName = res.data.data.nickName;
          app.globalData.avatarUrl = res.data.data.avatarUrl;

          console.log('userid', app.globalData.userid);
          // console.log('userid', res);
          // 获取订单列表
          // console.log(this.data.shouquan+'========2eqweqweqwe!~~~~~~~~~~~~!~~~~~~~~~~~~~~~~~~!~~~~~~~~~~')
          if (this.data.shouquan == 1) {
            // console.log('~~~~~~~~~~')
            this.getorder();

          }

        }

      }
    });
  },
  // 获取用户订单查看有没有进行的订单
  getorder: function() {
    // console.log('获取我的订单')
    wx.request({
      url: app.globalData.domain + 'myorder',
      data: {
        // app.globalData.userid
        member_id: app.globalData.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          console.log('我的订单中查看uid=' + app.globalData.userid);


          var resultSet = res.data.data;
          console.log('获取我的订单', resultSet)
          const length = resultSet.length;
          // console.log(length)

          // 如果没有订单就直接不判断。默认没有正在使用中的订单
          if (length != 0) {
            
            // let orderListSet = res.data.data.map((v) => {
            //   console.log(v)
            //   if(v.order_status ==1){
            //     console.log(111111111111111111111111111111111111)
            //     this.setData({
            //       order_status: 1
            //     });
            //     console.log("找到了有正在进行的订单" + this.data.order_status)
            //     return false;
            //   }else if(v.order_status == 2){
            //     console.log(222222222222222222222222222222)

            //     // this.setData({
            //     //   order_status: 2
            //     // })
            //     console.log("没找到正在进行的订单" + this.data.order_status)

            //   }
            // })

            let obj = resultSet;
            for (let i in obj) {
              console.log(i, obj[i])
              if (obj[i].order_status == 2) {

                this.setData({
                  order_status: 2
                })
                app.globalData.order_status = 2;
                console.log("没找到正在进行的订单" + this.data.order_status)
              }else {
                this.setData({
                  order_status: 1
                });
                //找到正在进行的订单的id并赋值
                app.globalData.order_id = obj[i].id;
                app.globalData.order_status = 1;



                console.log("找到了有正在进行的订单" + this.data.order_status)
                return false;
              }
            }
          };

          console.log('我的订单' + this.data.orderList);


        }


      }
    });

  },

  // 获取当前的经纬度
  getlocation() {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        app.globalData.lat = res.latitude,
          app.globalData.long = res.longitude
        console.log('long' + app.globalData.long)
        console.log('lat' + app.globalData.long);
        this.getIndexArr(latitude, longitude) //获取首页充电宝列表

      },

    })
  },


  //获取首页充电宝列表
  getIndexArr(latitude, longitude) {
    wx.request({
      url: app.globalData.domain + 'getDeviceInfo',

      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          console.log(res);
          // 添加一个新的属性 距离dis = 人和商店的距离

          // 获取经维护数组 从 guessArr获取
          // map是一个新的方法，来拿新的数组
          let disArr = res.data.data.map((v) => {
            return {
              latitude: Number(v.lat),
              longitude: Number(v.lgt)
            };

          });
          console.log('disArr=', disArr)
          // 调用腾旭地图
          demo.calculateDistance({
            from: {
              // 已经接收的值
              latitude: latitude,
              longitude: longitude
            },

            to: disArr,
            //  [{
            //   latitude: 31.95,
            //   longitude: 118.85
            // }, {
            //   latitude: 31.95,
            //   longitude: 118.85
            // }, {
            //   latitude: 31.95,
            //   longitude: 118.85
            // }],
            //终点坐标
            success: (result) => { //成功后的回调
              console.log(result);
              if (result.status == 0) {

                let guessArr = res.data.data.map((v, i) => {
                  v.dis = result.result.elements[i].distance;
                  return v;

                });
                console.log(guessArr)
                this.setData({
                  guessArr: guessArr
                });
                // console.log(this.data.guessArr);
              }
            },
            fail: function(result) {
              console.log(result);
            },
            complete: function(result) {
              console.log(result);



            }
          });



          // this.setData({
          //   guessArr: res.data.data
          // })
          // console.log(this.data.guessArr);
        }


      }
    });
  },
  bindGetUserInfo: function() {

  },







  goPersonal: function() {
    wx.navigateTo({
      url: '../personal/personal',
    });
  },
  goMap: function(e) {
    let data = e.currentTarget.dataset;
    // console.log(data)
    // console.log(this.data.guessArr)
    // wx.navigateTo({
    //   url: '../map/map?device_id=' + ,
    // });




    console.log(this.data.guessArr[data.index].device_id)
    wx.request({
      url: app.globalData.domain + 'getonedevice',
      data: {
        device_id: this.data.guessArr[data.index].device_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          // 充电柜信息
          console.log(res.data)
          // console.log(res.data.lgt)
          var lgt = res.data.lgt;
          var lat = res.data.lat;
          var name = res.data.name;
          var address = res.data.address;
          // console.log(lgt);
          // console.log(lat);
          // console.log(name);
          // console.log(address);

          wx.openLocation({
            longitude: Number(lgt),
            latitude: Number(lat),
            name: name,
            address: address
          })
        }

      }
    });
  },
  // 二维码扫描
  goShare: function() {
    // console.log(this.data.order_status)
    // 判断是否有正在使用的订单 ，如果有，就不允许扫码
    if (this.data.order_status == 1) {
      wx.showToast({
        title: '您有正在进行中的订单,请先归还充电宝再下单',
        icon: 'none',
        mask: true,
        duration: 2000
      })

    } else if (this.data.order_status == 2) {
      if (this.data.shouquan == 0) {
        wx.navigateTo({
          url: '../share/share',
        });
        console.log("~~~~~~~~~~~~~~~~~~~~~~~")
      } else {
        var that = this;
        var show;
        wx.scanCode({
          success: (res) => {
            this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
            // that.setData({
            //   show: this.show
            // });

            var pl = res.result
            var a = pl.split('?')[1].split('=')[1]
            app.globalData.device_id = a;
            console.log('扫描二维码中设备id为=' + app.globalData.device_id);
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
          complete: (res) => {}
        });
      }

    }


    // wx.navigateTo({
    //   url: '../share/share',
    // });
  },
  // 优惠券
  goCoupon: function() {
    wx.navigateTo({
      url: '../coupon/coupon',
    });
  },
  goNengliang: function(){
    wx.showToast({
      title: '此功能暂未开放',
      icon: 'none',
      mask: true,
      duration: 2000
    })

  },
  goOrder:function(){
    var order_id = app.globalData.order_id;
    console.log(order_id)
    wx.navigateTo({
      url: '../order-details/order-details?orderid='+order_id,
    });
  }





})