var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const { ApolloServer } = require('apollo-server-express')

var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')

const { typeDefs, resolvers } = require('./schema/graphql')

var app = express()

// Graphql
const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routing table
app.use('/', indexRouter)
app.use('/api', apiRouter)

app.use(require('connect-history-api-fallback')())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
