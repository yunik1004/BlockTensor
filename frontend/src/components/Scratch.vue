<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <p>Result가 보여질 자리</p>
          <p>Test data: {{testData}} => Expected output: {{testLabels}}</p>
          <p>Interactive</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button @click="showCode()">Show code</button>
          <button @click="runCode()">Run code</button>
          <button @click="testCode()">Test code</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <p>Training data가 들어갈 자리</p>
          <p>train data: {{stage.trainData}}</p>
          <p>train labels: {{stage.trainLabels}}</p>
        </div>
        <div class="col-sm-8" id="blocklyArea">
        </div>
      </div>
    </div>
    <div id="blocklyDiv" style="position: absolute"></div>
    <xml id="toolbox" style="display: none">
      <category name="ML" colour="120">
        <block-component v-for="block in stage.blocks" :block="block" :type="block.blockName" :key="block.blockName"></block-component>
      </category>
    </xml>
  </div>
</template>

<script>
import Blockly from 'node-blockly/browser'
import JSONfn from 'json-fn'
import gql from 'graphql-tag'

// Blockly workspace
let workspace

let blockComponent = {
  props: ['type', 'block'],
  template: `<block :type="type"></block>`,
  mounted: function () {
    let blockStruct = this.block.struct
    let blockCode = this.block.code

    let blockFunc = function (block) {
      let fn = JSONfn.parse(blockCode)
      return fn(block, Blockly)
    }

    Blockly.Blocks[this.type] = {
      init: function () {
        this.jsonInit(blockStruct)
      }
    }

    Blockly.JavaScript[this.type] = blockFunc

    // Update the toolbox
    workspace.updateToolbox(document.getElementById('toolbox'))
  }
}

export default {
  name: 'Scratch',
  data () {
    return {
      stage: {
        'blocks': [],
        'trainData': [],
        'trainLabels': []
      },
      loading: 0,

      model: null,

      testData: [],
      testLabels: []
    }
  },
  apollo: {
    stage: {
      query: gql`query{
        stage (stageName: "1") {
          blocks {
            blockName
            struct
            code
          }
          trainData
          trainLabels
        }
      }`,
      loadingKey: 'loading'
    }
  },
  created () {
    let testdata = [5, 7]
    this.testData.push.apply(this.testData, testdata)
  },
  mounted () {
    workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      scrollbars: false
    })

    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  },
  components: {
    'block-component': blockComponent
  },
  methods: {
    runCode: function () {
      let code = Blockly.JavaScript.workspaceToCode(workspace)
      try {
        // eslint-disable-next-line
        eval(code)
      } catch (e) {
        alert(e)
      }
    },
    showCode: function () {
      let code = Blockly.JavaScript.workspaceToCode(workspace)
      alert(code)
    },
    testCode: function () {
      // eslint-disable-next-line
      this.testLabels = this.model.predict(tf.tensor(this.testData, [this.testData.length, 1])).dataSync()
    },
    onResize: function (e) {
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
    }
  }
}
</script>

<style scoped>
</style>
