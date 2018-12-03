var express = require('express')
var router = express.Router()

const StageDataDB = require('../schema/database/stageDataDB')

/* Treat GET request for api */
router.get('/', function (req, res, next) {
  res.send('respond with an api request')
})

router.get('/data/train/:stageName', function (req, res, next) {
  let stageName = req.params.stageName

  const stageDataFunc = StageDataDB[stageName]
  if (stageDataFunc === undefined) {
    return
  }

  const stageData = stageDataFunc()

  let sendData

  if (stageData.type === 'number') {
    sendData = {
      'type': stageData.type,
      'trainData': stageData.trainData,
      'trainLabels': stageData.trainLabels,
      'dataShape': stageData.dataShape,
      'labelShape': stageData.labelShape
    }
  } else if (stageData.type === 'image') {
    sendData = {
      'type': stageData.type,
      'trainData': stageData.trainData,
      'trainLabels': stageData.trainLabels,
      'dataShape': stageData.dataShape,
      'label_flat_size': stageData.label_flat_size
    }
  }

  res.json(sendData)
})

router.get('/data/test/:stageName', function (req, res, next) {
  let stageName = req.params.stageName

  res.send('respond with test data ' + stageName)
})

module.exports = router
