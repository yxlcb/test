
Page({
  data: {
    condition: false,
    deleteInde: -1,
    chooseFiles: [],
    percent: 0,
    load: "false",
    address: "当前位置",
    connent: "",
    telephone: "",
    nickname: "",
    avatarUrl: "",
    isvideo: [0, 0, 0, 0, 0]

  },
  onLoad:function(){
    wx.setTabBarBadge({
      index: 0,
      text: '1'
    })

    wx.setTabBarItem({
      index: 0,
      text: '丰富',
      iconPath: '',
      selectedIconPath: ''
    })

  },

  textareainput: function (e) {
    this.setData({ connent: e.detail.value })
  },
  telephoneinput: function (e) {
    this.setData({ telephone: e.detail.value })
    var regNum = new RegExp('[0-9]', 'g')
    var rsNum = regNum.exec(e.detail.value)
    if (rsNum) {
      this.setData({ telephone: e.detail.value })
    }
    else {
      console.log("gjkgkkgkgkgkgk")
    }
  },

  deleletImage: function (event) {
    var index = event.currentTarget.dataset.idx;
    var that = this;
    this.setData({ deleteInde: index });
    this.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        chooseFiles: that.data.chooseFiles,
        deleteInde: -1
      }), 500
    })
  },

  /***********选择图片************ */
  chooseImage: function () {
    var imgArr = this.data.chooseFiles;
    var leftCount = 5 - imgArr.length;
    if (leftCount <= 0) {
      wx.showToast({
        title: '最多上传5张',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({ chooseFiles: imgArr.concat(tempFilePaths) })
      }
    })
  },

  /**********预览图片************** */

  previewImage: function (event) {
    var index = event.currentTarget.dataset.idx;
    var that = this;
    console.log(event)
    if (that.data.isvideo[index] !== 1) {
      wx.previewImage({
        current: that.data.chooseFiles[index],
        urls: that.data.chooseFiles
      })
    } else {
      var url1 = '../../pages/video/video?src=' + that.data.chooseFiles[index]
      console.log(url1)
      wx.navigateTo({
        url: url1

      })

    }
  },


  /***************上传视频短片******************** */


  bindTapvideo: function () {
    var that = this;
    var imgArr = that.data.chooseFiles;
    var imgarrlen = imgArr.length;
    var leftCount = 5 - imgArr.length;
    if (leftCount <= 0) {
      wx.showToast({
        title: '最多上传5张',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 10,
      camera: 'back',
      success: function (res) {
        that.data.isvideo[imgarrlen] = 1;
        var v = that.data.isvideo;
        console.log(res)
        that.setData({ isvideo: v })
        that.setData({
          src: res.tempFilePath,
          chooseFiles: imgArr.concat(res.tempFilePath),
          condition: true
        })

      }
    })
  },

  /***********定位代码*********** */
  maponclick: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res

        )
        that.setData({
          addressname: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }

    })
  },

  /***********确认发布信息*************/

  /***************处理图片和视频文件上传请求*******************/
  getuserinfo: function (e) {
    var str = JSON.parse(e.detail.rawData)
    var avatarUrl1 = str.avatarUrl
    var nickname1 = str.nickName
    this.setData({
      avatarUrl: avatarUrl1,
      nickname: nickname1
    })

    var that = this;
    for (var i = 0; i <= that.data.chooseFiles.length - 1; i++) {
      var uploadTask = wx.uploadFile({
        url: 'https://www.7hou.wang/upload.php', //仅为示例，非真实的接口地址
        filePath: that.data.chooseFiles[i],
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          console.log(res.data)
        }
      })
      uploadTask.onProgressUpdate((res) => {
        var percent1 = res.progress
        that.data.percent = percent1
      })

      wx.showLoading({
        title: '上传中',
      })
      setTimeout(function () {
        {
          if (that.data.percent == 100) {
            wx.hideLoading()
            that.setData({ load: "true" })
          }
        }
      }, 1000)
    }
    // 写入后台数椐库  


    wx.request({
      url: 'https://www.7hou.wang/yxwst/test.php', //仅为示例，并非真实的接口地址

      data: {
        connent: that.data.connent,
        addressname: that.data.addressname,
        address: that.data.address,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        telephone: that.data.telephone,
        nickname: that.data.nickname,
        avatarUrl: that.data.avatarUrl
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ showloading: false })
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
      }
    })

  }


})