const MnistData = require('./getData/MnistData')

let StageDataDB = {}

StageDataDB['Sequence Prediction'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `tf.tensor([${trainData}], [${trainDataSize}])`,
    'trainLabels': `tf.tensor([${trainLabel}], [${trainLabelSize}])`
  }
}

StageDataDB['B'] = function () {
  let mnistTrainData = MnistData.getTrainData()

  return {
    'type': 'image',
    'trainData': mnistTrainData.images,
    'trainLabels': mnistTrainData.labels
  }
}

StageDataDB['C'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `tf.tensor([${trainData}], [${trainDataSize}])`,
    'trainLabels': `tf.tensor([${trainLabel}], [${trainLabelSize}])`
  }
}

StageDataDB['D'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `tf.tensor([${trainData}], [${trainDataSize}])`,
    'trainLabels': `tf.tensor([${trainLabel}], [${trainLabelSize}])`
  }
}

StageDataDB['E'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `tf.tensor([${trainData}], [${trainDataSize}])`,
    'trainLabels': `tf.tensor([${trainLabel}], [${trainLabelSize}])`
  }
}

module.exports = StageDataDB
