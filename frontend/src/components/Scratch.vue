<template>
  <div class="app">
    <Push width="300" @openMenu="openSlide()" @closeMenu="closeSlide()">
      <a id="Profile" href="#">
        <img class="sidebar-icon" src="../icons/Profile_white.svg">
        <span>Profile</span>
      </a>
      <a id="About Us" href="#">
        <img class="sidebar-icon2" src="../icons/information_white.svg">
        <span>AboutUs</span>
      </a>
      <a id="Log Out" href="#">
        <img class="sidebar-icon" src="../icons/logout_white.svg">
        <span>LogOut</span>
      </a>
    </Push>
    <main>
      <div class="container-fluid">
        <router-link to="/" class="header-name">TensorBlock</router-link>
        <div class="row">
          <div class="col-sm-4 top-pos">
            <div class="input-container">
              <div class="input-container-header">
                <p class="tooltip-css">Training Data
                  <span class="tooltip-css-text">......</span>
                </p>
              </div>
              <div class="input-container-contents">
                <type1 v-if="inputStage == 'Sequence Prediction'"></type1>
                <type2 v-if="inputStage == 2"></type2>
              </div>
            </div>
            <div class="result-container">
              <div class="result-container-header">Training Result</div>
              <div class="result-container-result">
                <p>Train loss: {{lastTrainLoss}}</p>
                <p>Validation loss: {{lastValidLoss}}</p>
              </div>
            </div>
          </div>
          <div class="classchart">
            <line-chart :chart-data="trainLossCollection"></line-chart>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4 bottom-pos">
            <div class="test-container">
              <p>Expected output: {{testLabels}}</p>
            </div>
          </div>
          <div class="col-sm-8" id="blocklyArea"></div>
        </div>
      </div>

      <!-- Blockly workspace  -->
      <div id="blocklyDiv" style="position: absolute"></div>
      <xml id="toolbox" style="display: none">
        <category name="- Modules -"></category>
        <category></category>
        <category-component
          v-for="blockList in stage.blockLists" :key="blockList.category"
          :name="blockList.category"
          :blockList="blockList.blocks">
        </category-component>
      </xml>

      <!-- Start blocks  -->
      <xml id="startBlocks" style="display: none">
        <block type="startBlock" deletable="false" x="200" y="50"></block>
      </xml>

      <!-- Buttons in front of the Blockly workspace -->
      <div id="trainBtns" class="btn-group-vertical" style="position: absolute">
        <button type="button" class="btn btn-outline-primary" @click="runCode()">Train</button>
        <button type="button" class="btn btn-outline-success" @click="testCode()">Test</button>
        <button type="button" class="btn btn-outline-danger" @click="showCode()">Code</button>
      </div>
    </main>
  </div>
</template>

<script>
import Blockly from 'node-blockly/browser'
import JSONfn from 'json-fn'
import gql from 'graphql-tag'
import LineChart from './chart/LineChart.js'
import { Push } from 'vue-burger-menu'

// Blockly workspace
let workspace

let blockComponent = {
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  template: `<block></block>`,
  mounted: function () {
    let blockStruct = this.block.struct
    let blockCode = this.block.code

    let blockFunc = function (block) {
      let fn = JSONfn.parse(blockCode)
      return fn(block, Blockly)
    }

    Blockly.Blocks[this.block.blockName] = {
      init: function () {
        this.jsonInit(blockStruct)
        this.contextMenu = false
      }
    }

    Blockly.JavaScript[this.block.blockName] = blockFunc

    // Update the toolbox
    workspace.updateToolbox(document.getElementById('toolbox'))
  }
}

let categoryComponent = {
  props: {
    name: {
      type: String,
      required: true
    },
    blockList: {
      type: Array,
      required: true
    }
  },
  template: `
    <category :name="name" colour="188">
      <block-component
        v-for="block in blockList" :key="block.blockName"
        :type="block.blockName"
        :block="block">
      </block-component>
    </category>
  `,
  mounted: function () {
    // Update the toolbox
    workspace.updateToolbox(document.getElementById('toolbox'))
  },
  components: {
    'block-component': blockComponent
  }
}

