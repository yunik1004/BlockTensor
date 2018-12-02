let StageDB = {}

StageDB['1'] = {
  'blocks': ['sequentialModel', 'denseLayer', 'activationLayer', 'train'],
  'trainData': function () {
    let data = [1, 2, 3, 4, 5]
    let size = [5, 1]

    return `tf.tensor([${data}], [${size}])`
  },
  'trainLabels': function () {
    let label = [1, 3, 5, 7, 9]
    let size = [5, 1]

    return `tf.tensor([${label}], [${size}])`
  }
}

module.exports = StageDB
