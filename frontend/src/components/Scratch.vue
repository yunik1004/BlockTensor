<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4">
          <p>Training data가 들어갈 자리</p>
          <p>train data: {{stage.trainData}}</p>
          <p>train labels: {{stage.trainLabels}}</p>
        </div>
        <div class="col-sm-8">
          <p>Result가 보여질 자리</p>
          <p>Interactive</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <p>Test data: {{testData}}</p>
          <p>Expected output: {{testLabels}}</p>
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
      <button type="button" class="btn btn-outline-danger" @click="showCode()" style="display: none">Code</button>
    </div>
  </div>
</template>

<script>
import Blockly from 'node-blockly/browser'
import JSONfn from 'json-fn'
import gql from 'graphql-tag'

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
      stage: {
        'details': '',
        'blockLists': [],
        'trainData': '',
        'trainLabels': ''
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
          trainData
          trainLabels
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

        // eslint-disable-next-line
        this.trainData = eval('(' + this.stage.trainData + ')')
        // eslint-disable-next-line
        this.trainLabels = eval('(' + this.stage.trainLabels + ')')
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
  },
  updated () {
    this.onResize()
  },
  components: {
    'category-component': categoryComponent
  },
  methods: {
    runCode: function () {
      this.trainResults['loss'] = []
      this.trainResults['val_loss'] = []

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
      console.log(code)
    },
    testCode: function () {
      // eslint-disable-next-line
      this.testLabels = this.model.predictOnBatch(tf.tensor(this.testData, [this.testData.length, 1])).dataSync()
    },
    initializeStartBlocks: function () {
      Blockly.defineBlocksWithJsonArray([{
        'type': 'startBlock',
        'message0': 'Build model here!',
        'nextStatement': null,
        'colour': '188',
        'tooltip': 'Build model here!!'
      }])

      Blockly.JavaScript['startBlock'] = function (block) {
        // Pre-defined variables
        let code = `
          let tbTrainData
          let tbTrainLabels

          let tbModel

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
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 10px auto;
}
</style>
