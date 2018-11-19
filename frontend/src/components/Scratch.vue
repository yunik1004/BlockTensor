<template>
  <div class="container">
    <div class="row">
      <div>
        <p>Result가 보여질 자리</p>
        <p>Test data: {{testData}} => Expected output: {{testLabels}}</p>
        <p>Interactive</p>
      </div>
    </div>
    <div class="row">
      <div  class="col-sm-4">
        <div>
          <p>Training data가 들어갈 자리</p>
          <p>train data: {{trainData}}</p>
          <p>train labels: {{trainLabels}}</p>
        </div>
      </div>
      <div class="col-sm-8">
        <div id="blocklyDiv" style="width: 800px; height: 480px;"></div>
        <xml id="toolbox" style="display: none">
          <category name="ML" colour="120">
            <block-component v-for="type in mlBlocks" :type="type" :key="type"></block-component>
          </category>
        </xml>
      </div>
    </div>
    <div class="row">
      <button @click="showCode()">Show code</button>
      <button @click="runCode()">Run code</button>
      <button @click="testCode()">Test code</button>
    </div>
  </div>
</template>

<script>
import Blockly from 'node-blockly/browser'
import BlockDB from '../database/BlockDB'

let blockComponent = {
  props: ['type'],
  template: '<block :type="type"></block>',
  mounted: function () {
    Blockly.Blocks[this.type] = {
      init: function () {
        this.jsonInit(BlockDB[this.type]['struct'])
      }
    }

    Blockly.JavaScript[this.type] = BlockDB[this.type]['code']
  }
}

export default {
  name: 'Scratch',
  data () {
    return {
      workspace: null,
      mlBlocks: [],
      model: null,
      trainData: [],
      trainLabels: [],
      testData: [],
      testLabels: []
    }
  },
  created () {
    let modules = ['sequentialModel', 'denseLayer', 'train']
    let traindata = [1, 2, 3, 4, 5]
    let trainlabels = [1, 3, 5, 7, 9]
    let testdata = [5, 7]

    // eslint-disable-next-line
    this.mlBlocks.push.apply(this.mlBlocks, modules)
    // eslint-disable-next-line
    this.trainData.push.apply(this.trainData, traindata)
    // eslint-disable-next-line
    this.trainLabels.push.apply(this.trainLabels, trainlabels)
    // eslint-disable-next-line
    this.testData.push.apply(this.testData, testdata)
  },
  mounted () {
    this.workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      scrollbars: false
    })
  },
  components: {
    'block-component': blockComponent
  },
  methods: {
    runCode: function () {
      let code = Blockly.JavaScript.workspaceToCode(this.workspace)
      try {
        // eslint-disable-next-line
        eval(code)
      } catch (e) {
        alert(e)
      }
    },
    showCode: function () {
      let code = Blockly.JavaScript.workspaceToCode(this.workspace)
      alert(code)
    },
    testCode: function () {
      // eslint-disable-next-line
      this.testLabels = this.model.predict(tf.tensor2d(this.testData, [this.testData.length, 1])).dataSync()
    }
  }
}
</script>

<style scoped>
</style>
