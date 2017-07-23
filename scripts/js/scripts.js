// Initialize Firebase
 var config = {
   apiKey: 'AIzaSyDVVH2-FpxX3S7OtkX2oI3nTmvF1ebsiuo',
   authDomain: 'stickers-660b2.firebaseapp.com',
   databaseURL: 'https://stickers-660b2.firebaseio.com',
   projectId: 'stickers-660b2',
   storageBucket: 'stickers-660b2.appspot.com',
   messagingSenderId: '803359034665'
 }
 firebase.initializeApp(config)

 var stickersRef = firebase.database().ref('sticker')

 stickersRef.on('value', function ($data) {
   Vm.stickers = $data.val()
 })

 var Vm = new Vue({
   'el': '#app',
   'data': {
     stickers: [
      //  {
      //    text: '文字',
      //    color: 'yellow',
      //    pos: {x: 20, y: 10}
      //  },
      //  {
      //    text: '文',
      //    color: 'blue',
      //    pos: {x: 20, y: 300}
      //  }
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

         // firebase data
         stickersRef.child(this.nowId).set(this.stickers[this.nowId])
       }
     }
   },
   'methods': {
     stickersCss (p) {
       return {
         'top': p.pos.y + 'px',
         'left': p.pos.x + 'px',
         'background-color': this.colorList.find(o => o.name === p.color).color
       }
     },
     stickersFontSize (p) {
       return {
         'font-size': (240 / p.text.length - 20) + 'px'
       }
     },
     selectId (event, id) {
       var k = function () {
         for (var i = 0; i < event.srcElement.classList.length; i++) {
           if (event.srcElement.classList[i] === 'nav') {
             return 1
           }
         }
         return 0
       }

       if (!k()) {
         this.nowId = id
         this.startPos.x = event.offsetX
         this.startPos.y = event.offsetY
       }
     },
     addpost () {
       // firebase data
       stickersRef.push(
         {
           text: '文字',
           color: 'yellow',
           pos: {x: 200 + Math.random() * 200, y: 200 + Math.random() * 200}
         }
      )
      // vue data
      //  this.stickers.push(
      //    {
      //      text: '文字',
      //      color: 'yellow',
      //      pos: {x: 200 + Math.random() * 200, y: 200 + Math.random() * 200}
      //    }
      // )
     },
     dropSticker (pid) {
       // vue data
       // this.stickers.splice(pid, 1)

       // firebase
       stickersRef.child(pid).remove()
     },
     setText (pid) {
       let text = prompt('請輸入文字', this.stickers[pid].text)
       if (text) {
         this.stickers[pid].text = text
       }
     },
     setColor (pid, colorname) {
       this.stickers[pid].color = colorname
     },
     firebaseUpdate (pid) {
       stickersRef.child(pid).set(this.stickers[pid])
     }
   }
 })

 window.onmousemove = function (event) {
   Vm.mousePos = {x: event.pageX, y: event.pageY}
 }

 window.onmouseup = function (event) {
   Vm.nowId = -1
  // console.log(Vm.nowId)
 }
