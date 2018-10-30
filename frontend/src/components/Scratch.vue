<template>
    <div>
        <xml id="startBlocks" style="display: none"></xml>
        <div class="demo">
            <div>
                <select id="locale">
                    <option value="en">EN</option>
                    <option value="ko">KO</option>
                </select>

                <div id="editor" style="height: 480px; width: 600px;">

                </div>

                <xml id="toolbox" style="display: none">
                    <category name="Logic">
                        <block type="controls_if"></block>
                        <block type="logic_compare"></block>
                        <block type="logic_operation"></block>
                        <block type="logic_negate"></block>
                        <block type="logic_boolean"></block>
                    </category>
                    <category name="Loops">
                        <block type="controls_repeat_ext">
                            <value name="TIMES">
                                <block type="math_number">
                                    <field name="NUM">10</field>
                                </block>
                            </value>
                        </block>
                        <block type="controls_whileUntil"></block>
                    </category>
                    <category name="Math">
                        <block type="math_number"></block>
                        <block type="math_arithmetic"></block>
                        <block type="math_single"></block>
                    </category>
                    <category name="Text">
                        <block type="text"></block>
                        <block type="text_length"></block>
                        <block type="text_print"></block>
                    </category>
                </xml>
            </div>
            <div>
                <p class="label">JS</p>
                <pre language="javascript" id="js"></pre>
            </div>
        </div>
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
    var editor
    var code = document.getElementById('startBlocks')

    function render (element, toolbox) {
      if (editor) {
        editor.removeChangeListener(updateCode)
        code = Blockly.Xml.workspaceToDom(editor)
        editor.dispose()
      }
      editor = Blockly.inject(element, {
        toolbox: document.getElementById(toolbox)
      })

      Blockly.Xml.domToWorkspace(code, editor)

      editor.addChangeListener(updateCode)

      return editor
    }

    function updateCode () {
      document.getElementById('js').innerText = Blockly.JavaScript.workspaceToCode(editor)
    }

    editor = render('editor', 'toolbox')

    updateCode()

    document.getElementById('locale').onchange = (e) => {
      import('node-blockly/lib/i18n/' + e.target.value).then((locale) => {
        Blockly.setLocale(locale)
        render('editor', 'toolbox')
      })
    }
  }
}
</script>

<style scoped>
pre {
    font-size: 10px;
    border: 1px solid #aaa;
    margin: 0 0 20px 0;
    padding: 10px;
    text-align: left;
}
p.label {
    margin: 5px 0
}
.demo {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.demo > div {
    flex: 1 1
}
select {
    margin-bottom: 10px;
}
</style>
