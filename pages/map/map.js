const app = getApp();
// Page({
//   data: {
//     // 充电柜的信息坐标
//     markers: [],
//     // 用户的地点坐标
//     // circle: [{
//     //   latitude: app.globalData.lat,
//     //   longitude: app.globalData.long
//     // }],
//     lat:0,
//     lgt:0


//   },
//   onLoad: function(event) {
//     wx.getLocation({
//       type: 'gcj02', //返回可以用于wx.openLocation的经纬度
//       success(res) {
//         const latitude = res.latitude
//         const longitude = res.longitude
//         wx.openLocation({
//           latitude,
//           longitude,
//           scale: 18
//         })
//       }
//     });
//     // 查看指定的充电柜
//     wx.request({
//       url: app.globalData.domain + 'getDeviceInfo',
//       data: {
//         device_id: event.device_id
//       },
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       method: 'POST',
//       success: res => {
//         if (res.statusCode == 200) {
// // 充电柜信息
//           // console.log(res.data.data[0])
//           // console.log(event.device_id)

//           // console.log(this.data.markers[0].latitude)
//           // 定义markers
//           let markers = this.data.markers;
//           // let marl
//           markers.push({
//             latitude: res.data.data[0].lat,
//             longitude: res.data.data[0].lgt,
//             iconPath: '/assets/images/map.png',
//             width: 20,
//             height: 30

//           });
//           console.log('markers',markers);
//           // markers.latitude
//           this.setData({
//             markers: markers
//           })
//           this.setData({

//             lat: res.data.data[0].lat,
//             lgt: res.data.data[0].lgt

//           });

//           // console.log(this.data.markers)
//         }

//       }
//     });

//   },
//   regionchange(e) {
//     // console.log(e.type)
//   },
//   markertap(e) {
//     console.log(e.markerId)
//   },
//   controltap(e) {
//     console.log(e.controlId)
//   }
// })


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.request({
      url: app.globalData.domain + 'getonedevice',
      data: {
        device_id: options.device_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
          // 充电柜信息
          console.log(res.data)
          console.log(options.device_id)
          console.log(res.data.lgt)
          var lgt = res.data.lgt;
          var lat = res.data.lat;
          var name = res.data.name;
          var address = res.data.address;
          console.log(lgt);
          console.log(lat);
          console.log(name);
          console.log(address);

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