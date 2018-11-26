let BlockDB = {}

BlockDB['sequentialModel'] = {
  'category': 'Model',
  'struct': {
    'type': 'controls_repeat_ext',
    'message0': 'Make a model - batch size: %1',
    'args0': [
      {
        'type': 'field_number',
        'name': 'BATCH_SIZE',
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
    'previousStatement': null,
    'nextStatement': null,
    'colour': 230,
    'tooltip': 'Define a model'
  },
  'code': function (block, Blockly) {
    let code = `
      this.model = null

      tbModel = function (trainData, trainLabels) {
        const model = tf.sequential()
        let tb_output_size = trainData.shape.slice(1)
    `

    let layers = Blockly.JavaScript.statementToCode(block, 'LAYERS').split('\n').filter(function (entry) { return /\S/.test(entry) })
    for (let i = 0; i < layers.length; i++) {
      let statements = layers[i].split(';')
      code += `
        model.add(${statements[0]})
        ${statements[1]}
      `
    }

    let loss = block.getFieldValue('LOSS')
    let opt = block.getFieldValue('OPTIMIZER')

    code += `
        let tb_labels_output_size = trainLabels.shape.slice(1)
        if (!arraysEqual(tb_output_size, tb_labels_output_size)) {
          alert('Output size should be the size of ' + tb_labels_output_size)
          return null
        }

        model.compile({loss: ${loss}, optimizer: ${opt}})

        return model
      }(this.trainData, this.trainLabels)
    `

    return code
  }
}

// tf.layers.dense({units: @@@, inputShape: @@@}); tb_output_size = @@@\n
BlockDB['denseLayer'] = {
  'category': 'Layer',
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
  'code': function (block, Blockly) {
    let units = block.getFieldValue('UNITS')
    let code = `
      tf.layers.dense({units: ${units}, inputShape: tb_output_size}); tb_output_size = [${units}]
    `
    return code
  }
}

BlockDB['activationLayer'] = {
  'category': 'Layer',
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
  'code': function (block, Blockly) {
    let activation = block.getFieldValue('ACTIVATION')
    let code = `
      tf.layers.activation({activation: ${activation}})
    `
    return code
  }
}

BlockDB['train'] = {
  'category': 'Train',
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
  'code': function (block, Blockly) {
    let epochs = block.getFieldValue('EPOCHS')

    let code = `
      tbTrainData = this.trainData
      tbTrainLabels = this.trainLabels

      this.model = function (model, trainData, trainLabels) {
        if (!model) {
          return null
        }

        const xs = tbTrainData
        const ys = tbTrainLabels

        model.fit(xs, ys, {epochs: ${epochs}}).then(() => {
          alert('Training finished!')
        })

        return model
      }(tbModel, tbTrainData, tbTrainLabels)
    `

    return code
  }
}

module.exports = BlockDB
