let BlockDB = {}

BlockDB['sequentialModel'] = {
  'category': 'Model',
  'struct': {
    'type': 'modelBlock',
    'message0': 'Make a model',
    'message1': 'Layers %1',
    'args1': [
      {
        'type': 'input_statement',
        'name': 'LAYERS',
        'check': ['layer_conn']
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
    'previousStatement': 'start_model_conn',
    'nextStatement': 'model_train_conn',
    'colour': 230,
    'tooltip': 'Define a model'
  },
  'code': function (block, Blockly) {
    let code = `
      this.model = function (trainData, trainLabels) {
        const model = tf.sequential()
        let tb_output_size = trainData.shape.slice(1)
        tb_output_size.unshift(null)
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
        if (!arraysEqual(tb_output_size.slice(1), tb_labels_output_size)) {
          tbThis.alertTrainingErr('Output size should be the size of ' + tb_labels_output_size)
          return null
        }

        model.compile({
          loss: ${loss},
          optimizer: ${opt},
          metrics: ['accuracy']
        })

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
    'type': 'layerBlock',
    'message0': 'Dense layer with %1 unit',
    'args0': [
      {
        'type': 'field_number',
        'name': 'UNITS',
        'value': 1
      }
    ],
    'previousStatement': 'layer_conn',
    'nextStatement': 'layer_conn',
    'colour': 125,
    'tooltip': 'Define a dense layer'
  },
  'code': function (block, Blockly) {
    let units = block.getFieldValue('UNITS')
    let code = `
      tf.layers.dense({units: ${units}, batchInputShape: tb_output_size}); tb_output_size = [null, ${units}]
    `
    return code
  }
}

BlockDB['activationLayer'] = {
  'category': 'Layer',
  'struct': {
    'type': 'layerBlock',
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
    'previousStatement': 'layer_conn',
    'nextStatement': 'layer_conn',
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
    'type': 'trainBlock',
    'message0': 'Train the model with...',
    'message1': 'batchSize: %1, epochs: %2, iteration: %3, validationSplit: %4',
    'args1': [
      {
        'type': 'field_number',
        'name': 'BATCH_SIZE',
        'value': 1
      },
      {
        'type': 'field_number',
        'name': 'EPOCHS',
        'value': 10
      },
      {
        'type': 'field_number',
        'name': 'ITERATION',
        'value': 10
      },
      {
        'type': 'field_number',
        'name': 'VAL_SPLIT',
        'value': 0.15
      }
    ],
    'previousStatement': 'model_train_conn',
    'colour': 300,
    'tooltip': 'Train the model'
  },
  'code': function (block, Blockly) {
    let batchSize = block.getFieldValue('BATCH_SIZE')
    let epochs = block.getFieldValue('EPOCHS')
    let iter = block.getFieldValue('ITERATION')
    let valSplit = block.getFieldValue('VAL_SPLIT')

    let code = `
      tbTrainData = tbThis.trainData
      tbTrainLabels = tbThis.trainLabels

      let train = async function () {
        for(let i = 0; i < ${iter}; i++) {
          const history = await tbThis.model.fit(tbTrainData, tbTrainLabels, {
            batchSize: ${batchSize},
            epochs: ${epochs},
            validationSplit: ${valSplit}
          })

          const loss = history.history.loss[0]
          const val_loss = history.history.val_loss[0]
          tbThis.trainResults['loss'].push(loss)
          tbThis.trainResults['val_loss'].push(val_loss)
        }
      }

      if (tbThis.model != null) {
        train().then(() => {
          tbThis.alertFinTraining()
        })
      }
    `

    return code
  }
}

module.exports = BlockDB
