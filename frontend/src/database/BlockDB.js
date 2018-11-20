import Blockly from 'node-blockly/browser'

let BlockDB = {}

BlockDB['test_module'] = {
  'struct': {
    'message0': 'change %1 by %2',
    'args0': [
      {'type': 'field_variable', 'name': 'VAR', 'variable': 'item', 'variableTypes': ['']},
      {'type': 'input_value', 'name': 'DELTA', 'check': 'Number'}
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 230,
    'tooltip': 'Change the number into another number'
  },
  'code': function (block) {
    let code = `
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
}

BlockDB['sequentialModel'] = {
  'struct': {
    'type': 'controls_repeat_ext',
    'message0': 'Make a model - input size: %1, output size: %2',
    'args0': [
      {
        'type': 'field_number',
        'name': 'INPUT_SIZE',
        'value': 1
      },
      {
        'type': 'field_number',
        'name': 'OUTPUT_SIZE',
        'value': 1
      }
    ],
    'message1': 'Layers %1',
    'args1': [
      {
        'type': 'input_statement',
        'name': 'LAYERS'
      }
    ],
    'message2': 'Loss function %1',
    'args2': [
      {
        'type': 'field_dropdown',
        'name': 'LOSS',
        'options': [
          ['meanSquaredError', `'meanSquaredError'`],
          ['sigmoidCrossEntropy', `'sigmoidCrossEntropy'`],
          ['softmaxCrossEntropy', `'softmaxCrossEntropy'`]
        ]
      }
    ],
    'message3': 'Optimizer %1',
    'args3': [
      {
        'type': 'field_dropdown',
        'name': 'OPTIMIZER',
        'options': [
          ['sgd', `'sgd'`],
          ['momentum', `'momentum'`],
          ['adagrad', `'adagrad'`],
          ['adam', `'adam'`],
          ['rmsprop', `'rmsprop'`]
        ]
      }
    ],
    'nextStatement': null,
    'colour': 230,
    'tooltip': 'Define a model'
  },
  'code': function (block) {
    let code = `var generateSequentialModel = function () {\n`

    code += `const model = tf.sequential()\n`

    let inputSize = block.getFieldValue('INPUT_SIZE')
    code += `let tb_output_size = ` + inputSize.toString() + `\n`

    let layers = Blockly.JavaScript.statementToCode(block, 'LAYERS').split('\n')
    for (let i = 0; i < layers.length - 1; i++) {
      let statements = layers[i].split(';')
      code += `model.add(` + statements[0] + `)\n`
      code += statements[1] + `\n`
    }

    let outputSize = block.getFieldValue('OUTPUT_SIZE')
    code += `model.add(tf.layers.dense({units:` + outputSize.toString() + `, inputShape: [tb_output_size]}))\n`

    let loss = block.getFieldValue('LOSS')
    let opt = block.getFieldValue('OPTIMIZER')

    code += `model.compile({loss: ` + loss + `, optimizer: ` + opt + `})\n`

    code += `return model\n`
    code += `}\n`

    code += `let tbModel = generateSequentialModel()\n`
    code += `let tbInputSize = ` + inputSize.toString() + `\n`

    return code
  }
}

// tf.layers.dense({units: @@@, inputShape: [@@@]}); tb_output_size = @@@\n
BlockDB['denseLayer'] = {
  'struct': {
    'message0': 'Dense layer with %1 unit',
    'args0': [
      {
        'type': 'field_number',
        'name': 'UNITS',
        'value': 1
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 125,
    'tooltip': 'Define a dense layer'
  },
  'code': function (block) {
    let units = block.getFieldValue('UNITS')
    let code = `tf.layers.dense({units:` + units.toString() + `, inputShape: [tb_output_size]});`
    code += `tb_output_size = ` + units.toString() + `\n`
    return code
  }
}

BlockDB['activationLayer'] = {
  'struct': {
    'message0': 'Activation layer %1',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'ACTIVATION',
        'options': [
          ['linear', `'linear'`],
          ['relu', `'relu'`],
          ['sigmoid', `'sigmoid'`],
          ['softmax', `'softmax'`],
          ['tanh', `'tanh'`]
        ]
      }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 125,
    'tooltip': 'Define an activation layer'
  },
  'code': function (block) {
    let activation = block.getFieldValue('ACTIVATION')
    let code = `tf.layers.activation({activation: ` + activation + `})\n`
    return code
  }
}

BlockDB['train'] = {
  'struct': {
    'message0': 'Train the model with %1 epochs',
    'args0': [
      {
        'type': 'field_number',
        'name': 'EPOCHS',
        'value': 10
      }
    ],
    'previousStatement': null,
    'colour': 300,
    'tooltip': 'Train the model'
  },
  'code': function (block) {
    let code = `let tbTrainData = this.trainData\n`
    code += `let tbTrainLabels = this.trainLabels\n`

    code += `var train = function (model) {\n`

    code += `let tbTrainLength = tbTrainData.length\n`

    code += `const xs = tf.tensor2d(tbTrainData, [tbTrainLength, tbInputSize])\n`
    code += `const ys = tf.tensor2d(tbTrainLabels, [tbTrainLength, tbInputSize])\n`

    let epochs = block.getFieldValue('EPOCHS')
    code += `model.fit(xs, ys, {epochs: ` + epochs.toString() + `}).then(() => {\n`
    code += `alert('Training finished!')\n`
    code += `})\n`
    code += `return model\n`
    code += `}\n`

    code += `this.model = train(tbModel)\n`
    return code
  }
}

export default BlockDB
