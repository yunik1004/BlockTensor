<template>
  <div>
    <div id="blockly-div" style="height: 480px; width: 400px;"></div>
    <xml id="toolbox" style="display: none">
      <category name="Loops" colour="120">
        <block type="controls_repeat_ext"></block>
        <block type="test_module"></block>
      </category>
    </xml>
    <div>
      <p class="label">JS</p>
      <pre language="javascript" id="js" style="text-align: left;"></pre>
    </div>
    <button id="runjs">Run code</button>
  </div>
</template>

<script>
import Blockly from 'node-blockly/browser'

export default {
  name: 'Scratch',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    var workspace = Blockly.inject('blockly-div', {
      toolbox: document.getElementById('toolbox'),
      toolboxPosition: 'end',
      horizontalLayout: true,
      scrollbars: false
    })
    var mathChangeJson = {
      'message0': 'change %1 by %2',
      'args0': [
        {'type': 'field_variable', 'name': 'VAR', 'variable': 'item', 'variableTypes': ['']},
        {'type': 'input_value', 'name': 'DELTA', 'check': 'Number'}
      ],
      'previousStatement': null,
      'nextStatement': null,
      'colour': 230,
      'tooltip': 'Change the number into another number'
    }
    Blockly.Blocks['test_module'] = {
      init: function () {
        this.jsonInit(mathChangeJson)
      }
    }
    Blockly.JavaScript['test_module'] = function (block) {
      var code = `
        const model = tf.sequential()
        model.add(tf.layers.dense({units: 1, inputShape: [1]}))
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
        const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])
        model.fit(xs, ys, {epochs: 10}).then(() => {
          model.predict(tf.tensor2d([5], [1, 1])).print()
        })
      `
      return code
    }
    function myUpdateFunction (event) {
      var code = Blockly.JavaScript.workspaceToCode(workspace)
      document.getElementById('js').innerText = code
    }
    workspace.addChangeListener(myUpdateFunction)
    document.getElementById('runjs').onclick = function () {
      var code = Blockly.JavaScript.workspaceToCode(workspace)
      try {
        // eslint-disable-next-line
        eval(code)
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style scoped>
</style>
