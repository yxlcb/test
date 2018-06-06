Component({
  data: {
    broadcast: ["永兴县青年者志愿协会", "永兴县陈家沟太极瑜伽馆", "永兴县跑吧协会", "永兴县收藏协会"],
    animationData: {}

  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  }



})