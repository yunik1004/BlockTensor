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

export default BlockDB
