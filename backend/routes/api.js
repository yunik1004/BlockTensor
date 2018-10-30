var express = require('express')
var router = express.Router()

/* Treat GET request for api */
router.get('/', function (req, res, next) {
  res.send('respond with an api request')
})

module.exports = router
