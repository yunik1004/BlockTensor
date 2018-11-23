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
          <p>train data: {{stage.trainData}}</p>
          <p>train labels: {{stage.trainLabels}}</p>
        </div>
      </div>
      <div class="col-sm-8">
        <div id="blocklyDiv" style="width: 800px; height: 480px;"></div>
        <xml id="toolbox" style="display: none">
          <category name="ML" colour="120">
            <block-component v-for="block in stage.blocks" :block="block" :type="block.blockName" :key="block.blockName"></block-component>
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
import JSONfn from 'json-fn'
import gql from 'graphql-tag'

import BlockDB from '../database/BlockDB'

let workspace

let blockComponent = {
  props: ['type', 'block'],
  template: `<block :type="type"></block>`,
  mounted: function () {
    let blockStruct = BlockDB[this.type]['struct']
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
      model: null,
      testData: [],
      testLabels: [],

      stage: {
        'blocks': [],
        'trainData': [],
        'trainLabels': []
      },
      loading: 0
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
    }
  }
}
</script>

<style scoped>
</style>
