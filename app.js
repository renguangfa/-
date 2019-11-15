//app.js
// 帮助中心的下拉和隐藏图标
const domain = 'https://data.wadd.vip/api/v2.portable_power/'
App({
  onLaunch: function () {
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

// wxac4bc490279a7020
    // 登录  获取用户openid
    wx.login({
      
      success: res => {
        console.log('登录  获取用户openid')
        wx.request({
          url: domain+'getOpenid',
          data: { code: res.code, appId: 'wxeba8d289972dfb58'},
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          success: res => {
            // console.log("openid = "+res.data.msg.openid);
            console.log(res.data)
            let data = res.data;
            this.globalData.openid = data.openid; 
            this.globalData.session_key = data.session_key; 
            // console.log(this.globalData.session_key)

            if (this.callback) { //这个函数名字和你定义的一样即可
              this.callback() //执行定义的回调函数
            }
            console.log("openid = " + data.openid);
            this.globalData.login_type = data.type;
            console.log("是否注册过 1、已注册  0、未注册 = " + this.globalData.login_type);
      
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
   
    
  },



 
  globalData: {
    // userInfo: null,
    domain:"https://data.wadd.vip/api/v2.portable_power/",
    userInfo: {}, //用户信息
    userid: 0, //用户id
    openid: "", //openid
    phonenumber: "",//用户手机号
    nickName:"",
    avatarUrl:"",
    province:"",
    city: "",
    session_key:"",     //openid中的   用来传给解密手机号接口
    orderList:[],
    login_type: 2,      //是否登录或者注册 //1、已注册  0、未注册
    device_id: 0  ,     //设备编号
    lat: 0,             //用户的经纬度
    long: 0 ,            //用户的经纬度
    shouquanType: 0,      // 跟我的关联，如果授权就自动获取个人信息，如果没有要自己点击登录账号  0为未授权，1为已授权
    order_id: 0  ,           //首页  您有未归还的订单 中的订单id
    order_status: 2  ,            //是否有正在进行的订单   1 有 2无
    options:''   ,          //从外面扫码进来，产看是否有参数
   

  }
})