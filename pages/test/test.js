// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    imglist: ['https://tva2.sinaimg.cn/crop.0.0.750.422/90eb2137ly1fmn1houu6pj20ku0bqq4n.jpg', 'https://tva2.sinaimg.cn/crop.0.0.750.422/90eb2137ly1fmn1houu6pj20ku0bqq4n.jpg',
      'https://tva2.sinaimg.cn/crop.0.0.750.422/90eb2137ly1fmn1houu6pj20ku0bqq4n.jpg'
    
    
    
    ]
    
    
    
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var d=new Date
    this.getData().then((res)=>{
      var oldtime = 1526615468994
      var notime=d.getTime()
      var time1=notime-oldtime
      console.log(time1)
      that.setData({list:res.data})
      console.log(that.data.list[0].wxavatar)
    },(err)=>{

    })





    

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

  },
  getData() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://www.7hou.wang/yxwst/getconnent.php',
        data: "",
        success: (res) => {
          this.setData({ list: res.data })
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  } 




})