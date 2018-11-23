import Blockly from 'node-blockly/browser'
import JSONfn from 'json-fn'

let BlockDB = {}

let abc = function (block, Blockly) {
  let inputSize = block.getFieldValue('INPUT_SIZE')

  let code = `
    var generateSequentialModel = function () {
      const model = tf.sequential()
      let tb_output_size = ${inputSize}
  `

  let layers = Blockly.JavaScript.statementToCode(block, 'LAYERS').split('\n').filter(function (entry) { return /\S/.test(entry) })
  for (let i = 0; i < layers.length - 1; i++) {
    let statements = layers[i].split(';')
    code += `
      model.add(${statements[0]})
      ${statements[1]}
    `
  }

  let outputSize = block.getFieldValue('OUTPUT_SIZE')
  let outputActivation = block.getFieldValue('ACTIVATION_OUTPUT')
  let loss = block.getFieldValue('LOSS')
  let opt = block.getFieldValue('OPTIMIZER')

  code += `
      model.add(tf.layers.dense({units: ${outputSize}, inputShape: [tb_output_size]}))
      model.add(tf.layers.activation({activation: ${outputActivation}}))
      model.compile({loss: ${loss}, optimizer: ${opt}})

      return model
    }

    let tbModel = generateSequentialModel()
    let tbInputSize = ${inputSize}
  `

  return code
}

BlockDB['test_module'] = {
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
    'message2': 'Output layer activation %1',
    'args2': [
      {
        'type': 'field_dropdown',
        'name': 'ACTIVATION_OUTPUT',
        'options': [
          ['linear', `'linear'`],
          ['relu', `'relu'`],
          ['sigmoid', `'sigmoid'`],
          ['softmax', `'softmax'`],
          ['tanh', `'tanh'`]
        ]
      }
    ],
    'message3': 'Loss function %1',
    'args3': [
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
    'message4': 'Optimizer %1',
    'args4': [
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
    let bbb = JSONfn.stringify(abc)
    console.log(bbb)
    console.log('\n\n\n')

    let objfn = JSONfn.parse(bbb)
    console.log(objfn)

    return objfn(block, Blockly)
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
    'message2': 'Output layer activation %1',
    'args2': [
      {
        'type': 'field_dropdown',
        'name': 'ACTIVATION_OUTPUT',
        'options': [
          ['linear', `'linear'`],
          ['relu', `'relu'`],
          ['sigmoid', `'sigmoid'`],
          ['softmax', `'softmax'`],
          ['tanh', `'tanh'`]
        ]
      }
    ],
    'message3': 'Loss function %1',
    'args3': [
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
    'message4': 'Optimizer %1',
    'args4': [
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
    let inputSize = block.getFieldValue('INPUT_SIZE')

    let code = `
      var generateSequentialModel = function () {
        const model = tf.sequential()
        let tb_output_size = ${inputSize}
    `

    let layers = Blockly.JavaScript.statementToCode(block, 'LAYERS').split('\n').filter(function (entry) { return /\S/.test(entry) })
    for (let i = 0; i < layers.length - 1; i++) {
      let statements = layers[i].split(';')
      code += `
        model.add(${statements[0]})
        ${statements[1]}
      `
    }

    let outputSize = block.getFieldValue('OUTPUT_SIZE')
    let outputActivation = block.getFieldValue('ACTIVATION_OUTPUT')
    let loss = block.getFieldValue('LOSS')
    let opt = block.getFieldValue('OPTIMIZER')

    code += `
        model.add(tf.layers.dense({units: ${outputSize}, inputShape: [tb_output_size]}))
        model.add(tf.layers.activation({activation: ${outputActivation}}))
        model.compile({loss: ${loss}, optimizer: ${opt}})

        return model
      }

      let tbModel = generateSequentialModel()
      let tbInputSize = ${inputSize}
    `

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
    let code = `
      tf.layers.dense({units: ${units}, inputShape: [tb_output_size]}); tb_output_size = ${units}
    `
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
    let code = `
      tf.layers.activation({activation: ${activation}})
    `
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
    let epochs = block.getFieldValue('EPOCHS')

    let code = `
      let tbTrainData = this.trainData
      let tbTrainLabels = this.trainLabels

      var train = function (model) {
        let tbTrainLength = tbTrainData.length

        const xs = tf.tensor2d(tbTrainData, [tbTrainLength, tbInputSize])
        const ys = tf.tensor2d(tbTrainLabels, [tbTrainLength, tbInputSize])

        model.fit(xs, ys, {epochs: ${epochs}}).then(() => {
          alert('Training finished!')
        })

        return model
      }

      this.model = train(tbModel)
    `

    return code
  }
}

export default BlockDB
