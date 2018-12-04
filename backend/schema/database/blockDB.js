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
          ['softmaxCrossEntropy', `'softmaxCrossEntropy'`],
          ['categoricalCrossentropy', `'categoricalCrossentropy'`]
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

    /*
    let layers = Blockly.JavaScript.statementToCode(block, 'LAYERS').split('\n').filter(function (entry) { return /\S/.test(entry) })
    for (let i = 0; i < layers.length; i++) {
      let statements = layers[i].split(';')
      code += `
        model.add(${statements[0]})
        ${statements[1]}
      `
    }
    */

    let layers = Blockly.JavaScript.statementToCode(block, 'LAYERS')
    code += layers

    let loss = block.getFieldValue('LOSS')
    let opt = block.getFieldValue('OPTIMIZER')

    code += `
        let tb_labels_output_size = trainLabels.shape.slice(1)
        if (!arraysEqual(tb_output_size.slice(1), tb_labels_output_size)) {
          let errMsg = 'Output size should be [' + tb_labels_output_size.toString() + ']\\n'
          errMsg += 'Current output size is [' + tb_output_size.slice(1).toString() + ']'

          tbThis.alertTrainingErr(errMsg)
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
BlockDB['dense1dLayer'] = {
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
      if (tb_output_size.length != 2) {
        tbThis.alertTrainingErr('Reduce the dimension of input data by using flatten layer before dense layer')
        return null
      }

      model.add(tf.layers.dense({
        units: ${units},
        batchInputShape: tb_output_size,
        kernelInitializer: 'VarianceScaling'
      }))
      tb_output_size = [null, ${units}]
    `
    return code
  }
}

BlockDB['conv2dLayer'] = {
  'category': 'Layer',
  'struct': {
    'type': 'layerBlock',
    'message0': 'Convolutional 2D Layer - Filters %1 Kernel size %2 Strides %3',
    'args0': [
      {
        'type': 'field_number',
        'name': 'FILTERS',
        'value': 8
      },
      {
        'type': 'field_number',
        'name': 'KERNEL_SIZE',
        'value': 5
      },
      {
        'type': 'field_number',
        'name': 'STRIDES',
        'value': 1
      }
    ],
    'previousStatement': 'layer_conn',
    'nextStatement': 'layer_conn',
    'colour': 125,
    'tooltip': 'Define an conv2d layer'
  },
  'code': function (block, Blockly) {
    let filters = block.getFieldValue('FILTERS')
    let kernelSize = block.getFieldValue('KERNEL_SIZE')
    let strides = block.getFieldValue('STRIDES')

    let code = `
      if (tb_output_size.length != 4) {
        tbThis.alertTrainingErr('Input dimensiont of the conv2d layer should be 3')
        return null
      }

      model.add(tf.layers.conv2d({
        batchInputShape: tb_output_size,
        filters: ${filters},
        kernelSize: ${kernelSize},
        strides: ${strides},
        kernelInitializer: 'VarianceScaling'
      }))

      {
        let filters = ${filters}
        let kernelSize = ${kernelSize}
        let strides = ${strides}
        let input_size = tb_output_size

        let output_width = Math.floor((input_size[1] - kernelSize) / strides) + 1
        let output_height = Math.floor((input_size[2] - kernelSize) / strides) + 1

        tb_output_size = [null, output_width, output_height, filters]
      }
    `
    return code
  }
}

BlockDB['maxPooling2dLayer'] = {
  'category': 'Layer',
  'struct': {
    'type': 'layerBlock',
    'message0': 'MaxPooling 2D Layer - Poolsize %1 Strides %2',
    'args0': [
      {
        'type': 'field_number',
        'name': 'POOLSIZE',
        'value': 2
      },
      {
        'type': 'field_number',
        'name': 'STRIDES',
        'value': 2
      }
    ],
    'previousStatement': 'layer_conn',
    'nextStatement': 'layer_conn',
    'colour': 125,
    'tooptip': 'Define an maxPooling2d layer'
  },
  'code': function (block, Blockly) {
    let poolSize = [block.getFieldValue('POOLSIZE'), block.getFieldValue('POOLSIZE')]
    let strides = [block.getFieldValue('STRIDES'), block.getFieldValue('STRIDES')]

    let code = `
      if (tb_output_size.length != 4) {
        tbThis.alertTrainingErr('Input dimension of the maxPooling2d layer should be 3')
        return null
      }

      model.add(tf.layers.maxPooling2d({
        batchInputShape: tb_output_size,
        poolSize: [${poolSize}],
        strides: [${strides}]
      }))

      {
        let poolSize = [${poolSize}]
        let strides = [${strides}]
        let input_size = tb_output_size

        let output_width = Math.floor((input_size[1] - poolSize[0]) / strides[1]) + 1
        let output_height = Math.floor((input_size[2] - poolSize[1]) / strides[1]) + 1

        if (output_width <= 0 || output_height <= 0) {
          tbThis.alertTrainingErr('Pool size cannot exceed the input size')
          return null
        }

        tb_output_size = [null, output_width, output_height, input_size[3]]
      }
    `
    return code
  }
}

BlockDB['flattenLayer'] = {
  'category': 'Layer',
  'struct': {
    'type': 'layerBlock',
    'message0': 'Flatten Layer',
    'previousStatement': 'layer_conn',
    'nextStatement': 'layer_conn',
    'colour': 125,
    'tooptip': 'Define an flatten layer'
  },
  'code': function (block, Blockly) {
    let code = `
      model.add(tf.layers.flatten({
        batchInputShape: tb_output_size
      }))

      tbtmp = 1
      for (let i = 1; i < tb_output_size.length; i++) {
        tbtmp = tbtmp * tb_output_size[i]
      }

      tb_output_size = [null, tbtmp]
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
      model.add(tf.layers.activation({
        activation: ${activation}
      }))
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

          console.log(history)

          const loss = history.history.loss.slice(-1)[0]
          const val_loss = history.history.val_loss.slice(-1)[0]
          const acc = history.history.acc.slice(-1)[0]
          const val_acc = history.history.val_acc.slice(-1)[0]

          tbThis.trainResults['loss'].push(loss)
          tbThis.trainResults['val_loss'].push(val_loss)
          tbThis.trainResults['acc'].push(acc)
          tbThis.trainResults['val_acc'].push(val_acc)
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
