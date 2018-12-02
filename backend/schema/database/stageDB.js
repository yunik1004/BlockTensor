let StageDB = {}

StageDB['1'] = {
  'tag': '1',
  'info': 'Stage 1',
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

StageDB['B'] = {
  'tag': 'B',
  'info': 'Stage B',
  'blocks': [],
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

StageDB['C'] = {
  'tag': 'C',
  'info': 'Stage C',
  'blocks': [],
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

StageDB['D'] = {
  'tag': 'D',
  'info': 'Stage D',
  'blocks': [],
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

StageDB['E'] = {
  'tag': 'E',
  'info': 'Stage E',
  'blocks': [],
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
