<template>
  <div>
    <div id="blockly-div" style="height: 480px; width: 400px;"></div>
    <xml id="toolbox" style="display: none">
      <category name="Loops" colour="120">
        <block type="controls_repeat_ext"></block>
      </category>
      <category name="ML" colour="120">
        <block-component v-for="type in mlBlocks" :type="type" :key="type"></block-component>
      </category>
    </xml>
    <button @click="showCode()">Show code</button>
    <button @click="runCode()">Run code</button>
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
      mlBlocks: []
    }
  },
  created () {
    this.mlBlocks.push('test_module')
  },
  mounted () {
    this.workspace = Blockly.inject('blockly-div', {
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
    }
  }
}
</script>

<style scoped>
</style>
