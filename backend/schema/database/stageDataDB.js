const MnistData = require('./getData/MnistData')

let StageDataDB = {}

StageDataDB['1'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `${trainData}`,
    'trainLabels': `${trainLabel}`,
    'dataShape': trainDataSize,
    'labelShape': trainLabelSize
  }
}

StageDataDB['B'] = function () {
  let mnistTrainData = MnistData.getTrainData()

  return {
    'type': 'image',
    'trainData': mnistTrainData.images,
    'trainLabels': mnistTrainData.labels,
    'dataShape': mnistTrainData.imagesShape,
    'label_flat_size': mnistTrainData.label_flat_size
  }
}

StageDataDB['C'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `${trainData}`,
    'trainLabels': `${trainLabel}`,
    'dataShape': trainDataSize,
    'labelShape': trainLabelSize
  }
}

StageDataDB['D'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `${trainData}`,
    'trainLabels': `${trainLabel}`,
    'dataShape': trainDataSize,
    'labelShape': trainLabelSize
  }
}

StageDataDB['E'] = function () {
  let trainData = [1, 2, 3, 4, 5]
  let trainDataSize = [5, 1]

  let trainLabel = [1, 3, 5, 7, 9]
  let trainLabelSize = [5, 1]

  return {
    'type': 'number',
    'trainData': `${trainData}`,
    'trainLabels': `${trainLabel}`,
    'dataShape': trainDataSize,
    'labelShape': trainLabelSize
  }
}

module.exports = StageDataDB
