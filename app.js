let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

let database = require('./config/database')

let securityRouter = require('./routes/security')
let emprendimiento = require('./routes/emprendimiento')
let usuario = require('./routes/usuario')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/security/', securityRouter)
app.use('/api/v1/emprendimiento/', emprendimiento)
app.use('/api/v1/usuario/', usuario)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).json({error: res.locals.error})
})

module.exports = app