let StageDB = {}

StageDB['Sequence Prediction'] = {
  'tag': 'Number',
  'info': 'In this stage, you should make a sequence prediction ML model.',
  'details': 'details',
  'blocks': ['sequentialModel', 'dense1dLayer', 'activationLayer', 'train']
}

StageDB['Number Recognition'] = {
  'tag': 'Mnist',
  'info': 'In this stage, you should make a hand-writing-number recognition ML model.',
  'details': 'details',
  'blocks': ['sequentialModel', 'flattenLayer', 'dense1dLayer', 'conv2dLayer', 'maxPooling2dLayer', 'activationLayer', 'train']
}

StageDB['Cats & Dogs Classification'] = {
  'tag': 'Image',
  'info': 'Stage C',
  'details': 'details',
  'blocks': []
}

StageDB['Facial App Protector'] = {
  'tag': 'Image',
  'info': 'Stage D',
  'details': 'details',
  'blocks': []
}

StageDB['Tic Tac Toe Learning'] = {
  'tag': 'NN',
  'info': 'Stage E',
  'details': 'details',
  'blocks': []
}

module.exports = StageDB