export default {
  name: 'Scratch',
  props: ['stageName'],
  data () {
    return {
      inputStage: null,
      stage: {
        'details': '',
        'blockLists': []
      },

      model: null,

      trainData: null,
      trainLabels: null,

      trainResults: {
        'loss': [],
        'val_loss': []
      },

      testData: [],
      testLabels: []
    }
  },
  computed: {
    lastTrainLoss: function () {
      let len = this.trainResults.loss.length
      if (len === 0) {
        return null
      }

      return this.trainResults.loss[len - 1]
    },
    lastValidLoss: function () {
      let len = this.trainResults.val_loss.length
      if (len === 0) {
        return null
      }

      return this.trainResults.val_loss[len - 1]
    },
    trainLossCollection: function () {
      let lossSize = this.trainResults.loss.length
      let lossLabels = [...Array(lossSize + 1).keys()].slice(1)

      return {
        labels: lossLabels,
        datasets: [
          {
            label: 'Loss',
            fill: false,
            data: this.trainResults.loss
          },
          {
            label: 'Val Loss',
            fill: false,
            data: this.trainResults.val_loss
          }
        ]
      }
    }
  },
  apollo: {
    stage: {
      query: gql`
      query StageMessage ($stageName: String!) {
        stage (name: $stageName) {
          details
          blockLists {
            category
            blocks {
              blockName
              struct
              code
            }
          }
        }
      }`,
      variables () {
        return {
          stageName: this.$route.params.stageName
        }
      },
      result (data) {
        this.$swal({
          title: this.$route.params.stageName,
          text: this.stage.details,
          button: true,
          closeOnClickOutside: false,
          closeOnEsc: false
        })

        this.$http.get('/api/data/train/' + this.$route.params.stageName).then((result) => {
          // eslint-disable-next-line
          this.trainData = eval('(' + result.data.trainData + ')')
          // eslint-disable-next-line
          this.trainLabels = eval('(' + result.data.trainLabels + ')')

          console.log('Successfully received training data')
        })
      }
    }
  },
  created () {
    let testdata = [5, 7]
    this.testData.push.apply(this.testData, testdata)
  },
  mounted () {
    let toolbox = document.getElementById('toolbox')
    workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      scrollbars: false
    })

    this.initializeStartBlocks()

    window.addEventListener('resize', this.onResize, false)
    this.onResize()

    this.inputStage = this.$route.params.stageName
  },
  updated () {
    this.onResize()
  },
  components: {
    Push,
    'category-component': categoryComponent,
    'line-chart': LineChart,
    'type1': () => import('../components/type1'),
    'type2': () => import('../components/type2')
  },
  methods: {
    runCode: function () {
      // eslint-disable-next-line
      this.trainData = tf.tensor(this.$store.state.test1inputs, [5, 1])
      // eslint-disable-next-line
      this.trainLabels = tf.tensor(this.$store.state.test1labels, [5, 1])
      this.testdata = this.$store.state.test1tests

      this.trainResults['loss'] = []
      this.trainResults['val_loss'] = []

      let code = Blockly.JavaScript.workspaceToCode(workspace)
      try {
        // eslint-disable-next-line
        eval(code)
      } catch (e) {
        this.alertTrainingErr(e.message)
      }
    },
    showCode: function () {
      let code = Blockly.JavaScript.workspaceToCode(workspace)
      console.log(code)
    },
    testCode: function () {
      if (this.model == null) {
        this.$swal({
          title: 'No Trained Model exists',
          text: 'Make model first',
          icon: 'error',
          button: true,
          closeOnClickOutside: false,
          closeOnEsc: false
        })
        return
      }
      // eslint-disable-next-line
      this.testLabels = this.model.predictOnBatch(tf.tensor(this.testData, [this.testData.length, 1])).dataSync()
    },
    initializeStartBlocks: function () {
      Blockly.defineBlocksWithJsonArray([{
        'type': 'startBlock',
        'message0': 'Build model here!',
        'nextStatement': 'start_model_conn',
        'colour': '188',
        'tooltip': 'Build model here!!'
      }])

      Blockly.JavaScript['startBlock'] = function (block) {
        // Pre-defined variables
        let code = `
          let tbTrainData
          let tbTrainLabels

          let tbModel
          let tbThis = this
          let tbtmp

          function arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length != b.length) return false;

            for (let i = 0; i < a.length; ++i) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
        `

        return code
      }

      Blockly.BlockSvg.START_HAT = true

      Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace)

      workspace.clearUndo()
      workspace.addChangeListener(Blockly.Events.disableOrphans)
    },
    onResize: function (e) {
      // Resize blockly workspace
      let blocklyArea = document.getElementById('blocklyArea')
      let blocklyDiv = document.getElementById('blocklyDiv')

      // Compute the absolute coordinates and dimensions of blocklyArea.
      let element = blocklyArea
      let x = 0
      let y = 0
      do {
        x += element.offsetLeft
        y += element.offsetTop
        element = element.offsetParent
      } while (element)

      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px'
      blocklyDiv.style.top = y + 'px'
      blocklyDiv.style.width = blocklyArea.offsetWidth - 1 + 'px'

      let divHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - y - 1
      if (divHeight < 400) {
        blocklyDiv.style.height = '400px'
      } else {
        blocklyDiv.style.height = divHeight + 'px'
      }

      Blockly.svgResize(workspace)

      // Modify the position of buttons
      let trainBtns = document.getElementById('trainBtns')
      trainBtns.style.left = x + blocklyArea.offsetWidth - 100 + 'px'
      trainBtns.style.top = y + 10 + 'px'
    },
    alertFinTraining: function () {
      let resTxt = `Training loss: ${this.lastTrainLoss}\nValidation loss: ${this.lastValidLoss}`
      this.$swal({
        title: 'Training Success!!!',
        text: resTxt,
        icon: 'success',
        button: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      })
    },
    alertTrainingErr: function (errMsg) {
      this.$swal({
        title: 'Training Fail!!!',
        text: errMsg,
        icon: 'error',
        button: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      })
    },
    openSlide () {
    },
    closeSlide () {
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 10px auto;
}

