<template>
  <div>
    <canvas id="gaf" width="200" height="200" style="border: 1px black solid;"></canvas>
    <canvas id="dstcvs" width="28" height="28" style="border: 1px black solid; display: none;"></canvas>
    <button id="clearCanvas" type="button" class="btn btn-sm btn-outline-danger" v-on:click="canvasClear()" style="position: absolute">X</button>
    <!--<button id="go" type="button" v-on:click="canvasPredict()">Predict!</button> -->
  </div>
</template>

<script>
import BarChart from './chart/BarChart.js'

export default {
  name: 'DrawingPaper',
  props: ['model'],
  data () {
    return {
      predict: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  components: {
    'bar-chart': BarChart
  },
  mounted () {
    this.initCanvas()

    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  },
  methods: {
    initCanvas: function () {
      const config = {
        strokeWeight: 6
      }
      let mouse = false
      let lastMousePos = { x: 0, y: 0 }

      const canvas = document.getElementById('gaf')
      const ctx = canvas.getContext('2d')

      ctx.lineWidth = config.strokeWeight
      ctx.lineCap = 'square'

      canvas.addEventListener('mousedown', e => { mouse = true })
      canvas.addEventListener('mouseup', e => { mouse = false })
      canvas.addEventListener('mouseout', e => { mouse = false })
      canvas.addEventListener('mousemove', e => {
        if (mouse) {
          ctx.beginPath()
          ctx.moveTo(lastMousePos.x, lastMousePos.y)
          ctx.lineTo(e.layerX, e.layerY)
          ctx.stroke()
        }
        lastMousePos = { x: e.layerX, y: e.layerY }
      })
    },
    canvasPredict: function () {
      const canvas = document.getElementById('gaf')

      const dstcvs = document.getElementById('dstcvs')
      dstcvs.getContext('2d').drawImage(canvas, 0, 0, 200, 200, 0, 0, 28, 28)

      let imgdata = dstcvs.getContext('2d').getImageData(0, 0, 28, 28)

      const { data } = imgdata

      let input = new Float32Array(28 * 28)
      for (let i = 0, len = data.length; i < len; i += 4) {
        input[i / 4] = data[i + 3] / 255
      }

      if (this.model == null) {
        this.$swal({
          title: 'Model not exists!!',
          text: 'Generate model first',
          icon: 'error',
          button: true,
          closeOnClickOutside: false,
          closeOnEsc: false
        })
        return
      }

      // eslint-disable-next-line
      this.predict = this.model.predictOnBatch(tf.tensor(input, [1, 28, 28, 1])).dataSync()

      console.log(this.predict)
    },
    canvasClear: function () {
      document.getElementById('gaf').getContext('2d').clearRect(0, 0, 200, 200)
      document.getElementById('dstcvs').getContext('2d').clearRect(0, 0, 28, 28)
      this.predict = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    showDigitPriority: function () {
      return {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
          {
            labels: 'Digits',
            data: this.predict
          }
        ]
      }
    },
    onResize: function (e) {
      let gaf = document.getElementById('gaf')
      let clearCanvas = document.getElementById('clearCanvas')

      let element = gaf
      let x = 0
      do {
        x += element.offsetLeft
        element = element.offsetParent
      } while (element)

      clearCanvas.style.left = x + gaf.offsetWidth - 48 + 'px'
      clearCanvas.style.top = '3px'
    }
  }
}
</script>
