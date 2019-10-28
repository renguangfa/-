const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ency:'',
    errMsg:'',
    iv: '',
    shoujihao: 0  //获取手机号按钮  0 为不显示
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           //用户已经授权过
    //           console.log('用户已经授权过')

    //           let userInfo = res.userInfo
    //           app.globalData.userInfo = res.userInfo
    //           app.globalData.nickName = userInfo.nickName;
    //           app.globalData.avatarUrl = userInfo.avatarUrl;
    //           this.getUserId();
    //           this.getPhoneNumber();


    //           wx.reLaunch({
    //             url: '../index/index'
    //           })
    //         }
    //       });
    //     }
    //   }
    // })
  },
  // 授权用户信息
  bindGetUserInfo: function(e) {
    // console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      // console.log(e.detail.userInfo)
      console.log('用户按了允许授权按钮')
      let userInfo = e.detail.userInfo
      console.log(userInfo)
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.nickName = userInfo.nickName;
      app.globalData.avatarUrl = userInfo.avatarUrl;
      app.globalData.city = userInfo.city;
      console.log(app.globalData.nickName)
      console.log(app.globalData.avatarUrl)
      console.log(app.globalData.city)
      this.getUserId();
      if (this.data.shoujihao==0){
        this.setData({
          shoujihao:1
        });
        this.getPhoneNumber();
      }


      
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  // // 获取手机号 
  getPhoneNumber: function (e) { //这个事件同样需要拿到e
  console.log(e);
    var ency = e.detail.encryptedData;  //包括敏感数据在内的完整用户信息的加密数据
    var iv = e.detail.iv;               //加密算法的初始向量
    var errMsg = e.detail.errMsg      
    if (iv == null || ency == null) {
      wx.showToast({
        title: "授权失败,请重新授权！",
        icon: 'none',
      })
      return false
    }
    //把获取手机号需要的参数取到，然后存到头部data里面
    this.setData({
      ency: ency,
      iv: iv,
      errMsg: errMsg
    })

    this.jiemiPhone(); //调用手机号授权事件
  },
  // 解密手机号 
  jiemiPhone: function(){
    console.log('我是解密手机号~~~')
    // console.log(this.data.ency)
    



    wx.request({
      url: app.globalData.domain + 'getPhoneNumber',
      data: {
        appid: 'wxeba8d289972dfb58',
        session_key: app.globalData.session_key,
        encryptedData: this.data.ency,
        iv: this.data.iv,
        openid: app.globalData.openid,
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl,
        address: app.globalData.city


      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
  
          // console.log(res);
          // console.log(app.globalData.session_key);
          // console.log(this.data.ency);
          // console.log(this.data.iv);
          // console.log(app.globalData.openid);
          // let data = JSON.parse(res.data.data);

          // app.globalData.phonenumber = data.phoneNumber;

          // // console.log('phonenumber=' + data.phoneNumber);
          // console.log('phonenumber=' + app.globalData.phonenumber);
          // // console.log('phonenumber=' + data);


        }

      }
    });



    wx.reLaunch({
      url: '../index/index'
    })
  },


  // 获取用户id
  getUserId: function() {
    console.log('获取用户id')
    wx.request({
      url: app.globalData.domain + 'getuserwx',
      data: {
        openid: app.globalData.openid,
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl


      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          // console.log(21312)
          // console.log(app.globalData.openid);

          app.globalData.userid = res.data.data.id;
          console.log('userid', app.globalData.userid);
          // 获取订单列表
          this.getorder();

        }

      }
    });

  },
  getorder: function () {

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
          console.log('orderList', res);

          app.globalData.orderList = res.data.data;
          console.log('orderList', app.globalData.orderList);

        }

      }
    });
  },

})