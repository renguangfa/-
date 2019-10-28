const app = getApp();
Page({
  data: {
    // 充电柜的信息坐标
    markers: [],
    // 用户的地点坐标
    circle: [{
      latitude: app.globalData.lat,
      longitude: app.globalData.long
    }],
    lat:0,
    lgt:0


  },
  onLoad: function(event) {
    var that = this;  
    // 查看指定的充电柜
    wx.request({
      url: app.globalData.domain + 'getDeviceInfo',
      data: {
        device_id: event.device_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: res => {
        if (res.statusCode == 200) {
// 充电柜信息
          // console.log(res.data.data[0])
          // console.log(event.device_id)

          // console.log(this.data.markers[0].latitude)
          // 定义markers
          let markers = this.data.markers;
          // let marl
          markers.push({
            latitude: res.data.data[0].lat,
            longitude: res.data.data[0].lgt,
            iconPath: '/assets/images/map.png',
            width: 20,
            height: 30

          });
          console.log('markers',markers);
          // markers.latitude
          this.setData({
            markers: markers
          })
          this.setData({

            lat: res.data.data[0].lat,
            lgt: res.data.data[0].lgt
           
          });

          // console.log(this.data.markers)
        }

      }
    });

  },
  regionchange(e) {
    // console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})