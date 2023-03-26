const coursesRouter = require('express').Router()
const Course = require('../models/course')

coursesRouter.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find({})
    res.json(courses)
  } catch(exception) {
    next(exception)
  }
})

coursesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params.id
  try {
    const course = await Course.findById(id)
    if (course) {
      res.json(course)
    } else {
      res.status(404).end()
    } 
  } catch(exception) {
    next(exception)
  }
})

coursesRouter.post()

module.exports = coursesRouter