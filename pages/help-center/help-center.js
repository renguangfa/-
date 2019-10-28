// pages/help-center/help-center.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hiddenName: true,
        selected: false,  //默认使用向下箭头图片,
        num: 0,
        flag: false, //租借指南隐藏
        flag1: false //归还指南隐藏
    },
    //显示隐藏
    tigger: function(e) {
        var that = this;
        var toggleBtnVal = that.data.uhide
        var num = e.currentTarget.dataset.num;
        console.log('num: '+num);
        var selected = this.data.selected;  //定义selected变量并赋值
        that.setData({
            num: num,
            selected: true
        });

        /*if (toggleBtnVal == num) {
            that.setData({
                uhide: 0,
                selected: !selected,
            })
        } else {
            that.setData({
                uhide: num,
                selected: !selected,
            })
        }*/
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    zujie:function(){
        this.setData({
            flag: true
          })
    },
    zujieimg:function(){
        this.setData({
            flag: false
          })
    },
    guihuan:function(){
        this.setData({
            flag1: true
          })
    },
    guihuanimg:function(){
        this.setData({
            flag1: false
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