.classchart {
  position: relative;
  left: 50px;
  width: 250px !important;
  height: 250px !important;
}

.top-pos {
  top: 100px;
}

.bottom-pos {
  top: 250px;
}

.result-container {
  position: relative;
  width: 400%;
  height: 40%;
  top: 50%;
  display: block;
  text-align: left;
}

.result-container-header {
  position: relative;
  font-size: 25px;
  line-height: 25px;
  font-weight: bolder;
  left: 50px;
}

.result-container-result {
  position: relative;
  left: 60px;
  top: 15px;
}

.input-container {
  position: relative;
  width: 100%;
  height: 60%;
}

.input-container-header {
  position: relative;
  font-size: 25px;
  line-height: 25px;
  font-weight: bolder;
  text-align: left;
  left: 50px;
}

.input-container-contents {
  position: relative;
}

.test-container {
  position: relative;
  text-align: left;
  left: 60px;
}

.tooltip-css {
  position: relative;
  display: inline-block;
  border-bottom: 2px dotted blue;
}

.tooltip-css .tooltip-css-text {
  visibility: hidden;
  width: 200px;
  background: indigo;
  color: yellow;
  text-align: center;
  border-radius: 10px;
  padding: 10px 5px;
  position: absolute;
  top: 200%;
  left: 50%;
  margin-left: -105px;
  z-index: 10;
}

.tooltip-css:hover .tooltip-css-text {
  visibility: visible;
}

.tooltip-css .tooltip-css-text::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent indigo transparent;
}
</style>
