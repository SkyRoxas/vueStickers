var Vm = new Vue({
  'el': '#app',
  'data': {
    stickers: [
      {
        text: '文字',
        color: 'yellow',
        pos: {x: 20, y: 10}
      },
      {
        text: '文',
        color: 'blue',
        pos: {x: 20, y: 300}
      }
    ],
    colorList: [
      {
        name: 'yellow',
        color: '#FFEB67'
      },
      {
        name: 'blue',
        color: '#A5D8E6'
      },
      {
        name: 'green',
        color: '#50B948'
      },
      {
        name: 'red',
        color: '#FE0000'
      }
    ],
    nowId: -1,
    mousePos: {
      x: 0,
      y: 0
    },
    startPos: {
      x: 0,
      y: 0
    }

  },
  'watch': {
    mousePos () {
      if (this.nowId !== -1) {
        this.stickers[this.nowId].pos.x = this.mousePos.x - this.startPos.x
        this.stickers[this.nowId].pos.y = this.mousePos.y - this.startPos.y
      }
    }
  },
  'methods': {
    stickersCss (p) {
      return {
        'top': p.pos.y + 'px',
        'left': p.pos.x + 'px',
        'font-size': (240 / p.text.length - 20) + 'px',
        'background-color': this.colorList.find(o => o.name === p.color).color
      }
    },
    selectId (event, id) {
      this.nowId = id
      this.startPos.x = event.offsetX
      this.startPos.y = event.offsetY
    },
    getColor () {

    },
    addpost () {
      this.stickers.push(
        {
          text: '文字',
          color: 'yellow',
          pos: {x: 200 + Math.random() * 200, y: 200 + Math.random() * 200}
        }
      )
    }
  }
})

window.onmousemove = function (event) {
  Vm.mousePos = {x: event.pageX, y: event.pageY}
}

window.onmouseup = function (event) {
  Vm.nowId = -1
  console.log(Vm.nowId)
}
