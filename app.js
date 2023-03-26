const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

const coursesRouter = require('./controllers/courses')

console.log('Connecting to', config.MONGO_URI)

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Core Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('dev'))

// Routers
app.use('/courses', coursesRouter)

// Middleware

module.exports = app