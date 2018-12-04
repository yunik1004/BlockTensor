let StageDB = {}

StageDB['Sequence Prediction'] = {
  'tag': '1',
  'info': 'Stage 1',
  'details': 'details',
  'blocks': ['sequentialModel', 'dense1dLayer', 'activationLayer', 'train']
}

StageDB['B'] = {
  'tag': 'B',
  'info': 'Stage B',
  'details': 'details',
  'blocks': ['sequentialModel', 'flattenLayer', 'dense1dLayer', 'conv2dLayer', 'maxPooling2dLayer', 'activationLayer', 'train']
}

StageDB['C'] = {
  'tag': 'C',
  'info': 'Stage C',
  'details': 'details',
  'blocks': []
}

StageDB['D'] = {
  'tag': 'D',
  'info': 'Stage D',
  'details': 'details',
  'blocks': []
}

StageDB['E'] = {
  'tag': 'E',
  'info': 'Stage E',
  'details': 'details',
  'blocks': []
}

module.exports = StageDB
